<template>
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
      <el-col :span="wid" class="div12" v-for="bc in schedulingTypeOptions" :key="bc.bc">
        {{bc.fstartTime}}至{{bc.fendTime}}
      </el-col>
    </el-row>
    <!--    表头结束  -->

    <!--    主体开始  -->
    <el-row class="div20 " v-for="pb in pbtableData" style="margin-top: 2px;height: 60px;">
      <el-col :span="2" class="div21 ">
        {{pb.xq}}<br>{{pb.rq}}
      </el-col>
      <el-col :span="wid" v-for="bc in schedulingTypeOptions">
          <span v-for="ygpb in pb.slist">
            <template v-if="ygpb.bcId==bc.bc">
               {{ygpb.staff.sname}}
            </template>
          </span>
      </el-col>
    </el-row>
    <!--    主体结束  -->
    <!--==========================弹框开始===========================-->
    <el-dialog v-model="dialogVisible" title='添加员工' >
      <el-form-item label="科室">
        <el-tree
            ref="tree"
            :data="ksYgs"
            :props="defaultProps"
            show-checkbox
            node-key="ygId"
            class="permission-tree"
        />
      </el-form-item>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false,this.reset()">关闭</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
    <!--    ========================弹框结束=======================-->

  </div>
</template>

<script>
export default {
  data() {
    return {
      ksYgs: [

      ],
      //级联选择
      defaultProps: {
        children: 'yuanGos',
        label: 'ygName'
      },
      ksId: 911,
      keShi: [{
        ksId: 913,
        ksName: "外科",
        ygId: "1003"
      }],
      //  班次类型
      pbType: '',
      // 遮罩层
      loading: false,
      // 对话框标题
      title: '',
      // 是否打开对话框
      open: false,
      // 排班类型数据
      deptOptions: [{

      }],
      // 医生数据
      userOptions: [],
      // 班次数据
      schedulingTypeOptions: [{

      }],
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
      token:'',
      bcId:0
    }
  },
  //  计算属性
  computed: {
    wid(){
      return Math.floor(22/this.length2)
    }
  },
  created() {
    this.token = this.$store.state.token
    this.getDate()
  },
  methods: {
    getDate(){
      this.axios.get('list-fre').then((v)=>{
        this.deptOptions=v.data
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
        this.schDate()
        console.log(this.schedulingTypeOptions)
      }).catch();
  },
    //排版数据
    schDate(){
      this.axios({
        url:"now-date",
        params:{ksId:this.token.list.ksId,sId:this.token.list.sid}
      }).then((v)=>{
        this.pbtableData=v.data
        console.log(this.pbtableData)
      }).catch();
    }
}}

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
