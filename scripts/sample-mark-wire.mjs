/**
 * Gera `src/components/brand/mark-wire.ts` a partir de `MARK_PATH`.
 *
 * Por que um navegador: `getPointAtLength` é a única maneira confiável de
 * percorrer curvas de Bézier a passo constante de comprimento de arco sem
 * trazer uma biblioteca de geometria só para isso. O Chrome headless faz a
 * conta e o resultado é gravado como dado — nada disso roda em produção.
 *
 * Uso: node scripts/sample-mark-wire.mjs
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SPACING = 1.8; // unidades da marca entre amostras
const OUT = path.join(ROOT, "src/components/brand/mark-wire.ts");

const src = fs.readFileSync(path.join(ROOT, "src/components/brand/mark-path.ts"), "utf8");
const match = src.match(/MARK_PATH\s*=\s*"([^"]+)"/);
if (!match) throw new Error("MARK_PATH não encontrado em mark-path.ts");
const subpaths = match[1].split(/(?=M)/).filter(Boolean);

const port = 9500 + Math.floor(Math.random() * 400);
const chrome = spawn(
  CHROME,
  ["--headless=new", `--remote-debugging-port=${port}`, "--no-first-run", "about:blank"],
  { stdio: "ignore" },
);

let target;
for (let i = 0; i < 80 && !target; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    target = list.find((t) => t.type === "page");
  } catch {
    /* o navegador ainda não subiu */
  }
  if (!target) await new Promise((r) => setTimeout(r, 250));
}
if (!target) throw new Error("Chrome headless não respondeu");

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve) => (ws.onopen = resolve));
let nextId = 0;
const pending = new Map();
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const id = ++nextId;
    pending.set(id, resolve);
    ws.send(JSON.stringify({ id, method, params }));
  });

const expression = `(() => {
  const subpaths = ${JSON.stringify(subpaths)};
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  document.body.appendChild(svg);
  const loops = subpaths.map((d) => {
    const node = document.createElementNS("http://www.w3.org/2000/svg", "path");
    node.setAttribute("d", d);
    svg.appendChild(node);
    const total = node.getTotalLength();
    const count = Math.max(12, Math.round(total / ${SPACING}));
    const points = [];
    for (let i = 0; i < count; i++) {
      const p = node.getPointAtLength((i / count) * total);
      points.push([Math.round(p.x * 100) / 100, Math.round(p.y * 100) / 100]);
    }
    node.remove();
    return points;
  });
  return JSON.stringify(loops);
})()`;

const response = await send("Runtime.evaluate", { expression, returnByValue: true });
const loops = JSON.parse(response.result.result.value);
ws.close();
chrome.kill();

const CX = 50;
const CY = 50;
const body = loops
  .map((points) => "  [" + points.map(([x, y]) => `${+(x - CX).toFixed(1)},${+(y - CY).toFixed(1)}`).join(",") + "],")
  .join("\n");

const header = `/**
 * O símbolo da Work Up Fit amostrado como polilinhas fechadas, para desenho
 * em canvas. GERADO — edite \`scripts/sample-mark-wire.mjs\`, não este arquivo.
 *
 * Cada subpath de \`MARK_PATH\` foi percorrido a passo constante de ${SPACING}
 * unidade de comprimento de arco e os pontos foram centrados na caixa entintada
 * da marca (viewBox \`11.88 0 76.24 100\`, centro 50, 50). Em unidades da marca,
 * x vai de -38,1 a 38,1 e y de -50 a 50.
 *
 * São ${loops.length} contornos porque o traço da marca é um fio: cada triângulo
 * entra com um contorno externo e um interno. Extrudados em z, os dois viram as
 * duas bordas de uma fita — é daí que vem o volume do arame.
 *
 * Por que pré-calculado: medir em tempo de execução exigiria um SVG no
 * documento e uma passada de layout antes do primeiro quadro, atrasando a
 * abertura e deixando o desenho à mercê do momento em que CSS e fonte chegam.
 */
export const MARK_LOOPS: readonly (readonly number[])[] = [
${body}
];

/** Meia-largura e meia-altura da marca, em unidades da marca. */
export const MARK_HALF_W = 38.12;
export const MARK_HALF_H = 50;
`;

fs.writeFileSync(OUT, header);
console.log(
  `mark-wire.ts: ${loops.length} contornos, ${loops.reduce((a, l) => a + l.length, 0)} pontos`,
);
process.exit(0);
