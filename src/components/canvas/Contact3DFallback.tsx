import React from "react";
import { motion } from "framer-motion";

export const Contact3DFallback: React.FC = () => {
  return (
    <div className="w-full h-56 sm:h-64 flex items-center justify-center relative overflow-hidden pointer-events-none select-none">
      {/* Background radial cyan glow */}
      <div className="absolute w-48 h-48 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

      {/* Outer Orbit Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-dashed border-cyan-400/25"
      />

      {/* Middle Orbit Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute w-44 h-44 sm:w-48 sm:h-48 rounded-full border border-purple-400/20"
      />

      {/* Planetary Sphere Body */}
      <motion.div
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-cyan-400/40 bg-gradient-to-tr from-slate-950 via-cyan-950/40 to-slate-900 shadow-[0_0_25px_rgba(6,182,212,0.2)] flex items-center justify-center overflow-hidden"
      >
        {/* Globe Latitude lines */}
        <div className="absolute inset-x-0 top-1/4 h-px bg-cyan-400/20" />
        <div className="absolute inset-x-0 top-2/4 h-px bg-cyan-400/30" />
        <div className="absolute inset-x-0 top-3/4 h-px bg-cyan-400/20" />

        {/* Globe Longitude ellipse */}
        <div className="absolute inset-y-0 w-20 rounded-full border border-cyan-400/20" />
        <div className="absolute inset-y-0 w-8 rounded-full border border-cyan-400/25" />

        {/* Kathmandu Pulsing Beacon */}
        <div className="absolute top-1/3 right-1/3 flex items-center justify-center">
          {/* Radar ripple 1 */}
          <motion.div
            animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute w-5 h-5 rounded-full border border-emerald-400"
          />
          {/* Radar ripple 2 */}
          <motion.div
            animate={{ scale: [1, 3.2], opacity: [0.6, 0] }}
            transition={{ duration: 2, delay: 0.6, repeat: Infinity, ease: "easeOut" }}
            className="absolute w-5 h-5 rounded-full border border-emerald-400"
          />
          {/* Central green point */}
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
        </div>
      </motion.div>
    </div>
  );
};

export default Contact3DFallback;
