import React, { useState } from 'react';
import { MobileContainer } from './components/layout/MobileContainer';
import { RippleButton } from './components/home/RippleButton';
import { FuzzyMap } from './components/map/FuzzyMap';
import { ProfileView } from './components/profile/ProfileView';
import { RequestModal } from './components/home/RequestModal';
import { TreeHoleView } from './components/emotional/TreeHoleView';
import { Home, Map as MapIcon, User } from 'lucide-react';
import { Toaster, toast } from 'sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'map' | 'profile'>('home');
  const [helpStatus, setHelpStatus] = useState<'idle' | 'requesting' | 'active'>('idle');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showTreeHole, setShowTreeHole] = useState(false);

  // Handle Help Request
  const handleStartRequest = () => {
    if (helpStatus === 'idle') {
      setShowRequestModal(true);
    } else if (helpStatus === 'requesting') {
      // Allow canceling?
      toast("长按按钮可以取消请求");
    } else if (helpStatus === 'active') {
      toast.success("互助完成！感谢使用。");
      setHelpStatus('idle');
    }
  };

  const submitRequest = (type: string, note: string) => {
    setShowRequestModal(false);
    setHelpStatus('requesting');
    
    // Simulate finding a helper
    setTimeout(() => {
      setHelpStatus('active');
      toast.success("附近有姐妹响应了你的请求！", {
        description: "请点击按钮查看详情或保持关注。",
        duration: 5000,
      });
    }, 5000);
  };

  return (
    <MobileContainer>
      {/* Top Header - Only on Home/Map */}
      {activeTab !== 'profile' && (
        <header className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center pointer-events-none">
          <h1 className="text-xl font-bold text-slate-700 pointer-events-auto">
            <span className="text-[#FFA4A4]">Girls</span>Help
          </h1>
          {helpStatus !== 'idle' && (
            <div className="bg-[#BADFDB] text-white px-3 py-1 rounded-full text-xs shadow-md animate-pulse pointer-events-auto">
              {helpStatus === 'requesting' ? '正在呼叫...' : '互助进行中'}
            </div>
          )}
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col h-full overflow-hidden">
        {activeTab === 'home' && (
          <div className="w-full h-full flex flex-col items-center justify-center relative pb-16">
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <span className="text-[200px] font-serif text-[#BADFDB]">GH</span>
            </div>
            
            <p className="mb-16 text-slate-500 font-serif text-center max-w-[200px] animate-fade-in">
              {helpStatus === 'idle' ? "你需要帮助吗？点一下就好。" : "别担心，大家都在。"}
            </p>

            <div className="flex items-center justify-center">
              <RippleButton 
                onClick={handleStartRequest} 
                onEmotionalClick={() => setShowTreeHole(true)}
                status={helpStatus === 'active' ? 'active' : helpStatus === 'requesting' ? 'requesting' : 'idle'}
              />
            </div>
          </div>
        )}

        {activeTab === 'map' && <FuzzyMap />}
        
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-slate-100 p-2 flex justify-around items-center z-30 pb-6 sm:pb-2">
        <NavButton 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
          icon={<Home size={24} />} 
          label="求助" 
        />
        <NavButton 
          active={activeTab === 'map'} 
          onClick={() => setActiveTab('map')} 
          icon={<MapIcon size={24} />} 
          label="附近" 
        />
        <NavButton 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')} 
          icon={<User size={24} />} 
          label="我的" 
        />
      </nav>

      {/* Modals & Overlays */}
      {showRequestModal && (
        <RequestModal 
          onClose={() => setShowRequestModal(false)} 
          onSubmit={submitRequest} 
        />
      )}

      {showTreeHole && (
        <TreeHoleView onClose={() => setShowTreeHole(false)} />
      )}

      <Toaster position="top-center" />
    </MobileContainer>
  );
}

const NavButton = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center p-2 transition-colors ${active ? 'text-[#FFA4A4]' : 'text-slate-300 hover:text-slate-400'}`}
  >
    {icon}
    <span className="text-[10px] font-medium mt-1">{label}</span>
  </button>
);
