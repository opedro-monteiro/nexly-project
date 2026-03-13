"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticButton({ children, href }: Readonly<{ children: React.ReactNode; href: string }>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full cursor-pointer select-none overflow-hidden"
    >
      {/* base gradient */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.558 0.288 302.321), oklch(0.438 0.218 303.724))",
          boxShadow:
            "0 0 48px oklch(0.496 0.265 301.924 / 0.55), inset 0 1px 0 oklch(1 0 0 / 0.2)",
        }}
      />
      {/* shimmer sweep */}
      <motion.span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(105deg, transparent 35%, oklch(0.827 0.119 306.383 / 0.45) 50%, transparent 65%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
      />
      <span className="relative z-10 font-semibold tracking-wide text-white text-lg leading-none">
        {children}
      </span>
      <motion.span
        className="relative z-10 text-white/70 text-xl leading-none"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        →
      </motion.span>
    </motion.a>
  );
}
