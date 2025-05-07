1. Luôn sử dụng tiếng Việt khi chat
2. Luôn sử dụng tiếng Anh cho code 
3. Giữ hoặc tạo JSDOC cho những hàm quan trọng
4. Luôn bám sát flow tổng thể để tránh những lỗi cơ bản phát sinh

FRONTEND:
5. Sử dụng Vue 3 Composition API. script setup -> template -> style
6. Luôn ưu tiên sử dụng các class của CSS Library
7. Dùng SweetAlert2 KHÔNG CẦN IMPORT [đã khai báo ở index.html, admin.html]
8. Các firebase object đều import từ gstatic [import CDN: "https://www.gstatic.com/firebasejs/11.3.1/.... ]
9. tất cả firebase object đều được inject từ admin.js/main.js nên sẽ khai báo theo kiểu: const { app|auth|db|analytics|rtdb|fn|msg|storage } = inject('$firebase');