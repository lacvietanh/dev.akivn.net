import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.md'],
  plugins: [
    vue(),
    vueJsx(), // Hỗ trợ JSX trong Vue
    viteStaticCopy({
      targets: [
        {
          src: 'src/content',
          dest: 'assets' // Copy nội dung markdown sang thư mục assets khi build
        }
      ]
    })
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
        manualChunks: (id) => {
          // Tách riêng các thư viện lớn
          if (id.includes('node_modules/vue/') || id.includes('node_modules/vue-router/')) {
            return 'vue';
          }
        }
      }
    },
    // Tối ưu kích thước build
    chunkSizeWarningLimit: 1000
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      // Đảm bảo CSS quan trọng được inline
      preload: 'swap',
      inlineFonts: false,
    },
    dirStyle: 'nested', // Tạo cấu trúc thư mục lồng nhau cho URL
    includedRoutes: (paths) => paths, // Prerender tất cả routes
    onBeforePageRender: (route, html, ctx) => {
      // Đây là nơi bạn có thể làm thêm xử lý với mỗi trang HTML trước khi nó được render
      return html;
    },
    onPageRendered: (route, html, ctx) => {
      // Đây là nơi bạn có thể làm thêm xử lý với mỗi trang HTML sau khi nó được render
      return html;
    },
  }
})
