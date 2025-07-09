
import { createApp } from 'vue'
import pinia from '@/stores'

import App from './App.vue'
import router from './router'
const app = createApp(App)


app.use(pinia) // 再注册pinia实例
app.use(router)
app.mount('#app')
