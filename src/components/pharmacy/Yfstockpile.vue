<template>
<h1>药房</h1>
  <el-table
      :data="yfstockplie.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      stripe
      style="width: 100%">
    <el-table-column type="selection" width="55"/>
    <el-table-column
        prop="yfDrvenName"
        label="药品名称">
    </el-table-column>
    <el-table-column
        prop="yfDrvenCount"
        label="药品数量">
    </el-table-column>
    <el-table-column
        prop="yfDrvenCount"
        label="药品类别">
      <template #default="scope">
          {{scope.row.drugPrescription == 1? '西药':'中药'}}
      </template>
    </el-table-column>
    <el-table-column
        prop="ykSupplier.supplierName"
        label="供应商">
    </el-table-column>
    <el-table-column
        prop="drugPrescription"
        label="处方药">
      <template #default="scope">
        <el-tag>
          {{scope.row.drugPrescription == 1? '处方药':'非处方'}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
        prop="address"
        label="操作">
      <template #default="scope">
        <el-button type="primary" plain size="mini" @click="">调拨申请</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
      style="text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 8, 16, 32]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="yfstockplie.length">
  </el-pagination>
</template>

<script>
export default {
  data(){
    return{
      yfstockplie:[],
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
      this.axios.post("YF-repertory").then((v)=>{
        this.yfstockplie = v.data
      })
    }
  },
  created() {
    this.getData();
  }
}
</script>

<style scoped>

</style>