"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/** Skin-tile palette, sampled from the reference photo. */
const SKIN = "#b8795a";
const HAIR = "#17110d";
const SHIRT = "#171a2c";
const SHIRT_PRINT = "#9fb59a";
const SPECKLE = "#9a9fb8";
const PANTS = "#2b3fb0";
const PANTS_DARK = "#222f8c";
const SHOE = "#1d1d22";
const SOLE = "#8a8a90";

const HEAD_MAX_YAW = THREE.MathUtils.degToRad(60);
const HEAD_MAX_PITCH = 0.35;

type Painter = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

/** A tiny pixel-art texture; NearestFilter keeps every texel a hard square. */
function pixelTexture(w: number, h: number, paint: Painter): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  paint(ctx, w, h);
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Deterministic scatter so the shirt speckles are identical on every load. */
function seeded(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const fill = (ctx: CanvasRenderingContext2D, color: string, x: number, y: number, w: number, h: number) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

const speckles = (ctx: CanvasRenderingContext2D, w: number, h: number, seed: number, count: number) => {
  const rand = seeded(seed);
  for (let i = 0; i < count; i++) fill(ctx, SPECKLE, Math.floor(rand() * w), Math.floor(rand() * h), 1, 1);
};

function useTextures() {
  return useMemo(() => {
    const solid = (color: string, w = 8, h = 8) => pixelTexture(w, h, (c) => fill(c, color, 0, 0, w, h));

    const hairFront = pixelTexture(8, 8, (c) => {
      fill(c, SKIN, 0, 0, 8, 8);
      fill(c, HAIR, 0, 0, 8, 2);
      fill(c, HAIR, 0, 2, 1, 1);
      fill(c, HAIR, 7, 2, 1, 1);
      fill(c, "#ffffff", 1, 4, 2, 1);
      fill(c, "#ffffff", 5, 4, 2, 1);
      fill(c, HAIR, 2, 4, 1, 1);
      fill(c, HAIR, 5, 4, 1, 1);
      fill(c, "#8a4f3a", 3, 6, 2, 1);
    });
    const hairSide = pixelTexture(8, 8, (c) => {
      fill(c, SKIN, 0, 0, 8, 8);
      fill(c, HAIR, 0, 0, 8, 3);
    });
    const hairBack = pixelTexture(8, 8, (c) => {
      fill(c, SKIN, 0, 0, 8, 8);
      fill(c, HAIR, 0, 0, 8, 5);
    });

    const torsoFront = pixelTexture(8, 12, (c, w, h) => {
      fill(c, SHIRT, 0, 0, w, h);
      speckles(c, w, h, 7, 12);
      fill(c, SHIRT_PRINT, 1, 2, 6, 1);
      fill(c, SHIRT_PRINT, 2, 3, 4, 1);
    });
    const torsoPlain = pixelTexture(8, 12, (c, w, h) => {
      fill(c, SHIRT, 0, 0, w, h);
      speckles(c, w, h, 11, 12);
    });

    const upperSleeve = pixelTexture(4, 6, (c, w, h) => {
      fill(c, SHIRT, 0, 0, w, h);
      speckles(c, w, h, 3, 6);
    });
    const forearm = pixelTexture(4, 6, (c, w, h) => {
      fill(c, SHIRT, 0, 0, w, h);
      speckles(c, w, h, 5, 4);
      fill(c, SKIN, 0, 3, w, 3);
    });

    const legUpper = pixelTexture(4, 8, (c, w, h) => {
      fill(c, PANTS, 0, 0, w, h);
      fill(c, PANTS_DARK, 0, 0, 1, h);
    });
    const shoe = pixelTexture(4, 4, (c, w, h) => {
      fill(c, SHOE, 0, 0, w, h);
      fill(c, SOLE, 0, 3, w, 1);
    });

    return {
      head: [hairSide, hairSide, solid(HAIR), solid(SKIN), hairFront, hairBack],
      torso: [torsoPlain, torsoPlain, torsoPlain, torsoPlain, torsoFront, torsoPlain],
      upperSleeve,
      forearm,
      legUpper,
      shoe,
    };
  }, []);
}

type BoxProps = {
  size: [number, number, number];
  position?: [number, number, number];
  map: THREE.Texture | THREE.Texture[];
};

function Box({ size, position, map }: BoxProps) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      {Array.isArray(map) ? (
        map.map((texture, i) => <meshLambertMaterial key={i} attach={`material-${i}`} map={texture} />)
      ) : (
        <meshLambertMaterial map={map} />
      )}
    </mesh>
  );
}

/** Upper arm hangs from the shoulder; the forearm folds back up to the chin. */
function Arm({ side, textures }: { side: 1 | -1; textures: ReturnType<typeof useTextures> }) {
  return (
    <group position={[6 * side, 22, 0]} rotation={[0, 0, 0.45 * side]}>
      <Box size={[4, 6, 4]} position={[0, -3, 0]} map={textures.upperSleeve} />
      <group position={[0, -6, 0]} rotation={[0, 0, -3.1 * side]}>
        <Box size={[4, 6, 4]} position={[0, -3, 0]} map={textures.forearm} />
      </group>
    </group>
  );
}

function Leg({ x, textures }: { x: number; textures: ReturnType<typeof useTextures> }) {
  return (
    <group position={[x, 0, 0]}>
      <Box size={[4, 8, 4]} position={[0, 8, 0]} map={textures.legUpper} />
      <Box size={[4, 4, 4.4]} position={[0, 2, 0.2]} map={textures.shoe} />
    </group>
  );
}

function Character({ animate }: { animate: boolean }) {
  const textures = useTextures();
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }, delta) => {
    if (!root.current || !head.current) return;
    const t = animate ? clock.elapsedTime : 0;
    root.current.rotation.y = -0.5 + Math.sin(t * 0.6) * 0.45;
    root.current.position.y = Math.sin(t * 1.6) * 0.5;
    // The head follows the pointer from -60 to +60 degrees and no further.
    const yaw = animate ? THREE.MathUtils.clamp(pointer.x, -1, 1) * HEAD_MAX_YAW : 0;
    const pitch = animate ? THREE.MathUtils.clamp(-pointer.y, -1, 1) * HEAD_MAX_PITCH : 0;
    head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, yaw, 6, delta);
    head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, pitch, 6, delta);
  });

  return (
    <group scale={1 / 16} position={[0, -1, 0]}>
      <group ref={root}>
        <Leg x={-2.4} textures={textures} />
        <Leg x={2.4} textures={textures} />
        <Box size={[8, 12, 4]} position={[0, 18, 0]} map={textures.torso} />
        <Arm side={1} textures={textures} />
        <Arm side={-1} textures={textures} />
        <group ref={head} position={[0, 24, 0]}>
          <Box size={[8, 8, 8]} position={[0, 4, 0]} map={textures.head} />
        </group>
      </group>
    </group>
  );
}

/** Honours the in-game Motion option as well as the OS-level preference. */
function useAnimate(): boolean {
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    const read = () => {
      const mode = document.documentElement.dataset.motion;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setAnimate(mode === "on" || (mode !== "off" && !reduced));
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
    return () => observer.disconnect();
  }, []);
  return animate;
}

export default function AvatarScene() {
  const animate = useAnimate();
  return (
    <Canvas
      eventSource={document.body}
      eventPrefix="client"
      frameloop={animate ? "always" : "demand"}
      camera={{ position: [0, 0.15, 5.2], fov: 28 }}
      gl={{ alpha: true, antialias: false }}
      dpr={[1, 2]}
      aria-label="Blocky 3D avatar of Omkar"
      role="img"
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[2, 4, 5]} intensity={2.2} />
      <Character animate={animate} />
    </Canvas>
  );
}
