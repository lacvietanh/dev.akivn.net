import { ViteSSG } from 'vite-ssg'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import { routes } from './router'
import './style.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes },
  // Setup application and attach unhead instance to SSG context
  async (ctx) => {
    // Create unhead instance and register to app
    const head = createHead({
      // Ensure updates are synchronized
      titleTemplate: '%s',
      shouldRenderSSRHead: true // Force SSR head rendering
    });
    
    // ctx.app.use(head); // Temporarily commented out to test vite-ssg auto-registration

    // Here you can register global components, directives, install plugins, etc.

    // Example: determine the language based on the route
    ctx.router.beforeEach((to, from, next) => {
      // Add any global route guards here
      next();
    });
    // Return head to enable automatic HTML head injection
    return { head };
  },
  {
    // Cấu hình SSG
    rootContainer: '#app',
    transformState(state) {
      // Ensure state is properly serialized
      return JSON.stringify(state || {})
    },
    onBeforePageRender() {},
    onAfterPageRender() {},
    criticalCss: true, // Đảm bảo CSS quan trọng được inline
  }
)
