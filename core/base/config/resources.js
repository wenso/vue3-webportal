export default [
    {
        path:'/developing',
        name:'err-developing',
        component:() => import('@core/base/views/error/ErrDev.vue'),
        hidden:true
    },{
        path:'/err',
        name:'err',
        component:() => import('@core/base/views/error/ErrPage.vue'),
        hidden:true
    },{
        path:'/login',
        name:'login',
        component:() => import('@core/base/views/Login.vue'),
        hidden:true
    },{
        path:'/register',
        name:'register',
        component:() => import('@core/base/views/Register.vue'),
        hidden:true
    },{
        path:'/personal',
        name:'personal',
        component:() => import('@core/base/views/personal/Profile.vue'),
        hidden:true
    }
]