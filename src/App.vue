<script setup>
import { useUserStore } from '@/stores/modules/user'

import zh from 'element-plus/es/locale/lang/zh-cn.mjs'

const userStore = useUserStore()
</script>

<template>
  <div>
    <el-config-provider :locale="zh">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped></style>
