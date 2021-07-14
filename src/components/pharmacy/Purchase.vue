<template>
	<h1>药品采购</h1>
	<el-row>
		<el-col :span="3">
			<el-input placeholder="请输入经手人" v-model="input" clearable></el-input>
		</el-col>
		<el-col :span="8">
			<el-date-picker v-model="value1" type="date" placeholder="选择采购日期"></el-date-picker>
			<el-button type="primary" icon="el-icon-search">搜索</el-button>
		</el-col>
		<el-col :span="1" :offset="10">
			<!-- 新增弹窗 -->
			<el-button type="primary" @click="dialogFormVisible = true">新增采购计划</el-button>
			<el-dialog title="采购计划" v-model="dialogFormVisible">
        <button round @click="open = true">添加药品</button>
				<el-form>
					<el-form-item label="生产厂家" :label-width="formLabelWidth">
					  <el-input autocomplete="off" style="width: 215px;"></el-input>
					</el-form-item>
					<el-form-item label="采购日期" :label-width="formLabelWidth">
						<el-date-picker v-model="value1" type="date" placeholder="选择采购日期"></el-date-picker>
					</el-form-item>
					<el-form-item label="经手人" :label-width="formLabelWidth">
						<el-select v-model="form.region" placeholder="选择经手人">
						  <el-option label="张三" value="shanghai"></el-option>
						  <el-option label="李四" value="beijing"></el-option>
						  <el-option label="王五" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			    <el-table :data="gridData" height="200">
            <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column property="date" label="药品名" ></el-table-column>
              <el-table-column label="数量" >
                <template>
                  <el-input-number property="name" size="mini"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column property="address" label="单价"></el-table-column>
            <el-table-column property="xj" label="小计"></el-table-column>
            </el-table>
			  <template #footer>
			    <span class="dialog-footer">
			      <el-button @click="dialogFormVisible = false">取 消</el-button>
			      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			    </span>
			  </template>
			</el-dialog>
			<!-- 药品选择弹窗 -->
			<el-dialog title="药品选择" v-model="open">
				<el-table :data="Data">
				  <el-table-column type="selection" width="55"></el-table-column>
				  <el-table-column property="date" label="药品名" ></el-table-column>
				  <el-table-column property="name" label="数量"></el-table-column>
				  <el-table-column property="address" label="单价"></el-table-column>
				  <el-table-column property="xj" label="小计"></el-table-column>
				</el-table>
				<template #footer>
				  <span class="dialog-footer">
				    <el-button @click="open = false">取 消</el-button>
				    <el-button type="primary" @click="open = false">确 定</el-button>
				  </span>
				</template>
			</el-dialog>
		</el-col>
	</el-row>
	<!-- 表格 -->
	<el-row :gutter="20">
		<el-col>
			<el-table :data="tableData" border style="width: 100%;">
				<el-table-column prop="date" label="采购日期" >
					</el-table-column>
				<el-table-column prop="city" label="生产厂商" >
					</el-table-column>
				<el-table-column prop="drug" label="资金">
					</el-table-column>
				<el-table-column prop="address" label="经手人">
					</el-table-column>
				<el-table-column prop="zip" label="备注">
					</el-table-column>
				<el-table-column fixed="right" label="操作">
					<template #default="scope">
						<el-button type="primary" plain size="small">编辑</el-button>
            <el-button type="info" plain size="small">打印计划</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-col>
	</el-row>
	<!-- 分页 -->
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
		},

		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					city: '云南白药',
					drug:'500',
					address: '采购员',
					zip: ''
				},
				{
					
				},
				{
					
				},
				{
					
				}],
				gridData:[
					{
					date: '黄牛解毒丸',
					name: '50',
					address: '10',
					xj:'500'
					},
					{
					date: '黄牛解毒丸',
					name: '50',
					address: '10',
					xj:'500'
					},
					{
					date: '黄牛解毒丸',
					name: '50',
					address: '10',
					xj:'500'
					},
					{
					date: '黄牛解毒丸',
					name: '50',
					address: '10',
					xj:'500'
					},
					{
					date: '黄牛解毒丸',
					name: '50',
					address: '10',
					xj:'500'
					},
					{
					date: '黄牛解毒丸',
					name: '50',
					address: '10',
					xj:'500'
					},
				],
				Data:[
					{
					date: '六黄地味丸',
					name: '50',
					address: '10',
					xj:'500'
					},
				],
				input:'',
				dialogFormVisible: false,
				open:false,
				form: {
					  name: '',
					  region: '',
					  
					},
				formLabelWidth: '120px',
				value1: '',
			}
		}
	}
</script>

<style>
	
</style>