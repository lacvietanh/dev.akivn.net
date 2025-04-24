import { ViteSSG } from 'vite-ssg'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import { routes } from './router'
import './style.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes },
  async ({ app, router }) => {
    const head = createHead()
    if (!(app._context && app._context.provides && app._context.provides.usehead)) {
      app.use(head)
    }

    // Here you can register global components, directives, install plugins, etc.

    // Example: determine the language based on the route
    router.beforeEach((to, from, next) => {
      // Add any global route guards here
      next()
    })
  }
)
