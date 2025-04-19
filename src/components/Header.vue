<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['toggle-sidebar'])

const toggleDarkMode = () => {
  const isDark = document.documentElement.classList.toggle('dark')
  localStorage.setItem('dark-mode', isDark.toString())
}

const toggleSidebar = () => {
  emit('toggle-sidebar')
}
</script>

<template>
  <header class="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <!-- Hamburger menu button (visible only on mobile) -->
        <button @click="toggleSidebar"
          class="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 md:hidden"
          aria-label="Toggle menu">
          <i class="fas fa-bars"></i>
        </button>

        <a href="/" class="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
          Dev.akivn.net
        </a>
      </div>
      <div class="flex items-center gap-2 sm:gap-4">
        <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <i class="fas fa-moon dark:fas fa-sun text-gray-600 dark:text-gray-300"></i>
        </button>
        <!-- Ẩn text trên mobile, chỉ hiện trên tablet/desktop -->
        <a href="https://akivn.net" target="_blank"
          class="hidden sm:inline text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          AkiNet
        </a>
        <a href="https://m.me/lacvietanh" target="_blank"
          class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          <i class="fab fa-facebook-messenger"></i>
        </a>
        <a href="https://github.com/lacvietanh/dev.akivn.net" target="_blank"
          class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://www.facebook.com/lacvietanh" target="_blank"
          class="hidden sm:inline-block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="https://www.linkedin.com/in/lacvietanh" target="_blank"
          class="hidden sm:inline-block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          <i class="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  </header>
</template>
