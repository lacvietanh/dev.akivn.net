# RESTful API Cơ bản

REST (Representational State Transfer) là một kiểu kiến trúc phần mềm định nghĩa một tập hợp các ràng buộc để xây dựng các dịch vụ web. RESTful API là API tuân thủ các ràng buộc và quy ước REST.

## Nguyên tắc của REST

1. **Kiến trúc Client-Server**: Tách biệt giao diện người dùng (client) và lưu trữ dữ liệu (server).
2. **Stateless**: Mỗi yêu cầu từ client đến server phải chứa tất cả thông tin cần thiết để hiểu yêu cầu, và không sử dụng context lưu trữ trên server.
3. **Cacheable**: Các phản hồi phải xác định rõ có thể lưu vào bộ nhớ đệm (cache) hay không.
4. **Uniform Interface**: Giao diện thống nhất giữa các thành phần để thông tin được truyền đi theo chuẩn.
5. **Layered System**: Client không thể biết liệu nó đang kết nối trực tiếp với server hay thông qua bất kỳ trung gian nào.
6. **Code on Demand** (tùy chọn): Server có thể tạm thời mở rộng chức năng client bằng cách truyền mã thực thi (ví dụ: JavaScript).

## Tài nguyên và URI

Trong REST, mọi thứ đều là tài nguyên (resource), và mỗi tài nguyên được định danh bởi URI (Uniform Resource Identifier).

### Thiết kế URI tốt

```
# Collection
/users

# Specific resource
/users/123

# Sub-collection
/users/123/orders

# Specific item in a sub-collection
/users/123/orders/456
```

### Quy ước đặt tên URI

- Sử dụng danh từ số nhiều cho collection: `/users` thay vì `/user`
- Sử dụng chữ thường và dấu gạch ngang cho URI nhiều từ: `/user-profiles`
- Không sử dụng đuôi file: `/users` thay vì `/users.json`
- Không đặt động từ trong URI: `/search?q=term` thay vì `/searchTerm`

## Phương thức HTTP trong RESTful API

REST sử dụng các phương thức HTTP để xác định hành động trên tài nguyên:

### GET
Truy xuất tài nguyên. Không thay đổi trạng thái của tài nguyên.

```
GET /users - Lấy danh sách users
GET /users/123 - Lấy thông tin chi tiết của user có id là 123
```

### POST
Tạo tài nguyên mới.

```
POST /users - Tạo một user mới
```

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

### PUT
Cập nhật toàn bộ tài nguyên (thay thế).

```
PUT /users/123 - Cập nhật toàn bộ thông tin của user 123
```

Request body:
```json
{
  "name": "John Doe",
  "email": "john.updated@example.com",
  "age": 31
}
```

### PATCH
Cập nhật một phần tài nguyên.

```
PATCH /users/123 - Cập nhật một phần thông tin của user 123
```

Request body:
```json
{
  "email": "john.new@example.com"
}
```

### DELETE
Xóa tài nguyên.

```
DELETE /users/123 - Xóa user có id là 123
```

## Định dạng dữ liệu

RESTful API thường sử dụng JSON (JavaScript Object Notation) làm định dạng dữ liệu chính, mặc dù XML, HTML, hoặc các định dạng khác cũng có thể sử dụng.

### Ví dụ JSON

```json
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2023-01-15T14:30:00Z",
  "roles": ["user", "admin"],
  "settings": {
    "notifications": true,
    "theme": "dark"
  }
}
```

## HTTP Status Codes

RESTful API sử dụng HTTP Status Codes để chỉ ra kết quả của request:

- **200 OK**: Request thành công.
- **201 Created**: Tài nguyên đã được tạo thành công.
- **204 No Content**: Request thành công nhưng không có dữ liệu trả về.
- **400 Bad Request**: Request không hợp lệ.
- **401 Unauthorized**: Xác thực thất bại.
- **403 Forbidden**: Client không có quyền truy cập tài nguyên.
- **404 Not Found**: Tài nguyên không tồn tại.
- **405 Method Not Allowed**: HTTP method không được phép với tài nguyên này.
- **500 Internal Server Error**: Lỗi server.

## Phân trang (Pagination)

Để xử lý tập dữ liệu lớn, API nên hỗ trợ phân trang:

```
GET /users?page=2&limit=10
```

Response:
```json
{
  "data": [/* array of user objects */],
  "pagination": {
    "total": 45,
    "limit": 10,
    "current_page": 2,
    "total_pages": 5,
    "next_page": "/users?page=3&limit=10",
    "prev_page": "/users?page=1&limit=10"
  }
}
```

## Lọc (Filtering)

Cho phép client lọc dữ liệu:

```
GET /users?status=active&role=admin
```

## Sắp xếp (Sorting)

Để chỉ định thứ tự sắp xếp:

```
GET /users?sort=name_asc,created_at_desc
```

## API Versioning

Để tránh phá vỡ tương thích ngược, API thường được đánh version:

```
/api/v1/users
/api/v2/users
```

Hoặc qua HTTP header:
```
Accept: application/vnd.myapi.v2+json
```

## Xác thực và Ủy quyền

### Xác thực (Authentication)

Phương pháp phổ biến:
- **API Keys**: `GET /users?api_key=abcd1234`
- **OAuth 2.0**: Sử dụng Authorization header `Authorization: Bearer <token>`
- **JWT (JSON Web Tokens)**: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI...`

### Ủy quyền (Authorization)

Quyết định client có thể làm gì với tài nguyên, thường dựa trên vai trò hoặc quyền:
- **Role-based Access Control (RBAC)**: Admin, User, Guest
- **Attribute-based Access Control (ABAC)**: Phân quyền dựa trên thuộc tính user và context

## Xử lý lỗi

RESTful API nên trả về thông báo lỗi rõ ràng:

```json
{
  "error": {
    "code": "INVALID_EMAIL",
    "message": "Email address is not valid",
    "details": "The provided string 'example' is not a valid email format",
    "status": 400
  }
}
```

## Tài liệu hóa API

Một RESTful API tốt nên có tài liệu đầy đủ, mô tả:
- Các endpoint có sẵn
- Phương thức HTTP được hỗ trợ cho mỗi endpoint
- Định dạng của request và response
- Mã trạng thái và xử lý lỗi
- Các tham số query
- Các header yêu cầu

Công cụ phổ biến: Swagger/OpenAPI, API Blueprint, RAML.

## Kết luận

RESTful API là một cách tiếp cận mạnh mẽ và linh hoạt để xây dựng các dịch vụ web có khả năng mở rộng. Tuân thủ các nguyên tắc REST sẽ giúp bạn tạo ra API dễ sử dụng, dễ hiểu và dễ mở rộng.