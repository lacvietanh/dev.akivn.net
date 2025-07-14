# **Hướng dẫn toàn tập Vite SSG cho Vue 3: Từ SPA đến Siêu Tốc Độ**

Chào mừng các bạn đến với hướng dẫn chi tiết về Vite SSG. Nếu bạn đang phát triển ứng dụng Vue 3 và muốn trang web của mình nhanh như chớp, thân thiện tối đa với SEO và mang lại trải nghiệm người dùng đỉnh cao, thì bạn đã đến đúng nơi.

Trong bài viết này, chúng ta sẽ đi sâu vào vite-ssg (v2), một công cụ tuyệt vời giúp biến ứng dụng Single Page Application (SPA) của bạn thành một trang web tĩnh (Static Site Generation \- SSG) hoặc kết hợp cả SSG và SSR một cách mượt mà.

## **1\. Tại sao phải là SSG? Động lực đằng sau tốc độ**

Bạn đã bao giờ tự hỏi làm thế nào các trang tin tức, blog lớn hay các trang tài liệu lại có thể tải gần như ngay lập tức? Câu trả lời thường nằm ở **Static Site Generation (SSG)**.

Khác với SPA truyền thống (phải tải JavaScript về rồi mới render nội dung), SSG thực hiện quá trình render này ngay tại thời điểm build.

**Lợi ích kỹ thuật:**

* **Tốc độ thờ:**  
  * **TTFB (Time to First Byte)** gần như bằng 0\. Server chỉ cần trả về một file HTML tĩnh đã có sẵn, không cần xử lý gì thêm.  
  * **FCP (First Contentful Paint)** cực nhanh. Người dùng thấy nội dung ngay lập tức, không phải nhìn vào màn hình trắng chờ đợi.  
* **Trải nghiệm người dùng (UX) vượt trội:** Tốc độ nhanh đồng nghĩa với sự hài lòng. Người dùng không phải chờ đợi, giúp tăng tương tác và giữ chân họ ở lại lâu hơn.  
* **SEO "thần sầu":** Googlebot và các công cụ tìm kiếm khác "yêu" HTML tĩnh. Chúng có thể dễ dàng đọc, hiểu và index toàn bộ nội dung trang web của bạn, giúp cải thiện thứ hạng tìm kiếm một cách tự nhiên.

**Lợi ích kinh doanh & marketing:**

* **Tăng Organic Traffic:** Thứ hạng cao hơn trên Google đồng nghĩa với việc có nhiều người dùng truy cập vào trang web của bạn hơn.  
* **Giảm Bounce Rate:** Khi trang web tải nhanh, người dùng ít có khả năng thoát ra ngay lập tức.  
* **Tăng Conversion Rate:** Trải nghiệm mượt mà và nội dung dễ tiếp cận khuyến khích người dùng thực hiện các hành động mong muốn (mua hàng, đăng ký, liên hệ...).

## **2\. Tóm tắt tinh hoa: Flow hoạt động của Vite SSG**

Để không bị "ngợp" bởi các khái niệm, hãy nắm vững 3 bước cốt lõi của Vite SSG:

1. **Prerender (Lúc build):** vite-ssg khởi chạy ứng dụng Vue của bạn trong môi trường Node.js. Nó sẽ "ghé thăm" từng route (đường dẫn) mà bạn đã định nghĩa, thực thi code (ví dụ: fetch data từ API), và render ra các file .html tĩnh tương ứng.  
2. **Serve HTML tĩnh:** Khi người dùng truy cập, web server chỉ đơn giản là gửi file HTML đã được tạo sẵn này. Quá trình này cực kỳ nhanh.  
3. **Hydration (Phía client):** Sau khi trình duyệt tải xong file HTML và JavaScript, Vue.js sẽ "tiếp quản". Quá trình này được gọi là **Hydration**. Vue sẽ "thổi hồn" vào trang HTML tĩnh, gắn các event listener, khôi phục state và biến nó trở lại thành một SPA đầy đủ chức năng mà không cần render lại từ đầu.

**Lưu ý quan trọng về môi trường:**

* import.meta.env.SSR: Một biến toàn cục do Vite cung cấp. Nó sẽ là true khi code đang chạy trong môi trường Node.js (lúc build) và false khi chạy trên trình duyệt của người dùng.  
* isClient: Một biến tiện ích được vite-ssg cung cấp trong callback createApp, giúp bạn dễ dàng kiểm tra môi trường hơn.

## **3\. Thiết lập dự án từ con số 0**

Chúng ta sẽ bắt đầu với một dự án Vue 3 mới tinh và thêm các "gia vị" cần thiết.

### **Cài đặt**

Mở terminal và chạy các lệnh sau:

\# 1\. Tạo dự án Vue 3 mới (chọn "Yes" cho Vue Router)  
npm create vue@latest my-ssg-app

\# 2\. Di chuyển vào thư mục dự án  
cd my-ssg-app

\# 3\. Cài đặt các thư viện cần thiết  
\# vite-ssg: "Trái tim" của SSG  
\# @vueuse/head: Quản lý thẻ \<head\> cho SEO  
\# firebase: Để fetch dữ liệu từ Firestore (ví dụ)  
npm install vite-ssg @vueuse/head firebase

### **Cấu hình package.json**

Mở file package.json và cập nhật phần scripts:

// package.json  
"scripts": {  
  "dev": "vite",  
  "build": "vite-ssg build",  
  "serve": "vite preview"  
},

* npm run dev: Chạy server phát triển như bình thường.  
* npm run build: Đây là lệnh quan trọng nhất. Nó sẽ gọi vite-ssg để thực hiện quá trình prerender và tạo ra các file tĩnh trong thư mục dist.  
* npm run serve: Dùng để xem trước trang web sau khi đã build thành công.

### **Giải thích các tùy chọn CLI của vite-ssg**

Lệnh vite-ssg build có một vài tùy chọn hữu ích:

* \--script \<mode\>: Quyết định cách thẻ \<script\> được chèn vào HTML. Mặc định là async. Bạn có thể đổi thành defer.  
* \--format \<format\>: Định dạng module cho bundle phía server. Mặc định là esm. Có thể đổi thành cjs nếu cần.  
* \--mock: Mock các API của trình duyệt (như localStorage) khi chạy ở môi trường Node.js.  
* \--parallel: Cho phép build các trang song song để tăng tốc độ build với các dự án lớn.

## **4\. Cấu hình Router & main.js**

Đây là bước cấu hình để vite-ssg biết nó cần phải làm gì.

### **src/router/index.js**

File này gần như không thay đổi so với một dự án Vue Router bình thường. Điều quan trọng là bạn phải export mảng routes.

// src/router/index.js  
import { createRouter, createWebHistory } from 'vue-router'  
import Home from '../pages/Home.vue'  
import Posts from '../pages/Posts.vue'  
import PostDetail from '../pages/PostDetail.vue'

// Export mảng routes để vite-ssg có thể sử dụng  
export const routes \= \[  
  {  
    path: '/',  
    name: 'home',  
    component: Home,  
  },  
  {  
    path: '/posts',  
    name: 'posts',  
    component: Posts,  
  },  
  {  
    // Route động, chúng ta sẽ xử lý nó sau  
    path: '/posts/:id',  
    name: 'post-detail',  
    component: PostDetail,  
  },  
\]

// Không cần export router instance  
const router \= createRouter({  
  history: createWebHistory(),  
  routes,  
})

### **src/main.js \- Trái tim của ứng dụng**

Đây là nơi phép màu xảy ra. Thay vì createApp().mount('\#app'), chúng ta sẽ dùng ViteSSG.

// src/main.js  
import { ViteSSG } from 'vite-ssg'  
import { createHead } from '@vueuse/head'  
import App from './App.vue'  
import { routes } from './router' // Import mảng routes

// Import CSS global (nếu có)  
import './assets/main.css'

// Hàm \`createApp\` sẽ được vite-ssg gọi ở cả server và client  
export const createApp \= ViteSSG(  
  // 1\. Component App gốc  
  App,  
  // 2\. Tùy chọn, quan trọng nhất là \`routes\`  
  {  
    routes,  
    base: import.meta.env.BASE\_URL,  
    // Các tùy chọn khác:  
    // script: 'async', // 'async' hoặc 'defer'  
    // format: 'esm',   // 'esm' hoặc 'cjs'  
  },  
  // 3\. Callback để cấu hình thêm cho app  
  ({ app, router, routes, isClient, initialState }) \=\> {  
    // Cài đặt plugin @vueuse/head  
    const head \= createHead()  
    app.use(head)

    // Bạn có thể cài đặt các plugin khác ở đây  
    // Ví dụ: app.use(Pinia)

    // initialState chứa dữ liệu được fetch từ server (sẽ nói rõ ở phần sau)  
    if (isClient) {  
      // Ở phía client, ta có thể khôi phục state từ initialState  
      // Ví dụ: pinia.state.value \= initialState.pinia || {}  
    }  
  }  
)

**Giải thích các tham số của ViteSSG:**

1. App: Component App.vue gốc của bạn.  
2. options:  
   * routes: **Bắt buộc**. vite-ssg cần biết các đường dẫn để prerender.  
   * base: Đường dẫn gốc của ứng dụng, thường lấy từ import.meta.env.BASE\_URL.  
   * includedRoutes(paths, routes): Một hàm cho phép bạn thêm các route động vào danh sách prerender. Ví dụ, bạn có thể fetch danh sách ID bài viết và tạo ra các route /posts/1, /posts/2,...  
   * excludedRoutes: Loại bỏ các route không cần prerender.  
3. callback: Một hàm được gọi sau khi app được tạo. Đây là nơi lý tưởng để cài đặt các plugin (Vuex, Pinia, VueUse Head...). Các tham số của nó rất hữu ích:  
   * app: instance của Vue app.  
   * router: instance của Vue Router.  
   * isClient: true nếu đang ở trình duyệt, false nếu đang ở server (lúc build).  
   * initialState: Một object rỗng ở server, nhưng ở client nó sẽ chứa dữ liệu được truyền từ server xuống.

## **5\. Flow Build & Hydrate chi tiết**

Hãy mổ xẻ quá trình này một cách chi tiết hơn.

**Giai đoạn Build (trên server):**

1. Bạn chạy lệnh npm run build.  
2. vite-ssg khởi tạo app Vue của bạn trong môi trường Node.js.  
3. Nó duyệt qua tất cả các route tĩnh (/, /posts).  
4. Đối với các route động (như /posts/:id), nó sẽ gọi hàm includedRoutes (nếu bạn định nghĩa trong vite.config.js) để lấy danh sách các đường dẫn cụ thể cần render (ví dụ: \['/posts/post-1', '/posts/post-2'\]).  
5. Với mỗi route:  
   a. Hook onBeforeRender(route, initialState) được gọi (nếu có trong component của route đó). Đây là nơi bạn fetch dữ liệu cho trang. Dữ liệu được gán vào initialState.  
   b. Component của route được render thành chuỗi HTML.  
   c. Dữ liệu trong initialState được serialize và nhúng vào file HTML dưới dạng JSON trong thẻ \<script\>.  
   d. Hook onPageRendered(route, renderedHTML) được gọi. Bạn có thể chỉnh sửa HTML ở đây nếu muốn.  
   e. File HTML cuối cùng được lưu vào thư mục dist.

**Giai đoạn Client (trên trình duyệt):**

1. Người dùng truy cập URL, server trả về file HTML tĩnh tương ứng. Trình duyệt hiển thị ngay lập tức.  
2. JavaScript được tải về.  
3. Hook onClientEntry() được gọi (nếu có trong main.js).  
4. ViteSSG đọc initialState từ file HTML.  
5. Quá trình **Hydration** bắt đầu: Vue "khớp" virtual DOM của nó với DOM tĩnh đã có, gắn các event listener mà không render lại. initialState được sử dụng để khôi phục trạng thái cho các component (ví dụ: qua props).  
6. Hook onRenderComplete() được gọi sau khi hydration hoàn tất. Ứng dụng của bạn giờ đây là một SPA đầy đủ chức năng.

## **6\. Prerender Data với Firebase**

Đây là phần hấp dẫn nhất: làm sao để trang SSG có nội dung động? Chúng ta sẽ dùng hook onBeforeRender và Firestore REST API.

### **Chuẩn bị**

1. Tạo một project trên [Firebase](https://firebase.google.com/) và tạo một database Firestore.  
2. Tạo file .env.local ở thư mục gốc dự án:  
   VITE\_FIREBASE\_PROJECT\_ID="your-project-id"  
   VITE\_FIREBASE\_API\_KEY="your-web-api-key"

   *Lưu ý: Dùng REST API với API Key cho Web là an toàn cho việc đọc dữ liệu public. Đừng bao giờ đưa Admin SDK credentials vào code frontend.*

### **Ví dụ: pages/Posts.vue & pages/PostDetail.vue**

#### **pages/PostDetail.vue \- Fetch dữ liệu cho một trang cụ thể**

Đây là component hiển thị chi tiết một bài viết.

\<\!-- src/pages/PostDetail.vue \--\>  
\<template\>  
  \<div v-if="post"\>  
    \<h1\>{{ post.title }}\</h1\>  
    \<p\>Được viết bởi: {{ post.author }}\</p\>  
    \<div class="content" v-html="post.content"\>\</div\>  
  \</div\>  
  \<div v-else-if="isLoading"\>  
    \<p\>Đang tải bài viết...\</p\>  
  \</div\>  
  \<div v-else\>  
    \<p\>Không tìm thấy bài viết.\</p\>  
  \</div\>  
\</template\>

\<script\>  
// Hook onBeforeRender được export riêng  
// Nó sẽ được vite-ssg gọi lúc build time  
export async function onBeforeRender(route, initialState) {  
  const postId \= route.params.id;  
  const projectId \= import.meta.env.VITE\_FIREBASE\_PROJECT\_ID;  
  const url \= \`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/posts/${postId}\`;

  try {  
    const res \= await fetch(url);  
    if (\!res.ok) throw new Error('Failed to fetch');  
    const data \= await res.json();

    // Biến đổi dữ liệu từ Firestore về dạng dễ dùng hơn  
    const postData \= {  
      title: data.fields.title.stringValue,  
      content: data.fields.content.stringValue,  
      author: data.fields.author.stringValue,  
    };

    // Gán dữ liệu vào initialState để truyền xuống client  
    initialState.post \= postData;  
  } catch (error) {  
    console.error(\`Error fetching post ${postId}:\`, error);  
    // Bạn có thể xử lý lỗi ở đây, ví dụ redirect sang trang 404  
  }  
}  
\</script\>

\<script setup\>  
import { ref, onMounted } from 'vue';  
import { useRoute } from 'vue-router';  
import { useHead } from '@vueuse/head';

// 1\. Nhận initialData thông qua props  
const props \= defineProps({  
  initialState: {  
    type: Object,  
    default: () \=\> ({}),  
  },  
});

const route \= useRoute();  
const post \= ref(props.initialState?.post);  
const isLoading \= ref(false);

// 2\. Fallback fetching ở client-side  
// Cần thiết khi người dùng điều hướng từ trang khác đến trang này (SPA navigation)  
onMounted(async () \=\> {  
  if (\!post.value) {  
    isLoading.value \= true;  
    // Tái sử dụng logic fetch ở client  
    // (Trong thực tế, bạn nên tách logic fetch ra một hàm riêng)  
    const postId \= route.params.id;  
    const projectId \= import.meta.env.VITE\_FIREBASE\_PROJECT\_ID;  
    const url \= \`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/posts/${postId}\`;  
    try {  
        const res \= await fetch(url);  
        const data \= await res.json();  
        post.value \= {  
            title: data.fields.title.stringValue,  
            content: data.fields.content.stringValue,  
            author: data.fields.author.stringValue,  
        };  
    } catch (e) {  
        console.error(e);  
    } finally {  
        isLoading.value \= false;  
    }  
  }  
});

// 3\. Quản lý SEO cho trang  
useHead(() \=\> ({  
  title: post.value?.title || 'Bài viết',  
  meta: \[  
    { name: 'description', content: \`Đọc bài viết ${post.value?.title}\` },  
  \],  
}));  
\</script\>

**Luồng hoạt động của ví dụ trên:**

1. **Lúc build:** vite-ssg chạy onBeforeRender, fetch dữ liệu từ Firestore, và gán vào initialState.post. Dữ liệu này được nhúng vào file HTML.  
2. **Lúc tải trang:** Vue nhận initialState qua props, post.value có dữ liệu ngay lập tức và hiển thị ra màn hình. onMounted được gọi, nhưng vì post.value đã có, nó không làm gì cả.  
3. **Lúc điều hướng SPA:** Khi người dùng click một link từ trang Home đến trang này, component được mount. initialState lúc này là rỗng. onMounted sẽ được kích hoạt để fetch dữ liệu từ phía client.

## **7\. Các Hooks & API quan trọng của vite-ssg**

* onBeforeRender(route, initialState): (Trong component) Chạy **chỉ ở server** trước khi render. Nơi hoàn hảo để fetch data.  
* onPageRendered(route, html): (Trong vite.config.js) Chạy **chỉ ở server** sau khi render. Dùng để chỉnh sửa HTML thô.  
* useHead(options): (Trong component, từ @vueuse/head) Cách tốt nhất để quản lý thẻ \<head\> (title, meta, script...) một cách linh hoạt.  
* onClientEntry(callback): (Trong main.js) Chạy **chỉ ở client** trước khi app được mount.  
* onRenderComplete(callback): (Trong main.js) Chạy **chỉ ở client** sau khi hydration hoàn tất.  
* import.meta.env.SSR: (Bất cứ đâu) Biến boolean để kiểm tra code đang chạy ở server hay client.

## **8\. Quản lý \<head\> & SEO nâng cao với JSON-LD**

Quản lý thẻ \<head\> là tối quan trọng cho SEO.

### **@vueuse/head là lựa chọn hàng đầu**

So với các phương pháp cũ, @vueuse/head cực kỳ mạnh mẽ vì nó là một composable, cho phép bạn:

* Sử dụng bên trong \<script setup\>.  
* Cập nhật thẻ \<head\> một cách linh hoạt dựa trên state của component.  
* Tự động xử lý cả ở server (lúc build) và client (lúc hydrate).

### **Thêm dữ liệu có cấu trúc (JSON-LD)**

JSON-LD là một cách để cung cấp thông tin chi tiết về trang của bạn cho các công cụ tìm kiếm, giúp hiển thị kết quả tìm kiếm phong phú (rich snippets).

**Ví dụ thêm JSON-LD cho một bài viết:**

\<\!-- Trong \<script setup\> của PostDetail.vue \--\>  
\<script setup\>  
import { computed } from 'vue';  
import { useHead } from '@vueuse/head';

// ... (logic fetch post)

const post \= ref({ /\* Dữ liệu bài viết \*/ });

// Sử dụng computed để tạo JSON-LD một cách linh hoạt  
const jsonLd \= computed(() \=\> ({  
  type: 'application/ld+json',  
  children: JSON.stringify({  
    '@context': 'https://schema.org',  
    '@type': 'Article',  
    'headline': post.value.title,  
    'author': {  
      '@type': 'Person',  
      'name': post.value.author,  
    },  
    'datePublished': post.value.publishDate, // ví dụ: '2025-07-15T09:00:00+07:00'  
    // ... các trường khác  
  }),  
}));

useHead(() \=\> ({  
  title: post.value.title,  
  meta: \[ /\* ... \*/ \],  
  script: \[  
    // Chèn JSON-LD vào head  
    jsonLd.value,  
  \],  
}));  
\</script\>

## **9\. Build & Deploy**

Sau khi đã hoàn tất, đây là lúc đưa sản phẩm ra thế giới.

### **Build và kiểm tra**

\# Build tất cả các trang thành file tĩnh trong thư mục /dist  
npm run build

\# Chạy một server local để xem trước kết quả từ thư mục /dist  
npm run serve

Hãy mở trình duyệt và truy cập vào địa chỉ mà vite preview cung cấp. "View Page Source" để thấy nội dung HTML đã được render đầy đủ.

### **Deploy lên Cloudflare Pages**

Cloudflare Pages là lựa chọn hoàn hảo cho các trang SSG.

1. Đẩy code của bạn lên một repo GitHub/GitLab.  
2. Trong dashboard Cloudflare, chọn "Workers & Pages" \-\> "Create application" \-\> "Pages".  
3. Kết nối với repo của bạn.  
4. Trong phần "Build settings":  
   * **Framework preset:** Chọn Vite.  
   * **Build command:** npm run build  
   * **Build output directory:** dist  
5. Nhấn "Save and Deploy". Xong\!

### **Deploy lên Firebase Hosting**

Firebase Hosting cũng là một lựa chọn tuyệt vời.

1. Cài đặt Firebase CLI: npm install \-g firebase-tools.  
2. Đăng nhập: firebase login.  
3. Khởi tạo hosting: firebase init hosting.  
   * Chọn project Firebase của bạn.  
   * **What do you want to use as your public directory?** Nhập dist.  
   * **Configure as a single-page app (rewrite all urls to /index.html)?** Chọn **No**. Đây là điểm khác biệt quan trọng. Vì chúng ta đã có các file HTML cho từng route, chúng ta không cần rewrite tất cả về index.html.  
4. Build dự án: npm run build.  
5. Deploy: firebase deploy.

## **10\. Tổng kết & Checklist hoàn chỉnh**

Chúng ta đã đi qua một hành trình dài. SSG với Vite và Vue 3 không hề phức tạp nếu bạn nắm vững các khái niệm cốt lõi. Nó mang lại sức mạnh to lớn về hiệu năng và SEO mà các ứng dụng SPA truyền thống khó có thể sánh được.

Hãy dùng checklist này để đảm bảo bạn không bỏ sót bước nào khi triển khai dự án của mình.

* \[ \] Khởi tạo dự án Vue 3 và chọn "Yes" cho Vue Router.  
* \[ \] Cài đặt các thư viện cần thiết: vite-ssg, @vueuse/head.  
* \[ \] Cập nhật scripts trong package.json với build: "vite-ssg build".  
* \[ \] Chuyển đổi src/main.js để sử dụng ViteSSG() thay vì createApp().  
* \[ \] Export mảng routes từ file cấu hình router.  
* \[ \] Đối với các trang cần dữ liệu, tạo và export hàm async function onBeforeRender().  
* \[ \] Trong onBeforeRender, fetch dữ liệu và gán vào initialState.  
* \[ \] Trong \<script setup\>, nhận initialState qua props.  
* \[ \] Thêm logic fetching fallback trong onMounted cho các lần điều hướng phía client.  
* \[ \] Sử dụng useHead() trong mỗi component trang để quản lý title, meta và các thẻ \<head\> khác.  
* \[ \] Thêm JSON-LD để tăng cường SEO cho các trang quan trọng (bài viết, sản phẩm...).  
* \[ \] Sử dụng import.meta.env.SSR hoặc isClient khi cần viết code chỉ chạy ở một môi trường cụ thể.  
* \[ \] Chạy npm run build để tạo trang tĩnh.  
* \[ \] Chạy npm run serve để kiểm tra kỹ lưỡng trang web thành phẩm.  
* \[ \] Deploy lên một dịch vụ hosting tĩnh như Cloudflare Pages hoặc Firebase Hosting.  
* \[ \] Sử dụng Google PageSpeed Insights để đo lường và ăn mừng điểm số Core Web Vitals cao ngất ngưởng\!

Chúc mừng bạn đã hoàn thành hướng dẫn\! Giờ đây bạn đã có đủ kiến thức để xây dựng những ứng dụng Vue siêu tốc và chinh phục các công cụ tìm kiếm. Happy coding\!