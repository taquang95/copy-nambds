
import { useState } from 'react';

interface UseMauticConfig {
  proxyUrl: string;
}

interface SubmitResult {
  success: boolean;
  message?: string;
}

export const useMautic = ({ proxyUrl }: UseMauticConfig) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitLead = async (name: string, email: string, honeypot: string): Promise<SubmitResult> => {
    setIsLoading(true);
    setError(null);

    // Client-side Validation
    if (!name.trim() || !email.trim()) {
      const msg = "Vui lòng nhập đầy đủ tên và email.";
      setError(msg);
      setIsLoading(false);
      return { success: false, message: msg };
    }

    // SPAM CHECK
    if (honeypot !== "") {
      return { success: true }; // Giả vờ thành công với Bot
    }

    try {
      const params = new URLSearchParams();
      params.append('name', name.trim());
      params.append('email', email.trim());
      params.append('b_check', honeypot); 

      const response = await fetch(proxyUrl.trim(), {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      const text = await response.text();

      // Check lỗi Deployment Google Script phổ biến
      if (text.toLowerCase().includes("user is disabled") || text.toLowerCase().includes("scripterror")) {
          throw new Error("Lỗi Deployment Google Script (User Disabled).");
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        // Nếu không phải JSON, có thể là lỗi HTML từ Google
        if (text.trim().startsWith("<")) throw new Error("Lỗi kết nối Server.");
        return { success: true }; // Fallback an toàn
      }

      if (data.success === false) {
          throw new Error(data.message || "Lỗi xử lý.");
      }

      // Thành công
      setIsLoading(false);
      return { success: true };

    } catch (err: any) {
      console.error("Mautic Submit Error:", err);
      let errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
      if (err.message) errorMessage = err.message.replace(/^(Lỗi|Error):\s*/i, '');
      
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, message: errorMessage };
    }
  };

  return { 
    submitLead, 
    isLoading, 
    error 
  };
};
