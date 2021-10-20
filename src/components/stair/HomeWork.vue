<template>
  <div>


  <div id="app">
    <div style="width: 300px;height: 100px;">
      <i class="el-icon-user" style="font-size: 100px;"></i>
      <div style="font-size: 20px;font-family:微软雅黑;color: #909399;margin-top: -80px;margin-left: 120px" >工作人员</div>
      <div style="font-size: 20px;font-family:微软雅黑;color: black;margin-top: 10px;margin-left: 130px">{{funs}}</div>
    </div>
    <div style="width: 300px;height: 100px;margin-left: 500px;margin-top: -100px;">
      <i class="el-icon-s-operation" style="font-size: 100px;"></i>
      <div style="font-size: 20px;font-family:微软雅黑;margin-top: -80px;margin-left: 120px;color: #909399;" >就诊病例</div>
      <div style="font-size: 20px;font-family:微软雅黑;color: black;margin-top: 10px;margin-left: 130px">{{nums}}</div>
    </div>
    <div style="width: 300px;height: 100px;margin-left: 1000px;margin-top: -100px">
      <i class="el-icon-document-checked" style="font-size: 100px;"></i>
      <div style="font-size: 20px;font-family:微软雅黑;color: #909399;margin-top: -80px;margin-left: 120px" >本月收入</div>
      <div style="font-size: 20px;font-family:微软雅黑;color: black;margin-top: 10px;margin-left: 130px">{{moeney}}</div>
    </div>
    <div id="main" style="width:80%;height:60%;margin-top: 30px"></div>0
  </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "App",
  created() {
    this.getAllEcharts();
    this.dome()
  },
  data() {
    return {
      name: [],
      num: [],
      funs:"",
      nums:'',
      moeney:''
    };
  },
  methods: {
    async getAllEcharts() {
      const {data: res1} = await this.$http.get("echarts");
      console.log(res1);
      this.num = res1.num;
      this.name = res1.name;
      console.log(this.num,"111")
      this.setChart();
    },
    setChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById('main'))
      // console.log(this.chart)
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "医院收入"
        },
        tooltip: {},
        legend: {
          data: ["住院部收入", '门诊部收入']
        },
        xAxis: {
          data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        },
        yAxis: {},
        series: [
          {
            name: "住院部收入",
            type: "bar",
            data: this.num,
          },
          {
            name: '门诊部收入',
            type: 'bar',
            data: this.name
          },
        ],
      }
      this.chart.setOption(option);
    },
    mounted() {
      this.$nextTick(function () {
        this.drawPid("main");
      });
    },
    dome(){
      this.axios.get("selectall-staffs").then((res)=>{
        this.funs = res.data
      }).catch()
      this.axios.get("chaxunnums").then((res)=>{
        this.nums=res.data
      }).catch()
      this.axios.get("moneny").then((res)=>{
        this.moeney=res.data
        // console.log(res,'1111')
        console.log("1122",res)
      }).catch()
    }
  }
}
</script>