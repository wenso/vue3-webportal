import request from "./index";
import {addGroup, deleteGroup, getGroupList, getGroupTree, updateGroup} from "./group";

/**
 * 获取角色列表
 * @param params
 * @returns {*}
 */
export const getRoleList=(params)=>{
    return request().post('/role/list',params);
}

/**
 * 添加角色
 * @param params
 * @returns {*}
 */
export const addRole=(params)=>{
    return request().post('/role/add',params);
}

/**
 * 更新角色
 * @param params
 * @returns {*}
 */
export const updateRole = (params)=>{
    return request().post('/role/update',params);
}

/**
 * 删除角色
 * @param params
 * @returns {*}
 */
export const deleteRole = (params) => {
    return request().post('/role/delete',params);
}

/**
 * 获取权限列表
 * @param params
 * @returns {*}
 */
export const getAuthList=(params)=>{
    return request().post('/role/authlist',params);
}

/**
 * 保存权限配置
 * @param params
 * @returns {*}
 */
export const updateAuth=(params)=>{
    return request().post('/role/updateauth',params);
}

export default {
    getRoleList,
    addRole,
    deleteRole,
    updateRole,
    getAuthList,
    updateAuth
}