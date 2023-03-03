import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.css';
import 'animate.css';
import 'hover.css/css/hover-min.css';
import 'element-plus/theme-chalk/index.css';
import 'element-plus/theme-chalk/el-notification.css';
import './styles/init.css'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount('#app');

// 恢复登录状态
import { useUserStore } from './store/user';
useUserStore().whoAmI();
