export default {
    //模块数据
    catalog:{
        '/cdm/application':{
            icon:'icon-cdm icon-cdm-applicaiton'
        },
        '/cdm/dashboard':{
            icon:'icon-cdm icon-cdm-dashboard'
        }
    },
    //菜单数据
    menu:{
        '/cdm/application/device':{
            component:()=>import('@/views/device/DeviceManage.vue'),
            target: 'main'
        },
        '/cdm/dashboard/statistics':{
            component:()=>import('@/views/dashboard/Statistics.vue'),
            target: 'main'
        }
    },
    //功能数据
    button:{
        '/cdm/application/device/device-create':{
            component:()=>import('@/views/device/DeviceCreate.vue'),
            target: 'main'
        }
    }
}