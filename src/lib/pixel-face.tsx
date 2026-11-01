/**
 * The avatar's face as an 8x8 pixel grid, shared by the favicon and the social
 * preview image. Colours match the in-scene head texture.
 */
const S = "#b8795a"; // skin
const H = "#17110d"; // hair
const W = "#ffffff"; // eye white
const M = "#8a4f3a"; // mouth

const FACE: string[][] = [
  [H, H, H, H, H, H, H, H],
  [H, H, H, H, H, H, H, H],
  [H, S, S, S, S, S, S, H],
  [S, S, S, S, S, S, S, S],
  [S, W, H, S, S, H, W, S],
  [S, S, S, S, S, S, S, S],
  [S, S, S, M, M, S, S, S],
  [S, S, S, S, S, S, S, S],
];

/** Renders for satori (next/og): flex rows of fixed-size squares. */
export function PixelFace({ cell }: { cell: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FACE.map((row, y) => (
        <div key={y} style={{ display: "flex" }}>
          {row.map((color, x) => (
            <div key={x} style={{ width: cell, height: cell, background: color }} />
          ))}
        </div>
      ))}
    </div>
  );
}
