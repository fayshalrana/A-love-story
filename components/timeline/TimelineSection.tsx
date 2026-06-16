"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/dates";
import type { TimelineEvent } from "@/types";
import timelineData from "@/data/timeline.json";

const events = timelineData as TimelineEvent[];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (lineRef.current && sectionRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-transparent via-dusty-pink/5 to-transparent"
      aria-label="Our timeline"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Our Story"
          subtitle="Every milestone, a chapter in our love story"
        />

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px bg-rose-gold/20">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-gradient-to-b from-rose-gold via-dusty-pink to-rose-gold origin-top"
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {events.map((event, index) => {
              const isRight = event.side === "right" || index % 2 === 0;

              return (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: index * 0.05 }}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${
                    isRight ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-rose-gold border-4 border-white dark:border-charcoal z-10 mt-6" />

                  <div className={`flex-1 pl-12 md:pl-0 ${isRight ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <time className="text-sm text-rose-gold font-medium">
                      {formatDate(event.date)}
                    </time>
                    <h3 className="text-2xl md:text-3xl font-serif mt-1 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-muted mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    {event.location && (
                      <p className="text-sm text-dusty-pink mb-4">
                        📍 {event.location}
                      </p>
                    )}
                    {event.images.length > 0 && (
                      <div
                        className={`flex gap-3 flex-wrap ${
                          isRight ? "md:justify-end" : ""
                        }`}
                      >
                        {event.images.slice(0, 2).map((img, i) => (
                          <div
                            key={i}
                            className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-lg"
                          >
                            <Image
                              src={img}
                              alt={`${event.title} ${i + 1}`}
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-500"
                              sizes="160px"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="hidden md:block flex-1" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
