"use client";

import { motion } from "framer-motion";
import { OrbitalRing } from "@/components/home/orbital-ring";
import { MagneticButton } from "@/components/home/magnetic-button";
import { StatPill } from "@/components/home/stat-pill";

export default function Home() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "oklch(0.09 0.008 285)" }}
    >
      {/* Grain texture */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 900,
          height: 600,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
          background:
            "radial-gradient(ellipse at center, oklch(0.438 0.218 303.724 / 0.22) 0%, transparent 65%)",
          filter: "blur(1px)",
        }}
      />

      {/* Orbital system */}
      <div className="pointer-events-none absolute inset-0">
          {/* Ring guides */}
          {[190, 300, 420].map((r, i) => (
            <div
              key={r}
              className="absolute rounded-full"
              style={{
                width: r * 2,
                height: r * 2,
                top: "50%",
                left: "50%",
                marginLeft: -r,
                marginTop: -r,
                border: `1px solid oklch(1 0 0 / ${0.05 - i * 0.01})`,
              }}
            />
          ))}
          <OrbitalRing radius={190} duration={11} dotSize={8} color="oklch(0.827 0.119 306.383)" startAngle={45} />
          <OrbitalRing radius={300} duration={19} dotSize={5} color="oklch(0.558 0.288 302.321)" startAngle={200} reverse />
          <OrbitalRing radius={420} duration={28} dotSize={4} color="oklch(0.496 0.265 301.924)" startAngle={310} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-10">

        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >
          <div
            className="w-20 h-20 rounded-[28px] flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.558 0.288 302.321) 0%, oklch(0.438 0.218 303.724) 100%)",
              boxShadow:
                "0 0 80px oklch(0.496 0.265 301.924 / 0.55), 0 0 24px oklch(0.558 0.288 302.321 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.25)",
            }}
          >
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="19" r="13" stroke="white" strokeWidth="1.5" strokeOpacity="0.35" />
              <path
                d="M13 19l4.5 4.5 8-9"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Pulse rings */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-[28px]"
              style={{ inset: -8 - i * 8, border: "1px solid oklch(0.558 0.288 302.321 / 0.5)" }}
              animate={{ opacity: [0.5, 0], scale: [1, 1.5 + i * 0.3] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.8,
              }}
            />
          ))}
        </motion.div>

        {/* Headline */}
        <div className="flex flex-col items-center gap-2">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-[11px] tracking-[0.4em] uppercase font-semibold"
            style={{ color: "oklch(0.627 0.265 303.9)" }}
          >
            Bem-vindo ao
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[80px] sm:text-[100px] font-bold leading-none tracking-[-0.04em] text-white"
          >
            Nexly
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg max-w-sm leading-relaxed"
            style={{ color: "oklch(1 0 0 / 0.45)" }}
          >
            Sua plataforma de gerenciamento de campanhas.
            <br />
            Inteligente, veloz e centralizada.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          className="flex items-center gap-3 flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <StatPill value="12k+" label="Campanhas" delay={0.75} />
          <StatPill value="98%" label="Uptime" delay={0.85} />
          <StatPill value="3.2×" label="ROI médio" delay={0.95} />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton href="/dashboard">Ir para o Dashboard</MagneticButton>
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="text-xs"
          style={{ color: "oklch(1 0 0 / 0.18)" }}
        >
          © {new Date().getFullYear()} Nexly · Todos os direitos reservados
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, oklch(0.09 0.008 285))",
        }}
      />
    </div>
  );
}
