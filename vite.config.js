import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import vitePrerender from './src/utils/prerender-plugin'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        // Thêm các thuộc tính SEO mặc định
        compilerOptions: {
          isCustomElement: (tag) => ['meta', 'title', 'link'].includes(tag),
        }
      }
    }),
    vueJsx(), // Hỗ trợ JSX trong Vue
    viteStaticCopy({
      targets: [
        {
          src: 'src/content',
          dest: 'assets' // Copy nội dung markdown sang thư mục assets khi build
        }
      ]
     }),
    vitePrerender() // Áp dụng plugin pre-render
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Alias cho import ngắn gọn
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Loại bỏ console.log trong production
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'], // Tách riêng các thư viện lớn
          // Let Vite handle other vendor chunks automatically
        }
      }
    },
    // Tối ưu kích thước build
    chunkSizeWarningLimit: 1000
  }
})
