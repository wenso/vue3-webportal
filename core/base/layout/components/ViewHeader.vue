<template>
  <div class="header">
    <!--顶部用户信息-->
    <div class="navbar">
      <el-icon class="svg-icon" :size="22" color="#333">
        <Fold/>
      </el-icon>

      <el-breadcrumb separator="/" class="nav-path">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tool-box">
      <el-icon class="svg-icon" :size="22" color="#333">
        <Search/>
      </el-icon>
      <el-icon class="svg-icon" :size="22" color="#333">
        <FullScreen/>
      </el-icon>
      <el-icon class="svg-icon" :size="22" color="#333">
        <ChatLineSquare/>
      </el-icon>
    </div>
    <User />
  </div>
</template>
<script>
export default {
  name: "ViewHeader"
}
</script>
<script setup>
  import User from "../../components/view/User";
  import SvgIcon from "../../components/icon/SvgIcon";

</script>

<style scoped>
.header{
  color:#000;
  display: flex;
  align-items: center;
  height: 100%;

}
.header a:link,
.header a:visited{ color:#000; }

.header a:hover,
.header a:active{ color:rgb(46,81,52);}
.header .svg-icon{
  align-items: center;
  cursor: pointer;
  padding:0 10px;

}
.header .navbar{
  flex: 1;
  height: inherit;
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.header .tool-box{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
}
.header .nav-path{  font-size: 16px;}

</style>