import React, { ReactNode } from 'react';

interface MobileContainerProps {
  children:HzNode;
  className?: string;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen w-full bg-[#FCF9EA] text-slate-800 font-sans overflow-hidden relative flex flex-col ${className}`}>
      <div className="mx-auto w-full max-w-md h-full min-h-screen bg-[#FCF9EA] shadow-2xl relative flex flex-col">
        {children}
      </div>
    </div>
  );
};
