import request from './index'

/**
 * 获取短信验证码
 * @param params  短信用途类型
 * @returns {*}
 */
export function getSmsCode(params){
    return request().post('/auth/smscode',params);
}

/**
 * 获取图形验证码
 * @param params
 * @returns {*}
 */
export function getImgCode(params){
    return request().post('/auth/imgcode',params);
}

/**
 * 用户登录
 * @param params
 * @returns {*}
 */
export function login(params) {
    return request().post('/auth/login',params);
}

/**
 * 用户注册
 * @param params
 * @returns {*}
 */
export function register(params){
    return request().post('/auth/register',params);
}

/**
 * 用户退出
 * @param params
 * @returns {*}
 */
export function logout(){
    return request().post('/auth/logout');
}

/**
 * 更新鉴权TOKEN
 * @param params
 * @returns {*}
 */
export function refreshToken(params){
    return request().post('/auth/refresh',params);
}

/**
 * 获取用户资料
 * @returns {*}
 */
export function getUserProfile(){
    return request().post('/personal/profile/info');
}

/**
 * 更新用户头像
 * @param params
 */
export const updateUserFace=(params)=>{
    return request().post('/personal/profile/userface');
}
/**
 * 更新用户密码
 * @param params
 */
export const updatePassword=(params)=>{
    return request().post('/personal/profile/updatepassword',params);
}
/**
 * 更新用户手机号码
 * @param params
 */
export const updatePhone=(params)=>{
    return request().post('/personal/profile/updatephone',params);
}
/**
 * 检测手机号码是否为本人，获取更新手机号的短信验证码
 * @param params
 */
export const checkPhone=()=>{
    return request().post('/personal/profile/checkphone');
}
/**
 * 更新电子邮件
 * @param params
 */
export const updateMail=(params)=>{
    return request().post('/personal/profile/updatemail',params);
}
/**
 * 检测邮件是否为本人，发送验证码
 * @param params
 */
export const checkMail =(params)=>{
    return request().post('/personal/profile/checkmail');
}


/**
 * 获取用户路由
 * @param params
 * @returns {*}
 */
export function getRouterList(){
    return request().post('/personal/router');
}

export default {
    getImgCode,
    getSmsCode,
    getUserProfile,
    refreshToken,
    login,
    logout,
    register,
    getRouterList
}
