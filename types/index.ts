export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  location?: string;
  images: string[];
  video?: string;
  side?: "left" | "right";
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  year: number;
  caption?: string;
  width: number;
  height: number;
}

export interface VideoMemory {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: "trips" | "birthdays" | "celebrations" | "family" | "wedding";
  date: string;
}

export interface MapLocation {
  id: string;
  title: string;
  date: string;
  description: string;
  images: string[];
  category:
    | "first-meeting"
    | "favorite-date"
    | "family"
    | "shopping"
    | "wedding-venue";
  lat?: number;
  lng?: number;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  category: "parents" | "siblings" | "friends" | "relatives";
  photo: string;
  message: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relationship: string;
  message: string;
  createdAt: string;
  approved?: boolean;
}

export interface FutureDream {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Letter {
  from: string;
  to: string;
  content: string;
}

export interface RelationshipLesson {
  id: string;
  lesson: string;
  detail?: string;
}

export interface SiteConfig {
  couple: {
    name1: string;
    name2: string;
    togetherSince: string;
    weddingDate: string;
  };
  stats: {
    memoriesCaptured: number;
    milestonesAchieved: number;
  };
}
