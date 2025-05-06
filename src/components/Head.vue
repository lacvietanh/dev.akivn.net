<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentPath = ref('')

// Cập nhật currentPath để đảm bảo SSR hoạt động đúng
onMounted(() => {
  currentPath.value = window.location.pathname
})

// Cập nhật khi route thay đổi
watch(() => route.path, (newPath) => {
  currentPath.value = newPath
})

const props = defineProps({
  title: {
    type: String,
    default: 'AkiDEV | DEV.AkiVN.Net | Trang tài liệu lập trình tiếng Việt cho công nghệ web/app hiện đại dùng trong AkiNet'
  },
  description: {
    type: String,
    default: 'Tài liệu và hướng dẫn tiếng Việt về Vue, Vite, Firebase, Bulma, Tailwind, và các công nghệ Web/App hiện đại khác mà AkiNet sử dụng. Học lập trình với ví dụ mã nguồn và hướng dẫn chi tiết bằng tiếng Việt.'
  },
  keywords: {
    type: String,
    default: 'vue, vite, javascript, học lập trình, tài liệu tiếng việt, firebase, nodejs, bulma, tailwind'
  },
  url: {
    type: String,
    default: null 
  }
})

const canonicalUrl = computed(() => {
  if (props.url) {
    return `https://dev.akivn.net${props.url}`
  }
  
  // Sử dụng route.path cho SSR và currentPath cho CSR
  const path = import.meta.env.SSR 
    ? route.path 
    : currentPath.value || route.path
  
  return `https://dev.akivn.net${path}`
})

// Đối tượng trạng thái cho metadata
const metaData = computed(() => ({
  title: props.title,
  description: props.description,
  keywords: props.keywords,
  url: canonicalUrl.value,
}))

// Use useHead to manage all meta tags
useHead({
  title: computed(() => metaData.value.title),
  meta: [
    { name: 'description', content: computed(() => metaData.value.description) },
    { name: 'keywords', content: computed(() => metaData.value.keywords) },
    // Open Graph / Facebook
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: computed(() => metaData.value.url) },
    { property: 'og:title', content: computed(() => metaData.value.title) },
    { property: 'og:description', content: computed(() => metaData.value.description) },
    { property: 'og:image', content: 'https://dev.akivn.net/img/fbog-akidev-home.png' },
    // Twitter
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:url', content: computed(() => metaData.value.url) },
    { property: 'twitter:title', content: computed(() => metaData.value.title) },
    { property: 'twitter:description', content: computed(() => metaData.value.description) },
    { property: 'twitter:image', content: 'https://dev.akivn.net/img/fbog-akidev-home.png' },
    // Other
    { name: 'author', content: 'Akinet' },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [
    { rel: 'canonical', href: computed(() => metaData.value.url) }
  ]
})
</script>

<template>
  <!-- This component doesn't render anything - it just manages the document head -->
</template>
