"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { MARK_LOOPS, MARK_HALF_H, MARK_HALF_W } from "./mark-wire";
import { Mark } from "./Mark";
import { cn } from "@/lib/utils";

/**
 * O símbolo da marca desenhado como arame tridimensional girando.
 *
 * O motor — projeção em perspectiva, opacidade por profundidade, vértices como
 * pontinhos — é o do exemplo de referência. O que mudou é a forma: em vez de
 * cubo, cilindro ou esfera, a malha é o próprio símbolo da Work Up Fit,
 * extrudado em z. Cada um dos nove contornos vira dois anéis (frente e verso)
 * ligados por travessas, exatamente como o cilindro do exemplo é construído —
 * só que o perfil é a marca.
 *
 * Quatro coisas o exemplo não fazia e aqui são obrigatórias:
 *
 *  1. `requestAnimationFrame` cancelado ao desmontar. No exemplo o laço se
 *     rechama para sempre; numa navegação de app isso vira consumo de CPU de
 *     um canvas que já saiu da tela.
 *  2. Densidade de pixel lida do dispositivo, não fixada em 2, e redimensionamento
 *     observado. O exemplo mede uma vez e trava a escala.
 *  3. Parada quando a aba está oculta ou o canvas saiu da viewport.
 *  4. `prefers-reduced-motion`: um quadro só, num ângulo escolhido, e nada gira.
 *
 * A cor não é branca: é a cor da família em destaque, e ela é interpolada quadro
 * a quadro, então trocar de metodologia atravessa o espectro em vez de piscar.
 */

const DEPTH = 14; // meia-espessura da extrusão, em unidades da marca
const MODEL_SCALE = 2; // meia-altura vira 100 unidades, como as formas do exemplo
const RUNG_EVERY = 8; // travessas entre frente e verso a cada N amostras
const FOV = 400;
const ALPHA_STEPS = 7; // faixas de opacidade, para agrupar traços num punhado de chamadas
const REST_ANGLE = { x: 0.32, y: -0.54 }; // quadro de repouso com movimento reduzido

type Vertex = { x: number; y: number; z: number };
type Edge = readonly [number, number];

function buildMesh() {
  const vertices: Vertex[] = [];
  const edges: Edge[] = [];
  for (const loop of MARK_LOOPS) {
    const count = loop.length / 2;
    const base = vertices.length;
    for (let i = 0; i < count; i++) {
      const x = loop[i * 2] * MODEL_SCALE;
      const y = loop[i * 2 + 1] * MODEL_SCALE;
      vertices.push({ x, y, z: -DEPTH * MODEL_SCALE });
      vertices.push({ x, y, z: DEPTH * MODEL_SCALE });
    }
    for (let i = 0; i < count; i++) {
      const next = (i + 1) % count;
      edges.push([base + i * 2, base + next * 2]);
      edges.push([base + i * 2 + 1, base + next * 2 + 1]);
      if (i % RUNG_EVERY === 0) edges.push([base + i * 2, base + i * 2 + 1]);
    }
  }
  return { vertices, edges };
}

function parseColor(value: string): [number, number, number] {
  const hex = value.trim().replace("#", "");
  const full = hex.length === 3 ? hex.replace(/./g, (c) => c + c) : hex;
  const int = Number.parseInt(full, 16);
  if (full.length !== 6 || Number.isNaN(int)) return [55, 183, 255];
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

export function MarkWireframe({
  color = "#37B7FF",
  className,
}: {
  /** Hex de seis dígitos. Qualquer outra coisa cai no azul da marca. */
  color?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetColor = useRef(parseColor(color));
  const reduced = useReducedMotion();
  const [drawn, setDrawn] = useState(false);

  // A cor entra por uma ref, não pela dependência do efeito: trocar de
  // metodologia não pode reconstruir a malha nem reiniciar o giro.
  useEffect(() => {
    targetColor.current = parseColor(color);
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const { vertices, edges } = buildMesh();
    const projected = vertices.map(() => ({ x: 0, y: 0, z: 0 }));
    // Uma lista de traços por faixa de opacidade: sete `stroke()` por quadro em
    // vez de um por aresta, que a mil e duzentas arestas domina o tempo do frame.
    const buckets: number[][] = Array.from({ length: ALPHA_STEPS }, () => []);

    let width = 0;
    let height = 0;
    let angleX = REST_ANGLE.x;
    let angleY = REST_ANGLE.y;
    const colorNow: [number, number, number] = [...targetColor.current];
    let frame = 0;
    let visible = true;
    let onScreen = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return false;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      return true;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      // A marca é mais alta que larga; a perspectiva ainda a alarga um pouco
      // quando gira, e a folga de 1,42 é o que impede o arame de encostar na
      // borda no ângulo mais aberto.
      const fit = Math.min(
        width / 2 / (MARK_HALF_W * MODEL_SCALE * 1.42),
        height / 2 / (MARK_HALF_H * MODEL_SCALE * 1.42),
      );
      const cx = width / 2;
      const cy = height / 2;
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      for (let i = 0; i < vertices.length; i++) {
        const p = vertices[i];
        const x = p.x * cosY - p.z * sinY;
        let z = p.z * cosY + p.x * sinY;
        const y = p.y * cosX - z * sinX;
        z = z * cosX + p.y * sinX;
        const scale = (FOV / (FOV + z)) * fit;
        const out = projected[i];
        out.x = x * scale + cx;
        out.y = y * scale + cy;
        out.z = z;
      }

      for (const bucket of buckets) bucket.length = 0;
      for (const [a, b] of edges) {
        const p1 = projected[a];
        const p2 = projected[b];
        const depth = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.1, 1 - depth / 200);
        const step = Math.min(ALPHA_STEPS - 1, Math.floor(alpha * ALPHA_STEPS));
        buckets[step].push(p1.x, p1.y, p2.x, p2.y);
      }

      const [r, g, b] = colorNow;
      context.lineWidth = 0.8;
      for (let step = 0; step < ALPHA_STEPS; step++) {
        const segments = buckets[step];
        if (segments.length === 0) continue;
        const alpha = ((step + 0.5) / ALPHA_STEPS) * 0.42;
        context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        context.beginPath();
        for (let i = 0; i < segments.length; i += 4) {
          context.moveTo(segments[i], segments[i + 1]);
          context.lineTo(segments[i + 2], segments[i + 3]);
        }
        context.stroke();
      }

      // Vértices só do lado voltado para o observador, e um a cada quatro:
      // marcados todos, o arame vira uma mancha pontilhada.
      context.fillStyle = `rgba(${r}, ${g}, ${b}, 0.85)`;
      for (let i = 0; i < projected.length; i += 8) {
        const p = projected[i];
        if (p.z < -40) context.fillRect(p.x - 0.9, p.y - 0.9, 1.8, 1.8);
      }
    };

    const tick = () => {
      if (visible && onScreen) {
        angleY += 0.005;
        angleX += 0.002;
        const target = targetColor.current;
        for (let i = 0; i < 3; i++) colorNow[i] += (target[i] - colorNow[i]) * 0.04;
        draw();
      }
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (!resize()) return;
      draw();
      setDrawn(true);
      if (!reduced) frame = window.requestAnimationFrame(tick);
    };

    const observer = new ResizeObserver(() => {
      if (resize()) draw();
    });
    observer.observe(canvas);

    const inView = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { rootMargin: "120px" },
    );
    inView.observe(canvas);

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      inView.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div className={cn("relative", className)} aria-hidden="true">
      {/*
        O site é export estático: sem JavaScript o canvas fica vazio. O símbolo
        chapado é servido no HTML e só sai de cena quando o arame já desenhou o
        primeiro quadro — nunca há um buraco na abertura.
      */}
      {!drawn && (
        <Mark
          weight={0.6}
          className="absolute inset-0 m-auto h-full w-auto text-volt-400 opacity-25"
        />
      )}
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
