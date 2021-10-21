<!--======================查看病人病例页面-->
<template>

  <!-- 查看病历筛选条件-->
  <el-row style="margin-bottom: 10px">
    <el-col  :span="1">
      <el-button @click="emptyExecuteScreen" type="primary" size="mini">清空条件</el-button>
    </el-col>


    <el-col :offset="2" :span="5">
      <el-radio-group style="margin-top: 8px;" size="mini" v-model="CaseHistoryWhere.doctorType"  @change="changeCase">
        <el-radio :label="2">住院病历</el-radio>
        <el-radio :label="1">门诊病历</el-radio>
      </el-radio-group>
    </el-col>

    <el-col :offset="1" :span="5">
      <span style="font-size: 12px;">开病历医生:</span>&nbsp;
      <el-select @change="changeCase" v-model="CaseHistoryWhere.sIdArr" multiple collapse-tags style="width: 160px" size="mini">
        <el-option v-for="sf in staffArr"
                   :label="sf.sname"
                   :value="sf.sid">
        </el-option>
      </el-select>
    </el-col>

    <el-col :span="10">
      &nbsp;<span style="font-size: 12px;">开病历时间：</span>&nbsp;

      <el-date-picker style="width: 160px" @change="changeCase" v-model="CaseHistoryWhere.startDate"
                      type="date"
                      size="mini"
                      placeholder="日期">
      </el-date-picker>
      &nbsp;<span style="font-size: 12px;">至</span>&nbsp;
      <el-date-picker  style="width: 160px" @change="changeCase" v-model="CaseHistoryWhere.endDate"
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
        <el-table-column prop="chTime" label="开病历时间" />
        <el-table-column prop="staff.sname" label="开病历医生" />
        <el-table-column prop="chComplaint" label="主诉" />
        <el-table-column prop="chDoctorText" label="诊断意见" />
        <el-table-column prop="chCause" label="病情原因" />
        <el-table-column prop="chHistory" label="既往病史" />
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
        sIdArr:[],
        caseSid:''//医生编号
      },


    }
  },
  methods:{
    initCaseHistory(){
    },
    changeCase(){
      if(this.patientObj.ptNo == undefined){
        this.$message({
          type: 'error',
          message:'请选择病人！'
        })
        return;
      }
      this.axios({url:'select-by-sickNumber-staff',params:{sickNumber:this.patientObj.ptSickNumber}}).then((v)=>{
        this.staffArr = v.data;
      }).catch();

      this.CaseHistoryWhere.ptNo = this.patientObj.ptSickNumber;//病人信息编号

      this.axios.post("select-byPtNo-case",this.CaseHistoryWhere).then((v)=>{
        console.log(v.data)
        this.caseHistoryArr = v.data;
      }).catch();
    },
    emptyExecuteScreen(){
      this.CaseHistoryWhere = {
        startDate:'',//开始日期
        endDate:'',//结束日期
        doctorType:2,//医嘱类型
        ptNo:'',
        sIdArr:[],
        caseSid:''//医生编号
      };
    }
  },
  created() {
    this.initCaseHistory();
  }
}
</script>

<style scoped>

</style>