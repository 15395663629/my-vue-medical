<template>

  <el-row>

    <el-col :offset="2" :span="3">
      <el-input @blur="initChangeBedRecord" size="mini" v-model="doctorEnjoinWhere.searchLike" placeholder="药品名称"></el-input>
    </el-col>
    <el-col :span="1" >
      <el-button  size="mini" @click="initChangeBedRecord" icon="el-icon-search" type="primary" ></el-button>
    </el-col>


    <el-col  :span="12">
      &nbsp;<span style="font-size: 12px;">操作日期：</span>&nbsp;

      <el-date-picker @change="initChangeBedRecord" v-model="doctorEnjoinWhere.startDate"
                      type="date"
                      size="mini"
                      placeholder="日期">
      </el-date-picker>
      &nbsp;<span style="font-size: 12px;">至</span>&nbsp;
      <el-date-picker @change="initChangeBedRecord" v-model="doctorEnjoinWhere.endDate"
                      type="date"
                      size="mini"
                      placeholder="日期">
      </el-date-picker>
    </el-col>
  </el-row>

  <el-row>
    <el-col>
      <el-table height="450px" :data="bedChangeRecordArr">
        <el-table-column prop="bcDate" label="调换日期"/>
        <el-table-column prop="beforeBdName" label="调换前病床"/>
        <el-table-column prop="afterBdName" label="调换后病床"/>
        <el-table-column prop="sname" label="操作员"/>
        <el-table-column prop="bcCause" label="调换原因"/>
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

      //==========================转病床记录数据
      bedChangeRecordObj:{
        bcId:'',
        bcCurrentBdId:'',
        bcLaterBdId:'',
        bcDate:'',
        ptNo:'',
        bcCause:'',//调换原因
        sId:'',//操作人
        beforeBdName:'',//转病房前病床名称
        afterBdName:'',//转病床后名称
        ptName:'',//病人名称
        sName:''
      },
      bedChangeRecordArr:[],
    }
  },
  methods:{
    initChangeBedRecord(){
      if(this.patientObj.ptNo == undefined){
        return;
      }
      this.doctorEnjoinWhere.ptNo = this.patientObj.ptNo;
      this.axios.post('seltZyChangeBedRecord',this.doctorEnjoinWhere).then((v)=>{
        console.log(v.data)
        this.bedChangeRecordArr = v.data;
      }).catch()
    },
  }
}
</script>
<style scoped>

</style>