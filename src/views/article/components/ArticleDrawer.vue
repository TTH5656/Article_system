<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import ChannelSelect from './ChannelSelect.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { addArticleService, editArticleService } from '@/api/article'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request'
//获取富文本组件
const EditorRef = ref()
//获取表单组件
const formRef = ref()
//默认表单
const defaultform = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: '',
}
const formModel = ref({
  ...defaultform,
})
//控制抽屉显示
const drawer = ref(false)
const open = async (row) => {
  drawer.value = true
  if (row.id) {
    console.log('编辑回显')
    const res = await editArticleService(row.id)
    formModel.value = res.data.data
    imgUrl.value = baseURL + res.data.data.cover_img
  } else {
    console.log('添加')
    formModel.value = {
      ...defaultform,
    }
    imgUrl.value = ''
    EditorRef.value.setHTML('')
  }
}
//图片url
const imgUrl = ref('')
//向父组件通知发布成功进行渲染
const emit = defineEmits(['success'])
//图片预览
const onUploadFile = (UploadFile) => {
  imgUrl.value = URL.createObjectURL(UploadFile.raw)
  // console.log(UploadFile)
  formModel.value.cover_img = UploadFile.raw
}
//发布文章逻辑
const onPublic = async (state) => {
  formModel.value.state = state
  const fd = new FormData()
  console.log(formModel.value)
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  //查看fd中的内容
  // console.log('验证FormData内容:')
  // for (let [key, value] of fd.entries()) {
  //   console.log(key, value)
  // }
  if (formModel.value.id) {
    console.log('编辑')
  } else {
    await addArticleService(fd)
    ElMessage.success('发布成功')
    drawer.value = false
    emit('success', 'add')
  }
}
defineExpose({
  open,
})
</script>

<template>
  <el-drawer
    v-model="drawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item
        label="文章标题"
        prop="title"
        :rules="[{ required: true, message: '标题不能为空' }]"
      >
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select v-model="formModel.cate_id" style="width: 100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon
        ></el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="EditorRef"
            theme="snow"
            v-model:content="formModel.content"
            contentType="html"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublic('已发布')">发布</el-button>
        <el-button type="info" @click="onPublic('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
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
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
