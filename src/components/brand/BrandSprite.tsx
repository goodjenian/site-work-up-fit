import { MARK_PATH } from "./mark-path";

/**
 * Defines the brand symbol once per document so `Mark` can reference it with
 * `<use>` instead of repeating ~11KB of path data. A page renders the mark up
 * to three times (header, footer, decorative watermark); inlining it each time
 * would add ~33KB of HTML for one shape.
 *
 * `fill`/`stroke` stay `currentColor` and `stroke-width` is left unset, so both
 * inherit across the `<use>` shadow boundary from whatever `Mark` sets.
 */
export function BrandSprite() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
      {/* viewBox is cropped to the inked area: the path sits in a 100×100 box but
            the mark is 76.24 wide, so a square box would add phantom side padding
            and break the lock-up spacing. */}
      <symbol id="wuf-mark" viewBox="11.88 0 76.24 100">
        <path d={MARK_PATH} fill="currentColor" fillRule="evenodd" stroke="currentColor" />
      </symbol>
    </svg>
  );
}
