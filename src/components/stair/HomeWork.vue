<template>
<!--	<h1>工作台</h1>-->
<!--	<button @click="logout()">退出登入</button>-->
  <span style="margin-left: 220px;font-size: 24px;color: red">本周药品采购</span>
  <div id="myChart"
       :style="{width: '50%',height:'400px'} " > </div>
</template>

<script>
import echarts from 'echarts'
	export default {
    data() {
      return {
        token: '',
        tableData: [120, 132, 101, 134, 90, 230, 210]
      }
    },
    methods: {
      dome() {
        //this.$root => app
        let myChart = echarts.init(
            document.getElementById("myChart")
        );
        //
        // 绘制图表
        myChart.setOption({
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Email',
              type: 'line',
              stack: 'Total',
              data: this.tableData
            },
            {
              name: 'Union Ads',
              type: 'line',
              stack: 'Total',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: 'Video Ads',
              type: 'line',
              stack: 'Total',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: 'Direct',
              type: 'line',
              stack: 'Total',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: 'Search Engine',
              type: 'line',
              stack: 'Total',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        });
        // console.log(myChart.setOption.title.text+'---')
      },
      logout(){
        window.sessionStorage.clear()
        this.$router.push('/')
      }
    },

		created() {
      this.token = this.$store.state.token

    },
    mounted() {
      this.dome()
    }
  }
</script>

<style>
</style>
