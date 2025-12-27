import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Bird, Sparkles } from 'lucide-react';

interface RippleButtonProps {
  onClick: () => void;
  onEmotionalClick: () => void;
  status: 'idle' | 'requesting' | 'active' | 'completed';
}

export const RippleButton: React.FC<RippleButtonProps> = ({ onClick, onEmotionalClick, status }) => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (status === 'requesting' || status === 'active') {
      const interval = setInterval(() => {
        setRipples((prev) => [
          ...prev,
          { id: Date.now(), x: 0, y: 0 },
        ]);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setRipples([]);
    }
  }, [status]);

  // Cleanup old ripples
  useEffect(() => {
    if (ripples.length > 5) {
      setRipples((prev) => prev.slice(1));
    }
  }, [ripples]);

  return (
    <div className="relative flex items-center justify-center w-full h-96">
      {/* Background Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute rounded-full bg-[#BADFDB] opacity-30 pointer-events-none"
            style={{ width: 200, height: 200 }}
          />
        ))}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        onClick={onClick}
        className={`relative z-10 w-48 h-48 rounded-full shadow-lg flex flex-col items-center justify-center transition-colors duration-500
          ${status === 'active' 
            ? 'bg-gradient-to-br from-[#BADFDB] to-[#8acac3] text-white shadow-[#BADFDB]/50' 
            : 'bg-white text-slate-700 shadow-[#BADFDB]/30'
          }
        `}
      >
        <div className="absolute inset-0 rounded-full border-4 border-[#FCF9EA] opacity-50"></div>
        <div className="absolute inset-2 rounded-full border-2 border-[#BADFDB] opacity-30 border-dashed animate-spin-slow"></div>
        
        <motion.div
          animate={status === 'requesting' ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {status === 'idle' && <Heart className="w-12 h-12 text-[#FFA4A4] fill-[#FFA4A4]" />}
          {status === 'requesting' && <Sparkles className="w-12 h-12 text-white" />}
          {status === 'active' && <div className="text-4xl">🕯️</div>}
        </motion.div>
        
        <span className="mt-2 font-medium tracking-wide text-sm">
          {status === 'idle' && "需要帮助"}
          {status === 'requesting' && "正在呼叫..."}
          {status === 'active' && "有人回应了"}
        </span>
      </motion.button>

      {/* Emotional Support Entry (Tree Hole) - Little bird landing on the button */}
      <motion.button
        initial={{ opacity: 0, y: -20, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={(e) => {
          e.stopPropagation();
          onEmotionalClick();
        }}
        className="absolute top-1/2 right-1/2 translate-x-20 -translate-y-20 z-20 bg-white p-2 rounded-full shadow-md hover:bg-[#FFBDBD]/20 transition-colors"
      >
         <Bird className="w-5 h-5 text-[#FFA4A4]" />
      </motion.button>
      
    </div>
  );
};
