"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import type { FamilyMember } from "@/types";
import familyData from "@/data/family.json";

const members = familyData as FamilyMember[];

const categories = [
  { key: "all", label: "All" },
  { key: "parents", label: "Parents" },
  { key: "siblings", label: "Siblings" },
  { key: "friends", label: "Friends" },
  { key: "relatives", label: "Relatives" },
] as const;

export default function FamilySection() {
  const [category, setCategory] = useState<string>("all");

  const filtered =
    category === "all"
      ? members
      : members.filter((m) => m.category === category);

  return (
    <section
      id="family"
      className="section-padding bg-gradient-to-b from-transparent via-rose-gold/5 to-transparent"
      aria-label="Family and friends"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="With Grateful Hearts"
          subtitle="To those who supported our love story"
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
          {filtered.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-square">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl mb-1">{member.name}</h3>
                <p className="text-sm text-rose-gold mb-3">
                  {member.relationship}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {member.message}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
