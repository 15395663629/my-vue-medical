<template>
<el-row >
  <el-col >
<!--    <el-select v-model="value" placeholder="请选择科室"-->
<!--               style="width: 20%"  @change="dome($event)">-->
<!--      <el-option v-for="item in kslist" :key="item.ksId" :label="item.ksName" :value="item.ksId">-->
<!--      </el-option>-->
<!--    </el-select>-->
<!--    <el-select v-model="value" placeholder="请选择员工"-->
<!--               style="width: 20%;margin-left: 50px"  @change="dome($event)">-->
<!--      <el-option v-for="item in dept" :key="item.rid" :label="item.rname" :value="item.rid">-->
<!--      </el-option>-->
<!--    </el-select>-->
    <el-button style="margin-left: 80px" @click="dialogVisible = true">新增排班</el-button>
  </el-col>
</el-row>
<!--  <el-calendar id="calendar">-->
<!--    &lt;!&ndash; 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法&ndash;&gt;-->
<!--    <template-->
<!--        slot="dateCell"-->
<!--        slot-scope="{date, data}">-->
<!--      &lt;!&ndash;自定义内容&ndash;&gt;-->
<!--      <div>-->
<!--        <div class="calendar-day" style="text-align: center">-->
<!--          <el-tooltip v-if="brightDate.indexOf(data.day) != -1" class="item" effect="dark" :content="content(data.day)" placement="right">-->
<!--            <span class="everyDay">{{ data.day.split('-').slice(2).join('-') }}</span>-->
<!--          </el-tooltip>-->
<!--          <span v-else>{{ data.day.split('-').slice(2).join('-') }}</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </template>-->
<!--  </el-calendar>-->
  <el-dialog title="科室管理" v-model="dialogVisible" width="30%" :before-close="handleClose">
    请选择科室：<el-select v-model="value" placeholder="请选择"
                     style="width: 30%;margin-top:20px;" @change="dome($event)">
    <el-option v-for="item in kslist" :key="item.ksId" :label="item.ksName" :value="item.ksId" >

    </el-option>
  </el-select><br />
    请选择员工：  <el-select v-model="staff" multiple placeholder="请选择" style="width: 30%;margin-top:20px;" @change="obtainStaff($event)">
    <el-option
        v-for="item in staffs"
        :key="item.sid"
        :label="item.sname"
        :value="item.sid">
    </el-option>
  </el-select>
<!--  />-->
<!--    <el-select v-model="staff" placeholder="请选择"-->
<!--                                                             style="width: 30%;margin-top:20px;" @change="dome($event)">-->
<!--    <el-option v-for="item in staffs" :key="item.sid" :label="item.sname" :value="item.sid" >-->

<!--    </el-option>-->
<!--  </el-select>-->
    <br />
    请选择班次：<el-select v-model="fre" placeholder="请选择"
                     style="width: 30%;margin-top:20px;" @change="obtainfre($event)">
    <el-option v-for="item in fres" :key="item.fid" :label="item.ffrequency" :value="item.fid" >

    </el-option>
  </el-select><br />
    时<span style="margin-left: 10px"></span>间：<el-date-picker
        v-model="shijian"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :shortcuts="shortcuts"
        style="margin-top: 20px"
        @change="dateChangebirthday1"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
  >
    </el-date-picker>
    <template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="ok">确 定</el-button>
			</span>
    </template>
  </el-dialog>
  <!-- 日历 -->
<!--   <el-calendar style="margin-top: 10px">-->
<!--     <template #dateCell="{data}">-->
<!--       <p  v-for="i in sch">-->
<!--         {{ data.day.split('-').slice(1).join('-') }}-->
<!--       </p>-->
<!--     </template>-->
<!--   </el-calendar>-->

</template>

<script>
import qs from "qs";
export  default {
  data(){
    return{

      dialogVisible:false,
      staff:'',
      fre:'',
      //班次下拉列表
      fres:[],
      value:'',
      //科室下拉列表
      kslist:[],
      //员工下拉列表
      staffs:[],

      shijian:'',
      sch:{
        scId:0,
        scStartDate:'',
        scEndDate:'',
        sId:0,
        fcId:0
      },
      f:{
        shid:0,
        Shitime:'',
        ksid:0,
      },
      freId:0,
      shortcuts: [{
        text: '最近一周',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        },
      }, {
        text: '最近一个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        },
      }, {
        text: '最近三个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        },
      }],

    }
  },
  methods:{
    getData(){
      this.axios.get('http://localhost:8089/ks-list').then((v)=>{
        this.kslist=v.data
      }).catch()
      this.axios.get('select-fre').then((v)=>{
        this.fres=v.data
        console.log(this.fre)
      }).catch()
    },
    dome(event){
      this.ksid=event
      this.axios({
        url:"staff-ks",
        params:{id:this.ksid}
      }).then((v)=>{
        this.staffs=v.data
      }).catch();
    },
    obtainStaff(event){
      this.obtain=event
    },
    obtainfre(event){
      this.freId=event
    },
    dateChangebirthday1(val){
     this.Shitime=val
    },
    ok(){
      // var freid=this.freId
      //获取日期
      this.axios.post('data-time',{funs:this.Shitime,funss:this.obtain,freid:this.freId}).then((v)=>{
      }).catch()
      // this.axios({
      //   url:"data-time",
      //   params:{grant:qs.stringify(grant)}
      // }).then((v)=>{
      // }).catch();
    },

  },
  created() {
    this.getData()
  }
}
</script>


<style >
.is-selected {
  color: #1989FA;
}
</style>
