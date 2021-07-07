<template>
	<h1>出库</h1>
	<el-row>
		<el-col :span="3">
			<el-input placeholder="请输入批次" v-model="input" clearable></el-input>
		</el-col>
		<el-col :span="8">
			<el-date-picker v-model="value1" type="date" placeholder="选择出库日期"></el-date-picker>
			<el-button type="primary" icon="el-icon-search">搜索</el-button>
		</el-col>
		<el-col :span="1" :offset="10">
			<el-button round @click="dialogFormVisible = true">新增出库信息</el-button>
			<el-dialog title="药品出库" v-model="dialogFormVisible">
			  <el-form>
			    <el-form-item label="药品批次" :label-width="formLabelWidth">
			      <el-input autocomplete="off" style="width: 215px;"></el-input>
			    </el-form-item>
				<el-form-item label="药品名" :label-width="formLabelWidth">
				  <el-input autocomplete="off" style="width: 215px;"></el-input>
				</el-form-item>
				<el-form-item label="药品数量" :label-width="formLabelWidth">
					<el-input-number @change="handleChange" :min="1" :max="1000" label="药品数量"></el-input-number>
				</el-form-item>
				<el-form-item label="药品规格" :label-width="formLabelWidth">
					<el-select v-model="form.region" placeholder="药品规格">
					  <el-option label="盒" value="shanghai"></el-option>
					  <el-option label="箱" value="beijing"></el-option>
					  <el-option label="包" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="采购价" :label-width="formLabelWidth">
				  <el-input autocomplete="off" style="width: 215px;"></el-input>
				</el-form-item>
			    <el-form-item label="生产厂家" :label-width="formLabelWidth">
			      <el-input autocomplete="off" style="width: 215px;"></el-input>
			    </el-form-item>
			    <el-form-item label="出库日期" :label-width="formLabelWidth">
			    	<el-date-picker v-model="value1" type="date" placeholder="选择采购日期"></el-date-picker>
			    </el-form-item>
			    <el-form-item label="经手人" :label-width="formLabelWidth">
			    	<el-select v-model="form.region" placeholder="选择经手人">
			    	  <el-option label="张三" value="shanghai"></el-option>
			    	  <el-option label="李四" value="beijing"></el-option>
			    	  <el-option label="王五" value="beijing"></el-option>
			    	</el-select>
			    </el-form-item>
				<el-form-item label="仓库" :label-width="formLabelWidth">
					<el-select v-model="form.region" placeholder="选择仓库">
					  <el-option label="中药仓" value="shanghai"></el-option>
					  <el-option label="西药仓" value="beijing"></el-option>
					  <el-option label="冷藏仓" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="药品去向" :label-width="formLabelWidth">
					<el-select v-model="form.region" placeholder="药品去向">
					  <el-option label="药房" value="shanghai"></el-option>
					  <el-option label="手术室" value="beijing"></el-option>
					  <el-option label="销毁" value="beijing"></el-option>
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
		</el-col>
	</el-row>
	<el-row>
		<el-col>
			<el-table :data="tableData" border style="width: 100%;">
				<el-table-column prop="drug" label="批次">
					</el-table-column>
				<el-table-column prop="date" label="日期" >
					</el-table-column>
				<el-table-column prop="name" label="药品名">
					</el-table-column>
				<el-table-column prop="province" label="入库数量">
					</el-table-column>
				<el-table-column prop="dan" label="采购价格">
					</el-table-column>
				<el-table-column prop="city" label="单位">
					</el-table-column>	
				<el-table-column prop="cang" label="出库仓库">
					</el-table-column>	
				<el-table-column prop="address" label="经手人">
					</el-table-column>
				<el-table-column prop="qu" label="去向">
					</el-table-column>
				<el-table-column prop="zip" label="备注">
					</el-table-column>
				<el-table-column fixed="right" label="操作">
					<template #default="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small">编辑</el-button>
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
					name: '六味地黄丸',
					province: 50,
					city: '盒',
					drug:'20160502666',
					address: '李四',
					dan:'20元',
					zip: '',
					cang:'中药仓',
					qu:'药房'
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