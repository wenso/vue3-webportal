//token失效 508
const noAuth={
    code:508,
    desc:'用户令牌已失效，请重新进行登录'
}

//业务处理失败 503
const serverFail={
    code:503,
    desc:'业务处理失败，请稍后重试'
}

//没有找到指定服务 501
const noServer={
    code:501,
    desc:'访问服务失败，请检查服务路径'
}

//网关服务异常 504
const gatewayFail={
    code:503,
    desc:'网关服务异常，请稍后重试'
}

//数据库异常 504
const paramFail={
    code:402,
    desc:'参数异常，请检查后提交'
}

//数据库异常 504
const databaseFail={
    code:504,
    desc:'数据库异常，请稍后重试'
}
const success={
    code:200,
    desc:"Success"
}
export default {
    noAuth,
    gatewayFail,
    serverFail,
    noServer,
    paramFail,
    databaseFail,
    success
}