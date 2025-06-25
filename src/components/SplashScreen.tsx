"use client";

import { Dice5, Gamepad2, Star, Trophy } from 'lucide-react';

const FloatingIcon = ({ icon: Icon, className, duration = 4, delay = 0 }: { icon: React.ElementType, className: string, duration?: number, delay?: number }) => {
  return (
    <div
      className={`absolute text-amber-400/10 animate-bounce-slow ${className}`}
      style={{ animationDuration: `${duration}s` }}
      data-animate-delay
    >
      <Icon className="w-full h-full" />
    </div>
  );
};

export const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-between py-16 bg-gradient-to-b from-purple-900 to-indigo-950 font-headline text-white animate-in fade-in-0 duration-500">
      {/* Background Decorative Icons */}
      <FloatingIcon icon={Dice5} className="w-16 h-16 top-[10%] left-[10%] rotate-12" duration={5} delay={0.5} />
      <FloatingIcon icon={Star} className="w-10 h-10 top-[20%] right-[8%] -rotate-12" duration={6} />
      <FloatingIcon icon={Gamepad2} className="w-12 h-12 bottom-[15%] left-[12%] rotate-6" duration={4} delay={1} />
      <FloatingIcon icon={Trophy} className="w-11 h-11 bottom-[25%] right-[10%] -rotate-6" duration={5.5} delay={0.2} />
      <FloatingIcon icon={Dice5} className="w-8 h-8 top-[50%] right-[15%] rotate-10" duration={7} delay={0.8} />
      <FloatingIcon icon={Star} className="w-9 h-9 bottom-[55%] left-[5%] -rotate-8" duration={8} delay={0.1} />
      <FloatingIcon icon={Gamepad2} className="w-14 h-14 top-[5%] left-[30%]" duration={6.5} />

      {/* Middle section with logo and title */}
      <div className="relative flex flex-col items-center justify-center text-center mt-12 mb-8">
        {/* Ludo board background image, perfectly centered and transparent behind the title */}
        <img
          src="/ludoboard.png"
          alt="Ludo Board and Dice"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none select-none z-0 w-[80vw] max-w-[500px] h-auto"
        />
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <h1 className="font-extrabold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] text-5xl sm:text-7xl md:text-8xl tracking-tight animate-title-drop w-full flex flex-col items-center justify-center">
            <span className="block bg-gradient-to-b from-yellow-400 to-amber-500 bg-clip-text text-transparent text-center w-full text-stroke-2">
              Ludo
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl bg-gradient-to-b from-yellow-300 to-amber-400 bg-clip-text text-transparent mt-2 animate-pop-in text-center w-full text-stroke-1" data-animate-delay>
              Learn & Play
            </span>
          </h1>
        </div>
      </div>

      {/* Bottom section with company logo and loader */}
      <div className="flex flex-col items-center w-full">
        <img src="/logo1.png" alt="Company Logo" width={180} height={60} className="mb-2 rounded-lg shadow-lg object-contain logo-responsive" />
        <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};
