
import React, { useState, useRef } from 'react';
import { DownloadIcon } from './Icons';
import { useMautic } from '../hooks/useMautic'; // Đổi sang hook Mautic

// --- CẤU HÌNH KẾT NỐI ---
// URL của Google Apps Script (Bạn giữ nguyên URL cũ nếu Update nội dung Script, hoặc dán URL mới nếu tạo file mới)
const CONFIG = {
  GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbyP-HBzJR1r0uOAVES5SqpMKlT74juB5i9TReYQWHkF1M-AfwWwZxag3u3YV4_RFPfjAQ/exec", 
};

interface LeadFormProps {
  onSuccess: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [honeyPot, setHoneyPot] = useState(''); // Trường ẩn để bẫy bot
  const formStartTime = useRef(Date.now()); // Thời điểm bắt đầu load form
  
  // Sử dụng hook Mautic
  const { submitLead, isLoading, error } = useMautic({
    proxyUrl: CONFIG.GOOGLE_SCRIPT_URL.trim()
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // SPAM CHECK: Time
    const timeElapsed = Date.now() - formStartTime.current;
    if (timeElapsed < 3000) {
        console.warn("Form submitted too quickly.");
    }

    // Gửi dữ liệu
    const result = await submitLead(formData.name, formData.email, honeyPot);

    if (result.success) {
      setFormData({ name: '', email: '' });
      onSuccess();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      <div className="bg-blue-50 p-6 text-center border-b border-blue-100">
        <h3 className="text-blue-600 font-bold text-lg uppercase">Nhận Tài Liệu Qua Email</h3>
        <p className="text-red-600 font-bold text-sm mt-1 animate-pulse">Chỉ còn 5 suất miễn phí</p>
      </div>

      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* HONEYPOT FIELD */}
          <div className="hidden opacity-0 h-0 w-0 overflow-hidden">
             <input 
                type="text" 
                name="b_check_field" 
                tabIndex={-1} 
                autoComplete="off"
                value={honeyPot}
                onChange={(e) => setHoneyPot(e.target.value)}
             />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Họ tên</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all"
              placeholder="Nguyễn Văn Nam"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all"
              placeholder="email@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={isLoading}
            />
          </div>

          {/* Hiển thị lỗi nếu có */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed text-gray-100' 
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/30'
              }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                ĐANG XỬ LÝ...
              </>
            ) : (
              <>
                TẢI TÀI LIỆU NGAY
                <DownloadIcon className="w-5 h-5" />
              </>
            )}
          </button>
          
          <p className="text-[10px] text-center text-gray-400 mt-2">
            Thông tin của bạn được bảo mật tuyệt đối 100%
          </p>
        </form>
      </div>
    </div>
  );
};
