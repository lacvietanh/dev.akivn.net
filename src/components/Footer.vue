<template>
  <footer class="bg-gray-100 dark:bg-gray-800 py-8 md:py-12 mt-16 border-t border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3">
        <!-- About & Credit -->
        <div>
          <h4 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">AkiNet Devs</h4>
          <p class="text-gray-600 dark:text-gray-400 mb-2">© {{ new Date().getFullYear() }} AkiDEV - Tài liệu kỹ thuật
            Akinet.</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">Hệ sinh thái AkiNet sáng tạo và vận hành bởi <a
              href="https://www.facebook.com/lacvietanh" target="_blank"
              class="text-blue-600 dark:text-blue-400 hover:underline">Lạc Việt Anh</a>.</p>

          <!-- Social Links Integration -->
          <div class="mt-4">
            <h5 class="font-medium mb-2 text-gray-700 dark:text-gray-300">Kết nối với Admin:</h5>
            <div class="flex space-x-4">
              <a href="https://m.me/lacvietanh" target="_blank"
                class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-xl"
                aria-label="Messenger">
                <i class="fab fa-facebook-messenger"></i>
              </a>
              <a href="https://github.com/lacvietanh/" target="_blank"
                class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-xl"
                aria-label="GitHub">
                <i class="fab fa-github"></i>
              </a>
              <a href="https://www.facebook.com/lacvietanh" target="_blank"
                class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-xl"
                aria-label="Facebook">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="https://www.linkedin.com/in/lacvietanh" target="_blank"
                class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-xl"
                aria-label="LinkedIn">
                <i class="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Tech Links -->
        <div class="md:col-span-2">
          <h4 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
            <a href="/#technologies" class="hover:underline">Công nghệ sử dụng</a>
          </h4>
          <div class="grid grid-cols-2 gap-2">
            <a href="https://vuejs.org" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Vue.js</a>
            <a href="https://vitejs.dev" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Vite</a>
            <a href="https://bulma.io" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Bulma</a>
            <a href="https://tailwindcss.com" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Tailwind CSS</a>
            <a href="https://firebase.google.com" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Firebase</a>
            <a href="https://nodejs.org" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Node.js</a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">HTTP</a>
            <a href="https://restfulapi.net/" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">RESTful API</a>
            <a href="https://w3schools.com/html" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">W3Schools HTML</a>
            <a href="https://w3schools.com/css" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">W3Schools CSS</a>
            <a href="https://w3schools.com/js" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">W3Schools JS</a>
            <a href="https://tauri.app/" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Tauri v2</a>
            <a href="https://www.typescriptlang.org/" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">TypeScript</a>
            <a href="https://vitest.dev/" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Vitest</a>
            <a href="https://moz.com/beginners-guide-to-seo" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">SEO</a>
            <a href="https://openai.com/" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">AI</a>
          </div>
        </div>

        <!-- Project Links -->
        <div>
          <h4 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
            <a href="/#current-projects" class="hover:underline">Hệ sinh thái AkiNet</a>
          </h4>
          <div class="grid grid-cols-1 gap-2">
            <a href="https://akivn.net" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">AkiNet</a>
            <a href="https://app.akivn.net" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">AkiApp</a>
            <a href="https://cloud.akivn.net" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">AkiCloud</a>
            <a href="https://tachnhac.akivn.net" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">TachNhacv2</a>
            <a href="https://akiworkflow.com" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">AkiWorkflow</a>
          </div>
        </div>

        <!-- Additional Projects -->
        <div>
          <h4 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
            <a href="/#current-projects" class="hover:underline">Dự án liên quan</a>
          </h4>
          <div class="grid grid-cols-1 gap-2">
            <a href="https://studio.oscarfamily.vn" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Oscar Studio</a>
            <a href="https://github.com/lacvietanh/AkiAuto-NimoJackpot" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Aki NimoJackpot</a>
            <a href="https://github.com/lacvietanh/AkiTeleAuto" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Aki TeleAuto</a>
            <a href="https://thptnghiaminh.akivn.net/" target="_blank"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">THPT Nghia Minh</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
