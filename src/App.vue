<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
    <Header @toggle-sidebar="toggleSidebar" />

    <!-- Mobile Sidebar Overlay (shown only when sidebar is open on mobile) -->
    <div v-if="isSidebarOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 z-20 md:hidden" @click="toggleSidebar">
    </div>

    <!-- Phần giữa: Sidebar và Content -->
    <div class="flex-grow flex">
      <!-- Sidebar - fixed position on mobile when open, normal position on desktop -->
      <Sidebar :class="[
        'transition-transform duration-300 ease-in-out',
        'fixed md:relative top-0 left-0 h-full z-30',
        'w-64 shrink-0 md:translate-x-0 bg-white dark:bg-gray-900',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]" @close-sidebar="isSidebarOpen = false" />

      <!-- Main content container -->
      <main class="flex-grow overflow-x-hidden px-4 py-6">
        <div class="container mx-auto">
          <RouterView />
        </div>
      </main>
    </div>

    <Footer />
  </div>
</template>
