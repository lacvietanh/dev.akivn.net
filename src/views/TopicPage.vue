<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Head from '../components/Head.vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
      } catch (__) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
})

const route = useRoute()
const topic = ref('')
const content = ref('')
const isLoading = ref(true)
const pageTitle = ref('')
const pageDescription = ref('')
const rawContent = ref('')

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

// Hàm tải nội dung chủ đề từ file markdown
const loadTopicContent = async () => {
  isLoading.value = true
  content.value = '' // Reset content
  pageTitle.value = '' // Reset title
  pageDescription.value = '' // Reset description
  rawContent.value = '' // Reset raw content

  // Lấy thông tin từ route path
  const pathParts = route.path.split('/').filter(p => p); // Tách và loại bỏ phần tử rỗng
  const category = pathParts.length > 0 ? pathParts[0] : ''; // 'basics', 'tools', 'vue', etc.
  topic.value = pathParts.length > 1 ? pathParts[pathParts.length - 1] : ''; // Lấy phần cuối cùng làm topic

  // Kiểm tra nếu category hoặc topic rỗng (có thể xảy ra ở trang chủ hoặc lỗi)
  if (!category || !topic.value) {
    console.error('Không thể xác định category hoặc topic từ path:', route.path);
    content.value = `<p>Lỗi: Không thể xác định chủ đề từ đường dẫn.</p>`;
    isLoading.value = false;
    return;
  }

  try {
    // Vite's import.meta.glob with { as: 'raw' } directly imports the raw string content.
    const modules = import.meta.glob('/src/content/**/*.md', { eager: false, as: 'raw' });
    const modulePath = `/src/content/${category}/${topic.value}.md`;

    if (modules[modulePath]) {
      // Call the dynamic import function to get the raw string
      rawContent.value = await modules[modulePath](); 

      // Tách tiêu đề và mô tả từ nội dung markdown (ví dụ đơn giản)
      const lines = rawContent.value.split('\n');
      if (lines.length > 0 && lines[0].startsWith('# ')) {
        pageTitle.value = lines[0].substring(2).trim();
      }

      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() && !lines[i].startsWith('#') && !lines[i].startsWith('```')) {
          pageDescription.value = lines[i].trim();
          break;
        }
      }

      content.value = md.render(rawContent.value);
    } else {
      console.warn(`Không tìm thấy module Markdown cho: ${modulePath}`);
      // Fallback nếu không tìm thấy file markdown
      const fallbackTitle = topic.value.charAt(0).toUpperCase() + topic.value.slice(1);
      pageTitle.value = fallbackTitle;
      content.value = `
        <h1>${fallbackTitle}</h1>
        <p>Nội dung về chủ đề ${topic.value} đang được chuẩn bị.</p>
        <p>Vui lòng quay lại sau.</p>
      `;
    }

  } catch (error) {
    console.error('Không thể tải hoặc xử lý nội dung markdown:', error);
    const fallbackTitle = topic.value ? topic.value.charAt(0).toUpperCase() + topic.value.slice(1) : 'Lỗi';
    pageTitle.value = fallbackTitle;
    content.value = `
      <h1>${fallbackTitle}</h1>
      <p>Đã xảy ra lỗi khi tải nội dung. Vui lòng thử lại sau.</p>
    `;
  } finally {
    isLoading.value = false;
  }
};

// Gọi loadTopicContent khi component được mounted
onMounted(loadTopicContent);

// Và gọi lại khi route thay đổi (ví dụ: chuyển giữa các topic)
watch(() => route.path, loadTopicContent);
</script>

<template>

  <Head :title="seoTitle" :description="seoDescription" :keywords="seoKeywords" />
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
