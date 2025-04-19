<script setup>
import { ref, computed, defineEmits } from 'vue'

const emit = defineEmits(['close-sidebar'])
const searchQuery = ref('')

const closeSidebar = () => {
  emit('close-sidebar')
}

const categories = [
  {
    title: 'Kiến thức nền tảng',
    items: [
      { name: 'HTML cơ bản', path: '/basics/html' },
      { name: 'CSS cơ bản', path: '/basics/css' },
      { name: 'JavaScript cơ bản', path: '/basics/javascript' },
      { name: 'Git & GitHub', path: '/basics/git' },
      { name: 'Terminal/Command Line', path: '/basics/terminal' },
    ]
  },
  {
    title: 'Công cụ phát triển',
    items: [
      { name: 'Node.js & npm', path: '/tools/nodejs' },
      { name: 'Visual Studio Code', path: '/tools/vscode' },
      { name: 'Chrome DevTools', path: '/tools/devtools' },
    ]
  },
  {
    title: 'Vue.js',
    items: [
      { name: 'Khởi tạo dự án với Vite', path: '/vue/vite-setup' },
      { name: 'Component và Props', path: '/vue/components' },
      { name: 'Lifecycle hooks', path: '/vue/lifecycle' },
      { name: 'Directives cơ bản', path: '/vue/directives' },
      { name: 'Events và Event handling', path: '/vue/events' },
      { name: 'Vue Router', path: '/vue/router' },
      { name: 'Vuex/Pinia cơ bản', path: '/vue/store' },
    ]
  },
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
  <aside class="h-full md:py-6 md:pr-4 mb-8 md:mb-0 bg-white dark:bg-gray-900 overflow-y-auto">
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
      <div class="mb-6">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Tìm kiếm..." 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white" 
        />
      </div>

      <div v-for="(category, index) in filteredCategories" :key="index" class="mb-6">
        <h3 class="font-medium text-lg mb-2 text-gray-800 dark:text-gray-200">{{ category.title }}</h3>
        <ul class="space-y-2">
          <li v-for="(item, itemIndex) in category.items" :key="itemIndex">
            <!-- Thêm @click để đóng sidebar khi chọn mục trên mobile -->
            <router-link 
              :to="item.path" 
              @click="closeSidebar"
              class="block py-1 px-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
