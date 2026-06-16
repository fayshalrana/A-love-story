"use client";

import { useState, useCallback } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Navigation from "@/components/ui/Navigation";
import ScrollProgress from "@/components/ui/ScrollProgress";
import MusicPlayer from "@/components/ui/MusicPlayer";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import TimelineSection from "@/components/timeline/TimelineSection";
import LoveMapSection from "@/components/sections/LoveMapSection";
import GallerySection from "@/components/gallery/GallerySection";
import VideoSection from "@/components/sections/VideoSection";
import LessonsSection from "@/components/sections/LessonsSection";
import LettersSection from "@/components/sections/LettersSection";
import FamilySection from "@/components/sections/FamilySection";
import CountdownSection from "@/components/sections/CountdownSection";
import WishesSection from "@/components/sections/WishesSection";
import DreamsSection from "@/components/sections/DreamsSection";
import ClosingSection from "@/components/sections/ClosingSection";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      <ScrollProgress />
      <Navigation />
      <main className={loaded ? "opacity-100" : "opacity-0"}>
        <HeroSection />
        <StatsSection />
        <TimelineSection />
        <LoveMapSection />
        <GallerySection />
        <VideoSection />
        <LessonsSection />
        <LettersSection />
        <FamilySection />
        <CountdownSection />
        <WishesSection />
        <DreamsSection />
        <ClosingSection />
      </main>
      <MusicPlayer />
    </>
  );
}
