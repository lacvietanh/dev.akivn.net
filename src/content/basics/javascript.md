# JavaScript Cơ bản

## 1. Giới thiệu JavaScript
JavaScript là ngôn ngữ lập trình chạy trên trình duyệt (client) và Node.js (server). Nó cho phép tạo tương tác và logic động cho trang web.

## 2. Biến và Kiểu dữ liệu

```javascript
// Khai báo biến
let name = 'Akinet'
const PI = 3.14159

// Các kiểu dữ liệu cơ bản
let str = 'Hello'
let num = 42
let bool = true
let arr = [1, 2, 3]
let obj = { x: 1, y: 2 }
``` 

## 3. Câu lệnh điều kiện

```javascript
if (num > 10) {
  console.log('Số lớn hơn 10')
} else {
  console.log('Số nhỏ hơn hoặc bằng 10')
}
``` 

## 4. Vòng lặp

```javascript
// for
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

// for...of
for (const item of arr) {
  console.log(item)
}

// while
let count = 0
while (count < 3) {
  console.log(count)
  count++
}
``` 

## 5. Hàm

```javascript
// Hàm thông thườngunction sum(a, b) {
  return a + b
}

// Hàm mũi tên
a const multiply = (a, b) => a * b
``` 

## 6. DOM cơ bản

```javascript
document.getElementById('app').textContent = 'Xin chào JavaScript!'
``` 

## 7. Promise và Async/Await

```javascript
function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => resolve('Dữ liệu từ server'), 1000)
  })
}

async function main() {
  const data = await fetchData()
  console.log(data)
}

main()
```

---
Hiểu rõ JavaScript cơ bản, sẵn sàng cho framework và thư viện nâng cao.
