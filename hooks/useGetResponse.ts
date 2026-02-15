
import { useState } from 'react';

interface UseGetResponseConfig {
  proxyUrl: string;
}

interface SubmitResult {
  success: boolean;
  message?: string;
}

export const useGetResponse = ({ proxyUrl }: UseGetResponseConfig) => {
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

    // SPAM CHECK 1: Nếu trường honeypot có dữ liệu -> Chặn ngay lập tức
    if (honeypot !== "") {
      console.log("Spam bot detected via honeypot");
      setIsLoading(false);
      return { success: true }; 
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
      const lowerText = text.toLowerCase();

      // XỬ LÝ LỖI PHỔ BIẾN CỦA GOOGLE APPS SCRIPT
      // Lỗi "User is disabled" hoặc "ScriptError" thường do cài đặt sai quyền truy cập khi Deploy
      if (lowerText.includes("user is disabled") || lowerText.includes("scripterror")) {
          throw new Error("Lỗi Deployment (User is disabled)");
      }

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      if (!text || text.trim() === "") {
         setIsLoading(false);
         return { success: true };
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        // Nếu không parse được JSON và nội dung bắt đầu bằng < (HTML), thường là trang báo lỗi của Google
        if (text.trim().startsWith("<")) {
           throw new Error("Lỗi kết nối Server Google: Vui lòng kiểm tra lại cấu hình Deployment.");
        }
        return { success: true };
      }

      // Xử lý lỗi trả về từ Logic trong Script
      if (data.result === "error" || (data.success === false)) {
          throw new Error(data.message || data.error || "Lỗi xử lý từ Server.");
      }

      if (data.code && data.message) {
        const lowerMsg = data.message.toLowerCase();
        // Bỏ qua lỗi trùng contact (coi như thành công để user đi tiếp)
        if (lowerMsg.includes("queue") || lowerMsg.includes("already added") || lowerMsg.includes("exist")) {
            setIsLoading(false);
            return { success: true };
        }
        throw new Error(data.message); 
      }
      
      if (data.httpStatus && data.httpStatus !== 200) {
         throw new Error(data.message || "Lỗi không xác định từ Proxy");
      }

      setIsLoading(false);
      return { success: true };

    } catch (err: any) {
      console.error("Submission Error:", err);
      let errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
      
      if (err.message) {
          // Loại bỏ tiền tố "Lỗi:" hoặc "Error:" nếu đã có
          errorMessage = err.message.replace(/^(Lỗi|Error):\s*/i, '');
      }

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
