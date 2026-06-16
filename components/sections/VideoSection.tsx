"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlay, HiX } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/dates";
import type { VideoMemory } from "@/types";
import videosData from "@/data/videos.json";

const videos = videosData as VideoMemory[];

const categories = [
  { key: "all", label: "All" },
  { key: "trips", label: "Trips" },
  { key: "birthdays", label: "Birthdays" },
  { key: "celebrations", label: "Celebrations" },
  { key: "family", label: "Family Moments" },
  { key: "wedding", label: "Wedding Prep" },
] as const;

export default function VideoSection() {
  const [category, setCategory] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<VideoMemory | null>(null);

  const filtered =
    category === "all"
      ? videos
      : videos.filter((v) => v.category === category);

  return (
    <section id="videos" className="section-padding" aria-label="Video memories">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Moving Memories"
          subtitle="Moments captured in motion"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm transition-colors cursor-pointer ${
                category === cat.key
                  ? "bg-rose-gold text-white"
                  : "glass hover:bg-rose-gold/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video, index) => (
            <motion.button
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveVideo(video)}
              className="group relative aspect-video rounded-2xl overflow-hidden glass cursor-pointer text-left"
              aria-label={`Play ${video.title}`}
            >
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/40 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                  <HiPlay className="w-6 h-6 text-rose-gold ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/80 to-transparent">
                <h3 className="text-white font-serif text-lg">{video.title}</h3>
                <p className="text-white/70 text-sm">{formatDate(video.date)}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/80 backdrop-blur-sm p-4"
              onClick={() => setActiveVideo(null)}
              role="dialog"
              aria-label={`Video: ${activeVideo.title}`}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-charcoal/60 text-white flex items-center justify-center cursor-pointer"
                  aria-label="Close video"
                >
                  <HiX className="w-5 h-5" />
                </button>
                <iframe
                  src={activeVideo.videoUrl}
                  title={activeVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
