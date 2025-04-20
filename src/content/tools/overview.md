# Tổng quan Công cụ Phát triển

## 1. Visual Studio Code
- Editor mạnh mẽ, hỗ trợ extensions và IntelliSense.
- Các extension gợi ý: ESLint, Prettier, Vetur / Volar (Vue), TODO Highlight.
- Cấu hình settings.json cơ bản:
  ```json
  {
    "editor.formatOnSave": true,
    "files.trimTrailingWhitespace": true,
    "vetur.validation.template": false
  }
  ```

## 2. Git & GitHub
- **Khởi tạo repo:** `git init`, `git add .`, `git commit -m "Initial commit"`.
- **Quy trình cơ bản:** tạo branch (`git checkout -b feature`), commit, pull request trên GitHub.
- **Các lệnh hữu ích:** `git status`, `git log --oneline`, `git diff`, `git rebase`.

## 3. Node.js & npm
- **Cài đặt:** tải từ nodejs.org, kiểm tra `node -v` và `npm -v`.
- **Những lệnh chính:** `npm init`, `npm install <package>`, `npm run dev`, `npm run build`.
- **Package.json:** scripts, dependencies, devDependencies.

---
Mục tiêu: Hiểu và thành thạo các công cụ cơ bản để làm việc với dự án web hiện đại.
