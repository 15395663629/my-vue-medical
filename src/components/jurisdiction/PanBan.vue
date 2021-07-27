<template>
<el-row >
  <el-col >
    <el-select v-model="value" placeholder="请选择科室"
               style="width: 20%"  @change="dome($event)">
      <el-option v-for="item in dept" :key="item.rid" :label="item.rname" :value="item.rid">
      </el-option>
    </el-select>
    <el-select v-model="value" placeholder="请选择员工"
               style="width: 20%;margin-left: 50px"  @change="dome($event)">
      <el-option v-for="item in dept" :key="item.rid" :label="item.rname" :value="item.rid">
      </el-option>
    </el-select>
    <el-button style="margin-left: 80px" @click="dialogVisible = true">新增排班</el-button>
  </el-col>
</el-row>
  <el-dialog title="科室管理" v-model="dialogVisible" width="30%" :before-close="handleClose">
<!--    请选择员工：<el-select v-model="staff" placeholder="请选择"-->
<!--                                                             style="width: 30%;margin-top:20px;" @change="dome($event)">-->
<!--    <el-option v-for="item in dplist" :key="item.deId" :label="item.deName" :value="item.deId" >-->

<!--    </el-option>-->
<!--  </el-select><br />-->
<!--    请选择班次：<el-select v-model="fre" placeholder="请选择"-->
<!--                     style="width: 30%;margin-top:20px;" @change="dome($event)">-->
<!--    <el-option v-for="item in dplist" :key="item.deId" :label="item.deName" :value="item.deId" >-->

<!--    </el-option>-->
<!--  </el-select><br />-->
    时<span style="margin-left: 10px"></span>间：<el-date-picker
        v-model="shijian"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :shortcuts="shortcuts"
        style="margin-top: 10px"
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
   <el-calendar style="margin-top: 10px">
     <template #dateCell="{data}">
       <p  v-for="i in sch">
         {{ data.day.split('-').slice(1).join('-') }}
       </p>
     </template>
   </el-calendar>

</template>

<script>
import qs from "qs";

export  default {
  data(){
    return{
      dialogVisible:false,
      staff:'',
      fre:'',
      dome:[],
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
        Shitime:''
      },
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
      this.axios.get('paiban').then((v)=>{
        this.sch=v.data
        console.log(this.sch)
      }).catch()
    },
    dateChangebirthday1(val){
     this.Shitime=val
    },
    ok(){
      // var grant = JSON.stringify({Shitime:this.Shitime})
      // // console.log(grant)
      // this.axios.get('data-time',qs.stringify({grant})).then((v)=>{
      //
      // }).catch()
    }
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
