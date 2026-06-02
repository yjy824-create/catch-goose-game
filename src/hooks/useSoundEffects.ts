import { useCallback, useRef } from 'react';
import { imageAssets } from '../data/assets';

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

type SoundName = 'tap' | 'match' | 'win' | 'lose' | 'tool';

type Note = {
  frequency: number;
  duration: number;
  delay?: number;
  type?: OscillatorType;
  gain?: number;
};

const soundMap: Record<SoundName, Note[]> = {
  tap: [{ frequency: 520, duration: 0.055, type: 'triangle', gain: 0.055 }],
  tool: [
    { frequency: 360, duration: 0.06, type: 'sine', gain: 0.045 },
    { frequency: 520, duration: 0.07, delay: 0.055, type: 'sine', gain: 0.04 }
  ],
  match: [
    { frequency: 540, duration: 0.07, type: 'triangle', gain: 0.055 },
    { frequency: 720, duration: 0.09, delay: 0.065, type: 'triangle', gain: 0.05 },
    { frequency: 960, duration: 0.11, delay: 0.13, type: 'triangle', gain: 0.045 }
  ],
  win: [
    { frequency: 523.25, duration: 0.09, type: 'sine', gain: 0.05 },
    { frequency: 659.25, duration: 0.09, delay: 0.09, type: 'sine', gain: 0.05 },
    { frequency: 783.99, duration: 0.12, delay: 0.18, type: 'sine', gain: 0.048 },
    { frequency: 1046.5, duration: 0.18, delay: 0.3, type: 'triangle', gain: 0.04 }
  ],
  lose: [
    { frequency: 260, duration: 0.12, type: 'sawtooth', gain: 0.035 },
    { frequency: 190, duration: 0.18, delay: 0.11, type: 'sawtooth', gain: 0.03 }
  ]
};

const mp3Map: Record<SoundName, string> = {
  tap: imageAssets.sfx.click,
  match: imageAssets.sfx.match,
  win: imageAssets.sfx.win,
  lose: imageAssets.sfx.fail,
  tool: imageAssets.sfx.tool
};

export const useSoundEffects = () => {
  const contextRef = useRef<AudioContext | null>(null);
  const audioRef = useRef<Partial<Record<SoundName, HTMLAudioElement>>>({});
  const failedMp3Ref = useRef<Partial<Record<SoundName, boolean>>>({});

  const getContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    if (!contextRef.current) {
      contextRef.current = new AudioContextClass();
    }

    if (contextRef.current.state === 'suspended') {
      void contextRef.current.resume();
    }

    return contextRef.current;
  }, []);

  const playSynth = useCallback(
    (name: SoundName) => {
      const context = getContext();
      if (!context) return;

      const now = context.currentTime;
      soundMap[name].forEach((note) => {
        const start = now + (note.delay ?? 0);
        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.type = note.type ?? 'sine';
        oscillator.frequency.setValueAtTime(note.frequency, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(note.gain ?? 0.045, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + note.duration);

        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(start);
        oscillator.stop(start + note.duration + 0.03);
      });
    },
    [getContext]
  );

  const getAudio = useCallback((name: SoundName) => {
    if (typeof window === 'undefined' || failedMp3Ref.current[name]) return null;

    if (!audioRef.current[name]) {
      const audio = new Audio(mp3Map[name]);
      audio.preload = 'auto';
      audio.volume = 0.72;
      audio.addEventListener(
        'error',
        () => {
          failedMp3Ref.current[name] = true;
        },
        { once: true }
      );
      audioRef.current[name] = audio;
    }

    return audioRef.current[name] ?? null;
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      const audio = getAudio(name);
      if (!audio) {
        playSynth(name);
        return;
      }

      try {
        audio.currentTime = 0;
        const playback = audio.play();
        if (playback) {
          void playback.catch(() => {
            failedMp3Ref.current[name] = true;
            playSynth(name);
          });
        }
      } catch {
        failedMp3Ref.current[name] = true;
        playSynth(name);
      }
    },
    [getAudio, playSynth]
  );

  return { play };
};
