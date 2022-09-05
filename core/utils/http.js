import axios from 'axios'
import Cache from '@core/utils/cache'
import { ElMessage } from "element-plus"
import QS from 'qs'

//实例HTTP
export default class Http {
    constructor(name,baseUrl,options={},project) {
        this.name=name;
        this.baseURL=baseUrl;
        this.service = axios.create({
            timeout:14*1000,
            //baseURL: baseUrl,
            witchCredentials: true,
            ...options
        });
        //请求拦截器
        this.service.interceptors.request.use(
            config=>{
                if(Cache.getLS("token")){
                    //每次请求判断是否存在token，如果存在赋值到header中
                    config.headers.authorization=Cache.getLS("token");
                }
                return config;
            },
            error=>{
                console.log(error) // for debug
                ElMessage.error(error);
                return Promise.reject(error);
            }
        );
        //响应拦截器
        this.service.interceptors.response.use(
            response=>{
                //通过http请求的状态码判断服务端是否返回正常，根据业务架构可在200状态码下，细分业务状态吗
                if(response.data.code===200){
                    return Promise.resolve(response.data);
                }else{
                    if(response.data.code===508){
                        Cache.rmLS("token")
                        route.push("/login");
                    }
                    let desc=response.data.desc;
                    ElMessage.error(desc);
                    return Promise.reject(desc);
                }
            },
            error=>{
                const {response}=error;
                if(response){
                    ElMessage.error(response.data?response.data.desc:response.statusText);
                }else{
                    if(!window.navigator.onLine){
                        //断网情况下处理逻辑
                        let unLineStr="网络不给力，请检查网络后再试";
                        ElMessage.error(unLineStr);
                        return Promise.reject(unLineStr);
                    }else{
                        ElMessage.error(error);
                        return Promise.reject(error);
                    }
                }
            }
        );
    }

    /**
     * get请求
     * @param url
     * @param params
     * @return {Promise<unknown>}
     */
    get(url,params){
        let config = {
            params:params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
        }
        return new Promise((resolve,reject)=>{
            this.service.post(this.baseURL+url,config).then(res=>{
                resolve(res);
            }).catch(error=>{
                ElMessage.error(error);
            })
        })
    };

    /**
     * post请求
     * @param url
     * @param params
     * @return {Promise<unknown>}
     */
    post(url,params){
        let config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
        }
        return new Promise((resolve,reject)=>{
            this.service.post(this.baseURL+url,params,config).then(res=>{
                resolve(res);
            }).catch(error=>{
                ElMessage.error(error);
            })
        })
    };

    /**
     * 上传文件请求
     * @param url
     * @param param
     */
    upload(url,param){
        let config = {
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        }
        return new Promise((resolve,reject)=>{
            this.service.post(this.baseURL+url,param,config).then(res=>{
                resolve(res);
            }).catch(error=>{
                ElMessage.error(error);
            })
        })
    }

    /**
     * 下载文件
     * @param url
     * @param param
     * @return {Promise<unknown>}
     */
    download(url,params){
        let config={
            params:params,
            responseType: 'blob'
        };
        return new Promise((resolve,reject)=>{
            this.service.get(this.baseURL+url,config).then(res=>{
                const content = res.data;
                const blob = new Blob([content]);
                resolve(blob);
            }).catch(error=>{
                error.text().then(response=>{
                    ElMessage.error(JSON.parse(error));
                })
            })
        })
    }

    /**
     * 并发请求
     * @param requests 请求方法数组
     * @return {Promise<unknown>}
     */
    requestAll(requests) {
        return new Promise((resolve, reject) => {
            axios
                .all(requests)
                .then(
                    axios.spread((...response) => {
                        resolve(response);
                    })
                )
                .catch(error => {
                    reject(error.data);
                });
        });
    };
}

// responseType:'json',
//     headers:{
//     Accept:"application/json",
//         "Content-Type":"application/json",
//         Authorization:""
// }

