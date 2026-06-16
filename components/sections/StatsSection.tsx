"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useInView } from "@/hooks/useInView";
import { siteConfig } from "@/lib/config";
import { getDaysTogether, getYearsTogether, formatDate } from "@/lib/dates";

export default function StatsSection() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="stats" className="section-padding" ref={ref} aria-label="Relationship statistics">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Our Journey in Numbers"
          subtitle="Every day together is a gift we cherish"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <div className="text-center p-6 glass rounded-2xl col-span-2 md:col-span-1">
            <div className="text-lg md:text-xl font-serif text-rose-gold mb-2">
              {formatDate(siteConfig.couple.togetherSince)}
            </div>
            <p className="text-sm text-muted uppercase tracking-wider">
              Together Since
            </p>
          </div>
          <AnimatedCounter
            value={getYearsTogether()}
            label="Years Together"
            start={isInView}
          />
          <AnimatedCounter
            value={getDaysTogether()}
            label="Days Together"
            start={isInView}
          />
          <AnimatedCounter
            value={siteConfig.stats.memoriesCaptured}
            label="Memories Captured"
            start={isInView}
          />
          <AnimatedCounter
            value={siteConfig.stats.milestonesAchieved}
            label="Milestones Achieved"
            start={isInView}
          />
          <AnimatedCounter
            value={0}
            label="Arguments Survived"
            isInfinity
            start={isInView}
          />
        </div>
      </div>
    </section>
  );
}
