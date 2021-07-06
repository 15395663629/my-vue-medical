<template>
	<h1 style="margin-bottom: 15px;font-size: 26px;">病床管理</h1>
	
	<!--=============================================新增修改床位弹框===================================-->
	<el-dialog v-model="isShowAddBed" title="新增床位">
		<el-form>
			<el-row>
				<el-col :span="8">
					<el-form-item label="床位编号" label-width="80px">
						<el-input disabled></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="2"></el-col>
				
				<el-col :span="9">
					<el-form-item label="床位名称" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			
			<el-row>
				<el-col :span="8">
					<el-form-item label="床位价格" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="2"></el-col>
				
				<el-col :span="9">
					<el-form-item label="床位状态" label-width="80px">
						<el-select v-model="isBedZT" placeholder="请选择">
						    <el-option
						      label="可入住"
						      value="value">
						    </el-option>
							<el-option
							  label="需维修"
							  value="item.value">
							</el-option>
						  </el-select>
					</el-form-item>
				</el-col>
			</el-row>
			
			<el-row>
				<el-col :span="8">
					<el-form-item label="管理护士" label-width="80px">
						<el-select v-model="isBedZT" placeholder="请选择">
						    <el-option
						      label="张三"
						      value="vale">
						    </el-option>
							<el-option
							  label="李四"
							  value="item.value">
							</el-option>
						  </el-select>
					</el-form-item>
				</el-col>
				
				<el-col :span="2"></el-col>
				
				<el-col :span="9">
					<el-form-item label="所属科室" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		
		<template #footer>
				<el-button @click="addEmp('empFrom')" type="primary">确定</el-button>
				<el-button @click="isShowAddBed = false" type="danger">取消</el-button>
		</template>
	</el-dialog>
	
	
	<el-row>
		<el-col :span="1">
			<el-button type="primary" @click="isShowAddBed = true">新增</el-button>
		</el-col>
		
		<el-col :offset="19" :span="4">
				<el-select v-model="isBedZT" placeholder="请选择查看">
				    <el-option
				      label="本科室"
				      value="vale">
				    </el-option>
					<el-option
					  label="所有科室"
					  value="item.value">
					</el-option>
					<el-option
					  label="骨科"
					  value="vale">
					</el-option>
					<el-option
					  label="耳鼻喉科"
					  value="vale">
					</el-option>
				  </el-select>
		</el-col>
	</el-row>
	
	
	<!--=============================================床位信息表格===================================-->
	<el-row>
		<el-col>
			<el-table
			    ref="multipleTable"
			    :data="empArr"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <el-table-column
			      label="病床编号"
				  prop="empId"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="empName"
			      label="床位名称">
			    </el-table-column>
			    <el-table-column
			      prop="empDate"
			      label="床位状态">
			    </el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="入住病人">
				</el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="科室">
				</el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="管理护士">
				</el-table-column>
				
				<el-table-column width="400px"
				      align="right">
					   <template  #header>
					  <el-row>
						  <el-col :span="10">
							 
							    <el-input
							      v-model="fromSearch"
							  							prefix-icon="el-icon-search"
							      size="small"
							      placeholder="病床名称"/>
							  						  
						  </el-col>
						  
						  <el-col :span="1"></el-col>
						  
						  <el-col :span="10">
							  
							  <el-select v-model="isBedZT" size="small" placeholder="请选择">
							      <el-option
							        label="空床"
							        value="vale">
							      </el-option>
							  	<el-option
							  	label="已入住"
							  	value="item.value">
							  		</el-option>
							  	<el-option
							  	  label="待维修"
							  	  value="item.value">
							  	</el-option>
								<el-option
								label="所有"
							  	value="item.value">
							  	</el-option>
							  </el-select>
						  </el-col>
					  </el-row>
						  
				      </template>
					  
					  <template  #default="r">
					    <el-button>修改</el-button>
					  </template>
				    </el-table-column>
				
			  </el-table>
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
		</el-col>
	</el-row>
</template>

<script>
	export default{
		data(){
			return{
				isShowAddBed:false,
				isBedZT:''
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	.works{
		padding: 15px;
	}
	.el-dialog__body{
		padding: 20px 60px;
		padding-left:100px ;
		text-align: center;
	}
</style>
