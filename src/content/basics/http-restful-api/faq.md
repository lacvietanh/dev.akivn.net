# Hỏi đáp HTTP & REST

### REST và RESTful API khác nhau như thế nào?
REST (Representational State Transfer) là một kiểu kiến trúc phần mềm định nghĩa các ràng buộc và nguyên tắc cho việc thiết kế API. RESTful API là API được xây dựng tuân theo các nguyên tắc của REST. Một API được gọi là RESTful khi nó tuân thủ các ràng buộc như:
- Kiến trúc client-server
- Stateless (không lưu trạng thái)
- Cacheable (có thể cache)
- Giao diện đồng nhất (uniform interface)
- Hệ thống phân lớp (layered system)

Nói cách khác, REST là lý thuyết và RESTful API là việc triển khai thực tế.

### Tại sao nên sử dụng PUT thay vì POST khi cập nhật dữ liệu?
PUT và POST có ý nghĩa khác nhau:
- **PUT** là idempotent (thực hiện nhiều lần nhưng kết quả không thay đổi). PUT thay thế hoàn toàn tài nguyên tại URI đã cho. Dùng PUT khi client biết chính xác URI của tài nguyên cần cập nhật.
- **POST** không idempotent. Mỗi lần gọi POST có thể tạo ra kết quả khác nhau. POST thường được dùng để tạo mới tài nguyên khi client không biết URI sẽ gán cho tài nguyên mới.

Ví dụ:
- PUT /users/123 - Cập nhật thông tin user 123 (thay thế hoàn toàn)
- POST /users - Tạo user mới, server sẽ sinh ID

### Khi nào nên sử dụng PATCH thay vì PUT?
- **PATCH** dùng để cập nhật một phần tài nguyên. Nó gửi những thay đổi cần áp dụng, không phải toàn bộ tài nguyên.
- **PUT** dùng để thay thế hoàn toàn tài nguyên.

Ví dụ với user có thông tin {name: "John", email: "john@example.com", age: 30}:
- PUT gửi toàn bộ dữ liệu: {name: "John", email: "new@example.com", age: 30}
- PATCH chỉ gửi phần thay đổi: {email: "new@example.com"}

PATCH là lựa chọn tốt hơn khi bạn chỉ muốn cập nhật một phần nhỏ của tài nguyên lớn, giúp tiết kiệm băng thông.

### HTTP Status Code 401 và 403 khác nhau thế nào?
Cả hai đều liên quan đến quyền truy cập, nhưng có ý nghĩa khác nhau:
- **401 Unauthorized**: Client chưa được xác thực. Server nói "Tôi không biết bạn là ai, hãy cung cấp thông tin xác thực hợp lệ" (thực tế nên gọi là "Unauthenticated").
- **403 Forbidden**: Client đã được xác thực nhưng không có quyền truy cập tài nguyên. Server nói "Tôi biết bạn là ai, nhưng bạn không có quyền làm điều này".

Ví dụ:
- 401: Bạn chưa đăng nhập vào hệ thống
- 403: Bạn đã đăng nhập nhưng không phải là admin để xem trang quản trị

### API versioning là gì và tại sao nó quan trọng?
API versioning là việc đánh version cho API để có thể triển khai các thay đổi không tương thích ngược mà không làm hỏng các ứng dụng client đang sử dụng phiên bản cũ. Có nhiều cách đánh version:

1. **URI Path Versioning**: `/api/v1/users`, `/api/v2/users`
2. **Query Parameter**: `/api/users?version=1`
3. **Header Versioning**: Sử dụng custom header `Api-Version: 1`
4. **Accept Header**: `Accept: application/vnd.myapi.v1+json`

API versioning quan trọng vì:
- Cho phép cải tiến API mà không làm hỏng các ứng dụng đang chạy
- Cho phép các client nâng cấp theo tốc độ riêng
- Giúp quản lý sự phát triển của API theo thời gian

### JWT (JSON Web Token) là gì và khi nào nên dùng?
JWT là một chuẩn mở (RFC 7519) định nghĩa cách truyền thông tin an toàn giữa các bên dưới dạng đối tượng JSON. Nó bao gồm 3 phần:
- Header: Xác định loại token và thuật toán mã hóa
- Payload: Chứa các claims (thông tin)
- Signature: Để xác minh token không bị thay đổi

JWT nên được sử dụng khi:
- **Xác thực**: Sau khi đăng nhập, mỗi request sẽ kèm JWT
- **Trao đổi thông tin**: Truyền dữ liệu an toàn giữa các bên
- **Authorization**: Định nghĩa quyền của user
- **Stateless sessions**: Không cần lưu session trên server

Ví dụ JWT: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

### CORS là gì và tại sao nó quan trọng với RESTful API?
CORS (Cross-Origin Resource Sharing) là một cơ chế bảo mật của trình duyệt giới hạn các request HTTP từ một origin (nguồn gốc) đến một origin khác. Origin được định nghĩa bởi scheme (http, https), host và port.

CORS quan trọng với RESTful API vì:
- API thường được truy cập từ nhiều domain khác nhau
- Không có CORS, trình duyệt sẽ chặn các request cross-origin vì lý do bảo mật
- CORS cho phép server định nghĩa domain nào có thể truy cập API

Để cấu hình CORS, server thêm header:
```
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Làm thế nào để bảo mật RESTful API?
RESTful API có thể được bảo mật bằng nhiều cách:

1. **HTTPS**: Luôn sử dụng HTTPS thay vì HTTP để mã hóa dữ liệu truyền tải
2. **Xác thực và Phân quyền**:
   - API Keys
   - JWT (JSON Web Tokens)
   - OAuth 2.0
   - Basic Auth (chỉ với HTTPS)
3. **Validation dữ liệu đầu vào**: Kiểm tra và làm sạch dữ liệu để ngăn chặn SQL Injection, XSS
4. **Rate Limiting**: Giới hạn số request trong một khoảng thời gian
5. **Kiểm soát phiên bản API**: Phát hiện sớm các vấn đề
6. **CORS**: Cấu hình đúng CORS header
7. **Không để lộ thông tin nhạy cảm**: Lọc dữ liệu trước khi trả về client
8. **Logging và Monitoring**: Theo dõi và phát hiện hoạt động bất thường

### Cách xử lý phân trang (pagination) trong RESTful API?
Có nhiều cách xử lý phân trang:

1. **Offset-based pagination**:
   ```
   GET /users?offset=20&limit=10
   ```
   Trả về 10 user, bắt đầu từ vị trí thứ 20.

2. **Page-based pagination**:
   ```
   GET /users?page=3&per_page=10
   ```
   Trả về trang thứ 3, mỗi trang 10 user.

3. **Cursor-based pagination**:
   ```
   GET /users?after=user123&limit=10
   ```
   Trả về 10 user sau user có ID "user123".

4. **Hypermedia/HATEOAS links**:
   ```json
   {
     "data": [...],
     "_links": {
       "self": "/users?page=3",
       "next": "/users?page=4",
       "prev": "/users?page=2",
       "first": "/users?page=1",
       "last": "/users?page=10"
     }
   }
   ```

Cursor-based pagination thường được khuyến nghị cho dữ liệu lớn vì hiệu suất tốt hơn và tránh vấn đề với dữ liệu thay đổi.