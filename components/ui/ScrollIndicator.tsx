"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      aria-label="Scroll down"
    >
      <span className="text-xs uppercase tracking-widest text-charcoal/55 dark:text-cream/55">
        Scroll
      </span>
      <motion.div
        className="w-6 h-10 rounded-full border-2 border-rose-gold/50 flex justify-center pt-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-1 h-2 rounded-full bg-rose-gold"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}
