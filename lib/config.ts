import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  couple: {
    name1: "Fayshal",
    name2: "Juthy",
    togetherSince: "2017-06-22",
    weddingDate: "2026-06-26",
  },
  stats: {
    memoriesCaptured: 847,
    milestonesAchieved: 24,
  },
};

export const COUPLE_NAMES = `${siteConfig.couple.name1} & ${siteConfig.couple.name2}`;
export const TOGETHER_SINCE = new Date(siteConfig.couple.togetherSince);
export const WEDDING_DATE = new Date(siteConfig.couple.weddingDate);
