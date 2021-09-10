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
                      @change="dome($event)"
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
                    v-model="ksId"
                    clearable
                    value-key="ksId"
                    size="small"
                    style="width: 240px"
                    @change="quit($event)"
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
                <el-button type="primary" round icon="el-icon-refresh" size="mini">打印</el-button>
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
      <el-col :span="2" class="div21 ">
        {{pb.xq}}<br>{{pb.rq}}
      </el-col>
      <el-col :span="wid" v-for="bc in schedulingTypeOptions" class="doc">
          <span v-for="ygpb in pb.slist">
            <template v-if="ygpb.frId==bc.fid">
              {{ygpb.staff.sname+"&#32"}}
            </template>
          </span>

        <el-button type="primary" icon="el-icon-plus"  :disabled="pb.state" circle @click="dakai(pb.rq,bc.fid)"></el-button>
      </el-col>
    </el-row>
    <!--    主体结束  -->
    <!--==========================弹框开始===========================-->
    <el-dialog v-model="dialogVisible" title='添加员工' >
        <!-- 复选情况下使用 check-strictly （默认false）使父子不相互关联 -->
        <el-tree
            ref="tree"
            :data="ksYgs"
            :props="defaultProps"
            show-checkbox
            node-key="tid"
            default-expand-all
            check-strictly

        />
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
      status:false,
      ksYgs: [],
      //级联选择
      defaultProps: {
        label: 'tname',
        children: 'staff'
      },
      ksId: '',
      keShi: [],
      //  班次类型
      pbType: '',
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
      }
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
  },
  methods: {
    getData(){
      this.axios.get('list-fre').then((v)=>{
        this.deptOptions=v.data
      }).catch()
      this.axios.get("ks-list").then((v)=>{
        this.keShi=v.data
      }).catch()
      this.axios.get('add-sch').then((v)=>{
      this.ksYgs=v.data
      }).catch()
    },
    dome(event){
     this.bcId=event
      this.axios({
        url:"bc-list",
        params:{bcId:this.bcId}
      }).then((v)=>{
        this.schedulingTypeOptions=v.data
        this.length2=v.data.length
        console.log(this.schedulingTypeOptions)
      }).catch();
    },
    quit(event){
      this.ksId=event
      this.axios({
        url:"week",
        params:{ksId:this.ksId}
      }).then((v)=>{
        this.pbtableData=v.data
      }).catch();
      // this.domes()
    },
    dakai(rq,bcId){
      this.dialogVisible= true
     this.sch.rq=rq
      this.sch.bcId=bcId
    },
    confirmRole(){
      var funs=this.$refs.tree.getCheckedKeys();//员工id
      //班次编号
      console.log(this.schedulingTypeOptions[0].fid)
      //日期
      var grant = JSON.stringify({rq:this.sch.rq,bcId:this.sch.bcId,funs:funs})
      this.axios.post("saveGrant",qs.stringify({grant:grant})).then((res)=>{
        this.dialogVisible=false
        // this.getData()
        this.dome(this.bcId)
        this.quit(this.ksId)
        this.thisWeek()
      }).catch()
    },
    end(){
      this.axios.get('end-week').then((v)=>{
        this.pbtableData=v.data
        this.getData()
      }).catch()
    },
    star(){
      this.axios.get('star-week').then((v)=>{
        this.pbtableData=v.data
        this.getData()
      }).catch()
    },
    thisWeek(){
      this.axios.get('this-week').then((v)=>{
        this.pbtableData=v.data
        this.getData()
      }).catch()
    },
  // domes(){
  //   if(this.pbtableData.length!=0){
  //     var _this = this;
  //     let yy = new Date().getFullYear();
  //     let mm = new Date().getMonth()+1;
  //     let dd = new Date().getDate();
  //     _this.gettime = yy+'/'+mm+'/'+dd
  //     console.log(_this.gettime)
  //     let o= _this.gettime.split('/')
  //     //当前时间的时间戳
  //     let nowTime=new Date(o)
  //     let timec=nowTime * 1
  //     for (let i = 0; i < this.pbtableData.length; i++) {
  //       let cs=this.pbtableData[i].rq
  //       let arr=cs.split('/')
  //       // console.log(arr)
  //       //后端查询的时间戳
  //       let timeout=new Date(arr)
  //       let times=timeout * 1
  //       if(timec - times<0){
  //         this.status=false
  //       }else{
  //         this.status=true
  //       }
  //     }
  //   }
  // }
  }
}

</script>

<style>
.div10{
  text-align: center;
  height: 30px;
  background-color: #99a9bf;
}
/*日期样式*/
.div10>.div11{
  background-color: #909399;
}
/*  班次样式 */
.div10>.div12{
  /*border: 1px solid red;*/
  background-color: #99a9bf;
}
.div20{
  text-align: center;
  background-color: #99a9bf;
}
.div20>.div21{
  background-color: #909399;
}
.border{
  border: 1px solid black;
}
.doc{
  background-color: #99a9bf;
}
</style>
