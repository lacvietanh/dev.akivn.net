# Website Tài liệu Dev Akivn.net

## Giới thiệu

Dev.akivn.net là một website tài liệu kỹ thuật bằng tiếng Việt, được xây dựng để phục vụ việc đào tạo và cung cấp tài liệu công nghệ cho nhân viên và học viên của Akinet. Website tập trung vào bộ công nghệ chủ đạo mà Akinet sử dụng, bao gồm: Vue/Vite, Vuex, Firebase (Frontend & Advanced), Bulma/Tailwind, Node.js, và các kiến thức HTML, CSS, JavaScript căn bản.

Trang web được thiết kế với giao diện hiện đại sử dụng Tailwind CSS và Bulma, nội dung được quản lý dưới dạng Markdown và được render tĩnh (SSG) bằng ViteSSG để tối ưu SEO và tốc độ tải trang.

## Mục tiêu

- Xây dựng nền tảng tài liệu kỹ thuật tiếng Việt dễ tiếp cận và hiện đại.
- Cung cấp lộ trình học tập rõ ràng từ căn bản đến nâng cao.
- Tối ưu hóa SEO và hiệu suất thông qua Static Site Generation (SSG).
- Tạo môi trường học tập thân thiện, tập trung vào thực hành.
- Đồng bộ với các công nghệ và quy trình đang được sử dụng tại Akinet.

## Công nghệ sử dụng

- **Frontend Framework**: Vue 3
- **Build Tool**: Vite
- **CSS Frameworks**: Bulma (chính), Tailwind CSS (phụ trợ, tùy chỉnh)
- **State Management**: Vuex
- **Routing**: Vue Router
- **Backend Services**: Firebase (Authentication, Firestore, Storage, Cloud Functions)
- **Backend Runtime**: Node.js (cho Cloud Functions hoặc API riêng nếu cần)
- **Content Format**: Markdown
- **Static Site Generation (SSG)**: ViteSSG (hoặc tương tự)
- **Deployment**: Cloudflare Pages (dự kiến)
- **Version Control**: Git & GitHub

## Cấu trúc dự án

```
dev.akivn.net/
├── public/               # Tài nguyên tĩnh (robots.txt, sitemap.xml)
├── src/
│   ├── assets/           # Hình ảnh, fonts...
│   ├── components/       # Components dùng chung (Header, Footer, Sidebar, Head...)
│   ├── content/          # Nội dung bài học (Markdown files)
│   ├── router/           # Cấu hình Vue Router (index.js)
│   ├── stores/           # Cấu hình Vuex (nếu dùng)
│   ├── styles/           # CSS toàn cục (style.css)
│   ├── utils/            # Các hàm tiện ích (generate-sitemap.js)
│   ├── views/            # Components cho các trang (HomePage, TopicPage, NotFoundPage)
│   ├── App.vue           # Component gốc của ứng dụng
│   └── main.js           # Điểm khởi đầu ứng dụng (khởi tạo Vue, router, store)
├── index.html            # Template HTML chính
├── vite.config.js        # Cấu hình Vite & ViteSSG
├── tailwind.config.js    # Cấu hình Tailwind CSS
├── postcss.config.js     # Cấu hình PostCSS (thường dùng với Tailwind)
├── package.json          # Dependencies và scripts
└── README.md             # Tài liệu dự án
```

## Lộ trình nội dung (Đã cập nhật)

### 1. Lộ trình căn bản (tối thiểu)
- **HTML & CSS**: Nền tảng web.
- **JavaScript**: Ngôn ngữ lập trình web.
- **Công cụ phát triển**: VS Code, Git, Node.js/npm.
- **Bulma**: Framework CSS chính.
- **Vue.js (với Vite)**: Framework JavaScript.
- **Firebase (Frontend)**: Auth, Firestore, Storage.

### 2. Lộ trình nâng cao
- **Vue Ecosystem**: Vue Router, Vuex.
- **Node.js**: Backend development.
- **Firebase (Advanced)**: Cloud Functions, Security Rules.
- **Tailwind CSS**: Utility-first CSS.
- **Testing**: Vitest/Vue Test Utils.
- **TypeScript**: Static typing.
- **SSR/SSG**: Tối ưu hóa hiệu suất/SEO (ViteSSG).

## Trạng thái dự án (20/04/2025)

- Giao diện trang chủ đã được cập nhật với thiết kế hiện đại hơn.
- Cấu trúc nội dung và lộ trình học tập đã được điều chỉnh.
- Header và Footer đã được cập nhật.
- Tiếp theo: Bắt đầu xây dựng nội dung chi tiết cho các chủ đề trong lộ trình.

## Đóng góp

Xem hướng dẫn đóng góp (CONTRIBUTING.md - sẽ tạo sau).
