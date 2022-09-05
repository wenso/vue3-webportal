<template>
  <svg-icon v-if="this.props.icon" :name="this.props.icon" />
  <span v-if="this.props.title" slot='title'>{{ this.props.title }}</span>
</template>
<script>
  export default {
    name: "SvgIcon"
  }
</script>
<script setup>
import { defineProps } from 'vue';
  const props = defineProps({
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  })
</script>
<style scoped>

</style>