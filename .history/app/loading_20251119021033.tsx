// app/loading.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const DONTWAIT_BLUE = "#1e40af"; // Tailwind blue-800-ish (dark blue from your UI)

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Logo as masked SVG, colored with dark blue */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative flex items-center justify-center"
      >
        <div
          className="w-28 h-28 md:w-36 md:h-36"
          style={{
            backgroundColor: DONTWAIT_BLUE,
            WebkitMaskImage: "url('/images/dontwait.svg')",
            maskImage: "url('/images/dontwait.svg')",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />

        {/* subtle "shadow" animation under the logo */}
        <motion.div
          className="absolute -bottom-4 h-1.5 w-16 rounded-full bg-slate-200"
          initial={{ opacity: 0.4, scaleX: 0.6 }}
          animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Loading text */}
      <motion.p
        className="mt-8 text-[10px] md:text-xs tracking-[0.35em] uppercase text-slate-500"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Φόρτωση DontWait.gr
      </motion.p>
    </div>
  );
}
