// 引入css重置
import "normalize.css"
import "./assets/css/index.css"

// 引入router
import router from "./router"
// pinia
import pinia from "./store"

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(router).use(pinia).mount('#app')
