import { ViteSSG } from 'vite-ssg'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import { routes } from './router'
import './style.css'
import hljs from 'highlight.js'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes },
  async ({ app, router, isClient }) => {
    const head = createHead()
    if (!(app._context && app._context.provides && app._context.provides.usehead)) {
      app.use(head)
    }

    // apply highlight.js theme based on stored dark-mode
    if (isClient) {
      const isDark = localStorage.getItem('dark-mode') === 'true'
      const link = document.getElementById('hljs-theme')
      if (link) {
        link.href = `https://unpkg.com/highlight.js/styles/github${isDark ? '-dark' : ''}.css`
      }
    }

    // Here you can register global components, directives, install plugins, etc.

    // Example: determine the language based on the route
    router.beforeEach((to, from, next) => {
      // Add any global route guards here
      next()
    })
  }
)
