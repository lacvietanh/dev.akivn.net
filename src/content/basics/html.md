# HTML Cơ bản

HTML (HyperText Markup Language) là ngôn ngữ đánh dấu tiêu chuẩn để tạo trang web. HTML mô tả cấu trúc của một trang web thông qua các phần tử (elements).

## Cấu trúc cơ bản của một trang HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>Tiêu đề trang web</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>Đây là tiêu đề lớn</h1>
  <p>Đây là một đoạn văn bản.</p>
</body>
</html>
```

## Các thẻ HTML cơ bản

### Thẻ tiêu đề

HTML cung cấp 6 cấp độ tiêu đề khác nhau, từ `<h1>` đến `<h6>`:

```html
<h1>Tiêu đề cấp 1 - Lớn nhất</h1>
<h2>Tiêu đề cấp 2</h2>
<h3>Tiêu đề cấp 3</h3>
<h4>Tiêu đề cấp 4</h4>
<h5>Tiêu đề cấp 5</h5>
<h6>Tiêu đề cấp 6 - Nhỏ nhất</h6>
```

### Thẻ đoạn văn

Đoạn văn được tạo bằng thẻ `<p>`:

```html
<p>Đây là một đoạn văn bản trong HTML.</p>
<p>Đây là một đoạn văn bản khác.</p>
```

### Thẻ liên kết

Liên kết được tạo bằng thẻ `<a>`:

```html
<a href="https://www.example.com">Đây là một liên kết</a>
```

### Thẻ hình ảnh

Hình ảnh được chèn bằng thẻ `<img>`:

```html
<img src="duong-dan-hinh-anh.jpg" alt="Mô tả hình ảnh">
```

### Danh sách

HTML hỗ trợ hai loại danh sách chính:

1. Danh sách không thứ tự (`<ul>`):

```html
<ul>
  <li>Mục thứ nhất</li>
  <li>Mục thứ hai</li>
  <li>Mục thứ ba</li>
</ul>
```

2. Danh sách có thứ tự (`<ol>`):

```html
<ol>
  <li>Bước thứ nhất</li>
  <li>Bước thứ hai</li>
  <li>Bước thứ ba</li>
</ol>
```

## Tài liệu tham khảo

- [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [W3Schools - HTML Tutorial](https://www.w3schools.com/html/)
