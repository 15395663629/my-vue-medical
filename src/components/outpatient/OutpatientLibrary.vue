<template>
	<div></div>
	<el-row>
		<el-col :span="10">
			<el-input style="width: 240px" v-model="input" placeholder="请输入患者信息方便查询" ></el-input>  
			<el-button type="primary" icon="el-icon-search">查询</el-button>
		</el-col>
	</el-row>
<el-table
	@row-dblclick="drawer = true" :data="tableData" border height="530" style="width: 100% ; margin-top: 10px">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="100">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="100">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="600">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template #default="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
		style="text-align: center; margin-top: 10px;"
		background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
							<!-- ======================抽屉 -->
  <el-drawer 			
    title="我是外面的 Drawer"
    v-model="drawer"
    size="50%">
    <div>
     <el-button @click="innerDrawer = true">打开里面的!</el-button>
     <el-drawer
       title="我是里面的"
       :append-to-body="true"
       :before-close="handleClose"
       v-model="innerDrawer">
       <p>_(:зゝ∠)_</p>
     </el-drawer>
    </div>
  </el-drawer>
</template>

<script>
	export default {
		data() {
			return {
				drawer: false,
				innerDrawer: false,//抽屉
				currentPage4: 4,
				input:'',
				tableData: [{
				  date: '2016-05-02',
				  name: '王小虎',
				  province: '上海',
				  city: '普陀区',
				  address: '上海市普陀区金沙江路 1518 弄',
				  zip: 200333
				}, {
				  date: '2016-05-04',
				  name: '王小虎',
				  province: '上海',
				  city: '普陀区',
				  address: '上海市普陀区金沙江路 1517 弄',
				  zip: 200333
				}, {
				  date: '2016-05-01',
				  name: '王小虎',
				  province: '上海',
				  city: '普陀区',
				  address: '上海市普陀区金沙江路 1519 弄',
				  zip: 200333
				}, {
				  date: '2016-05-03',
				  name: '王小虎',
				  province: '上海',
				  city: '普陀区',
				  address: '上海市普陀区金沙江路 1516 弄',
				  zip: 200333
				}]
			};
		},
		 methods: {
			  handleClick(row) {
				console.log(row);
			  },
			  handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			  },
			  handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			  },
				handleClose(done) {
				this.$confirm('还有未保存的工作哦确定关闭吗？')
				  .then(_ => {
					done();
				  })
				  .catch(_ => {});
				}
		},
		
	};
</script>

<style>
</style>
