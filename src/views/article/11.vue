<template>
  <div class="page-container">
    <div class="top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="原料名称" style="margin-right: 30px">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="原料编号" style="margin-right: 30px">
          <el-input placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="button1">搜索</el-button>
          <el-button type="primary" @click="onreset" class="button1">重置</el-button>
        </el-form-item>
        <!-- <el-form-item>
    <el-button type="primary" @click="onadd">新增</el-button>
  </el-form-item> -->
      </el-form>
      <div style="text-align: right">
        <el-button type="primary" class="addButton" @click="onadd">新增</el-button>
      </div>
    </div>
    <!-- //表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#edf5fe', color: '#575b5d', 'text-align': 'center' }"
      :cell-style="{ textAlign: 'center' }"
    >
      <el-table-column fixed prop="index" label="序号" align="center"> </el-table-column>
      <el-table-column prop="materialName" label="原料名称" align="center"> </el-table-column>
      <el-table-column prop="materialCode" label="原料编号" align="center"> </el-table-column>
      <el-table-column prop="systemCode" label="系统编码" align="center"> </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="text" size="small"> 移除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增/编辑对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" label-width="100px">
        <el-form-item label="原料名称">
          <el-input v-model="form.materialName"></el-input>
        </el-form-item>
        <el-form-item label="原料编码">
          <el-input v-model="form.materialCode"></el-input>
        </el-form-item>
        <el-form-item label="系统编码">
          <el-input v-model="form.systemCode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <div style="text-align: right; margin: 20px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 15, 20]"
        :page-size="1"
        layout="total, prev, pager, next, jumper"
        :total="10"
      >
      </el-pagination>
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        :total="68"
        :page-size="10"
        :current-page.sync="currentPage"
        @current-change="onPageChange"
      /> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { index: 1, materialName: '废原丙烯塑料', materialCode: 'PP-O1', systemCode: 'wPP-WT-B' },
        { index: 2, materialName: '废原丙烯塑料', materialCode: 'PP-O1', systemCode: 'wPP-WT-B' },
        { index: 3, materialName: '废原丙烯塑料', materialCode: 'PP-O1', systemCode: 'wPP-WT-B' },
      ],
      dialogVisible: false,
    }
  },
  methods: {
    onadd() {
      this.dialogVisible = true
    },
  },
}
</script>
<style lang="scss" scoped>
.page-container {
  padding: 20px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button1 {
  background-color: white;
  border: 2px solid #0b7ada;
  color: #0b7ada;
  padding: 8px 16px;
}
.addButton {
  background-color: #0b7ada;
  color: white;
}

// ::v-deep {
//   .el-pagination.is-background .el-pager li:not(.disabled) {
//     background-color: #fff; // 进行修改未选中背景和字体
//     // color: #fff;
//   }
//   .el-pagination.is-background .el-pager li:not(.disabled).active {
//     background-color: #0b7ada; // 进行修改选中项背景和字体
//     color: #fff;
//   }
// }
.el-table {
  height: 600px;
}
.bth-prev {
  background-color: #fff;
}
.btn-next {
  background-color: #fff;
}
</style>
