<template>
  <h1>药库</h1>
  <el-table
      :data="tableStorage.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      stripe
      style="width: 100%">
    <el-table-column type="selection" width="55"/>
    <el-table-column
        prop="ykDrvenName"
        label="药品名称"
        width="180">
    </el-table-column>
    <el-table-column
        prop="ykSelingprice"
        label="药品售价"
        width="180">
    </el-table-column>
    <el-table-column
        prop="ykDrvenCount"
        label="药品库存"
        width="180">
    </el-table-column>
    <el-table-column
        prop="ykDrvenBatch"
        label="药品批次">
    </el-table-column>
    <el-table-column
        prop="ykDrvenMftdate"
        label="生产日期">
    </el-table-column>
    <el-table-column
        prop="ykSupplier.supplierName"
        label="供应商">
    </el-table-column>
    <el-table-column
        prop="address"
        label="操作">
      <template #default="scope">
        <el-button type="primary" plain size="mini" @click="">调价</el-button>
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
      :total="tableStorage.length">
  </el-pagination>
</template>

<script>
export default {
  data(){
    return{
      tableStorage:[],
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
      this.axios.post("YK-repertory").then((v)=>{
        this.tableStorage = v.data
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