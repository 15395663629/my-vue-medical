<template >
	<div>
		<el-row>
			<el-col :span="6">
				<h4>呼叫列表：</h4>
				<el-table  v-loading="loading" element-loading-text="读取中..."
				style="width: 100%" height="330">
						<el-table-column fixed  label="排列序号"   width="100"></el-table-column>
						<el-table-column fixed  label="姓名"  width="100"></el-table-column>
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
			</el-col>
			<el-col :span="18" >
				<el-row class="rows">
					<el-form   status-icon label-width="110px" style="margin-top: 48px;">
						<el-col  style="height: 40px">
							<el-form-item label="卡号" >
								<el-input size="mini" style="width: 152px" disabled ></el-input>
                <el-button size="mini"  style="margin-left: 5px;" @click="openJa" type="primary" icon="el-icon-edit" circle></el-button>
              </el-form-item>
						</el-col>
						<el-col  style="height: 40px">
							<el-form-item label="就诊号" >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col  style="height: 40px">
							<el-form-item label="就诊" >
								<el-input size="mini" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 40px">
							<el-form-item label="身份证" >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 40px">
							<el-form-item label="姓名" >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 40px">
							<el-form-item label="性别" label-width="110px">
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 40px">
							<el-form-item label="年龄" >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 40px">
							<el-form-item label="电话" >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 45px">
							<el-form-item label="诊断医生" >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 45px">
							<el-form-item label="诊断科室" label-width="110px">
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 45px">
							<el-form-item label="过敏及特殊病史"  >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col >
							<el-form-item >
								<el-button size="mini"  type="primary" style="width: 186px;" icon="el-icon-s-claim">
									打印诊断结果
								</el-button>
							</el-form-item>
						</el-col>
						<el-input 
								type="textarea"
								placeholder="请输入病理原因"
								v-model="textarea2"
								maxlength="400"
								width="100%"
								:rows="5"
								show-word-limit
								>
						</el-input>
					</el-form>
				</el-row>
			</el-col>
		</el-row>
		
		<!-- table=============================== -->
		<h4>当天病例表：</h4>
		 <el-table
			height="215"
		    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
		    style="width: 100%">
		    <el-table-column
		      label="Date"
		      prop="date">
		    </el-table-column>
		    <el-table-column
		      label="Name"
		      prop="name">
		    </el-table-column>
		    <el-table-column
		      align="right">
		      <template #header>
		        <el-input
		          v-model="search"
		          size="mini"
		          placeholder="输入关键字搜索"/>
		      </template>
		      <template #default="scope">
		        <el-button
		          size="mini"
				  type="primary"
		          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		  <el-pagination
		   		style="text-align: center; margin-top: 10px;"
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

<script >
	export default {
		data() {
			return {
				tableData: [{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				        }, {
				          date: '2016-05-04',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1517 弄'
				        }, {
				          date: '2016-05-01',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1519 弄'
				        }, 
						],
				search: '',
				textarea2:"",
				loading:false,
			};
		},
		 methods: {
			 filterTag(value, row) {/* 复诊初诊标签方法 */
			 	return row.tag === value;
			 },
			 openJa(){
				 this.$confirm('您确定读取下一条数吗？').then(suc => {
					this.loading=true
				 }).catch(err => {
					this.loading=false
				 })
			 },
			handleEdit(index, row) {
				console.log(index, row);
			},
			  handleDelete(index, row) {
				console.log(index, row);
			}
		}
	};
</script>

<style>
</style>

