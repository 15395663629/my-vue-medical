<template>
	<el-container style="height: 100%;">
		<el-header height="30px"  style="line-height: 30px; background-color: #B3C0D1;color: #333;">
			<!-- <newDateOPC style="margin: 0px; padding: 0px;"></newDateOPC> -->
		</el-header>
		<el-container style="height: 100%;">
			<el-aside width="400px" style="background-color: #D3DCE6;color: #333;"> <!-- 右边 -->
				<el-row>
					<el-col :span="24">
						<el-button style="width: 100%;" type="primary" plain @click="countLeftTopTable"> 刷新候诊病人 </el-button>
					</el-col>
					<el-col :span="8">
						<el-button style="width: 100%;" type="primary" plain @click="call"> 呼叫病人 </el-button>
					</el-col>
          <el-col :span="8">
            <el-button style="width: 100%;" type="primary" plain @click="call"> 重复呼叫 </el-button>
          </el-col>
          <el-col :span="8">
            <el-button style="width: 100%;"  type="primary" plain @click="jumpMark"> 跳号 </el-button>
          </el-col>
				</el-row>
				<el-row>
					<el-col><!-- ================================================== 左上 第一个table ==================================================-->
            <el-tabs v-model="activeName" @tab-click=" " stretch >
              <el-tab-pane label="呼叫列表" :key="0" name ="0">
                <el-table highlight-current-row :data="leftTopTable" size="mini" @row-dblclick="addTopHeader" :row-class-name="tableRowClassName" style="width: 100%;" height="560">
                  <el-table-column fixed prop="bnCount" label="序号"  width="50">
                  </el-table-column>
                  <el-table-column fixed prop="bnSickName" label="姓名"  align="center" width="100">
                  </el-table-column>
                  <el-table-column fixed prop="bnIdCard" label="身份证"  width="160">
                  </el-table-column>
                  <el-table-column prop="rtRegObject.rtClass" label="标签" align="center"
                                   width="90" :filters="[{ text: '复诊', value: '复诊' }, { text: '初诊', value: '初诊' }]"
                                   :filter-method="filterTag"  filter-placement="bottom-end">
                    <template #default="scope">
                      <el-tag :type="scope.row.rtRegObject.rtClass === '复诊' ? 'primary' :(scope.row.rtRegObject.rtClass === '初诊' ? 'success' : 'danger') " disable-transitions>
                        {{scope.row.rtRegObject.rtClass}}
                      </el-tag>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane label="就诊列表" :key="1" name="1">
                <el-row>
                  <el-col  :span="14">
                    <el-input  placeholder="请输入病人姓名或者身份证" v-model="patientQueryText" size="mini" type="text"/>
                  </el-col>
                  <el-col :span="1" >
                    <el-button  size="mini" @click="" icon="el-icon-search" type="primary" ></el-button>
                  </el-col>
                </el-row>
                <el-col><!-- ================================================== 左下 第二个table ==================================================-->
                  <el-table highlight-current-row size="mini" :row-class-name="tableRowClassName" :data="bottom_tables" style="width: 100%" height="530">
                    <el-table-column fixed  label="序号"  width="50"></el-table-column>
                    <el-table-column fixed  label="姓名"  width="100"></el-table-column>
                    <el-table-column fixed prop="bnIdCard" label="身份证"  width="160">
                    </el-table-column>
                    <el-table-column prop="tag" label="标签"
                                     width="90" :filters="[{ text: '复诊', value: '复诊' }, { text: '初诊', value: '初诊' }]"
                                     :filter-method="filterTag"  filter-placement="bottom-end">
                      <template #default="scope">
                        <el-tag :type="scope.row.tag === '复诊' ? 'primary' : 'success'" disable-transitions>
                          {{scope.row.tag}}
                        </el-tag>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-tab-pane>

              <el-tab-pane label="就诊记录" :key="2" name="2">
                <!-- ================================================== 左下 第三个table ==================================================-->

              </el-tab-pane>

            </el-tabs>



					</el-col>
				</el-row>
			</el-aside>
			<el-container style="height: 100%;"><!-- 右边 -->
				<el-header height="80px" style="line-height: 80px; background-color: #B3C0D1;color: #333;"><!-- ******************************* 头部信息按钮部分 ***************************-->
					<el-row>
						<el-form :model="headerInput"  status-icon  ref="headerInput" label-width="80px" class="demo-ruleForm te" >
							<el-col :span="5">
								<el-form-item label="卡号" label-width="60px" style="margin-bottom: 0px">
									<el-input v-model="headerInput.mcCard" size="mini" style="width: 140px; " disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="姓名" label-width="50px"  style="margin-bottom: 0px">
									<el-input v-model="headerInput.bnSickName" size="mini"  style="width: 130px;" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="性别"  label-width="50px"  style="margin-bottom: 0px">
									<el-input v-model="headerInput.sickSex"  size="mini"  style="width: 100px;" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="年龄" label-width="50px"  style="margin-bottom: 0px">
									<el-input v-model="headerInput.sickAge"  size="mini"  style="width: 80px;" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="联系方式" label-width="80px"  style="margin-bottom: 0px">
									<el-input  v-model="headerInput.sickPhone" size="mini" style="width: 150px;"  disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item label="病人类型" label-width="80px"  style="margin-bottom: 0px">
									<el-select  size="mini"  style="width: 110px;"  v-model="headerInput.optionsValue" placeholder="请选择">
										<el-option
										  v-for="item in options"
										  :key="item.value"
										  :label="item.label"
										  :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
              <el-col :span="25">
                <el-form-item  label="问诊号" label-width="60px">
                  <el-input size="mini" style="width: 140px" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item  label="诊类" label-width="50px">
                  <el-input size="mini" v-model="headerInput.rtClass" style="width: 60px" disabled></el-input>
                </el-form-item>
              </el-col>
					<!-- =========== -->
							<el-col >
								<el-form-item label-width="20px" >
									<el-button size="mini" @click="openAddDrug" type="primary">新开药品</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="20px" >
									<el-button size="mini"  @click="centerDialogVisible2 = true"  type="primary">病理检验</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="20px" >
									<el-button size="mini" @click="centerDialogVisible3 = true" type="primary">手术项目</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="20px" >
									<el-button size="mini" type="warning" @click="openFullScreen2">保存</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="20px" >
									<el-button size="mini" @click="bingli=true" type="primary">历史病例</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="20px" >
									<el-button size="mini" type="primary">转住院</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="20px" >
									<el-button size="mini" @click="handleClose(ss)" type="primary">结束就诊</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="20px" >
									<el-button size="mini" @click="pushUrl('/home')" type="success">返回主页</el-button>
								</el-form-item>
							</el-col>
            </el-form>
          </el-row>
				</el-header>
        <!-- ================================================== 主体页面表格 ==================================================-->
				<el-main style="background-color: #E9EEF3;color: #333;padding: 5px;" >
					<el-tabs type="border-card" >
            <el-tab-pane label="西药处方" >
              <opcTable1  :textarea1="textarea1" :rightTableData1="rightTableData1"></opcTable1>
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

            <el-tab-pane label="病历填写" >
              <el-form  status-icon style="margin-top: 10px"  ref="" label-width="80px" class="demo-ruleForm" >
                  <el-row>
                    <el-col :span="23">
                      <el-form-item label="主诉：" label-width="100px"  >
                        <el-input v-model="headerInput.sickSex"  autosize type="textarea" size="mini"  maxlength="400"
                        show-word-limit>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="23">
                      <el-form-item label="现病史：" label-width="100px"  >
                        <el-input  autosize type="textarea" size="mini"  maxlength="400"
                                   show-word-limit>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="23">
                      <el-form-item label="既往病史：" label-width="100px"  >
                        <el-input  autosize type="textarea" size="mini"  maxlength="400"
                                   show-word-limit>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="23">
                      <el-form-item label="家族史：" label-width="100px"  >
                        <el-input  autosize type="textarea" size="mini"  maxlength="400"
                                   show-word-limit>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="23">
                      <el-form-item label="体检结果：" label-width="100px"  >
                        <el-input  rows="4" type="textarea" size="mini" disabled maxlength="400"
                                   show-word-limit>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="23">
                      <el-form-item label="处理和建议：" label-width="100px"  >
                        <el-input  rows="10" type="textarea" size="mini" maxlength="1000"
                                   show-word-limit>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
              </el-form>
            </el-tab-pane>
					</el-tabs>
				</el-main>



				<!-- 新开药品==============================================================================================================================这里的”标“签是判断药品的类型 -->
				<el-dialog title="药品筛选" width="80%" top="30px" @close="closeAddDrugFunction"  v-model="isShowAddDrug"  destroy-on-close center>
          <el-form >
            <el-row>

              <el-col :offset="2" :span="5">
                <el-form-item label="药品名称" label-width="80px">
                  <el-input type="text" size="small" v-model="drugSearch.drugNameSearch" placeholder="药品名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item>
                  <el-button  size="small" @click="drugSearchFunction" icon="el-icon-search" type="primary" ></el-button>
                </el-form-item>
              </el-col>


              <el-col :span="4">
                <el-form-item label="类别" label-width="80px">
                  <el-select @change="drugSearchFunction"  size="small" v-model="drugSearch.searchYfDrcaName">

                    <el-option v-for="yf in searchYfDrcaNameArr"
                               :label="yf.yfDrcaName"
                               :value="yf.yfDrcaName">
                    </el-option>

                  </el-select>
                </el-form-item>
              </el-col>

              <el-col  :span="4">
                <el-form-item label="药品规格" label-width="80px">
                  <el-select @change="drugSearchFunction" size="small" v-model="drugSearch.searchSpecId">
                    <el-option
                        label="全部规格"
                        value="">
                    </el-option>

                    <el-option v-for="ut in searchSpecifcationsArr"
                               :label="ut.specSpecification"
                               :value="ut.specId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col  :span="4">
                <el-form-item label="药品用法" label-width="80px">
                  <el-select @change="drugSearchFunction" size="small"  v-model="drugSearch.searchDrugUsage">
                    <el-option
                        label="全部用法"
                        value="">
                    </el-option>
                    <el-option v-for="uts in searchDrugUsageArr"
                               :label="uts"
                               :value="uts">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col  :offset="1" :span="2">
                <el-form-item >
                  <el-button size="small" icon="el-icon-check" @click="yesDrugAddDoctorEnjoin" type="primary">一键添加</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>


          <el-table
              height="500px"
              :data="drugArr"
              ref="drugTable"
              @selection-change="drugSelectChange"
              style="width: 100%">
            <el-table-column
                type="selection"
                width="55"/>
            <el-table-column prop="drugName" label="药品名称"> </el-table-column>
            <el-table-column prop="drugRemark" label="功效"> </el-table-column>
            <el-table-column prop="specSpecification" label="药品规格"> </el-table-column>
            <el-table-column prop="drugUnit" label="药品单位"> </el-table-column>
            <el-table-column prop="yfDrcaName" label="类别"></el-table-column>
            <el-table-column prop="drugPrice" label="价格"></el-table-column>
            <el-table-column prop="drugSpecification" label="药品用法"></el-table-column>
          </el-table>

				</el-dialog>
				
				<!-- 病理检验=================================================================================================================================================== -->
				<el-dialog title="项目检验" v-model="centerDialogVisible2"
				 width="80%"  destroy-on-close center>
				 <el-row>
					 <el-col :span="7">
						<el-input size="small" style="width: 200px;" placeholder="请输入你要查询的内容" ></el-input>
						<el-button size="small" type="primary" icon="el-icon-search">查询</el-button>
					</el-col>
					<el-col :span="14">
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
				 <el-table row-key="date"  :data="tableData" style="width: 100%" height="330">
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
					 <el-col :span="7">
						<el-input size="small" style="width: 200px;" placeholder="请输入你要查询的内容" ></el-input>
						<el-button size="small" type="primary" icon="el-icon-search">查询</el-button>
					</el-col>
					<el-col :span="14">
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
				 <el-table row-key="date"  :data="tableData" style="width: 100%" height="330">
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
				 width="50%"  destroy-on-close center>
					 <el-table row-key="date"  :data="tableData" style="width: 100%" height="380">
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
				textarea1: '', //中间的表格
				textarea2: '',
				textarea3: '',
				textarea4: '',
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
				],
        //从这里开始加入后台写------------------------------------------------------------
        token:[],//操作人员
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
        // 排号表
        leftTopTable:[],
        // 头部model属性
        headerInput:{
          bnCount:'',
          mcCard:'',
          bnIdCard:'',
          bnSickName:'',
          sickSex:'',
          sickAge:'',
          sickPhone:'',
          rtClass:'',
          mrNumber:'',
          optionsValue:'',//病人类型 老人还是。。。
        },
        searchDrugUsageArr:[],//药品用法集合
        searchSpecifcationsArr:[],//药品规格集合
        searchYfDrcaNameArr:[],//药品类别集合
        drugSearch:{//药品搜索对象
          searchDrugUsage:'',//药品用法
          drugNameSearch:'',//药品模糊查询
          searchSpecId:'',//药品单位
          searchYfDrcaName:'',//类别搜索（中药、西药）
        },
        drugArr:[],//药品数组
        isShowAddDrug:false,//是否显示天机药品弹框
        selectDrugArr:[],//医生选中数据
        rightTableData1:[],//西药处方
        rightTableData2: [],//中药处方
        activeName:'0',//切换默认值
        patientQueryText:'',//呼叫列表搜索内容
			}
		},
		methods: {
		  // 加入后台部分-------------------------------------------------------------------

      call(){ // 呼叫列表
        console.log(this.leftTopTable[0])
        for (let top of this.leftTopTable){

        }
      },
      jumpMark(){ //跳号

      },
      countLeftTopTable(){//查询单个科室今天挂号的总数
        this.axios.post('allMzOpcNumber',{ksName:this.token.ksId,science:this.token.tid}).then((v)=>{
          this.leftTopTable=v.data
        }).catch(()=>{

        })
      },
      //添加到右边头部去
      async addTopHeader(row){
        if(this.headerInput.bnCount !=''){
          if(this.headerInput.bnCount != row.bnCount){
            if(this.rightTableData1.length>0 || this.rightTableData2.length>0){
              let is = await this.$confirm('当前正在执行【' + this.headerInput.bnSickName + '】 的医嘱操作！如果切换将把该病人的医嘱数据移除  是否切换？', '确认信息', {
                distinguishCancelAndClose: true,
                showClose:false,
                closeOnClickModal:false,
                confirmButtonText: '取消切换',
                cancelButtonText: '切换',
              }).then(() => {
                this.$message({
                  type: 'warning',
                  message: '已取消'
                });
                return true;
              }).catch(action => {
                this.resultLeftTopTable();
                return false;
              });
              if(is){
                return false;
              }
            }
          }
        }
        this.headerInput.bnCount = row.bnCount
        this.headerInput.mcCard = row.rtRegObject.cardObject.mcCard
        this.headerInput.rtClass = row.rtRegObject.rtClass
        this.headerInput.sickPhone = row.rtRegObject.cardObject.mzSick.sickPhone
        this.headerInput.sickAge = row.rtRegObject.cardObject.mzSick.sickAge
        this.headerInput.bnSickName = row.bnSickName
        this.headerInput.sickSex = row.rtRegObject.cardObject.mzSick.sickSex
        this.headerInput.bnIdCard = row.bnIdCard

      },
      resultLeftTopTable(){
        this.rightTableData1=[];
        this.rightTableData2=[];
      },
      // 动态刷新所有的标签选择和病人资料
      operationInit(){
        this.countLeftTopTable();

        this.axios.post('select-drug-usage').then((v)=>{
          this.searchDrugUsageArr = v.data;
        }).catch();

        this.axios.post('all-spec').then((v)=>{
          this.searchSpecifcationsArr = v.data;
        }).catch();

        this.axios.post('all-drca').then((v)=>{
          this.searchYfDrcaNameArr = v.data;
          this.drugSearch.searchYfDrcaName = this.searchYfDrcaNameArr[0].yfDrcaName;
          this.drugSearchFunction();//调用搜索药品方法
        }).catch();
      },
      //搜索药品方法
      drugSearchFunction(){
        this.axios.post('select-drug-drugName',this.drugSearch).then((v)=>{
          this.drugArr = v.data;
        }).catch();
      },
      //关闭药品弹框时候调用
      closeAddDrugFunction(){
        this.$refs.drugTable.clearSelection();
        this.isShowAddDrug = false;
      },
      //药品选中调用方法
      drugSelectChange(obj){
        this.selectDrugArr = obj;
      },
      //打开添加药品方法
      openAddDrug(){
        if(this.headerInput.sickSex == ''){
          this.$message({
            type: 'warning',
            message: '请选择病人'
          });
          return;
        }
        this.isShowAddDrug = true;//显示
      },
      //确定将选中的药品放入医嘱详表
      yesDrugAddDoctorEnjoin(){
        if(this.selectDrugArr.length == 0){
          this.$message({
            type: 'warning',
            message: '未选中药品！'
          });
          return;
        }
        for (let drug of this.selectDrugArr){
          if(drug.yfDrcaName=="西药"){
            drug.xpObject={//格外在添加个对象进去
              rdNumber:'',//西药编号
              rdName:drug.drugName,//名字
              rdCount:1,//数量
              rdDosage:'',//用量
              rdFrequency:'',//频次
              rdWay:drug.drugSpecification,//用法
              rdPrice:drug.drugPrice,//单价
              rdTyppe:drug.yfDrcaName,//类型
              rdSkin:false,//是否皮试
              rdSkinResult:'',//皮试结果
              rdGrouping:'',//输液分组
              rdEntrust:'',//嘱托
              drugId:drug.drugId,//药品编号
              recipeNumber:'',//处方编号
            },
            this.rightTableData1.push(drug);
          }else{
            drug.zpObject={
              zpNumber:'',//中药编号
              zpName:drug.drugName,//中药名字
              drugId:drug.drugId,//药品id
              zpSpecification:drug.specSpecification,//规格
              zpCount:1,//数量
              zpUsage:drug.drugSpecification,//用法
              zpPrice:drug.drugPrice,//单价
              zpEntrust:'',//嘱托
              recipeNumber: '',//处方编号
            },
            this.rightTableData2.push(drug);
            console.log(this.rightTableData2)
          }

        }
        this.closeAddDrugFunction();

      },
      tableRowClassName({row, rowIndex}) { // 暂时没用到
        if (this.headerInput.bnCount == row.bnCount) {
          return 'success';
        }
      },






      //没有加入后台的部分-----------------------------------------------------------------------
		      handleEdit(index, row) {
		        console.log(index, row);
		      },
		      handleDelete(index, row) {
		        console.log(index, row);
		      },
			  filterTag(value, row) {/* 复诊初诊标签方法 */
				return row.rtRegObject.rtClass === value;
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
				}, 1000);
			}
		},
		created() {
      this.token= this.$store.state.token == null ? null : this.$store.state.token.list;//将登录存入的值在取出来
      this.operationInit()
    }
	}
</script>

<style scoped>
  /deep/ .el-table__body tr.current-row>td{
    background-color: #8BD3FF!important;
    color: white;
    /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
  }
   /deep/.el-tabs--border-card>.el-tabs__content{
     padding: 0px;
   }
   .te /deep/ .el-input__inner {
     color: red;
     font-size: 13px;
     cursor: pointer;
   }
</style>
