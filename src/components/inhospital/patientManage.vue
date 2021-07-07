<template>
	

	<!--=====================================================================添加手术======================-->
	
			<el-dialog title="手术安排" v-model="isSSShow">
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
				  <el-button type="primary" @click="apssForm('ruleForm')">提交申请</el-button>
				  </el-col>
			  </el-row>
			</el-dialog>
	
	
	<!--=====================================================================出院弹框======================-->
	<el-dialog title="申请出院" v-model="isCYShow">
	  <el-form>
		  <el-row>
			  <el-col :span="9">
				  <el-form-item label="病人名称" label-width="80px">
				  	<el-input disabled></el-input>
				  </el-form-item>
			  </el-col>
			   <el-col :offset="2" :span="9">
				   <el-form-item label="申请原因" label-width="80px">
				   		<el-input ></el-input>
				   </el-form-item>
			   </el-col>
		  </el-row>
		  
		  <el-row>
		  	<el-col :span="9">
				<el-form-item label="病人性别" label-width="80px">
					<el-input disabled></el-input>
				</el-form-item>
			</el-col>
		  	<el-col :offset="2" :span="9">
				<el-form-item label="病人年龄" label-width="80px">
					<el-input disabled></el-input>
				</el-form-item>
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
	
	
	<!--=====================================================================转科弹框======================-->
	<el-dialog title="转科" width="30%" v-model="isZKShow">
	  <el-form>
		  <el-row>
			  <el-col :span="20">
				  <el-form-item label="选择科室" label-width="80px">
				  	<el-select v-model="isBedZT" placeholder="请选择">
				  	    <el-option
				  	      label="骨科"
				  	      value="value">
				  	    </el-option>
				  		<el-option
				  		  label="五官科"
				  		  value="item.value">
				  		</el-option>
				  	  </el-select>
				  </el-form-item>
			  </el-col>
		  </el-row>
		  
	  </el-form>
	  
	  <template #footer>
	  		<el-row>
	  			<el-col :span="17"></el-col>
	  			<el-col :span="2">
	  				<el-button @click="addEmp('empFrom')" type="primary">确定</el-button>
	  			</el-col>
	  			<el-col :span="2"></el-col>
	  			<el-col :span="2">
	  				<el-button @click="isShowZY = false" type="danger">取消</el-button>
	  			</el-col>
	  			<el-col :span="1"></el-col>
	  		</el-row>
	  </template>
	</el-dialog>
	
	
	<el-table
		height="70%"
		:data="patientArr"
		tooltip-effect="dark"
		style="width: 100%">
		
		<el-table-column align="center" label="病人列表">
			
			<el-table-column label="住院号"></el-table-column>
			
			<el-table-column label="病人名称"></el-table-column>
			
			<el-table-column label="年龄"></el-table-column>
			
			<el-table-column label="性别"></el-table-column>
			
			<el-table-column label="科室"></el-table-column>
			
			<el-table-column label="床位"></el-table-column>
			
			<el-table-column label="总金额"></el-table-column>
			
			<el-table-column label="余额"></el-table-column>
			
			<el-table-column label="操作" width="300px" >
				<template #default="obj">
						<el-row>
							<el-col :span="5"><el-button @click="isCYShow = true " size="mini" type="success">申请出院</el-button></el-col>
						
							<el-col :offset="3" :span="5"><el-button @click="isZKShow = true" size="mini" type="danger">转科</el-button></el-col>
							
							<el-col :offset="1" :span="5"><el-button size="mini" @click="isSSShow = true" type="primary">手术申请</el-button></el-col>
						</el-row>
				</template>
			</el-table-column>
			
		</el-table-column>
		
	</el-table>
	
	
</template>

<script>
	export default{
		data(){
			return{
				patientArr:[
					{},
					{}
				],
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
				isCYShow:false,//显示出院申请弹框
				isZKShow:false,//显示转科弹框
				isSSShow:false
			}
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
