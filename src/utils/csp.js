// CSP Configuration for AkiDev website
// This will be loaded in the Head component

/**
 * Generate Content Security Policy for improved security and resource loading
 * @returns {string} CSP string to be included in meta tag
 */
export function generateCSP() {
  // Define sources for different resource types
  const sources = {
    default: ["'self'"],
    script: ["'self'", "'unsafe-inline'"],  // Allow inline scripts for Vue hydration
    style: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
    img: ["'self'", "data:", "https://*.akivn.net", "https://cdnjs.cloudflare.com"],
    font: ["'self'", "https://cdnjs.cloudflare.com"],
    connect: ["'self'", "https://*.akivn.net", "https://firebase.googleapis.com"],
    frame: ["'self'"],
    object: ["'none'"],
    media: ["'self'"],
    manifest: ["'self'"]
  };

  // Build the CSP string
  const policy = Object.entries(sources)
    .map(([directive, sources]) => {
      return `${directive}-src ${sources.join(' ')}`;
    })
    .join('; ');

  return policy;
}

/**
 * Get preload links for critical resources
 * @param {Object} manifest - The Vite manifest object
 * @returns {Array} Array of preload link objects
 */
export function getCriticalPreloads(manifest) {
  // If no manifest available (in dev mode)
  if (!manifest) {
    return [];
  }

  const preloads = [];

  // Critical CSS files to preload
  const criticalCssChunks = ['index', 'components'];
  
  // Add preloads for critical CSS files
  Object.entries(manifest).forEach(([key, value]) => {
    if (value.css) {
      const isCritical = criticalCssChunks.some(chunkName => 
        key.includes(chunkName) || value.file.includes(chunkName)
      );
      
      if (isCritical) {
        value.css.forEach(cssFile => {
          preloads.push({
            rel: 'preload',
            href: `/${cssFile}`,
            as: 'style'
          });
        });
      }
    }
  });
  
  // Add preload for Font Awesome (critical icon font)
  preloads.push({
    rel: 'preload',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
    as: 'style',
    crossorigin: 'anonymous'
  });

  return preloads;
}
