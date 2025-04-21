# Electron-Vite

Electron-Vite là một công cụ xây dựng hiệu suất cao cho các ứng dụng Electron, tích hợp Vite (trình biên dịch và phát triển web cực nhanh) với Electron. Electron-Vite giúp cải thiện trải nghiệm phát triển và tăng hiệu suất đóng gói ứng dụng Electron.

## Lợi ích của Electron-Vite so với Electron thông thường

- **Hot Module Replacement (HMR)**: Cập nhật nhanh chóng các thay đổi mà không cần khởi động lại ứng dụng
- **Khởi động nhanh**: Vite sử dụng ESM native nên khởi động nhanh hơn đáng kể
- **Tối ưu đóng gói**: Cấu trúc dự án tốt hơn và các công cụ đóng gói tối ưu
- **TypeScript hỗ trợ sẵn**: Không cần cấu hình phức tạp
- **Plugin hệ sinh thái phong phú**: Tận dụng plugin từ Vite

## Cài đặt và thiết lập

### Tạo dự án mới

```bash
# Sử dụng npm
npm create electron-vite

# Hoặc sử dụng yarn
yarn create electron-vite

# Hoặc sử dụng pnpm
pnpm create electron-vite
```

Quá trình này sẽ hướng dẫn bạn qua các bước thiết lập, bao gồm lựa chọn framework frontend (Vue, React, Svelte, hoặc Vanilla).

### Cấu trúc thư mục dự án

```
my-electron-vite-app/
├── electron/              # Mã Electron (Main process)
│   ├── main.ts            # Entry point của main process
│   └── preload.ts         # Preload script
├── src/                   # Mã frontend (Renderer process)
│   ├── assets/            # Tài nguyên tĩnh
│   ├── components/        # Components
│   ├── App.vue            # Component gốc (nếu dùng Vue)
│   └── main.ts            # Entry point của renderer
├── index.html             # HTML template
├── electron.vite.config.ts # Cấu hình Electron-Vite
├── package.json
└── vite.config.ts         # Cấu hình Vite bổ sung
```

### Lệnh phát triển

```bash
# Chạy trong chế độ phát triển
npm run dev

# Build ứng dụng
npm run build

# Đóng gói ứng dụng
npm run package
```

## Tích hợp với Vue 3

Electron-Vite hoạt động đặc biệt tốt với Vue 3, cung cấp trải nghiệm phát triển tuyệt vời. Sau đây là ví dụ về cấu hình và sử dụng Vue 3 với Electron-Vite:

### Cài đặt Vue 3

Khi tạo dự án, chọn Vue làm framework. Hoặc trong dự án hiện tại:

```bash
npm install vue@latest
```

### Thiết lập vue trong vite.config.ts

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'

export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload: {
        input: 'electron/preload.ts',
      },
    }),
  ],
})
```

### Component Vue đơn giản

```vue
<template>
  <div class="container">
    <h1>{{ greeting }}</h1>
    <button @click="changeGreeting">Thay đổi lời chào</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const greeting = ref('Xin chào từ Electron-Vite với Vue 3!')
const changeGreeting = () => {
  greeting.value = 'Lời chào đã được thay đổi!'
}
</script>
```

## Các dự án AkiNet sử dụng Electron-Vite

- **Aki TeleAuto**: Ứng dụng tự động cho Telegram miniApp, quản lý nhiều tài khoản và tự động hóa nhiệm vụ.

## So sánh với Tauri

Mặc dù Electron-Vite cải thiện đáng kể trải nghiệm phát triển Electron, nó vẫn không khắc phục những hạn chế cốt lõi của Electron như kích thước ứng dụng lớn và tiêu thụ tài nguyên cao. Nếu bạn đang tìm kiếm một giải pháp nhẹ hơn cho desktop app, hãy xem xét [Tauri Framework](/tauri/introduction).

## Kết luận

Electron-Vite là một cải tiến đáng kể cho quá trình phát triển Electron, kết hợp sức mạnh của Vite để tạo ra trải nghiệm phát triển nhanh hơn và hiệu quả hơn. Đây là lựa chọn tuyệt vời cho các dự án Electron mới hoặc nâng cấp các dự án Electron hiện có.

## Tài nguyên học tập

- [GitHub Electron-Vite](https://github.com/electron-vite/electron-vite-vue)
- [Tài liệu Vite](https://vitejs.dev/guide/)
- [Electron-Forge với Vite](https://www.electronforge.io/guides/framework-integration/vite)
