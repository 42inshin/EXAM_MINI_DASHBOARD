import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// MockServiceWorker
if (process.env.NODE_ENV === 'development') {
  import('./mocks/browser').then(({ worker }) => worker.start({ onUnhandledRequest: 'bypass' }))
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
