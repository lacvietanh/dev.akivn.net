<script setup>
import Head from '../components/Head.vue';
</script>

<template>
<Head
    title="404 - Không tìm thấy trang | Dev.akivn.net"
    description="Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển."
    keywords="404, không tìm thấy, AkiNet Devs"
    :url="'/404'"
  />
  <div class="flex flex-col items-center justify-center py-12">
    <h1 class="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">404 - Không tìm thấy trang</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
    <router-link to="/" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition">
      Quay về trang chủ
    </router-link>
  </div>
</template>
