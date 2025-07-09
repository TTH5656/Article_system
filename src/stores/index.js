import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persist) // 先给pinia实例添加插件
export default pinia
export * from './modules/user'
export * from './modules/counter'
