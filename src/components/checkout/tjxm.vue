<template>
	<el-row class="row-one">		
		<el-form label-width="100px" >
			<el-col :span="9">
				<el-form-item label="类型：" label-width="60px">
					<el-select style="width: 120px" v-model="value" placeholder="请选择">
						<el-option
						  v-for="item in options"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item  label="套餐信息:" label-width="100px">
					<el-input style="width: 180px" v-model="input" placeholder="请输入你要查询的套餐" ></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="" label-width="44px">
					<el-button type="primary" icon="el-icon-search">查询</el-button>
					</el-form-item>
			</el-col>
			<el-col :span="5" >
				<el-form-item label="" label-width="449px">
				<el-button type="primary"  @click="tjtcEdit()">新增套餐</el-button>	
				</el-form-item>
			</el-col>
		</el-form>
			
	</el-row>
	
	<el-dialog title="套餐" v-model="tjtc" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-套餐======================================= -->
		<el-form  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-row>
								<el-col :span="6">
									<el-form-item label="编号:" prop="name">
									<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6" :offset="4">
									<el-form-item label="套餐名称:" prop="name">
									<el-input></el-input>
									</el-form-item>
								</el-col>
			</el-row>
			<el-row>
					<el-col :span="6">
							<el-form-item label="体检类型:" prop="name">
							 <el-select v-model="value" placeholder="请选择">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
							</el-form-item>
						</el-col>
								<el-col :span="6" :offset="4">
						<el-form-item label="套餐价格:" prop="name">
						<el-input></el-input>
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>
				<el-col>
					选择所含项目
				</el-col>
			</el-row>
			<el-row > <!-- ============================================所含项目表格============================================ -->
				<el-table :data="yldate" style="width: 100%;height: 300px;" v-if="isShow!==null">
					<el-table-column
					      type="selection"
					      width="55">
					    </el-table-column>
					<el-table-column label="编号" width="70">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					
				    <el-table-column label="医疗项目名称" width="120">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.name }}</span>
						</template>
				    </el-table-column>
					<el-table-column label="价格" width="80">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.price }}</span>
						</template>
					</el-table-column>
					<el-table-column label="指标" width="100">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.lx }}</span>
						</template>
					</el-table-column>
				    <el-table-column label="指标意义">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.zbyy }}</span>
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
				  <el-col :span="1" :offset="8">
				<el-button @click="tjtcForm('ruleForm')">确定</el-button>
				</el-col>
			  </el-form-item>
		</el-form>
	</el-dialog>
	
	
	<el-dialog title="套餐详情" v-model="tcxq" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-套餐详情======================================= -->
		<el-form  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-row>
								<el-col :span="6">
									<el-form-item label="编号:" prop="name">
									1232
									</el-form-item>
								</el-col>
								<el-col :span="12" :offset="4">
									<el-form-item label="套餐名称:" prop="name">
									套餐名称: 爱康君安【中枢神经系统体检套餐】
									</el-form-item>
								</el-col>
			</el-row>
			<el-row>
					<el-col :span="6">
							<el-form-item label="体检类型:" prop="name">
							 工作体检
							</el-form-item>
						</el-col>
								<el-col :span="6" :offset="4">
						<el-form-item label="套餐价格:" prop="name">
						390
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>
				<el-col>
					所含项目
				</el-col>
			</el-row>
			<el-row > <!-- ============================================所含项目表格============================================ -->
				<el-table :data="yldate" style="width: 100%;height: 300px;">
					<el-table-column label="编号" width="70">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					
				    <el-table-column label="医疗项目名称" width="120">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.name }}</span>
						</template>
				    </el-table-column>
					<el-table-column label="价格" width="80">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.price }}</span>
						</template>
					</el-table-column>
					<el-table-column label="指标" width="100">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.lx }}</span>
						</template>
					</el-table-column>
				    <el-table-column label="指标意义">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.zbyy }}</span>
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
				  <el-col :span="1" :offset="8">
				<el-button @click="tcxqForm('ruleForm')">确定</el-button>
				</el-col>
			  </el-form-item>
		</el-form>
	</el-dialog>
	
	<el-dialog title="检查项目" v-model="jcxm" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-医疗项目======================================= -->
		<el-form  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-row>
								<el-col :span="6">
									<el-form-item label="编号:" prop="name">
									<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6" :offset="4">
									<el-form-item label="项目名称:" prop="name">
									<el-input></el-input>
									</el-form-item>
								</el-col>
			</el-row>
			<el-row>
					<el-col :span="6">
									<el-form-item label="价格:" prop="name">
									<el-input></el-input>
									</el-form-item>
					</el-col>
					<el-col :span="6" :offset="4">
						<el-form-item label="指标意义:" prop="name">
						<el-input></el-input>
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>
				<el-form-item label="指标:" prop="name">
				 <el-select v-model="value" placeholder="请选择">
				    <el-option
				      v-for="item in zhib"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</el-form-item>
			</el-row>
			<el-form-item>
							  <el-col :span="1" :offset="8">
							<el-button @click="jcxmForm('ruleForm')">确定</el-button>
							</el-col>
			</el-form-item>
		</el-form>
	</el-dialog>
	
	

	<el-row > <!-- ==================================================================上表格 ==================================================================-->
		<el-table :data="tableData" style="width: 100%;height:200px;" v-if="isShow!==null">
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
		    <el-table-column label="操作">
		      <template #default="scope">
				  <el-button
				    size="mini"
				    @click="tcxqEdit(scope.$index, scope.row)">套餐详情
				    </el-button>
		        <el-button
		          size="mini"
				  type="primary"
		          @click="tjtcEdit(scope.$index, scope.row)">修改
				  </el-button>
				  <el-button
				    size="mini"
					type="danger">删除
				    </el-button>
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
	</el-row>
	

		<el-row>
			<el-col  style="padding-bottom: 5px" :span="3" :offset="19">
					<el-button type="primary" @click=jcxmEdit()>新增项目</el-button>
			</el-col>
		</el-row>

	<!-- ============================================下表格============================================ -->
	<el-row > 
		<el-table :data="yldate" style="width: 100%;height: 200px;" v-if="isShow!==null">
			<el-table-column label="编号" width="180">
				<template #default="scope">
					<span style="margin-left: 10px">{{ scope.row.date }}</span>
				</template>
			</el-table-column>
			
		    <el-table-column label="医疗项目名称" >
				<template #default="scope">
				<el-popover effect="light" trigger="hover"  placement="top">
					<template #default>
						<p>项目名称: {{ scope.row.name }}</p>
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
			<el-table-column label="指标">
				<template #default="scope">
					<span style="margin-left: 10px">{{ scope.row.lx }}</span>
				</template>
			</el-table-column>
		    <el-table-column label="指标意义">
				<template #default="scope">
					<span style="margin-left: 10px">{{ scope.row.zbyy }}</span>
				</template>
		    </el-table-column>
			<el-table-column width="180" label="操作">
			  <template #default="scope">
			    <el-button
			      size="mini"
			      @click="jcxmEdit()">修改
				  </el-button>
				  <el-button
				    size="mini"
					type="danger">删除
				    </el-button>
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
			  zhib: [{
			            value: '选项1',
			            label: '头部'
			          }, {
			            value: '选项2',
			            label: '腰部'
			          }, {
			            value: '选项3',
			            label: '腹部'
			          }, {
			            value: '选项4',
			            label: '肩部'
			          }, {
			            value: '选项5',
			            label: '腿部'
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
			isShow:false,
			tjtc:false,
			tcxq:false,
			jcxm:false,
			input: '',
	        radio1: '查看全部',
			tableData:[{
				date: '123',
				name: '爱康君安【中枢神经系统体检套餐】',
				price:'233',
				lx:'入职体检'
			}],
			yldate:[{
				date: '123',
				name: 'ct',
				price:'233',
				lx:'腹部',
				zbyy:'adsf asdsadf ad'
			},
			{
				date: '123',
				name: 'ct',
				price:'233',
				lx:'阿斯蒂芬',
				zbyy:'adsf asdsadf ad'
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
			jcxmEdit(index, row) {
				this.jcxm = true;
			},
			tjtcEdit(index, row) {
				this.tjtc = true;
			},
			tcxqEdit(index, row) {
				this.tcxq = true;
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
			jcxmForm(formName) {
				this.jcxm = false
				this.$refs[formName].resetFields();
			},
			tjtcForm(formName) {
				this.tjtc = false
				this.$refs[formName].resetFields();
			},
			tcxqForm(formName) {
				this.tcxq = false
				this.$refs[formName].resetFields();
			}
		},
	  }
</script>

<style>
	.my-el-tc{
		padding-top: 5px;
		width: 200px;
	}
	.works{
			padding: 15px;
		}
</style>

