/**
 * The rotating skybox behind the main menu.
 *
 * This is a CSS 3D cube rather than a WebGL scene. Minecraft's panorama is
 * literally a textured cube with a slowly turning camera, which
 * `transform-style: preserve-3d` renders natively — so the landing page does
 * not have to pay for Three.js.
 *
 * The face images are intentionally tiny (96px). Scaling them to viewport size
 * lets the browser's smooth upscaling supply the blur, which avoids a
 * `filter: blur()` on an element several thousand pixels wide.
 */
const FACES = [0, 1, 2, 3, 4, 5];

export function Panorama() {
  return (
    <div className="panorama" aria-hidden="true">
      <div className="panorama__cube">
        {FACES.map((face) => (
          <div
            key={face}
            className="panorama__face"
            data-face={face}
            style={{ backgroundImage: `url(/panorama/panorama_${face}.png)` }}
          />
        ))}
      </div>
      <div className="panorama__veil" />
    </div>
  );
}
