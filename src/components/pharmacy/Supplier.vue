<template>
  <h1>供应商管理</h1>
  <el-row>
    <el-col :offset="10">
      <!-- 新增弹窗 -->
      <el-button type="primary" @click="dialogFormVisible = true">新增供应商</el-button>
      <el-dialog  title="供应商" v-model="dialogFormVisible" width="20%">
        <el-form :model="tableData">
          <el-form-item label="供应商编号" :label-width="formLabelWidth">
            <el-input v-model="tableData.name" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth">
            <el-input v-model="tableData.guige" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商地址" :label-width="formLabelWidth">
            <el-input v-model="tableData.danwei" type="textarea" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商电话" :label-width="formLabelWidth">
            <el-input v-model="tableData.chuku" type="text" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商联系人" :label-width="formLabelWidth">
            <el-input v-model="tableData.ruku" type="text" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
				<span class="dialog-footer">
				  <el-button @click="dialogFormVisible = false">取 消</el-button>
				  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
				</span>
        </template>
      </el-dialog>

      <!--修改弹窗-->

      <el-dialog  title="供应商" v-model="handleEdit" width="20%">
        <el-form :model="tableData">
          <el-form-item label="供应商编号" :label-width="formLabelWidth">
            <el-input v-model="tableData.name" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth">
            <el-input v-model="tableData.guige" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商地址" :label-width="formLabelWidth">
            <el-input v-model="tableData.danwei" type="textarea" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商电话" :label-width="formLabelWidth">
            <el-input v-model="tableData.chuku" type="text" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商联系人" :label-width="formLabelWidth">
            <el-input v-model="tableData.ruku" type="text" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button  @click="handleEdit = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit = false">确 定</el-button>
          </span>
        </template>
      </el-dialog>

    </el-col>
  </el-row>
  <!-- 盘点表格 -->
  <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
    <el-table-column label="供应商编号" prop="name">
    </el-table-column>
    <el-table-column label="供应商名称" prop="guige">
    </el-table-column>
    <el-table-column label="供应商地址" prop="danwei">
    </el-table-column>
    <el-table-column label="供应商电话" prop="chuku">
    </el-table-column>
    <el-table-column label="供应商联系人" prop="ruku">
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template #default="scope">
        <el-button size="mini" @click="handleEdit = true">编辑供应商</el-button>
        <el-button size="mini" type="danger" @click="handleDelete">删除供应商</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页插件 -->
  <el-pagination
      style="text-align: center;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
  </el-pagination>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
          {
        name: '板蓝根',
        guige: '20g/包',
        danwei: '1/盒',
        chuku: '40',
        ruku: '60'
          },
        {
          name: '奥利弗',
          guige: '20g/包',
          danwei: '1/盒',
          chuku: '40',
          ruku: '60'
        },
      ],
      search: '',
      // 新增弹窗
      dialogFormVisible: false,
      // 修改弹窗
      handleEdit:false,
      formLabelWidth: '',
      currentPage4: 4
    }
  },
  methods: {
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped>

</style>