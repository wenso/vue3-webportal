export default {
    //模块数据
    catalog:{
        '/cdm/system':{
            icon:'icon-cdm icon-cdm-user'
        }
    },
    //菜单数据
    menu:{
        '/cdm/system/account':{
            component:()=>import('@core/system/views/account/AccountManage.vue'),
            target: 'main'
        }
    },
    //功能数据
    button:{
        '/cdm/system/account/account-create':{
            component:()=>import('@core/system/views/account/AccountCreate.vue'),
            target: 'main'
        }
    },

}