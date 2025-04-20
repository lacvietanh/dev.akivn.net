import HomePage from '../views/HomePage.vue'

// Dynamically import all markdown files from content directory
const modules = import.meta.glob('../content/**/*.md')

// Function to generate routes from markdown files
const generateRoutesFromModules = () => {
  const contentRoutes = []
  for (const path in modules) {
    const match = path.match(/\.\.\/content\/(.*)\/(.*)\.md$/)
    if (match) {
      const category = match[1]
      const topic = match[2]
      // Special case for combined html-css
      const routePath = topic === 'html-css' ? `/basics/html-css` : `/${category}/${topic}`
      const routeName = `${category}-${topic}` // Ensure unique names

      contentRoutes.push({
        path: routePath,
        name: routeName,
        component: () => import('../views/TopicPage.vue'),
        meta: {
          // You might want to dynamically load meta from markdown frontmatter later
          description: `Tài liệu về ${topic} trong ${category}`
        }
      })
    }
  }
  return contentRoutes
}

// Danh sách các routes - exported for Vite SSG
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'Dev.akivn.net - Tài liệu kỹ thuật tiếng Việt',
      description: 'Tài liệu và hướng dẫn tiếng Việt về Vue, Vite, Firebase, Bulma, Tailwind, và các công nghệ khác được sử dụng tại Akinet.'
    }
  },
  // Add dynamically generated routes
  ...generateRoutesFromModules(),

  // Catch-all 404 route
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundPage.vue'),
    meta: {
      title: '404 - Không tìm thấy trang | Dev.akivn.net',
      description: 'Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.'
    }
  }
]

// Default export for backward compatibility or specific router setup needs
export default {
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  }
}
