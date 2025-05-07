# Website Tài liệu Dev Akivn.net

## Giới thiệu

Dev.akivn.net là một website tài liệu kỹ thuật bằng tiếng Việt, được xây dựng để phục vụ việc đào tạo và cung cấp tài liệu công nghệ cho nhân viên và học viên của Akinet. Website tập trung vào bộ công nghệ chủ đạo mà Akinet sử dụng, bao gồm: Vue/Vite, Vuex, Firebase (Frontend & Advanced), Bulma/Tailwind, Node.js, và các kiến thức HTML, CSS, JavaScript căn bản.

Trang web được thiết kế với giao diện hiện đại sử dụng Tailwind CSS và Bulma, nội dung được quản lý dưới dạng Markdown và được render tĩnh (SSG) bằng ViteSSG để tối ưu SEO và tốc độ tải trang. Gần đây, dự án đã trải qua một đợt cải thiện lớn tập trung vào tối ưu SEO, hiệu suất tải trang và cấu trúc code.

## Mục tiêu

- Xây dựng nền tảng tài liệu kỹ thuật tiếng Việt dễ tiếp cận và hiện đại.
- Cung cấp lộ trình học tập rõ ràng từ căn bản đến nâng cao.
- Tối ưu hóa SEO và hiệu suất thông qua Static Site Generation (SSG) với `@unhead/vue` cho quản lý thẻ meta.
- Cải thiện tốc độ tải trang thông qua code splitting và lazy loading cho các thư viện lớn như `highlight.js`.
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
- **Static Site Generation (SSG)**: ViteSSG
- **Head Management**: `@unhead/vue`
- **Syntax Highlighting**: `highlight.js` (với lazy loading)
- **Deployment**: Cloudflare Pages (dự kiến)
- **Version Control**: Git & GitHub

## Cấu trúc dự án

```
dev.akivn.net/
├── public/               # Tài nguyên tĩnh (robots.txt, sitemap.xml)
├── src/
│   ├── assets/           # Hình ảnh, fonts, và nội dung markdown đã build (được copy từ content/)
│   ├── components/       # Components dùng chung (Header, Footer, Sidebar...)
│   ├── content/          # Nội dung bài học gốc (Markdown files)
│   ├── router.js         # Cấu hình Vue Router
│   ├── stores/           # Cấu hình Vuex (nếu dùng)
│   ├── style.css         # CSS toàn cục
│   ├── utils/            # Các hàm tiện ích (generate-sitemap.js, lazyHighlight.js)
│   ├── views/            # Components cho các trang (HomePage, TopicPage, NotFoundPage)
│   ├── App.vue           # Component gốc của ứng dụng
│   └── main.js           # Điểm khởi đầu ứng dụng (khởi tạo Vue, router, store, @unhead/vue)
├── index.html            # Template HTML chính
├── vite.config.js        # Cấu hình Vite & ViteSSG
├── tailwind.config.js    # Cấu hình Tailwind CSS
├── postcss.config.js     # Cấu hình PostCSS (thường dùng với Tailwind)
├── package.json          # Dependencies và scripts
└── README.md             # Tài liệu dự án
```

## Lộ trình nội dung (Đã cập nhật)

### 1. Lộ trình căn bản (tối thiểu)
- **Công cụ phát triển**: VS Code, Git, Node.js/npm.
- **HTML & CSS**: Nền tảng web.
- **Bulma (CSS Library)**: Framework CSS chính.
- **JavaScript**: Ngôn ngữ lập trình web.
- **Vue.js (với Vite)**: Framework JavaScript.
- **Firebase (Frontend)**: Auth, Firestore, Storage.
- **HTTP & RESTful API**: Giao thức web và thiết kế API.

### 2. Lộ trình nâng cao
- **Vue Ecosystem**: Vue Router, Vuex.
- **NodeJS, Websocket**: Backend development.
- **Firebase (Advanced)**: Cloud Functions, Security Rules.
- **SSR/SSG**: Tối ưu hóa hiệu suất/SEO (ViteSSG).
- **Tauri (Framework)**: Xây dựng ứng dụng desktop.
- **ElectronJS**: Xây dựng ứng dụng desktop với công nghệ web.

### 3. Lộ trình tùy chọn
- **AI & Nghệ thuật Prompt**: Sử dụng AI tăng năng suất.
- **SEO (Tối ưu tìm kiếm)**: Kỹ thuật tối ưu tìm kiếm.
- **Electron-Vite**: Kết hợp Electron với Vite để phát triển desktop app.
- **Rust**: Ngôn ngữ lập trình hệ thống, backend của Tauri.
- **Tailwind (CSS Library)**: Utility-first CSS.
- **Testing**: Vitest/Vue Test Utils.
- **TypeScript**: Static typing.

## Trạng thái dự án (08/05/2025)

- **Hoàn tất đợt cải thiện lớn:**
    - Tối ưu hóa việc render tĩnh các thẻ meta SEO với `@unhead/vue` và `vite-ssg`.
    - Cải thiện cơ chế tải nội dung Markdown, ưu tiên từ thư mục `assets` sau khi build.
    - Triển khai code splitting và lazy loading cho `highlight.js` để giảm kích thước bundle ban đầu.
- Giao diện trang chủ, header, footer đã được cập nhật.
- Cấu trúc nội dung và lộ trình học tập đã được điều chỉnh.
- **Tiếp theo:**
    - Xác minh lại toàn bộ chức năng SEO và hiệu suất sau đợt cải thiện.
    - Tối ưu css sau khi build (hiện tại nội dung thẻ style quá dài, bị lặp lại ở các file html)
    - Bắt đầu xây dựng nội dung chi tiết cho các chủ đề trong lộ trình.

## Đóng góp

Xem hướng dẫn đóng góp (CONTRIBUTING.md - sẽ tạo sau).
