import {modules} from '../index'
import Layout from "../base/layout";
import Developing from "../base/views/error/ErrDev";

export function mergedSettings(settings){
    // const rootRouter={
    //     path:'/',
    //     name:'home',
    //     redirect:settings.homePage,
    //     hidden:true
    // }
    let baseRouters={};
    Object.keys(modules).forEach(key => {
        if(settings.import.includes(key)){
            if(key === 'base'){
                baseRouters=modules[key].authRouters;
            }else{
                Object.assign(
                    settings.router.config.catalog,
                    modules[key].router.config.catalog
                );
                Object.assign(
                    settings.router.config.menu,
                    modules[key].router.config.menu
                );
                Object.assign(
                    settings.router.config.button,
                    modules[key].router.config.button
                );
            }
        }
    })
    settings.authRouters=baseRouters;
    return settings;
}

