<template>
	<h1>销毁</h1>
	<el-row :gutter="26">
		<el-col :span="21">
			<el-date-picker v-model="value1" type="date" placeholder="选择销毁日期"></el-date-picker>
			<el-button type="primary" icon="el-icon-search">搜索</el-button>
		</el-col>
		<el-col :span="2">
			<el-button type="primary"  @click="dialogFormVisible = true">销毁药品</el-button>
		</el-col>
		
		<el-dialog title="销毁药品" v-model="dialogFormVisible" width="25%">
			<el-form >
		    <el-form-item label="药品批次" :label-width="formLabelWidth">
		      <el-input autocomplete="off" style="width: 215px;"></el-input>
		    </el-form-item>
			<el-form-item label="药品名" :label-width="formLabelWidth">
			  <el-input autocomplete="off" style="width: 215px;"></el-input>
			</el-form-item>
			<el-form-item label="销毁数量" :label-width="formLabelWidth">
				<el-input-number @change="handleChange" :min="1" :max="1000" label="销毁数量"></el-input-number>
			</el-form-item>
		    <el-form-item label="生产厂家" :label-width="formLabelWidth">
		      <el-input autocomplete="off" style="width: 215px;"></el-input>
		    </el-form-item>
		    <el-form-item label="销毁日期" :label-width="formLabelWidth">
		    	<el-date-picker v-model="value1" type="date" placeholder="选择销毁日期"></el-date-picker>
		    </el-form-item>
		    <el-form-item label="经手人" :label-width="formLabelWidth">
		    	<el-select v-model="form.region" placeholder="选择经手人">
		    	  <el-option label="张三" value="shanghai"></el-option>
		    	  <el-option label="李四" value="beijing"></el-option>
		    	  <el-option label="王五" value="beijing"></el-option>
		    	</el-select>
		    </el-form-item>
			<el-form-item label="销毁原因" :label-width="formLabelWidth">
				<el-select v-model="form.region" placeholder="选择经手人">
				  <el-option label="过期" value="shanghai"></el-option>
				  <el-option label="损坏" value="beijing"></el-option>
				  <el-option label="王五" value="beijing"></el-option>
				</el-select>
			</el-form-item>
		  </el-form>
		  <template #footer>
		    <span class="dialog-footer">
		      <el-button @click="dialogFormVisible = false">取 消</el-button>
		      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		    </span>
		  </template>
		</el-dialog>
	</el-row>
	<el-row>
		<el-col>
			<el-table :data="tableData" border style="width: 100%;">
				<el-table-column prop="drug" label="批次" width="150">
					</el-table-column>
				<el-table-column prop="date" label="日期" width="150">
					</el-table-column>
				<el-table-column prop="name" label="药品名" width="150">
					</el-table-column>
				<el-table-column prop="province" label="销毁数量" width="150">
					</el-table-column>
				<el-table-column prop="city" label="生产厂家" width="150">
					</el-table-column>	
				<el-table-column prop="address" label="经手人" width="150">
					</el-table-column>
				<el-table-column prop="yuan" label="销毁原因" width="150">
					</el-table-column>
				<el-table-column prop="zip" label="备注" width="150">
					</el-table-column>
				<el-table-column fixed="right" label="操作" width="200">
					<template #default="scope">
						<el-button type="success" plain size="small">打印销毁记录</el-button>
						<el-button type="primary" plain size="small">编辑</el-button>
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
					yuan:'过期',
					date: '2016-05-02',
					name: '六味地黄丸',
					province: 50,
					city: '四季药厂',
					drug:'20160502666',
					address: '李四',
					dan:'20元',
					zip: ''
				},
				{
					
				},
				{
					
				},
				{
					
				}],
				input:'',
				dialogFormVisible: false,
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