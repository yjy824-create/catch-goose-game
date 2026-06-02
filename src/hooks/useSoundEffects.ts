import { useCallback, useEffect, useRef, useState } from 'react';
import { imageAssets } from '../data/assets';

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

type SoundName = 'tap' | 'match' | 'win' | 'lose' | 'tool';

const SOUND_ENABLED_KEY = 'catch-goose-sound-enabled';
const SOUND_VOLUME_KEY = 'catch-goose-sound-volume';
const DEFAULT_VOLUME = 0.7;

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

const clampVolume = (value: number) => Math.min(1, Math.max(0, value));

const readSoundEnabled = () => {
  if (typeof window === 'undefined') return true;
  const value = window.localStorage.getItem(SOUND_ENABLED_KEY);
  return value === null ? true : value === 'true';
};

const readSoundVolume = () => {
  if (typeof window === 'undefined') return DEFAULT_VOLUME;
  const value = window.localStorage.getItem(SOUND_VOLUME_KEY);
  if (value === null) return DEFAULT_VOLUME;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? clampVolume(parsed) : DEFAULT_VOLUME;
};

export const useSoundEffects = () => {
  const contextRef = useRef<AudioContext | null>(null);
  const audioRef = useRef<Partial<Record<SoundName, HTMLAudioElement>>>({});
  const failedMp3Ref = useRef<Partial<Record<SoundName, boolean>>>({});
  const [soundEnabled, setSoundEnabled] = useState(readSoundEnabled);
  const [soundVolume, setSoundVolumeState] = useState(readSoundVolume);

  const setSoundVolume = useCallback((value: number) => {
    setSoundVolumeState(clampVolume(value));
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((enabled) => !enabled);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(SOUND_ENABLED_KEY, String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(SOUND_VOLUME_KEY, String(soundVolume));
    Object.values(audioRef.current).forEach((audio) => {
      if (audio) audio.volume = soundVolume;
    });
  }, [soundVolume]);

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
      if (!soundEnabled || soundVolume <= 0) return;

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
        gain.gain.exponentialRampToValueAtTime((note.gain ?? 0.045) * soundVolume, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + note.duration);

        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(start);
        oscillator.stop(start + note.duration + 0.03);
      });
    },
    [getContext, soundEnabled, soundVolume]
  );

  const getAudio = useCallback((name: SoundName) => {
    if (typeof window === 'undefined' || failedMp3Ref.current[name]) return null;

    if (!audioRef.current[name]) {
      const audio = new Audio(mp3Map[name]);
      audio.preload = 'auto';
      audio.volume = soundVolume;
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
  }, [soundVolume]);

  const play = useCallback(
    (name: SoundName) => {
      if (!soundEnabled || soundVolume <= 0) return;

      const audio = getAudio(name);
      if (!audio) {
        playSynth(name);
        return;
      }

      try {
        audio.volume = soundVolume;
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
    [getAudio, playSynth, soundEnabled, soundVolume]
  );

  return {
    play,
    soundEnabled,
    soundVolume,
    setSoundVolume,
    toggleSound
  };
};
