Vấn đề: Các css global của tailwind bị inline trong thẻ style của các file html sau khi build.
Mục tiêu: 
1. Không chia nhỏ các css của tailwind thành các file riêng như hiện tại 
2. Không inline các css của tailwind vào trong thẻ style của các file html sau khi build
3. Mọi css của tailwind được bundle thành một file css duy nhất, các file prerendered html chỉ cần import file css này để tận dụng tối ưu hiệu suất và cache.
Phương án: kiểm tra lại toàn bộ index.html, main.js, style.css, vite.config.js để hiểu flow và tìm ra cách giải quyết vấn đề này.

Đã hoàn thành việc gộp tất cả css thành một file akidev.css đặt ở root (dist) sau khi build