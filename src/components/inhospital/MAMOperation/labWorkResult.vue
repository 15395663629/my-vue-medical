<template>
<!--最上面按钮栏-->
  <el-row>
    <el-col :offset="19" :span="5">
        <el-tag type="info" effect="dark">未检查</el-tag>&nbsp;
        <el-tag type="danger" effect="dark">已取消</el-tag>&nbsp;
        <el-tag effect="dark">已检查</el-tag>&nbsp;
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

      //员工对象
      staff:{}
    }
  },
  methods:{
    initResultMan(){
      if(this.patientObj.ptNo == null ||  this.patientObj.ptNo == ''){
        return;
      }
      this.axios({url:"select-manResult-byPtNo",params:{ptNo:this.patientObj.ptNo}}).then((v)=>{
        this.ResultTextArr = v.data;
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