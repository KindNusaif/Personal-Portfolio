import { useEffect, useRef } from "react";

export function Particles({ count = 50 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let raf = 0;
    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    
    // Mouse interaction state
    const mouse = { x: -9999, y: -9999, active: false };
    
    const parts = Array.from({ length: count }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.5 + 0.5,
      // Subtle variations in color based on size
      hue: Math.random() > 0.5 ? 260 : 185, 
    }));
    
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * devicePixelRatio;
      mouse.y = (e.clientY - rect.top) * devicePixelRatio;
      mouse.active = true;
    };

    const onLeave = () => {
      mouse.active = false;
    };
    
    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Update & Draw Particles
      for (const p of parts) {
        // Subtle mouse repel/attract
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 40000) {
            // Gentle repel
            p.vx += (dx / Math.sqrt(d2)) * 0.02;
            p.vy += (dy / Math.sqrt(d2)) * 0.02;
          }
        }
        
        // Friction / Speed limit
        p.vx *= 0.995;
        p.vy *= 0.995;
        
        // Base drift
        if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.01;
        if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.01;
        
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, 0.5)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${p.hue}, 80%, 70%, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for lines
      }
      
      // Connecting lines between particles
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i];
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 25000) {
            ctx.strokeStyle = `rgba(150, 150, 255, ${0.1 * (1 - d2 / 25000)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        
        // Connecting line to mouse
        if (mouse.active) {
          const a = parts[i];
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 40000) {
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.15 * (1 - d2 / 40000)})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      
      raf = requestAnimationFrame(tick);
    };
    tick();
    
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [count]);
  
  return <canvas ref={ref} className="absolute inset-0 h-full w-full pointer-events-auto" />;
}
