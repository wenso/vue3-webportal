import request from './index'

/**
 * 获取账号列表
 * @param params
 * @returns {*}
 */
function getAccountList(params){
    return request().post('/account/list',params);
}

/**
 * 添加账号
 * @param params
 * @returns {*}
 */
function addAccount(params){
    return request().post('/account/add',params);
}

/**
 * 更新账号
 * @param params
 * @returns {*}
 */
function updateAccount(params){
    return request().post('/account/update',params);
}

/**
 * 删除账号
 * @param params
 * @returns {*}
 */
function deleteAccount(params){
    return request().post('/account/delete',params);
}

/**
 * 锁定账号
 * @param params
 * @returns {*}
 */
export const lockAccount=(params)=>{
    return request().post('/account/lock',params);
}

/**
 * 解锁账号
 * @param params
 * @returns {*}
 */
export const unlockAccount=(params)=>{
    return request().post('/account/unlock',params);
}

/**
 * 获取账号详情
 * @param params
 * @returns {*}
 */
export const getAccountInfo=(params)=>{
    return request().get("/account/info",params);
}

export default {
    getAccountList,
    getAccountInfo,
    addAccount,
    deleteAccount,
    updateAccount,
    lockAccount,
    unlockAccount
}