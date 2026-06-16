"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 800);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-charcoal"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          role="status"
          aria-label="Loading"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              className="flex items-center justify-center gap-2 md:gap-3 text-6xl md:text-8xl font-serif mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-gradient">F</span>
              <Image
                src="/cate face.png"
                alt=""
                width={64}
                height={64}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover object-top ring-2 ring-pink-light/70 dark:ring-rose-gold/40"
                aria-hidden
                priority
              />
              <span className="text-gradient">J</span>
            </motion.div>
            <motion.p
              className="text-charcoal/60 dark:text-cream/60 text-sm tracking-[0.3em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Our Love Story
            </motion.p>
            <motion.div
              className="mt-8 mx-auto w-32 h-0.5 bg-gradient-to-r from-transparent via-rose-gold to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
