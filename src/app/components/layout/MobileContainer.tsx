import React, { ReactNode } from 'react';

interface MobileContainerProps {
  children:HzNode;
  className?: string;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen w-full bg-gray-200 text-slate-800 font-sans overflow-hidden relative flex items-center justify-center py-8 ${className}`}>
      {/* Phone Frame */}
      <div className="mx-auto w-[375px] h-[812px] bg-black rounded-[50px] shadow-2xl relative flex flex-col border-[8px] border-slate-900 overflow-hidden box-content">
        {/* Dynamic Island / Notch Area */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50 pointer-events-none"></div>
        
        {/* Screen Content */}
        <div className="w-full h-full bg-[#FCF9EA] relative flex flex-col rounded-[42px] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};
