"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FloatingHearts from "@/components/ui/FloatingHearts";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { scrollToSection } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-pink-soft/80 to-white dark:from-charcoal dark:via-dusty-pink/5 dark:to-charcoal" />
      <FloatingHearts />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <motion.p
            className="text-sm uppercase tracking-[0.3em] text-rose-gold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            A Love Story
          </motion.p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif mb-6">
            <span className="text-gradient">Fayshal</span>
            <span className="text-dusty-pink mx-3 md:mx-4">❤️</span>
            <span className="text-gradient">Juthy</span>
          </h1>
          <motion.p
            className="text-lg md:text-xl text-muted mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            22 June 2017 – 26 June 2026
          </motion.p>
          <motion.p
            className="text-base md:text-lg text-charcoal/65 dark:text-cream/65 mb-10 max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            9 Years of Love, Friendship, Growth, and Togetherness.
          </motion.p>
          <motion.button
            onClick={() => scrollToSection("stats")}
            className="px-8 py-4 btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            Begin Our Story
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative"
        >
          <div className="relative aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-rose-gold/20">
            <Image
              src="/hero.jpg"
              alt="Fayshal and Juthy"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-dusty-pink/20 blur-2xl" />
          <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-rose-gold/20 blur-2xl" />
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
