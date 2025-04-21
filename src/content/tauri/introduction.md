# Tauri v2

Tauri là framework mã nguồn mở giúp xây dựng ứng dụng desktop nhẹ, bảo mật, và đa nền tảng:

## 1. Giới thiệu
- Sử dụng webview (Chromium, WebKit) để hiển thị giao diện.
- Kết hợp Rust backend để xử lý logic hệ thống.
- Kích thước gói nhỏ hơn Electron.

## 2. Cài đặt & khởi tạo
```bash
# Cài Rust và Node.js
cargo install create-tauri-app
npx create-tauri-app
```

## 3. Cấu trúc dự án
```
/src
  /src-tauri  # Rust backend
  /dist       # file web được build (Vite)
```

## 4. Các API chính
- **fs**: đọc/ghi tệp tin.
- **dialog**: hộp thoại mở/tạo file.
- **path**: đường dẫn hệ thống.

## 5. Khởi chạy & đóng gói
```bash
npm run tauri dev    # Chạy ứng dụng trong dev modenpm run tauri build  # Build cho production
```

*Tiếp tục cập nhật ví dụ chi tiết và best practices...*
