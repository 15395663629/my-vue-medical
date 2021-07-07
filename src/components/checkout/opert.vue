<template >
	<el-row class="row-one">
		<el-col :span="12" >
			时间选择：<el-date-picker
						  v-model="value"
						  type="daterange"
						  start-placeholder="开始时间"
						  end-placeholder="结束时间"
						  :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]">
					</el-date-picker>	
			 病人信息：<el-input class="ss-br-xx" v-model="input" placeholder="请输入你要查询的病人" ></el-input>  
			<el-button type="primary" icon="el-icon-search">查询</el-button>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="6">
			结果：<span>2</span>条
		</el-col>
	</el-row>
	<el-row >
		<!-- ====================================================弹框 ====================================================-->
		<el-dialog title="手术安排" v-model="apss">
			<el-form  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="">
				<el-row style="color: red;">
								  手术信息
				</el-row>
				<el-row>
					<el-col :span="5">
						<el-form-item label="手术名称:" label-width="80px">
							<el-input></el-input>
						</el-form-item>
					</el-col>
					<el-col  :span="5">
						<el-form-item label="手术类型:" label-width="80px">
							<el-input></el-input>
						</el-form-item>
					</el-col>
					<el-col :offset="1" :span="7">
									<el-form-item label="手术部位:" label-width="80px">
										<el-input></el-input>
									</el-form-item>
					</el-col>
				</el-row>
				<el-row style="color: red;">
								  病人信息
				</el-row>
				<el-row>
					<el-col :span="5">
						<el-form-item label="病人姓名:" label-width="80px">
							<el-input></el-input>
						</el-form-item>
					</el-col>
					<el-col  :span="3">
						<el-form-item label="床号:" label-width="60px">
							<el-input></el-input>
						</el-form-item>
					</el-col>
								<el-col :offset="1" :span="2">
									<el-form-item label="性别:" label-width="60px">
										<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :offset="1" :span="3">
									<el-form-item label="年龄:" label-width="60px">
										<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :offset="2" :span="7">
									<el-form-item label="单&emsp;据:" label-width="60px">
										<el-input></el-input>
									</el-form-item>
								</el-col>
				</el-row>
			
			<el-row style="padding-top:6px ;">
				<el-col :span="5">
					<el-form-item label="科&emsp;&emsp;室:" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				<el-col :offset="3" :span="7">
					<el-form-item label="入院诊断:" label-width="80px">
						<el-input></el-input>
								</el-form-item>
				</el-col>
				<el-col :offset="2" :span="7">
					<el-form-item label="身份证:" label-width="60px">
							<el-input></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style="color: red;">
				申请信息
			</el-row>
			<el-row>
				<el-col :span="7">
					<el-form-item label="住院号:&emsp;" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				<el-col  :span="3">
					<el-form-item label="身高:" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
							<el-col :span="4">
								<el-form-item label="体重:" label-width="80px">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :offset="2" :span="7">
									<el-form-item label="术前诊断:" label-width="80px">
					<el-input></el-input>
							</el-form-item>
				</el-col>
			</el-row>
			<el-row style="padding-top:6px ;">
				<el-col :span="6">
					<el-form-item label="主刀医生:&emsp;" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				<el-col  :span="7">
					<el-form-item label="拟施手术:" label-width="80px">
						<el-input></el-input>
					</el-form-item>
							</el-col>
							<el-col  :span="10">
								<el-form-item label="拟施日期:" label-width="80px">
									<el-date-picker
									  v-model="value1"
									  type="daterange"
									  start-placeholder="Start Date"
									  end-placeholder="End Date"
									  :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]">
									</el-date-picker>
								</el-form-item>
							</el-col>
			</el-row>
		</el-form>
			<el-row style="color: red;">
					手术室选择
			</el-row>
		  <el-row > 
		  	<el-table
		  	    ref="multipleTable"
		  	    :data="ssTa"
		  	    tooltip-effect="dark"
		  	    style="width:100%;height: 20%;"
		  	    @selection-change="handleSelectionChange">
		  	    <el-table-column
		  	      label="手术室编号"
		  		  prop="ssId"
		  	      >
		  	    </el-table-column>
		  	    <el-table-column
		  	      prop="ssName"
		  	      label="手术名称">
		  	    </el-table-column>
		  		<el-table-column
		  		  label="是否空闲" width="130px">
		  				是
		  		</el-table-column>
		  		<el-table-column label="操  作" width="200px">
		  		      <template #default="scope">
		  		        <el-button
		  		          size="mini"
		  		          type="primary"
		  		          @click="handleDelete(scope.$index, scope.row)">选择</el-button>
		  		      </template>
		  		    </el-table-column>
		  					<el-table-column width="150px"
		  								  align="right">
		  								  <template  #header>
		  									<el-input
		  									  v-model="ssss"
		  										prefix-icon="el-icon-search"
		  									  size="small"
		  									  placeholder="手术室搜索"/>
		  								  </template>
		  					</el-table-column>
		  					
		  	</el-table>
			
		  </el-row>
		  <el-row>
			  <el-col :span="3" :offset="11">
			  <el-button type="primary" @click="apssForm('ruleForm')">开始</el-button>
			  </el-col>
		  </el-row>
		</el-dialog>
<!-- ====================================================表格 -->
		<el-table
		    ref="multipleTable"
		    :data="ssTa"
		    tooltip-effect="dark"
			height="650"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      label="编号"
			  prop="ssId"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="ssName"
		      label="姓名">
		    </el-table-column>
		    <el-table-column
		      prop="sscard"
		      label="身份证">
		    </el-table-column>
			<el-table-column
			  prop="ssbed"
			  label="手术室">
			</el-table-column>
			<el-table-column
			  prop="sstime"
			      sortable
			      width="180"
			      column-key="date"
			      :filter-method="filterHandler"
			  label="手术时间">
			</el-table-column>
			<el-table-column
			  prop="ssdemo"
			  label="手术项目">
			</el-table-column>
			<el-table-column label="操作" width="400px">
			      <template #default="scope">
			        <el-button
			          size="mini"
					  type="primary"
			          @click="apss=true">开始</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">取消申请</el-button>
			      </template>
			</el-table-column>
		</el-table>
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
	</el-row>
	
</template>

<script>
	export default {
		data() {
			return {
				textarea:"",
				apss: false,
				centerDialogVisible: false,
				currentPage3: 5,
				tableData: [{
					date: '开膛',
					name: '20202',
					address: ' 1518 号',
					tag: '复诊',
				},
				{
					date: '开颅手术',
					name: '20202',
					address: ' 1517 号',
					tag: '初诊'
				}],
				ssTa: [{
					ssId: '11',
					ssName: '20202',
					sscard: ' 15183456789',
					ssbed: '复诊',
					sstime: '2121-2-2',
					ssdemo:'开颅',
				},
				{
					ssId: '12',
					ssName: '20202',
					sscard: ' 15183456789',
					ssbed: '复诊',
					sstime: '2121-2-1',
					ssdemo:'开膛'
				}],
				
			};
		},
		 methods: {
		      filterTag(value, row) {
		        return row.tag === value;
		      },
			  handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			  },
			  handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			  },
			  handleClose(done) {
				this.$confirm('确认关闭？')
				  .then(_ => {
					done();
				  })
				  .catch(_ => {});
			  },
			  apssForm(formName) {
			  	this.apss = false
			  	this.$refs[formName].resetFields();
			  }
		}
	};
</script>

<style>
	.qq{
		margin-top: 8px;
	}
	.works{
			padding: 15px;
		}
	.ss-br-xx{
		padding-top: 5px;
		width: 200px;
	}
</style>
