import React, { useEffect, useState } from 'react';
import { Coordinates, Phase } from '../types';

interface BackgroundProps {
  phase: Phase;
  coords: Coordinates;
}

export const BackgroundEffect: React.FC<BackgroundProps> = ({ phase, coords }) => {
  const [time, setTime] = useState(0);

  // Time for gentle animation
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      setTime(t => t + 0.005);
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Calculate dynamic colors based on position
  // We keep the interactive logic but layer it on top of the new Aurora
  const getDynamicGradient = () => {
    const isTop = coords.y > 0;
    const isRight = coords.x > 0;

    let baseColor = '';
    
    // Interactive Cursor Color (The Soul Light)
    if (isTop && !isRight) baseColor = 'rgba(252, 231, 243, 0.5)'; // Pale Pink
    if (isTop && isRight) baseColor = 'rgba(253, 186, 116, 0.5)'; // Peach Gold
    if (!isTop && !isRight) baseColor = 'rgba(139, 92, 246, 0.4)'; // Violet
    if (!isTop && isRight) baseColor = 'rgba(225, 29, 72, 0.5)'; // Crimson

    return `radial-gradient(circle closest-side, 
      rgba(255, 255, 255, 0.8) 0%, 
      ${baseColor} 50%, 
      transparent 100%)`;
  };

  // Visibility logic: The Aurora is strong in NAVIGATING, subtle in others
  const auroraOpacity = phase === 'NAVIGATING' ? 'opacity-100' : 'opacity-20';

  return (
    <div className="fixed inset-0 -z-10 bg-[#1a0508] overflow-hidden transition-colors duration-1000">
      
      {/* 1. Heavy Noise Texture */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay z-50"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* 2. THE BREATHING AURORA (Background Layer) */}
      {/* This layer provides the "Pink Yellow dynamic effects" requested */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${auroraOpacity}`}>
        
        {/* Blob A: Champagne/Gold (Warmth) - Moves in a slow figure-8 */}
        <div 
          className="absolute w-[80vmax] h-[80vmax] rounded-full blur-[80px] mix-blend-screen"
          style={{
            top: '20%',
            left: '60%',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)',
            transform: `translate(${Math.sin(time * 0.5) * 15}%, ${Math.cos(time * 0.3) * 15}%) scale(${1 + Math.sin(time * 0.4) * 0.1})`
          }}
        />

        {/* Blob B: Rose/Pink (Desire) - Orbits gently */}
        <div 
          className="absolute w-[90vmax] h-[90vmax] rounded-full blur-[100px] mix-blend-screen"
          style={{
            top: '50%',
            left: '10%',
            background: 'radial-gradient(circle, rgba(244, 114, 182, 0.15) 0%, transparent 70%)',
            transform: `translate(${Math.cos(time * 0.4) * 10}%, ${Math.sin(time * 0.6) * 10}%) scale(${1 + Math.cos(time * 0.5) * 0.1})`
          }}
        />

        {/* Blob C: Deep Violet (Mystery) - Anchors the bottom */}
        <div 
          className="absolute w-[100vmax] h-[60vmax] rounded-full blur-[120px] mix-blend-screen"
          style={{
            bottom: '-20%',
            left: '50%',
            background: 'radial-gradient(circle, rgba(109, 40, 217, 0.15) 0%, transparent 70%)',
            transform: `translate(-50%, ${Math.sin(time * 0.8) * 5}%)`
          }}
        />
        
        {/* Global Aurora Pulse */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[#4c0519] via-transparent to-transparent opacity-30 mix-blend-overlay"
          style={{
            opacity: 0.2 + Math.sin(time) * 0.1 // Breathing effect
          }}
        />
      </div>

      {/* 3. THE SOUL LIGHT (Interactive Cursor Halo) */}
      {/* Tracks the cursor and blends with the aurora */}
      <div 
        className="absolute top-1/2 left-1/2 w-[140vmax] h-[140vmax] rounded-full mix-blend-plus-lighter pointer-events-none transition-transform duration-200 ease-out will-change-transform blur-[50px]"
        style={{
          transform: `translate(calc(-50% + ${coords.x * 30}vw), calc(-50% - ${coords.y * 30}vh))`,
          background: getDynamicGradient(),
          opacity: 0.8
        }}
      />
      
      {/* 4. Vignette (Focus) */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#1a0508] opacity-50 pointer-events-none" 
           style={{ background: 'radial-gradient(circle, transparent 40%, #1a0508 100%)'}}
      />
    </div>
  );
};
