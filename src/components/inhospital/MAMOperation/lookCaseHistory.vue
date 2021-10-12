<!--======================查看病人病例页面-->
<template>

  <!-- 查看病历筛选条件-->
  <el-row style="margin-bottom: 10px">
    <el-col  :span="1">
      <el-button @click="emptyExecuteScreen" type="primary" size="mini">清空条件</el-button>
    </el-col>


    <el-col :offset="2" :span="5">
      <el-radio-group style="margin-top: 8px;" size="mini" v-model="CaseHistoryWhere.doctorType"  @change="selectLookDoctorEnjoinTable">
        <el-radio :label="2">住院病历</el-radio>
        <el-radio :label="1">门诊病例</el-radio>
      </el-radio-group>
    </el-col>

    <el-col :offset="1" :span="5">
      <span style="font-size: 12px;">开病历医生:</span>&nbsp;
      <el-select @change="initExecuteRecord" v-model="CaseHistoryWhere.caseSid" style="width: 90px" size="mini">
        <el-option v-for="sf in staffArr"
                   :label="sf.sname"
                   :value="sf.sid">
        </el-option>
      </el-select>
    </el-col>

    <el-col :span="10">
      &nbsp;<span style="font-size: 12px;">开病历时间：</span>&nbsp;

      <el-date-picker style="width: 160px" @change="initExecuteRecord" v-model="CaseHistoryWhere.startDate"
                      type="date"
                      size="mini"
                      placeholder="日期">
      </el-date-picker>
      &nbsp;<span style="font-size: 12px;">至</span>&nbsp;
      <el-date-picker  style="width: 160px" @change="initExecuteRecord" v-model="CaseHistoryWhere.endDate"
                      type="date"
                      size="mini"
                      placeholder="日期">
      </el-date-picker>
    </el-col>
  </el-row>

  <!--查看病历表格-->
  <el-row>
    <el-col>
      <el-table :data="caseHistoryArr" height="460" size="mini">
        <el-table-column label="开病历时间" />
        <el-table-column label="开病历医生" />
        <el-table-column label="主诉" />
        <el-table-column label="诊断意见" />
        <el-table-column label="病情原因" />
        <el-table-column label="既往病史" />
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props:{
    patientObj:{
      type:Object,
      request:true
    }
  },
  data(){
    return{

      //======================员工数据
      staff:{},//员工对象
      staffArr:[],//员工集合



      caseHistoryArr:[],//病历集合

      //======================查询条件数据
      CaseHistoryWhere:{
        startDate:'',//开始日期
        endDate:'',//结束日期
        doctorType:2,//医嘱类型
        ptNo:'',
        caseSid:''//医生编号
      },




    }
  },
  methods:{
    initCaseHistory(){

    }
  },
  created() {
    this.initCaseHistory();
  }
}
</script>

<style scoped>

</style>