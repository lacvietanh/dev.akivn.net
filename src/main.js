import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
app.use(router)

// Chờ router khởi tạo xong, sau đó mount ứng dụng
router.isReady().then(() => {
  app.mount('#app')
  document.dispatchEvent(new Event('render-event'))
})
