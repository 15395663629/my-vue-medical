<template>
	
	<el-row class=" row-one">
		<el-col :span="8">
			班次： <el-select v-model="value" placeholder="请选择" style="width: 120px;">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					姓名：<el-input style="width: 120px;" v-model="name" value=""></el-input>
		</el-col>
		<el-col :span="0.25">
			<el-date-picker
			      v-model="value3"
			      type="daterange"
			      unlink-panels
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      :shortcuts="shortcuts"
			    >
			    </el-date-picker>
      <el-button type="primary" icon="el-icon-orange" size="medium" style="margin-left: 20px">查询</el-button>
      <el-button type="primary" @click="dialogVisible = true" size="medium">新增排班记录</el-button>
		</el-col>
<!--		<el-col :span="12" >-->

<!--		</el-col>-->
	</el-row>
		


	<!-- <el-button type="primary">重置密码</el-button> -->
	<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
		@selection-change="handleSelectionChange" class="dome">
		<el-table-column type="selection" width="55">
		</el-table-column>
		<el-table-column label="日期" width="120">

			<template #default="scope">{{ scope.row.date }}</template>
		</el-table-column>
		<el-table-column prop="name" label="姓名" width="120">
		</el-table-column>
		<el-table-column prop="address" label="地址" width="540">
		</el-table-column>
		<el-table-column label="操作">
			<template v-slot:default="r">
				<el-button type="primary" @click="dialogVisible = true" size="small">编辑</el-button>
			</template>
		</el-table-column>

	</el-table>
	<el-dialog title="工作人员排班" v-model="dialogVisible" width="50%" :before-close="handleClose">
		<!-- 表格 -->
		请选择：<el-select v-model="value1" placeholder="请选择" style="width: 20%;margin-top:20px;">
			<el-option v-for="item in optionss" :key="item.value1" :label="item.label1" :value="item.value1">
	
			</el-option>
		</el-select>
		<el-row style="margin-top:20px;">
			<el-col :span="8">
				<el-table :data="tableDatas" height="400px" border style="width: 100%">
					<el-table-column prop="uno" label="编号" width="">
					</el-table-column>
					<el-table-column prop="name" label="姓名" width="">
					</el-table-column>
					<el-table-column prop="sf" label="职位">
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-row style="margin-left: 360px;margin-top: -400px;">
			<el-col>
				编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<el-input type="text"
					style="width: 40%;" v-model="uid" value=""></el-input>
			</el-col>
			<el-col style="margin-top: 20px!important;">
				姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<el-input type="text"
					style="width: 40%;" v-model="name" value=""></el-input>
			</el-col>
	
			<el-col style="margin-top: 20px!important;">
				职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<el-input type="text"
					style="width: 40%;" v-model="zc" value=""></el-input>
			</el-col>
			<el-col style="margin-top: 20px!important;">
				请选择班次： <el-select v-model="value" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-col>
			<el-col style="margin-top: 20px!important;">
				开始日期：<el-time-select placeholder="起始时间" v-model="startTime" start='08:30' step='01:00'
					end='23:59'>
				</el-time-select>
			</el-col>
			<el-col style="margin-top: 20px!important;">
				结束日期：<el-time-select placeholder="结束时间" v-model="endTime" start='08:30' step='01:00' end='23:59'
					:minTime="startTime">
				</el-time-select>
			</el-col>
		</el-row>
		<el-row style="margin-top: 80px !important;">
			<el-col>
				快速查找：<el-input type="text" style="width: 20%;" v-model="cname" value=""></el-input>
				<el-button type="primary" style="margin-left: 10px;">查询</el-button>
			</el-col>
		</el-row>
		<template #footer>
			<span class="weizhi">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</template>
	</el-dialog>
	<!-- 分页插件 -->
	<el-pagination style="text-align: center;" @size-change="totalCut" @current-change="pageCut" :current-page="1"
		:page-sizes="[2,4,6,8,10]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
	</el-pagination>
</template>

<script>
	const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
	// import { defineComponent, reactive, toRefs } from 'vue';
	export default {
		data() {
			return {
				name: '',
				cname: '',
				uid: '',
				zc: '',
				startTime: '',
				endTime: '',
				value1: '',
				currentPage1: 5,
				currentPage2: 5,
				currentPage3: 5,
				currentPage4: 4,
				tableData: [{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-08',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-06',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
				multipleSelection: [],
				dialogVisible: false,
				formLabelWidth: '120px',
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value: '',
				optionss: [{
					value1: '选项1',
					label1: '护理科'
				}, {
					value1: '选项2',
					label1: '五官科'
				}],
				value1: '',
				tableDatas: [{
					uno: '1',
					name: '王小虎',
					sf: '大哥'
				}, {
					uno: '2',
					name: '王小虎',
					sf: '二弟'
				}, {
					uno: '3',
					name: '王小虎',
					sf: '三弟'
				}],
				shortcuts: [{
					text: '最近一周',
					value3: (() => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
						return [start, end]
					})(),
				}, {
					text: '最近一个月',
					value3: (() => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
						return [start, end]
					})(),
				}, {
					text: '最近三个月',
					value3: (() => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
						return [start, end]
					})(),
				}],
				value3: ''
			}
		},

		methods: {

			handleSelectionChange(val) {
				this.multipleSelection = val;
				// alert(123)

			},
			open() {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	}
</script>


<style>
	.dome {
		margin-top: 20px;
	}

	.left {
		/* border: 1px solid black; */
		width: 400px;
		height: 400px;
		margin-top: 20px;
	}

	.wzz {
		/* position: relative; */
		/* border: 1px solid black; */
		width: 550px;
		height: 400px;
		margin-top: -400px;
		margin-left: 450px;
	}

	.weizhi {
		position: absolute;
		margin-top: -80px;
		margin-left: -380px;
	}
</style>
