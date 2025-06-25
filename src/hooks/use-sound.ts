"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// Using web URLs for sound files as a placeholder.
const SOUND_FILES = {
  dice: '/dice.mp3',
  move: '/move.mp3',
  win: '/win.mp3',
  click: '/click.mp3',
  background: '/background music.mp3',
  start: '/start.mp3',
};

type SoundEffect = keyof Omit<typeof SOUND_FILES, 'background'>;

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (type: SoundEffect) => void;
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  setVolume: (v: number) => void;
  volume: number;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);

  // Load mute state and volume from localStorage on initial client load
  useEffect(() => {
    const savedMuteState = localStorage.getItem('ludoMuted');
    if (savedMuteState !== null) {
      setIsMuted(JSON.parse(savedMuteState));
    }
    const savedVolume = localStorage.getItem('ludoVolume');
    if (savedVolume !== null) {
      setVolume(Number(savedVolume));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ludoVolume', String(volume));
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.volume = volume;
    }
  }, [volume]);

  const playBackgroundMusic = useCallback(() => {
    if (isMuted) return;

    if (!backgroundAudioRef.current) {
        try {
            backgroundAudioRef.current = new Audio(SOUND_FILES.background);
            backgroundAudioRef.current.loop = true;
            backgroundAudioRef.current.volume = volume;
        } catch (error) {
            console.error("Could not create background audio element", error);
            return;
        }
    }

    if (backgroundAudioRef.current.paused) {
        backgroundAudioRef.current.play().catch(e => {
            // This error is expected on first load before user interaction
            console.log("Browser prevented audio from playing automatically. Waiting for user interaction.");
        });
    }
  }, [isMuted, volume]);

  const stopBackgroundMusic = useCallback(() => {
    if (backgroundAudioRef.current && !backgroundAudioRef.current.paused) {
      backgroundAudioRef.current.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    localStorage.setItem('ludoMuted', JSON.stringify(newMutedState));

    if (newMutedState) {
      stopBackgroundMusic();
    } else {
      // If unmuting, try to play music. It will only play if user has interacted.
      playBackgroundMusic();
    }
  }, [isMuted, playBackgroundMusic, stopBackgroundMusic]);

  // Effect to handle the first user interaction to enable audio
  useEffect(() => {
    const handleFirstInteraction = () => {
        // Now that the user has interacted, we can safely play our music
        if (!isMuted) {
            playBackgroundMusic();
        }
        // Remove the event listener so it only runs once
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isMuted, playBackgroundMusic]);


  const playSound = useCallback((type: SoundEffect) => {
    if (isMuted) return;
    try {
      const audio = new Audio(SOUND_FILES[type]);
      audio.volume = volume;
      audio.play().catch(e => console.error(`Error playing sound: ${type}`, e));
    } catch (error) {
      console.error("Could not play sound", error);
    }
  }, [isMuted, volume]);

  const value = { isMuted, toggleMute, playSound, playBackgroundMusic, stopBackgroundMusic, setVolume, volume };

  return React.createElement(SoundContext.Provider, { value }, children);
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
