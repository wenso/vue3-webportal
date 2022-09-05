import Request from "./request";
import _ from 'lodash-es'
import cache from "./cache";
import Layout from "../base/layout";
import Developing from "../base/views/error/ErrDev";

let Starter={
    $router:null,
    $store:null,
    $settings:null
};
Starter.install=function(app,options){
    const {store,router,settings,socket} =options;
    Starter.$router=router;
    Starter.$store=store;
    Starter.$settings=settings;
    app.config.globalProperties.$LS=_;

    //elementUI配置选项
    if(Starter.$settings.elementUI){
        app.config.globalProperties.$ELEMENT ={
            size:Starter.$settings.elementUI.size ||"",
            zIndex:Starter.$settings.elementUI.zIndex || 2000
        };
    }
    if(Starter.$settings.socket.enable&&socket){
        app.use(socket,Starter.$settings.socket.service);
    }
    //注册全局api
    if(Starter.$settings){
        Request.registerRequest(Starter.$settings);
        app.config.globalProperties.$HTTP = Request;
        window.$HTTP=Request;
    }
    //全局配置
    app.config.globalProperties.$SETTINGS =Starter.$settings;
    window.$SETTINGS=Starter.$settings;
    app.use(Starter.$store);
    app.use(Starter.$router);

    const TOKEN_NAME="token";
    //白名单列表
    const whiteList = [
        //'/logout',
        '/login',
        '/register',
        '/forgot-passoword'
    ];
    //是否已经下载到路由
    let hasRoute=false;
    Starter.$router.beforeEach(async (to, from, next) => {
        // 设置页面标题
        //document.title = to.meta.title;
        // 判断用户是否已登录

        //cache.setLS(TOKEN_NAME,'wenso-token');
        const hasToken = cache.getLS(TOKEN_NAME);
        let routeSize=Starter.$store.getters['base/routes'].length;
        if (hasToken) {
                
                //如果本地有缓存的token
                //如果url中包含redirect，跳转到目标连接。
                if (import.meta.env.VITE_SSO_CENTER) {
                    if (to.query.redirect) {
                        window.location.href = to.query.redirect;
                        return;
                    }//如果没有redirect，跳转到VUE_HOMEPAGE_URL
                    else if (import.meta.env.VITE_HOMEPAGE_URL && (import.meta.env.VITE_PLATFORM_URL) !== import.meta.env.VITE_HOMEPAGE_URL) {
                        window.location.href = import.meta.env.VITE_HOMEPAGE_URL;
                        return;
                    }
                }

                //如果跳转到登录页
                if (to.path === '/login') {
                    next({path: '/'});
                }
                //如果跳转到登出页
                else if (to.path === '/logout') {
                    //访问登出接口,清空本地缓存并reload页面
                    location.reload();
                } else {

                    //const hasUserInfo = this.$store.getters['base/user'];
                    if (Starter.$store.getters['base/routes'].length) {
                        //如果已经获得了服端路由,直接访问.或者获取更新子页面按钮权限路由后，跳转
                        next();
                    } else {
                        try {
                            // 获取用户信息
                            await Starter.$store.dispatch('base/getUserProfile');
                            // 获取路由列表
                            const routes = await Starter.$store.dispatch('base/getRouterList');
                            hasRoute = true;
                            routes.forEach(item => {
                                router.addRoute(item)
                            })
                            next({...to, replace: true})
                        } catch (error) {
                            await Starter.$store.dispatch('base/cleanToken');
                            location.reload();
                        }
                    }
                }

        } else {
            if (whiteList.includes(to.path)) {
                //如果访问路由在白名单内
                //如果to.path为login
                if (to.path === '/login') {
                    if (import.meta.env.VITE_SSO_CENTER) {
                        location.href = to.query.redirect ? import.meta.env.VITE_PLATFORM_URL + '/login?redirect=' + to.query.redirect : import.meta.env.VITE_PLATFORM_URL + '/login';
                        return;
                    } else {
                        next();
                    }
                } else {
                    next();
                }
            } else {
                //如果访问路由不在白名单内
                if (import.meta.env.VITE_SSO_CENTER) {
                    location.href = import.meta.env.VITE_PLATFORM_URL + '/login?redirect=' + import.meta.env.VITE_HOMEPAGE_URL;
                    return;
                } else {
                    next('/login');
                }
                //?redirect=${to.path}
            }
        }
    })

    Starter.$router.afterEach(() => {

    })

}

Starter.build={

    /**
     * 格式化路由数据，分离button和route，去除空children，替换component，格式化redirect。添加error及authRoute，匹配本地路由
     * @param data
     * @return
     */

    formatRouter:(settings,menuData)=>{
        const rootRouter={
            path:'/',
            name:'home',
            redirect:settings.homePage,
            hidden:true
        }
        let buttons=[];
        let menus=[];
        let catalog =settings.router.config.catalog;
        let routes = menuData.filter(item =>{
            if(item.meta.menuType === 0){
                return Object.prototype.hasOwnProperty.call(catalog,item.path);
            }
        })

        //构建服务端的路由信息，拆分路由和按钮
        Starter.build.buildChildrenMenu(settings,routes,buttons);
        //设置本地组件
        Starter.build.setLocalComponent();
        //二次检测清除空节点
        Starter.build.clearChildren(routes);

        let authRouters=settings.authRouters;
        authRouters.push({path:'/:pathMatch(.*)',redirect:'/err',hidden: true});
        authRouters.push(rootRouter);
        let allRoutes= authRouters.concat(routes);
        return {
            routes:routes,
            allRoutes:allRoutes,
            buttons:buttons
        }
    },
    /**
     * 清除空的children节点
     * @param data
     */
    clearChildren:(data)=>{
        for (let i = 0; i < data.length; i++) {
            if (
                data[i].meta &&
                Object.prototype.hasOwnProperty.call(data[i].meta, 'menuType') &&
                data[i].meta.menuType === 0 &&
                data[i].children
            ) {
                if (data[i].children.length > 0) {
                    Starter.build.clearChildren(data[i].children);
                }
                if (data[i].children.length === 0) {
                    data.splice(i, 1);
                    i--;
                }
            }
        }
    },
    /**
     * 构建Menu数据
     * @param menuData
     * @param buttonList
     */
    buildChildrenMenu:(settings,menuData,buttonList)=>{
        let size = menuData.length;
        for(let i = 0; i<size;i++){
            let route =menuData[i];
            let path=route.path;
            switch(route.meta.menuType) {
                case 0:
                    let settings_catalog = settings.router.config.catalog[path];
                    if (settings_catalog === undefined || path === '') {
                        menuData.splice(i, 1);
                        i--;
                        size--;
                        break;
                    } else {
                        route.component = Layout;
                        if (settings_catalog === undefined) {
                            route.meta.icon = settings_catalog.icon;
                        } else {
                            route.meta.icon = '';
                        }
                        break;
                    }
                case 1:
                    let settings_menu = settings.router.config.menu[path];
                    if (settings_menu === undefined) {
                        menuData.splice(i, 1);
                        i--;
                        size--;
                        break;
                    } else {
                        route.component = settings_menu && settings_menu.component ? settings_menu.component : Developing;
                        route.target = settings_menu && settings_menu.target ? settings_menu.target : 'blank';
                    }
                    break;
                case 2:
                    let setting_button = settings.router.config.button[path];
                    buttonList.push(route);
                    if (setting_button === undefined) {
                        menuData.splice(i, 1);
                        i--;
                        size--;
                        break;
                    }else{
                        route.component = setting_button && setting_button.component ? setting_button.component : Developing;
                        route.target = setting_button && setting_button.target ? setting_button.target : 'blank';
                    }
                    break;
            }
            //如果有二级菜单，反复执行
            if(route !== undefined && Object.prototype.hasOwnProperty.call(route,'children') && route.children){
                Starter.build.buildChildrenMenu(settings,route.children,buttonList);
            }
        }
    },
    setLocalComponent:() =>{

    }
}

export default Starter;