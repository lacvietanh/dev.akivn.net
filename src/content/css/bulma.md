# Bulma CSS Framework

## 1. Giới thiệu
Bulma là framework CSS hiện đại, dựa trên Flexbox, không có JavaScript đi kèm, giúp xây dựng layout và giao diện nhanh chóng.

## 2. Cài đặt
```bash
npm install bulma
``` 
Hoặc import trực tiếp trong HTML:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
```

## 3. Cấu hình cơ bản
Import Bulma trong tập tin CSS chính (ví dụ `main.css`):
```css
@import "bulma/css/bulma.css";
```

## 4. Layout với Columns
```html
<div class="columns">
  <div class="column is-half">Cột 1</div>
  <div class="column is-half">Cột 2</div>
</div>
```

## 5. Các Components phổ biến
- **Buttons**: `.button`, `.is-primary`, `.is-link`.
- **Form Controls**: `.input`, `.select`, `.textarea`.
- **Navbar**: `.navbar`, `.navbar-menu`, `.navbar-item`.
- **Modals**: `.modal`, `.modal-background`, `.modal-content`.

---
Mục tiêu: Nắm vững Bulma để xây dựng giao diện cơ bản, sẵn sàng kết hợp với Vue và Tailwind CSS.
