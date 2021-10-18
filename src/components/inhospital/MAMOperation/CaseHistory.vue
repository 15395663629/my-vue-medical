<!--===============住院病例弹框===========-->
<template>
  <el-dialog v-model="isShowCase" title="新增病例">
    <el-form :model="caseHistory"  status-icon style="margin-top: 30px" :rules="caseHistoryRules"  ref="caseHistoryRef" label-width="80px" class="demo-ruleForm" >
      <el-row>
        <el-col :span="23">
          <el-form-item label="主诉：" prop="chComplaint" label-width="100px"  >
            <el-input  v-model="caseHistory.chComplaint"  rows="3" type="textarea" size="mini"  maxlength="400"
                       show-word-limit>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="既往病史：" prop="chHistory" label-width="100px"  >
            <el-input  v-model="caseHistory.chHistory"  rows="3" type="textarea" size="mini"  maxlength="400"
                       show-word-limit>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="家族史：" prop="chFamilyHistory" label-width="100px"  >
            <el-input  v-model="caseHistory.chFamilyHistory"  rows="3" type="textarea" size="mini"  maxlength="400"
                       show-word-limit>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11"  >
          <el-form-item label="现病史：" prop="chCause" label-width="100px">
            <el-input  v-model="caseHistory.chCause"  placeholder="请输入病理原因"
                      rows="5" type="textarea" size="mini" maxlength="1000"
                      show-word-limit>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :offset="1" :span="11">
          <el-form-item label="诊断建议：" prop="chDoctorText" label-width="100px">
            <el-input  v-model="caseHistory.chDoctorText"  placeholder="请输入病理原因"
                      rows="5" type="textarea" size="mini" maxlength="1000"
                      show-word-limit>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-row>
        <el-col :span="18"></el-col>
        <el-col :span="2">
          <el-button @click="addCaseHistoryFun()" size="mini" type="primary">确定</el-button>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="2">
          <el-button @click="closeCaseHistory" size="mini" type="danger">取消</el-button>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
    </template>


  </el-dialog>

</template>

<script>
export default {
  props:{
    patientObj:{//病人对象
      type:Object,
      request:true
    }
  },
  data(){
    return{
      //员工对象
      staff:{},

      caseHistoryRules:{//病例校验
        chComplaint: [{ required: true, message: "主诉不能为空", trigger: 'blur' },],
        chHistory: [{ required: true, message: "既往病史不能为空", trigger: 'blur' },],
        chFamilyHistory: [{ required: true, message: "家族史不能为空", trigger: 'blur' },],
        chCause: [{ required: true, message: "现病史不能为空", trigger: 'blur' },],
        chDoctorText: [{ required: true, message: "诊断意见不能为空", trigger: 'blur' },],
      },

      caseHistory:{//病例对象
        chNumber:"",
        chTime:"",
        chDoctor:"",
        chComplaint:"",
        chHistory:"",
        chFamilyHistory:"",
        chCause:"",
        chDoctorText:"",
        sickNumber:"",
        mrNumber:"",
        chIs:"",//1是门诊病例 2是住院病例
        chZyMzId:"",//住院号编号  就诊记录编号
        chSid:""//添加医生
      },
      isShowCase:false,//是否显示新增病例弹框
    }
  },
  methods:{
    caseShow(){
      if(this.patientObj.ptNo == undefined){
        this.$message({
          type: 'error',
          message: '请选择病人'
        });
        return;
      }
      this.isShowCase = true;//打开弹框
    },

    addCaseHistoryFun(){//添加病人病例
      this.caseHistory.chSid = this.staff.sid;//开病例医生
      this.caseHistory.chIs = 2;//住院病例
      this.caseHistory.chZyMzId = this.patientObj.ptNo;//病人住院号
      this.caseHistory.sickNumber = this.patientObj.ptSickNumber;//病人信息编号
      if(this.patientObj.ptNo == undefined){
        this.$message({
          type: 'error',
          message: '请选择病人'
        });
        return;
      }
      alert(this.patientObj.ptSickNumber)

      this.$refs["caseHistoryRef"].validate((date)=>{
        if(date){
          this.axios.post("zy-add-caseHistory",this.caseHistory).then((v)=>{
            if(v.data){
              this.$message({
                type: 'success',
                message: '添加病例成功'
              });
              this.closeCaseHistory();//关闭弹框
            }else{
              this.$message({
                type: 'error',
                message: '添加失败'
              });
            }
          });
        }
      });
    },

    closeCaseHistory(){//关闭新增病人病例弹框
      this.isShowCase = false;
      this.caseHistory = {//病例对象
        chNumber:"",
        chTime:"",
        chDoctor:"",
        chComplaint:"",
        chHistory:"",
        chFamilyHistory:"",
        chCause:"",
        chDoctorText:"",
        sickNumber:"",
        mrNumber:"",
        chIs:"",//1是门诊病例 2是住院病例
        chZyMzId:"",//住院号编号  就诊记录编号
        chSid:""//添加医生
      };
      this.$refs['caseHistoryRef'].resetFields();
    },
  },
  created() {
    this.staff = this.$store.state.token.list;//将登录存入的值在取出来
  }

}
</script>

<style scoped>

</style>