"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX, HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "@/hooks/useTheme";
import { scrollToSection } from "@/lib/utils";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "Our Story", id: "stats" },
  { label: "Timeline", id: "timeline" },
  { label: "Gallery", id: "gallery" },
  { label: "Letters", id: "letters" },
  { label: "Wedding", id: "countdown" },
  { label: "Wishes", id: "wishes" },
  { label: "Forever", id: "forever" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <button
          onClick={() => handleNav("hero")}
          className="font-serif text-xl text-gradient cursor-pointer"
          aria-label="Go to home"
        >
          F & J
        </button>

        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="text-sm uppercase tracking-wider text-charcoal/80 dark:text-cream/80 hover:text-pink-deep dark:hover:text-rose-gold transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-rose-gold/10 transition-colors cursor-pointer"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <HiMoon className="w-5 h-5 text-rose-gold" />
              ) : (
                <HiSun className="w-5 h-5 text-rose-gold" />
              )}
            </button>
          )}
        </div>

        <div className="flex lg:hidden items-center gap-3">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <HiMoon className="w-5 h-5 text-rose-gold" />
              ) : (
                <HiSun className="w-5 h-5 text-rose-gold" />
              )}
            </button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <HiX className="w-6 h-6 text-charcoal dark:text-cream" />
            ) : (
              <HiMenuAlt3 className="w-6 h-6 text-charcoal dark:text-cream" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="py-4 px-6 flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="text-left py-2 text-sm uppercase tracking-wider text-charcoal/80 dark:text-cream/80 hover:text-pink-deep dark:hover:text-rose-gold transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
