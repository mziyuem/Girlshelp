import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';

interface UserPoint {
  id: number;
  x: number;
  y: number;
  type: 'seeker' | 'helper';
  distance: number;
}

export const FuzzyMap: React.FC = () => {
  const [points, setPoints] = useState<UserPoint[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPoint, setSelectedPoint] = useState<UserPoint | null>(null);

  useEffect(() => {
    // Generate random points focused around the center
    const newPoints: UserPoint[] = [];
    for (let i = 0; i < 15; i++) {
      // Random angle
      const angle = Math.random() * Math.PI * 2;
      // Random radius (gaussian-ish distribution for clustering)
      const radius = Math.random() * 150 + 20; 
      
      newPoints.push({
        id: i,
        x: Math.cos(angle) *VP_radius(radius),
        y: Math.sin(angle) *VP_radius(radius),
        type: Math.random() > 0.7 ? 'seeker' : 'helper',
        distance: Math.floor(radius * 2) // Fake distance in meters
      });
    }
    setPoints(newPoints);
  }, []);

  const VP_radius = (r: number) => r; // Viewport scaling helper if needed

  return (
    <div className="relative w-full h-full bg-[#FCF9EA] overflow-hidden flex items-center justify-center" ref={containerRef}>
      
      {/* Background Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
         <div className="w-48 h-48 border border-[#BADFDB] rounded-full"></div>
         <div className="absolute w-96 h-96 border border-[#BADFDB] rounded-full"></div>
         <div className="absolute w-[600px] h-[600px] border border-[#BADFDB] rounded-full"></div>
      </div>

      {/* User Center */}
      <div className="z-10 relative">
        <div className="w-6 h-6 bg-[#BADFDB] rounded-full border-2 border-white shadow-md flex items-center justify-center animate-pulse">
          <Navigation className="w-3 h-3 text-white fill-white transform rotate-45" />
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-slate-400">
          你在这里 (模糊位置)
        </div>
      </div>

      {/* Points */}
      {points.map((point) => (
        <motion.button
          key={point.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: Math.random() * 0.5 }}
          className={`absolute w-8 h-8 rounded-full shadow-sm flex items-center justify-center transform transition-transform hover:scale-110 active:scale-95
            ${point.type === 'seeker' ? 'bg-[#BADFDB]/80' : 'bg-[#FFA4A4]/80'}
          `}
          style={{
            transform: `translate(${point.x}px, ${point.y}px)`,
            marginLeft: '-16px', // Center offset
            marginTop: '-16px'   // Center offset
          }}
          onClick={() => setSelectedPoint(point)}
        >
          <div className="w-2 h-2 bg-white rounded-full opacity-80" />
        </motion.button>
      ))}

      {/* Bottom Sheet for Selected Point */}
      {selectedPoint && (
        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-xl z-20 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-slate-700">
                {selectedPoint.type === 'helper' ? '附近的帮助者' : '附近的求助者'}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                距离约 {selectedPoint.distance} 米
              </p>
              <div className="mt-2 flex gap-2">
                 <span className="text-xs bg-[#FCF9EA] text-slate-600 px-2 py-1 rounded-full border border-[#BADFDB]">
                   {selectedPoint.type === 'helper' ? '可提供: 卫生巾' : '急需: 纸巾'}
                 </span>
              </div>
            </div>
            <button 
              onClick={() => setSelectedPoint(null)}
              className="text-slate-300 hover:text-slate-500"
            >
              ✕
            </button>
          </div>
          <button className="w-full mt-4 bg-[#BADFDB] text-slate-700 font-semibold py-2 rounded-lg hover:brightness-95 transition-all">
            {selectedPoint.type === 'helper' ? '联系她' : '我可以提供帮助'}
          </button>
        </div>
      )}
    </div>
  );
};
