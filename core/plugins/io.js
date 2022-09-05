import io from 'socket.io-client'
export default {
    install:(app,connection,options)=>{
        let opts={
            transports:['websocket','xhr-polling','jsonp-polling'],
            //是否自动重新建立连接，默认为 true
            reconnect: true,
            forceNew:true,
            //connect_error 和 connect_timeout 事件触发前的延迟时间，默认为20000毫秒
            timeout:10000,
            // 重新创建连接的延迟时长，默认为1000毫秒
            reconnectionDelay:1000,
            //尝试重连的次数，默认为无限次
            reconnectionAttempts:3,
            //参数查询，在连接和重连时可更新
            //query:{token:"222"},
            //额外请求头
            // transportOptions: {
            //     polling: {
            //         extraHeaders: {
            //             'x-clientid': 'abc'
            //         }
            //     }
            // }
        }
        // connection: 'http://induscore.ftzq.internal.virtueit.net:81/v3/gatewayservice/elzj/management/v1.0.0/frontendzq/hah',

        const socket =io.connect(connection,Object.assign(opts,options?options:{}));
        //使用两种全局生命方法
        app.config.globalProperties.$socket=socket;
        app.provide('socket',socket);
    }
}