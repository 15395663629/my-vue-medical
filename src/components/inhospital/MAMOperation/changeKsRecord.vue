<template>
  <el-row>
    <el-col :offset="2" :span="3">
      <el-input @blur="initChangeKsRecord" size="mini" v-model="doctorEnjoinWhere.searchLike" placeholder="药品名称"></el-input>
    </el-col>
    <el-col :span="1" >
      <el-button  size="mini" @click="initChangeKsRecord" icon="el-icon-search" type="primary" ></el-button>
    </el-col>


    <el-col  :span="12">
      &nbsp;<span style="font-size: 12px;">操作日期：</span>&nbsp;

      <el-date-picker @change="initChangeKsRecord" v-model="doctorEnjoinWhere.startDate"
                      type="date"
                      size="mini"
                      placeholder="日期">
      </el-date-picker>
      &nbsp;<span style="font-size: 12px;">至</span>&nbsp;
      <el-date-picker @change="initChangeKsRecord" v-model="doctorEnjoinWhere.endDate"
                      type="date"
                      size="mini"
                      placeholder="日期">
      </el-date-picker>
    </el-col>
  </el-row>

  <el-row>
    <el-col>
      <el-table height="450px" :data="ksChangeRecordArr">
        <el-table-column prop="cdrDate" label="调换日期"/>
        <el-table-column prop="beforeKsName" label="调换前科室"/>
        <el-table-column prop="afterKsName" label="调换后科室"/>
        <el-table-column prop="sname" label="操作员"/>
        <el-table-column prop="cdrCause" label="调换原因"/>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props:{
    patientObj:{
      request:true,
      type:Object
    }
  },
 data(){
   return{
     //======================查询条件数据
     doctorEnjoinWhere:{
       startDate:'',//开始日期
       endDate:'',//结束日期
       searchLike:'',//模糊搜索
       doctorType:0,//医嘱类型
       sIdArr:[],
       ptNo:''
     },
     ksChangeRecordArr:[],
   }
 },
  methods:{
    initChangeKsRecord(){
      if(this.patientObj.ptNo == undefined){
        return;
      }
      this.doctorEnjoinWhere.ptNo = this.patientObj.ptNo;
      this.axios.post('seltzychangeksrecord',this.doctorEnjoinWhere).then((v)=>{
        console.log(v.data)
        this.ksChangeRecordArr = v.data;
      }).catch()
    }
  }
}
</script>

<style scoped>

</style>