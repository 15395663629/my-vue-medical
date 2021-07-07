<template>
	<h1 style="margin-bottom: 15px;font-size: 26px;">住院登记</h1>
	
	<!--=============================================选择住院申请病人弹框===================================-->
	<el-dialog title="选择住院申请病人" v-model="isShowXZBR">
		<el-table
		    ref="multipleTable"
		    :data="empArr"
		    tooltip-effect="dark"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      label="病人编号"
			  prop="empId"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="empName"
		      label="申请住院日期">
		    </el-table-column>
		    <el-table-column
		      prop="empDate"
		      label="诊断结果">
		    </el-table-column>
			<el-table-column
			  prop="empSalary"
			  label="申请人">
			</el-table-column>
			
			
			<el-table-column width="200px"
			      align="right">
			      <template  #header>
			        <el-input
			          v-model="fromSearch"
						prefix-icon="el-icon-search"
			          size="small"
			          placeholder="病人名称搜索"/>
			      </template>
				  
				  <!--这里放操作按钮-->
				  <template  #default='scope'>
				  	<el-button type="danger" icon="el-icon-delete" @click="delEmp(scope.row)" circle>删除</el-button>
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
	</el-dialog>
	
	
	
	
	<!--=============================================新增住院申请信息弹框===================================-->
	<el-dialog title="住院申请" v-model="isShowZY">
		<el-form>
			<el-row>
				<el-col :span="9">
					<el-form-item label="姓名" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="2">
					<el-button @click="isShowXZBR = true" type="primary" icon="el-icon-user-solid"></el-button>
				</el-col>
				
				<el-col :offset="1" :span="12">
					<el-form-item label="门诊诊断" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			
			<el-row>
				<el-col :span="9">
					<el-form-item label="性别" label-width="80px">
					 <el-radio-group v-model="isSex">
					    <el-radio label="男">男</el-radio>
					    <el-radio label="女">女</el-radio>
					  </el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="1">
				</el-col>
				
				<el-col :offset="2" :span="12">
					<el-form-item label="预交金额" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				
			</el-row>
			
			
			<el-row>
				<el-col :span="8">
					<el-form-item label="年龄" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="2">
				</el-col>
				
				
				<el-col :offset="2" :span="12">
					<el-form-item label="治疗医生" label-width="80px">
						<el-select v-model="isSex" placeholder="请选择">
						    <el-option
								key="s"
						      label="item.label"
						      value="item.value">
						    </el-option>
							<el-option
							key="ss"
							  label="item.label"
							  value="item.value">
							</el-option>
						  </el-select>
					</el-form-item>
				</el-col>
			</el-row>
			
			<el-row>
				<el-col :span="8">
					<el-form-item label="地址" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="2">
				</el-col>
				
				<el-col :offset="2" :span="12">
					<el-form-item label="出生日期" label-width="80px">
						 <el-date-picker
						      v-model="csrq"
						      type="date"
						      placeholder="选择日期">
						    </el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			
			
			
			<el-row>
				<el-col :span="8">
					<el-form-item label="电话" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="2">
				</el-col>
				
				<el-col :offset="2" :span="12">
					<el-form-item label="科室" label-width="80px">
						<el-select v-model="isSex" placeholder="请选择">
						    <el-option
								key="s"
						      label="item.label"
						      value="item.value">
						    </el-option>
							<el-option
							key="ss"
							  label="item.label"
							  value="item.value">
							</el-option>
						  </el-select>
					</el-form-item>
				</el-col>
			</el-row>
			
			
			<el-row>
				<el-col :span="8">
					<el-form-item label="身份证" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="2">
				</el-col>
				
			</el-row>
		</el-form>
		
		
		<template #footer>
				<el-row>
					<el-col :span="18"></el-col>
					<el-col :span="2">
						<el-button @click="addEmp('empFrom')" type="primary">确定</el-button>
					</el-col>
					<el-col :span="1"></el-col>
					<el-col :span="2">
						<el-button @click="isShowZY = false" type="danger">取消</el-button>
					</el-col>
					<el-col :span="1"></el-col>
				</el-row>
		</template>
	</el-dialog>
	
	<el-row>
		<el-col :span="2">
			<el-button @click="isShowZY = true" type="primary">新增</el-button>
		</el-col>
	</el-row>
	
	<!--=============================================住院登记表格===================================-->
	<el-row>
		<el-col>
			<el-table
			    :data="InhospitalApplyArr"
			    tooltip-effect="dark"
			    style="width: 100%"
				>
			    <el-table-column
			      label="住院号"
				  prop="empId"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="empName"
			      label="姓名">
			    </el-table-column>
			    <el-table-column
			      prop="empDate"
			      label="性别">
			    </el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="年龄">
				</el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="电话">
				</el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="地址">
				</el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="身份证">
				</el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="入院日期">
				</el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="科室">
				</el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="医生">
				</el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="床位">
				</el-table-column>
				<el-table-column label="操作">
					<template  #default='scope'>
						 <el-button icon="el-icon-edit" type="primary" @click="" circle>转科</el-button>
					</template>
				</el-table-column>
				<el-table-column width="200px"
				      align="right">
				      <template  #header>
				        <el-input
				          v-model="fromSearch"
							prefix-icon="el-icon-search"
				          size="small"
				          placeholder="病人名称搜索"/>
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
				InhospitalApplyArr:[
					
				],
				InhospitalApply:{
					ptNo:'',
					sickNumber:'',
					ptSex:'',
					ptAge:'',
					ptHomeAdder:'',
					sickPhone:'',
					ptCapacityNo:'',
					ptInDate:'',
					ks:{
						ksId:'',
						ksName:''
					}
				},
				csrq:'',
				isShowXZBR:false,//选择住院病人弹框
				isShowZY:false,//住院申请弹框
				isSex:'',
				fromSearch:''
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
	/* .el-dialog__body{
		padding: 20px 60px;
	} */
</style>
