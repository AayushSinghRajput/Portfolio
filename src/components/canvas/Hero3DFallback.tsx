import React from "react";
import { motion } from "framer-motion";

export const Hero3DFallback: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Outer ambient blur aura */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-500/15 to-emerald-400/20 blur-3xl opacity-70"
        />

        {/* Outer Orbital Ring 1 */}
        <motion.div
          animate={{
            rotateX: [60, 60, 60],
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
        />

        {/* Outer Orbital Ring 2 */}
        <motion.div
          animate={{
            rotateY: [70, 70, 70],
            rotateZ: [360, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-purple-400/25 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        />

        {/* Central Geometric Hologram */}
        <motion.div
          animate={{
            scale: [0.95, 1.05, 0.95],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent backdrop-blur-sm shadow-[0_0_30px_rgba(6,182,212,0.15)] flex items-center justify-center transform rotate-45"
        >
          {/* Inner nested diamond */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-emerald-400/50 bg-emerald-500/5 shadow-[0_0_20px_rgba(52,211,153,0.2)]" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero3DFallback;
