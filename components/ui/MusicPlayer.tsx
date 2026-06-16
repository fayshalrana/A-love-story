"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMusicalNote, HiPause } from "react-icons/hi2";

const MUSIC_SOURCES = [
  "/music/background.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
];

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [pendingPlay, setPendingPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();

    if (pendingPlay) {
      audio.muted = false;
      audio.volume = 0.35;
      audio
        .play()
        .then(() => {
          setPlaying(true);
          setPendingPlay(false);
        })
        .catch(() => {
          if (sourceIndex < MUSIC_SOURCES.length - 1) {
            setSourceIndex((i) => i + 1);
          } else {
            setPlaying(false);
            setPendingPlay(false);
          }
        });
    }
  }, [sourceIndex, pendingPlay]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      setPendingPlay(false);
      return;
    }

    audio.muted = false;
    audio.volume = 0.35;

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPendingPlay(true);
      if (sourceIndex < MUSIC_SOURCES.length - 1) {
        setSourceIndex((i) => i + 1);
      } else {
        setPendingPlay(false);
      }
    }
  };

  const handleError = () => {
    setPlaying(false);
    if (sourceIndex < MUSIC_SOURCES.length - 1) {
      setSourceIndex((i) => i + 1);
      setPendingPlay(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onError={handleError}
      >
        <source src={MUSIC_SOURCES[sourceIndex]} type="audio/mpeg" />
      </audio>
      <motion.button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-rose-gold hover:scale-110 transition-transform"
        whileTap={{ scale: 0.95 }}
        aria-label={playing ? "Pause background music" : "Play background music"}
        title={playing ? "Pause music" : "Play music"}
      >
        {playing ? (
          <HiPause className="w-5 h-5" />
        ) : (
          <HiMusicalNote className="w-5 h-5" />
        )}
      </motion.button>
    </>
  );
}
