<template>
  <el-table
      :data="tableData"
      style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="医生姓名">
            <span>{{ props.row.staff.sname }}</span>
          </el-form-item>
          <el-form-item label="职称">
            <span>{{ props.row.title.tname }}</span>
          </el-form-item>
          <el-form-item label="所属科室">
            <span>{{ props.row.departmentKs.ksName }}</span>
          </el-form-item>
          <el-form-item label="科室地址">
            <span>{{ props.row.departmentKs.ksDz }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
        label="编号"
        prop="sid">
    </el-table-column>
    <el-table-column
        label="姓名"
        prop="staff.sname">
    </el-table-column>
    <el-table-column
        label="科室"
        prop="departmentKs.ksName">
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tableData: []
    }
  },
  methods:{
    getDate(){
      this.axios.post('home-sch').then((v)=>{
        this.tableData=v.data
        console.log(this.tableData)
      }).catch()
    }
  },
  created() {
    this.getDate()
  }
}
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>