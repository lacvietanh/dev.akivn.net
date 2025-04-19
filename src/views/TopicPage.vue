<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import SEO from '../components/SEO.vue'

const route = useRoute()
const topic = ref('')
const content = ref('')
const isLoading = ref(true)
const pageTitle = ref('')
const pageDescription = ref('')

// Tạo tiêu đề SEO động dựa trên chủ đề
const seoTitle = computed(() => {
  if (!pageTitle.value) {
    return `${topic.value.charAt(0).toUpperCase() + topic.value.slice(1)} - Dev.akivn.net`
  }
  return `${pageTitle.value} - Dev.akivn.net`
})

// Tạo mô tả SEO động dựa trên nội dung
const seoDescription = computed(() => {
  if (pageDescription.value) {
    return pageDescription.value
  }
  const category = route.path.split('/')[1]
  return `Tài liệu và hướng dẫn về ${topic.value} trong danh mục ${category}. Học ${topic.value} với ví dụ mã nguồn và hướng dẫn chi tiết bằng tiếng Việt.`
})

// Tạo từ khóa SEO động
const seoKeywords = computed(() => {
  const category = route.path.split('/')[1]
  return `${topic.value}, ${category}, học lập trình, tài liệu tiếng việt, akinet, dev.akivn.net`
})

// Hàm giả lập việc tải nội dung chủ đề từ file markdown
// Trong phiên bản thực tế, bạn sẽ cần tải nội dung thực từ các file hoặc API
const loadTopicContent = async () => {
  isLoading.value = true
  
  // Lấy thông tin từ route
  const category = route.path.split('/')[1] // 'basics', 'tools', 'vue', etc.
  topic.value = route.params.topic // 'html', 'css', 'javascript', etc.
  
  // Giả lập việc tải nội dung
  setTimeout(() => {
    // Trong thực tế, bạn sẽ tải nội dung từ file markdown và chuyển đổi sang HTML
    if (category === 'basics' && topic.value === 'html') {
      content.value = `
        <h1>HTML Cơ bản</h1>
        <p>HTML (HyperText Markup Language) là ngôn ngữ đánh dấu tiêu chuẩn để tạo trang web. HTML mô tả cấu trúc của một trang web thông qua các phần tử (elements).</p>
        
        <h2>Cấu trúc cơ bản của một trang HTML</h2>
        <pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;Tiêu đề trang web&lt;/title&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Đây là tiêu đề lớn&lt;/h1&gt;
  &lt;p&gt;Đây là một đoạn văn bản.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
        
        <h2>Các thẻ HTML cơ bản</h2>
        <p>HTML có nhiều thẻ khác nhau để cấu trúc nội dung như tiêu đề, đoạn văn, liên kết, hình ảnh, và danh sách.</p>
        <p>Xem thêm tại <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">MDN Web Docs</a></p>
      `
    } else if (category === 'vue' && topic.value === 'vite-setup') {
      content.value = `
        <h1>Khởi tạo dự án với Vue và Vite</h1>
        <p>Vue.js là một framework JavaScript linh hoạt để xây dựng giao diện người dùng. Kết hợp với Vite - một công cụ build hiện đại, bạn có thể tạo ra các ứng dụng Vue nhanh chóng và hiệu quả.</p>
        
        <h2>Tạo dự án Vue với Vite</h2>
        <pre><code class="language-bash">npm create vite@latest my-vue-app -- --template vue</code></pre>
        
        <h2>Cấu trúc dự án</h2>
        <p>Một dự án Vue/Vite cơ bản có cấu trúc gồm thư mục public cho tài nguyên tĩnh, thư mục src cho mã nguồn, file cấu hình Vite và các file khác.</p>
        
        <h2>Khởi chạy dự án</h2>
        <pre><code class="language-bash">npm run dev</code></pre>
        
        <p>Xem thêm tại <a href="https://vuejs.org/guide/introduction.html" target="_blank">Tài liệu Vue.js</a></p>
      `
    } else {
      content.value = `
        <h1>${topic.value.charAt(0).toUpperCase() + topic.value.slice(1)}</h1>
        <p>Nội dung bài học về ${topic.value} trong danh mục ${category} sẽ được hiển thị ở đây.</p>
        <p>Đây là nơi hiển thị chi tiết về chủ đề ${topic.value}. Trong phiên bản hoàn chỉnh, nội dung này sẽ được tải từ các file markdown thực.</p>
        <h2>Các phần của bài học</h2>
        <ul>
          <li>Giới thiệu về ${topic.value}</li>
          <li>Cơ bản về ${topic.value}</li>
          <li>Thực hành với ${topic.value}</li>
          <li>Tham khảo thêm</li>
        </ul>
        <p>Vui lòng chọn một chủ đề khác từ thanh điều hướng bên trái để xem nội dung khác.</p>
      `
    }
    isLoading.value = false
  }, 300) // Giả lập độ trễ khi tải nội dung
}

// Theo dõi thay đổi route để cập nhật nội dung
onMounted(loadTopicContent)
// Khi route thay đổi (chuyển chủ đề), tải lại nội dung
const routeParams = route.params
</script>

<template>
  <SEO 
    :title="seoTitle"
    :description="seoDescription"
    :keywords="seoKeywords"
  />
  <div class="prose dark:prose-invert max-w-none">
    <div v-if="isLoading" class="py-8 flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    
    <div v-else v-html="content" class="topic-content"></div>
  </div>
</template>

<style>
/* Sử dụng CSS thông thường thay vì @apply */
.topic-content h1 {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}
.topic-content h2 {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.topic-content p {
  margin-bottom: 1rem;
}
.topic-content ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}
.topic-content li {
  margin-bottom: 0.5rem;
}
</style>
