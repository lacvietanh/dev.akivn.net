<template>
  <footer class="bg-gray-100 dark:bg-gray-800 py-6 mt-12 border-t border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p class="text-gray-600 dark:text-gray-300">© {{ new Date().getFullYear() }} AkiDEV - AkiNet Tech Docs</p>
        </div>
        <div class="flex space-x-4">
          <a href="https://vuejs.org" target="_blank"
            class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Vue.js</a>
          <a href="https://vite.dev" target="_blank"
            class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Vite</a>
          <a href="https://tailwindcss.com" target="_blank"
            class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Tailwind
            CSS</a>
        </div>
      </div>
    </div>
  </footer>
</template>
