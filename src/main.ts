import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { worker } from './mocks/browser'

// MockServiceWorker
const prepare = async () => {
  if (process.env.NODE_ENV === 'development') {
    await worker.start({ onUnhandledRequest: 'bypass' })
  }
}

const app = createApp(App)
app.use(createPinia())
app.use(router)

prepare().then(() => {
  app.mount('#app')
})
