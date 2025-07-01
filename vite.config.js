import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'
import fs from 'fs'
// SSR head injection will be handled by ViteSSG via returned head instance

// Plugin tùy chỉnh để fetch projects.json trước khi build
function fetchProjectsPlugin() {
  return {
    name: 'fetch-projects',
    async buildStart() {
      console.log('[FetchProjects] Fetching projects.json from akivn.net...')
      try {
        const response = await fetch('https://akivn.net/json/projects.json')
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        const assetsDir = path.resolve(process.cwd(), 'src/assets')
        if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true })
        const filePath = path.resolve(assetsDir, 'projects.json')
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
        console.log('[FetchProjects] ✅ Successfully fetched and saved projects.json')
      } catch (error) {
        console.warn('[FetchProjects] ⚠️ Failed to fetch projects.json:', error.message)
        console.warn('[FetchProjects] Continuing build without updating projects.json...')
        const existingFilePath = path.resolve(process.cwd(), 'src/assets/projects.json')
        if (fs.existsSync(existingFilePath)) console.log('[FetchProjects] Using existing projects.json file')
        else console.warn('[FetchProjects] No existing projects.json found')
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.md'],
  plugins: [
    fetchProjectsPlugin(), // Plugin fetch projects.json trước khi build
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
    // Place non-CSS assets under assets/, but CSS at root
    assetsDir: '',
    emptyOutDir: true,
    minify: 'esbuild',
    // Gộp tất cả CSS vào một file duy nhất để đáp ứng yêu cầu plan.md
    cssCodeSplit: false,
    // Generate manifest for easier asset reference
    manifest: true,
    esbuildOptions: {
      drop: ['console', 'debugger'], // Loại bỏ console.log trong production
      legalComments: 'none', // Loại bỏ comments
      treeShaking: true, // Đảm bảo tree shaking được bật
    },
    rollupOptions: {
      output: {
        // Cấu hình đặt tên cho các file assets (bao gồm CSS)
        assetFileNames: (assetInfo) => {
          // Output Tailwind CSS bundle as akidev.css at dist root
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'akidev.css';
          }
          // Other assets go into assets/ folder
          return 'assets/[name]-[hash][extname]';
        },
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
    // Disable critical CSS inlining entirely
    criticalCss: false,
    // Turn off Critters plugin to prevent any CSS inlining
    crittersOptions: false,
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
      );

      // Replace %bodyTags% placeholder if still exists
      html = html.replace(/%bodyTags%/g, '<!-- Body tags injected by ViteSSG -->');

      // Modify CSS link tag to include name attribute and cache-busting hash
      const cacheBustQuery = new Date().getTime();
      html = html.replace(
        /(<link\s+rel="stylesheet")(\s+href=")(\/akidev\.css)(")(>)/gi,
        (match, p1, p2, p3, p4, p5) => {
          // Insert name="akidev" and append cache buster
          return `${p1} name="akidev"${p2}${p3}?r=${cacheBustQuery}${p4}${p5}`;
        }
      );

      return html
    }
  }
})
