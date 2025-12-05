import React, { useState, useRef, useEffect } from 'react';
import { Coordinates } from '../types';

interface NavigationPhaseProps {
  onCoordsChange: (coords: Coordinates) => void;
  onComplete: () => void;
}

export const NavigationPhase: React.FC<NavigationPhaseProps> = ({ onCoordsChange, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<Coordinates>({ x: 0, y: 0 });
  
  // Hold Interaction State
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdIntervalRef = useRef<number | null>(null);
  const HOLD_DURATION = 2000; 

  useEffect(() => {
    onCoordsChange(coords);
  }, [coords, onCoordsChange]);

  useEffect(() => {
    if (isHolding) {
      const startTime = Date.now();
      holdIntervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(100, (elapsed / HOLD_DURATION) * 100);
        setProgress(p);

        if (p >= 100) {
          if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
          setIsHolding(false);
          onComplete();
        }
      }, 16);
    } else {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
      setProgress(0);
    }
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, [isHolding, onComplete]);

  const handleMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalized coords (-1 to 1)
    let x = ((clientX - rect.left) / rect.width) * 2 - 1;
    let y = -(((clientY - rect.top) / rect.height) * 2 - 1); 

    // Clamp
    x = Math.max(-1, Math.min(1, x));
    y = Math.max(-1, Math.min(1, y));

    setCoords({ x, y });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setIsHolding(true);
    handleMove(e.clientX, e.clientY);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const onPointerUp = () => {
    setIsHolding(false);
  };

  const onPointerLeave = () => {
    setIsHolding(false);
  };

  // Visual position
  const leftP = ((coords.x + 1) / 2) * 100;
  const topP = ((1 - coords.y) / 2) * 100;

  // Circle Maths
  const radius = 32; 
  const circumference = 2 * Math.PI * radius; 
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden touch-none select-none">
      
      {/* Axis Labels */}
      <div className="absolute top-8 text-center pointer-events-none select-none z-10">
        <div className="text-xl md:text-2xl tracking-[0.3em] text-white/80 font-serif uppercase drop-shadow-md mix-blend-overlay">Redemption</div>
        <div className="text-xs md:text-sm tracking-[0.5em] text-white/50 font-serif mt-1 mix-blend-overlay">救赎</div>
      </div>

      <div className="absolute bottom-12 text-center pointer-events-none select-none z-10">
        <div className="text-xl md:text-2xl tracking-[0.3em] text-white/80 font-serif uppercase drop-shadow-md mix-blend-overlay">Possession</div>
        <div className="text-xs md:text-sm tracking-[0.5em] text-white/50 font-serif mt-1 mix-blend-overlay">占有</div>
      </div>

      <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-left pointer-events-none select-none z-10">
        <div className="text-xl md:text-2xl tracking-[0.2em] text-white/80 font-serif uppercase drop-shadow-md mix-blend-overlay">Abstinent</div>
        <div className="text-xs md:text-sm tracking-[0.4em] text-white/50 font-serif mt-1 mix-blend-overlay">禁欲</div>
      </div>

      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-right pointer-events-none select-none z-10">
        <div className="text-xl md:text-2xl tracking-[0.2em] text-white/80 font-serif uppercase drop-shadow-md mix-blend-overlay">Feverish</div>
        <div className="text-xs md:text-sm tracking-[0.4em] text-white/50 font-serif mt-1 mix-blend-overlay">狂热</div>
      </div>

      {/* Axis Lines - Full Screen Crosshairs */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none"></div>
      <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

      {/* Interactive Area */}
      <div 
        ref={containerRef}
        className="relative w-full h-full cursor-none z-20"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        onTouchStart={() => setIsHolding(true)}
        onTouchEnd={() => setIsHolding(false)}
      >
        {/* The Cursor */}
        <div 
          className="absolute w-0 h-0 pointer-events-none transition-transform duration-75 ease-out will-change-transform"
          style={{ left: `${leftP}%`, top: `${topP}%` }}
        >
          {/* Core Light */}
          <div className={`absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[1px] shadow-[0_0_20px_rgba(255,255,255,1)] transition-all duration-300 ${isHolding ? 'scale-125 shadow-[0_0_40px_rgba(255,200,200,1)]' : 'scale-100'}`}></div>
          
          {/* Orbiting Particles */}
          <div className={`absolute -translate-x-1/2 -translate-y-1/2 w-20 h-20 opacity-60 transition-opacity duration-300 ${isHolding ? 'opacity-0' : 'opacity-100'}`}>
             <div className="absolute w-1.5 h-1.5 bg-rose-200 rounded-full blur-[1px] animate-[spin_4s_linear_infinite] origin-[30px_0px]"></div>
             <div className="absolute w-1.5 h-1.5 bg-champagne rounded-full blur-[1px] animate-[spin_3s_reverse_linear_infinite] origin-[-30px_30px]"></div>
          </div>

          {/* Resonance Ring */}
          <div className={`absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 transition-all duration-300 ease-out ${isHolding ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_10px_rgba(255,150,150,0.5)]" viewBox="0 0 80 80">
              <circle 
                cx="40" cy="40" r={radius} 
                fill="none" 
                stroke="rgba(255, 230, 230, 0.9)" 
                strokeWidth="1.5"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="transition-all duration-75 ease-linear"
              />
              <circle cx="40" cy="40" r={radius - 8} fill="rgba(255,255,255,0.05)" className="animate-pulse" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Instruction */}
      <div className={`absolute bottom-8 text-[10px] tracking-[0.4em] uppercase text-white/30 font-serif transition-opacity duration-500 pointer-events-none ${isHolding ? 'opacity-0' : 'opacity-100'}`}>
        Long press to Resonate
      </div>
    </div>
  );
};
