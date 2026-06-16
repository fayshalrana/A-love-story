"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/dates";
import type { MapLocation } from "@/types";
import locationsData from "@/data/locations.json";

const locations = locationsData as MapLocation[];

const categoryLabels: Record<MapLocation["category"], string> = {
  "first-meeting": "First Meeting",
  "favorite-date": "Favorite Date",
  family: "Family Gathering",
  shopping: "Wedding Shopping",
  "wedding-venue": "Wedding Venue",
};

export default function LoveMapSection() {
  const [activeId, setActiveId] = useState(locations[0]?.id ?? "");

  const active = locations.find((l) => l.id === activeId) ?? locations[0];

  return (
    <section id="map" className="section-padding" aria-label="Love map">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Places We Love"
          subtitle="Every location holds a piece of our heart"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-soft via-white to-pink-light/30 dark:from-charcoal dark:via-dusty-pink/10 dark:to-charcoal">
              {locations.map((loc, i) => (
                <motion.button
                  key={loc.id}
                  onClick={() => setActiveId(loc.id)}
                  className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-xs cursor-pointer transition-all ${
                    activeId === loc.id
                      ? "bg-rose-gold text-white scale-125 shadow-lg shadow-rose-gold/40"
                      : "bg-white/80 text-rose-gold hover:scale-110"
                  }`}
                  style={{
                    left: `${20 + (i * 15) % 60}%`,
                    top: `${25 + (i * 12) % 50}%`,
                  }}
                  aria-label={`View ${loc.title}`}
                  whileTap={{ scale: 0.95 }}
                >
                  ♥
                </motion.button>
              ))}
            </div>
            <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4">
              <p className="text-xs uppercase tracking-wider text-rose-gold mb-1">
                {categoryLabels[active.category]}
              </p>
              <h3 className="font-serif text-xl">{active.title}</h3>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-3xl p-6 md:p-8"
            >
              <time className="text-sm text-rose-gold">
                {formatDate(active.date)}
              </time>
              <h3 className="text-2xl font-serif mt-2 mb-4">{active.title}</h3>
              <p className="text-muted leading-relaxed mb-6">
                {active.description}
              </p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {active.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`${active.title} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setActiveId(loc.id)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                      activeId === loc.id
                        ? "bg-rose-gold text-white"
                        : "bg-rose-gold/10 text-rose-gold hover:bg-rose-gold/20"
                    }`}
                  >
                    {categoryLabels[loc.category]}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
