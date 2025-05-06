# Hỏi đáp về Firebase Advanced

### Firebase Cloud Functions là gì và sử dụng trong trường hợp nào?
Cloud Functions cho Firebase là một framework serverless cho phép bạn chạy code backend để phản hồi các sự kiện Firebase. Bạn nên sử dụng Cloud Functions khi:
- Cần xử lý logic nghiệp vụ phức tạp mà không muốn triển khai server
- Muốn tự động hóa các tác vụ khi có sự kiện xảy ra (như người dùng đăng ký mới)
- Tích hợp hệ thống Firebase với các dịch vụ bên thứ ba
- Thực hiện các tác vụ nặng không phù hợp để chạy trên client

### Firebase Security Rules có thay thế được backend không?
Không hoàn toàn. Firebase Security Rules rất mạnh mẽ cho việc xác thực và bảo mật, nhưng có những giới hạn:
- Chỉ tập trung vào bảo mật dữ liệu, không xử lý logic nghiệp vụ phức tạp
- Không thể thực hiện các tác vụ như gửi email, xử lý thanh toán
- Không thay thế được các API endpoint phức tạp
- Tối ưu cho quyền truy cập, không phải xử lý dữ liệu

Nên kết hợp Security Rules với Cloud Functions để có giải pháp backend hoàn chỉnh.

### Cách tối ưu hóa Cloud Functions để tiết kiệm chi phí?
- Cold starts: Viết hàm nhỏ gọn, tránh import thư viện lớn không cần thiết
- Memory allocation: Chỉ cấp phát đủ bộ nhớ cần thiết (128MB, 256MB...)
- Tránh vòng lặp vô hạn hoặc callbacks xử lý không đúng
- Sử dụng batching thay vì gọi nhiều hàm riêng lẻ
- Sử dụng caching để giảm số lần đọc dữ liệu
- Tối ưu hóa truy vấn Firestore/Database trong functions
- Sử dụng các region gần người dùng nhất

### Firebase Authentication có hỗ trợ nhiều cấp độ người dùng (roles) không?
Firebase Authentication mặc định không có hệ thống vai trò (roles), nhưng bạn có thể triển khai bằng một trong các cách sau:
- Sử dụng Custom Claims để lưu thông tin vai trò trong JWT token
- Lưu thông tin vai trò trong Firestore hoặc Realtime Database
- Sử dụng Security Rules để kiểm tra vai trò và quyền truy cập
- Kết hợp Cloud Functions để quản lý và xác thực vai trò

### Làm thế nào để sao lưu dữ liệu Firestore?
- Sử dụng tính năng Export của GCP (mỗi ngày một lần là miễn phí)
- Viết Cloud Function định kỳ export dữ liệu sang Cloud Storage
- Sử dụng các công cụ bên thứ ba như Firestore Backup & Restore
- Với dữ liệu quan trọng, nên thiết lập schedule export hàng ngày

### Firestore có hỗ trợ transaction và batch operations không?
Có, Firestore hỗ trợ cả hai:
- Transactions: Đảm bảo một chuỗi đọc/ghi hoàn thành hoặc thất bại hoàn toàn
- Batch operations: Gom nhiều thao tác ghi vào một request để tối ưu hiệu suất

Cả hai đều giúp duy trì tính nhất quán của dữ liệu khi thực hiện nhiều thao tác liên quan.

### Firebase Hosting có phù hợp cho ứng dụng Vue.js không?
Hoàn toàn phù hợp! Firebase Hosting cung cấp:
- CDN toàn cầu với SSL tự động
- Deploy nhanh chóng với Firebase CLI
- Tích hợp tốt với các ứng dụng Vue.js (cả SSR và SPA)
- Hỗ trợ cloud functions để tạo API động hoặc SSR
- Cache tự động và tối ưu hóa tài nguyên tĩnh

### Có thể sử dụng Firebase với Electron.js không?
Có thể! Firebase hoạt động tốt trong ứng dụng Electron:
- Authentication, Firestore, RTDB đều hoạt động trong Electron
- Cần cẩn thận với API keys vì ứng dụng Electron chạy trên máy người dùng
- Sử dụng Security Rules nghiêm ngặt hơn
- Xem xét lưu cache dữ liệu cục bộ để hỗ trợ chế độ offline

### Làm thế nào để triển khai một hệ thống phân quyền người dùng phức tạp?
- Sử dụng Firebase Authentication làm nền tảng xác thực
- Lưu trữ vai trò người dùng trong Custom Claims của Auth hoặc trong Firestore
- Thiết kế cấu trúc dữ liệu theo phân cấp quyền hạn
- Viết Security Rules chi tiết dựa trên vai trò
- Sử dụng Cloud Functions để quản lý và cập nhật quyền
- Triển khai middleware trên client để kiểm tra quyền trước khi hiển thị UI
