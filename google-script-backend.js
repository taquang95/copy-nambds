
// --- CẤU HÌNH MAUTIC (QUAN TRỌNG) ---
// BƯỚC 1: Vào Mautic > Components > Forms > Tạo mới (Standalone Form).
// BƯỚC 2: Tạo field "Email" -> Tab "General" -> Mục "Alias" đặt là: email
// BƯỚC 3: Tạo field "Text" (cho Tên) -> Tab "General" -> Mục "Alias" đặt là: firstname
// BƯỚC 4: Lưu Form -> Nhìn lên thanh địa chỉ URL (ví dụ: /forms/view/5) -> Số 5 là ID.
// -------------------------------------------------------------------------------------

var CONFIG = {
  // 1. Domain Mautic của bạn (Không có dấu / ở cuối)
  MAUTIC_BASE_URL: "https://m.nambds.vn", 
  
  // 2. ID của Form bạn vừa tạo trong Mautic
  MAUTIC_FORM_ID: "1" 
};

// -------------------------------------------------------------------------------------

function doPost(e) {
  // Xử lý khi chạy thử (Test) trong trình soạn thảo
  if (typeof e === 'undefined') {
    e = { parameter: { name: "Test User Script", email: "test_script@gmail.com", b_check: "" } };
  }

  var p = e.parameter;
  var name = p.name;
  var email = p.email;
  var honeypot = p.b_check;

  // 1. CHỐNG SPAM (Honeypot)
  // Nếu bot điền vào trường ẩn này, chặn ngay và báo thành công giả
  if (honeypot && honeypot !== "") {
     return responseJSON({ success: true, message: "Bot detected" });
  }

  // 2. VALIDATE DỮ LIỆU
  if (!name || !email || name.trim() === "" || email.trim() === "") {
     return responseJSON({ success: false, message: "Vui lòng nhập đầy đủ Tên và Email" });
  }

  // 3. GỬI DỮ LIỆU SANG MAUTIC
  // Endpoint submit form của Mautic
  var mauticUrl = CONFIG.MAUTIC_BASE_URL + "/form/submit?formId=" + CONFIG.MAUTIC_FORM_ID;
  
  // Payload theo chuẩn Mautic: mauticform[alias_của_field]
  // Lưu ý: alias 'email' và 'firstname' phải khớp với cấu hình trong Mautic Form
  var payload = {
    "mauticform[formId]": CONFIG.MAUTIC_FORM_ID,
    "mauticform[return]": "", // Để trống để không redirect
    "mauticform[email]": email.trim(),
    "mauticform[firstname]": name.trim(),
    "mauticform[formName]": "landing_page_lead" // Tên gợi nhớ (không bắt buộc)
  };

  var options = {
    "method": "post",
    "payload": payload,
    "followRedirects": true, // Quan trọng: Mautic thường redirect sau khi submit
    "muteHttpExceptions": true
  };
  
  try {
    var response = UrlFetchApp.fetch(mauticUrl, options);
    var responseCode = response.getResponseCode();
    var responseBody = response.getContentText();

    // Mautic trả về 200 (OK) hoặc 302 (Redirect) đều coi là thành công
    if (responseCode === 200 || responseCode === 302) {
      return responseJSON({ success: true, message: "Đăng ký thành công" });
    } else {
      // Log lỗi để debug nếu cần
      Logger.log("Mautic Error Code: " + responseCode);
      Logger.log("Mautic Body: " + responseBody);
      
      // Vẫn trả về success false cho Client
      return responseJSON({ success: false, message: "Lỗi Server Mautic: " + responseCode });
    }
      
  } catch (error) {
    Logger.log("System Error: " + error.toString());
    return responseJSON({ success: false, message: "Lỗi kết nối: " + error.toString() });
  }
}

// Hàm hỗ trợ trả về JSON chuẩn
function responseJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// Hàm doGet để kiểm tra trạng thái Script
function doGet(e) {
  return responseJSON({ 
    status: "Active", 
    system: "Google Apps Script Proxy for Mautic",
    config_domain: CONFIG.MAUTIC_BASE_URL,
    config_form_id: CONFIG.MAUTIC_FORM_ID
  });
}
