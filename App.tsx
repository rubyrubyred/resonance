import React, { useState } from 'react';
import { Phase, UserInput, Coordinates } from './types';
import { BackgroundEffect } from './components/BackgroundEffect';
import { CovenantPhase } from './components/CovenantPhase';
import { NavigationPhase } from './components/NavigationPhase';
import { ResonancePhase } from './components/ResonancePhase';

const App: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('COVENANT');
  const [userData, setUserData] = useState<UserInput>({ userName: '', targetName: '' });
  const [coords, setCoords] = useState<Coordinates>({ x: 0, y: 0 });

  const handleCovenantComplete = (data: UserInput) => {
    setUserData(data);
    setPhase('NAVIGATING');
  };

  const handleCoordsChange = (newCoords: Coordinates) => {
    setCoords(newCoords);
  };

  const handleNavigationComplete = () => {
    setPhase('RESONATING');
  };

  const handleRestart = () => {
    setPhase('COVENANT');
    setUserData({ userName: '', targetName: '' });
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-black text-white font-serif overflow-x-hidden">
      
      {/* Dynamic Background */}
      <BackgroundEffect phase={phase} coords={coords} />

      {/* Main Content Area */}
      <main className="relative z-10 w-full h-full">
        {phase === 'COVENANT' && (
          <CovenantPhase onComplete={handleCovenantComplete} />
        )}

        {phase === 'NAVIGATING' && (
          <NavigationPhase 
            onCoordsChange={handleCoordsChange} 
            onComplete={handleNavigationComplete} 
          />
        )}

        {phase === 'RESONATING' && (
          <ResonancePhase 
            coords={coords} 
            userData={userData}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer Branding */}
      <footer className="fixed bottom-4 left-0 w-full text-center pointer-events-none z-50 mix-blend-difference">
        <span className="text-[10px] uppercase tracking-[0.5em] text-white/20">Project: Resonance</span>
      </footer>
    </div>
  );
};

export default App;
