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
    title: 'Lộ trình căn bản (tối thiểu)',
    items: [
      { name: 'HTML & CSS', path: '/basics/html-css' }, // Gộp HTML & CSS
      { name: 'JavaScript', path: '/basics/javascript' },
      { name: 'Công cụ phát triển', path: '/tools/overview' }, // Trang tổng quan công cụ
      { name: 'Bulma', path: '/css/bulma' },
      { name: 'Vue.js & Vite', path: '/vue/vite-setup' },
      { name: 'Firebase (Frontend)', path: '/firebase/frontend-basics' },
    ]
  },
  {
    title: 'Lộ trình nâng cao',
    items: [
      { name: 'Vue Ecosystem (Router, Vuex)', path: '/vue/ecosystem' },
      { name: 'Node.js', path: '/nodejs/introduction' },
      { name: 'Firebase (Advanced)', path: '/firebase/advanced' },
      { name: 'Tailwind CSS', path: '/css/tailwind' },
      { name: 'Testing (Vitest)', path: '/testing/vitest' },
      { name: 'TypeScript', path: '/typescript/introduction' },
      { name: 'SSR/SSG (ViteSSG)', path: '/vue/ssg' },
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
  <aside class="h-full md:py-6 md:pr-4 mb-8 md:mb-0 bg-white dark:bg-gray-900 overflow-y-auto border-r border-gray-200 dark:border-gray-700 pl-1">
    <!-- Header cho sidebar trên mobile với nút đóng -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
      <h2 class="font-bold text-lg text-gray-900 dark:text-white">Menu</h2>
      <button 
        @click="closeSidebar" 
        class="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Close menu"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>

    <div class="p-4 md:p-0 md:sticky md:top-4 overflow-y-auto h-full">
      <div class="mb-6 px-4 md:px-0">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Tìm kiếm tài liệu..." 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white" 
        />
      </div>

      <nav class="px-4 md:px-0">
        <div v-for="(category, index) in filteredCategories" :key="index" class="mb-6">
          <h3 class="font-semibold text-sm uppercase tracking-wider mb-3 text-gray-500 dark:text-gray-400">{{ category.title }}</h3>
          <ul class="space-y-1">
            <li v-for="(item, itemIndex) in category.items" :key="itemIndex">
              <router-link 
                :to="item.path" 
                @click="closeSidebar" 
                class="block py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                active-class="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </aside>
</template>
