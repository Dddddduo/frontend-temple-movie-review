import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue'; // 引入组件库

const app = createApp(App);
app.use(router);
app.use(Antd); // 注册 Ant Design Vue

app.mount('#app');