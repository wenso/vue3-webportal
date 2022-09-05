<template>
  <el-dropdown class="avatar-box" trigger="hover" placement="bottom-start">
    <div class="avatar-warp">
        <div>
          <div class="user-name">张三</div>
          <div class="user-role">管理员</div>
        </div>
        <el-avatar class="user-face" shape="circle" :size="48" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="user-menu">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
export default {
  name: "User"
}
</script>

<style scoped>
.avatar-box{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 64px;
  margin-right: 20px;
}
.avatar-warp{
  display: flex;
  align-items: center;
  white-space: nowrap;
  cursor:pointer;
  padding: 0 8px;
}

.user-name,
.user-role{ text-align: right; line-height: 1.5; padding-right: 10px;}
.user-name{ color: #333333}
.user-role{color: #999999;}

</style>