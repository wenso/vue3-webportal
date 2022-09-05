<template>
  <!--登录面板-->
  <div class="login-box welcome">
    <div class="title">
      <span>后台管理系统</span>
    </div>
    <div class="login-from r">
      <el-form
          :model="this.state.ruleForm"
          :rules="this.state.rules"
          ref="loginFormRef"
          class="form">
        <el-form-item prop="username">
          <el-input
              class="input-text"
              v-model.trim="this.state.ruleForm.username"
              placeholder="账号"
              :maxlength="32"
              prefix-icon="el-icon-user">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              class="input-text"
              v-model.trim="this.state.ruleForm.password"
              placeholder="密码"
              :maxlength="32"
              prefix-icon="el-icon-unlock"
              :show-password="this.state.ruleForm.showPassword">
          </el-input>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input
              class="input-text"
              v-model.trim="this.state.ruleForm.verifyCode"
              placeholder="验证码"
              :maxlength="8"
              prefix-icon="el-icon-present">
          </el-input>
          <img id="captcha-img"
               class="captcha-img"
               :src="this.state.captchaImg"
               @click="refreshCode"
               alt=""/>
        </el-form-item>
        <el-form-item>
          <el-button
              class="login-btn"
              @click="submitForm">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref, toRefs } from 'vue'
  import Cache from "@core/utils/cache";
  import { useRouter } from "vue-router";
  import { useStore } from "vuex";
  import {TOKEN_SET} from "@core/store/mutations";
  const loginFormRef =ref();
  const store =useStore();
  const state =reactive({
    //验证码图片base64
    captchaImg:'',
    //登录表单参数集合
    ruleForm:{
      //账号
      username:'',
      //密码
      password:'',
      //验证码
      verifyCode:'',
      //是否记住密码
      remember:false,
      //是否查看密码原文
      showPassword:false
    },
    rules:{
      username:[
        { required: 'true', message: '账户不能为空', trigger: 'blur' }
      ],
      password:[
        { required: 'true', message: '密码不能为空', trigger: 'blur' }
      ],
      verifyCode:[
        { required: 'true', message: '验证码不能为空', trigger: 'blur' }
      ]
    }
  })
  const submitForm= async () =>{
    loginFormRef.value.validate((valid)=>{
      if(valid){
        //参数需要加密
        let params=buildParam();
        store.dispatch('base/login',params);
      }else{
        //验证不通过
        return false;
      }
    })
  }
  const refreshCode=()=>{
    console.log("刷新验证码");
  }
  /**
   * 组建参数
   * @param param
   * @returns {*}
   */
  const buildParam=()=>{
    return {
      username:state.ruleForm.username,
      password:state.ruleForm.password,
      verifyCode:state.ruleForm.verifyCode

    }
  }
  const resetForm = () => {
    loginFormRef.value.resetFields();
  }
</script>

<style scoped>

</style>