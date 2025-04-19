# Khởi tạo dự án với Vue và Vite

Vue.js là một framework JavaScript linh hoạt để xây dựng giao diện người dùng. Kết hợp với Vite - một công cụ build hiện đại, bạn có thể tạo ra các ứng dụng Vue nhanh chóng và hiệu quả.

## Cài đặt môi trường

Trước khi bắt đầu, bạn cần cài đặt [Node.js](https://nodejs.org/) phiên bản 12.0.0 trở lên.

## Tạo dự án Vue với Vite

Cách đơn giản nhất để tạo một dự án Vue với Vite là sử dụng lệnh sau:

```bash
npm create vite@latest my-vue-app -- --template vue
```

Hoặc nếu bạn sử dụng yarn:

```bash
yarn create vite my-vue-app --template vue
```

Lệnh này sẽ tạo ra một dự án Vue với cấu hình Vite cơ bản.

## Cấu trúc dự án

Sau khi tạo dự án, bạn sẽ có một cấu trúc thư mục như sau:

```
my-vue-app/
├── public/            # Tài nguyên tĩnh 
├── src/               # Mã nguồn
│   ├── assets/        # Tài nguyên (hình ảnh, fonts...)
│   ├── components/    # Các component Vue
│   ├── App.vue        # Component gốc
│   └── main.js        # Điểm khởi đầu của ứng dụng
├── index.html         # File HTML chính
├── package.json       # Cấu hình npm
├── vite.config.js     # Cấu hình Vite
└── README.md          # Tài liệu dự án
```

## Cài đặt các dependencies

Di chuyển vào thư mục dự án và cài đặt các dependencies:

```bash
cd my-vue-app
npm install
```

## Khởi chạy dự án

Để khởi chạy dự án ở chế độ development:

```bash
npm run dev
```

Điều này sẽ khởi động một máy chủ phát triển cục bộ, thường ở địa chỉ `http://localhost:5173/`.

## Build dự án

Để build dự án cho môi trường production:

```bash
npm run build
```

Kết quả build sẽ được lưu trong thư mục `dist/`. Bạn có thể triển khai những file này lên server của mình.

## Ưu điểm khi sử dụng Vite với Vue

- **Khởi động nhanh**: Vite sử dụng ESM để phục vụ file, giúp thời gian khởi động nhanh.
- **Cập nhật tức thì (HMR)**: Vite cung cấp tính năng Hot Module Replacement cực kỳ nhanh.
- **Tối ưu build**: Khi build cho production, Vite sử dụng Rollup để bundle và tối ưu code.
- **Hỗ trợ TypeScript**: Vite tích hợp sẵn hỗ trợ cho TypeScript.

## Tích hợp thêm các công nghệ khác

Vite rất dễ tùy biến và có thể tích hợp với nhiều công nghệ khác:

- **Vue Router**: `npm install vue-router@4`
- **Pinia (state management)**: `npm install pinia`
- **Tailwind CSS**: `npm install -D tailwindcss postcss autoprefixer`

## Tài liệu tham khảo

- [Tài liệu chính thức của Vue.js](https://vuejs.org/guide/introduction.html)
- [Tài liệu chính thức của Vite](https://vitejs.dev/guide/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia - State Management](https://pinia.vuejs.org/)
