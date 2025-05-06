# TypeScript Types & Interfaces

Types (kiểu dữ liệu) và Interfaces là hai tính năng cốt lõi của TypeScript giúp định nghĩa cấu trúc của dữ liệu. Chúng giúp bắt lỗi sớm khi code và cải thiện chất lượng code.

## Kiểu dữ liệu cơ bản (Basic Types)

TypeScript hỗ trợ nhiều kiểu dữ liệu cơ bản:

### Boolean

```typescript
let isDone: boolean = false;
```

### Number

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

### String

```typescript
let color: string = "blue";
let fullName: string = `Bob Smith`;
let sentence: string = `Hello, my name is ${fullName}`;
```

### Array

```typescript
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3]; // Generic array type
```

### Tuple

```typescript
let x: [string, number];
x = ["hello", 10]; // OK
x = [10, "hello"]; // Error
```

### Enum

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green; // 1

// Có thể gán giá trị cho enum
enum Status {
  Active = 1,
  Inactive = 2,
  Pending = 3
}
```

### Any

```typescript
let notSure: any = 4;
notSure = "maybe a string";
notSure = false; // Cũng OK
```

### Void

```typescript
function warnUser(): void {
  console.log("This is a warning message");
}
```

### Null and Undefined

```typescript
let u: undefined = undefined;
let n: null = null;
```

### Never

```typescript
// Function throwing an error
function error(message: string): never {
  throw new Error(message);
}

// Function with infinite loop
function infiniteLoop(): never {
  while (true) {}
}
```

### Object

```typescript
let obj: object = {};
```

## Type Assertions (Khẳng định kiểu)

Type assertions giúp bạn nói với compiler rằng bạn biết rõ kiểu dữ liệu của biến:

```typescript
// Cách 1: angle-bracket syntax
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// Cách 2: as syntax (thường dùng với JSX)
let strLength2: number = (someValue as string).length;
```

## Interfaces

Interfaces định nghĩa "hình dáng" của một object, chỉ ra các thuộc tính và phương thức nào mà một object cần có.

### Interface cơ bản

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

function greet(person: Person) {
  return `Hello, ${person.firstName} ${person.lastName}`;
}

const user = { firstName: "John", lastName: "Doe", age: 30 };
console.log(greet(user)); // Output: Hello, John Doe
```

### Optional Properties (Thuộc tính tùy chọn)

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  const newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}
```

### Readonly Properties (Thuộc tính chỉ đọc)

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // Error: Cannot assign to 'x' because it is a read-only property
```

### Function Types

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(src, sub) {
  return src.search(sub) > -1;
};
```

### Indexable Types

```typescript
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0]; // "Bob"
```

### Class Types

```typescript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}
```

### Extending Interfaces (Kế thừa Interface)

```typescript
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
```

## Type Aliases

Type aliases tạo tên mới cho một kiểu dữ liệu:

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}
```

## Union và Intersection Types

### Union Types (Kiểu hợp)

```typescript
// Biến có thể nhận một trong các kiểu được liệt kê
function padLeft(value: string, padding: string | number) {
  // ...
}
```

### Intersection Types (Kiểu giao)

```typescript
// Kết hợp nhiều types lại với nhau
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

type ArtworksResponse = ArtworksData & ErrorHandling;
```

## Generic Types

Generic types cho phép bạn tạo các components/functions có thể làm việc với nhiều kiểu dữ liệu khác nhau:

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Gọi với kiểu dữ liệu tường minh
let output = identity<string>("myString");

// Hoặc để compiler tự suy luận kiểu
let output2 = identity("myString");
```

## Kết luận

TypeScript Types và Interfaces là những công cụ mạnh mẽ giúp nâng cao sự rõ ràng và an toàn cho code JavaScript. Việc hiểu và áp dụng chúng đúng cách sẽ giúp ứng dụng của bạn ổn định và dễ bảo trì hơn.