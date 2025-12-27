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
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
      
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl pointer-events-auto z-50 pb-10 sm:pb-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">你需要什么帮助？</h3>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
            <X size={18} className="text-slate-600" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {HELP_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all
                ${selectedType === type.id
                  ? 'border-[#FFA4A4] bg-[#FFA4A4]/10 text-[#FFA4A4]'
                  : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-[#BADFDB]'
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
            className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#BADFDB]"
          />
        </div>

        <div className="flex gap-3 items-center p-3 bg-blue-50 text-blue-600 rounded-xl mb-6 text-xs">
          <AlertCircle size={16} className="shrink-0" />
          <p>仅用于向附近女性发送请求，不会公开您的具体身份信息。</p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedType}
          className="w-full py-3.5 bg-[#FFA4A4] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#FFA4A4]/30 disabled:opacity-50 hover:bg-[#ff9090] transition-colors"
        >
          发出请求
        </button>
      </motion.div>
    </div>
  );
};
