<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  const emit = defineEmits(['close-sidebar'])
  const searchQuery = ref('')
  const expandedItems = ref(new Set()) // Lưu trạng thái mở/đóng của các mục có submenu
  const route = useRoute() // Lấy thông tin route hiện tại

  const closeSidebar = () => {
    emit('close-sidebar')
  }

  // Toggle trạng thái mở/đóng của một mục menu
  const toggleExpand = (path) => {
    if (expandedItems.value.has(path)) {
      expandedItems.value.delete(path)
    } else {
      expandedItems.value.add(path)
    }
  }

  // Auto expand menu khi trang đang active thuộc một submenu
  const autoExpandActiveMenu = () => {
    const currentPath = route.path
    categories.forEach(category => {
      category.items.forEach(item => {
        if (item.children && item.children.some(child => currentPath === child.path)) {
          expandedItems.value.add(item.path)
        }
      })
    })
  }

  // Cập nhật cấu trúc categories theo lộ trình mới
  const categories = [
    {
      title: 'Lộ trình căn bản',
      items: [
        { name: 'Công cụ cần thiết', path: '/tools/overview' },
        { name: 'HTML & CSS', path: '/basics/html-css' },
        { name: 'Bulma (CSS Library)', path: '/css/bulma' },
        { name: 'JavaScript', path: '/basics/javascript' },
        { name: 'Vue.js & Vite', path: '/vue/vite-setup' },
        { name: 'Firebase (Frontend)', path: '/firebase/frontend-basics' },
        {
          name: 'HTTP & RESTful API', path: '/basics/http-restful-api',
          children: [
            { name: 'Tổng quan về HTTP', path: '/basics/http-restful-api/overview' },
            { name: 'RESTful API Cơ bản', path: '/basics/http-restful-api/basics' },
            { name: 'Hỏi đáp HTTP & REST', path: '/basics/http-restful-api/faq' }
          ]
        },
      ]
    },
    {
      title: 'Lộ trình nâng cao',
      items: [
        { name: 'Vue Router, Pinia, VueHead', path: '/vue/ecosystem' },
        { name: 'NodeJS, Websocket', path: '/nodejs/introduction' },
        {
          name: 'Firebase (Advanced)', path: '/firebase/advanced',
          children: [
            { name: 'Cloud Functions', path: '/firebase/advanced/cloud-functions' },
            { name: 'Security Rules', path: '/firebase/advanced/security-rules' },
            { name: 'Hỏi đáp Firebase', path: '/firebase/advanced/faq' }
          ]
        },
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
        {
          name: 'TypeScript', path: '/typescript/introduction',
          children: [
            { name: 'Cài đặt TypeScript', path: '/typescript/setup' },
            { name: 'Types & Interfaces', path: '/typescript/types' },
            { name: 'Hỏi đáp TypeScript', path: '/typescript/faq' }
          ]
        },
      ]
    },
    // Thêm các danh mục khác nếu cần
  ]

  // Lọc danh sách các danh mục và bài học dựa trên từ khóa tìm kiếm
  const filteredCategories = computed(() => {
    if (!searchQuery.value) return categories

    return categories.map(category => {
      // Lọc các mục trong danh mục
      const filteredItems = category.items.map(item => {
        // Nếu item có children, lọc cả children
        if (item.children) {
          const filteredChildren = item.children.filter(child =>
            child.name.toLowerCase().includes(searchQuery.value.toLowerCase())
          )

          // Nếu có children phù hợp hoặc tên item phù hợp, trả về item với children được lọc
          if (filteredChildren.length > 0 ||
            item.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
            return {
              ...item,
              children: filteredChildren
            }
          }
          return null
        }

        // Với item không có children, chỉ kiểm tra tên
        return item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ? item : null
      }).filter(Boolean) // Loại bỏ các item null

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

  // Tự động mở rộng menu khi component được mount
  onMounted(autoExpandActiveMenu)
</script>

<template>
  <aside id="MAIN_SIDEBAR" class="h-full flex flex-col md:py-6 md:pr-4 md:mb-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 pl-1">
    <!-- Mobile header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
      <h2 class="font-bold text-lg text-gray-900 dark:text-white">Menu</h2>
      <button @click="closeSidebar" class="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Close menu">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Fixed part: search box and main menu -->
    <div class="p-4 md:p-0 flex-shrink-0">
      <div class="mb-6 px-4 md:px-0">
        <input v-model="searchQuery" type="search" placeholder="Tìm kiếm tài liệu..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white" />
      </div>
      <nav class="px-4 md:px-0">
        <!-- Home link -->
        <ul class="mb-4">
          <li>
            <router-link to="/" @click="closeSidebar" class="flex items-center py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <i class="fas fa-home text-blue-500 w-5 mr-2"></i> Trang chủ
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Scrollable part: routes/categories -->
    <div class="overflow-y-auto custom-scrollbar flex-grow px-4 md:px-0">
      <nav>
        <div v-for="(category, index) in filteredCategories" :key="index" class="mb-6">
          <h3 class="font-semibold text-sm uppercase tracking-wider mb-3 text-gray-500 dark:text-gray-400">
            {{ category.title }}
          </h3>
          <ul class="space-y-1" :class="{
            'category-basic': category.title.includes('căn bản'),
            'category-advanced': category.title.includes('nâng cao'),
            'category-optional': category.title.includes('tùy chọn')
          }">
            <li v-for="(item, idx) in category.items" :key="idx" class="menu-item">
              <!-- Menu Item có submenu -->
              <div v-if="item.children && item.children.length > 0">
                <!-- Parent item với toggle -->
                <div
                  @click="toggleExpand(item.path)"
                  class="flex items-center justify-between py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  :class="{ 'active-parent': route.path.startsWith(item.path) }">
                  <div class="flex items-center">
                    <!-- Icon based on item name -->
                    <i v-if="item.name.includes('HTTP')" class="fas fa-network-wired text-indigo-500 w-5 mr-1"></i>
                    <i v-else-if="item.name.includes('Firebase')" class="fas fa-bolt text-yellow-500 w-5 mr-1"></i>
                    <i v-else-if="item.name.includes('TypeScript')" class="fas fa-code text-blue-800 w-5 mr-1"></i>
                    <!-- Default icon if no match -->
                    <i v-else class="fas fa-file-alt text-gray-500 w-5 mr-1"></i>
                    <router-link :to="item.path" @click.stop="closeSidebar">
                      <span>{{ item.name }}</span>
                    </router-link>
                  </div>
                  <!-- Chevron icon: down when collapsed, up when expanded -->
                  <i :class="[
                    expandedItems.has(item.path) ? 'fa-chevron-up' : 'fa-chevron-down',
                    'fas text-sm'
                  ]"></i>
                </div>

                <!-- Submenu items -->
                <ul v-if="expandedItems.has(item.path)" class="mt-1 pl-5 submenu">
                  <li v-for="(child, childIdx) in item.children" :key="childIdx" class="py-1">
                    <router-link
                      :to="child.path"
                      @click="closeSidebar"
                      class="flex items-center py-1 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      :class="{ 'active-child': route.path === child.path }">
                      <span>{{ child.name }}</span>
                    </router-link>
                  </li>
                </ul>
              </div>

              <!-- Menu item thông thường (không có submenu) -->
              <router-link
                v-else
                :to="item.path"
                @click="closeSidebar"
                class="flex items-center py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                :class="{ 'active-item': route.path === item.path }">
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

<style scoped>

#MAIN_SIDEBAR{
  width: 300px;
}
  /* CSS tùy chỉnh thanh cuộn cho sidebar */
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    /* Làm cho phần track trong suốt */
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    /* Màu xám nhạt cho thanh cuộn */
    border-radius: 20px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(107, 114, 128, 0.7);
    /* Đậm hơn khi hover */
  }
  /* Chế độ tối */
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(75, 85, 99, 0.5);
    /* Màu tối hơn trong dark mode */
  }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(107, 114, 128, 0.8);
  }
  /* Ẩn thanh cuộn khi không hover vào sidebar (chỉ áp dụng cho desktop) */
  @media (min-width: 768px) {
    .custom-scrollbar::-webkit-scrollbar {
      width: 2px;
      /* Mỏng hơn khi không hover */
      opacity: 0;
      transition: all 0.3s;
    }
    .custom-scrollbar:hover::-webkit-scrollbar {
      width: 4px;
      /* Hiển thị rõ hơn khi hover */
      opacity: 1;
    }
  }
  /* Style cho submenu */
  .submenu {
    font-size: 0.95em;
    margin-left: 0.5rem;
  }
  /* Style cho parent menu khi có mục con được chọn */
  .active-parent {
    background-color: rgba(229, 231, 235, 0.6) !important;
    font-weight: 600;
  }
  .dark .active-parent {
    background-color: rgba(55, 65, 81, 0.4) !important;
  }
  /* Style cho active child item */
  .active-child {
    background-color: rgba(229, 231, 235, 0.8) !important;
    font-weight: 600;
    color: #1d4ed8 !important;
  }
  .dark .active-child {
    background-color: rgba(55, 65, 81, 0.6) !important;
    color: #93c5fd !important;
  }
  /* Item thường (không phải submenu) được chọn */
  .active-item {
    background-color: rgba(229, 231, 235, 0.8) !important;
    color: #1d4ed8 !important;
  }
  .dark .active-item {
    background-color: rgba(55, 65, 81, 0.6) !important;
    color: #93c5fd !important;
  }
  /* Item có submenu */
  .menu-item {
    margin-bottom: 0;
  }
  /* Màu nền cho các danh mục */
  .category-basic {
    background-color: rgba(16, 185, 129, 0.1);
    border-radius: 8px;
    padding: 8px;
  }
  .dark .category-basic {
    background-color: rgba(16, 185, 129, 0.1);
  }
  .category-advanced {
    background-color: rgba(59, 130, 246, 0.1);
    border-radius: 8px;
    padding: 8px;
  }
  .dark .category-advanced {
    background-color: rgba(59, 130, 246, 0.1);
  }
  .category-optional {
    border-radius: 8px;
    padding: 8px;
  }
</style>
