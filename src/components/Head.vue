<script setup>
import { computed, watch } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'

// Define incoming props
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  keywords: { type: String, required: true },
  url: { type: String, default: null }
})
// Get current path for canonical
const route = useRoute()
// Compute canonical URL (SSR-friendly)
const canonicalUrl = computed(() =>
  props.url
    ? `https://dev.akivn.net${props.url}`
    : `https://dev.akivn.net${route.path}`
)

// Log component props and route info for debugging
// Logs removed for production

// Create reactive head object that updates when props change
const head = computed(() => {
  // Double-check props
  if (!props.title || props.title === 'AkiNet Devs') {
    console.warn(`[Head.vue] Warning: title is missing or generic on route ${route.path}`)
  }
  
  return {
    // Force direct value to ensure reactivity
    title: `${props.title}`,
    meta: [
      { name: 'description', content: props.description },
      { name: 'keywords', content: props.keywords },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl.value },
      { property: 'og:title', content: props.title },
      { property: 'og:description', content: props.description },
      { property: 'og:image', content: 'https://dev.akivn.net/img/fbog-akidev-home.png' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:url', content: canonicalUrl.value },
      { property: 'twitter:title', content: props.title },
      { property: 'twitter:description', content: props.description },
      { property: 'twitter:image', content: 'https://dev.akivn.net/img/fbog-akidev-home.png' },
      { name: 'author', content: 'Akinet' },
      { name: 'robots', content: 'index, follow' }
    ],
    link: [{ rel: 'canonical', href: canonicalUrl.value }]
  }
})

// Use the head object with the useHead hook
useHead(head)

// Chỉ cập nhật khi các props thay đổi, nhưng không gọi lại useHead
// Điều này để tránh lỗi "inject() can only be used inside setup()"
watch(() => [props.title, props.description, props.keywords, props.url], 
  () => {
    // Head object sẽ tự động được cập nhật nhờ tính reactive
    console.log('Head props changed, head object updated')
  }
)
</script>

<template>
  <!-- This component doesn't render anything - it just manages the document head -->
</template>
