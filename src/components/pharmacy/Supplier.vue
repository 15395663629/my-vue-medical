<template>
  <h1>供应商管理</h1>
  <el-row>
    <el-col>
      <!-- 新增弹窗 -->
      <el-button type="primary" @click="dialogFormVisible = true">新增供应商</el-button>
      <el-dialog @close="clearform" title="供应商" v-model="dialogFormVisible" width="40%">
        <el-form :model="formSipplier">
          <el-form-item label="供应商编号" :label-width="formLabelWidth">
            <el-input v-model="formSipplier.supplierId" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth">
            <el-input v-model="formSipplier.supplierName" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商地址" :label-width="formLabelWidth">
            <el-input v-model="formSipplier.supplierSite" type="textarea" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商电话" :label-width="formLabelWidth">
            <el-input v-model="formSipplier.supplierPhone" type="text" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商联系人" :label-width="formLabelWidth">
            <el-input v-model="formSipplier.supplierLinkman" type="text" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
				<span class="dialog-footer">
				  <el-button @click="clearform()">取 消</el-button>
				  <el-button type="primary" @click="addSupplier()">确 定</el-button>
				</span>
        </template>
      </el-dialog>

      <!--修改弹窗-->
      <el-dialog @close="clearform" title="供应商" v-model="handleEdit" width="40%">
        <el-form :model="formSipplier">
          <el-row :gutter="0">
           <el-col :span="0">
             <el-form-item label="供应商编号" :label-width="formLabelWidth">
               <el-input v-model="formSipplier.supplierId" autocomplete="off" style="width: 200px;"></el-input>
             </el-form-item>
           </el-col>
          </el-row>
          <el-form-item label="供应商名称" :label-width="formLabelWidth">
            <el-input v-model="formSipplier.supplierName" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商地址" :label-width="formLabelWidth">
            <el-input v-model="formSipplier.supplierSite" type="textarea" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商电话" :label-width="formLabelWidth">
            <el-input v-model="formSipplier.supplierPhone" type="text" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商联系人" :label-width="formLabelWidth">
            <el-input v-model="formSipplier.supplierLinkman" type="text" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button  @click="clearform()">取 消</el-button>
            <el-button type="primary" @click="xiugai()">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </el-col>
  </el-row>
  <!-- 供应商表格 -->
  <el-table :data="tableData.filter(data => !search || data.supplierName.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"  height="500">
    <el-table-column label="供应商编号" prop="supplierId" >
    </el-table-column>
    <el-table-column label="供应商名称" prop="supplierName" >
    </el-table-column>
    <el-table-column label="供应商地址" prop="supplierSite" >
    </el-table-column>
    <el-table-column label="供应商电话" prop="supplierPhone" >
    </el-table-column>
    <el-table-column label="供应商联系人" prop="supplierLinkman" >
    </el-table-column>
    <el-table-column align="right"  width="200">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template #default="scope" >
        <el-button size="mini" type="primary" plain @click="editSupplier(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" plain @click="handleDelete">删除</el-button>
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
      formSipplier:{
        supplierId:'',
        supplierName:'',
        supplierSite:'',
        supplierPhone:'',
        supplierLinkman:'',
      },
      tableData: [],
      search: '',
      // 新增弹窗
      dialogFormVisible: false,
      // 修改弹窗
      handleEdit:false,
      formLabelWidth: '',
      currentPage4: 4,
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
    },
    //查询
    getData(){
      this.axios({
        url:'http://localhost:8089/gys-all',
        params:{}
      }).then((v)=>{
        console.log(v)
        this.tableData = v.data;
      }).catch(function (){
      })
    },
    //新增
    addSupplier(){
      console.log(this.formSipplier);
      this.axios({
        url:'http://localhost:8089/gys-add',
        params:{ykSupplier:this.formSipplier}
      }).then((v)=>{
        this.getData();
        this.clearform();
      }).catch(function (){

      })
    },
    //修改获取数据
    editSupplier(row){
      console.log(row.supplierId)
      this.handleEdit = true;
      this.formSipplier={
        supplierId:row.supplierId,
            supplierName:row.supplierName,
            supplierSite:row.supplierSite,
            supplierPhone:row.supplierPhone,
            supplierLinkman:row.supplierLinkman
      }
    },
    /*清空表单*/
    clearform(){
      this.formSipplier={
        supplierId:'',
            supplierName:'',
            supplierSite:'',
            supplierPhone:'',
            supplierLinkman:''
      }
      this.dialogFormVisible=false
      this.handleEdit = false
    },
    /*修改*/
    xiugai(){
      console.log(this.formSipplier);
      this.axios({
        url:'http://localhost:8089/gys-update',
        params:{ykSupplier:this.formSipplier}
      }).then((v)=>{
        this.getData();
        this.clearform();
      }).catch(function (){

      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>

</style>