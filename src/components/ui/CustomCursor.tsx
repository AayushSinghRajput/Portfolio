import React, { useEffect, useRef, useState } from "react";

/**
 * Custom architectural cursor matching the editorial portfolio design:
 * - A crisp solid emerald dot (#064E3B) tracking the pointer tip with zero latency.
 * - An organic trailing circle ring (~34px) following with smooth spring/lerp physics.
 * - Expands & deepens subtly when hovering interactive elements (links, buttons, clickable cards).
 * - Compresses slightly on click / mousedown.
 * - Gracefully disabled on touch / mobile devices (pointer: coarse).
 */
export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTextElement, setIsTextElement] = useState(false);

  useEffect(() => {
    // Only enable on devices that have a fine pointing device (desktop mouse / trackpad)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    document.body.classList.add("custom-cursor-active");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Instantly position the center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handlePointerDown = () => setIsClicked(true);
    const handlePointerUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isText = Boolean(
        target.closest('input[type="text"], input[type="email"], textarea, [contenteditable="true"]')
      );
      setIsTextElement(isText);

      const isInteractive = Boolean(
        target.closest('a, button, [role="button"], input, textarea, select, label, summary, .cursor-pointer, [data-cursor="pointer"]')
      );
      setIsHovered(isInteractive && !isText);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Physics animation loop for smooth trailing ring
    const render = () => {
      // Lerp ring towards mouse position
      const lerpFactor = 0.18;
      ringX += (mouseX - ringX) * lerpFactor;
      ringY += (mouseY - ringY) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    rafId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  // If text input is hovered, don't show custom cursor so native I-beam cursor is intuitive
  if (isTextElement) {
    return null;
  }

  return (
    <>
      {/* 1. Leading Solid Emerald Dot (Hotspot at exact pointer position) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[99999] rounded-full transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: isHovered ? "8px" : "6px",
          height: isHovered ? "8px" : "6px",
          backgroundColor: "#064E3B",
          boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.4)",
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
        }}
      />

      {/* 2. Trailing Smooth Ring (~34px diameter matching reference image) */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[99998] rounded-full transition-all duration-200 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "34px",
          height: "34px",
          border: isHovered
            ? "1.5px solid rgba(6, 78, 59, 0.65)"
            : "1.5px solid rgba(6, 78, 59, 0.32)",
          backgroundColor: isHovered ? "rgba(6, 78, 59, 0.08)" : "rgba(6, 78, 59, 0.02)",
          transformOrigin: "center center",
          scale: isClicked ? 0.85 : isHovered ? 1.5 : 1,
        }}
      />
    </>
  );
};

export default CustomCursor;
