<template>
	<el-row class="row-one">
		<el-col :span="12" >
			时间选择：<el-date-picker
						  v-model="value"
						  type="daterange"
						  start-placeholder="开始时间"
						  end-placeholder="结束时间"
						  :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]">
					</el-date-picker>	
			 病人信息：<el-input class="ss-br-xx" v-model="input" placeholder="请输入你要查询的套餐" ></el-input>  
			<el-button type="primary" icon="el-icon-search">查询</el-button>
		</el-col>
	</el-row>



	<el-dialog title="手术申请" v-model="isShow" width="60%" center  ><!-- 弹窗详情 -->
		<el-form  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
			  <el-row style="color: red;">
					手术选择
			  </el-row>
			  <el-row > <!-- 表格 -->
			  	<el-table
			  	    ref="multipleTable"
			  	    :data="ssTa"
			  	    tooltip-effect="dark"
			  	    style="width:100%;height: 20%;"
			  	    @selection-change="handleSelectionChange">
			  	    <el-table-column
			  	      label="编号"
			  		  prop="ssId"
			  	      >
			  	    </el-table-column>
			  	    <el-table-column
			  	      prop="ssName"
			  	      label="手术名称">
			  	    </el-table-column>
			  	    <el-table-column
			  	      prop="sscard"
			  	      label="价格">
			  	    </el-table-column>
			  		<el-table-column
			  		  prop="ssbed"
			  		  label="手术类型">
			  		</el-table-column>
			  		<el-table-column
			  		  label="麻醉类型" width="130px">
						<el-select v-model="sfmy" placeholder="请选择">
						    <el-option
						      v-for="item in ss"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
			  		</el-table-column>
			  		<el-table-column
			  		  prop="ssdemo"	
			  		  label="术前药品选择" width="120px">
					<el-select v-model="value" placeholder="请选择">
						<el-option-group
						  v-for="group in sqyp"
						  :key="group.label"
						  :label="group.label">
						  <el-option
							v-for="item in group.sqyp"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						  </el-option>
						</el-option-group>
					  </el-select>
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
									  placeholder="手术搜索"/>
								  </template>
					</el-table-column>
					
			  	</el-table>
			  </el-row>
			  <el-form-item>
				 <el-col :span="3" :offset="9">
				<el-button type="primary" @click="resetForm('ruleForm')">提交</el-button>
				</el-col>
			  </el-form-item>
		</el-form>
	</el-dialog>
	
	
	
	
	<el-row>
		<el-col :span="6">
			结果：<span>2</span>条
		</el-col>
	</el-row>
	<el-row>
		<el-col>
			<el-table
			    :data="ssTa"
			    tooltip-effect="dark"
				height="660"
			    style="width: 100%"	
				>
			    <el-table-column
			      label="住院号"
				  prop="ssId"
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
				<el-table-column label="操作" width="200px" 	align="center">
				      <template #default="scope">
				        <el-button
				          size="mini"
						type="primary"
				          @click="handleEdit(scope.$index, scope.row)">申请手术</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click="handleDelete(scope.$index, scope.row)">出院</el-button>
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
	export default {
	    data () {
	      return {
			sfmy:"",
			ss:[{
			  value: '选项1',
			  label: '全身麻醉'
			}, {
			  value: '选项2',
			  label: '局部麻醉'
			}, {
			  value: '选项3',
			  label: '非麻醉'
			}],
			qq:'',
			sqyp:[{
			  value: '选项1',
			  label: '预防过敏',
			  sqyp:[{
			    value: '选项1',
			    label: '塞米松'
			  }], 
			}, {
			  value: '选项2',
			  label: '抑制分泌',
			  sqyp:[{
			    value: '选项1',
			    label: '塞米松'
			  }]
			}, {
			  value: '选项3',
			  label: '镇静药'
			}],
			ssTa:[{
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
			ssss:'',
			value: '',
			value1: '',
			isShow:false,
			input: '',
			sstime: '',
	        radio1: '查看全部',

			ruleForm: {
			          pass: '',
			          checkPass: '',
			          age: ''
			}      
	      }
	    },
		methods: {
			handleEdit(index, row) {
				this.isShow = true;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					alert('submit!');
				  } else {
					console.log('error submit!!');
					return false;
				  }
				});
			},
			resetForm(formName) {
				this.isShow = false
				this.$refs[formName].resetFields();
			}
		},
	  }
</script>

<style>
	.ss-br-xx{
		padding-top: 5px;
		width: 200px;
	}


</style>

