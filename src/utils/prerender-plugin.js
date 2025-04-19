import path from 'path'
import fs from 'fs'
import Prerenderer from '@prerenderer/prerenderer'
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer'

// Danh sách các route cần pre-render
const routesToPrerender = [
  '/',
  '/basics/html',
  '/vue/vite-setup',
  // Thêm các route khác cần pre-render tại đây
]

export default function vitePrerender(options = {}) {
  const pluginOptions = {
    staticDir: path.resolve(process.cwd(), 'dist'),
    outputDir: path.resolve(process.cwd(), 'dist'),
    indexPath: path.resolve(process.cwd(), 'dist', 'index.html'),
    ...options
  }

  return {
    name: 'vite-plugin-prerender',
    apply: 'build', // Chỉ chạy khi build
    enforce: 'post', // Chạy sau khi build xong
    closeBundle: async () => {
      console.log('\n🔍 Bắt đầu pre-render các trang...')

      const prerenderer = new Prerenderer({
        staticDir: pluginOptions.staticDir,
        outputDir: pluginOptions.outputDir,
        indexPath: pluginOptions.indexPath,
        renderer: new PuppeteerRenderer({
          headless: false, // Run in headful mode for debugging
          renderAfterDocumentEvent: 'render-event', // Vue sẽ emit sự kiện này khi đã sẵn sàng
          timeout: 60000, // Increase timeout to 60 seconds
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
      })

      try {
        await prerenderer.initialize()
        const renderedRoutes = await prerenderer.renderRoutes(routesToPrerender)

        // Lưu các file đã pre-render
        for (const route of renderedRoutes) {
          const outputPath = path.join(pluginOptions.outputDir, route.route === '/' ? 'index.html' : `${route.route}/index.html`)
          const outputDir = path.dirname(outputPath)

          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true })
          }

          fs.writeFileSync(outputPath, route.html)
          console.log(`✅ Pre-rendered: ${route.route}`)
        }

        await prerenderer.destroy()
        console.log('🎉 Pre-rendering hoàn tất!')
      } catch (error) {
        console.error('❌ Lỗi khi pre-render:', error)
        throw error
      }
    }
  }
}
