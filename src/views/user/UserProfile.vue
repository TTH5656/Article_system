<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores/modules/user'
import { ref } from 'vue'
import { userUpdateInfoService } from '@/api/user'
const {
  userInfo: { username, nickname, email, id },
  getUserInfo,
} = useUserStore()
const userInfo = ref({
  username,
  nickname,
  email,
  id,
})
const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: '请输入正确的邮箱格式',
      trigger: 'blur',
    },
  ],
}
//提交修改
const onSubmit = async () => {
  await formRef.value.validate(async (valid) => {
    if (valid) {
      await userUpdateInfoService(userInfo.value)
      await getUserInfo()
      ElMessage.success('修改成功')
    } else {
      ElMessage.error('修改失败')
    }
  })
}
//获取表单实例
const formRef = ref(null)
</script>
<template>
  <page-container title="用户信息">
    <el-row>
      <el-col :span="12">
        <el-form :rules="rules" :model="userInfo" ref="formRef" label-width="100px" size="large">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userInfo.username" disabled />
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="userInfo.nickname" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfo.email" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
