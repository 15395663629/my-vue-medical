<template>
  <h1>供应商管理</h1>
  <el-row>
    <el-col>
      <!-- 新增弹窗 -->
      <el-button type="primary" @click="gysxinzeng()" size="small">新增供应商</el-button>
      <el-dialog @close="clearform" title="新增供应商信息" v-model="dialogFormVisible" width="40%">
        <el-form :model="formSipplier" ref="formSipplier" :rules="rules">
          <el-form-item label="供应商编号" :label-width="formLabelWidth" >
            <el-input v-model="formSipplier.supplierId" disabled autocomplete="off" style="width: 240px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" :label-width="formLabelWidth" prop="supplierName">
            <el-input v-model="formSipplier.supplierName" autocomplete="off" style="width: 240px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商地址" :label-width="formLabelWidth" prop="supplierSite">
            <el-input v-model="formSipplier.supplierSite" type="textarea" autocomplete="off" style="width: 240px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商电话" :label-width="formLabelWidth" prop="supplierPhone" >
            <el-input v-model.number="formSipplier.supplierPhone" type="text" autocomplete="off" style="width: 240px;"></el-input>
          </el-form-item>
          <el-form-item label="供应商联系人" :label-width="formLabelWidth" prop="supplierLinkman">
            <el-input v-model="formSipplier.supplierLinkman" type="text" autocomplete="off" style="width: 240px;"></el-input>
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
      <el-dialog @close="clearform" title="修改供应商信息" v-model="handleEdit" width="40%">
        <el-form :model="formSipplier">
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
  <el-table :data="tableData.filter(data => !search || data.supplierName.toLowerCase().includes(search.toLowerCase()))
                            .filter(data => !search || data.supplierSite.toLowerCase().includes(search.toLowerCase()))
                            .slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe  style="width: 100%">
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
        <el-input v-model="search" size="mini" placeholder="输入供应商名称搜索" />
      </template>
      <template #default="scope" >
        <el-button size="mini" type="primary" plain @click="editSupplier(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
      style="text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
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
      currentPage:1, //初始页
      pagesize:8,    //    每页的数据
      //校验
      rules: {
        supplierName: [
          {required: true, message: '请输入供应商名称', trigger: 'blur'},
        ],
        supplierSite: [
          {required: true, message: '请输入供应商地址', trigger: 'blur'},
        ],
        supplierPhone: [
          {required: true, message: '请输入供应商电话', trigger: 'blur'},
          { type: 'number',  message: '请输入数字'}
        ],
        supplierLinkman: [
          {required: true, message: '请输入供应商联系人', trigger: 'blur'},
        ],
      },
    }
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
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
      this.$refs['formSipplier'].validate((s) =>{
        if(s){
          console.log(this.formSipplier);
          this.axios({
            url:'http://localhost:8089/gys-add',
            params:{ykSupplier:this.formSipplier}
          }).then((v)=>{
            this.$message({
              message: '供应商新增成功',
              type: 'success'
            });
            this.getData();
            this.clearform();
          })
        }else(
            this.$message('请填写字段')
        )
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
    },
    gysxinzeng(){
      this.dialogFormVisible = true;
      this.formSipplier.supplierId = Math.floor(Math.random() * 100000);
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>

</style>