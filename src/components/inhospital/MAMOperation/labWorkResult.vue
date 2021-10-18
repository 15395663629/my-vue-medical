<template>
<!--最上面按钮栏-->
  <!--==========================================================================查看医嘱-->
    <el-row>

      <el-col style="margin-left: 15px" :span="4">
        <el-input size="mini" v-model="doctorEnjoinWhere.searchLike" placeholder="病人姓名或者住院号"></el-input>
      </el-col>
      <el-col  :span="1">
        <el-button size="mini" @click="initResultMan" icon="el-icon-search" type="primary" ></el-button>
      </el-col>

      <el-col  style="margin-left: 10px;" :span="5">
        <span style="font-size: 12px;">开立医生：</span>&nbsp;
        <el-select @change="initResultMan"  placeholder="请选择"  style="width: 160px" v-model="doctorEnjoinWhere.sIdArr" multiple collapse-tags size="mini">
          <el-option v-for="st in staffArr"
                     :label="st.sname"
                     :value="st.sid"/>
        </el-select>
      </el-col>

      <el-col  :span="8">
        &nbsp;<span style="font-size: 12px;">开立时间：</span>&nbsp;

        <el-date-picker style="width: 125px" @change="initResultMan" v-model="doctorEnjoinWhere.startDate"
                        type="date"
                        size="mini"
                        placeholder="日期">
        </el-date-picker>
        &nbsp;<span style="font-size: 12px;">至</span>&nbsp;
        <el-date-picker style="width: 125px" @change="initResultMan" v-model="doctorEnjoinWhere.endDate"
                        type="date"
                        size="mini"
                        placeholder="日期">
        </el-date-picker>
      </el-col>

      <el-col :span="5">
        <el-tag type="info" size="small" effect="dark">未检查</el-tag>&nbsp;
        <el-tag type="danger" size="small" effect="dark">已取消</el-tag>&nbsp;
        <el-tag effect="dark" size="small">已检查</el-tag>&nbsp;
      </el-col>

    </el-row>

  <!--化验表格-->
  <el-row>
    <el-col>
      <el-table style="width: 100%" height="420px"  size="mini"  :row-class-name="tableCheckoutCancel"  :data="ResultTextArr">
        <el-table-column fixed  label="开立时间" prop="manTime" width="200"/>
        <el-table-column fixed  label="开立医生" prop="sname" width="160"/>
        <el-table-column fixed  label="化验结果" prop="manResult" />
        <el-table-column fixed  label="化验名称" prop="tjCodeProject.checkName" width="200"/>
        <el-table-column fixed  label="操作" width="100">
          <template #default="obj">
            <el-button type="danger" v-if="obj.row.iss != 2 && !(obj.row.manResult != null && obj.row.manResult != '')"  @click="cancelCheckoutFun(obj.row)" size="mini" >取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props:{
    patientObj:{
      type:Object,//对象
      request:true//是否唯一
    }
  },
  data(){
    return{
      //===============化验项目结果数据
      ResultTextArr:[],//化验结果数组
      //======================查询条件数据
      doctorEnjoinWhere:{
        startDate:'',//开始日期
        endDate:'',//结束日期
        searchLike:'',//模糊搜索
        doctorType:0,//医嘱类型
        sIdArr:[],//员工编号数组
        ksIdArr:[],//科室编号数组
        ptNo:''
      },
      staffArr:[],//员工数组

      //员工对象
      staff:{}
    }
  },
  methods:{
    initResultMan(){
      if(this.patientObj.ptNo == null ||  this.patientObj.ptNo == ''){
        return;
      }
      this.doctorEnjoinWhere.ptNo = this.patientObj.ptNo;
      this.axios.post("select-manResult-byPtNo",this.doctorEnjoinWhere).then((v)=>{
        this.ResultTextArr = v.data;
      }).catch();

      this.axios({url:'select-result-ByManId-Staff',params:{ptNo:this.patientObj.ptNo}}).then((v)=>{
        this.staffArr = v.data;
      }).catch();
    },
    //取消项目方法
   async cancelCheckoutFun(obj){
      let iss = false;
      // alert(this.patientBaseObj.ptPrice)
      if(this.patientObj.ptPrice < 0){
        iss = await this.$confirm("是否要将【"+obj.tjCodeProject.checkName+"】 项目取消", '提示信息', {
          distinguishCancelAndClose: true,
          cancelButtonText: "撤回",
          confirmButtonText: "确认取消"
        }).then(() => {
          return false;
        }).catch(action => {
          return true;
        });
      }
      if(iss){
        this.$message({
          type: 'warning',
          message:'已撤回'
        })
        return;
      }


      this.axios.post('cancel-chekout',{tjManResult:obj,ptNo:this.patientObj.ptNo,sId:this.staff.sid}).then((v)=>{
        this.$message({
          type: 'success',
          message: '取消成功！'
        });
        this.initResultMan();
      }).catch();
    },


    //==============================渲染表格
    tableCheckoutCancel({row, rowIndex}){
      if(row.iss == 2){
        return 'cancel';
      }
      if(row.manResult != null && row.manResult != ''){
        return 'cancels'
      }
    }
  },
  created() {
    this.initResultMan();
    this.staff = this.$store.state.token.list;//将登录存入的值在取出来
  }
}
</script>

<style scoped>


/deep/ .el-table .cancel {
  /*background: #FF9C9C;*/
  color: red;
}

/deep/ .el-table .cancels {
  /*background: #FF9C9C;*/
  color: blue;
}

</style>