import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Feather, CloudRain, Sun } from 'lucide-react';

interface TreeHoleViewProps {
  onClose: () => void;
}

export const TreeHoleView: React.FC<TreeHoleViewProps> = ({ onClose }) => {
  const [step, setStep] = useState<'input' | 'processing' | 'result'>('input');
  const [input, setInput] = useState('');
  const [result,qhResult] = useState<{ image: string; text: string; role: string } | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setStep('processing');
    
    // Mock processing delay
    setTimeout(() => {
      // Simple keyword matching mock
      let res = {
        image: 'bird',
        role: '一只路过的小鸟',
        text: '“每一次跌倒，都是为了学会飞翔。” \n—— 即使翅QN受损，天空依然为你敞开。'
      };

      if (input.includes('累') || input.includes('难过')) {
        res = {
          image: 'flower',
          role: '墙角的小白花',
          text: '“在这喧嚣的世界里，允许自己安静地枯萎一会儿，也是一种生命力。”'
        };
      } else if (input.includes('生气') || input.includes('烦')) {
        res = {
          image: 'rain',
          role: '夏日的雷阵雨',
          text: '“宣泄是自然的韵律，大雨过后，空气会变得格外清新。”'
        };
      }

      qhResult(res);
      setStep('result');
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-[#FCF9EA]/95 backdrop-blur-sm flex flex-col p-6"
    >
      <button 
        onClick={onClose}
        className="self-end p-2 bg-white rounded-full shadow-sm text-slate-400 hover:text-slate-600 mb-8"
      >
        <X size={20} />
      </button>

      <AnimatePresence mode="wait">
        {step === 'input' && (
          <motion.div
            key="input"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center space-y-6"
          >
            <h2 className="text-2xl font-serif text-slate-700">此刻，你想说什么？</h2>
            <div className="w-full max-w-xs relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="最近做实验一直失败，很沮丧..."
                className="w-full h-40 p-4 rounded-2xl bg-white border border-[#BADFDB] focus:ring-2 focus:ring-[#BADFDB] outline-none resize-none shadow-inner text-slate-600"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute -bottom-4 -right-4 bg-[#FFA4A4] text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-8">我们不评判，只倾听。</p>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <div className="relative">
              <div className="w-20 h-20 bg-[#BADFDB] rounded-full opacity-20 animate-ping"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <Feather className="text-[#BADFDB] animate-bounce" size={32} />
              </div>
            </div>
            <p className="mt-4 text-slate-500 font-serif">正在寻找回应你的意象...</p>
          </motion.div>
        )}

        {step === 'result' && result && (
          <motion.div
            key="result"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center px-4"
          >
            <div className="w-64 bg-white p-6 rounded-2xl shadow-xl border border-[#FFBDBD]/30 transform rotate-1">
              <div className="w-full h-40 bg-[#FCF9EA] rounded-xl mb-4 flex items-center justify-center overflow-hidden relative">
                {/* Visual Placeholder for Imagery */}
                {result.image === 'bird' && <Bird size={60} className="text-[#FFA4A4]" />}
                {result.image === 'flower' && <Sun size={60} className="text-[#FFA4A4]" />}
                {result.image === 'rain' && <CloudRain size={60} className="text-[#BADFDB]" />}
                
                <div className="absolute bottom-2 right-2 text-xs text-slate-400 bg-white/80 px-2 py-1 rounded-full">
                  {result.role}
                </div>
              </div>
              
              <div className="font-serif text-slate-700 leading-relaxed text-center">
                {result.text}
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-center">
                <button className="text-xs text-[#BADFDB] hover:text-[#8acac3] font-medium tracking-widest uppercase">
                  保存这张卡片
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
