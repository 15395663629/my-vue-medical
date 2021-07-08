<template>
	<el-row class="row-one">
		<el-form label-width="100px" style="padding-top: 10px">
			<el-col :span="9">
				<el-form-item label="结果：" label-width="60px">
					<span>2</span>条
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item  label="手术信息" label-width="100px">
					<el-input style="width: 200px;" v-model="input" placeholder="请输入你要查询的手术" ></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="" label-width="18px">
					<el-button type="primary" icon="el-icon-search">查询</el-button>
					</el-form-item>
			</el-col>
			<el-col :span="5" >
				<el-form-item label="" label-width="800px">
				<el-button type="primary"  @click="ssEdit()">新增</el-button>	
				</el-form-item>
			</el-col>
		</el-form>
	</el-row>
	<el-dialog title="手术详情" v-model="isShow" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-手术详情 -->
		<el-form :model="ssproject"   label-width="100px" class="demo-ruleForm">
			<el-row>
								<el-col :span="6">
									<el-form-item label="手术编号:" prop="projectId">
                    {{ssproject[0].projectId}}
									</el-form-item>
								</el-col>
								<el-col :span="6" :offset="4">
									<el-form-item label="科室:" prop="士大夫">
                    {{ssproject[0].ksName}}
									</el-form-item>
								</el-col>
			</el-row>
			  <el-row>
					<el-col :span="8">
						<el-form-item label="手术名称:" prop="projectName">
              {{ssproject[0].projectName}}
						</el-form-item>
					</el-col>
					<el-col :span="6" :offset="2">
						<el-form-item label="手术类型:" prop="name">
              {{ssproject[0].projectType}}
						</el-form-item>
					</el-col>
			  </el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item label="手术位置:" prop="name">
            {{ssproject[0].projectPosition}}
					</el-form-item>
					</el-col>
					<el-col :span="6" :offset="4">
						<el-form-item label="手术价格:" prop="name">
              {{ssproject[0].projectPay}}
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="可选麻醉:" prop="name">
            <ul>
              <li style="list-style: none;float: left" v-for="(value) in mzproject">{{value.operationAnaesthesia}}&nbsp</li>
            </ul>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="22">
					<el-form-item label="适应症:" prop="name">
					　　{{ssproject[0].projectIndication}}
					</el-form-item>
				</el-col>
					
			</el-row>
			<el-row>
				<el-col :span="22">
					<el-form-item label="注意事项:" prop="name">
					　　{{ssproject[0].projectMatters}}
					</el-form-item>
				</el-col>
					
			</el-row>
			<el-row>
				<el-col :span="22">
					<el-form-item label="手术禁忌:" prop="name">
									  　{{ssproject[0].projectTaboo}}
					</el-form-item>
				</el-col>		
			</el-row>
			  <el-form-item>
				  <el-col :span="1" :offset="8">
				<el-button @click="resetForm('ruleForm')">确定</el-button>
				</el-col>
			  </el-form-item>
		</el-form>
	</el-dialog>
	<el-dialog title="手术" v-model="xgss" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-修改======================================= -->
		<el-form  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-row>
								<el-col :span="6">
									<el-form-item label="手术编号:" prop="name">
									<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6" :offset="4">
									<el-form-item label="科室:" prop="name">
									<el-input></el-input>
									</el-form-item>
								</el-col>
			</el-row>
			  <el-row>
					<el-col :span="6">
						<el-form-item label="手术名称:" prop="name">
						<el-input></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6" :offset="4">
						<el-form-item label="手术类型:" prop="name">
						<el-input></el-input>
						</el-form-item>
					</el-col>
			  </el-row>
			<el-row>
					<el-col :span="6">
							<el-form-item label="手术位置:" prop="name">
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
						<el-form-item label="手术价格:" prop="name">
						<el-input></el-input>
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="适应症:" prop="name">
					<el-input
					  type="textarea"
					  :rows="2"
					  placeholder="请输入内容"
					  v-model="ssjj">
					</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" :offset="2">
						<el-form-item label="所需麻醉:" prop="name">
						<el-select v-model="ana" multiple placeholder="请选择" style="width: 300px;">
						    <el-option
						      v-for="item in mazui"
						      :key="item.value"
						      :label="item.label"
						      :value="item.operationAnaesthesia">
						    </el-option>
						  </el-select>

						</el-form-item>
					</el-col>
			</el-row>
			<el-row>
								<el-col :span="8">
									<el-form-item label="手术禁忌:" prop="name">
									  <el-input
									  type="textarea"
									  :rows="2"
									  placeholder="请输入内容"
									  v-model="ssjj">
									</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8" :offset="2">
									<el-form-item label="注意事项:" prop="name">
									<el-input
									  type="textarea"
									  :rows="2"
									  placeholder="请输入内容"
									  v-model="ssjj">
									</el-input>
									</el-form-item>
								</el-col>
			</el-row>
			  <el-form-item>
				  <el-col :span="1" :offset="8">
				<el-button @click="ssForm('ruleForm')">确定</el-button>
				</el-col>
			  </el-form-item>
		</el-form>
	</el-dialog>
	
	<el-row > <!--======= ============================================================表格 ==================================================-->
		<el-table
		    :data="sproject"
		    tooltip-effect="dark"
			  height="600"
		    style="width: 100%">
		    <el-table-column
		      label="编号"
			  prop="projectId"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="projectName"
		      label="手术名称">
		    </el-table-column>
		    <el-table-column
		      prop="projectType"
		      label="手术类型">
		    </el-table-column>
			<el-table-column
			  prop="projectPay"
			  label="手术价格">
			</el-table-column>
			<el-table-column
			  prop="ksName"
			      width="180"
			  label="科室">
			</el-table-column>
			<el-table-column
			  prop="projectPosition"
			  label="开刀位置">
			</el-table-column>
			<el-table-column label="操作" width="400px">
			      <template #default="scope">
					<el-button
					  size="mini"
					  @click="handleEdit(scope.row)">手术详情
					  </el-button>
			        <el-button
			          size="mini"
			          @click="ssEdit(scope.$index, scope.row)">修改</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
	    data () {
	      return {
          sproject:[],
          ssproject:[],
          mzproject:[],
          total:0,
          pageNo:1,
          size:5,
          projectId:'',
          mazui: [],


          ana: '',

			    isShow:false,
			    xgss:false,
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
      getData(){
        this.axios.get("http://localhost:8089/sprot").then((res)=>{
          this.sproject = res.data;
        }).catch()
        this.axios.get("http://localhost:8089/mzproject").then((res)=>{
          this.mazui = res.data;
        }).catch()

      },
			handleEdit(row) {
        this.projectId=row.projectId;
        console.log(this.projectId)
        this.axios.get("http://localhost:8089/ssprot",{params:{projectId:this.projectId}}).then((res)=>{
          this.ssproject = res.data;
          this.isShow = true;
        }).catch()
        this.axios.get("http://localhost:8089/mzprot",{params:{projectId:this.projectId}}).then((res)=>{
          this.mzproject = res.data;
        }).catch()
			},
			ssEdit(index, row) {
				this.xgss = true;
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
			},
			ssForm() {
				this.xgss = false;
				this.$refs[formName].resetFields();
			}
		},
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
	.my-el-time{
		padding-top: 20px;
		width: 200px;
	}
	.myin{
		padding-top: 20px;
		width: 200px;
	}

</style>

