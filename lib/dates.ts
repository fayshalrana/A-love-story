import { TOGETHER_SINCE, WEDDING_DATE } from "./config";

export function getDaysTogether(): number {
  const now = new Date();
  const diff = now.getTime() - TOGETHER_SINCE.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getYearsTogether(): number {
  const now = new Date();
  let years = now.getFullYear() - TOGETHER_SINCE.getFullYear();
  const monthDiff = now.getMonth() - TOGETHER_SINCE.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && now.getDate() < TOGETHER_SINCE.getDate())
  ) {
    years--;
  }
  return years;
}

export function isWeddingPassed(): boolean {
  return new Date() >= WEDDING_DATE;
}

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getWeddingCountdown(): CountdownValues {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export interface MarriedDuration {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

export function getMarriedDuration(): MarriedDuration {
  const now = new Date();
  const start = WEDDING_DATE;

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  return { years, months, days, totalDays };
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
