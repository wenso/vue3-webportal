import {tokens,users} from "@core/mock/token"
const service ="api/base/";
const userInfo={
    username:"wenso",
    etag:"2018-09-12T19:19:30.000+0000"
}
const userApi=[
    //用户登录
    {
        url:service+'auth/login',
        method:'post',
        response:config => {
            const {username,password,verifyCode} =config.body;
            const token =tokens[username].token;
            const mPassword=tokens[username].password;
            const mVerifyCode=tokens[username].verifyCode;
            if(!token){
                //如果token不存在，说明没有用户
                return {
                    code:204,
                    desc:'用户名或密码不正确'
                }
            }else{
                //如果token存在，说明用户存在，判断密码是否正确
                if(mVerifyCode!==verifyCode){
                    return {
                        code:205,
                        desc:'验证码不正确'
                    }
                }else if(mPassword!==password){
                    return {
                        code:204,
                        desc:'用户名或密码不正确'
                    }
                }else{
                    return {
                        code:200,
                        data:token,
                        desc:'success'
                    }
                }
            }
        }
    },
    //获取用户信息
    {
        url:service+'personal/profile/info',
        method: 'post',
        response:config=>{
            const {authorization}=config.headers;
            const info=users[authorization];
            if(!info){
                return {
                    code:508,
                    desc:'用户令牌已失效，请重新进行登录'
                }
            }else{
                return {
                    code:200,
                    data:info,
                    desc:'success'
                }
            }
        }
    },
    //用户登出
    {
        url:service+'auth/logout',
        method:'post',
        response:()=>{
            return {
                code:200,
                desc:'success'
            }
        }
    }
]

export default userApi;