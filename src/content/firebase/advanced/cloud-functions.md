# Cloud Functions trong Firebase

Cloud Functions cho Firebase là một framework không cần máy chủ (serverless) giúp bạn tự động chạy code backend để phản hồi các sự kiện được tạo ra bởi các tính năng và dịch vụ của Firebase. Code của bạn được lưu trữ trong Google Cloud và chạy trong môi trường được quản lý. Bạn không cần quản lý hay mở rộng quy mô máy chủ của riêng mình.

## Lợi ích của Cloud Functions

1. **Tự động hóa workflow**: Tạo quy trình làm việc giữa các dịch vụ khác nhau.
2. **Tích hợp với dịch vụ Google Cloud**: Tích hợp dễ dàng với các dịch vụ khác của Google.
3. **Không cần quản lý server**: Firebase xử lý toàn bộ cơ sở hạ tầng cho bạn.
4. **Mở rộng tự động**: Tự động mở rộng khi cần thiết mà không cần cấu hình phức tạp.

## Sử dụng Cloud Functions

### Cài đặt Firebase CLI

```bash
npm install -g firebase-tools
```

### Đăng nhập vào Firebase

```bash
firebase login
```

### Khởi tạo dự án với Cloud Functions

```bash
firebase init functions
```

### Ví dụ Cloud Function cơ bản

```javascript
const functions = require('firebase-functions');

// Chạy khi có document mới được tạo trong collection 'users'
exports.welcomeNewUser = functions.firestore
  .document('users/{userId}')
  .onCreate((snap, context) => {
    const userData = snap.data();
    const userId = context.params.userId;
    
    console.log(`Người dùng mới ${userData.name} (ID: ${userId}) đã đăng ký!`);
    
    // Ở đây bạn có thể gửi email chào mừng, tạo thông báo, cập nhật dữ liệu khác...
    return null;
  });
```

### Triển khai Cloud Functions

```bash
firebase deploy --only functions
```

## Loại Cloud Functions phổ biến

1. **HTTP Functions**: Xử lý các yêu cầu HTTP, tạo webhook, API, v.v.
2. **Cloud Firestore Functions**: Phản hồi khi dữ liệu Firestore thay đổi.
3. **Realtime Database Functions**: Phản hồi khi dữ liệu Realtime Database thay đổi.
4. **Authentication Functions**: Xử lý sự kiện đăng ký người dùng, đăng xuất, v.v.
5. **Cloud Storage Functions**: Phản hồi khi tệp được tải lên/xóa.
6. **Analytics Functions**: Phản hồi các sự kiện Analytics.
7. **Pub/Sub Functions**: Xử lý các thông báo Pub/Sub.

## Lưu ý quan trọng

- Cloud Functions không miễn phí hoàn toàn trong gói Spark (miễn phí) của Firebase.
- Có giới hạn về thời gian chạy và tài nguyên trên các gói khác nhau.
- Mỗi lần triển khai, Firebase sẽ tạo phiên bản mới của functions.
- Nên xử lý lỗi cẩn thận để tránh các hàm chạy liên tục trong trường hợp lỗi.

## Tài nguyên nâng cao

- [Tài liệu chính thức Firebase Functions](https://firebase.google.com/docs/functions)
- [Mẫu Cloud Functions](https://github.com/firebase/functions-samples)
- [Hướng dẫn gỡ lỗi](https://firebase.google.com/docs/functions/local-emulator)
