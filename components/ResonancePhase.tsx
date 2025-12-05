import React, { useEffect, useState } from 'react';
import { Coordinates, UserInput, ResonanceResult } from '../types';
import { generateResonanceReport } from '../constants';

interface ResonancePhaseProps {
  coords: Coordinates;
  userData: UserInput;
  onRestart: () => void;
}

export const ResonancePhase: React.FC<ResonancePhaseProps> = ({ coords, userData, onRestart }) => {
  const [result, setResult] = useState<ResonanceResult | null>(null);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    // Simulate generation time
    const report = generateResonanceReport(coords.x, coords.y);
    setResult(report);

    const timer = setTimeout(() => {
      setShowReport(true);
    }, 1500); // Wait for the "explosion" animation

    return () => clearTimeout(timer);
  }, [coords]);

  if (!result) return null;

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 z-20">
      
      {/* Intro Explosion Animation Placeholder */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${showReport ? 'opacity-0' : 'opacity-100'}`}>
         <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_100px_50px_rgba(255,200,200,0.8)] animate-ping"></div>
      </div>

      {/* The Report Card */}
      <div className={`
        relative max-w-md w-full bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 shadow-2xl
        transform transition-all duration-[1500ms] ease-out
        ${showReport ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}
      `}>
        {/* Silk sheen effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>

        {/* Header */}
        <div className="text-center mb-10">
            <h2 className="text-[#e8dcc4] font-serif text-lg tracking-[0.2em] uppercase border-b border-white/10 pb-4 mb-2">
                Resonance Analysis
            </h2>
            <div className="flex justify-center items-center gap-4 text-xs text-rose-300/80 font-serif tracking-widest mt-2">
                <span>{userData.userName}</span>
                <span className="text-white/40">×</span>
                <span>{userData.targetName}</span>
            </div>
        </div>

        {/* Composition List */}
        <div className="space-y-6 mb-12">
            <h3 className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-4 text-center font-serif">Composition</h3>
            {result.composition.map((item, index) => (
                <div key={index} className="flex items-end gap-4 group">
                    <div className="text-2xl font-serif text-white/20 w-12 text-right group-hover:text-rose-400/60 transition-colors duration-500">
                        {item.percentage}%
                    </div>
                    <div className="flex-1 pb-1 border-b border-white/5 relative">
                        <span className="text-[#dcdcdc] font-serif text-sm md:text-base tracking-wide relative z-10 group-hover:tracking-[0.1em] transition-all duration-500">
                            {item.element}
                        </span>
                        {/* Type indicator */}
                        <span className="absolute right-0 bottom-1 text-[8px] uppercase text-white/10 tracking-widest">
                            {item.type}
                        </span>
                    </div>
                </div>
            ))}
        </div>

        {/* Tasting Notes */}
        <div className="relative p-6 bg-white/5 border-l-2 border-rose-900/50">
            <h3 className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-2 absolute -top-3 left-4 bg-black px-2 font-serif">
                Tasting Notes
            </h3>
            {/* Standard Font - Removed Italic */}
            <p className="text-[#e8dcc4]/90 font-serif text-base md:text-lg leading-relaxed tracking-wide opacity-90">
                "{result.tastingNote}"
            </p>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
            <button 
                onClick={onRestart}
                className="text-[10px] text-white/40 hover:text-white hover:tracking-[0.4em] uppercase transition-all duration-500 tracking-[0.2em] font-serif"
            >
                Restart Sequence
            </button>
        </div>
      </div>
    </div>
  );
};
