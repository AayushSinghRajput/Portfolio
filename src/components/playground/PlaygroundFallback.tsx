import React, { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface PlaygroundFallbackProps {
  type: "particles" | "geometry" | "shader";
}

export const PlaygroundFallback: React.FC<PlaygroundFallbackProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse coordinates tracking
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    if (type === "particles") {
      // 2D Interactive Particle Simulation (Zero WebGL dependency)
      const particleCount = 120;
      const particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.2,
        color: Math.random() > 0.8 ? "rgba(230, 83, 54, 0.75)" : "rgba(32, 32, 29, 0.6)",
      }));

      const render = () => {
        ctx.clearRect(0, 0, width, height);

        // Smooth mouse lerp
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;

        // Draw connecting lines
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 65) {
              ctx.strokeStyle = `rgba(218, 212, 201, ${0.45 * (1 - dist / 65)})`;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        // Update and draw particles
        for (const p of particles) {
          if (!reducedMotion) {
            // Mouse repulsion
            const mdx = p.x - mouse.x;
            const mdy = p.y - mouse.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 100 && mdist > 0) {
              const force = (100 - mdist) / 100;
              p.x += (mdx / mdist) * force * 3.5;
              p.y += (mdy / mdist) * force * 3.5;
            }

            p.x += p.vx;
            p.y += p.vy;

            // Boundary bounce
            if (p.x < 0) { p.x = 0; p.vx *= -1; }
            if (p.x > width) { p.x = width; p.vx *= -1; }
            if (p.y < 0) { p.y = 0; p.vy *= -1; }
            if (p.y > height) { p.y = height; p.vy *= -1; }
          }

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        animationFrameId = requestAnimationFrame(render);
      };
      render();
    } else if (type === "geometry") {
      // 2D Isometric Rotating Polyhedron Simulation
      let angle = 0;
      const render = () => {
        ctx.clearRect(0, 0, width, height);
        if (!reducedMotion) angle += 0.01;

        const cx = width / 2;
        const cy = height / 2;
        const size = Math.min(width, height) * 0.22;

        ctx.save();
        ctx.translate(cx, cy);

        // Draw multiple nested geometric isometric rings
        for (let ring = 0; ring < 3; ring++) {
          const rSize = size * (1 - ring * 0.28);
          const rAngle = angle * (ring % 2 === 0 ? 1 : -1) + (ring * Math.PI) / 4;

          ctx.strokeStyle = ring === 0 ? "#E65336" : ring === 1 ? "#20201D" : "#8A9367";
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          for (let i = 0; i <= 6; i++) {
            const a = rAngle + (i * Math.PI) / 3;
            const px = Math.cos(a) * rSize;
            const py = Math.sin(a) * rSize * 0.6;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }

        // Center jewel node
        ctx.fillStyle = "#E65336";
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        animationFrameId = requestAnimationFrame(render);
      };
      render();
    } else {
      // Custom Shader 2D Contour Wave Simulation
      let time = 0;
      const render = () => {
        ctx.clearRect(0, 0, width, height);
        if (!reducedMotion) time += 0.02;

        const lines = 16;
        const spacing = height / (lines + 2);

        for (let i = 1; i <= lines; i++) {
          const baseY = i * spacing;
          ctx.beginPath();
          ctx.strokeStyle =
            i % 4 === 0
              ? "rgba(230, 83, 54, 0.75)"
              : i % 2 === 0
              ? "rgba(32, 32, 29, 0.4)"
              : "rgba(138, 147, 103, 0.5)";
          ctx.lineWidth = i % 4 === 0 ? 1.5 : 1;

          for (let x = 0; x <= width; x += 15) {
            const wave = Math.sin(x * 0.015 + time + i * 0.3) * 14 * Math.cos(time * 0.5 + i * 0.2);
            if (x === 0) ctx.moveTo(x, baseY + wave);
            else ctx.lineTo(x, baseY + wave);
          }
          ctx.stroke();
        }

        animationFrameId = requestAnimationFrame(render);
      };
      render();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, reducedMotion]);

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
      <div className="absolute bottom-3 left-4 font-mono text-[9px] text-[#77746C] tracking-widest uppercase pointer-events-none">
        RENDER MODE // ACCELERATED 2D ENGINE
      </div>
    </div>
  );
};

export default PlaygroundFallback;
