"use client";

import { motion } from "framer-motion";

export function StatPill({ value, label, delay }: Readonly<{ value: string; label: string; delay: number }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center px-6 py-3 rounded-2xl"
      style={{
        background: "oklch(1 0 0 / 0.04)",
        border: "1px solid oklch(1 0 0 / 0.08)",
        backdropFilter: "blur(12px)",
      }}
    >
      <span className="text-2xl font-bold tabular-nums" style={{ color: "oklch(0.827 0.119 306.383)" }}>
        {value}
      </span>
      <span className="text-[10px] mt-0.5 tracking-[0.2em] uppercase font-medium" style={{ color: "oklch(1 0 0 / 0.35)" }}>
        {label}
      </span>
    </motion.div>
  );
}
