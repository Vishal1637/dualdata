import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedBackground = () => {
  const backgroundRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = backgroundRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;

    const createParticle = () => {
      const particle = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.5 + 0.5,
      };
      
      // Use GSAP to animate the particle's properties
      gsap.to(particle, {
        x: `+=${(Math.random() - 0.5) * 250}`,
        y: `+=${(Math.random() - 0.5) * 250}`,
        duration: gsap.utils.random(20, 40),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      return particle;
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Kill old animations before creating new particles
      particlesRef.current.forEach(particle => gsap.killTweensOf(particle));
      particlesRef.current = [];
      
      for (let i = 0; i < 80; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    const draw = () => {
      if (!ctx || !width || !height) return;
      ctx.clearRect(0, 0, width, height);
      
      ctx.fillStyle = 'rgba(165, 215, 232, 0.5)';
      particlesRef.current.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.lineWidth = 0.5;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            const opacity = 1 - (dist / 120);
            ctx.strokeStyle = `rgba(100, 150, 255, ${opacity * 0.15})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    // Use GSAP's ticker for the animation loop
    gsap.ticker.add(draw);
    
    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      gsap.ticker.remove(draw);
      particlesRef.current.forEach(particle => gsap.killTweensOf(particle));
    };
  }, []);

  return (
    <canvas
      ref={backgroundRef}
      className="fixed top-0 left-0 w-full h-full z-0 bg-slate-900"
    />
  );
};

export default AnimatedBackground;
