# Panorama faces

The six images that make up the rotating skybox behind the main menu.

Right now these are **generated placeholders** produced by
`node scripts/generate-panorama.mjs`.

## Replacing them with your photos

Drop six photographs into `images/` at the repo root, named `1.jpg` … `6.jpg`,
then run:

```bash
node scripts/build-panorama.mjs
```

That downsizes each to 96px and writes `panorama_0.png` … `panorama_5.png` here.

## Why 96 pixels

The menu blurs and darkens this backdrop so the buttons stay readable. Rather
than pay for a runtime `filter: blur()` on an element several thousand pixels
wide, we ship tiny images and let the browser's smooth upscaling do the
blurring for free. The files end up around 15KB each.

## Face order

| File | Position |
| --- | --- |
| `panorama_0` | front |
| `panorama_1` | right |
| `panorama_2` | back |
| `panorama_3` | left |
| `panorama_4` | up |
| `panorama_5` | down |

If up and down look swapped on your screen, swap those two files — the sign of
the `rotateX` depends on which way the cube is wound.
