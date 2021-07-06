<template>
	<el-row class="row-one">		
		<el-col :span="16" :offset="6">
			
			<i class="el-icon-wind-power"></i>
			体检人员信息：<el-input class="my-tjss" v-model="input" placeholder="请输入你要查询的体检人员" ></el-input>  
			<el-button type="primary" icon="el-icon-search">查询</el-button>
			体检时间：
			<el-radio-group v-model="radio1" class="" >
			  <el-radio-button label="当天体检"></el-radio-button>
			  <el-radio-button label="预约体检"></el-radio-button>
			</el-radio-group>
		</el-col>
	</el-row>

	<el-row>
		<el-col :span="6">
			筛选结果：<span>2</span>条
		</el-col>
		<el-col :span="1" :offset="15">
		<el-button type="primary" @click=xztjEdit()>新增</el-button>
		</el-col>
	</el-row>
	<el-dialog title="新增体检人员" v-model="xztj" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-新增体检人员======================================= -->
		<el-form  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-row>
								<el-col :span="6">
									<el-form-item label="编号:" prop="name">
									<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6" :offset="4">
									<el-form-item label="体检人:" prop="name">
									<el-input></el-input>
									</el-form-item>
								</el-col>
			</el-row>
			<el-row>
					<el-col :span="6">
									<el-form-item label="性别:" prop="name">
									<el-radio v-model="radio" label="1">男</el-radio>
									  <el-radio v-model="radio" label="2">女</el-radio>

									</el-form-item>
					</el-col>
					<el-col :span="7" :offset="4">
						<el-form-item label="手机号:" prop="name">
						<el-input></el-input>
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>
				<el-form-item label="身份证:" prop="name">
					<el-input></el-input>
				</el-form-item>
				<el-col :span="7" :offset="2">
					<el-form-item label="体检时间:" prop="name">
						<div class="block">
						    <el-date-picker
						      v-model="value1"
						      type="date"
						      placeholder="选择日期">
						    </el-date-picker>
						  </div>
					</el-form-item>
					
				</el-col>
				
			</el-row>
			<el-row > <!-- ==================================================================套餐表格 ==================================================================-->
				<el-table :data="tableData" style="width: 100%;height:300px;">
					 <el-table-column
					      type="selection"
					      width="55">
					    </el-table-column>
					<el-table-column label="编号" width="180">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					
				    <el-table-column label="套餐名称" width="300">
						<template #default="scope">
						<el-popover effect="light" trigger="hover"  placement="top">
							<template #default>
								<p>套餐名称: {{ scope.row.name }}</p>
							</template>
							<template #reference>
				            <div class="name-wrapper">
				              <el-tag size="medium">{{ scope.row.name }}</el-tag>
				            </div>
				          </template>
						</el-popover>
				      </template>
				    </el-table-column>
					<el-table-column label="价格">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.price }}</span>
						</template>
					</el-table-column>
					<el-table-column label="体检类型">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.lx }}</span>
						</template>
					</el-table-column>
				    <el-table-column width="150px"
				    			  align="right">
				    			  <template  #header>
				    				<el-input
				    				  v-model="ssss"
				    					prefix-icon="el-icon-search"
				    				  size="small"
				    				  placeholder="项目搜索"/>
				    			  </template>
				    </el-table-column>
				</el-table>
			</el-row>
			<el-form-item>
							  <el-col :span="1" :offset="10">
							<el-button type="primary" @click="xztjForm('ruleForm')">确定</el-button>
							</el-col>
			</el-form-item>
		</el-form>
	</el-dialog>
	
	<!-- ==================================================体检人员表================================================== -->
	<el-row>
		<el-col>
			<el-table :data="tjry" style="width: 100%;">
			    <el-table-column
			      label="编号"
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
				  label="手机号">
				</el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="身份证">
				</el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="体检项目">
				</el-table-column>
				<el-table-column
				  prop="empSalary"
				  label="操作">
				<el-button size="mini" type="primary">通过审批</el-button>
				<el-button size="mini"   type="danger">取消预约</el-button>
				  
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
			var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
	      return {
			  tjry:[{
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
			options: [{
			          value: '选项1',
			          label: '入职体检'
			        }, {
			          value: '选项2',
			          label: '君安高端'
			        }, {
			          value: '选项3',
			          label: 'vip体检套餐'
			        }, {
			          value: '选项4',
			          label: '中老年体检'
			        }, {
			          value: '选项5',
			          label: '孕检/备孕'
			        }],
			        value: '',
			xztj:false,
			input: '',
			 radio: '1',
	        radio1: '查看全部',
			tableData:[{
				date: '123',
				name: '爱康君安【中枢神经系统体检套餐】',
				price:'233',
				lx:'入职体检'
			}],
			ruleForm: {
			          pass: '',
			          checkPass: '',
			          age: ''
			},
			rules: {
				pass: [
			            { validator: validatePass, trigger: 'blur' }
			    ],
			    checkPass: [
			            { validator: validatePass2, trigger: 'blur' }
			    ],
			   age: [
			            { validator: checkAge, trigger: 'blur' }
			   ]
			}
			      
	      }
		  
	    },
		methods: {
			xztjEdit() {
				this.xztj = true;
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
			xztjForm(formName) {
				this.xztj = false
				this.$refs[formName].resetFields();
			}
		},
	  }
</script>

<style>
	.my-tjss{
		padding-top: 5px;
		width: 200px;
	}
	.works{
			padding: 15px;
		}
</style>

