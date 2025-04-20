# HTML & CSS Cơ bản

## 1. Giới thiệu HTML
HTML (HyperText Markup Language) định nghĩa cấu trúc trang web bằng các thẻ (tags).

- Cấu trúc tài liệu:
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ví dụ HTML</title>
  </head>
  <body>
    <h1>Tiêu đề chính</h1>
    <p>Đoạn văn bản demo.</p>
  </body>
  </html>
  ```
- Các thẻ quan trọng: `<h1>`–`<h6>`, `<p>`, `<a>`, `<img>`, `<ul>`, `<ol>`, `<div>`, `<span>`.

## 2. Giới thiệu CSS
CSS (Cascading Style Sheets) định nghĩa phong cách trình bày (màu sắc, bố cục).

- Cách nhúng:
  ```html
  <link rel="stylesheet" href="styles.css">
  ```
- Ví dụ style:
  ```css
  body {
    font-family: sans-serif;
    background-color: #f9f9f9;
  }
  h1 {
    color: #333;
  }
  ```

## 3. Cơ bản về selectors và box model
- **Selectors**: `element`, `.class`, `#id`, `element > child`.
- **Box model**: content, padding, border, margin.

## 4. Flexbox cơ bản
- Container:
  ```css
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ```
- Items:
  ```css
  .item {
    flex: 1;
    margin: 0 8px;
  }
  ```

---
Mục tiêu: Hiểu rõ cấu trúc HTML và cách dùng CSS để tạo giao diện cơ bản, sẵn sàng cho framework CSS hoặc thư viện UI nâng cao.
