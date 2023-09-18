import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// MockServiceWorker
const prepare = () => {
  if (process.env.NODE_ENV === 'development') {
    import('./mocks/browser').then(({ worker }) => worker.start({ onUnhandledRequest: 'bypass' }))
  }
  return Promise.resolve()
}

const app = createApp(App)
app.use(createPinia())
app.use(router)

prepare().then(() => {
  app.mount('#app')
})
