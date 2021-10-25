<template >
  <div class="app-container">
    <!-- 查询条件开始 -->
    <el-row :gutter="12" style="margin-bottom: 5px">
      <el-col :span="24">
        <el-card shadow="always">
          <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="88px">
            <el-form-item>
              <el-col :span="12">
                <el-form-item>
                  <el-select
                      @change="dome"
                      v-model="pbType"
                      clearable
                      size="small"
                      style="width: 200px"
                      value-key="bcTypeId"
                  >
                    <el-option
                        v-for="c in deptOptions"
                        :key="c.fcId"
                        :label="c.fcName"
                        :value="c.fcId"
                    />
                  </el-select>
                </el-form-item>

              </el-col>
              <el-form-item>
                <el-select
                    v-model="ksk.ksId"
                    clearable
                    value-key="ksId"
                    size="small"
                    style="width: 240px"
                    @change="quit"
                >
                  <el-option
                      v-for="ks in keShi"
                      :key="ks.ksId"
                      :label="ks.ksName"
                      :value="ks.ksId"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" round icon="el-icon-refresh" size="mini" v-print='"printint"'>打印</el-button>
              </el-form-item>
              <el-form-item style="float: right">
                <el-button type="primary" round icon="el-icon-s-fold" size="small" @click="star()">上一周</el-button>
                <el-button type="success" round icon="el-icon-s-operation" size="small" @click="thisWeek()">当前周</el-button>
                <el-button type="warning" round icon="el-icon-s-unfold" size="small" @click="end()">下一周</el-button>
              </el-form-item>
            </el-form-item>

          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <!-- 查询条件结束 -->
<div id="printint">
    <!--    表头开始  -->
    <el-row class="div10">
      <el-col :span="2" class="div11" >
        日期\班次
      </el-col>
      <el-col :span="wid" class="div12" v-for="bc in schedulingTypeOptions" :key="bc.fid">
        {{bc.fstartTime}}至{{bc.fendTime}}
      </el-col>
    </el-row>
    <!--    表头结束  -->

    <!--    主体开始  -->
    <el-row class="div20 " v-for="pb in pbtableData" style="margin-top: 2px;height: 60px;">
      <el-col :span="2" class="div21">
        {{pb.xq}}<br>{{pb.rq}}
      </el-col>
      <el-col :span="wid" v-for="bc in schedulingTypeOptions" class="doc">
          <span v-for="ygpb in pb.slist">
             <template v-if="ygpb.frId==bc.fid">
                {{ygpb.staff.sname+"&#32"}}
             </template>
          </span>

        <el-button type="primary" icon="el-icon-plus" v-show="!pb.state"  :disabled="pb.state" circle @click="dakai(pb.rq,bc.fid)"></el-button>
      </el-col>
    </el-row>
</div>
    <!--    主体结束  -->
    <!--==========================弹框开始===========================-->
    <el-dialog v-model="dialogVisible" title='新增排班' >
        <!-- 复选情况下使用 check-strictly （默认false）使父子不相互关联 -->
       <el-form >
         <el-form-item :label="ksk.ksName">
<!--           <el-tree-->
<!--               ref="tree"-->
<!--               :data="ksYgs"-->
<!--               :props="defaultProps"-->
<!--               show-checkbox-->
<!--               node-key="tid"-->
<!--               default-expand-all-->
<!--               check-strictly-->
<!--           />-->

           <el-select v-model="value" clearable placeholder="请选择职称"  @change="clas($event,1)" style="width: 30%">
             <el-option
                 v-for="item in ksYgs"
                 :key="item.tid"
                 :label="item.tname"
                 :value="item.tid"
                >
             </el-option>
           </el-select>
           <el-select v-model="value1" multiple placeholder="请选择" style="width: 30%;margin-left: 20px">
             <el-option
                 v-for="item in options"
                 :key="item.tid"
                 :label="item.tname"
                 :value="item.tid">
             </el-option>
           </el-select>
         </el-form-item>
       </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">关闭</el-button>
        <el-button type="primary" @click="confirmRole()">确定</el-button>
      </div>
    </el-dialog>
    <!--    ========================弹框结束=======================-->

  </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      options: [],
      value1: [],
      value:'',
      status:false,
      ksYgs: [],
      ks:[],
      //级联选择
      defaultProps: {
        label: 'tname',
        children: 'staff'
      },
      isShow:false,
      ksk: {
        ksId:1,
        ksName:"住院部内科 "
      },
      keShi: [],
      //  班次类型
      pbType: 1,
      // 遮罩层
      loading: false,
      // 对话框标题
      title: '',
      // 是否打开对话框
      open: false,
      // 排班类型数据
      deptOptions: [],
      // 医生数据
      userOptions: [],
      // 班次数据
      schedulingTypeOptions: [],
      // 排班时间段数据
      subsectionTypeOptions: [],
      // 查询参数
      queryParams: {
        queryDate: undefined
      },
      schedulingData: {
        startTimeThisWeek: undefined,
        endTimeThisWeek: undefined
      },
      // 排班表数据
      pbtableData: [],
      dialogVisible: false,
      // 修改的数据
      editData: [],
      week:[],
      length2: 0,
      bcId:'',
      sch:{
        rq:'',
        bcId:''
      },
      dept:[]
    }
  },
  //  计算属性
  computed: {
    wid(){
      return Math.floor(22/(this.length2))
    }
  },
  created() {
  this.getData()
    this.quit()
    this.dome()
  },
  mounted(){
    this.intercept()
  },
  methods: {
    getData(){
      this.axios.get("http://localhost:8089/bm-list").then((v)=>{
        this.dept=v.data
        console.log(this.dept)
      }).catch()
      this.axios.get('list-fre').then((v)=>{
        this.deptOptions=v.data
      }).catch()
      this.axios.get("ks-list").then((v)=>{
        this.keShi=v.data
        this.intercept()
      }).catch()
      this.axios.get("http://localhost:8089/titel-list").then((v)=>{
        this.ksYgs=v.data
      }).catch()
      // this.axios({
      //   url:"add-sch",
      //   params:{ksId:this.ksk.ksId}
      // }).then((v)=>{
      //
      // }).catch()
    },
    dome(){
      console.log(this.pbType)
      this.axios({
        url:"bc-list",
        params:{bcId:this.pbType}
      }).then((v)=>{
        this.schedulingTypeOptions=v.data
        this.length2=v.data.length
        console.log(this.schedulingTypeOptions,"")
      }).catch();
    },
    quit(){
      this.axios({
        url:"week",
        params:{ksId:this.ksk.ksId}
      }).then((v)=>{
        this.pbtableData=v.data
        this.getData()
        console.log("----"+this.ksk.ksId)
    console.log(this.pbtableData,"排班")
      }).catch();

    },
    dakai(rq,bcId){
      this.dialogVisible= true
     this.sch.rq=rq
      this.sch.bcId=bcId
      for(const ks of this.keShi){
        if(ks.ksId == this.ksk.ksId){
          this.ksk.ksName=ks.ksName
        }
      }

    },
    confirmRole(){
      //班次编号
      // console.log(this.schedulingTypeOptions[0].fid)
      // console.log(funs)
      var grants = JSON.stringify({bcId:this.sch.bcId,funs:this.value1,rq:this.sch.rq})
      this.axios.post("addSch",qs.stringify({grants:grants})).then((v)=>{
        if(v.data==="ok"){
          console.log("ok")
          //日期
          var grant = JSON.stringify({rq:this.sch.rq,bcId:this.sch.bcId,funs:this.value1})
          this.axios.post("saveGrant",qs.stringify({grant:grant})).then((res)=>{
            this.dialogVisible=false
            // this.getData()
            this.dome(this.bcId)
            this.quit(this.ksk.ksId)
            this.thisWeek()
          }).catch()
        }else{
          console.log("false")
          this.$message.error("该员工已存在班次不能新增")
          this.dialogVisible=false
        }
      }).catch()

    },
    end(){
      this.axios({
        url:"end-week",
        params:{ksId:this.ksk.ksId,bcId:this.pbType}
      }).then((v)=>{
        this.pbtableData=v.data
        console.log(this.pbtableData)
        this.getData()

      }).catch();

    },
    star(){
      this.axios({
        url:"star-week",
        params:{ksId:this.ksk.ksId,bcId:this.pbType}
      }).then((v)=>{
        this.pbtableData=v.data
        console.log(this.pbtableData)
        this.getData()

      }).catch();

    },
    thisWeek(){
      // console.log(this.ksId)
      this.axios({
        url:"this-week",
        params:{ksId:this.ksk.ksId,bcId:this.pbType}
      }).then((v)=>{
        this.pbtableData=v.data
        console.log(this.pbtableData)
        this.getData()

      }).catch();

    },
    intercept(){
      console.log(this.keShi)
      console.log(this.dept)
      console.log(1111)
      for ( let i=0; i<this.keShi.length; i++){
        for ( let j=0;j<this.dept.length; j++){
          if(this.keShi[i].deId === this.dept[j].deId){
              this.keShi[i].ksName=this.dept[j].deName.slice(0,this.dept[j].deName.length)+this.keShi[i].ksName

          }
        }
      }
    },
    clas(event,dome){
    console.log(event+"------"+dome)
      if(dome===1){
        this.value1=''
      }
      this.axios({
        url:"add-schstaff",
        params:{tid:event,ksId:this.ksk.ksId}
      }).then((v)=>{
        this.options=v.data
        console.log(this.options)
        this.getData()

      }).catch();
    }
  },
  watch:{
    value : function (value1){
        console.log(value1)
    }
  }
}

</script>

<style>
.div10{
  text-align: center;
  height: 50px;
  background-color: white;
}
/*日期样式*/
.div10>.div11{
  background-color: white;
  margin-top: 15px;
}
/*  班次样式 */
.div10>.div12{
  /*border: 1px solid red;*/
  background-color:white;
  margin-top: 15px;
}
.div20{
  text-align: center;
  background-color:white;
}
.div20>.div21{
  background-color: white;
}
.border{
  border: 1px solid black;
}
.doc{
  background-color: white;
}
</style>
