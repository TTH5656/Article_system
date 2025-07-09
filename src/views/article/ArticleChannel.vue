<script setup>
import { ref } from 'vue'
import { getArticleChannelService, deleteArticleService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
const articleList = ref([])
const dialog = ref()
const loading = ref(false)
const getArticleChannel = async () => {
  loading.value = true
  const res = await getArticleChannelService()
  articleList.value = res.data.data
  loading.value = false
}
getArticleChannel()
const handleDelete = async (row) => {
  await ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  await deleteArticleService(row.id)
  ElMessage.success('删除成功')
  getArticleChannel()
  console.log(row)
}
const handleEdit = (row) => {
  dialog.value.open(row)
  console.log(row)
}
const handleAdd = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getArticleChannel()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="handleAdd">添加分类</el-button>
    </template>
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            :icon="Edit"
            circle
            plain
            @click="handleEdit(row)"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            :icon="Delete"
            circle
            plain
            @click="handleDelete(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <channelEdit ref="dialog" @success="onSuccess"> </channelEdit>
  </page-container>
</template>
