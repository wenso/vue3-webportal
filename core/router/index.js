import { createRouter, createWebHistory } from 'vue-router'
import settings from  '../base/config/index'



export const router =createRouter({
    history: createWebHistory( import.meta.env.VITE_BUILD_MODE === 'devops'
        ? import.meta.env.VITE_BASE_URL
        : import.meta.env.VITE_APP_URL),
    routes: settings.authRouters,
    scrollBehavior: () => ({ left: 0, top: 0 })
});


export default router