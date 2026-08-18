let context: AudioContext | null = null;

type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext };

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!context) {
    const Ctor = window.AudioContext ?? (window as WebkitWindow).webkitAudioContext;
    if (!Ctor) return null;
    context = new Ctor();
  }
  return context;
}

/** A short wooden click: a square blip, pitch-dropped, low-passed, fast decay. */
export function playClick(): void {
  if (typeof document === "undefined") return;
  if (document.documentElement.dataset.sound === "off") return;

  const audio = getContext();
  if (!audio) return;

  // Constructed on a real gesture, but a restored tab can hand back a
  // suspended context. Resume, then bail if it still will not start.
  if (audio.state === "suspended") {
    void audio.resume().then(() => {
      if (audio.state === "running") playClickNow(audio);
    });
    return;
  }

  playClickNow(audio);
}

function playClickNow(audio: AudioContext): void {
  if (document.documentElement.dataset.sound === "off") return;

  const now = audio.currentTime;
  const osc = audio.createOscillator();
  const tone = audio.createBiquadFilter();
  const gain = audio.createGain();

  osc.type = "square";
  osc.frequency.setValueAtTime(1500, now);
  osc.frequency.exponentialRampToValueAtTime(620, now + 0.03);

  // Takes the edge off the square wave, closer to wood than to a beep.
  tone.type = "lowpass";
  tone.frequency.setValueAtTime(2600, now);

  // exponentialRampToValueAtTime cannot target zero, hence the epsilons.
  // Peak 0.22 is audible on typical laptop speakers without being harsh.
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.22, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

  osc.connect(tone).connect(gain).connect(audio.destination);
  osc.start(now);
  osc.stop(now + 0.07);
}
