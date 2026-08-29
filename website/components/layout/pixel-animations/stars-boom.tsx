// "use client";
// import { useEffect, useRef } from "react";

// interface StarsBoomProps {
//   className?: string;
// }

// export function StarsBoom({ className = "" }: StarsBoomProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const W = 100;
//     const H = 100;
//     canvas.width = W;
//     canvas.height = H;

//     // Star states
//     let leftStar = { x: 12, y: 50 };
//     let rightStar = { x: 88, y: 50 };
//     const centerX = 50;
//     const centerY = 50;
//     const collisionDist = 4;

//     // Particles and effects
//     const particles: Array<{
//       x: number;
//       y: number;
//       vx: number;
//       vy: number;
//       life: number;
//       decay: number;
//       size: number;
//       color: string;
//     }> = [];
//     let phase: "approach" | "boom" = "approach";
//     let boomTimer = 0;
//     let flashAlpha = 0;
//     let shakeX = 0;
//     let shakeY = 0;
//     let shakeIntensity = 0;

//     const color1 = "#008040";
//     const color2 = "#E62515";

//     function resetStars() {
//       leftStar.x = 12;
//       rightStar.x = 88;
//       leftStar.y = 48 + Math.random() * 4;
//       rightStar.y = 48 + Math.random() * 4;
//       phase = "approach";
//       boomTimer = 0;
//       flashAlpha = 0;
//       shakeIntensity = 0;
//       shakeX = shakeY = 0;
//       particles.length = 0;
//     }

//     function drawBoldStar(x: number, y: number, color: string) {
//       ctx.fillStyle = color;
//       ctx.fillRect(x - 1, y - 1, 3, 3);
//       ctx.fillRect(x - 5, y - 1, 4, 3);
//       ctx.fillRect(x + 1, y - 1, 4, 3);
//       ctx.fillRect(x - 1, y - 5, 3, 4);
//       ctx.fillRect(x - 1, y + 2, 3, 4);
//       ctx.fillRect(x - 4, y - 4, 3, 3);
//       ctx.fillRect(x + 1, y - 4, 3, 3);
//       ctx.fillRect(x - 4, y + 1, 3, 3);
//       ctx.fillRect(x + 1, y + 1, 3, 3);
//     }

//     function spawnBoom(cx: number, cy: number) {
//       for (let i = 0; i < 60; i++) {
//         const angle = (Math.PI * 2 * i) / 60 + Math.random() * 0.3;
//         const speed = 2 + Math.random() * 4;
//         particles.push({
//           x: cx,
//           y: cy,
//           vx: Math.cos(angle) * speed,
//           vy: Math.sin(angle) * speed,
//           life: 1,
//           decay: 0.012 + Math.random() * 0.01,
//           size: 2 + Math.floor(Math.random() * 3),
//           color: Math.random() < 0.5 ? color1 : color2,
//         });
//       }

//       for (let i = 0; i < 40; i++) {
//         const angle = Math.random() * Math.PI * 2;
//         const speed = 2 + Math.random() * 5;
//         particles.push({
//           x: cx,
//           y: cy,
//           vx: Math.cos(angle) * speed,
//           vy: Math.sin(angle) * speed,
//           life: 0.9 + Math.random() * 0.3,
//           decay: 0.015 + Math.random() * 0.02,
//           size: 1 + Math.floor(Math.random() * 3),
//           color: Math.random() < 0.5 ? "#ffffff" : Math.random() < 0.5 ? color1 : color2,
//         });
//       }

//       flashAlpha = 1;
//       shakeIntensity = 10;
//       boomTimer = 0;
//     }

//     function update() {
//       if (phase === "approach") {
//         const distLeft = Math.abs(leftStar.x - centerX);
//         const distRight = Math.abs(rightStar.x - centerX);
//         const speedFactor = Math.min(2.8, Math.max(0.5, (distLeft / 50) * 2 + 0.5));

//         leftStar.x += speedFactor * 0.8;
//         rightStar.x -= speedFactor * 0.8;

//         if (rightStar.x - leftStar.x <= collisionDist * 2) {
//           phase = "boom";
//           spawnBoom(centerX, centerY);
//         }
//       } else if (phase === "boom") {
//         boomTimer++;
//         for (let i = particles.length - 1; i >= 0; i--) {
//           const p = particles[i];
//           p.x += p.vx;
//           p.y += p.vy;
//           p.vx *= 0.97;
//           p.vy *= 0.97;
//           p.life -= p.decay;
//           if (p.life <= 0) particles.splice(i, 1);
//         }

//         flashAlpha *= 0.9;
//         shakeIntensity *= 0.9;
//         shakeX = (Math.random() - 0.5) * shakeIntensity * 2;
//         shakeY = (Math.random() - 0.5) * shakeIntensity * 2;

//         if (boomTimer > 70) {
//           resetStars();
//         }
//       }
//     }

//     function render() {
//       ctx.save();
//       ctx.translate(shakeX, shakeY);
//       ctx.fillRect(-20, -20, W + 40, H + 40);

//       if (phase === "approach") {
//         drawBoldStar(leftStar.x, leftStar.y, color1);
//         drawBoldStar(rightStar.x, rightStar.y, color2);
//       }

//       for (const p of particles) {
//         ctx.globalAlpha = Math.max(0, p.life);
//         ctx.fillStyle = p.color;
//         ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
//       }
//       ctx.globalAlpha = 1;

//       if (flashAlpha > 0.01) {
//         ctx.globalAlpha = flashAlpha;
//         const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
//         grad.addColorStop(0, "#ffffff");
//         grad.addColorStop(0.4, "#ffee55");
//         grad.addColorStop(1, "rgba(255, 100, 0, 0)");
//         ctx.fillStyle = grad;
//         ctx.beginPath();
//         ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.globalAlpha = 1;
//       }

//       ctx.restore();
//     }

//     function loop() {
//       update();
//       render();
//       requestAnimationFrame(loop);
//     }

//     resetStars();
//     const animationId = requestAnimationFrame(loop);

//     return () => {
//       cancelAnimationFrame(animationId);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className={className}
//       style={{
//         width: "100%",
//         height: "100%",
//         imageRendering: "pixelated",
//       }}
//     />
//   );
// }
