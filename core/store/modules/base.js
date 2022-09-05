import Cache from '../../utils/cache';
import {TOKEN_SET,USER_SET,STATE_RESET,ROUTES_SET,BUTTONS_SET,CONFIG_SET,MENUS_SET} from '../mutations';
import {login,getUserProfile,getRouterList} from '../../base/apis/personal';
import Starter from "../../utils/starter";


const TOKEN = "token"
const getDefaultState = () => {
    return {
        token:Cache.getLS(TOKEN),
        user:{},
        menus: [],
        routes:[],
        userRoutes:[],
        baseRoutes:[],
        settings:{}
    }
}


const state = getDefaultState();
const actions = {
    login: ({commit},loginParams,callback) => {
        const {username,password,verifyCode} =loginParams;
        const params={
            username:username.trim(),
            password:password,
            verifyCode:verifyCode
        }
        //调用登录接口
        return new Promise((resolve,reject) => {
            login(params).then(res=>{
                if(res.data){
                    commit(TOKEN_SET,res.data);
                    Cache.setLS(TOKEN,res.data);
                    resolve();
                }
            }).catch(err => {
                reject(err);
            })
        })
    },
    getUserProfile: ({commit,state}) => {
        //获取用户资料接口
        return new Promise((resolve,reject) =>{
            const params={
                token:state.token,
                etag :state.user.etag
            }
            getUserProfile(params).then(res => {
                if(res&&res.data){
                    const data =res.data;
                    commit(USER_SET,data);
                    resolve(data);
                }
                return reject("获取用户信息失败");
            })
        })
    },
    cleanToken:({commit}) => {
        //清除本地token
        return new Promise(resolve => {
            Cache.rmLS(TOKEN);
            commit(STATE_RESET);
            resolve();
        })
        commit(STATE_RESET);
    },
    getRouterList: async ({commit}) => {
        return new Promise((resolve,reject)=>{
            getRouterList().then(res =>{
                if(res&&res.data){
                    const data=res.data;
                    const {routes,allRoutes,buttons} = Starter.build.formatRouter($SETTINGS,data);
                    commit(ROUTES_SET,allRoutes);
                    commit(MENUS_SET,routes);
                    commit(BUTTONS_SET,buttons);
                    resolve (allRoutes);
                }
                return reject("获取路由信息失败");
            })
        })
    }
}

const getters = {
    token: (state) => state.token,
    user: (state) => state.user,
    routes:(state) => state.routes,
    userRoutes:(state) => state.userRoutes,
    baseRoutes: (state) => state.baseRoutes,
    buttons:(state) => state.buttons,
    menus: (state) => state.menus,
    settings: (state) => state.settings
}

const mutations = {
    [STATE_RESET](state){
      Object.assign(state, getDefaultState());
    },
    [TOKEN_SET](state, token){
        state.token = token;
    },
    [USER_SET](state,user){
        state.user = user;
    },
    [CONFIG_SET](state,settings){
        state.settings = settings;
    },
    [ROUTES_SET](state, routes){
        state.baseRoutes=window.$SETTINGS.authRouters?window.$SETTINGS.authRouters:[];
        state.userRoutes=routes;
        state.routes = state.baseRoutes.concat(routes);
    },
    [BUTTONS_SET](state,buttons){
        state.buttons =buttons;
    },
    [MENUS_SET](state,menus){
        state.menus =menus;
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}