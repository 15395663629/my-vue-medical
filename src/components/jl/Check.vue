<template>
	<h1>药品盘点</h1>
	<el-row>
		<el-col :offset="10">
			<!-- 新增弹窗 -->
			<el-button type="primary" @click="dialogFormVisible = true">新增记录</el-button>
			<el-dialog  title="药房发药" v-model="dialogFormVisible">
			  <el-form :model="tableData">
				<el-form-item label="医嘱编号" :label-width="formLabelWidth">
				  <el-input v-model="tableData.name" autocomplete="off" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item label="药品选择" :label-width="formLabelWidth">
				  <el-select v-model="tableData.guige" placeholder="请选择活动区域">
					<el-option label="药品一" value="shanghai"></el-option>
					<el-option label="药品二" value="beijing"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="药品数量" :label-width="formLabelWidth">
					<el-input-number v-model="tableData.chuku" @change="handleChange" :min="1" :max="10" label="药品数量"></el-input-number>
				</el-form-item>
			  </el-form>
			  <template #footer>
				<span class="dialog-footer">
				  <el-button @click="dialogFormVisible = false">取 消</el-button>
				  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
				</span>
			  </template>
			</el-dialog>
		</el-col>
	</el-row>
	<!-- 盘点表格 -->
	<el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
		style="width: 100%">
		<el-table-column label="药品名" prop="name">
		</el-table-column>
		<el-table-column label="规格" prop="guige">
		</el-table-column>
		<el-table-column label="单位" prop="danwei">
		</el-table-column>
		<el-table-column label="出库数量" prop="chuku">
		</el-table-column>
		<el-table-column label="入库数量" prop="ruku">
		</el-table-column>
		<el-table-column label="调拨数量" prop="diaobo">
		</el-table-column>
		<el-table-column label="损耗数量" prop="sunhao">
		</el-table-column>
		<el-table-column label="本月库存" prop="benyue">
		</el-table-column>
		<el-table-column label="上月库存" prop="shangyue">
		</el-table-column>
		<el-table-column align="right">
			<template #header>
				<el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
			</template>
			<template #default="scope">
				<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
				<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
			</template>
		</el-table-column>
	</el-table>
	<!-- 分页插件 -->
	<el-pagination
			style="text-align: center;"
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage4"
	      :page-sizes="[100, 200, 300, 400]"
	      :page-size="100"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="400">
	</el-pagination>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
					name: '板蓝根',
					guige: '20g/包',
					danwei: '1/盒',
					chuku: '40',
					ruku: '60',
					diaobo: '20',
					sunhao: '0',
					benyue: '10',
					shangyue: '80',
				}],
				search: '',
				dialogFormVisible: false,
				formLabelWidth: '',
				currentPage4: 4,
			}
		},
		methods: {
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			handleSizeChange(val) {
			    console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
		},
	}
</script>

<style>
</style>
