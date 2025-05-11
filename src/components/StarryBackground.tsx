import React, { useRef, useEffect } from 'react';
import { useCosmicWeatherStore } from '../store/cosmicWeatherStore';

interface StarryBackgroundProps {
  weatherCondition?: string;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({ weatherCondition }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useCosmicWeatherStore();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; radius: number; color: string; speed: number }[] = [];
    const particleCount = Math.min(150, Math.floor(window.innerWidth * window.innerHeight / 10000));
    
    // Generate stars
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 1.5 + 0.5;
      
      // Adjust colors based on theme and weather
      let color;
      
      if (weatherCondition?.includes('rain') || weatherCondition?.includes('drizzle')) {
        color = `rgba(120, 180, 255, ${Math.random() * 0.5 + 0.5})`;
      } else if (weatherCondition?.includes('snow')) {
        color = `rgba(220, 240, 255, ${Math.random() * 0.5 + 0.5})`;
      } else if (weatherCondition?.includes('thunderstorm')) {
        color = `rgba(255, 255, 150, ${Math.random() * 0.5 + 0.5})`;
      } else if (theme === 'dark') {
        // Stars for dark theme
        const r = Math.random() > 0.9 ? 255 : Math.floor(Math.random() * 50 + 200);
        const g = Math.random() > 0.9 ? 255 : Math.floor(Math.random() * 50 + 200);
        const b = Math.random() > 0.9 ? 200 : Math.floor(Math.random() * 50 + 200);
        color = `rgba(${r}, ${g}, ${b}, ${Math.random() * 0.7 + 0.3})`;
      } else {
        // Subtle particles for light theme
        color = `rgba(120, 130, 180, ${Math.random() * 0.2 + 0.1})`;
      }
      
      const speed = Math.random() * 0.2 + 0.05;
      
      stars.push({ x, y, radius, color, speed });
    }

    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
        
        // Move stars
        star.y += star.speed;
        
        // Reset position when off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, weatherCondition]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default StarryBackground;