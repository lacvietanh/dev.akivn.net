<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue' // Sử dụng trực tiếp useHead
import MarkdownIt from 'markdown-it'
import lazyHljs from '../utils/lazyHighlight.js'

// DEBUG LOGS - Set to true to enable debug output for troubleshooting
const DEBUG = false;
const ListFileNameToDebug = ['ssg']; // List of file names to debug, can be empty

// Markdown-it instance
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    // Debug: highlight input
    if (DEBUG && (!str || typeof str !== 'string')) {
      console.warn('[Markdown-it Debug] Invalid str parameter:', typeof str, str);
    }
    if (!str || typeof str !== 'string') {
      return `<pre class="hljs"><code>${str || ''}</code></pre>`;
    }
    try {
      const hljs = lazyHljs.getHljs();
      if (lang && hljs && hljs.getLanguage(lang)) {
        const result = hljs.highlight(str, { language: lang, ignoreIllegals: true });
        return `<pre class="hljs"><code>${result.value}</code></pre>`;
      }
    } catch (error) {
      if (DEBUG) console.warn('[Markdown-it Debug] Highlight error:', error, 'lang:', lang, 'str length:', str.length);
      // Fall through to default behavior
    }
    // Fallback - escape HTML properly
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
});

const route = useRoute();
const topic = ref('');
const category = ref('');
const content = ref(''); // HTML content from markdown
const isLoading = ref(true);
const pageTitle = ref(''); // Derived from content or route for meta
const pageDescription = ref(''); // Derived from content for meta
const rawContent = ref(''); // Raw markdown string

// Function to parse simple frontmatter
const parseFrontmatter = (markdown) => {
  const frontmatter = {};

  // Add safety check
  if (!markdown || typeof markdown !== 'string') {
    console.warn('[Frontmatter Debug] Invalid markdown parameter:', typeof markdown, markdown);
    return { frontmatter: {}, content: markdown || '' };
  }

  const lines = markdown.split('\n');
  if (lines[0] === '---') {
    let i = 1;
    while (i < lines.length && lines[i] !== '---') {
      const line = lines[i];
      const separatorIndex = line.indexOf(':');
      if (separatorIndex !== -1) {
        const key = line.substring(0, separatorIndex).trim();
        const value = line.substring(separatorIndex + 1).trim();
        frontmatter[key] = value;
      }
      i++;
    }
    // Remove frontmatter from content
    const contentStartIndex = lines.slice(0, i + 1).join('\n').length + 1;
    return { frontmatter, content: markdown.substring(contentStartIndex) };
  }
  return { frontmatter, content: markdown }; // No frontmatter found
};

// SEO Computed Properties
const seoTitle = computed(() => {
  if (pageTitle.value) return pageTitle.value;
  if (topic.value && category.value) {
    const capTopic = topic.value.charAt(0).toUpperCase() + topic.value.slice(1);
    const capCategory = category.value.charAt(0).toUpperCase() + category.value.slice(1);
    return `${capTopic} - ${capCategory} | AkiNet Devs`;
  }
  return 'AkiNet Devs';
});

const seoDescription = computed(() => {
  if (pageDescription.value) return pageDescription.value;
  if (topic.value && category.value) {
    return `Tìm hiểu về ${topic.value} trong ${category.value}. Tài liệu lập trình chi tiết tại AkiNet Devs.`;
  }
  return 'Khám phá tài liệu lập trình, hướng dẫn chi tiết và các chủ đề công nghệ tại AkiNet Devs.';
});

const seoKeywords = computed(() => {
  const baseKeywords = 'akinet, akidev, akinet devs, học lập trình, tài liệu lập trình, hướng dẫn lập trình, tiếng việt, web development, software engineering';
  let dynamicKeywords = topic.value && category.value ? `${topic.value}, ${category.value}` : '';
  return dynamicKeywords ? `${dynamicKeywords}, ${baseKeywords}` : baseKeywords;
});

// Tạo URL chuẩn có dấu / ở cuối cho canonical
const canonicalUrl = computed(() => {
  let path = route.path;
  // Đảm bảo path luôn có dấu / ở cuối (trừ trang chủ đã có sẵn /)
  if (!path.endsWith('/') && path !== '/') {
    path = `${path}/`;
  }
  return `https://dev.akivn.net${path}`;
});

// Manage document head using useHead
useHead(computed(() => ({
  title: seoTitle.value,
  meta: [
    { name: 'description', content: seoDescription.value },
    { name: 'keywords', content: seoKeywords.value },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:title', content: seoTitle.value },
    { property: 'og:description', content: seoDescription.value },
    { property: 'og:image', content: 'https://dev.akivn.net/img/fbog-akidev-home.png' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:url', content: canonicalUrl.value },
    { property: 'twitter:title', content: seoTitle.value },
    { property: 'twitter:description', content: seoDescription.value },
    { property: 'twitter:image', content: 'https://dev.akivn.net/img/fbog-akidev-home.png' },
    { name: 'author', content: 'Akinet' },
    { name: 'robots', content: 'index, follow' }
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl.value }
  ]
})));

const initializeData = async () => {
  isLoading.value = true;
  let currentPath = route.path;

  // Xóa dấu / ở cuối path nếu có để đảm bảo nhất quán khi tìm file markdown
  if (currentPath.endsWith('/') && currentPath !== '/') {
    currentPath = currentPath.slice(0, -1);
  }

  // Normalize path: /basics/html-css -> basics/html-css
  const targetPathSuffix = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;
  // Construct module key: /src/content/basics/html-css.md
  const moduleKey = `/src/content/${targetPathSuffix}.md`;

  const pathParts = targetPathSuffix.split('/').filter(p => p);
  if (pathParts.length > 0) {
    category.value = pathParts[0];
    topic.value = pathParts[pathParts.length - 1];
  } else {
    category.value = '';
    topic.value = '';
  }

  // Reset previous page-specific meta
  pageTitle.value = '';
  pageDescription.value = '';

  // DEBUG: Chỉ enable log cho các file chứa 'ssg' hoặc bật DEBUG toàn cục
  const shouldDebug = (() => {
    let currentPath = route.path;
    if (currentPath.endsWith('/') && currentPath !== '/') {
      currentPath = currentPath.slice(0, -1);
    }
    const targetPathSuffix = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;
    const moduleKey = `/src/content/${targetPathSuffix}.md`;
    // return moduleKey.includes('ssg');
    return DEBUG && moduleKey.includes(ListFileNameToDebug)
  })();
  try {
    const mdModules = import.meta.glob('/src/content/**/*.md', { query: '?raw', import: 'default', eager: false });
    // ================= DEBUG LOGS BLOCK =================
    // Bật DEBUG = true ở đầu file để xem log chi tiết khi cần debug lỗi markdown
    if (shouldDebug) {
      // console.log('[Markdown Debug] Available modules:', Object.keys(mdModules));
      console.log('[Markdown Debug] Looking for moduleKey:', moduleKey);
    }
    // ================= END DEBUG LOGS BLOCK =============
    if (mdModules[moduleKey]) {
      let fullRawContent;
      try {
        fullRawContent = await mdModules[moduleKey]();
        if (shouldDebug) {
          console.log('[Markdown Debug] Raw content type:', typeof fullRawContent, 'Value preview:',
            typeof fullRawContent === 'string' ? fullRawContent.substring(0, 100) : fullRawContent);
        }
        // Handle different possible return formats
        if (typeof fullRawContent === 'string') {
          // Direct string return (expected for { query: '?raw', import: 'default' })
        } else if (fullRawContent && typeof fullRawContent.default === 'string') {
          // Handle case where module returns { default: string }
          fullRawContent = fullRawContent.default;
        } else if (typeof fullRawContent === 'number' && isNaN(fullRawContent)) {
          if (shouldDebug) console.error('[Markdown Debug] Got NaN, this indicates a module loading issue');
          throw new TypeError(`Module loading returned NaN for ${moduleKey}`);
        } else {
          if (shouldDebug) console.error('[Markdown Debug] Unexpected return type:', typeof fullRawContent, fullRawContent);
          throw new TypeError(`Markdown module did not return a string. Got: ${typeof fullRawContent}, value: ${fullRawContent}`);
        }
        if (shouldDebug) console.log('[Markdown Debug] Processing content, length:', fullRawContent.length);
        const { frontmatter, content: markdownContent } = parseFrontmatter(fullRawContent);
        if (shouldDebug) {
          console.log('[Markdown Debug] Parsed frontmatter:', frontmatter);
          console.log('[Markdown Debug] Content length after frontmatter removal:', markdownContent.length);
        }
        rawContent.value = markdownContent;
        if (shouldDebug) console.log('[Markdown Debug] Starting markdown render...');
        content.value = md.render(markdownContent);
        if (shouldDebug) console.log('[Markdown Debug] Markdown render completed, output length:', content.value.length);
        if (frontmatter.title) {
          pageTitle.value = frontmatter.title;
        }
        if (frontmatter.description) {
          pageDescription.value = frontmatter.description;
        }
      } catch (moduleError) {
        if (shouldDebug) console.error('[Markdown Debug] Error in module processing:', moduleError);
        throw moduleError;
      }
    } else {
      if (shouldDebug) {
        console.warn(`Markdown content not found for key: ${moduleKey} (derived from path: ${currentPath})`);
        console.warn('Available keys:', Object.keys(mdModules));
      }
      content.value = `<article class="prose dark:prose-invert max-w-none"><h1>Nội dung không tìm thấy</h1><p>Không tìm thấy nội dung cho đường dẫn: ${currentPath}.</p></article>`;
      rawContent.value = '';
    }
  } catch (error) {
    if (shouldDebug) console.error(`Error loading markdown content for ${currentPath} (key: ${moduleKey}):`, error);
    content.value = `<article class="prose dark:prose-invert max-w-none"><h1>Lỗi tải nội dung</h1><p>Đã xảy ra lỗi khi tải nội dung. Vui lòng thử lại sau.</p><p>${error.message}</p></article>`;
    rawContent.value = '';
  } finally {
    isLoading.value = false;
  }
};

// Function to be called on client-side navigation
const loadTopicContent = async () => {
  await initializeData();
};

// Initial data load - awaited in setup
await initializeData();

// Watch for route changes for client-side navigation
onMounted(() => {
  watch(() => route.path, (newPath, oldPath) => {
    if (newPath !== oldPath && oldPath !== undefined) { // Ensure actual path change
      loadTopicContent();
    }
  });
});
</script>

<template>
  <!-- Head component is managed by useHead, no need to render a <Head /> component here -->
  <div v-if="isLoading" class="flex justify-center items-center min-h-[calc(100vh-200px)]">
    <p class="text-xl text-gray-500 dark:text-gray-400">Đang tải nội dung...</p>
    <!-- Optional: Add a spinner animation -->
  </div>
  <div v-else v-html="content" class="topic-content prose dark:prose-invert max-w-none text-gray-900 dark:text-gray-100">
  </div>
</template>

<style>
/* Sử dụng CSS thông thường thay vì @apply */
.topic-content h1 {
  font-size: 1.875rem;
  /* 30px */
  line-height: 2.25rem;
  /* 36px */
  font-weight: 700;
  margin-bottom: 1.5rem;
  /* 24px */
  padding-bottom: 0.5rem;
  /* 8px */
  border-bottom: 1px solid #e5e7eb;
  /* Cool Gray 200 */
}

.dark .topic-content h1 {
  border-bottom-color: #4b5563;
  /* Cool Gray 600 */
}


.topic-content h2 {
  font-size: 1.5rem;
  /* 24px */
  line-height: 2rem;
  /* 32px */
  font-weight: 600;
  margin-top: 2rem;
  /* 32px */
  margin-bottom: 1rem;
  /* 16px */
  padding-bottom: 0.25rem;
  /* 4px */
  border-bottom: 1px solid #e5e7eb;
  /* Cool Gray 200 */
}

.dark .topic-content h2 {
  border-bottom-color: #4b5563;
  /* Cool Gray 600 */
}

.topic-content p {
  margin-bottom: 1rem;
  /* 16px */
  line-height: 1.75;
  /* More readable line height */
}

.topic-content ul,
.topic-content ol {
  list-style-position: outside;
  padding-left: 1.5rem;
  /* 24px */
  margin-bottom: 1.5rem;
  /* 24px */
}

.topic-content li {
  margin-bottom: 0.5rem;
  /* 8px */
}

.topic-content pre.hljs {
  border-radius: 0.375rem;
  /* 6px */
  padding: 1rem;
  /* 16px */
  margin-bottom: 1.5rem;
  /* 24px */
  overflow-x: auto;
}

.topic-content pre.hljs code {
  white-space: pre-wrap;
  word-break: break-word;
  overflow: auto;
}

.topic-content a {
  color: #3b82f6;
  /* Blue 500 */
  text-decoration: none;
}

.topic-content a:hover {
  text-decoration: underline;
}

.dark .topic-content a {
  color: #60a5fa;
  /* Blue 400 */
}

/* Add some padding to the content area itself */
.topic-content {
  padding: 1rem;
  /* Default padding */
}

@media (min-width: 640px) {

  /* sm */
  .topic-content {
    padding: 1.5rem;
  }
}

@media (min-width: 768px) {

  /* md */
  .topic-content {
    padding: 2rem;
  }
}
</style>
