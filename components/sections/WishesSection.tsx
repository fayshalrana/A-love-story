"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import type { GuestWish } from "@/types";
import wishesData from "@/data/wishes.json";
import { submitWish } from "@/lib/supabase";

const seedWishes = wishesData as GuestWish[];

export default function WishesSection() {
  const [wishes, setWishes] = useState<GuestWish[]>(
    seedWishes.filter((w) => w.approved !== false)
  );
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in your name and message.");
      return;
    }

    const newWish: GuestWish = {
      id: `local-${Date.now()}`,
      name: name.trim(),
      relationship: relationship.trim() || "Friend",
      message: message.trim(),
      createdAt: new Date().toISOString(),
      approved: true,
    };

    const result = await submitWish({
      name: newWish.name,
      relationship: newWish.relationship,
      message: newWish.message,
    });

    if (result.success || result.error === "Supabase not configured") {
      setWishes((prev) => [newWish, ...prev]);
      setName("");
      setRelationship("");
      setMessage("");
      setStatus("success");
      setErrorMsg("");
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong.");
    }
  };

  return (
    <section id="wishes" className="section-padding" aria-label="Guest wishes">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Guest Wishes"
          subtitle="Share your love and blessings with us"
        />

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 md:p-8 mb-12"
        >
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="wish-name" className="block text-sm mb-2 text-charcoal dark:text-cream">
                Your Name *
              </label>
              <input
                id="wish-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-pink-light text-charcoal dark:bg-charcoal-light/50 dark:border-rose-gold/20 dark:text-cream focus:border-rose-gold outline-none transition-colors"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="wish-relationship" className="block text-sm mb-2 text-charcoal dark:text-cream">
                Relationship
              </label>
              <input
                id="wish-relationship"
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="Friend, Family, Colleague..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-pink-light text-charcoal dark:bg-charcoal-light/50 dark:border-rose-gold/20 dark:text-cream focus:border-rose-gold outline-none transition-colors"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="wish-message" className="block text-sm mb-2 text-charcoal dark:text-cream">
              Your Message *
            </label>
            <textarea
              id="wish-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white border border-pink-light text-charcoal dark:bg-charcoal-light/50 dark:border-rose-gold/20 dark:text-cream focus:border-rose-gold outline-none transition-colors resize-none"
              required
              aria-required="true"
            />
          </div>
          {status === "success" && (
            <p className="text-green-600 dark:text-green-400 text-sm mb-4" role="status">
              Thank you for your beautiful wish! 💕
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-sm mb-4" role="alert">
              {errorMsg}
            </p>
          )}
          <button
            type="submit"
            className="px-8 py-3 btn-primary"
          >
            Send Wish
          </button>
        </motion.form>

        <div className="space-y-4">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold to-dusty-pink flex items-center justify-center text-white font-serif">
                  {wish.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-serif text-lg">{wish.name}</h4>
                  <p className="text-sm text-rose-gold">{wish.relationship}</p>
                </div>
              </div>
              <p className="text-muted leading-relaxed">
                {wish.message}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
