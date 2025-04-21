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
          AkiNet Devs
        </a>
      </div>
      <div class="flex items-center gap-2 sm:gap-4">
        <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Toggle Dark Mode">
          <i class="fas fa-moon dark:fas fa-sun text-gray-600 dark:text-gray-300"></i>
        </button>
        <a href="https://github.com/lacvietanh/dev.akivn.net" target="_blank"
          class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          title="GitHub Repository">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://akivn.net" target="_blank"
          class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" title="AkiNet">
          <img src="/img/icon-akinet-64.png" alt="AkiNet" class="h-6 w-6 rounded-full">
        </a>
      </div>
    </div>
  </header>
</template>
