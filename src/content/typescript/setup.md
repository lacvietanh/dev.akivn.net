# Cài đặt TypeScript

TypeScript là một ngôn ngữ lập trình mở rộng của JavaScript bằng cách thêm các kiểu dữ liệu tĩnh. Trong hướng dẫn này, chúng ta sẽ tìm hiểu cách cài đặt và thiết lập môi trường TypeScript từ đầu.

## Yêu cầu trước khi cài đặt

- Node.js (khuyến nghị phiên bản 12.x trở lên)
- NPM hoặc Yarn package manager

## Cài đặt TypeScript

### Cài đặt toàn cục

```bash
npm install -g typescript
```

Hoặc sử dụng Yarn:

```bash
yarn global add typescript
```

### Kiểm tra cài đặt

Sau khi cài đặt, bạn có thể kiểm tra phiên bản TypeScript bằng lệnh:

```bash
tsc --version
```

## Khởi tạo dự án TypeScript mới

### Bước 1: Tạo thư mục dự án

```bash
mkdir my-typescript-project
cd my-typescript-project
```

### Bước 2: Khởi tạo dự án Node.js

```bash
npm init -y
```

### Bước 3: Cài đặt TypeScript cho dự án

```bash
npm install typescript --save-dev
```

### Bước 4: Tạo file cấu hình TypeScript (tsconfig.json)

Bạn có thể tạo file cấu hình TypeScript bằng lệnh:

```bash
npx tsc --init
```

Điều này sẽ tạo ra file `tsconfig.json` với các cài đặt mặc định. Dưới đây là một cấu hình mẫu:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "lib": ["dom", "es6", "es2017", "esnext.asynciterable"],
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "types": ["node"],
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "baseUrl": "."
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Cấu trúc dự án TypeScript cơ bản

```
my-typescript-project/
├── src/
│   └── index.ts
├── dist/
├── node_modules/
├── package.json
└── tsconfig.json
```

## Biên dịch TypeScript sang JavaScript

Thêm script vào file `package.json` để biên dịch TypeScript:

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  }
}
```

Bây giờ bạn có thể biên dịch TypeScript bằng lệnh:

```bash
npm run build
```

Hoặc theo dõi các thay đổi và biên dịch tự động:

```bash
npm run dev
```

## Cài đặt TypeScript với các framework phổ biến

### Vue.js + TypeScript

Với Vue 3, bạn có thể tạo dự án với TypeScript bằng cách:

```bash
npm init vue@latest

# Sau đó chọn 'Yes' cho TypeScript trong các tùy chọn
```

### React + TypeScript

```bash
npx create-react-app my-app --template typescript
```

### Angular

Angular đã được xây dựng với TypeScript, nên mặc định đã hỗ trợ:

```bash
npm install -g @angular/cli
ng new my-angular-app
```

### Express + TypeScript

```bash
npm install express --save
npm install typescript ts-node @types/node @types/express --save-dev
```

## Các công cụ phát triển (IDE) cho TypeScript

- **Visual Studio Code**: Hỗ trợ TypeScript tốt nhất, với tính năng gợi ý mã, phát hiện lỗi và refactoring.
- **WebStorm**: IDE mạnh mẽ với hỗ trợ TypeScript tích hợp sẵn.
- **Atom và Sublime Text**: Cần cài đặt thêm plugin để hỗ trợ TypeScript.

## Kết luận

Bạn đã học cách cài đặt và thiết lập môi trường TypeScript cơ bản. Ở các bài tiếp theo, chúng ta sẽ tìm hiểu sâu hơn về cú pháp TypeScript và các tính năng mạnh mẽ của nó.