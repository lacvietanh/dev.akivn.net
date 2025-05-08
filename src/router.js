// filepath: /Volumes/DATA/DEV/www/dev.akivn.net/src/router.js
import HomePage from './views/HomePage.vue'

// Dynamically import all markdown files from content directory
const modules = import.meta.glob('./content/**/*.md')

// Function to generate routes from markdown files
const generateRoutesFromModules = () => {
  const contentRoutes = []
  for (const path in modules) {
    const pathParts = path.replace('./content/', '').replace('.md', '').split('/')
    
    let routePath, routeName, category, topic, subtopicName
    
    if (pathParts.length === 2) {
      category = pathParts[0]
      topic = pathParts[1]
      routePath = topic === 'html-css' ? `/basics/html-css` : `/${category}/${topic}`
      routeName = `${category}-${topic}`
      subtopicName = topic;
    } else if (pathParts.length >= 3) { // Allow for deeper nesting e.g. /category/topic/subtopic/subsubtopic
      category = pathParts[0]
      topic = pathParts[1] // The main topic folder
      // The actual "topic" for title purposes will be the last part
      subtopicName = pathParts[pathParts.length - 1]; 
      routePath = `/${pathParts.join('/')}`
      routeName = pathParts.join('-')
    } else {
      continue
    }

    // Tạo route với alias để hỗ trợ cả hai dạng đường dẫn (có hoặc không có dấu / ở cuối)
    // Điều này giúp đảm bảo cả /path và /path/ đều sẽ hoạt động
    const routePathWithoutTrailingSlash = routePath.endsWith('/') 
        ? routePath.slice(0, -1) 
        : routePath;
    const routePathWithTrailingSlash = routePath.endsWith('/') 
        ? routePath 
        : `${routePath}/`;

    contentRoutes.push({
      path: routePathWithoutTrailingSlash,
      name: routeName,
      component: () => import('./views/TopicPage.vue'),
      alias: routePathWithTrailingSlash, // Thêm alias để hỗ trợ cả path có dấu / ở cuối
      meta: {
        // Title can be a very generic fallback, TopicPage.vue will generate the specific one
        title: `${subtopicName.charAt(0).toUpperCase() + subtopicName.slice(1)} - ${category.charAt(0).toUpperCase() + category.slice(1)}`,
        // Description will be fully handled by TopicPage.vue based on content
        // No need for a generic description here anymore
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
