<template>
  <el-aside class="aside">
    <!--侧栏Logo-->
    <div class="logo">
        <el-icon :size="64" color="#999">
          <ElementPlus />
        </el-icon>
    </div>
    <!--侧栏菜单-->
    <Menu
        :collapse="this.state.collapse"
        mode="vertical"
        class="menu">
    </Menu>
  </el-aside>
</template>
<script>
export default {
  name: 'ViewAside'
}
</script>
<script setup>
  import { reactive, toRefs } from "vue";
  import {useStore} from "vuex";
  import Menu from '../../components/menu/Menu'
  const state =reactive({
    collapse:false
  });
  const menuToggle=()=>{
    state.collapse=!state.collapse;
  }

</script>

<style scoped>
.logo{ }
.aside{
  width:220px;
  display: flex;
  flex-direction:column;
  background: #132A4F;
}
.aside .menu{ flex: 1; width: 100%;}
.aside .logo{height:72px;  display: flex; justify-content: center;align-items: center;}


</style>