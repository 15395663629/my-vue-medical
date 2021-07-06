<template>
	<el-tabs type="border-card">
	<!-- 门诊发药 -->
	  <el-tab-pane label="门诊发药">
		  <el-dialog title="选择患者" v-model="isShowXZBR">
		  	<el-table
		  	    ref="multipleTable"
		  	    :data="empArr"
		  	    tooltip-effect="dark"
		  	    style="width: 100%"
		  	    @selection-change="handleSelectionChange">
				
		  	    <el-table-column
		  	      label="病人姓名"
		  		  prop="empId">
		  	    </el-table-column>
		  	    
		  		<el-table-column
		  		  label="病人性别"
		  		  prop="empId">
		  		</el-table-column>
		  		
		  		<el-table-column
		  		  label="就诊科室"
		  		  prop="empId">
		  		</el-table-column>
				
				<el-table-column
				  label="主治医生"
				  prop="empId">
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
		  
		  
		  
		  
		  <!--=============================================选择患者信息弹框===================================-->
		  <el-dialog title="患者信息" v-model="isShowZY">
		  	<el-form>
		  		<el-row>
		  			<el-col :span="6">
		  				<el-form-item label="姓名" label-width="80px">
		  					<el-input></el-input>
		  				</el-form-item>
		  			</el-col>
		  			<el-col :span="1">
		  				<el-button @click="isShowXZBR = true" type="primary" icon="el-icon-user-solid"></el-button>
		  			</el-col>
		  		</el-row>
		  		<el-row>
		  			<el-col :span="6">
		  				<el-form-item label="性别" label-width="80px">
		  				 <el-radio-group v-model="isSex">
		  				    <el-radio label="男">男</el-radio>
		  				    <el-radio label="女">女</el-radio>
		  				  </el-radio-group>
		  				</el-form-item>
		  			</el-col>
		  			<el-col :span="2">
		  			</el-col>
		  		</el-row>
				<el-row>
					<el-col :offset="1" :span="9">
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
		  			<el-col :offset="1" :span="9">
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
		  	</el-form>
		  	
		  	
		  	<template #footer>
		  			<el-button @click="addEmp('empFrom')" type="primary">确定</el-button>
		  			<el-button @click="isShowZY = false" type="danger">取消</el-button>
		  	</template>
		  </el-dialog>
		  
		  <el-row>
		  	<el-col>
		  		<el-button @click="isShowZY = true" type="primary">选择患者</el-button>
				<el-button type="success">门诊发药</el-button>
		  	</el-col>
		  </el-row>
		  
		  <!--=============================================药品表格===================================-->
		  <el-row>
		  	<el-col>
		  		<el-table
		  		    :data="InhospitalApplyArr"
		  		    tooltip-effect="dark"
		  		    style="width: 100%"
		  			>
		  		    <el-table-column
		  		      label="药品名称"
		  			  prop="empId"
		  		      >
		  		    </el-table-column>
		  		    <el-table-column
		  		      prop="empName"
		  		      label="药品数量">
		  		    </el-table-column>
		  		    <el-table-column
		  		      prop="empDate"
		  		      label="单价">
		  		    </el-table-column>
		  			<el-table-column
		  			  prop="empSalary"
		  			  label="小计">
		  			</el-table-column>
		  			<el-table-column
		  			  prop="emp"
		  			  label="类别">
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
	  </el-tab-pane>

	<!-- 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。医嘱发药。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。 -->
	  <el-tab-pane label="医嘱发药">
		  <el-dialog title="选择患者" v-model="isShowXZBR">
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
		  
		  
		  
		  
		  <!--=============================================选择患者信息弹框===================================-->
		  <el-dialog title="患者信息" v-model="isShowZY">
		  	<el-form>
		  		<el-row>
		  			<el-col :span="6">
		  				<el-form-item label="姓名" label-width="80px">
		  					<el-input></el-input>
		  				</el-form-item>
		  			</el-col>
		  			<el-col :span="1">
		  				<el-button @click="isShowXZBR = true" type="primary" icon="el-icon-user-solid"></el-button>
		  			</el-col>
		  			
		  			<el-col :offset="2" :span="9">
		  				<el-form-item label="门诊诊断" label-width="80px">
		  					<el-input></el-input>
		  				</el-form-item>
		  			</el-col>
		  		</el-row>
		  		
		  		<el-row>
		  			<el-col :span="6">
		  				<el-form-item label="性别" label-width="80px">
		  				 <el-radio-group v-model="isSex">
		  				    <el-radio label="男">男</el-radio>
		  				    <el-radio label="女">女</el-radio>
		  				  </el-radio-group>
		  				</el-form-item>
		  			</el-col>
		  			<el-col :span="2">
		  			</el-col>
		  			
		  			<el-col :offset="1" :span="9">
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
		  			<el-col :span="6">
		  				<el-form-item label="年龄" label-width="80px">
		  					<el-input></el-input>
		  				</el-form-item>
		  			</el-col>
		  			<el-col :span="2">
		  			</el-col>
		  			
		  			
		  			<el-col :offset="1" :span="9">
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
		  			<el-col :span="6">
		  				<el-form-item label="地址" label-width="80px">
		  					<el-input></el-input>
		  				</el-form-item>
		  			</el-col>
		  			<el-col :span="2">
		  			</el-col>
		  			
		  			<el-col :offset="1" :span="9">
		  				<el-form-item label="床位" label-width="80px">
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
		  			<el-col :span="6">
		  				<el-form-item label="电话" label-width="80px">
		  					<el-input></el-input>
		  				</el-form-item>
		  			</el-col>
		  			<el-col :span="2">
		  			</el-col>
		  			
		  			<el-col :offset="1" :span="9">
		  				<el-form-item label="预交金额" label-width="80px">
		  					<el-input></el-input>
		  				</el-form-item>
		  			</el-col>
		  		</el-row>
		  		
		  		
		  		<el-row>
		  			<el-col :span="6">
		  				<el-form-item label="身份证" label-width="80px">
		  					<el-input></el-input>
		  				</el-form-item>
		  			</el-col>
		  			<el-col :span="2">
		  			</el-col>
		  			
		  			<el-col :offset="1" :span="9">
		  				<el-form-item label="出生日期" label-width="80px">
		  					 <el-date-picker
		  					      v-model="csrq"
		  					      type="date"
		  					      placeholder="选择日期">
		  					    </el-date-picker>
		  				</el-form-item>
		  			</el-col>
		  		</el-row>
		  	</el-form>
		  	
		  	
		  	<template #footer>
		  			<el-button @click="addEmp('empFrom')" type="primary">确定</el-button>
		  			<el-button @click="isShowZY = false" type="danger">取消</el-button>
		  	</template>
		  </el-dialog>
		  
		  <el-row>
		  	<el-col>
		  		<el-button @click="isShowZY = true" type="primary">选择患者</el-button>
		  				<el-button type="success">医嘱发药</el-button>
		  	</el-col>
		  </el-row>
		  
		  <!--=============================================药品表格===================================-->
		  <el-row>
		  	<el-col>
		  		<el-table
		  		    :data="InhospitalApplyArr"
		  		    tooltip-effect="dark"
		  		    style="width: 100%"
		  			>
		  		    <el-table-column
		  		      label="药品名称"
		  			  prop="empId"
		  		      >
		  		    </el-table-column>
		  		    <el-table-column
		  		      prop="empName"
		  		      label="药品数量">
		  		    </el-table-column>
		  		    <el-table-column
		  		      prop="empDate"
		  		      label="单价">
		  		    </el-table-column>
		  			<el-table-column
		  			  prop="empSalary"
		  			  label="小计">
		  			</el-table-column>
		  			<el-table-column
		  			  prop="emp"
		  			  label="类别">
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
	  </el-tab-pane>
	</el-tabs>
</template>

<script>
	export default{
		data(){
			return{
				InhospitalApplyArr:[
					{
					empId:'999感冒灵',
					empName:'2',
					empDate:'15',
					empSalary:'30',
					emp:'感冒冲剂',
					},
					{
					empId:'999感冒灵',
					empName:'2',
					empDate:'15',
					empSalary:'30',
					emp:'感冒冲剂',
					},
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

<style scoped>
	.works{
		padding: 15px;
	}
	.el-dialog__body{
		padding: 20px 60px;
		padding-left:100px ;
		text-align: center;
	}
</style>
