<script setup>
import { ref, computed, defineEmits } from 'vue'

const emit = defineEmits(['close-sidebar'])
const searchQuery = ref('')

const closeSidebar = () => {
  emit('close-sidebar')
}

// Cập nhật cấu trúc categories theo lộ trình mới
const categories = [
  {
    title: 'Lộ trình căn bản',
    items: [
      { name: 'Công cụ lập trình', path: '/tools/overview' },
      { name: 'HTML & CSS', path: '/basics/html-css' },
      { name: 'Bulma (CSS Library)', path: '/css/bulma' },
      { name: 'JavaScript', path: '/basics/javascript' },
      { name: 'Vue.js & Vite', path: '/vue/vite-setup' },
      { name: 'Firebase (Frontend)', path: '/firebase/frontend-basics' },
      { name: 'HTTP & RESTful API', path: '/basics/http-restful-api' },
    ]
  },
  {
    title: 'Lộ trình nâng cao',
    items: [
      { name: 'Vue Router & Vuex', path: '/vue/ecosystem' },
      { name: 'NodeJS, Websocket', path: '/nodejs/introduction' },
      { name: 'Firebase (Advanced)', path: '/firebase/advanced' },
      { name: 'SSR/SSG (ViteSSG)', path: '/vue/ssg' },
      { name: 'Tauri (Framework)', path: '/tauri/introduction' },
      { name: 'ElectronJS', path: '/desktop/electronjs' },
    ]
  },
  {
    title: 'Lộ trình tùy chọn',
    items: [
      { name: 'AI & Nghệ thuật Prompt', path: '/ai/prompt' },
      { name: 'SEO (Tối ưu tìm kiếm)', path: '/SEO/introduction' },
      { name: 'Electron-Vite', path: '/desktop/electron-vite' },
      { name: 'Rust', path: '/programming/rust' },
      { name: 'Tailwind (CSS Library)', path: '/css/tailwind' },
      { name: 'Testing (Vitest)', path: '/testing/vitest' },
      { name: 'TypeScript', path: '/typescript/introduction' },
    ]
  },
  // Thêm các danh mục khác nếu cần
]

// Lọc danh sách các danh mục và bài học dựa trên từ khóa tìm kiếm
const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories

  return categories.map(category => {
    // Lọc các mục trong danh mục
    const filteredItems = category.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )

    // Chỉ trả về danh mục nếu có mục phù hợp hoặc tên danh mục phù hợp
    if (filteredItems.length > 0 ||
      category.title.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return {
        ...category,
        items: filteredItems
      }
    }
    return null
  }).filter(Boolean) // Loại bỏ các danh mục null
})
</script>

<template>
  <aside
    class="h-full md:py-6 md:pr-4 mb-8 md:mb-0 bg-white dark:bg-gray-900 overflow-y-auto border-r border-gray-200 dark:border-gray-700 pl-1">
    <!-- Mobile header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
      <h2 class="font-bold text-lg text-gray-900 dark:text-white">Menu</h2>
      <button @click="closeSidebar"
        class="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Close menu">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <div class="p-4 md:p-0 md:sticky md:top-4 overflow-y-auto h-full">
      <div class="mb-6 px-4 md:px-0">
        <input v-model="searchQuery" type="search" placeholder="Tìm kiếm tài liệu..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white" />
      </div>
      <nav class="px-4 md:px-0">
        <!-- Home link -->
        <ul class="mb-4">
          <li>
            <router-link to="/" @click="closeSidebar"
              class="flex items-center py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <i class="fas fa-home text-blue-500 w-5 mr-2"></i> Trang chủ
            </router-link>
          </li>
        </ul>
        <div v-for="(category, index) in filteredCategories" :key="index" class="mb-6">
          <h3 class="font-semibold text-sm uppercase tracking-wider mb-3 text-gray-500 dark:text-gray-400">{{
            category.title }}</h3>
          <ul class="space-y-1">
            <li v-for="(item, idx) in category.items" :key="idx">
              <router-link :to="item.path" @click="closeSidebar"
                class="flex items-center py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <!-- Icon based on item name (example icons) -->
                <i v-if="item.name.includes('HTML')" class="fab fa-html5 text-orange-600 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('JavaScript')" class="fab fa-js text-yellow-500 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('Công cụ')" class="fas fa-tools text-gray-600 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('Bulma')" class="fab fa-css3-alt text-blue-600 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('Vue')" class="fab fa-vuejs text-green-500 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('Firebase')" class="fas fa-bolt text-yellow-500 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('HTTP')" class="fas fa-network-wired text-indigo-500 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('Node')" class="fab fa-node-js text-green-700 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('Tailwind')" class="fas fa-wind text-blue-500 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('Testing')" class="fas fa-vial text-purple-500 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('TypeScript')" class="fas fa-code text-blue-800 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('SSR')" class="fas fa-server text-indigo-500 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('Tauri')" class="fas fa-mobile-alt text-teal-500 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('SEO')" class="fa-brands fa-searchengin text-red-500 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('Prompt')" class="fas fa-robot text-purple-500 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('Rust')" class="fa-brands fa-rust text-orange-800 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('ElectronJS')" class="fas fa-atom text-blue-500 w-5 mr-1"></i>
                <i v-else-if="item.name.includes('Electron-Vite')" class="fas fa-atom text-yellow-500 w-5 mr-1"></i>
                <span>{{ item.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </aside>
</template>
