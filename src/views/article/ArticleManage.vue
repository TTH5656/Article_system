<script setup>
import { ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import ArticleDrawer from './components/ArticleDrawer.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { getArticleListService } from '@/api/article'
import { dateFormat } from '@/utils/dateFormat'

const total = ref(0)
const background = ref(true)
const loading = ref(false)
//抽屉组件
const articledrawer = ref()
//表单数据
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: '',
})
const articleList = ref([])
//获取文章列表
const getArticleList = async () => {
  loading.value = true
  const res = await getArticleListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  // console.log(res)
  loading.value = false
}
getArticleList()
//页面容量逻辑
const handleSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
// 当前页数逻辑
const handleCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}
// 重置和搜索
const onreset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
const onsearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
//添加逻辑
const addArticle = () => {
  articledrawer.value.open({})
}
//编辑逻辑
const editAticle = (row) => {
  articledrawer.value.open(row)
}
//删除逻辑
const deleteAticle = (row) => {}
//监听抽屉组件发布进行页面更新
const onSuccess = (type) => {
  if (type === 'add') {
    const lastpage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastpage
  }
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理" class="article-container">
    <template #extra>
      <el-button type="primary" @click="addArticle">添加文章</el-button>
    </template>
    <!-- 分类搜索表单 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select style="width: 240px" placeholder="请选择" v-model="params.state">
          <el-option value="已发布" label="已发布" />
          <el-option value="草稿" label="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onsearch">搜索</el-button>
        <el-button @click="onreset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 文章列表 -->
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="文章标题" width="400px">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类" />
      <el-table-column prop="pub_date" label="发布时间">
        <template #default="{ row }">
          <span>{{ dateFormat(row.pub_date) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="发布状态" />
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button type="primary" :icon="Edit" size="small" circle plain @click="editAticle(row)">
          </el-button>
          <el-button
            type="danger"
            :icon="Delete"
            size="small"
            circle
            plain
            @click="deleteAticle(row)"
          >
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <el-pagination
      class="pagination-bottom"
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 4, 5, 10]"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <article-drawer ref="articledrawer" @success="onSuccess"></article-drawer>
  </page-container>
</template>

<style scoped>
.article-container {
  position: relative;
}
.pagination-bottom {
  position: absolute;
  bottom: 10px;
  left: 100px;
  width: 100%;
}
</style>
