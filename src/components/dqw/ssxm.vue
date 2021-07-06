<template>
	<el-row class="row-one">
		<el-col :span="12" :offset="8" >
						手术信息：<el-input class="myin" v-model="input" placeholder="请输入你要查询的手术" ></el-input>
						<el-button type="primary" icon="el-icon-search">查询</el-button>
		</el-col>
	</el-row>
	<el-dialog title="手术详情" v-model="isShow" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-手术详情 -->
		<el-form  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-row>
								<el-col :span="6">
									<el-form-item label="手术编号:" prop="name">
									35153
									</el-form-item>
								</el-col>
								<el-col :span="6" :offset="4">
									<el-form-item label="科室:" prop="name">
									内科
									</el-form-item>
								</el-col>
			</el-row>
			  <el-row>
					<el-col :span="6">
						<el-form-item label="手术名称:" prop="name">
						阑尾炎
						</el-form-item>
					</el-col>
					<el-col :span="6" :offset="4">
						<el-form-item label="手术类型:" prop="name">
						开刀
						</el-form-item>
					</el-col>
			  </el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item label="手术位置:" prop="name">
						腹部
					</el-form-item>
					</el-col>
					<el-col :span="6" :offset="4">
						<el-form-item label="手术价格:" prop="name">
						1234元
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item label="所需麻醉:" prop="name">
						区域麻醉
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="22">
					<el-form-item label="适应症:" prop="name">
					　　1.低位直肠癌，如切除至肿瘤下方2~3cm正常肠段肛直肠环已不完整者。
					
					　　2.直肠癌肿侵及直肠环者。
					
					　　3.中下段直肠癌肠外侵犯较广泛者。
					
					　　4.男性、肥胖、骨盆狭小等由于解剖条件而无法进行直肠肿瘤切除和吻合术。
					
					　　5.肛管和肛缘周围癌肿者。
					</el-form-item>
				</el-col>
					
			</el-row>
			<el-row>
				<el-col :span="22">
					<el-form-item label="注意事项:" prop="name">
					　　1.游离直肠前，可先在直肠及乙状结肠交界处用纱带或粗丝线双重结扎阻断肠腔，向远端肠腔内注入5-FU1000mg，以减少分离直肠时癌细胞脱落引起播散和种植的危险。
					
					　　2.切开乙状结肠和直肠、乙状结肠系膜根部时，应将肠段上提拉紧，贴靠根部内侧与后腹膜交界处切开，这样易避开输尿管，不必常规解剖暴露输尿管。
					
					　　3.在骶岬平面进入直肠后间隙，应看清间隙直视下进行锐性分离，注意保护腹下神经，并深S形拉钩向前上方提起，后方分离需一直断离直肠骶筋膜至超越尾骨尖。
					
					　　4.在进行侧方分离断离侧韧带时，应以深S形拉钩向外侧拉开，保护输尿管。
					</el-form-item>
				</el-col>
					
			</el-row>
			<el-row>
				<el-col :span="22">
					<el-form-item label="手术禁忌:" prop="name">
									  　　1.高龄、体弱、全身情况太差、伴严重心、肺、肝、肾等脏器功能不全，不能耐受经腹手术者。
									  
									  　　2.直肠癌局部盆腔有广泛浸润或呈冷冻骨盆者。
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
						<el-select v-model="value1" multiple placeholder="请选择" style="width: 300px;">
						    <el-option
						      v-for="item in mazui"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
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
	<el-row >
		<el-col :span="6" >
			结果：<span>2</span>条
		</el-col>
		<el-col  :span="6" :offset="18">
			<el-button type="primary"   @click="ssEdit()">新增</el-button>	
		</el-col>
	</el-row>
	<el-row > <!--======= ============================================================表格 ====================-->
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
		      label="手术名称">
		    </el-table-column>
		    <el-table-column
		      prop="sscard"
		      label="手术类型">
		    </el-table-column>
			<el-table-column
			  prop="ssbed"
			  label="手术注意事项">
			</el-table-column>
			<el-table-column
			  prop="sstime"
			      sortable
			      width="180"
			      column-key="date"
			      :filter-method="filterHandler"
			  label="修改日期">
			</el-table-column>
			<el-table-column
			  prop="ssdemo"
			  label="手术项目">
			</el-table-column>
			<el-table-column label="操作" width="400px">
			      <template #default="scope">
					<el-button
					  size="mini"
					  @click="handleEdit(scope.$index, scope.row)">手术详情
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
	</el-row>
	
</template>

<script>
	export default {
	    data () {
	      return {
			  ssjj:'',
			  options: [{
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
				mazui: [{
				          value: '选项1',
				          label: '全麻'
				        }, {
				          value: '选项2',
				          label: '椎管内麻醉'
				        }, {
				          value: '选项3',
				          label: '复合麻醉'
				        }, {
				          value: '选项4',
				          label: '静吸复合麻醉'
				        }, {
				          value: '选项5',
				          label: '硬膜外麻醉'
				        },{
				          value: '选项1',
				          label: '不麻醉'
				        }],
			          value: '',
					  value1: [],
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
			handleEdit(index, row) {
				this.isShow = true;
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
	  }
</script>

<style>
	.my-el-time{
		padding-top: 20px;
		width: 200px;
	}
	.myin{
		padding-top: 20px;
		width: 200px;
	}

</style>

