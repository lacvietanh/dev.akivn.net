# ElectronJS

ElectronJS là một framework mã nguồn mở cho phép xây dựng ứng dụng desktop đa nền tảng bằng các công nghệ web như HTML, CSS và JavaScript. Được phát triển bởi GitHub, ElectronJS được sử dụng rộng rãi để tạo ra nhiều ứng dụng phổ biến như Visual Studio Code, Slack, Discord và nhiều ứng dụng khác.

## Ưu điểm của ElectronJS

- **Đa nền tảng**: Phát triển một lần, chạy trên Windows, macOS và Linux
- **Dễ tiếp cận**: Sử dụng các công nghệ web quen thuộc
- **Hệ sinh thái lớn**: Có thể tận dụng các thư viện npm và Node.js
- **Tích hợp sâu vào hệ thống**: Truy cập vào các API hệ thống

## Nhược điểm của ElectronJS

- **Kích thước ứng dụng lớn**: Do đóng gói cả Chromium và Node.js
- **Tiêu thụ tài nguyên cao**: Yêu cầu nhiều RAM và CPU hơn so với ứng dụng native
- **Hiệu suất thấp hơn**: So với các ứng dụng được viết bằng ngôn ngữ native

## Kiến trúc của ElectronJS

ElectronJS hoạt động dựa trên hai quy trình chính:

1. **Quy trình chính (Main Process)**: Quản lý vòng đời ứng dụng, tương tác với hệ thống
2. **Quy trình render (Renderer Process)**: Hiển thị giao diện người dùng, xử lý các tương tác UI

## Bắt đầu với ElectronJS

### Cài đặt

```bash
# Tạo một dự án mới
mkdir my-electron-app
cd my-electron-app
npm init -y

# Cài đặt Electron
npm install electron --save-dev
```

### Cấu trúc dự án cơ bản

```
my-electron-app/
├── package.json
├── main.js        # Quy trình chính
├── preload.js     # Script tiền tải
└── index.html     # Giao diện người dùng
```

### File main.js cơ bản

```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

### File index.html cơ bản

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Ứng dụng ElectronJS</title>
  <meta http-equiv="Content-Security-Policy" content="script-src 'self';">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Xin chào từ ElectronJS!</h1>
  <p id="info">Ứng dụng desktop được xây dựng bằng công nghệ web.</p>
  <script src="renderer.js"></script>
</body>
</html>
```

## Tích hợp ElectronJS với Vue.js

ElectronJS hoạt động tốt với Vue.js, cho phép xây dựng giao diện người dùng phức tạp và đẹp mắt. Tuy nhiên, để có hiệu suất tốt hơn, chúng ta thường sử dụng Electron-Vite (xem tài liệu Electron-Vite để biết thêm chi tiết).

### Các dự án AkiNet sử dụng ElectronJS

- AkiWorkflow: Hệ sinh thái phần mềm cho sản xuất âm nhạc trên Mac
- Aki NimoJackpot: Công cụ tự động cho nền tảng Nimo TV

## Kết luận

ElectronJS là một công nghệ mạnh mẽ để xây dựng ứng dụng desktop với kiến thức web. Tuy nhiên, nếu bạn quan tâm đến hiệu suất và kích thước ứng dụng nhỏ hơn, bạn nên xem xét [Tauri Framework](/tauri/introduction) như một giải pháp thay thế hiện đại hơn.

## Tài nguyên học tập

- [Trang chủ ElectronJS](https://www.electronjs.org/)
- [Tài liệu chính thức](https://www.electronjs.org/docs)
- [Electron Fiddle](https://www.electronjs.org/fiddle) - Công cụ để thử nghiệm với Electron
