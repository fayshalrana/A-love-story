"use client";

import { motion } from "framer-motion";
import { HiHome, HiGlobeAlt, HiHeart, HiSparkles } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import type { FutureDream } from "@/types";
import dreamsData from "@/data/dreams.json";

const dreams = dreamsData as FutureDream[];

const iconMap: Record<string, React.ReactNode> = {
  home: <HiHome className="w-8 h-8" />,
  globe: <HiGlobeAlt className="w-8 h-8" />,
  heart: <HiHeart className="w-8 h-8" />,
  infinity: <HiSparkles className="w-8 h-8" />,
};

export default function DreamsSection() {
  return (
    <section
      id="dreams"
      className="section-padding bg-gradient-to-b from-transparent via-dusty-pink/5 to-transparent"
      aria-label="Future dreams"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Our Future Dreams"
          subtitle="The adventures yet to come"
        />

        <div className="grid sm:grid-cols-2 gap-6">
          {dreams.map((dream, index) => (
            <motion.div
              key={dream.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-8 group cursor-default"
            >
              <div className="text-rose-gold mb-4 group-hover:scale-110 transition-transform">
                {iconMap[dream.icon] ?? <HiHeart className="w-8 h-8" />}
              </div>
              <h3 className="font-serif text-2xl mb-3">{dream.title}</h3>
              <p className="text-muted leading-relaxed">
                {dream.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
