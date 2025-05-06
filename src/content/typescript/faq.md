# Hỏi đáp về TypeScript

### TypeScript là gì và tại sao nên sử dụng nó?
TypeScript là một superset của JavaScript, nghĩa là nó mở rộng JavaScript bằng cách thêm kiểu dữ liệu tĩnh. Bạn nên sử dụng TypeScript vì:
- Phát hiện lỗi sớm trong quá trình phát triển
- Cải thiện trải nghiệm phát triển với IntelliSense và autocompletion
- Dễ bảo trì các dự án lớn 
- Giúp tài liệu hóa code tốt hơn
- Giảm bug trong production

### TypeScript và JavaScript khác nhau như thế nào?
Sự khác biệt chính giữa TypeScript và JavaScript:
- TypeScript thêm kiểu dữ liệu tĩnh, JavaScript chỉ có kiểu động
- TypeScript code cần được biên dịch (transpile) thành JavaScript
- TypeScript hỗ trợ interface, generic, decorators, access modifiers
- TypeScript giúp phát hiện lỗi trong quá trình biên dịch, không phải lúc chạy

### TypeScript có thay thế hoàn toàn JavaScript không?
Không, TypeScript không thay thế JavaScript. TypeScript là một superset của JavaScript, và cuối cùng vẫn biên dịch ra JavaScript để chạy. Bạn vẫn cần hiểu JavaScript để viết TypeScript hiệu quả. TypeScript chỉ thêm các tính năng và không thay đổi cách JavaScript hoạt động cơ bản.

### Nên sử dụng `type` hay `interface` trong TypeScript?
Không có câu trả lời duy nhất. Nói chung:
- Dùng `interface` khi bạn cần tính năng mở rộng (extension) hoặc cần khai báo hình dạng (shape) của đối tượng
- Dùng `type` khi bạn cần union types, mapped types, hoặc utility types phức tạp
- Nếu bạn không chắc chắn, hãy bắt đầu với `interface` và chuyển sang `type` khi cần tính năng đặc biệt

Ví dụ với `interface`:
```typescript
interface User {
  name: string;
  age: number;
}

interface Admin extends User {
  permissions: string[];
}
```

Ví dụ với `type`:
```typescript
type User = {
  name: string;
  age: number;
}

type UserOrAdmin = User | { permissions: string[] };
```

### Làm cách nào để sử dụng TypeScript với React?
Để sử dụng TypeScript với React:
1. Tạo dự án mới với template TypeScript:
   ```bash
   npx create-react-app my-app --template typescript
   ```
2. Hoặc thêm TypeScript vào dự án React hiện có:
   ```bash
   npm install --save typescript @types/node @types/react @types/react-dom @types/jest
   ```
3. Đổi file `.js` thành `.tsx` (cho component) hoặc `.ts` (cho logic không chứa JSX)
4. Thêm kiểu cho Props và State:
   ```typescript
   interface Props {
     name: string;
     age?: number;
   }
   
   const MyComponent: React.FC<Props> = ({ name, age = 0 }) => {
     return <div>Hello, {name}. You are {age} years old.</div>;
   };
   ```

### Làm cách nào để sử dụng TypeScript với Vue.js?
Để sử dụng TypeScript với Vue.js:
1. Tạo dự án Vue với TypeScript:
   ```bash
   npm init vue@latest
   # Chọn Yes khi được hỏi về TypeScript
   ```
2. Trong Vue 3 với Composition API, sử dụng `defineProps` với generics:
   ```typescript
   <script setup lang="ts">
   import { ref } from 'vue'
   
   interface Props {
     message: string
     count?: number
   }
   
   const props = defineProps<Props>()
   const count = ref(props.count || 0)
   </script>
   ```
3. Hoặc với Options API:
   ```typescript
   <script lang="ts">
   import { defineComponent } from 'vue'
   
   export default defineComponent({
     props: {
       message: {
         type: String,
         required: true
       },
       count: Number
     },
     data() {
       return {
         localCount: this.count || 0
       }
     }
   })
   </script>
   ```

### Cách kiểm tra kiểu null và undefined trong TypeScript?
TypeScript có nhiều cách kiểm tra null và undefined:
1. Sử dụng strict null checking:
   ```typescript
   // Bật trong tsconfig.json: "strictNullChecks": true
   
   function print(text: string | null) {
     // TypeScript yêu cầu kiểm tra trước khi sử dụng
     if (text !== null) {
       console.log(text.toUpperCase());
     }
   }
   ```
2. Non-null assertion operator:
   ```typescript
   function print(text: string | null) {
     console.log(text!.toUpperCase()); // Dùng "!" để nói với TypeScript rằng biến không null
   }
   ```
3. Optional chaining:
   ```typescript
   const value = obj?.prop?.nestedProp;
   ```
4. Nullish coalescing:
   ```typescript
   const value = obj ?? defaultValue;
   ```

### Làm thế nào để cài đặt các typings cho thư viện bên thứ ba?
Nhiều thư viện JavaScript cần thêm type definitions để hoạt động tốt với TypeScript:
1. Cài đặt từ DefinitelyTyped:
   ```bash
   npm install --save-dev @types/library-name
   ```
2. Ví dụ: React và Node.js
   ```bash
   npm install --save-dev @types/react @types/node
   ```
3. Nếu không có typings sẵn, tạo file declarations:
   ```typescript
   // trong file my-module.d.ts
   declare module 'some-external-library' {
     export function doSomething(value: string): number;
     // Khai báo export khác từ thư viện
   }
   ```

### Cách xử lý các trường hợp kiểu động (dynamic typing) trong TypeScript?
Khi TypeScript không thể suy luận kiểu chính xác:
1. Type assertions:
   ```typescript
   const element = document.getElementById('my-element') as HTMLInputElement;
   ```
2. Type guards:
   ```typescript
   function isString(value: any): value is string {
     return typeof value === 'string';
   }
   
   if (isString(data)) {
     // data được xử lý như string trong block này
   }
   ```
3. Type any (sử dụng cẩn thận):
   ```typescript
   let userData: any = JSON.parse(data);
   ```
4. Generic functions:
   ```typescript
   function process<T>(input: T): T {
     return input;
   }
   ```