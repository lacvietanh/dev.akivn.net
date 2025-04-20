<script setup>
import Head from '../components/Head.vue';
</script>

<template>
  <Head 
    title="Dev.akivn.net - Tài liệu kỹ thuật tiếng Việt"
    description="Tài liệu và hướng dẫn tiếng Việt về Vue, Vite, Firebase, Bulma, Tailwind, và các công nghệ khác được sử dụng tại Akinet."
    keywords="vue, vite, javascript, học lập trình, tài liệu tiếng việt, firebase, nodejs, bulma, tailwind"
  />
  <div class="space-y-12 md:space-y-16">
    <!-- Hero Section -->
    <section class="text-center pt-8 pb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-sm">
      <h1 class="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 dark:text-gray-100">Chào mừng đến AkiNet Devs</h1>
      <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
        Trang tài liệu kỹ thuật tiếng Việt dành cho nhân viên và học viên của Akinet. Khám phá các hướng dẫn và tài liệu về công nghệ web hiện đại.
      </p>
    </section>

    <!-- Learning Roadmap Section -->
    <section id="learning-roadmap" class="scroll-mt-16">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">Lộ trình học tập</h2>
      <div class="grid md:grid-cols-2 gap-8">
        
        <!-- Basic Roadmap -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-400">Lộ trình căn bản (tối thiểu)</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Những kiến thức và công cụ nền tảng bạn cần nắm vững để làm việc với frontend:</p>
          <ul class="space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li><strong>HTML & CSS:</strong> Ngôn ngữ xây dựng cấu trúc và giao diện web.</li>
            <li><strong>JavaScript:</strong> Ngôn ngữ lập trình thiết yếu cho web tương tác.</li>
            <li><strong>Công cụ phát triển:</strong> VS Code (Editor), Git (Version Control), Node.js/npm (Runtime & Package Manager).</li>
            <li><strong>Bulma:</strong> Framework CSS chính, dựa trên Flexbox, giúp xây dựng giao diện nhanh chóng.</li>
            <li><strong>Vue.js (với Vite):</strong> Framework JavaScript hiện đại, hiệu năng cao để xây dựng UI.</li>
            <li><strong>Firebase (Frontend):</strong> Sử dụng các dịch vụ cơ bản như Authentication (Xác thực), Firestore (Database NoSQL), Cloud Storage (Lưu trữ file) từ phía client.</li>
          </ul>
        </div>

        <!-- Advanced Roadmap -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-2xl font-semibold mb-4 text-green-700 dark:text-green-400">Lộ trình nâng cao</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Đi sâu hơn vào hệ sinh thái, backend và các kỹ thuật nâng cao:</p>
          <ul class="space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li><strong>Vue Ecosystem:</strong> Vue Router (Định tuyến), Vuex (Quản lý trạng thái tập trung).</li>
            <li><strong>Node.js:</strong> Xây dựng backend, API và xử lý logic phía server.</li>
            <li><strong>Firebase (Advanced):</strong> Cloud Functions (Backend logic), Security Rules nâng cao..</li>
            <li><strong>Tailwind CSS:</strong> Framework CSS Utility-first, sử dụng để tùy chỉnh chi tiết (dùng phụ trợ).</li>
            <li><strong>Testing:</strong> Vitest/Vue Test Utils để đảm bảo chất lượng mã nguồn.</li>
            <li><strong>TypeScript:</strong> Bổ sung kiểu tĩnh cho JavaScript, tăng độ tin cậy cho dự án lớn.</li>
             <li><strong>SSR/SSG:</strong> Kỹ thuật tối ưu hóa hiệu suất và SEO (ví dụ: ViteSSG).</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Featured Technologies Section -->
    <section>
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">Công nghệ nổi bật</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- HTML/CSS Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">HTML & CSS</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">Nền tảng không thể thiếu của mọi trang web, định hình cấu trúc và giao diện.</p>
          <router-link to="/basics/html" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Tìm hiểu thêm →</router-link>
        </div>

        <!-- JavaScript Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">JavaScript</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">Ngôn ngữ lập trình của web, tạo ra sự tương tác và tính năng động.</p>
          <router-link to="/basics/javascript" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Tìm hiểu thêm →</router-link>
        </div>

        <!-- Vue.js Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Vue.js & Vite</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">Framework JavaScript tiến bộ và công cụ build siêu tốc cho trải nghiệm phát triển mượt mà.</p>
          <router-link to="/vue/vite-setup" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Tìm hiểu thêm →</router-link>
        </div>

        <!-- Bulma Card -->
         <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Bulma</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">Framework CSS hiện đại, dễ sử dụng, dựa trên Flexbox, là lựa chọn chính tại Akinet.</p>
          <router-link to="/css/bulma" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Tìm hiểu thêm →</router-link> <!-- Adjust link later -->
        </div>

        <!-- Firebase Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Firebase</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">Nền tảng mạnh mẽ từ Google giúp xây dựng backend, quản lý dữ liệu và xác thực người dùng.</p>
          <router-link to="/firebase/introduction" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Tìm hiểu thêm →</router-link> <!-- Adjust link later -->
        </div>
        
        <!-- Tailwind CSS Card -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Tailwind CSS</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">Framework Utility-first linh hoạt, dùng để tinh chỉnh giao diện khi cần thiết.</p>
          <router-link to="/css/tailwind" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">Tìm hiểu thêm →</router-link>
        </div>

      </div>
    </section>
  </div>
</template>
