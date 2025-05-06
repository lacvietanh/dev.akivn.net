# Tổng quan về HTTP

HTTP (HyperText Transfer Protocol) là nền tảng của bất kỳ trao đổi dữ liệu nào trên Web và là một giao thức client-server, có nghĩa là các yêu cầu được khởi tạo bởi người nhận, thường là trình duyệt web.

## HTTP là gì?

HTTP là giao thức ứng dụng để truyền tải tài liệu siêu văn bản, như HTML. Nó được thiết kế để giao tiếp giữa các trình duyệt web và máy chủ web, nhưng cũng có thể được sử dụng cho các mục đích khác.

HTTP hoạt động dựa trên mô hình client-server, trong đó client (thường là trình duyệt) gửi yêu cầu đến server, server sau đó xử lý và gửi lại phản hồi.

## Các phương thức HTTP

HTTP định nghĩa một tập hợp các phương thức yêu cầu, cho biết hành động mong muốn được thực hiện trên tài nguyên đã xác định. Các phương thức phổ biến nhất là:

### GET
Yêu cầu dữ liệu từ một nguồn tài nguyên cụ thể. Các yêu cầu sử dụng GET chỉ nên lấy dữ liệu và không gây ra bất kỳ tác động nào khác.

```
GET /api/users HTTP/1.1
Host: example.com
```

### POST
Gửi dữ liệu để tạo/cập nhật tài nguyên trên server.

```
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### PUT
Cập nhật tài nguyên đã tồn tại hoặc tạo tài nguyên mới nếu nó không tồn tại.

```
PUT /api/users/123 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### DELETE
Xóa tài nguyên đã xác định.

```
DELETE /api/users/123 HTTP/1.1
Host: example.com
```

### PATCH
Áp dụng sửa đổi một phần cho tài nguyên.

```
PATCH /api/users/123 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "email": "newemail@example.com"
}
```

### HEAD
Giống như GET nhưng trả về chỉ header, không trả về body.

### OPTIONS
Trả về các phương thức HTTP được hỗ trợ cho URL được yêu cầu.

## Mã trạng thái HTTP

HTTP status codes là các số nguyên 3 chữ số chỉ ra kết quả của yêu cầu HTTP. Chúng được phân loại như sau:

### 1xx: Thông tin
- **100 Continue**: Yêu cầu đã được nhận và quá trình đang tiếp tục.
- **101 Switching Protocols**: Người yêu cầu đã hỏi server chuyển đổi protocol.

### 2xx: Thành công
- **200 OK**: Yêu cầu thành công.
- **201 Created**: Yêu cầu thành công và tài nguyên mới đã được tạo.
- **204 No Content**: Yêu cầu thành công nhưng không có nội dung để gửi lại.

### 3xx: Chuyển hướng
- **301 Moved Permanently**: URL đã thay đổi vĩnh viễn.
- **302 Found**: URL đã thay đổi tạm thời.
- **304 Not Modified**: Tài nguyên không thay đổi, client có thể sử dụng bản cache.

### 4xx: Lỗi client
- **400 Bad Request**: Server không hiểu yêu cầu do cú pháp không hợp lệ.
- **401 Unauthorized**: Yêu cầu xác thực (authentication).
- **403 Forbidden**: Client không có quyền truy cập vào nội dung.
- **404 Not Found**: Server không thể tìm thấy tài nguyên được yêu cầu.

### 5xx: Lỗi server
- **500 Internal Server Error**: Lỗi không xác định trên server.
- **502 Bad Gateway**: Server, đang hoạt động như một gateway, nhận phản hồi không hợp lệ.
- **503 Service Unavailable**: Server tạm thời không khả dụng (quá tải hoặc bảo trì).

## HTTP Headers

HTTP headers cho phép client và server truyền thông tin bổ sung với HTTP request hoặc response. Headers là các cặp name-value được phân tách bằng dấu hai chấm.

### Các header phổ biến

#### Request Headers
- **Accept**: Loại nội dung mà client có thể xử lý.
- **Authorization**: Chứa thông tin xác thực để truy cập tài nguyên.
- **Content-Type**: Chỉ định loại phương tiện của body request.
- **User-Agent**: Thông tin về client đang tạo request.

#### Response Headers
- **Cache-Control**: Chỉ thị về cơ chế cache.
- **Content-Type**: Loại phương tiện của body response.
- **Set-Cookie**: Gửi cookie từ server đến client.
- **Access-Control-Allow-Origin**: Chỉ định origins nào có thể truy cập tài nguyên (CORS).

## HTTP và HTTPS

HTTPS (HTTP Secure) là phiên bản an toàn của HTTP. Dữ liệu được trao đổi qua HTTPS được mã hóa trước khi gửi, sử dụng SSL/TLS, làm cho việc truyền thông tin nhạy cảm như thông tin đăng nhập, thông tin thẻ tín dụng, v.v. trở nên an toàn hơn.

## Cookies và Sessions

Cookies là các phần dữ liệu nhỏ được lưu trữ trên máy tính của người dùng bởi trình duyệt web. Chúng thường được sử dụng để theo dõi thông tin về phiên (session), như tình trạng đăng nhập của người dùng, túi mua hàng, hay lịch sử duyệt web.

Sessions là cách để lưu trữ dữ liệu liên quan đến người dùng trên server. Một session ID thường được lưu trong cookie hoặc được truyền qua URL.

## Kết luận

Hiểu về HTTP là nền tảng cơ bản để phát triển các ứng dụng web. Nắm vững các khái niệm như phương thức HTTP, status codes, headers sẽ giúp bạn xây dựng và gỡ lỗi hiệu quả hơn khi làm việc với API RESTful hoặc bất kỳ giao tiếp web nào.