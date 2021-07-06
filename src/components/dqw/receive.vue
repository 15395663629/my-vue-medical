<template>
	<el-row class="row-one">
		<el-col :span="7" >
			时间选择：<el-input class="my-el-time" v-model="sstime" type="date"></el-input>
		</el-col>
		<el-col :span="10">
			病人信息：<el-input class="my-el-input" v-model="input" placeholder="请输入你要查询的病人" ></el-input>  
			<el-button type="primary" icon="el-icon-search">查询</el-button>
		</el-col>
		
	</el-row>
	<el-dialog title="套餐详情" v-model="isShow" width="50%" center  ><!-- 弹窗详情 -->
		<el-form  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="套餐名称:" prop="name">
					爱康【中枢神经系统体检套餐】男女通用（仅限北京/广州）
			  </el-form-item>
			  <el-form-item label="所含项目:" prop="name">
			  		<el-col>
						头部MRI增强  指标：头部 分诊 脑科
					</el-col>
			  </el-form-item>
			  <el-form-item>
				  <el-col :span="1" :offset="8">
				<el-button @click="resetForm('ruleForm')">确定</el-button>
				</el-col>
			  </el-form-item>
		</el-form>
	</el-dialog>
	<el-row>
		<el-col :span="6">
			结果：<span>2</span>条
		</el-col>
	</el-row>
	<el-row > <!-- 表格 -->
		<el-table
		    ref="multipleTable"
		    :data="ssTa"
		    tooltip-effect="dark"
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
					  @click="handleEdit(scope.$index, scope.row)">耗材详情
					  </el-button>
			        <el-button
			          size="mini"
			          @click="handlesp(scope.$index, scope.row)">审批</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
		</el-table>
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
			
			        value: '',
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
	.my-el-time{
		padding-top: 20px;
		width: 200px;
	}
	.my-el-input{
		padding-top: 20px;
		width: 200px;
	}
	.my-radio-group{
		margin-top: 20px;
		margin-left: 100px;
	}
	.el-form-item{
		margin: 0px;
	}
</style>

