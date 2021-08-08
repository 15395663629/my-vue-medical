<template>
	<h1>工作台</h1>
	<button @click="logout()">退出登入</button>
  {{token}}
<!--  <div class="app-content">-->
<!--    <el-table-->
<!--        :span-method="objectSpanMethod"-->
<!--        :data="tableData"-->
<!--        style="width: 100%" :header-cell-style="{'text-align':'center'}">-->
<!--      <el-table-column-->
<!--          prop="ks.ksName"-->
<!--          label="科室"-->
<!--      >-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          prop="staff.sname"-->
<!--          label="医生"-->
<!--      >-->
<!--      </el-table-column>-->
<!--      <el-table-column label="出诊时间" >-->
<!--        <el-table-column-->
<!--            label="周一"-->
<!--        >-->
<!--          <template v-slot="scope">-->
<!--            <p>{{scope.row.scStartDate}}~{{scope.row.scEndDate}}</p>-->
<!--&lt;!&ndash;            <p v-if="scope.row.scStartDate==='08:00:00' && scope.row.scEndDate==='16:00:00'">早班</p>&ndash;&gt;-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            label="周二"-->
<!--        >-->
<!--          <template v-slot="scope">-->
<!--            <p>{{scope.row.scStartDate}}~{{scope.row.scEndDate}}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            label="周三">-->
<!--          <template v-slot="scope">-->
<!--            <p>{{scope.row.scStartDate}}~{{scope.row.scEndDate}}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            label="周四"-->
<!--        >-->
<!--          <template v-slot="scope">-->
<!--            <p>{{scope.row.scStartDate}}~{{scope.row.scEndDate}}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            label="周五"-->
<!--        >-->
<!--          <template v-slot="scope">-->
<!--            <p>{{scope.row.scStartDate}}~{{scope.row.scEndDate}}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            label="周六"-->
<!--        >-->
<!--          <template v-slot="scope">-->
<!--            <p>{{scope.row.scStartDate}}~{{scope.row.scEndDate}}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            label="周日"-->
<!--        >-->
<!--          <template v-slot="scope">-->
<!--            <p>{{scope.row.scStartDate}}~{{scope.row.scEndDate}}</p>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--  </div>-->
</template>

<script>
	export default{
		data(){
			return{
				token:'',
        tableData: [
        ]
			}
		},
		methods:{
		  // getData(){
		  //   this.axios.get('home-sch').then((v)=>{
		  //     this.tableData=v.data
      //     console.log(this.tableData)
      //   }).catch()
      // },
			logout() {
			  window.sessionStorage.clear()
			  this.$router.push('/')
			},
      // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //   if (columnIndex === 0) {
      //     return {
      //       rowspan: row.rowspan,
      //       colspan: 1
      //     };
      //   }
      // },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % row.ksRen == 0) {
            return {
              rowspan: row.ksRen,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      setrowspans() {
        // 先给所有的数据都加一个v.rowspan = 1
        this.tableData.forEach(v => {
          v.rowspan = 1;
        });
        // 双层循环
        for (let i = 0; i < this.tableData.length; i++) {
          // 内层循环，上面已经给所有的行都加了v.rowspan = 1
          // 这里进行判断
          // 如果当前行的id和下一行的id相等
          // 就把当前v.rowspan + 1
          // 下一行的v.rowspan - 1
          for (let j = i + 1; j < this.tableData.length; j++) {
            //此处可根据相同字段进行合并，此处是根据的id
            if (this.tableData[i].ks.ksId === this.tableData[j].ks.ksId) {
              this.tableData[i].rowspan++;
              this.tableData[j].rowspan--;
            }
          }
          // 这里跳过已经重复的数据
          i = i + this.tableData[i].rowspan - 1;
        }
      }

		},
		created() {
      this.token = this.$store.state.token
      // this.getData()
      this.setrowspans();

    }
  }
</script>

<style>
</style>
