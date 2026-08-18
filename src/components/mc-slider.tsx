"use client";

import { playClick } from "@/lib/sound";

type McSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  format?: (value: number) => string;
  onChange: (next: number) => void;
};

export function McSlider({ label, value, min, max, step = 1, format, onChange }: McSliderProps) {
  return (
    <div className="mc-slider">
      <input
        className="mc-slider__input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(event) => onChange(Number(event.target.value))}
        // Only on release: clicking per change event machine-guns while dragging.
        onPointerUp={() => playClick()}
      />
      <span className="mc-slider__label" aria-hidden="true">
        {label}: {format ? format(value) : value}
      </span>
    </div>
  );
}
