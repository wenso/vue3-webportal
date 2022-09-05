import { system } from './system/index'
import { base } from './base/index'
import { createApp } from 'vue'
import App from '../core/App.vue'
import ElementUI from 'element-plus'

//加载模块
const modules= {
    system,
    base
};
const app = createApp(App);
app.use(ElementUI);

export { default as store } from './store';
export { default as router } from './router';
export { default as Starter } from './utils/starter.js';
export { app };
export { modules };
export { default as mock } from './mock';