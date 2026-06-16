"use client";

import { motion } from "framer-motion";
import FloatingHearts from "@/components/ui/FloatingHearts";

export default function ClosingSection() {
  return (
    <section
      id="forever"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Closing"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-pink-soft/70 to-pink-light/30 dark:from-charcoal dark:via-dusty-pink/10 dark:to-charcoal" />
      <FloatingHearts />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4 max-w-3xl mx-auto"
      >
        <motion.p
          className="text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          9 years ago, we met.
          <br />
          <span className="text-gradient">Today, we choose each other forever.</span>
        </motion.p>

        <motion.p
          className="text-xl md:text-2xl font-serif text-rose-gold mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          — Fayshal & Juthy
        </motion.p>

        <motion.p
          className="text-charcoal/60 dark:text-cream/60 tracking-widest uppercase text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        >
          26 June 2026
        </motion.p>

        <motion.div
          className="mt-12 mx-auto w-48 h-px bg-gradient-to-r from-transparent via-rose-gold to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1 }}
        />

        <p className="mt-8 text-xs text-charcoal/40 dark:text-cream/40">
          Made with love ♥
        </p>
      </motion.div>
    </section>
  );
}
