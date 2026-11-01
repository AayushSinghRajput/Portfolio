import React from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const Hero3DFallback: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[560px] flex items-center justify-center pointer-events-none overflow-hidden select-none relative"
    >
      {/* Ambient Radial Depth Glow */}
      <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#E65336]/10 via-[#8A9367]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Primary Kinetic Sculpture Container (Occupies ~85% of available space) */}
      <div className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] lg:w-[520px] lg:h-[520px] flex items-center justify-center">
        
        {/* Layer 1: Outer Precessing Vermilion Ribbon */}
        <motion.div
          animate={reducedMotion ? {} : { rotate: 360, scale: [1, 1.02, 1] }}
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 sm:inset-4 rounded-full border-[1.5px] border-[#E65336]/40 pointer-events-none"
          style={{ transform: "rotateX(62deg) rotateY(18deg)" }}
        >
          {/* Orbital Satellite Node */}
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#E65336] shadow-sm shadow-[#E65336]/50 block" />
        </motion.div>

        {/* Layer 2: Counter-Rotating Olive Structural Meridian */}
        <motion.div
          animate={reducedMotion ? {} : { rotate: -360 }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          className="absolute inset-6 sm:inset-8 rounded-full border-[1.5px] border-[#8A9367]/50 border-dashed pointer-events-none"
          style={{ transform: "rotateX(45deg) rotateY(-55deg)" }}
        >
          <span className="absolute bottom-0 right-1/4 w-2.5 h-2.5 rounded-full bg-[#8A9367] block" />
        </motion.div>

        {/* Layer 3: Central Kinetic Monolith Complex (Multi-planar Generative SVG) */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  rotate: [0, 90, 180, 270, 360],
                  scale: [1, 1.03, 0.98, 1.02, 1],
                }
          }
          transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full drop-shadow-md overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Ceramic White Shading */}
              <linearGradient id="ceramicGrad" x1="50" y1="50" x2="350" y2="350" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#FAF7F2" />
                <stop offset="100%" stopColor="#E9E3D8" />
              </linearGradient>

              {/* Brushed Titanium Metallic Gradient */}
              <linearGradient id="titaniumGrad" x1="100" y1="300" x2="300" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#A8A399" />
                <stop offset="35%" stopColor="#D8D4CC" />
                <stop offset="70%" stopColor="#F0ECE4" />
                <stop offset="100%" stopColor="#948F85" />
              </linearGradient>

              {/* Vermilion Energy Flow Gradient */}
              <linearGradient id="vermilionGrad" x1="50" y1="200" x2="350" y2="200" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E65336" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FF7A61" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#BF3E24" stopOpacity="0.85" />
              </linearGradient>

              {/* Shadow filter */}
              <filter id="monolithShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#20201D" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* Ambient Sculptural Void Rings */}
            <circle cx="200" cy="200" r="160" stroke="#DAD4C9" strokeWidth="1" strokeDasharray="4 8" opacity="0.6" />
            <circle cx="200" cy="200" r="110" stroke="#DAD4C9" strokeWidth="1" opacity="0.4" />

            {/* Back Twisted Titanium Loops (Interlocking) */}
            <path
              d="M 120 200 C 120 110, 200 90, 280 140 C 340 180, 310 280, 220 300 C 140 320, 80 250, 120 200 Z"
              stroke="url(#titaniumGrad)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.9"
            />

            {/* Primary Ceramic Monolith Mobius Body */}
            <g filter="url(#monolithShadow)">
              {/* Outer Loop */}
              <path
                d="M 200 60 C 290 60, 340 130, 340 200 C 340 270, 270 340, 200 340 C 130 340, 60 270, 60 200 C 60 130, 130 60, 200 60 Z"
                stroke="url(#ceramicGrad)"
                strokeWidth="32"
                strokeLinecap="round"
                fill="none"
              />

              {/* Intersecting Architectural Cross-Ribbon */}
              <path
                d="M 90 130 C 160 90, 240 310, 310 270"
                stroke="url(#ceramicGrad)"
                strokeWidth="26"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Vermilion Dynamic Accent Spline */}
            <path
              d="M 100 270 C 170 330, 270 290, 300 170 C 320 90, 230 70, 170 120"
              stroke="url(#vermilionGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="6 3"
              fill="none"
            />

            {/* Central Architectural Faceted Crystal Core */}
            <g transform="translate(200, 200)">
              {/* Faceted Rhombus Layers */}
              <polygon points="0,-48 42,0 0,48 -42,0" fill="#FAF7F2" stroke="#20201D" strokeWidth="1.5" opacity="0.95" />
              <polygon points="0,-48 0,48 -42,0" fill="#E9E3D8" opacity="0.6" />
              <polygon points="0,-32 28,0 0,32 -28,0" fill="#FFFFFF" stroke="#E65336" strokeWidth="1.25" />
              
              {/* Core Node Gem */}
              <circle cx="0" cy="0" r="8" fill="#E65336" />
              <circle cx="0" cy="0" r="3" fill="#FFFFFF" />

              {/* Technical Alignment Crosshairs */}
              <line x1="-60" y1="0" x2="-44" y2="0" stroke="#77746C" strokeWidth="1" />
              <line x1="44" y1="0" x2="60" y2="0" stroke="#77746C" strokeWidth="1" />
              <line x1="0" y1="-60" x2="0" y2="-44" stroke="#77746C" strokeWidth="1" />
              <line x1="0" y1="44" x2="0" y2="60" stroke="#77746C" strokeWidth="1" />
            </g>

            {/* Precision Peripheral Axis Markers */}
            <circle cx="200" cy="60" r="4" fill="#20201D" />
            <circle cx="340" cy="200" r="5" fill="#E65336" />
            <circle cx="200" cy="340" r="4" fill="#8A9367" />
            <circle cx="60" cy="200" r="4" fill="#20201D" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero3DFallback;
