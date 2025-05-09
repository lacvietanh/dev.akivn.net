/**
 * Utility for managing CSS preloading
 * This helps improve performance by preloading critical CSS files
 */
import { useSSRContext } from 'vue'

// List of CSS chunks that should be preloaded for better performance
const CRITICAL_CSS_CHUNKS = ['index', 'components']

/**
 * Generates preload links for critical CSS files based on the manifest
 * To be used in the App.vue component
 * @param {object} manifest - The Vite manifest object (optional in dev mode)
 * @returns {Array} - Array of link objects for useHead
 */
export function getPreloadLinks(manifest) {
  // In development, we don't have a manifest
  if (!manifest || process.env.NODE_ENV === 'development') {
    return []
  }
  
  const preloadLinks = []
  
  // Find CSS files from manifest that match our critical chunks
  Object.entries(manifest).forEach(([key, value]) => {
    if (value.css) {
      const isCritical = CRITICAL_CSS_CHUNKS.some(chunkName => 
        key.includes(chunkName) || value.file.includes(chunkName)
      )
      
      if (isCritical) {
        value.css.forEach(cssFile => {
          preloadLinks.push({
            rel: 'preload',
            href: `/${cssFile}`,
            as: 'style'
          })
        })
      }
    }
  })
  
  return preloadLinks
}

/**
 * Gets the manifest in SSR context
 * @returns {object|null} - The manifest object or null in development
 */
export function getManifest() {
  if (import.meta.env.SSR) {
    const ssrContext = useSSRContext()
    return ssrContext?.manifest || null
  }
  
  // In client side, we don't have direct access to the manifest
  return null
}
