<script setup>
import { ref } from 'vue'
import { addArticleChannelService, updateArticleChannelService } from '@/api/article'
const dialogVisible = ref(false)

const form = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: '',
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '长度在1到10个字符', trigger: 'blur' },
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '长度在1到15个字符', trigger: 'blur' },
  ],
}
const open = async (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}
const emit = defineEmits(['success'])
const onSubmit = async () => {
  await form.value.validate()
  if (formModel.value.id) {
    await updateArticleChannelService(formModel.value)
    ElMessage.success('更新成功')
  } else {
    await addArticleChannelService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}
defineExpose({
  open,
})
</script>
<template>
  <el-dialog v-model="dialogVisible" :title="formModel.id ? '编辑分类' : '增加分类'" width="30%">
    <span>编辑分类</span>
    <template #footer>
      <el-form :model="formModel" :rules="rules" ref="form">
        <el-form-item
          prop="cate_name"
          label="分类名称"
          label-width="100px"
          style="padding-right: 30px"
        >
          <el-input placeholder="请输入分类名称" v-model="formModel.cate_name" />
        </el-form-item>
        <el-form-item
          prop="cate_alias"
          label="分类别名"
          label-width="100px"
          style="padding-right: 30px"
        >
          <el-input placeholder="请输入分类别名" v-model="formModel.cate_alias" />
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
