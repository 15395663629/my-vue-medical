<template>
	<el-button type="primary"  @click="dialogVisible1 = true">新增角色</el-button>
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
				<el-button type="primary" @click="dialogVisible1 = true">编辑角色</el-button>
				<el-button type="primary" @click="">角色授权</el-button>
				<el-button type="danger" @click="open">删除角色</el-button>
			</template>
		</el-table-column>

	</el-table>
	<!--分页插件-->
	<el-pagination style="text-align: center;" @size-change="totalCut" @current-change="pageCut" :current-page="1"
		:page-sizes="[2,4,6,8,10]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
	</el-pagination>
	<el-dialog title="角色管理" v-model="dialogVisible1" width="30%" :before-close="handleClose">
		<!-- 表格 -->
		请输入角色名称：<el-input type="text" style="width: 40%;"></el-input><br />
		请选择所属部门：<el-select v-model="value" placeholder="请选择"
			style="width: 20%;margin-top:20px;">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
	
			</el-option>
		</el-select><br />
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				currentPage1: 5,
				currentPage2: 5,
				currentPage3: 5,
				currentPage4: 4,
				dialogVisible1:false,
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
				dialogTableVisible: false,
				formLabelWidth: '120px',
				options: [{
					value: '选项1',
					label: '护理科'
				}, {
					value: '选项2',
					label: '五官科'
				}],
				value: '',
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
</style>
