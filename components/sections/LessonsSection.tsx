"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import type { RelationshipLesson } from "@/types";
import lessonsData from "@/data/lessons.json";

const lessons = lessonsData as RelationshipLesson[];

export default function LessonsSection() {
  return (
    <section
      id="lessons"
      className="section-padding bg-gradient-to-b from-transparent via-dusty-pink/5 to-transparent"
      aria-label="Lessons learned"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="What Love Taught Us"
          subtitle="Wisdom gathered along the way"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 md:p-8 group cursor-default"
            >
              <div className="text-3xl mb-4 text-dusty-pink group-hover:scale-110 transition-transform">
                ♥
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-gradient mb-3">
                {lesson.lesson}
              </h3>
              {lesson.detail && (
                <p className="text-muted text-sm leading-relaxed">
                  {lesson.detail}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
