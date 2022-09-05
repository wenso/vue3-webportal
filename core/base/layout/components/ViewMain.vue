<template>
  <!--内容区-->
  <div class="no-tab tab-view">
  <el-scrollbar>
    <div class="main_warp">
      <div class="main">
        <router-view #="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "ViewMain"
}
</script>

<style scoped>
.main_warp{
  display: flex;
  align-items: end;
  padding: 16px;

}
.main{
  width: 100%;
  height:100vh;
  border-radius: 6px;
  background: #fff;
  box-shadow: 2px 2px 5px #ccc;
}

.tab-view{
  width: 100%;
  height: 100%;
}
.tab-view .no-tab{
}
.el-scrollbar{
  height:100%;

}
</style>