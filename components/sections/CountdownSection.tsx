"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  getWeddingCountdown,
  getMarriedDuration,
  isWeddingPassed,
} from "@/lib/dates";
import { siteConfig } from "@/lib/config";

export default function CountdownSection() {
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(getWeddingCountdown());
  const [married, setMarried] = useState(getMarriedDuration());
  const [weddingPassed, setWeddingPassed] = useState(isWeddingPassed());

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const passed = isWeddingPassed();
      setWeddingPassed(passed);
      if (passed) {
        setMarried(getMarriedDuration());
      } else {
        setCountdown(getWeddingCountdown());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = weddingPassed
    ? [
        { value: married.years, label: "Years" },
        { value: married.months, label: "Months" },
        { value: married.days, label: "Days" },
      ]
    : [
        { value: countdown.days, label: "Days" },
        { value: countdown.hours, label: "Hours" },
        { value: countdown.minutes, label: "Minutes" },
        { value: countdown.seconds, label: "Seconds" },
      ];

  return (
    <section
      id="countdown"
      className="section-padding relative overflow-hidden"
      aria-label="Wedding countdown"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-soft/60 via-white to-pink-light/40 dark:from-charcoal dark:via-dusty-pink/10 dark:to-charcoal" />

      <div className="relative max-w-4xl mx-auto text-center">
        <SectionHeading
          title={weddingPassed ? "Married & Blessed" : "Counting Down to Forever"}
          subtitle={
            weddingPassed
              ? "Every moment since has been a blessing"
              : `Our wedding day — 26 June 2026`
          }
        />

        {mounted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <p className="text-lg text-muted mb-8">
              {weddingPassed
                ? "We've been married for..."
                : "Until we say 'I do'..."}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {timeUnits.map((unit, i) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 md:p-6"
                >
                  <div className="text-4xl md:text-5xl lg:text-6xl font-serif text-gradient mb-2 tabular-nums">
                    {unit.value}
                  </div>
                  <p className="text-sm uppercase tracking-wider text-charcoal/65 dark:text-cream/65">
                    {unit.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 text-rose-gold font-serif text-xl">
              {siteConfig.couple.name1} & {siteConfig.couple.name2}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
