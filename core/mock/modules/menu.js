//上线的menu-manage需要在路径中增加项目名命名空间，区别不同项目或租户的情况
import {tokens,users} from "@core/mock/token"
import error from "@core/mock/error"
const service ='api/system/';
const data=[
    {
        path:'/',
        redirect:'/dashboard',
        props:{
          menuPath:'/dashboard'
        },
        meta:{
            title:'系统首页',
            index:1,
            icon:''
        },
        menuId:'1',
        children:[
            {
                path:'dashboard',
                props:{
                    menuPath:'/dashboard'
                },
                meta:{
                    title:'统计看板',
                    index:1,
                    icon:''
                },
                menuId:'2'
            },{
                path:'account-manage',
                props:{
                    menuPath:'/account-manage',
                },
                meta:{
                    title:'用户中心',
                    index:1,
                    icon:''
                },
                menuId:'3',
                children:[{
                        path: 'edit',
                        props: {
                            menuPath: '/account-manage/edit'
                        },
                        meta: {
                            title: '用户编辑',
                            index:1,
                            icon:''
                        },
                        menuId: '4'
                    },{
                        path: 'add',
                        props: {
                            menuPath: '/account-manage/add'
                        },
                        meta: {
                            title: '用户添加',
                            index:1,
                            icon:''
                        },
                        menuId: '5'
                    }
                ]
            },{
                path:'role-manage',
                props:{
                    menuPath:'/role-manage',
                },
                meta:{
                    title:'角色管理',
                    index:1,
                    icon:''
                },
                menuId:'',
                children:[{
                        path: 'edit',
                        props: {
                            menuPath: '/role-manage/edit'
                        },
                        meta: {
                            title: '角色编辑',
                            index:1,
                            icon:''
                        },
                        menuId: '6'
                    },{
                        path: 'add',
                        props: {
                            menuPath: '/role-manage/add'
                        },
                        meta: {
                            title: '角色添加',
                            index:1,
                            icon:''
                        },
                        menuId: '7'
                    }
                ]
            },{
                path:'role-manage',
                props:{
                    menuPath:'/role-manage',
                },
                meta:{
                    title:'角色管理',
                    index:1,
                    icon:''
                },
                menuId:'8',
                children:[{
                        path: 'edit',
                        props: {
                            menuPath: '/role-manage/edit'
                        },
                        meta: {
                            title: '角色编辑',
                            index:1,
                            icon:''
                        },
                        menuId: '9'
                    },{
                        path: 'add',
                        props: {
                            menuPath: '/role-manage/add'
                        },
                        meta: {
                            title: '角色添加',
                            index:1,
                            icon:''
                        },
                        menuId: '10'
                    }
                ]
            },{
                path:'menu-manage',
                props:{
                    menuPath:'/menu-manage',
                },
                meta:{
                    title:'菜单管理',
                    index:1,
                    icon:''
                },
                menuId:'11',
                children:[{
                        path: 'edit',
                        props: {
                            menuPath: '/menu-manage/edit'
                        },
                        meta: {
                            title: '菜单编辑',
                            index:1,
                            icon:''
                        },
                        menuId: '12'
                    },{
                        path: 'add',
                        props: {
                            menuPath: '/menu-manage/add'
                        },
                        meta: {
                            title: '菜单添加',
                            index:1,
                            icon:''
                        },
                        menuId: '13'
                    }
                ]
            }
        ]
    },
]
const menuApi=[
    {
        url:service+'menu/tree',
        method: 'post',
        response:config=>{
            const {authorization}=config.headers;
            const param=config.body;
            const info=users[authorization];
            if(!info){
                return error.noAuth
            }else{
                let data=data;
                return Object.assign({},error.success,{data:data});
            }
        }
    }
]
export default menuApi;