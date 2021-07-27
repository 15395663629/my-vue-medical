<template>
	<!--=============================================选择住院申请病人弹框===================================-->
	<el-dialog title="选择出院申请病人" v-model="isShowXZBR">
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
		      label="病人名称">
		    </el-table-column>
		    <el-table-column
		      prop="empDate"
		      label="申请时间">
		    </el-table-column>
			<el-table-column
			  prop="empSalary"
			  label="申请人">
			</el-table-column>
			
			<el-table-column label="操作">
				<template  #default='scope'>
					<el-button type="danger" icon="el-icon-delete" @click="delEmp(scope.row)" circle></el-button>
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
	<el-dialog title="出院结算" v-model="isShowZY">
		<el-form>
			<el-row>
				<el-col :offset="1" :span="6">
					<el-form-item label="姓名" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="1">
					<el-button @click="isShowXZBR = true" type="primary" icon="el-icon-user-solid"></el-button>
				</el-col>
				
				<el-col :offset="4" :span="8">
					<el-form-item label="科室" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			
			<el-row>
				<el-col :offset="1" :span="8">
					<el-form-item label="性别" label-width="80px">
					 <el-input></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="2">
				</el-col>

        <el-col :offset="1" :span="8">
          <el-form-item label="床位" label-width="80px">
            <el-input></el-input>
          </el-form-item>
        </el-col>
				

			</el-row>
			
			
			<el-row>
        <el-col :offset="1" :span="8">
          <el-form-item label="年龄" label-width="80px">
            <el-input></el-input>
          </el-form-item>
        </el-col>
				<el-col :span="2">
				</el-col>
				
				<el-col :offset="1" :span="8">
					<el-form-item label="总金额" label-width="80px">
					<el-input></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			
			<el-row>
				<el-col :offset="1" :span="8">
					<el-form-item label="已用" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="2">
				</el-col>
				
				<el-col :offset="1" :span="8">
					<el-form-item label="余额" label-width="80px">
						<el-input></el-input>
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
			<el-button @click="isShowZY = true" type="primary">新增</el-button>
		</el-col>
	</el-row>
	
	<!--=============================================住院登记表格===================================-->
	<el-row>
		<el-col>
			<el-table :data="InhospitalApplyArr"
			    tooltip-effect="dark"
			    style="width: 100%">
        <el-table-column
            prop="empDate"
            label="住院号">
        </el-table-column>

        <el-table-column label="姓名">
          <template #default="scope" >
            <el-popover width="300" effect="light"   trigger="hover" placement="top">
              <template #default >
                <p>姓名: {{ scope.row.ptName }}</p>
                <p>年龄: {{ scope.row.ptAge }}</p>
                <p>性别: {{ scope.row.ptSex }}</p>
                <p>电话: {{ scope.row.ptIphone }}</p>
                <p>住址: {{ scope.row.ptHomeAdder }}</p>
              </template>
              <template #reference>
                <div class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.ptName }}</el-tag>
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>



			    <el-table-column
			      prop="empDate"
			      label="入院日期">
			    </el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="出院日期">
				</el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="科室">
				</el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="治疗医生">
				</el-table-column>

				  <el-table-column
				    prop="empSalary"
				    label="预交款">
				  </el-table-column>

          <el-table-column prop="s" label="费用"></el-table-column>

				  <el-table-column
				    prop="empSalary"
				    label="退款">
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
	/*.el-dialog__body{*/
	/*	padding: 20px 60px;*/
	/*	padding-left:100px ;*/
	/*	text-align: center;*/
	/*}*/
</style>
