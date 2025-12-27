import React from 'react';
import { User, Heart, Gift, Settings, ChevronRight } from 'lucide-react';

export const ProfileView: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#FCF9EA] p-6 pt-12 overflow-y-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-[#BADFDB] rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-md">
          👩🏻
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">WarmUser_882</h2>
          <p className="text-sm text-slate-500">加入互助第 12 天</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
           <div className="w-10 h-10 bg-[#FFA4A4]/10 rounded-full flex items-center justify-center mb-2">
             <Heart className="text-[#FFA4A4]" size={20} />
           </div>
           <span className="text-2xl font-bold text-slate-700">5</span>
           <span className="text-xs text-slate-400 mt-1">帮助他人</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
           <div className="w-10 h-10 bg-[#BADFDB]/10 rounded-full flex items-center justify-center mb-2">
             <Gift className="text-[#BADFDB]" size={20} />
           </div>
           <span className="text-2xl font-bold text-slate-700">2</span>
           <span className="text-xs text-slate-400 mt-1">获得帮助</span>
        </div>
      </div>

      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">我的提供</h3>
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-8 border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-slate-700">常备资源</span>
          <div className="flex gap-1">
             <span className="px-2 py-1 bg-[#FCF9EA] text-slate-600 text-xs rounded-md">卫生巾</span>
             <span className="px-2 py-1 bg-[#FCF9EA] text-slate-600 text-xs rounded-md">纸巾</span>
          </div>
        </div>
        <p className="text-xs text-slate-400">开启后，附近的求助者可以在地图上看到您大概位置有资源可提供。</p>
        <div className="mt-4 flex items-center justify-between">
           <span className="text-sm text-slate-600">展示在地图上</span>
           <div className="w-12 h-6 bg-[#BADFDB] rounded-full relative cursor-pointer">
             <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
           </div>
        </div>
      </div>

      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">设置</h3>
      <div className="space-y-2">
        <button className="w-full bg-white p-4 rounded-xl flex items-center justify-between shadow-sm border border-slate-100">
           <div className="flex items-center gap-3">
             <Settings size={18} className="text-slate-400" />
             <span className="text-slate-600">隐私设置</span>
           </div>
           <ChevronRight size={18} className="text-slate-300" />
        </button>
        <button className="w-full bg-white p-4 rounded-xl flex items-center justify-between shadow-sm border border-slate-100">
           <div className="flex items-center gap-3">
             <Heart size={18} className="text-slate-400" />
             <span className="text-slate-600">关于我们</span>
           </div>
           <ChevronRight size={18} className="text-slate-300" />
        </button>
      </div>

      <div className="mt-auto pt-8 pb-4 text-center">
        <p className="text-xs text-slate-300">Girls Help Girls · Light App</p>
      </div>
    </div>
  );
};
