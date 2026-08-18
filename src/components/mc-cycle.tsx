"use client";

import { playClick } from "@/lib/sound";

type McCycleProps<T> = {
  label: string;
  value: T;
  values: readonly T[];
  format?: (value: T) => string;
  onChange: (next: T) => void;
};

export function McCycle<T>({ label, value, values, format, onChange }: McCycleProps<T>) {
  // indexOf returning -1 lands on index 0, which is a sane recovery if the
  // stored value ever falls outside the list.
  const next = values[(values.indexOf(value) + 1) % values.length];

  return (
    <button
      type="button"
      className="mc-widget mc-cycle"
      onClick={() => {
        // Apply first so Sound Off mutes the click that toggled it.
        onChange(next);
        playClick();
      }}
    >
      <span className="mc-widget__label">
        {label}: {format ? format(value) : String(value)}
      </span>
    </button>
  );
}
