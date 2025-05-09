export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      features: { 'nesting-rules': false } // Disable nesting as Tailwind handles this
    },
    // Use cssnano in production for additional minification
    ...(process.env.NODE_ENV === 'production' ? { 
      'cssnano': {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
        }]
      }
    } : {})
  },
}
