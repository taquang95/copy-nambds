
import React, { useState, useEffect } from 'react';
import { LeadForm } from './components/LeadForm';
import { CheckIcon, LocationIcon, ChartIcon, BuildingIcon, DownloadIcon } from './components/Icons';
import { SocialProofPopup } from './components/SocialProofPopup';
import { ThankYou } from './components/ThankYou';

const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

// Component hiển thị số người đang xem
const LiveViewerCount = () => {
  const [count, setCount] = useState(431);

  useEffect(() => {
    // Giả lập số người xem thay đổi ngẫu nhiên
    const interval = setInterval(() => {
      setCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // Tăng/giảm từ -2 đến +2
        return prev + change;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 mb-8 opacity-0 animate-reveal-up delay-500 text-white font-medium text-sm sm:text-base">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-500 animate-bounce-subtle">
         <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
       </svg>
       <span>Có</span>
       <div className="relative px-2 py-0.5 bg-gray-200 text-red-600 font-bold rounded flex items-center shadow-inner">
         <span className="tabular-nums tracking-wide">{count}</span>
         {/* Con trỏ nhấp nháy màu đỏ */}
         <span className="w-0.5 h-4 bg-red-600 ml-1 animate-cursor-blink"></span>
       </div>
       <span>người đang xem trang này</span>
    </div>
  );
};

const App: React.FC = () => {
  const [downloadReady, setDownloadReady] = useState(false);
  useScrollReveal();

  const handleSuccess = () => {
    setDownloadReady(true);
    // Cuộn lên đầu trang để người dùng thấy trang cảm ơn ngay lập tức
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const scrollToRegister = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPreview = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('preview');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // NẾU ĐÃ GỬI FORM THÀNH CÔNG -> HIỂN THỊ TRANG CẢM ƠN
  if (downloadReady) {
    return <ThankYou />;
  }

  // NẾU CHƯA -> HIỂN THỊ LANDING PAGE
  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          100% { transform: translateY(0px) rotate(3deg); }
        }
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shake-slow {
          animation: shake 0.5s ease-in-out infinite;
        }
        .animate-cursor-blink {
          animation: blink 1s step-end infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
      
      <SocialProofPopup />

      {/* FLOATING CTA BUTTON RIGHT SIDE */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center">
        <a 
          href="#register" 
          onClick={scrollToRegister}
          className="group relative flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-brand-gold to-yellow-600 text-white rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all hover:scale-110 active:scale-95 animate-shake-slow"
        >
          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
          <DownloadIcon className="w-8 h-8 md:w-10 md:h-10 mb-1" />
          <span className="text-[10px] md:text-xs font-bold uppercase text-center leading-tight px-2">Tải Ngay</span>
        </a>
      </div>

      {/* HEADER */}
      <header className="bg-brand-900/95 backdrop-blur-sm text-white py-4 sticky top-0 z-50 shadow-lg border-b border-white/10 opacity-0 animate-reveal-down">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-gold to-yellow-600 rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-yellow-500/20 transform hover:rotate-6 transition-transform">N</div>
            <div className="leading-tight">
              <div className="font-bold text-lg tracking-wide uppercase">NGUYỄN NAM BĐS</div>
              <div className="text-xs text-gray-400 tracking-wider uppercase font-medium">Chuyên gia đào tạo</div>
            </div>
          </div>
          <a href="#register" onClick={scrollToRegister} className="hidden md:flex items-center gap-2 bg-white text-brand-900 px-5 py-2.5 rounded-lg font-bold hover:bg-gray-100 transition-all hover:shadow-lg transform hover:-translate-y-0.5">
            <DownloadIcon className="w-4 h-4" />
            Tải Tài Liệu
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-brand-900 text-white pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-brand-900 to-slate-800"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] rounded-full bg-brand-gold opacity-10 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] rounded-full bg-blue-600 opacity-10 blur-[100px]"></div>

        <div className="container mx-auto px-4 grid md:grid-cols-12 gap-12 items-center relative z-10">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-brand-gold px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-brand-gold/20 shadow-lg opacity-0 animate-reveal-up delay-100">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              KỸ NĂNG HỌC CHUYÊN SÂU DỰ ÁN
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight opacity-0 animate-reveal-up delay-200">
              Học Dự Án Đúng Cách <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-300 filter drop-shadow-sm">
                Bán Hàng Đúng Tầm
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed opacity-0 animate-reveal-up delay-300">
              Tải ngay bộ tài liệu về <span className="text-white font-semibold">kỹ năng học dự án</span> để gia tăng tỷ lệ chuyển đổi trong bán hàng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10 opacity-0 animate-reveal-up delay-400">
              <a href="#register" onClick={scrollToRegister} className="group relative overflow-hidden bg-gradient-to-r from-brand-gold to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white text-center font-bold py-4 px-8 rounded-xl shadow-lg shadow-yellow-500/25 transition-all transform hover:-translate-y-1">
                <span className="absolute inset-0 bg-white/20 -translate-x-full animate-shimmer"></span>
                <span className="flex items-center justify-center gap-2 relative z-10">
                  Tải Xuống Miễn Phí
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
              <a href="#preview" onClick={scrollToPreview} className="group bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white text-center font-semibold py-4 px-8 rounded-xl transition-all">
                Xem Nội Dung
              </a>
            </div>

            {/* LIVE VIEWER COUNT ADDED HERE */}
            <LiveViewerCount />

            <div className="flex items-center gap-4 text-sm text-gray-300 bg-black/20 p-3 rounded-lg backdrop-blur-sm w-fit opacity-0 animate-reveal-up delay-600">
              <div className="flex -space-x-3">
                 <img className="w-10 h-10 rounded-full border-2 border-brand-900 transition-transform hover:scale-110" src="https://i.pravatar.cc/100?img=11" alt="User" />
                 <img className="w-10 h-10 rounded-full border-2 border-brand-900 transition-transform hover:scale-110" src="https://i.pravatar.cc/100?img=12" alt="User" />
                 <img className="w-10 h-10 rounded-full border-2 border-brand-900 transition-transform hover:scale-110" src="https://i.pravatar.cc/100?img=13" alt="User" />
                 <div className="w-10 h-10 rounded-full border-2 border-brand-900 bg-gray-700 flex items-center justify-center text-xs font-bold text-white transition-transform hover:scale-110">
                   +1k
                 </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <span>★★★★★</span>
                </div>
                <p className="font-medium">1.200+ Môi giới đã tải xuống</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 relative perspective-1000 opacity-0 animate-reveal-right delay-200">
             <div className="animate-float relative mx-auto w-3/4 md:w-full max-w-md">
                <div className="absolute inset-0 bg-brand-gold blur-[60px] opacity-20 transform translate-y-10"></div>
                <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl overflow-hidden border-t-8 border-brand-gold transform rotate-y-12 transition-transform duration-500 hover:rotate-0 hover:scale-105 cursor-pointer">
                   <div className="p-2 bg-gray-100 flex gap-1.5 border-b border-gray-200">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                   </div>
                   <div className="relative aspect-[3/4] bg-gray-800">
                     <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" alt="Real Estate Analysis" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                     <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/80 to-transparent p-6 flex flex-col justify-end">
                        <div className="border-l-4 border-brand-gold pl-4 mb-4">
                          <h3 className="text-white text-3xl font-bold uppercase leading-none mb-1">KỸ NĂNG</h3>
                          <p className="text-brand-gold font-bold text-xl uppercase tracking-widest">CHUYÊN MÔN</p>
                        </div>
                        <p className="text-gray-300 text-sm mb-6">Phân tích chuyên sâu: Tỉnh/Thành, Quận/Huyện, Dự án,…</p>
                        <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20">
                          <div className="text-xs text-gray-300 uppercase tracking-wider mb-1">Tác giả</div>
                          <div className="text-white font-bold">Nguyễn Nam BĐS</div>
                        </div>
                     </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION / PREVIEW SECTION */}
      <section id="preview" className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
            <span className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-2 block">Nội dung độc quyền</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">Cấu Trúc Tài Liệu Đào Tạo Chuyên Sâu</h2>
            <p className="text-gray-600 text-lg">
              Tài liệu được hệ thống hóa logic theo phương pháp "Phễu thông tin", giúp môi giới nắm bắt từ vĩ mô đến vi mô, tự tin tư vấn mọi khách hàng.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2 reveal-on-scroll delay-100">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <LocationIcon className="w-8 h-8"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">1. Kiến Thức Thị Trường Tỉnh</h3>
              <p className="text-sm text-gray-500 mb-6 font-semibold uppercase tracking-wider">KINH TẾ VĨ MÔ, GIAO THÔNG, DÂN CƯ</p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3 items-start transform transition-transform group-hover:translate-x-1">
                  <div className="mt-1 bg-green-100 p-0.5 rounded-full"><CheckIcon className="w-4 h-4 text-green-600 shrink-0" /></div>
                  <span className="text-sm"><strong>Vị trí:</strong> nằm ở đâu? Cách Thành phố lớn bao xa? Các Tỉnh/Thành tiếp giáp?</span>
                </li>
                <li className="flex gap-3 items-start transform transition-transform group-hover:translate-x-1 delay-75">
                  <div className="mt-1 bg-green-100 p-0.5 rounded-full"><CheckIcon className="w-4 h-4 text-green-600 shrink-0" /></div>
                  <span className="text-sm"><strong>Kinh tế:</strong> Tốc độ phát triển? Ngành chủ lực? Thu nhập bình quân?</span>
                </li>
              </ul>
            </div>
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-amber-200 transition-all duration-500 transform hover:-translate-y-2 reveal-on-scroll delay-200">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <ChartIcon className="w-8 h-8"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">2. Kiến Thức Thị Trường Huyện</h3>
              <p className="text-sm text-gray-500 mb-6 font-semibold uppercase tracking-wider">TIỀM NĂNG CỦA HUYỆN</p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3 items-start transform transition-transform group-hover:translate-x-1">
                  <div className="mt-1 bg-green-100 p-0.5 rounded-full"><CheckIcon className="w-4 h-4 text-green-600 shrink-0" /></div>
                  <span className="text-sm"><strong>Giao thông:</strong> Các tuyến đường chính? Các dự án tương lai? Cơ sở hạ tầng?</span>
                </li>
                <li className="flex gap-3 items-start transform transition-transform group-hover:translate-x-1 delay-75">
                  <div className="mt-1 bg-green-100 p-0.5 rounded-full"><CheckIcon className="w-4 h-4 text-green-600 shrink-0" /></div>
                  <span className="text-sm"><strong>Đô thị:</strong> Các dự án xung quanh? Các dự án tương lai?</span>
                </li>
              </ul>
            </div>
             <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-red-200 transition-all duration-500 transform hover:-translate-y-2 reveal-on-scroll delay-300">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <BuildingIcon className="w-8 h-8"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">3. Kiến Thức Dự Án</h3>
              <p className="text-sm text-gray-500 mb-6 font-semibold uppercase tracking-wider">PHÂN TÍCH CHUYÊN SÂU DỰ ÁN</p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3 items-start transform transition-transform group-hover:translate-x-1">
                  <div className="mt-1 bg-green-100 p-0.5 rounded-full"><CheckIcon className="w-4 h-4 text-green-600 shrink-0" /></div>
                  <span className="text-sm"><strong>Thông tin tổng quan:</strong> Tên dự án? Vị trí? Pháp lý? Quy mô? Chủ đầu tư?</span>
                </li>
                <li className="flex gap-3 items-start transform transition-transform group-hover:translate-x-1 delay-75">
                  <div className="mt-1 bg-green-100 p-0.5 rounded-full"><CheckIcon className="w-4 h-4 text-green-600 shrink-0" /></div>
                  <span className="text-sm"><strong>Sản phẩm:</strong> Giá bán? Ưu đãi? Ngân hàng? Đối thủ cạnh tranh? Thanh khoản? Tiềm năng</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AUTHOR SECTION */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
            {/* Author Image */}
            <div className="w-56 h-56 md:w-72 md:h-72 shrink-0 relative reveal-on-scroll">
               <div className="w-full h-full rounded-full p-1 border border-gray-100 shadow-xl relative z-10 bg-white">
                  <img 
                    src="https://i.postimg.cc/vHP9H9t7/nambds.jpg" 
                    alt="Nguyễn Nam BĐS" 
                    className="w-full h-full rounded-full object-cover" 
                  />
               </div>
               {/* Check Badge */}
               <div className="absolute bottom-4 right-4 z-20 bg-blue-600 text-white w-10 h-10 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                   <CheckIcon className="w-5 h-5"/>
               </div>
            </div>

            {/* Author Content */}
            <div className="flex-1 reveal-on-scroll delay-100">
               <p className="text-gray-600 italic text-lg md:text-xl leading-relaxed mb-10">
                 "Kiến thức là chìa khóa để mở cánh cửa niềm tin của khách hàng. Với kinh nghiệm thực chiến nhiều năm trong ngành Bất Động Sản, tôi đã đúc kết bộ tài liệu này nhằm giúp các bạn môi giới mới và lâu năm có cái nhìn tổng quan và chi tiết nhất về một dự án bất kỳ"
               </p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Youtube */}
                  <a href="https://youtube.com/@nguyennambdstuyendung?si=AAwDKLGxxYzugdjY" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                     <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                     </div>
                     <div>
                        <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Kênh Youtube</div>
                        <div className="font-bold text-gray-900">Nguyễn Nam BĐS</div>
                     </div>
                  </a>

                  {/* Website */}
                  <a href="https://nambds.vn" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                     <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                     </div>
                     <div>
                        <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Website Chính Thức</div>
                        <div className="font-bold text-gray-900">nambds.vn</div>
                     </div>
                  </a>

                  {/* Facebook */}
                  <a href="https://www.facebook.com/share/1ECmmf8ipx/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                     <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                     </div>
                     <div>
                        <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Facebook</div>
                        <div className="font-bold text-gray-900">Nguyễn Nam</div>
                     </div>
                  </a>

                  {/* Tiktok */}
                  <a href="https://www.tiktok.com/@namtuyendung?_r=1&_t=ZS-93Q3PmFDmbM" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                     <div className="w-10 h-10 bg-gray-100 text-black rounded-lg flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                     </div>
                     <div>
                        <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Kênh Tiktok</div>
                        <div className="font-bold text-gray-900">Nam Tuyển Dụng</div>
                     </div>
                  </a>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM SECTION */}
      <section id="register" className="py-20 bg-gradient-to-br from-slate-900 to-brand-900 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col md:flex-row gap-12 items-center reveal-on-scroll">
            <div className="md:w-1/2 text-white">
               <h2 className="text-3xl font-bold mb-4 transform transition-transform hover:translate-x-1">Đừng Bỏ Lỡ! Đăng Ký Để Nhận Nhiều Hơn Thế</h2>
               <p className="text-gray-300 mb-6 text-lg">
                 Đây không chỉ là tải một tài liệu. Đây là bước đầu tiên để bạn trở thành <span className="text-white font-bold tracking-wide">Best Seller</span>. Để lại email ngay để nhận bộ tài liệu <span className="text-white font-bold">"Kỹ năng học dự án chuyên sâu"</span>.
               </p>
               <div className="mb-8 p-4 rounded-xl border border-blue-400/30 bg-blue-900/30 backdrop-blur-md relative overflow-hidden group transform transition-all hover:scale-[1.02]">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                  <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-colors"></div>
                  <p className="text-lg font-medium text-blue-100 relative z-10 uppercase">
                      Tài liệu <span className="line-through text-gray-400 mx-1 decoration-red-500/60 decoration-2">1.600.000đ</span> được <span className="text-brand-gold font-bold uppercase text-xl ml-1">miễn phí hôm nay</span>
                  </p>
               </div>
               <div className="space-y-6">
                  <div className="flex items-center gap-4 group/item cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0 transition-all group-hover/item:bg-brand-gold group-hover/item:text-brand-900 group-hover/item:scale-110">
                      <DownloadIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Tải xuống tài liệu miễn phí</div>
                      <div className="text-sm text-gray-400">Gửi tự động qua Email trong 30s</div>
                    </div>
                  </div>
               </div>
            </div>
            <div className="md:w-1/2 w-full transform transition-all hover:rotate-1">
               <LeadForm onSuccess={handleSuccess} />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-900 text-slate-300 py-20 relative overflow-hidden border-t border-slate-800">
          <div className="container mx-auto px-4 relative z-10">
              <div className="grid md:grid-cols-12 gap-12 items-start reveal-on-scroll">
                  {/* Left Column: Brand & Mission */}
                  <div className="md:col-span-7">
                      <div className="flex items-center gap-3 mb-6 group cursor-default">
                         <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-yellow-600 rounded-lg flex items-center justify-center font-bold text-white text-2xl shadow-xl transition-transform group-hover:rotate-6">N</div>
                         <div>
                            <div className="text-white font-bold text-2xl leading-none uppercase tracking-tight">NGUYỄN NAM BĐS</div>
                            <div className="text-xs text-brand-gold uppercase tracking-[0.2em] mt-1 font-bold">Chuyên Gia Đào Tạo</div>
                         </div>
                      </div>
                      <p className="text-slate-400 max-w-lg leading-relaxed text-lg italic">
                          Sứ mệnh chia sẻ kiến thức thực chiến, giúp môi giới BĐS nhanh chóng tiếp cận dự án bất kỳ với tâm thế chủ động.
                      </p>
                  </div>

                  {/* Right Column: Connection Box */}
                  <div className="md:col-span-5">
                      <div className="border border-blue-500/40 rounded-2xl p-8 bg-slate-800/20 backdrop-blur-sm relative overflow-hidden group">
                         {/* Subtle Glow inside the box */}
                         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
                         
                         <h4 className="text-white font-bold mb-8 text-xl relative">
                            Kết Nối
                            <span className="absolute -bottom-2 left-0 w-10 h-1 bg-brand-gold rounded-full"></span>
                         </h4>
                         
                         <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                            <a href="https://nambds.vn" target="_blank" rel="noreferrer" className="flex items-center gap-3 group/link hover:text-brand-gold transition-colors">
                               <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-brand-gold shadow-md group-hover/link:bg-brand-gold group-hover/link:text-brand-900 transition-all transform group-hover/link:scale-110">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                               </div>
                               <span className="font-bold text-sm">Website</span>
                            </a>
                            <a href="https://www.facebook.com/share/1ECmmf8ipx/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="flex items-center gap-3 group/link hover:text-brand-gold transition-colors">
                               <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-brand-gold shadow-md group-hover/link:bg-brand-gold group-hover/link:text-brand-900 transition-all transform group-hover/link:scale-110">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                               </div>
                               <span className="font-bold text-sm">Facebook</span>
                            </a>
                            <a href="https://youtube.com/@nguyennambdstuyendung?si=AAwDKLGxxYzugdjY" target="_blank" rel="noreferrer" className="flex items-center gap-3 group/link hover:text-brand-gold transition-colors">
                               <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-brand-gold shadow-md group-hover/link:bg-brand-gold group-hover/link:text-brand-900 transition-all transform group-hover/link:scale-110">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                               </div>
                               <span className="font-bold text-sm">Youtube</span>
                            </a>
                            <a href="https://www.tiktok.com/@namtuyendung?_r=1&_t=ZS-93Q3PmFDmbM" target="_blank" rel="noreferrer" className="flex items-center gap-3 group/link hover:text-brand-gold transition-colors">
                               <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-brand-gold shadow-md group-hover/link:bg-brand-gold group-hover/link:text-brand-900 transition-all transform group-hover/link:scale-110">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                               </div>
                               <span className="font-bold text-sm">Tiktok</span>
                            </a>
                         </div>
                      </div>
                  </div>
              </div>
              
              <div className="pt-12 mt-16 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500 reveal-on-scroll delay-400">
                  <div className="font-medium">© {new Date().getFullYear()} NGUYỄN NAM BĐS. All rights reserved.</div>
                  <div className="flex gap-10">
                      <a href="#" className="hover:text-brand-gold transition-colors relative group">
                        Chính sách bảo mật
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full"></span>
                      </a>
                      <a href="#" className="hover:text-brand-gold transition-colors relative group">
                        Điều khoản sử dụng
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full"></span>
                      </a>
                  </div>
              </div>
          </div>
          
          {/* Faint Background Logo */}
          <div className="absolute -bottom-20 -left-20 text-[20rem] font-black text-white/5 select-none pointer-events-none uppercase tracking-tighter">NAM</div>
      </footer>
    </div>
  );
};

export default App;
