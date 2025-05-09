<script setup>
import { ref, Suspense } from 'vue'
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'
import { getPreloadLinks, getManifest } from './utils/css-preload'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Add preload for critical CSS files
useHead({
  link: getPreloadLinks(getManifest())
})
</script>

<template>
  <div class="bg-white dark:bg-gray-900 flex flex-col min-h-screen">
    <Header @toggle-sidebar="toggleSidebar" class="flex-shrink-0" />

    <!-- Mobile Sidebar Overlay (shown only when sidebar is open on mobile) -->
    <div v-if="isSidebarOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 z-20 md:hidden" @click="toggleSidebar">
    </div>

    <!-- Phần giữa: Sidebar và Content -->
    <div class="flex-grow flex relative">
      <!-- Sidebar container - fixed position on mobile, sticky on desktop -->
      <div :class="[
        'transition-transform duration-300 ease-in-out',
        'fixed md:sticky md:self-start top-0 left-0 z-30',
        'w-65 md:w-80 md:translate-x-0 bg-white dark:bg-gray-900',
        'h-screen max-h-screen',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]">
        <Sidebar class="h-full" @close-sidebar="isSidebarOpen = false" />
      </div>

      <!-- Main content container - scrollable with footer below fold -->
      <div class="flex-grow flex flex-col">
        <main class="flex-grow px-4 py-6 min-h-screen">
          <div class="container mx-auto">
            <Suspense>
              <template #default>
                <RouterView />
              </template>
              <template #fallback>
                <div class="flex justify-center items-center min-h-[calc(100vh-200px)]">
                  <p class="text-xl text-gray-500 dark:text-gray-400">Đang tải trang...</p>
                  {/* Optional: Add a spinner animation */}
                </div>
              </template>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
    <Footer class="mt-auto" />
  </div>
</template>
