import request from './index'
import {addGroup, deleteGroup, getGroupList, getGroupTree, updateGroup} from "./group";

/**
 * 获取菜单列表
 * @param params
 * @returns {*}
 */
export const getMenuList=(params)=>{
    return request().post('/menu/list',params);
}

/**
 * 获取菜单树
 * @param params
 *
 * @returns {*}
 */
export const getMenuTree=(params)=>{
    return request().post('/menu/tree',params);
}

/**
 * 添加菜单
 * @param params
 * @returns {*}
 */
export const addMenu=(params)=>{
    return request().post('/menu/add',params);
}

/**
 * 更新菜单
 * @param params
 * @returns {*}
 */
export const updateMenu = (params)=>{
    return request().post('/menu/update',params);
}

/**
 * 删除菜单
 * @param params
 * @returns {*}
 */
export const deleteMenu = (params) => {
    return request().post('/menu/delete',params);
}

export default {
    getMenuList,
    addMenu,
    deleteMenu,
    updateMenu,
    getMenuTree
}