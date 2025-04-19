<script setup>
import { onMounted, watch, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    default: 'Dev.akivn.net - Tài liệu kỹ thuật'
  },
  description: {
    type: String,
    default: 'Tài liệu kỹ thuật tiếng Việt cho các công nghệ như Vue, Vite, Firebase, Node.js và nhiều công nghệ khác.'
  },
  keywords: {
    type: String,
    default: 'vue, vite, javascript, firebase, tailwind, bulma, nodejs, websocket, programming, developers, coding'
  },
  image: {
    type: String,
    default: '/logo.png' // Đường dẫn đến logo hoặc hình ảnh đại diện
  },
  url: {
    type: String,
    default: ''
  }
});

const route = useRoute();
const currentUrl = window.location.origin + (props.url || route.fullPath);

// Cập nhật title và meta tags
const updateMetaInfo = () => {
  // Cập nhật title
  document.title = props.title;
  
  // Cập nhật meta description
  let descriptionTag = document.querySelector('meta[name="description"]');
  if (!descriptionTag) {
    descriptionTag = document.createElement('meta');
    descriptionTag.setAttribute('name', 'description');
    document.head.appendChild(descriptionTag);
  }
  descriptionTag.setAttribute('content', props.description);
  
  // Cập nhật meta keywords
  let keywordsTag = document.querySelector('meta[name="keywords"]');
  if (!keywordsTag) {
    keywordsTag = document.createElement('meta');
    keywordsTag.setAttribute('name', 'keywords');
    document.head.appendChild(keywordsTag);
  }
  keywordsTag.setAttribute('content', props.keywords);
  
  // Open Graph meta tags cho social media
  updateOrCreateMetaTag('og:title', props.title);
  updateOrCreateMetaTag('og:description', props.description);
  updateOrCreateMetaTag('og:image', window.location.origin + props.image);
  updateOrCreateMetaTag('og:url', currentUrl);
  updateOrCreateMetaTag('og:type', 'website');
  
  // Twitter Card meta tags
  updateOrCreateMetaTag('twitter:card', 'summary_large_image');
  updateOrCreateMetaTag('twitter:title', props.title);
  updateOrCreateMetaTag('twitter:description', props.description);
  updateOrCreateMetaTag('twitter:image', window.location.origin + props.image);
  
  // Canonical URL để tránh nội dung trùng lặp
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute('href', currentUrl);
};

// Helper để cập nhật hoặc tạo meta tag
const updateOrCreateMetaTag = (name, content) => {
  let metaTag = document.querySelector(`meta[property="${name}"]`);
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute('property', name);
    document.head.appendChild(metaTag);
  }
  metaTag.setAttribute('content', content);
};

// Theo dõi các thay đổi của props để cập nhật meta tags
watch(() => props.title, updateMetaInfo);
watch(() => props.description, updateMetaInfo);
watch(() => props.keywords, updateMetaInfo);
watch(() => props.image, updateMetaInfo);
watch(() => props.url, updateMetaInfo);
watch(() => route.fullPath, updateMetaInfo);

// Cập nhật meta tags khi component được mount
onMounted(updateMetaInfo);

// Khôi phục title gốc khi component bị hủy
onBeforeUnmount(() => {
  document.title = 'Dev.akivn.net - Tài liệu kỹ thuật';
});
</script>

<template>
  <!-- Component này không render gì trên giao diện -->
</template>
