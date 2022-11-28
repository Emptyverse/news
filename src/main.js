import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant所有组件
import Vant from 'vant'
import 'vant/lib/index.css'
// 加载全局样式
import './styles/index.less'
// 加载动态设置rem基准值
import 'amfe-flexible'
const { Toast } = Vant
const app = createApp(App)
app.config.globalProperties.$toast = Toast
app.use(store).use(Vant).use(router).mount('#app')
