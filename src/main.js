import { ViteSSG } from 'vite-ssg'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import { routes } from './router'
import './style.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes },
  async ({ app, router, isClient, initialState }) => {
    const head = createHead()
    app.use(head)

    // Here you can register global components, directives, install plugins, etc.

    // Example: determine the language based on the route
    router.beforeEach((to, from, next) => {
      // Add any global route guards here
      next()
    })
  },
  {
    // Cấu hình SSG
    rootContainer: '#app',
    transformState(state) {
      return state
    },
    onBeforePageRender() {},
    onAfterPageRender() {},
    criticalCss: true, // Đảm bảo CSS quan trọng được inline
  }
)
