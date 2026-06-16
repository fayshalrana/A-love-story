"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Letter } from "@/types";
import lettersData from "@/data/letters.json";

const { fayshalToJuthy, juthyToFayshal } = lettersData as {
  fayshalToJuthy: Letter;
  juthyToFayshal: Letter;
};

function LetterCard({ letter, index }: { letter: Letter; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="paper-card rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 md:p-8 flex items-center justify-between cursor-pointer text-left"
        aria-expanded={expanded}
      >
        <div>
          <p className="text-sm text-rose-gold uppercase tracking-wider mb-1">
            A letter from
          </p>
          <h3 className="font-serif text-2xl md:text-3xl">
            {letter.from} <span className="text-dusty-pink">to</span> {letter.to}
          </h3>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
          <HiChevronDown className="w-6 h-6 text-rose-gold" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 border-t border-rose-gold/10">
              <div className="pt-6 font-serif text-base md:text-lg leading-relaxed whitespace-pre-line text-charcoal/85 dark:text-cream/85">
                {letter.content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LettersSection() {
  return (
    <section id="letters" className="section-padding" aria-label="Love letters">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          title="Letters from the Heart"
          subtitle="Words too precious to keep hidden"
        />

        <div className="space-y-6">
          <LetterCard letter={fayshalToJuthy} index={0} />
          <LetterCard letter={juthyToFayshal} index={1} />
        </div>
      </div>
    </section>
  );
}
