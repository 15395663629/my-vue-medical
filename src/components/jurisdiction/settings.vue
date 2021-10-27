<template>

  <el-select v-model="ks.ksname" clearable  placeholder="请选择科室" style="width: 150px"  @change="selectKs()">
    <el-option

        v-for="item in options"
        :key="item.ksId"
        :label="item.ksName"
        :value="item.ksId">
    </el-option>
  </el-select>
  <el-input v-model="ks.sname" placeholder="请输入姓名" style="width: 150px;margin-left: 50px"></el-input>
  <el-button type="primary" style="margin-left: 10px" @click="selectKs">查询</el-button>
  <el-table
      :data="tableData"
      style="width: 100%;margin-top: 10px">
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
      //表格数据
      tableData: [],
      //下拉框科室
      options: [],
      ks:{
        ksname:'',
        sname:''
      },
        dept:[]
    }
  },

  methods:{
    getDate(){
      this.axios.post('home-sch').then((v)=>{
        this.tableData=v.data
        console.log(this.tableData,"表格数据")
      }).catch()
      this.axios.get('http://localhost:8089/ks-list').then((v)=>{
        this.options=v.data
        console.log(this.options,"1111111111111111111")
        this.intercept()
        this.intercepts()
      }).catch()
      this.axios.get("http://localhost:8089/bm-list").then((v)=>{
        this.dept=v.data
      }).catch()
    },
    selectKs(){
      if(this.ks.ksname=='' && this.ks.sname==''){
        console.log("进")
        this.getDate()
      }else{
        this.axios({
          url: "home-sch-name",
          params: {ksFrom: this.ks}
        }).then((v) => {
          this.tableData=v.data
          this.intercepts()
          // console.log(this.tableData+"111----")
          // this.getDate()
        }).catch()
      }

    },
    intercept(){
      for ( let i=0; i<this.options.length; i++){
        for ( let j=0;j<this.dept.length; j++){
          if(this.options[i].deId === this.dept[j].deId){
            this.options[i].ksName=this.dept[j].deName.slice(0,this.dept[j].deName.length)+this.options[i].ksName

          }
        }
      }
    },
    intercepts(){
      for ( let i=0; i<this.tableData.length; i++){
        for ( let j=0;j<this.options.length; j++){
          // console.log(this.options)
          // console.log(this.tableData[i].departmentKs.deId)
          if(this.tableData[i].departmentKs.ksId === this.options[j].ksId){
            this.tableData[i].departmentKs.ksName=this.options[j].ksName
            // console.log(this.tableData[i].departmentKs.ksName)
          }
        }
      }
    }
  },
  created() {
    this.getDate()
  },
  mounted(){

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