import {tokens,users} from "@core/mock/token"
import error from "@core/mock/error"
const service ='api/base/';
const routerData=[
    {
        "redirect": "/cdm/dashboard/statistics",
        "icon": 0,
        "menuName": "系统首页",
        "meta": {
            "title": "系统首页",
            "menuType": 0,
            "icon":""
        },
        "path": "/cdm/dashboard",
        "pathName":"dashboard",
        "children": [{
            "redirect": null,
            "icon": 1,
            "menuName": "统计看板",
            "path": "/cdm/dashboard/statistics",
            "pathName":"statistics",
            "meta": {
                "title": "统计看板",
                "menuType": 1,
                "icon":""
            },
            "children": []
        }]
    },
    {
        "redirect": "/cdm/system/account",
        "icon": 0,
        "menuName": "系统管理",
        "meta": {
            "title": "系统管理",
            "menuType": 0,
            "icon":""
        },
        "path": "/cdm/system",
        "pathName":"system",
        "children": [{
            "redirect": null,
            "icon": 1,
            "menuName": "账号管理",
            "path": "/cdm/system/account",
            "pathName":"account",
            "meta": {
                "title": "账户管理",
                "menuType": 1,
                "icon":""
            },
            "children": [{
                    "redirect": null,
                    "icon": 2,
                    "menuName": "创建账号",
                    "path": "/cdm/system/account/account-create",
                    "pathName":"account-create",
                    "children": [],
                    "meta": {
                        "title": "创建用户",
                        "menuType": 2,
                        "icon":""
                    }
                },
                {
                    "redirect": null,
                    "icon": 2,
                    "menuName": "更新账号",
                    "path": "/cdm/system/account/account-update",
                    "pathName":"account-update",
                    "children": [],
                    "meta": {
                        "title": "更新账号",
                        "menuType": 2,
                        "icon":""
                    }
                }
            ]
        }]
    },
    {
        "redirect": "/cdm/application/device",
        "icon": 0,
        "menuName": "应用管理",
        "meta": {
            "title": "应用管理",
            "menuType": 0,
            "icon":""
        },
        "path": "/cdm/application",
        "pathName":"application",
        "children": [{
            "redirect": null,
            "icon": 1,
            "menuName": "设备管理",
            "path": "/cdm/application/device",
            "pathName":"device",
            "meta": {
                "title": "设备管理",
                "menuType": 1,
                "icon":""
            },
            "children": [{
                    "redirect": null,
                    "icon": 2,
                    "menuName": "添加设备",
                    "props": {
                        "menuPath": "/cdm/application/device/device-create"
                    },
                    "path": "device-create",
                    "pathName":"添加设备",
                    "children": [],
                    "meta": {
                        "title": "添加设备",
                        "menuType": 2,
                        "icon":""
                    }
                },
                {
                    "redirect": null,
                    "icon": 2,
                    "menuName": "更新设备",
                    "props": {
                        "menuPath": "/cdm/application/device/device-update"
                    },
                    "path": "device-update",
                    "children": [],
                    "meta": {
                        "title": "更新设备",
                        "menuType": 2,
                        "icon":""
                    }
                }
            ]
        }]
    }
];
const personalApi=[
    {
        url:service+'personal/router',
        method: 'post',
        response:config=>{
            const {authorization}=config.headers;
            const param=config.body;
            const info=users[authorization];
            if(!info){
                return error.noAuth
            }else{
                let data=routerData;
                return Object.assign({},error.success,{data:data});
            }
        }
    }
]

export default personalApi;
