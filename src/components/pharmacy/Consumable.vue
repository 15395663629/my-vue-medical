<template>
  <h1>耗材</h1>
  <el-row>
    <el-col :span="1" :offset="22">
      <el-button type="primary"  @click="dialogFormVisible = true" >新增耗材</el-button>
    </el-col>
  </el-row>
  <el-table
      :data="tablemable.filter(data => !search || data.consumablesName.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"  height="500">
    <el-table-column
        prop="consumablesName"
        label="耗材名称">
    </el-table-column>
    <el-table-column
        prop="consumablesPhy"
        label="耗材数量">
    </el-table-column>
    <el-table-column
        prop="consumablesPurchase"
        label="保质期">
    </el-table-column>
    <el-table-column
        prop="consumablesUnit"
        label="耗材规格">
    </el-table-column>
    <el-table-column
        prop="consumablesPrice"
        label="耗材价格">
    </el-table-column>
    <el-table-column
        align="right">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
      </template>
      <template #default="scope">
        <el-button type="primary" plain size="mini" @click="updatemables(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--  新增弹窗-->
  <el-dialog @close="fromdata" title="耗材" v-model="dialogFormVisible">
    <el-form :model="form">
      <el-row>
        <el-col :span="5">
          <el-form-item label-width="80px" label="耗材名称">
            <el-input v-model="form.consumablesName" style="width: 215px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="7">
          <el-form-item label-width="80px" label="保质期">
            <el-date-picker v-model="form.consumablesPurchase" type="date" placeholder="选择采购日期"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item label-width="80px" label="耗材价格">
            <el-input v-model="form.consumablesPrice" style="width: 215px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="7">
          <el-form-item label-width="100px" label="耗材规格">
            <el-input v-model="form.consumablesUnit" style="width: 215px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
			    <span class="dialog-footer">
			      <el-button @click="fromdata()">取 消</el-button>
			      <el-button type="primary" @click="addmable()">确 定</el-button>
			    </span>
    </template>
  </el-dialog>
  <!-- 分页 -->
  <el-pagination
      style="text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tablemable.length">
  </el-pagination>
</template>

<script>
export default {
  data(){
    return{
      tablemable: [],//----------耗材数据
      dialogFormVisible:false,
      form:{
        consumablesId:'',
        consumablesName:'',
        consumablesPhy:'',
        consumablesPurchase:'',
        consumablesUnit:'',
        consumablesPrice:'',
      },
      search: '',//搜索框
      currentPage:1, //初始页
      pagesize:8,    //    每页的数据
    }
  },
  methods:{
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    getData(){
      this.axios.post("all-mables").then((v) => {
        this.tablemable = v.data;
      })
    },
    /*新增耗材*/
    addmable(){
      console.log(this.form)
      this.axios.post("add-mables",this.form).then((v)=>{
        this.getData();
        this.fromdata();
      }).catch(function (){

      })
    },
    updatemables(row){
      this.form.consumablesId = row.consumablesId;
      this.form.consumablesName = row.consumablesName;
      this.form.consumablesPhy = row.consumablesPhy;
      this.form.consumablesPurchase = row.consumablesPurchase;
      this.form.consumablesUnit = row.consumablesUnit;
      this.form.consumablesPrice = row.consumablesPrice;
      this.dialogFormVisible = true
      this.getData();
    },
    /*清空表单*/
    fromdata(){
      this.form = {
        consumablesId:0,
        consumablesName:null,
        consumablesPhy:null,
        consumablesPurchase:null,
        consumablesUnit:null,
        consumablesPrice:null,
      }
      this.dialogFormVisible = false
    }
  },
  created() {
    this.getData()
  }
}

</script>

<style scoped>

</style>