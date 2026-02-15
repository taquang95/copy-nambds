import React, { useState, useEffect } from 'react';

const NAMES = [
  "Nguyễn Văn Nam", "Phạm Minh Tuấn", "Trần Thu Hà", "Lê Văn Hùng", 
  "Hoàng Thị Mai", "Đỗ Đức Thắng", "Vũ Thị Lan", "Ngô Văn Long", 
  "Đặng Minh Tâm", "Bùi Thị Hương", "Nguyễn Quốc Bảo", "Trần Văn Hậu",
  "Lê Thị Bích", "Phan Văn Khải", "Trịnh Minh Đức"
];

export const SocialProofPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    // Initial start after 2 seconds
    const startTimeout = setTimeout(() => {
        triggerPopup();
        // Then every 5 seconds
        const interval = setInterval(triggerPopup, 5000); 
        return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(startTimeout);
  }, []);

  const triggerPopup = () => {
    const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
    setName(randomName);
    setIsVisible(true);
    
    // Hide after 3.5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 3500);
  };

  return (
    <div className={`fixed bottom-4 left-4 z-50 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
      <div className="bg-slate-800/95 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[280px]">
        <div className="relative shrink-0">
             <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
             </div>
             <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-800"></div>
        </div>
        <div className="flex-1">
           <div className="font-bold text-white text-sm leading-tight">{name}</div>
           <div className="text-xs text-slate-300 mt-0.5">đã tải tài liệu</div>
           <div className="text-[10px] text-slate-500 mt-0.5 font-medium">Vừa xong</div>
        </div>
      </div>
    </div>
  );
};