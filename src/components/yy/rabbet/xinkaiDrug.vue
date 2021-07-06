<template>
	<!-- 新开药品=====================这里的”标“签是判断药品的类型 -->
	 <el-row>
		 <el-col :span="5">
			<el-input style="width: 200px;" placeholder="请输入你要查询的内容" ></el-input> 
			<el-button type="primary" icon="el-icon-search">查询</el-button>
		</el-col>
		<el-col :span="16">
			<el-form>
				<el-form-item label-width="20px">
					<el-radio v-model="radio" label="1">中药</el-radio>
					<el-radio v-model="radio" label="2">西药</el-radio>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="3">
			<el-form>
				<el-form-item label-width="20px">
					<el-button size="small" icon="el-icon-check" type="primary">一件添加</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	 </el-row>
	 <el-table row-key="date"  :data="tableData" style="width: 100%"  height="450">
		<el-table-column type="selection" width="55"> </el-table-column>
		<el-table-column fixed  label="单据编号"  width="120"></el-table-column>
		<el-table-column fixed  label="操作"  width="120">
			<template #default="scope">
			  <el-button
				size="mini"
				type="success"
				@click="handleEdit(scope.$index, scope.row)">选择</el-button>
			</template>
		</el-table-column>
		<el-table-column prop="tag" label="标签"
		width="100" :filters="[{ text: '复诊', value: '复诊' }, { text: '初诊', value: '初诊' }]"
		:filter-method="filterTag"  filter-placement="bottom-end">
			<template #default="scope">
				<el-tag :type="scope.row.tag === '复诊' ? 'primary' : 'success'" disable-transitions>
				{{scope.row.tag}}
				</el-tag>
			</template>
		</el-table-column>
	 </el-table>
	 <div class="block">
		 <span class="demonstration"></span>
		 <!--分页插件-->
		<el-pagination
	 					style="text-align: center;"
	       @size-change="totalCut"
	       @current-change="pageCut"
	       :current-page="1"
	       :page-sizes="[2,4,6,8,10]"
	       :page-size="size"
	       layout="total, sizes, prev, pager, next, jumper"
	       :total="total">
	     </el-pagination>
	   </div>
	
</template>

<script>
	export default{
	    props:{
	        centerDialogVisible:{
	            type:Boolean,
	            required:true
	        },
	        textarea2:{
	            type:String,
	            required:true
	        }
	    },
	    data(){
	        return {
	            
	        }
	    },
		methods:{
			filterTag(value, row) {/* 复诊初诊标签方法 */
							return row.tag === value;
			},
			handleSizeChange1(val) {
							console.log(`每页 ${val} 条`);
			},
			handleCurrentChange1(val) {
							console.log(`当前页: ${val}`);
			},
			handleSizeChange2(val) {
							console.log(`每页 ${val} 条`);
			},
			handleCurrentChange2(val) {
							console.log(`当前页: ${val}`);
			},
		}
	}
</script>

<style>
</style>
