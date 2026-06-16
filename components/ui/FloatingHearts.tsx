"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<
    { id: number; x: number; delay: number; size: number }[]
  >([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        size: Math.random() * 12 + 8,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute text-dusty-pink/30"
          style={{
            left: `${heart.x}%`,
            fontSize: heart.size,
            bottom: "-20px",
          }}
          animate={{
            y: [0, -800],
            opacity: [0, 0.6, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
