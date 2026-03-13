"use client";

import { motion } from "framer-motion";

export function OrbitalRing({
  radius,
  duration,
  dotSize,
  color,
  startAngle = 0,
  reverse = false,
}: Readonly<{
  radius: number;
  duration: number;
  dotSize: number;
  color: string;
  startAngle?: number;
  reverse?: boolean;
}>) {
  return (
    <motion.div
      className="absolute"
      style={{ width: radius * 2, height: radius * 2, top: "50%", left: "50%", marginLeft: -radius, marginTop: -radius }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          background: color,
          top: -dotSize / 2,
          left: "50%",
          marginLeft: -dotSize / 2,
          rotate: `${startAngle}deg`,
          boxShadow: `0 0 ${dotSize * 4}px ${dotSize}px ${color}66`,
        }}
      />
    </motion.div>
  );
}
