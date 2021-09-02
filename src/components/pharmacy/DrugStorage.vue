<template>
  <h1>药库</h1>
  <el-table
      :data="tableStorage"
      stripe
      style="width: 100%">
    <el-table-column
        prop="ykDrvenName"
        label="药品名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="ykDrvenCount"
        label="药品数量"
        width="180">
    </el-table-column>
    <el-table-column
        prop="ykWarehouse.ykWareName"
        label="仓库名称">
    </el-table-column>
    <el-table-column
        prop="ykDrvenBatch"
        label="药品批次">
    </el-table-column>
    <el-table-column
        prop="ykDrvenMftDate"
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
        <el-button type="primary" plain size="mini" @click="">调拨申请</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data(){
    return{
      tableStorage:[],
    }
  },
  methods:{
    getData(){
      this.axios.post("all-DrugStorg").then((v)=>{
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