"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import SectionHeading from "@/components/ui/SectionHeading";
import type { GalleryImage } from "@/types";
import galleryData from "@/data/gallery.json";

const images = galleryData as GalleryImage[];
const years = Array.from(new Set(images.map((img) => img.year))).sort();

export default function GallerySection() {
  const [activeYear, setActiveYear] = useState<number | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered = useMemo(
    () =>
      activeYear === "all"
        ? images
        : images.filter((img) => img.year === activeYear),
    [activeYear]
  );

  const slides = filtered.map((img) => ({ src: img.src, alt: img.alt }));

  return (
    <section
      id="gallery"
      className="section-padding bg-gradient-to-b from-transparent via-rose-gold/5 to-transparent"
      aria-label="Memory gallery"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Memories by Year"
          subtitle="A polaroid collection of our favorite moments"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveYear("all")}
            className={`px-4 py-2 rounded-full text-sm transition-colors cursor-pointer ${
              activeYear === "all"
                ? "bg-rose-gold text-white"
                : "glass hover:bg-rose-gold/10"
            }`}
          >
            All
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-4 py-2 rounded-full text-sm transition-colors cursor-pointer ${
                activeYear === year
                  ? "bg-rose-gold text-white"
                  : "glass hover:bg-rose-gold/10"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {filtered.map((img, index) => (
            <motion.button
              key={img.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setLightboxIndex(index)}
              className="polaroid block w-full break-inside-avoid cursor-pointer group"
              aria-label={`View ${img.caption ?? img.alt}`}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {img.caption && (
                <p className="mt-3 text-center font-serif text-charcoal/80 text-sm">
                  {img.caption}
                </p>
              )}
              <p className="text-center text-xs text-rose-gold mt-1">{img.year}</p>
            </motion.button>
          ))}
        </motion.div>

        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
          slides={slides}
        />
      </div>
    </section>
  );
}
