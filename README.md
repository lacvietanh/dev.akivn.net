# Website Tài liệu Dev Akivn.net

## Giới thiệu

Dev.akivn.net là một website tài liệu kỹ thuật bằng tiếng Việt, được xây dựng để phục vụ việc đào tạo và cung cấp tài liệu công nghệ cho nhân viên và học viên của Akinet. Website tập trung vào bộ công nghệ chủ đạo mà Akinet sử dụng, bao gồm: Vue/Vite, Vuex, Firebase, Bulma/Tailwind, Node.js, WebSocket, Cloudflare Pages và các kiến thức HTML, CSS, JavaScript căn bản.

## Mục tiêu

- Xây dựng nền tảng tài liệu kỹ thuật tiếng Việt dễ tiếp cận
- Cung cấp lộ trình học tập từ cơ bản đến nâng cao
- Tối ưu hóa SEO thông qua pre-rendering
- Tạo môi trường học tập thân thiện với người mới bắt đầu
- Đồng bộ với các công nghệ đang được sử dụng tại Akinet

## Công nghệ sử dụng

- **Vue 3**: Framework frontend chính
- **Vite**: Công cụ build hiện đại và nhanh chóng
- **Tailwind CSS**: Framework CSS utility-first
- **Pre-rendering**: Tạo các trang HTML tĩnh cho SEO
- **Markdown**: Định dạng nội dung chính
- **GitHub**: Quản lý mã nguồn và nội dung

## Cấu trúc dự án

```
dev.akivn.net/
├── public/               # Tài nguyên tĩnh
├── src/                  # Mã nguồn
│   ├── assets/           # Tài nguyên (hình ảnh, fonts)
│   ├── components/       # Các component Vue
│   ├── layouts/          # Bố cục trang
│   ├── pages/            # Các trang
│   ├── content/          # Nội dung bài học dạng Markdown
│   ├── router/           # Cấu hình router
│   ├── stores/           # Vuex stores
│   ├── styles/           # CSS/Tailwind
│   └── utils/            # Tiện ích
├── vite.config.js        # Cấu hình Vite
├── tailwind.config.js    # Cấu hình Tailwind
└── package.json          # Phụ thuộc npm
```

## Lộ trình nội dung

### 1. Kiến thức nền tảng
- **HTML cơ bản**: Cấu trúc, thẻ, thuộc tính
- **CSS cơ bản**: Bộ chọn, thuộc tính, box model
- **JavaScript cơ bản**: Biến, hàm, vòng lặp, mảng, đối tượng
- **Git & GitHub**: Quản lý mã nguồn căn bản
- **Terminal/Command Line**: Lệnh cơ bản

### 2. Công cụ phát triển
- **Node.js & npm**: Cài đặt và sử dụng
- **Visual Studio Code**: Cấu hình và extensions hữu ích
- **Chrome DevTools**: Debug và tối ưu

### 3. Vue.js
- **Khởi tạo dự án với Vite**
- **Component và Props**
- **Lifecycle hooks**
- **Directives cơ bản (v-if, v-for, v-model...)**
- **Events và Event handling**
- **Vue Router**
- **Vuex/Pinia cơ bản**

### 4. CSS Frameworks
- **Tailwind CSS**: Cài đặt, cấu hình, các utility class
- **Bulma**: Cấu trúc grid, components, responsive design

### 5. Firebase
- **Authentication**
- **Firestore Database**
- **Storage**
- **Cloud Functions cơ bản**

### 6. Node.js
- **Express.js cơ bản**
- **API endpoints**
- **Middleware**
- **Firebase Functions**

### 7. WebSockets
- **Khái niệm và ứng dụng**
- **Tích hợp với Vue**
- **Real-time features**

### 8. Triển khai
- **Cloudflare Pages**
- **Cấu hình CI/CD với GitHub Actions**
- **Domain và DNS**

## Kế hoạch triển khai

1. **Giai đoạn 1**: Thiết lập dự án và cấu trúc (1 tuần)
   - Khởi tạo dự án Vue với Vite
   - Cấu hình Tailwind CSS
   - Xây dựng layout cơ bản

2. **Giai đoạn 2**: Phát triển nền tảng nội dung (2 tuần)
   - Xây dựng hệ thống render Markdown
   - Thiết lập navigation và sidebar
   - Tạo các component hiển thị code

3. **Giai đoạn 3**: Xây dựng nội dung (4-6 tuần)
   - Viết bài cho các chủ đề theo lộ trình
   - Tạo các ví dụ tương tác
   - Tích hợp code sandbox nếu cần

4. **Giai đoạn 4**: Cài đặt pre-rendering và SEO (1 tuần)
   - Cấu hình pre-rendering cho Vite
   - Tối ưu metadata và SEO
   - Kiểm tra hiệu suất

5. **Giai đoạn 5**: Triển khai và tinh chỉnh (1 tuần)
   - Triển khai lên Cloudflare Pages
   - Cấu hình domain
   - Kiểm thử trên nhiều thiết bị

## Tính năng

- **Dark mode/Light mode**: Hỗ trợ cả hai chế độ hiển thị
- **Tìm kiếm nội dung**: Tìm kiếm trong tài liệu
- **Code highlighting**: Định dạng mã nguồn với syntax highlighting
- **Responsive design**: Hiển thị tốt trên mọi thiết bị
- **Theo dõi tiến độ**: Đánh dấu bài học đã hoàn thành
- **Ví dụ tương tác**: Code sandbox nhúng

## Tài liệu tham khảo

- [Vue.js Documentation](https://vuejs.org/guide/introduction.html)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
