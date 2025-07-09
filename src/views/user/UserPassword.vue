<script setup>
import { useUserStore } from '@/stores/modules/user'
import { ref } from 'vue'
import { userUpdatePasswordService } from '@/api/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const formModel = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: '',
})
//获取表单实例
const formRef = ref(null)
//校验规则
const rules = {
  //新密码和旧密码不能相同，密码和确认密码要相同
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === formModel.value.old_pwd) {
          callback(new Error('新密码不能和旧密码相同'))
        }
      },
    },
  ],
  re_pwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.new_pwd) {
          callback(new Error('两次输入密码不一致'))
        }
      },
    },
  ],
}
//提交修改
const onSubmit = async () => {
  const valid = formRef.value.validate()
  if (valid) {
    await userUpdatePasswordService(formModel.value)
    ElMessage.success('修改成功')
    userStore.setToken('')
    userStore.setUserInfo({})
    router.push('/login')
  }
}
</script>
<template>
  <page-container title="修改密码">
    <el-row>
      <el-col :span="12">
        <el-form ref="formRef" :model="formModel" :rules="rules" label-width="100px">
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="formModel.old_pwd" type="password" placeholder="请输入原密码" />
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="formModel.new_pwd" type="password" placeholder="请输入新密码" />
          </el-form-item>
          <el-form-item label="确认密码" prop="re_pwd">
            <el-input v-model="formModel.re_pwd" type="password" placeholder="请输入确认密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改密码</el-button>
            <el-button type="default" @click="formRef.value.resetFields()">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
