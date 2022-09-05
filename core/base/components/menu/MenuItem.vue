<template>
  <div>
    <template v-for="(item,index) in this.props.data">
      <!--包含子集-->
      <el-sub-menu
        :index="item.path"
        v-if="item.children&&item.children.length > 0"
        popper-append-to-body>
        <template #title>
          <i :class="item.meta.icon"></i>
          <span>{{ item.meta.title }}</span>
        </template>
        <MenuItem
            :data="item.children" />

      </el-sub-menu>
      <!--不包含子集-->
      <el-menu-item
        v-else
        :index="item.path"
        :key="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "MenuItem"
}
</script>
<script setup>
const props=defineProps({
  data:{
    type:Array,
    default:()=>[]
  }
})

</script>

<style scoped>

</style>