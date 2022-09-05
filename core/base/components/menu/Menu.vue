<template>
  <!--纵向菜单模式-->
  <el-scrollbar
      v-if="this.props.mode === 'vertical'"
      wrap-class="scrollbar-wrapper"
      view-class="scrollbar-view"
      class="menu-vertical">
    <el-menu
        router
        :default-active="activeMenu"
        mode="vertical"
        background-color="#132A4F"
        text-color="#cccccc"
        active-text-color="#ffffff"
        class="aside-menu">
      <MenuItem
          :data="this.menus"/>
    </el-menu>
  </el-scrollbar>
  <!--横向菜单模式-->
  <el-menu
      v-else
      router
      :default-active="activeMenu"
      :collapse="this.props.collapse"
      mode="horizontal"
      background-color="#132A4F"
      text-color="#cccccc"
      active-text-color="#ffffff"
      class="menu-horizontal">
    <MenuItem
        :data="this.menus" />
  </el-menu>
</template>
<script>
  export default {
    name: "Menu"
  }
</script>
<script setup>
  import { computed,reactive, toRefs,defineProps,defineEmits } from "vue";
  import { useRoute } from "vue-router";
  import { useStore } from 'vuex'
  import MenuItem from "./MenuItem";
  const props=defineProps({
    //模式vertical 纵向，
    mode:{
      type:String,
      default:'vertical',
      required:true
    },
    //合并 or 展开
    collapse:{
      type:Boolean,
      default:false
    }
  });
  let store = useStore()
  const route = useRoute();
  //获取需要menu展示的路由数据
  const menus =store.getters["base/menus"].filter(v=>{
    return v.children;
  });
  //激活菜单
  let activeMenu = computed(() => {
    const { meta, path } = route;
    return path;
  });
  const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
  };
  const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
  };
</script>

<style>
.aside-menu{background: #132A4F;}
.aside-menu.el-menu { border-right: none;}
.menu-vertical {
  height: 100%;
}
.menu-vertical i {
  color: #ffffff;
}
.menu-vertical .scrollbar-wrapper {
  overflow-x: hidden;
}
.menu-vertical .scrollbar-wrapper .scrollbar-view {
  min-height: 100%;
}
.menu-vertical .el-menu.aside-menu{
  height: 100%;
}
.el-menu-item.is-active {
  background-color: #2674c5 !important;
}
</style>