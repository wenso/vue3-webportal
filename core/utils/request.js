import Http from "@core/utils/http";
import base from "@core/base/config"


export class Request{
    constructor(settings) {
        this.requestList=[];
        this.settings=settings;
    }

    register(request){
        this.requestList.push(request);
    }

    get(name){
        return this.requestList.find(function(item){
            return item.name === name;
        })
    }

    /**
     * 结合setting和环境配置文件获得当前服务基础路径
     * @param uri
     * @returns {*}
     */
    getBaseUrl(uri){
        let baseUrl = '';
        //是否使用mock
        if (this.settings.api.debugger) {
            if(this.settings.api.mockGateway){
               baseUrl= this.settings.api.mockGateway+uri;
            }else{
                baseUrl = 'api' + uri;
            }
        } else {
            //origin拼装
            const domainUrl=window.VITE_GATEWAY_URL||import.meta.env.VITE_GATEWAY_URL;
            const domain =
                this.settings.sso
                    ? domainUrl
                    : window.location.origin;
            baseUrl=domain+import.meta.env.VITE_API_URL+uri;
        }
        return baseUrl;
    }

    /**
     * 注册
     * @param settings
     */
    registerRequest(settings){
        this.settings =settings;
        if(settings.api){
            this.api=settings.api;
        }

        this.api.service.forEach(item => {
            switch(typeof item) {
                case 'string':
                    //判断服务是否配置并且已经实例
                    if (item && !this.get(item)) {
                        let http = new Http(item, this.getBaseUrl(item), {}, settings.name);
                        this.register(http);
                    } else {
                        console.error('请配置' + item + '服务')
                    }
                    break;
                case 'object':
                    //判断服务是否配置并且已经实例
                    if (item.name && !this.get(item.name)) {
                        //如果配置了mock
                        if (item.mock && item.mock.enable === true) {
                            if (item.mock.url) {
                                let options = item.options ? item.options : {};
                                let http = new Http(item.name, this.getBaseUrl(item.mock.url), options, settings.name);
                                this.register(http);
                            } else {
                                console.error('请确认是否配置' + item.name + 'Mock服务路径');
                            }
                        }
                        //如果没有配置mock，
                        else {
                            let path = item.path ? item.path : '';
                            if (path) {
                                let options = item.options ? item.options : {};
                                let http = new Http(item.name, this.getBaseUrl(path), options, settings.name);
                                this.register(http);
                            } else {
                                console.error('请确认是否配置' + item.name + '服务路径');
                            }
                        }
                    } else {
                        console.error('请确认是否配置' + item.name + '服务');
                    }
                    break;
            }
        })
    }
}
const createRequest = settings=> new Request(settings);
const requestService = createRequest(base);
export default requestService;
