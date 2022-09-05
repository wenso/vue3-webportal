import request from "./index";
import {lockAccount, unlockAccount} from "./account";

/**
 * 获取组织列表
 * @param params
 * @returns {*}
 */
export const getGroupList=(params)=>{
    return request().post('/group/list',params);
}

/**
 * 获取组织树
 * @param params
 * @returns {*}
 */
export const getGroupTree=(params)=>{
    return request().post('/group/tree',params);
}

/**
 * 添加组织
 * @param params
 * @returns {*}
 */
export const addGroup=(params)=>{
    return request().post('/group/add',params);
}

/**
 * 更新组织
 * @param params
 * @returns {*}
 */
export const updateGroup = (params)=>{
    return request().post('/group/update',params);
}

/**
 * 删除组织
 * @param params
 * @returns {*}
 */
export const deleteGroup = (params) => {
    return request().post('/group/delete',params);
}

export default {
    getGroupList,
    addGroup,
    deleteGroup,
    updateGroup,
    getGroupTree
}