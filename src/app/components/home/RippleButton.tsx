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
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Background Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 3.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute rounded-full bg-[#BADFDB] opacity-40 pointer-events-none"
            style={{ width: 250, height: 250 }}
          />
        ))}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={onClick}
        animate={
          status === 'requesting' 
            ? { 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0px 10px 30px rgba(186, 223, 219, 0.4)",
                  "0px 20px 50px rgba(186, 223, 219, 0.7)",
                  "0px 10px 30px rgba(186, 223, 219, 0.4)"
                ]
              } 
            : {}
        }
        transition={{ 
          scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
          boxShadow: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        }}
        className={`relative z-10 w-64 h-64 rounded-full shadow-2xl flex flex-col items-center justify-center transition-all duration-500
          ${status === 'active' 
            ? 'bg-gradient-to-br from-[#BADFDB] to-[#7dbdb3] text-white' 
            : 'bg-white text-slate-700'
          }
        `}
      >
        <div className="absolute inset-0 rounded-full border-[6px] border-[#FCF9EA] opacity-60"></div>
        {status === 'requesting' && (
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
             className="absolute inset-3 rounded-full border-[3px] border-[#BADFDB] opacity-50 border-t-transparent border-dashed"
           />
        )}
        
        <motion.div
          animate={status === 'requesting' ? { y: [0, -5, 0] } : {}}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          {status === 'idle' && <Heart className="w-20 h-20 text-[#FFA4A4] fill-[#FFA4A4]" strokeWidth={1.5} />}
          {status === 'requesting' && <Sparkles className="w-20 h-20 text-white fill-white/50" />}
          {status === 'active' && <div className="text-6xl">🕯️</div>}
        </motion.div>
        
        <span className="mt-4 font-bold tracking-wide text-lg">
          {status === 'idle' && "需要帮助"}
          {status === 'requesting' && "正在呼叫..."}
          {status === 'active' && "有人回应了"}
        </span>
      </motion.button>

      {/* Emotional Support Entry (Tree Hole) */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        onClick={(e) => {
          e.stopPropagation();
          onEmotionalClick();
        }}
        className="absolute top-1/2 right-1/2 translate-x-28 -translate-y-28 z-20 bg-white p-3 rounded-full shadow-lg hover:bg-[#FFBDBD]/20 transition-colors group"
      >
         <Bird className="w-8 h-8 text-[#FFA4A4] group-hover:scale-110 transition-transform" />
      </motion.button>
      
    </div>
  );
};
