/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  // Specify files to safelist if certain classes are dynamically generated
  safelist: [
    // Add any classes that might be dynamically generated here
    // For example: 'bg-red-500', 'text-blue-700', etc.
  ]
}
