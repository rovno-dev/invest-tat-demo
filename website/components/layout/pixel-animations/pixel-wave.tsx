"use client";
import { useEffect, useRef } from "react";

interface PixelWaveProps {
  className?: string;
}

export function PixelWave({ className = "" }: PixelWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 80;
    const h = 80;
    canvas.width = w;
    canvas.height = h;
    const cx = 40;
    const cy = 40;
    const colors = ['#008040', '#fff', '#E62515'];
    const waves = [
      { color: colors[0], speed: 15, radius: 0 },
      { color: colors[1], speed: 20, radius: 20 },
      { color: colors[2], speed: 25, radius: 40 }
    ];

    let lastTime = performance.now();
    let animationId: number;

    const render = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Fade trail
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, w, h);

      for (const wave of waves) {
        wave.radius += wave.speed * dt;
        if (wave.radius > 70) {
          wave.radius = 0;
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, wave.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        imageRendering: "pixelated",
      }}
    />
  );
}
