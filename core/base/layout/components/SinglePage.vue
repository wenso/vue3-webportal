<template>
  <div class="page-wrap">
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "SinglePage"
}
</script>

<style scoped>
.page-wrap{
  height:100vh;
}
.page-wrap .el-container{
  height:100%;
}
.page-wrap .el-container .el-main{
  height:100%;
  padding:0;
}

</style>