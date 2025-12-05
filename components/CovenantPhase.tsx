import React, { useState, useEffect } from 'react';
import { UserInput } from '../types';

interface CovenantPhaseProps {
  onComplete: (data: UserInput) => void;
}

export const CovenantPhase: React.FC<CovenantPhaseProps> = ({ onComplete }) => {
  const [data, setData] = useState<UserInput>({ userName: '', targetName: '' });
  const [isLinked, setIsLinked] = useState(false);

  const isFilled = data.userName.length > 0 && data.targetName.length > 0;

  useEffect(() => {
    if (isFilled && !isLinked) {
      // Auto-trigger link animation after a brief pause when both filled
      const timer = setTimeout(() => {
        setIsLinked(true);
        // Navigate after animation
        setTimeout(() => {
          onComplete(data);
        }, 2000);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isFilled, isLinked, data, onComplete]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen z-10 p-8">
      <div className={`transition-opacity duration-1000 ${isLinked ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-champagne font-serif text-sm tracking-[0.3em] mb-16 text-center opacity-70 uppercase">
          The Covenant · 缔约
        </h1>
      </div>

      <div className="relative w-full max-w-md flex flex-col gap-24 items-center">
        {/* Input 1 */}
        <div className="relative group w-full">
          <input
            type="text"
            value={data.userName}
            onChange={(e) => setData({ ...data, userName: e.target.value })}
            placeholder=" "
            className="w-full bg-transparent border-b border-white/20 py-2 text-center text-xl text-[#e8dcc4] font-serif focus:outline-none focus:border-rose-400 transition-colors duration-500 tracking-widest placeholder:text-transparent"
          />
          <label className={`absolute left-0 right-0 text-center pointer-events-none transition-all duration-500 text-xs tracking-widest text-white/40 uppercase
            ${data.userName ? '-top-6 text-rose-300/60' : 'top-2'}
          `}>
            Yours
          </label>
        </div>

        {/* The Red String Visual */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] bg-red-500 shadow-[0_0_10px_rgba(255,0,50,0.8)] transition-all duration-[1500ms] ease-in-out
          ${isLinked ? 'h-0 opacity-0' : (isFilled ? 'h-24 opacity-100' : 'h-0 opacity-0')}
        `}></div>

        {/* Input 2 */}
        <div className="relative group w-full">
          <input
            type="text"
            value={data.targetName}
            onChange={(e) => setData({ ...data, targetName: e.target.value })}
            placeholder=" "
            className="w-full bg-transparent border-b border-white/20 py-2 text-center text-xl text-[#e8dcc4] font-serif focus:outline-none focus:border-rose-400 transition-colors duration-500 tracking-widest placeholder:text-transparent"
          />
          <label className={`absolute left-0 right-0 text-center pointer-events-none transition-all duration-500 text-xs tracking-widest text-white/40 uppercase
            ${data.targetName ? '-top-6 text-rose-300/60' : 'top-2'}
          `}>
            His
          </label>
        </div>
      </div>
      
      {/* Decorative text */}
      <div className={`mt-16 text-white/20 text-[10px] tracking-[0.5em] font-serif transition-opacity duration-1000 ${isLinked ? 'opacity-0' : 'opacity-100'}`}>
        CONNECT THE SOULS
      </div>
    </div>
  );
};
