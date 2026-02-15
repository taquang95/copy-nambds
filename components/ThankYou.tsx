
import React, { useState, useEffect } from 'react';

export const ThankYou = () => {
  const [progress, setProgress] = useState(5); // Bắt đầu từ 5%

  useEffect(() => {
    // Hiệu ứng chạy thanh tiến độ từ thấp đến cao
    const timer = setTimeout(() => {
        setProgress(95);
    }, 300); // Delay nhẹ để người dùng thấy hiệu ứng chạy

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
            backgroundSize: '20px 20px'
        }}></div>

      <div className="max-w-3xl w-full bg-white relative z-10 text-center">
        
        {/* Progress Bar Container */}
        <div className="w-full max-w-md mx-auto h-8 bg-gray-200 rounded-full border border-gray-300 mb-8 relative overflow-hidden shadow-inner">
             {/* Striped Red Bar */}
            <div 
                className="h-full bg-red-600 relative transition-all duration-[2000ms] ease-out" 
                style={{ width: `${progress}%` }}
            >
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
                    backgroundSize: '1rem 1rem'
                }}></div>
            </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-red-600 uppercase mb-8">
          ĐÃ GỬI TÀI LIỆU THÀNH CÔNG!
        </h1>

        {/* Email Instruction Section */}
        <div className="max-w-2xl mx-auto text-left bg-blue-50 rounded-xl p-6 md:p-8 border border-blue-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
             </div>
             
             <div className="relative z-10">
                <h3 className="font-bold text-blue-900 text-xl mb-6 flex items-center gap-2">
                    <span className="text-2xl">📧</span> HƯỚNG DẪN NHẬN TÀI LIỆU
                </h3>

                <div className="mb-6 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                    <img 
                        src="https://i.postimg.cc/KzGX5zLD/123123.png" 
                        alt="Hướng dẫn kiểm tra email chi tiết" 
                        className="w-full h-auto object-cover"
                    />
                </div>
                
                <div className="space-y-4 bg-white/80 p-5 rounded-lg backdrop-blur-sm border border-blue-100 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-md">1</div>
                        <p className="text-gray-800 text-base py-1">
                            Kiểm tra hộp thư <strong>Inbox (Hộp thư đến)</strong> hoặc tab <strong>Promotions (Quảng cáo)</strong>.
                        </p>
                    </div>
                    
                    <div className="w-full h-px bg-blue-100 ml-12"></div>

                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-md">2</div>
                        <p className="text-gray-800 text-base py-1">
                            Nếu không thấy, vui lòng kiểm tra mục <strong>Spam (Thư rác)</strong>.
                        </p>
                    </div>

                    <div className="w-full h-px bg-blue-100 ml-12"></div>

                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-md animate-pulse">3</div>
                        <div className="py-1">
                            <p className="text-gray-800 text-base font-bold text-red-600 mb-1">
                                QUAN TRỌNG:
                            </p>
                            <p className="text-gray-700 text-sm">
                                Nếu mail nằm trong Spam, hãy bấm nút <strong>"Report not spam"</strong> (Báo cáo không phải spam) để đảm bảo bạn nhận được trọn bộ tài liệu.
                            </p>
                        </div>
                    </div>
                </div>

                <p className="text-gray-500 text-xs mt-6 italic text-center">
                    * Hệ thống đã gửi email tự động. Có thể mất 1-2 phút để email đến hộp thư của bạn.
                </p>
             </div>
        </div>

      </div>
      
      <div className="mt-16 text-gray-400 text-sm">
        © Nguyễn Nam BĐS - All rights reserved
      </div>
    </div>
  );
};
