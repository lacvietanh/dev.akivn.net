import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'
// SSR head injection will be handled by ViteSSG via returned head instance

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.md'],
  plugins: [
    vue(),
    vueJsx(), // Hỗ trợ JSX trong Vue
    viteStaticCopy({
      targets: [
        {
          src: 'src/content/*',
          dest: 'assets'
        },
        {
          src: 'src/content/**/*',
          dest: 'assets'
        }
      ],
      flatten: false
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
    minify: 'esbuild',
    esbuildOptions: {
      drop: ['console', 'debugger'], // Loại bỏ console.log trong production
      legalComments: 'none', // Loại bỏ comments
      treeShaking: true, // Đảm bảo tree shaking được bật
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Chia nhỏ các dependencies vào các chunks riêng biệt
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('@vueuse') || id.includes('vue-router')) {
              return 'vue-core';
            }
            if (id.includes('markdown-it')) {
              return 'markdown';
            }
            if (id.includes('highlight.js')) {
              return 'highlight';
            }
            // Các dependencies khác có thể thêm vào đây
            return 'vendor'; // Chunk cho các dependencies còn lại
          }
          
          // Phân chia code theo tính năng
          if (id.includes('/src/components/')) {
            return 'components';
          }
          if (id.includes('/src/views/')) {
            return 'views';
          }
          if (id.includes('/src/utils/')) {
            return 'utils';
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
      preload: 'swap',
      inlineFonts: false,
    },
    dirStyle: 'nested',
    includedRoutes: (paths) => paths,
    onBeforePageRender: (route, html, ctx) => {
      // Ensure head tags are processed
      if (ctx.head) {
        ctx.head.resolveTags()
        if (route && route.path !== undefined) { // Chỉ log khi route.path được định nghĩa
          console.log(`[ViteSSG] Rendering route: ${route.path}, head tags resolved:`, !!ctx.head)
        }
      }
      
      // Replace any remaining %headTags% placeholders
      html = html.replace(/%headTags%/g, '<!-- Head tags injected by ViteSSG -->');
      
      return html
    },
    onPageRendered: (route, html, ctx) => {
      // Check if we have title tags in head section
      if (route && route.path !== undefined) { // Chỉ log khi route.path được định nghĩa
        const hasTitle = html.includes('<title>') && !html.includes('<title>AkiNet Devs</title>')
        console.log(`[ViteSSG] Page rendered for ${route.path}: Has proper title: ${hasTitle}`)
      }
      
      // Fix the [object Object] in __INITIAL_STATE__
      html = html.replace(
        /<script>window\.__INITIAL_STATE__\s*=\s*\[object Object\]<\/script>/g, 
        '<script>window.__INITIAL_STATE__={};</script>'
      )
      
      // Replace %bodyTags% placeholder if still exists
      html = html.replace(/%bodyTags%/g, '<!-- Body tags injected by ViteSSG -->');
      
      return html
    }
  }
})
