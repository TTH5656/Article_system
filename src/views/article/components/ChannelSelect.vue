<script setup>
import { ref } from 'vue'
import { getArticleChannelService } from '@/api/article.js'
const channelList = ref([])
const getChannelList = async () => {
  const res = await getArticleChannelService()
  channelList.value = res.data.data
}
getChannelList()
const cate_id = defineModel()
// console.log(channelList)
</script>
<template>
  <el-select style="width: 240px" placeholder="请选择" v-model="cate_id">
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
