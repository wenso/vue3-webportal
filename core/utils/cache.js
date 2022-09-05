//命名空间，防止和其他web发生冲突。
const NAMESPACE="wenso";
//和环境变量组成完整key前缀，解决环境问题。Cookie本身基于域名不存在该问题
let cachePrefix=NAMESPACE+"_"+process.env.NODE_ENV;
//获取指定key的localStorage
function getLS(key){
    let temp=window.localStorage.getItem(cachePrefix+key);
    return temp?temp:false;
}
//设置指定key的localStorage
function setLS(key,value){
    window.localStorage.setItem(cachePrefix+key,value);
}
//删除对应key的localStorage
function rmLS(key){
    window.localStorage.removeItem(cachePrefix+key);
}
//获取指定key的cookie
function getCK(key){
    let cookieArr=document.cookie.split(";");
    let result="";
    for(let i=0;i<cookieArr.length;i++){
        let obj=cookieArr[i].split("=");
        if(obj[0]==key){
            result=obj[1];
            break;
        }
    }
    return result;
}
//设置对应key的cookie,指定保存天数days
function setCK(key,value,days){
    let currDate =new Date();
    currDate.setTime(currDate.getTime()+(days*24*60*60*1000));
    let expires="expires="+currDate.toUTCString();
    document.cookie=key+"="+value+";"+expires;
}

function getSS(key){
    let temp=window.sessionStorage.getItem(cachePrefix+key);
    return temp?temp:false;
}
function setSS(key,value){
    window.sessionStorage.setItem(cachePrefix+key,value);
}
function rmSS(key){
    window.sessionStorage.removeItem(cachePrefix+key);
}
export default {
    getLS,
    setLS,
    getSS,
    setSS,
    getCK,
    setCK,
    rmLS,
    rmSS
}