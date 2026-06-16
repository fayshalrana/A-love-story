"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedCounterProps {
  value: number;
  label: string;
  suffix?: string;
  isInfinity?: boolean;
  start: boolean;
}

export default function AnimatedCounter({
  value,
  label,
  suffix = "",
  isInfinity = false,
  start,
}: AnimatedCounterProps) {
  const count = useCountUp(value, 2000, start, isInfinity);

  return (
    <div className="text-center p-6 glass rounded-2xl">
      <div className="text-3xl md:text-4xl lg:text-5xl font-serif text-rose-gold mb-2">
        {isInfinity ? "∞ ❤️" : `${count.toLocaleString()}${suffix}`}
      </div>
      <p className="text-sm md:text-base text-muted uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}
