# Bắt đầu với Hệ sinh thái Akinet: Công cụ cần thiết

Chào mừng bạn đến với hệ sinh thái Akinet! Để bắt đầu hành trình lập trình của mình, việc làm quen và sử dụng thành thạo một số công cụ cơ bản là rất quan trọng. Dưới đây là danh sách các công cụ thiết yếu bạn cần chuẩn bị.

## 1. Visual Studio Code (VS Code)

Download: [Visual Studio Code](https://code.visualstudio.com/)
- **Tại sao cần?** Đây là trình soạn thảo mã nguồn (code editor) phổ biến nhất, giúp bạn viết code hiệu quả hơn với nhiều tính năng hỗ trợ và khả năng tùy biến cao.
- **Tính năng chính:** Hỗ trợ gợi ý code thông minh (IntelliSense), tích hợp terminal, gỡ lỗi (debugging), và kho tiện ích mở rộng (extensions) phong phú.
- **Extensions gợi ý cho Akinet:**
    - `Vue - Official`: Hỗ trợ ngôn ngữ Vue
    - `Github Copilot`: Hỗ trợ gợi ý code thông minh.
    - `GitLens`: Xem lịch sử commit ngay trong VS Code.
    - `Firebase`: Hỗ trợ phát triển ứng dụng Firebase.
- **Cấu hình cơ bản (`settings.json`):**
```json
{
  "github.copilot.selectedCompletionModel": "gpt-4o-copilot",
  "workbench.activityBar.location": "bottom",
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },
  "github.copilot.nextEditSuggestions.enabled": true,
  "editor.minimap.enabled": false,
  "github.copilot.enable": {
    "*": true,
    "plaintext": true,
    "markdown": true,
    "scminput": false
  },
  "eslint.rules.customizations": [
    {
      "rule": "vue/no-v-for-template-key",
      "severity": "off"
    }
  ],
  "vue.autoInsert.dotValue": true,
  "vetur.validation.template": false,
  "cline.vsCodeLmModelSelector": {},
  "cline.mcp.mode": "off",
  "html.format.wrapLineLength": 0,
  "html.format.wrapAttributes": "preserve",
  "editor.quickSuggestionsDelay": 100,
  "github.copilot.chat.search.keywordSuggestions": true
}
```

## 2. Git & GitHub
- **Tại sao cần?** Git là hệ thống quản lý phiên bản phân tán, giúp bạn theo dõi lịch sử thay đổi code, làm việc nhóm hiệu quả và quay lại các phiên bản cũ khi cần. GitHub là nền tảng hosting mã nguồn dựa trên Git, nơi lưu trữ và quản lý các dự án của Akinet.
- **Khởi tạo repo:** `git init` (khởi tạo trong thư mục dự án), `git add .` (thêm tất cả file vào staging), `git commit -m "Thông điệp commit"` (lưu thay đổi).
- **Quy trình làm việc cơ bản:**
    1. Tạo nhánh mới cho tính năng/sửa lỗi: `git checkout -b ten-nhanh`
    2. Viết code và commit thay đổi: `git add .`, `git commit -m "Mô tả thay đổi"`
    3. Đẩy nhánh lên GitHub: `git push origin ten-nhanh`
    4. Tạo Pull Request trên GitHub để yêu cầu merge vào nhánh chính.
- **Các lệnh hữu ích:**
    - `git status`: Xem trạng thái các file thay đổi.
    - `git log --oneline`: Xem lịch sử commit gọn gàng.
    - `git diff`: Xem sự khác biệt giữa các phiên bản.
    - `git pull`: Cập nhật code mới nhất từ remote repository.
    - `git rebase`: (Nâng cao) Tích hợp thay đổi từ nhánh khác một cách gọn gàng hơn merge.

## 3. Node.js & npm (hoặc pnpm/yarn)
- **Tại sao cần?** Node.js là môi trường chạy JavaScript phía server, cần thiết cho việc xây dựng và chạy các ứng dụng web hiện đại, bao gồm cả các công cụ phát triển frontend. npm (Node Package Manager) đi kèm với Node.js, dùng để quản lý các thư viện (packages) mà dự án sử dụng. Akinet cũng có thể sử dụng `pnpm` hoặc `yarn` thay thế cho `npm` để quản lý package hiệu quả hơn.
- **Cài đặt:** Tải phiên bản LTS (Long Term Support) từ [nodejs.org](https://nodejs.org/). Sau khi cài đặt, kiểm tra phiên bản bằng lệnh `node -v` và `npm -v` (hoặc `pnpm -v`, `yarn -v`).
- **Những lệnh chính:**
    - `npm init` (hoặc `pnpm init`, `yarn init`): Khởi tạo dự án Node.js, tạo file `package.json`.
    - `npm install <ten-package>` (hoặc `pnpm add`, `yarn add`): Cài đặt một thư viện.
    - `npm install` (hoặc `pnpm install`, `yarn install`): Cài đặt tất cả thư viện được định nghĩa trong `package.json`.
    - `npm run <ten-script>` (hoặc `pnpm run`, `yarn run`): Chạy các script được định nghĩa trong `package.json` (ví dụ: `npm run dev` để chạy môi trường phát triển, `npm run build` để build dự án).
- **File `package.json`:** Chứa thông tin về dự án, danh sách các thư viện phụ thuộc (`dependencies`, `devDependencies`), và các câu lệnh tùy chỉnh (`scripts`).

---
**Mục tiêu:** Nắm vững cách cài đặt và sử dụng các công cụ nền tảng này để sẵn sàng tham gia vào các dự án trong hệ sinh thái Akinet.
