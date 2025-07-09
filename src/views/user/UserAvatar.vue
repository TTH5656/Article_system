<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import PageContainer from '@/components/PageContainer.vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { userUpdateAvatarService } from '@/api/user'
const imgUrl = ref('')
const userStore = useUserStore()
const uploadRef = ref(null)
imgUrl.value = userStore.userInfo.user_pic
//使用FileReader图片预览
const onUploadFile = (UploadFile) => {
  const reader = new FileReader()
  reader.readAsDataURL(UploadFile.raw)
  reader.onload = (e) => {
    imgUrl.value = e.target.result
  }
}
//提交修改
const onSubmit = async () => {
  await userUpdateAvatarService(imgUrl.value)
  await userStore.getUserInfo()
  ElMessage.success('修改成功')
}
</script>

<template>
  <PageContainer title="更换头像">
    <el-row>
      <el-col :span="12">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
          ref="uploadRef"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon
        ></el-upload>
        <el-button
          type="primary"
          @click="uploadRef.$el.querySelector('input').click()"
          :icon="Plus"
          size="large"
          >修改头像</el-button
        >
        <!-- // 提交修改按钮 -->
        <el-button type="success" @click="onSubmit" :icon="Upload" size="large">上传头像</el-button>
      </el-col>
    </el-row>
  </PageContainer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
