<template>
  <el-button size="mini" type="primary" @click="openCheckoutTk">添加</el-button>

  <!-- 病理检验=================================================================================================================================================== -->
  <el-row>

    <el-col>
      <el-table style="width: 100%" height="420px"  size="mini" :data="checkoutList">
        <el-table-column fixed  label="检验类型" prop="checkName" width="120"/>
        <el-table-column fixed  label="价格" prop="checkPay" width="120"/>
        <el-table-column fixed  label="科室名称" prop="deptks.ksName" width="120"/>
        <el-table-column fixed  label="科室地址" prop="deptks.ksDz" width="140"/>
        <el-table-column fixed  label="功能属性">
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top" width="580px">
              <template #default>
                {{scope.row.indexSignificance}}
              </template>
              <template #reference>
                <div  class="name-wrapper fontType">
                  <el-tag  size="small">{{scope.row.indexSignificance}}</el-tag>
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column width="70px" label="操作" >
          <template #default="obj">
            <el-button type="danger" size="mini" >取消</el-button>
          </template>
        </el-table-column>

      </el-table>

    </el-col>
  </el-row>


  <el-row >
    <el-col :offset="18"  style="margin-top: 10px" :span="3">
      <el-button type="danger" @click="emptyPatientCheckout" size="small">清空所有</el-button>
    </el-col>
    <el-col :span="3">
      <el-button type="primary" style="margin-top: 10px" @click="addPatientCheckout" size="small">确定开立</el-button>
    </el-col>
  </el-row>

  <el-row>

    <el-col>
      <!-- 病理检验=================================================================================================================================================== -->
      <el-dialog title="项目检验" top="30px"  v-model="isShowTj" width="80%"  destroy-on-close center>
        <el-form >
          <el-row>
            <el-col :span="5">
              <el-form-item label=检验名称 label-width="80px">
                <el-input type="text" size="small" v-model="seach" clearable placeholder="检验类型名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item>
                <el-button  size="small" @click="ccooTjpro" icon="el-icon-search" type="primary" ></el-button>
              </el-form-item>
            </el-col>

            <el-col :offset="15"  :span="3">
              <el-form>
                <el-form-item label-width="20px">
                  <el-button size="small" @click="PatientAddCheckout" icon="el-icon-check" type="primary">一件添加</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-form>
        <el-table height="500px" :data="tjList" style="width: 100%" ref="table22" @selection-change="PatientAddMiddleCheckout" >
          <el-table-column  type="selection" width="55" />
          <el-table-column fixed  label="检验类型" prop="checkName" width="120"></el-table-column>
          <el-table-column fixed  label="价格" prop="checkPay" width="120"></el-table-column>
          <el-table-column fixed  label="功能属性">
            <template #default="scope">
              <el-popover effect="light" trigger="hover" placement="top" width="580px">
                <template #default>
                  {{scope.row.indexSignificance}}
                </template>
                <template #reference>
                  <div  class="name-wrapper fontType">
                    <el-tag  size="small">{{scope.row.indexSignificance}}</el-tag>
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>

        </el-table>
      </el-dialog>
    </el-col>

  </el-row>


</template>

<script>
export default {
  data(){
    return{
      //=====================显示检验结果
      isShowTj:false,//是否显示弹框
      tjList:[],//检验项目集合
      seach:'',//搜索内容

      //=======================化验数据
      checkoutMiddleList:[],//添加病人化验项目中间集合
      checkoutList:[],//病人已添加的化验项目集合


    }
  },
  methods:{
//搜索检验项目=================检验检验检验检验检验检验检验
    ccooTjpro(){
      this.axios({url:'allDescTjpro',params:{seach:this.seach} }).then((v) => {

        // this.tjList = v.data;
        let arr = v.data;
        arr.forEach(a=>{
          this.tjList.push(a);
        })
      }).catch();

    },

    //添加化验项目方法
    PatientAddCheckout(){
      this.checkoutList = [];
      this.checkoutMiddleList.forEach(c=>{
        this.checkoutList.push(c);
      })
      this.$message({
        type: 'success',
        message: '添加成功！'
      });
      this.isShowTj = false;

    },
    //添加化验项目中间方法
    PatientAddMiddleCheckout(checkoutArr){
      console.log(checkoutArr)
      this.checkoutMiddleList = checkoutArr;
    },
    //渲染表格
    cleaxmss() {
      this.$nextTick(function (){
        for (let i = 0; i < this.tjList.length; i++) {
          for (let j = 0; j < this.checkoutList.length; j++) {
            if (this.tjList[i].checkId == this.checkoutList[j].checkId) {
              console.log(this.$refs.table22)
              this.$refs.table22.toggleRowSelection(this.tjList[i], true);
              // this.$refs['table22'][0].toggleRowSelection(this.tjList[j],true);
            }
          }
        }
      })

      // }
      // this.$forceUpdate();
    },
    //清空所有已开检验
    emptyPatientCheckout(){
      this.checkoutList = [];//清空
      this.$message({
        type: 'success',
        message: '清除成功！'
      });
    },
    //新增病人化验项目
    addPatientCheckout(){
      let ck = {};
      ck.ptNo = 122;
      ck.tjCodeProjectList = this.checkoutList;
      this.axios.post('add-patient-checkout',ck).then((v=>{
        this.$message({
          type: 'success',
          message: '开立成功'
        });
        this.checkoutList = [];
      })).catch();
    },
    //打开项目弹框
    openCheckoutTk(){
      this.isShowTj = true;
      this.cleaxmss();
    }

  },
  created() {
    this.ccooTjpro();
  }
}
</script>

<style scoped>

</style>