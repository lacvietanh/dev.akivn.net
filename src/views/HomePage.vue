<script setup>
import SEO from '../components/SEO.vue';
</script>

<template>
  <SEO 
    title="Dev.akivn.net - Tài liệu kỹ thuật tiếng Việt"
    description="Tài liệu và hướng dẫn tiếng Việt về Vue, Vite, Firebase, Tailwind, và các công nghệ khác được sử dụng tại Akinet."
    keywords="vue, vite, javascript, học lập trình, tài liệu tiếng việt, firebase, nodejs"
  />
  <div class="prose dark:prose-invert max-w-none">
    <h1 class="text-3xl font-bold mb-6">Tài liệu kỹ thuật Dev.akivn.net</h1>
    
    <div class="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-8">
      <p class="text-lg">
        Chào mừng bạn đến với trang tài liệu kỹ thuật tiếng Việt dành cho nhân viên và học viên của Akinet.
        Website này cung cấp các hướng dẫn và tài liệu về các công nghệ được sử dụng tại Akinet.
      </p>
    </div>

    <h2 class="text-2xl font-semibold mb-4">Bắt đầu từ đâu?</h2>
    <p>Nếu bạn là người mới bắt đầu, chúng tôi khuyên bạn nên làm theo lộ trình sau:</p>
    
    <ol class="list-decimal pl-6 mb-8">
      <li class="mb-2">
        <strong>Kiến thức nền tảng</strong> - Học về HTML, CSS, JavaScript, và các công cụ cơ bản
      </li>
      <li class="mb-2">
        <strong>Công cụ phát triển</strong> - Làm quen với các công cụ cần thiết cho việc phát triển
      </li>
      <li class="mb-2">
        <strong>Vue.js</strong> - Framework chính được sử dụng tại Akinet
      </li>
      <li class="mb-2">
        <strong>CSS Frameworks</strong> - Tailwind CSS và Bulma cho thiết kế giao diện
      </li>
      <li class="mb-2">
        <strong>Firebase</strong> - Nền tảng backend được sử dụng trong nhiều dự án
      </li>
    </ol>

    <h2 class="text-2xl font-semibold mb-4">Các khóa học nổi bật</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">HTML &amp; CSS cơ bản</h3>
        <p class="mb-4">Làm quen với nền tảng của web development</p>
        <router-link to="/basics/html" class="text-blue-600 dark:text-blue-400 hover:underline">Bắt đầu học →</router-link>
      </div>
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">JavaScript cơ bản</h3>
        <p class="mb-4">Học ngôn ngữ lập trình cho web</p>
        <router-link to="/basics/javascript" class="text-blue-600 dark:text-blue-400 hover:underline">Bắt đầu học →</router-link>
      </div>
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">Vue.js cơ bản</h3>
        <p class="mb-4">Framework JavaScript hiện đại</p>
        <router-link to="/vue/vite-setup" class="text-blue-600 dark:text-blue-400 hover:underline">Bắt đầu học →</router-link>
      </div>
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">Tailwind CSS</h3>
        <p class="mb-4">Framework CSS utility-first</p>
        <router-link to="/css/tailwind" class="text-blue-600 dark:text-blue-400 hover:underline">Bắt đầu học →</router-link>
      </div>
    </div>
  </div>
</template>
