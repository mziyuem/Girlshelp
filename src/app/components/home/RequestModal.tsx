import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, AlertCircle } from 'lucide-react';

interface RequestModalProps {
  onClose: () => void;
  onSubmit: (type: string, note: string) => void;
}

const HELP_TYPES = [
  { id: 'pad', label: '卫生巾', icon: '🌸' },
  { id: 'tissue', label: '纸巾', icon: '🧻' },
  { id: 'safety', label: '安全陪伴', icon: '🛡️' },
  { id: 'other', label: '其他急需', icon: '❓' },
];

export const RequestModal: React.FC<RequestModalProps> = ({ onClose, onSubmit }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (selectedType) {
      onSubmit(selectedType, note);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={onClose} />
      
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="bg-white w-full max-w-md rounded-t-[30px] sm:rounded-[30px] shadow-2xl pointer-events-auto z-50 flex flex-col max-h-[90vh]"
      >
        {/* Map Preview Header */}
        <div className="h-40 bg-slate-100 relative w-full overflow-hidden rounded-t-[30px] border-b border-slate-100">
           <div className="absolute inset-0 flex items-center justify-center opacity-30">
             {/* Simple visual mock of map grid */}
             <div className="w-[120%] h-[120%] bg-[radial-gradient(#BADFDB_1px,transparent_1px)] [background-size:20px_20px]"></div>
           </div>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-500/30 animate-pulse"></div>
              <div className="absolute mt-8 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold text-slate-600 shadow-sm">
                定位中...
              </div>
           </div>
           <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white shadow-sm">
             <X size={18} className="text-slate-600" />
           </button>
        </div>

        <div className="p-6 pb-10 sm:pb-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">你需要什么帮助？</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {HELP_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200
                  ${selectedType === type.id
                    ? 'border-[#FFA4A4] bg-[#FFA4A4]/10 text-[#FFA4A4] shadow-sm scale-[1.02]'
                    : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-[#BADFDB] hover:bg-white'
                  }
                `}
              >
                <span className="text-2xl">{type.icon}</span>
                <span className="font-medium">{type.label}</span>
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-500 mb-2">
              补充说明 (选填)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="例如：我在商场2楼洗手间门口..."
              className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#BADFDB] focus:bg-white transition-all outline-none"
            />
          </div>

          <div className="flex gap-3 items-start p-3 bg-blue-50/50 text-blue-600/80 rounded-2xl mb-6 text-xs">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <p className="leading-relaxed">仅用于向附近女性发送请求，不会公开您的具体身份信息。</p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedType}
            className="w-full py-4 bg-[#FFA4A4] text-white rounded-2xl font-bold text-lg shadow-lg shadow-[#FFA4A4]/30 disabled:opacity-50 hover:bg-[#ff9090] hover:scale-[1.01] active:scale-[0.98] transition-all"
          >
            发出请求
          </button>
        </div>
      </motion.div>
    </div>
  );
};
