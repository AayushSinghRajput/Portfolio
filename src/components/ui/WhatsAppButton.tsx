import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = "9779805981168",
  defaultMessage = "Hi Aayush! I came across your portfolio and would like to discuss a project / work opportunity with you.",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center justify-end sm:bottom-8 sm:right-8">
      {/* Tooltip on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center gap-2 mr-3 px-3.5 py-1.5 rounded-full bg-[#20201D] text-white text-xs font-sans font-medium shadow-md pointer-events-none select-none border border-[#383733]"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Chat on WhatsApp</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Aayush Kumar Singh on WhatsApp (+977 980-5981168)"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.5)] transition-shadow duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#25D366] focus-visible:outline-offset-4"
        style={{ width: "54px", height: "54px" }}
      >
        {/* WhatsApp Official SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
          className="transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8.01 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 13.99C16.32 13.86 15.12 13.28 14.9 13.2C14.67 13.11 14.51 13.08 14.35 13.32C14.18 13.57 13.72 14.11 13.58 14.27C13.44 14.44 13.3 14.46 13.06 14.33C12.82 14.21 11.79 13.87 10.58 12.79C9.64 11.95 9 10.91 8.88 10.7C8.75 10.49 8.87 10.38 8.99 10.26C9.1 10.15 9.24 9.97 9.36 9.83C9.48 9.68 9.53 9.58 9.61 9.42C9.69 9.26 9.65 9.12 9.59 9C9.53 8.88 9.04 7.68 8.84 7.19C8.64 6.71 8.44 6.77 8.29 6.77C8.14 6.77 7.97 6.77 8.53 7.33Z" />
        </svg>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
