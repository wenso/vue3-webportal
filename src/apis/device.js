import request from './index'

/**
 * 添加设备
 * @param params
 * @returns {*}
 */
export const addDevice =(params)=>{
    return request().post("/device/add",params);
}
/**
 * 获取设备列表
 * @returns {*}
 */
export const getDeviceList =(param) =>{
    return request().get("/device/list",param)
}

/**
 * 更新设备
 * @param params
 * @returns {*}
 */
export const updateDevice =(params)=>{
    return request().post("/device/update",params);
}
/**
 * 删除设备
 * @param params
 * @returns {*}
 */
export const deleteDevice = (params)=>{
    return request().post("/device/delete",params);
}
/**
 * 获取设备详情
 * @param params
 * @returns {*}
 */
export const getDeviceInfo=(params)=>{
    return request().get("/device/info",params);
}