# Rust

Rust là một ngôn ngữ lập trình hệ thống hiệu năng cao với trọng tâm vào an toàn bộ nhớ mà không cần garbage collector. Rust được tạo ra nhằm giải quyết các vấn đề mà C/C++ gặp phải, đặc biệt là các lỗi liên quan đến quản lý bộ nhớ.

## Đặc điểm của Rust

- **An toàn bộ nhớ**: Hệ thống ownership và borrow checker ngăn chặn lỗi liên quan đến bộ nhớ tại thời điểm biên dịch
- **Không có Null và Exception**: Sử dụng Option và Result type để xử lý giá trị vắng mặt và lỗi
- **Đồng thời (Concurrency) an toàn**: Ngăn chặn race condition tại thời điểm biên dịch
- **Trừu tượng hóa không làm giảm hiệu suất**: "Zero-cost abstractions"
- **Hệ sinh thái package quản lý bởi Cargo**: Dễ dàng quản lý dependencies
- **Đa nền tảng**: Biên dịch cho nhiều nền tảng khác nhau

## Tại sao học Rust trong hệ sinh thái AkiNet?

Rust là nền tảng backend chính của [Tauri Framework](/tauri/introduction), được sử dụng để xây dựng các ứng dụng desktop và mobile trong hệ sinh thái AkiNet. Học Rust sẽ giúp bạn:

1. Hiểu và tùy biến phần backend của ứng dụng Tauri
2. Phát triển các plugin Tauri tùy chỉnh
3. Tối ưu hóa hiệu suất cho các ứng dụng desktop/mobile

## Bắt đầu với Rust

### Cài đặt Rust

```bash
# Cài đặt Rust thông qua Rustup (trình quản lý phiên bản Rust)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Trên Windows, bạn có thể tải trình cài đặt từ [trang chủ Rust](https://www.rust-lang.org/tools/install).

### Hello World trong Rust

Tạo file `hello.rs`:

```rust
fn main() {
    println!("Xin chào từ Rust!");
}
```

Biên dịch và chạy:

```bash
rustc hello.rs
./hello  # trên Unix/Linux/macOS
hello.exe  # trên Windows
```

### Sử dụng Cargo (trình quản lý package của Rust)

```bash
# Tạo dự án mới
cargo new hello_cargo
cd hello_cargo

# Biên dịch
cargo build

# Biên dịch và chạy
cargo run

# Kiểm tra mã mà không tạo file thực thi
cargo check
```

## Các khái niệm cơ bản trong Rust

### Ownership (Quyền sở hữu)

```rust
fn main() {
    let s1 = String::from("hello"); // s1 là chủ sở hữu của chuỗi này
    let s2 = s1;                    // quyền sở hữu được chuyển từ s1 sang s2
    
    // println!("{}", s1);          // Lỗi! s1 không còn hợp lệ nữa
    println!("{}", s2);             // OK
}
```

### Borrowing (Mượn)

```rust
fn main() {
    let s1 = String::from("hello");
    
    // Mượn tham chiếu không thay đổi
    let len = calculate_length(&s1);
    println!("Độ dài của '{}' là {}.", s1, len); // s1 vẫn hợp lệ
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

### Mutable References (Tham chiếu có thể thay đổi)

```rust
fn main() {
    let mut s = String::from("hello");
    
    change(&mut s);
    println!("{}", s); // In ra "hello, world"
}

fn change(s: &mut String) {
    s.push_str(", world");
}
```

### Struct và Enum

```rust
// Struct
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

// Enum
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

## Rust trong Tauri

Tauri sử dụng Rust làm backend của ứng dụng, cung cấp hiệu suất cao và kích thước ứng dụng nhỏ. Dưới đây là ví dụ đơn giản về mã Rust trong dự án Tauri:

```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Xin chào, {}! Đây là lời chào từ Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

## Các dự án AkiNet sử dụng Rust

- **VST Shop**: Ứng dụng quản lý VST với backend bằng Rust (thông qua Tauri)
- **AkiWorkflow v2**: Phiên bản mới của AkiWorkflow sử dụng Tauri với backend Rust

## Kết luận

Rust là một ngôn ngữ lập trình mạnh mẽ và hiện đại, đặc biệt phù hợp cho các ứng dụng yêu cầu hiệu suất cao và an toàn. Trong hệ sinh thái AkiNet, Rust được sử dụng chủ yếu thông qua Tauri để xây dựng các ứng dụng desktop và mobile hiệu năng cao.

## Tài nguyên học tập

- [Trang chủ Rust](https://www.rust-lang.org/)
- [The Rust Programming Language (sách)](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings](https://github.com/rust-lang/rustlings/) - Các bài tập nhỏ để học Rust
