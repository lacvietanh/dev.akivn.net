<script setup>
import { computed } from 'vue'
import { useHead } from '@unhead/vue'

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
  return typeof window !== 'undefined' 
    ? `https://dev.akivn.net${window.location.pathname}` 
    : 'https://dev.akivn.net/'
})

// Use useHead to manage all meta tags
useHead({
  title: computed(() => props.title),
  meta: [
    { name: 'description', content: computed(() => props.description) },
    { name: 'keywords', content: computed(() => props.keywords) },
    // Open Graph / Facebook
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:title', content: computed(() => props.title) },
    { property: 'og:description', content: computed(() => props.description) },
    { property: 'og:image', content: 'https://dev.akivn.net/img/fbog-akidev-home.png' },
    // Twitter
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:url', content: canonicalUrl },
    { property: 'twitter:title', content: computed(() => props.title) },
    { property: 'twitter:description', content: computed(() => props.description) },
    { property: 'twitter:image', content: 'https://dev.akivn.net/img/fbog-akidev-home.png' },
    // Other
    { name: 'author', content: 'Akinet' },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ]
})
</script>

<template>
  <!-- This component doesn't render anything - it just manages the document head -->
</template>
