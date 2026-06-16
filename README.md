# Fayshal & Juthy — Love Story Website

A beautiful, interactive digital love story celebrating 9 years together and an upcoming wedding on **26 June 2026**.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** — UI animations
- **GSAP** — scroll-driven timeline animations
- **React Icons**
- **Yet Another React Lightbox** — image lightbox
- **Supabase** (optional) — guest wishes persistence

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Customization Guide

### Couple Details

Edit `lib/config.ts` for names, dates, and statistics:

```ts
export const siteConfig = {
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
```

### Content Data

All story content lives in JSON files under `data/`:

| File | Content |
|------|---------|
| `timeline.json` | Journey milestones |
| `gallery.json` | Yearly photo gallery |
| `videos.json` | Video memories |
| `locations.json` | Love map places |
| `family.json` | Family & friends |
| `letters.json` | Love letters |
| `lessons.json` | Relationship lessons |
| `dreams.json` | Future dreams |
| `wishes.json` | Seed guest wishes |

Replace placeholder Unsplash URLs with your own photos in `public/` or hosted URLs. Update `next.config.ts` `images.remotePatterns` if using a new image host.

### Background Music

Add your music file at:

```
public/music/background.mp3
```

### Guest Wishes (Supabase)

1. Create a Supabase project
2. Run this SQL:

```sql
create table guest_wishes (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  relationship text,
  message text not null,
  approved boolean default false,
  created_at timestamptz default now()
);
```

3. Copy `.env.example` to `.env.local` and add your keys

Without Supabase, wishes are stored locally in the browser session only.

### Open Graph Image

Replace `public/og-image.jpg` with a 1200×630 couple photo for social sharing.

## Project Structure

```
app/                  # Next.js App Router
components/
  sections/           # Page sections
  timeline/           # Timeline feature
  gallery/            # Gallery feature
  ui/                 # Shared UI components
data/                 # JSON content (easy to edit)
types/                # TypeScript interfaces
hooks/                # Custom React hooks
lib/                  # Utilities, config, Supabase
public/               # Static assets
```

## Features

- Full-screen hero with animated hearts
- Animated relationship statistics
- GSAP-powered scroll timeline
- Interactive love map
- Year-filtered polaroid gallery with lightbox
- Video memories with modal playback
- Expandable love letters
- Live wedding countdown (switches to "married for" after the date)
- Guest wishes form
- Dark / light mode
- Loading screen with initials
- Scroll progress indicator
- Background music toggle
- PWA manifest
- SEO & Open Graph metadata
- Mobile-first responsive design

## License

Private — made with love for Fayshal & Juthy.
