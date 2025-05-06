// filepath: /Volumes/DATA/DEV/www/dev.akivn.net/src/router.js
import HomePage from './views/HomePage.vue'

// Dynamically import all markdown files from content directory
const modules = import.meta.glob('./content/**/*.md')

// Function to generate routes from markdown files
const generateRoutesFromModules = () => {
  const contentRoutes = []
  for (const path in modules) {
    // Xử lý cả file trong thư mục con và file trực tiếp
    // ./content/category/topic.md  -> /category/topic
    // ./content/category/topic/subtopic.md -> /category/topic/subtopic
    const pathParts = path.replace('./content/', '').replace('.md', '').split('/')
    
    let routePath, routeName, category, topic
    
    if (pathParts.length === 2) {
      // Đường dẫn cơ bản: /category/topic
      category = pathParts[0]
      topic = pathParts[1]
      
      // Special case for combined html-css
      routePath = topic === 'html-css' ? `/basics/html-css` : `/${category}/${topic}`
      routeName = `${category}-${topic}`
    } else if (pathParts.length === 3) {
      // Đường dẫn submenu: /category/topic/subtopic
      category = pathParts[0]
      topic = pathParts[1]
      const subtopic = pathParts[2]
      
      routePath = `/${category}/${topic}/${subtopic}`
      routeName = `${category}-${topic}-${subtopic}`
    } else {
      // Bỏ qua các file không khớp mẫu
      continue
    }

    contentRoutes.push({
      path: routePath,
      name: routeName,
      component: () => import('./views/TopicPage.vue'),
      meta: {
        description: pathParts.length === 3
          ? `Tài liệu về ${pathParts[2]} trong ${pathParts[1]} của ${pathParts[0]}`
          : `Tài liệu về ${topic} trong ${category}`
      }
    })
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
      title: 'AkiDEV | Trang tài liệu Tiếng Việt hỗ trợ lập trình hệ sinh thái AkiNet',
      description: 'AkiDEV | Trang tài liệu Tiếng Việt hỗ trợ lập trình hệ sinh thái AkiNet. Lộ trình lập trình web/app cơ bản đến nâng cao cho học viên và nhân viên'
    }
  },
  // Add dynamically generated routes
  ...generateRoutesFromModules(),

  // Catch-all 404 route
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./views/NotFoundPage.vue'),
    meta: {
      title: '404 - Không tìm thấy trang | AkiDev',
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
