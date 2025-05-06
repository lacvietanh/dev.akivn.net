# Security Rules trong Firebase

Firebase Security Rules là một ngôn ngữ quy tắc linh hoạt giúp bạn có thể bảo vệ dữ liệu trong Firestore, Realtime Database và Cloud Storage. Chúng cho phép bạn kiểm soát ai có quyền truy cập vào dữ liệu của bạn và họ có thể làm gì với dữ liệu đó.

## Lợi ích của Security Rules

1. **Bảo mật phía client**: Bảo vệ dữ liệu trực tiếp ở client mà không cần máy chủ trung gian.
2. **Linh hoạt**: Cho phép kiểm soát chi tiết đến từng document/location.
3. **Hiệu quả**: Có thể mở rộng quy mô theo nhu cầu của ứng dụng.
4. **Bảo mật tốt**: Được thiết kế để đảm bảo dữ liệu của bạn được bảo vệ khỏi các truy cập trái phép.

## Security Rules cho Firestore

### Cấu trúc cơ bản

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Rules go here
  }
}
```

### Quy tắc cơ bản

#### Cho phép đọc/ghi cho tất cả người dùng đã xác thực

```
match /users/{userId} {
  allow read, write: if request.auth != null;
}
```

#### Chỉ cho phép người dùng truy cập dữ liệu của chính họ

```
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}
```

#### Kiểm tra giá trị dữ liệu

```
match /posts/{postId} {
  allow create: if request.resource.data.content.size() <= 1000 &&
                  request.resource.data.userId == request.auth.uid;
}
```

## Security Rules cho Realtime Database

### Cấu trúc cơ bản

```json
{
  "rules": {
    // Rules go here
  }
}
```

### Quy tắc cơ bản

#### Bảo vệ dữ liệu người dùng

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

#### Quy tắc cho dữ liệu công khai

```json
{
  "rules": {
    "publicPosts": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

## Security Rules cho Cloud Storage

### Cấu trúc cơ bản

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Rules go here
  }
}
```

### Quy tắc cơ bản

#### Cho phép người dùng tải lên và xem hình ảnh của họ

```
match /users/{userId}/profilePics/{fileName} {
  allow read;
  allow write: if request.auth.uid == userId &&
                request.resource.size < 5 * 1024 * 1024 &&
                request.resource.contentType.matches('image/.*');
}
```

## Các thực tiễn tốt nhất

1. **Luôn kiểm tra xác thực**: Xác minh người dùng đã đăng nhập khi cần thiết.
2. **Kiểm tra dữ liệu đầu vào**: Xác thực và kiểm tra kiểu dữ liệu, độ dài, v.v.
3. **Sử dụng nguyên tắc "quyền hạn tối thiểu"**: Chỉ cấp quyền truy cập cần thiết.
4. **Kiểm tra xác thực quyền sở hữu**: Xác minh người dùng chỉ có thể sửa đổi dữ liệu của chính họ.
5. **Sử dụng custom claims** nếu cần vai trò quản trị viên hoặc các vai trò đặc biệt khác.
6. **Kiểm tra các quy tắc của bạn**: Sử dụng trình mô phỏng Firebase để đảm bảo chúng hoạt động như mong đợi.

## Mô phỏng và kiểm tra Rules

Firebase cung cấp trình mô phỏng cho phép bạn kiểm tra quy tắc bảo mật của mình:

```javascript
// Kiểm tra quy tắc với Firebase Testing Framework
const firebase = require('@firebase/testing');

const projectId = 'my-test-project';
const app = firebase.initializeTestApp({
  projectId,
  auth: { uid: 'alice', email: 'alice@example.com' }
});

const db = app.firestore();

it('allows users to read their own data', async () => {
  const ref = db.collection('users').doc('alice');
  await firebase.assertSucceeds(ref.get());
});
```

## Tài nguyên hữu ích

- [Tài liệu chính thức Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Cơ bản về mô hình dữ liệu Firestore](https://firebase.google.com/docs/firestore/data-model)
- [Công cụ mô phỏng Rules](https://firebase.google.com/docs/rules/simulator)
- [Mẫu Security Rules phổ biến](https://firebase.google.com/docs/rules/samples)
