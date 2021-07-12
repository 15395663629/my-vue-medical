<template>
	<el-container style="height: 100%;">
		<el-header height="30px"  style="line-height: 30px; background-color: #B3C0D1;color: #333;">
			<!-- <newDateOPC style="margin: 0px; padding: 0px;"></newDateOPC> -->
		</el-header>
		<el-container style="height: 100%;">
			<el-aside width="400px" style="background-color: #D3DCE6;color: #333;"> <!-- 右边 -->
				<el-row >
					<el-col>
						<el-button style="width: 100%;"> 刷新候诊病人 </el-button>
					</el-col>
					<el-col>
						<el-button style="width: 100%;"> 呼叫病人 </el-button>
					</el-col>
					<el-col>
							<el-button style="width: 100%;"> 重复呼叫 </el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<h4>呼叫列表：</h4>
					</el-col>
					<el-col>
						<el-table  style="width: 100%;" height="300">
								<el-table-column fixed  label="排列序号"  width="120"></el-table-column>
								<el-table-column fixed  label="姓名"  width="120"></el-table-column>
								<el-table-column prop="tag" label="标签"
								width="100" :filters="[{ text: '复诊', value: '复诊' }, { text: '初诊', value: '初诊' }]"
								:filter-method="filterTag"  filter-placement="bottom-end">
									<template #default="scope">
										<el-tag :type="scope.row.tag === '复诊' ? 'primary' : 'success'" disable-transitions>
										{{scope.row.tag}}
										</el-tag>
									</template>
								</el-table-column>
						</el-table>
					</el-col>
					<el-col>
						<h4>就诊列表：</h4>
					</el-col>
					<el-col>
						<el-table  :data="bottom_tables" style="width: 100%" height="300">
								<el-table-column fixed  label="排列序号"  width="120"></el-table-column>
								<el-table-column fixed  label="姓名"  width="120"></el-table-column>
								<el-table-column prop="tag" label="标签"
								width="100" :filters="[{ text: '复诊', value: '复诊' }, { text: '初诊', value: '初诊' }]"
								:filter-method="filterTag"  filter-placement="bottom-end">
									<template #default="scope">
										<el-tag :type="scope.row.tag === '复诊' ? 'primary' : 'success'" disable-transitions>
										{{scope.row.tag}}
										</el-tag>
									</template>
								</el-table-column>
						</el-table>
					</el-col>
				</el-row>
			</el-aside>
			<el-container style="height: 100%;"><!-- 左边 -->
				<el-header height="120px" style="line-height: 80px; background-color: #B3C0D1;color: #333;"><!-- 头部信息按钮部分-->
					<el-row>
						<el-form status-icon  ref="ruleForm" 
						label-width="80px" class="demo-ruleForm">
							<el-col :span="5">
								<el-form-item label="卡号" >
									<el-input disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="姓名">
									<el-input style="width: 150px;" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="性别">
									<el-input style="width: 100px;" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="年龄">
									<el-input style="width: 80px;" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="联系方式" >
									<el-input disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="病人类型" >
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
						</el-form>
					</el-row>
					<!-- =========== -->
					<el-row>
						<el-form status-icon  ref="ruleForm" 
						label-width="80px" class="demo-ruleForm">
							<el-col :span="25">
								<el-form-item label="门诊号">
									<el-input disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label-width="40px" >
								<el-radio v-model="radio" label="1">初诊</el-radio>
								<el-radio v-model="radio" label="2">复诊</el-radio>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="40px" >
									<el-button  @click="centerDialogVisible1 = true" type="primary">新开药品</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="20px" >
									<el-button   @click="centerDialogVisible2 = true"  type="primary">病理检验</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="20px" >
									<el-button  @click="centerDialogVisible3 = true" type="primary">手术项目</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="20px" >
									<el-button type="warning" @click="openFullScreen2">保存</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="20px" >
									<el-button @click="bingli=true" type="primary">历史病例</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="20px" >
									<el-button type="primary">转住院</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="20px" >
									<el-button @click="handleClose(ss)" type="primary">结束就诊</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="20px" >
									<el-button @click="pushUrl('/home')" type="success">返回主页</el-button>
								</el-form-item>
							</el-col>
						</el-form>
					</el-row>
				</el-header>
				<el-main style="background-color: #E9EEF3;color: #333;padding: 5px;" ><!-- 主体页面========================================================================-->
					<el-tabs type="border-card">
					  <el-tab-pane label="西药处方">
						<opcTable1 :textarea1="textarea1" :rightTableData1="rightTableData1"></opcTable1>
					  </el-tab-pane>
					  <el-tab-pane label="中药处方">
						  <opcTable2 :textarea2="textarea2" :rightTableData2="rightTableData2"></opcTable2>
					  </el-tab-pane>
					  <el-tab-pane label="病理检验">
							<opcTable3 :textarea3="textarea3" :rightTableData3="rightTableData3"></opcTable3>
					  </el-tab-pane>
					  <el-tab-pane label="手术项目">
							<opcTable4 :textarea4="textarea4" :rightTableData4="rightTableData4"></opcTable4>
					  </el-tab-pane>
					  
					</el-tabs>
				</el-main>
				<!-- 新开药品==============================================================================================================================这里的”标“签是判断药品的类型 -->
				<el-dialog title="药品筛选" v-model="centerDialogVisible1"
				 width="80%"  destroy-on-close center>
				 <el-row>
					 <el-col :span="5">
						<el-input style="width: 200px;" placeholder="请输入你要查询的内容" ></el-input> 
						<el-button type="primary" icon="el-icon-search">查询</el-button>
					</el-col>
					<el-col :span="16">
						<el-form>
							<el-form-item label-width="20px">
								<el-radio v-model="radio" label="1">中药</el-radio>
								<el-radio v-model="radio" label="2">西药</el-radio>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="3">
						<el-form>
							<el-form-item label-width="20px">
								<el-button size="small" icon="el-icon-check" type="primary">一件添加</el-button>
							</el-form-item>
						</el-form>
					</el-col>
				 </el-row>
				 <el-table row-key="date"  :data="tableData" style="width: 100%"  height="450">
					<el-table-column type="selection" width="55"> </el-table-column>
					<el-table-column fixed  label="单据编号"  width="120"></el-table-column>
					<el-table-column fixed  label="操作"  width="120">
						<template #default="scope">
						  <el-button
							size="mini"
							type="success"
							@click="handleEdit(scope.$index, scope.row)">选择</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="tag" label="标签"
					width="100" :filters="[{ text: '复诊', value: '复诊' }, { text: '初诊', value: '初诊' }]"
					:filter-method="filterTag"  filter-placement="bottom-end">
						<template #default="scope">
							<el-tag :type="scope.row.tag === '复诊' ? 'primary' : 'success'" disable-transitions>
							{{scope.row.tag}}
							</el-tag>
						</template>
					</el-table-column>
				 </el-table>
				 <div class="block">
					 <span class="demonstration"></span>
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
				   </div>
				</el-dialog>
				
				<!-- 病理检验=================================================================================================================================================== -->
				<el-dialog title="项目检验" v-model="centerDialogVisible2"
				 width="80%"  destroy-on-close center>
				 <el-row>
					 <el-col :span="5">
						<el-input style="width: 200px;" placeholder="请输入你要查询的内容" ></el-input> 
						<el-button type="primary" icon="el-icon-search">查询</el-button>
					</el-col>
					<el-col :span="16">
						<el-form>
							<el-form-item label-width="20px">
								<el-radio v-model="radio" label="1">化验</el-radio>
								<el-radio v-model="radio" label="2">CT</el-radio>
								<el-radio v-model="radio" label="2">其他</el-radio>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="3">
						<el-form>
							<el-form-item label-width="20px">
								<el-button size="small" icon="el-icon-check" type="primary">一件添加</el-button>
							</el-form-item>
						</el-form>
					</el-col>
				 </el-row>
				 <el-table row-key="date"  :data="tableData" style="width: 100%" height="450">
					 <el-table-column type="selection" width="55">
					 </el-table-column>
					<el-table-column fixed  label="单据编号"  width="120"></el-table-column>
					<el-table-column fixed  label="操作"  width="120">
						<template #default="scope">
						  <el-button
							size="mini"
							type="success"
							@click="handleEdit(scope.$index, scope.row)">选择</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="tag" label="标签"
					width="100" :filters="[{ text: '复诊', value: '复诊' }, { text: '初诊', value: '初诊' }]"
					:filter-method="filterTag"  filter-placement="bottom-end">
						<template #default="scope">
							<el-tag :type="scope.row.tag === '复诊' ? 'primary' : 'success'" disable-transitions>
							{{scope.row.tag}}
							</el-tag>
						</template>
					</el-table-column>
				 </el-table>
				 <div class="block">
					 <span class="demonstration"></span>
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
				   </div>
				</el-dialog>
				
				
				<!-- 手术项目=================================================================================================================================================== -->
				<el-dialog title="手术下达" v-model="centerDialogVisible3"
				 width="80%"  destroy-on-close center>
				 <el-row>
					 <el-col :span="5">
						<el-input style="width: 200px;" placeholder="请输入你要查询的内容" ></el-input> 
						<el-button type="primary" icon="el-icon-search">查询</el-button>
					</el-col>
					<el-col :span="16">
						<el-form>
							<el-form-item label-width="20px">
								<el-radio v-model="radio" label="1">一级</el-radio>
								<el-radio v-model="radio" label="2">二级</el-radio>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="3">
						<el-form>
							<el-form-item label-width="20px">
								<el-button size="small" icon="el-icon-check" type="primary">一件添加</el-button>
							</el-form-item>
						</el-form>
					</el-col>
				 </el-row>
				 <el-table row-key="date"  :data="tableData" style="width: 100%" height="450">
					 <el-table-column type="selection" width="55">
					 </el-table-column>
					<el-table-column fixed  label="单据编号"  width="120"></el-table-column>
					<el-table-column fixed  label="操作"  width="120">
						<template #default="scope">
						  <el-button
							size="mini"
							type="success"
							@click="handleEdit(scope.$index, scope.row)">选择</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="tag" label="标签"
					width="100" :filters="[{ text: '复诊', value: '复诊' }, { text: '初诊', value: '初诊' }]"
					:filter-method="filterTag"  filter-placement="bottom-end">
						<template #default="scope">
							<el-tag :type="scope.row.tag === '复诊' ? 'primary' : 'success'" disable-transitions>
							{{scope.row.tag}}
							</el-tag>
						</template>
					</el-table-column>
				 </el-table>
				 <div class="block">
					 <span class="demonstration"></span>
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
				   </div>
				</el-dialog>
				
				<!-- 病理查看=================================================================================================================================================== -->
				<el-dialog title="过往病理" v-model="bingli"
				 width="40%"  destroy-on-close center>
					 <el-table row-key="date"  :data="tableData" style="width: 100%" height="450">
						<el-table-column fixed  label="日期"  width="180">
						  <template #default="scope">
							<i class="el-icon-time"></i>
							<span style="margin-left: 10px">{{ scope.row.date }}</span>
						  </template>
						</el-table-column>
						<el-table-column  label="病情原因"  width="120"></el-table-column>
						<el-table-column  label="病情内容"  align="center" width="290"></el-table-column>
						<el-table-column label="主治医师" width="120">
						  <template #default="scope">
							<el-popover effect="light" trigger="hover" placement="top">
							  <template #reference>
								<div class="name-wrapper">
								  <el-tag size="medium">{{ scope.row.name }}</el-tag>
								</div>
							  </template>
							</el-popover>
						  </template>
						</el-table-column>
					 </el-table>
				 
				</el-dialog>
				
			</el-container>
		</el-container>
	</el-container>
</template>
	
<script>
	export default{
		data(){
			return{
				bingli:false,//病理查看
				centerDialogVisible1: false,
				centerDialogVisible2: false,
				centerDialogVisible3: false,
				currentPage1: 5,
				currentPage2: 5,
				tableData:[{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
				radio: '1',
				options:[
				{
					value: '选项1',
					label: '小孩'
				}, 
				{
				  value: '选项2',
				  label: '成年人'
				}, 
				{
				  value: '选项3',
				  label: '老人'
				}],
				value: '',
				textarea1: '', //中间的表格
				textarea2: '',
				textarea3: '',
				textarea4: '',
				rightTableData1: [{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				}],
				rightTableData2: [{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				}],
				rightTableData3: [{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				}],
				rightTableData4: [{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				}],
				bottom_tables: [{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				},
				{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				},
				{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				},
				{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				},
				{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				},
				{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				},
				{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				},
				{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				}
				],
				
				
			}
		},
		methods: {
		      handleEdit(index, row) {
		        console.log(index, row);
		      },
		      handleDelete(index, row) {
		        console.log(index, row);
		      },
			  filterTag(value, row) {/* 复诊初诊标签方法 */
				return row.tag === value;
			  },
			  handleSizeChange1(val) {
			  				console.log(`每页 ${val} 条`);
			  },
			  handleCurrentChange1(val) {
			  				console.log(`当前页: ${val}`);
			  },
			  handleSizeChange2(val) {
			  				console.log(`每页 ${val} 条`);
			  },
			  handleCurrentChange2(val) {
			  				console.log(`当前页: ${val}`);
			  },
			  handleClose(done) {
					this.$confirm('是否结束就诊？')
					.then(_ => {
					done();
			  	})
			  	.catch(_ => {});
			},
			pushUrl(path){/* 页面跳转 */
				this.$router.push(path);
			},
			openFullScreen2() {//保存
				const loading = this.$loading({
				  lock: true,
				  text: 'Loading',
				  spinner: 'el-icon-loading',
				  background: 'rgba(0, 0, 0, 0.7)'
				});
				setTimeout(() => {
				  loading.close();
				}, 2000);
			}
		},
		created() {
			console.log()
		}
	}
</script>

<style>
   table{
    margin-top: 0px;
  }
</style>
