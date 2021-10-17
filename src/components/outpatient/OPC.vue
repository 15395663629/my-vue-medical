<template>
	<el-container style="height: 100%;">
		<el-header height="30px"  style="line-height: 30px; background-color: #B3C0D1;color: #333;">
			<!-- <newDateOPC style="margin: 0px; padding: 0px;"></newDateOPC> -->
		{{leftRecord}}
    </el-header>
		<el-container style="height: 100%;">
			<el-aside width="400px" style="background-color: #D3DCE6;color: #333;"> <!-- 右边 -->
				<el-row>
					<el-col :span="24">
						<el-button style="width: 100%;" type="primary" plain @click="countLeftTopTable">刷新候诊病人</el-button>
					</el-col>
					<el-col :span="8">
						<el-button style="width: 100%;" type="primary" plain @click="call">呼叫病人</el-button>
					</el-col>
          <el-col :span="8">
            <el-button style="width: 100%;" type="primary" plain @click="jieZheng" >接诊</el-button>
          </el-col>
          <el-col :span="8">
            <el-button style="width: 100%;"  type="primary" plain @click="jumpMark">跳号</el-button>
          </el-col>
				</el-row>

				<el-row>
					<el-col><!-- ================================================== 左上 第一个table ==================================================-->
            <el-tabs v-model="indexRecord" stretch  @tab-click="selectRecord">
              <el-tab-pane  label="呼叫列表" :key="0" name ="0"> <!--@row-click="addTopHeader"-->
                <el-table :data="leftTopTable" size="mini"
                          style="width: 100%;" height="560" v-loading="loading"  element-loading-background="rgba(0, 0, 0, 0.1)"
                          element-loading-text="testDuqu" >
                  <el-table-column  prop="bnCount" label="序号"  width="50">
                  </el-table-column>
                  <el-table-column  prop="bnSickName" label="姓名"  align="center" width="100">
                  </el-table-column>
                  <el-table-column  prop="bnIdCard" label="身份证"  width="160">
                  </el-table-column>
                  <el-table-column  prop="rtRegObject.rtClass" label="标签" align="center"
                                   width="90" :filters="[{ text: '复诊', value: '复诊' }, { text: '初诊', value: '初诊' }]"
                                   :filter-method="filterTag"  filter-placement="bottom-end">
                    <template #default="scope">
                      <el-tag  :type="scope.row.rtRegObject.rtClass === '复诊' ? 'primary' :(scope.row.rtRegObject.rtClass === '初诊' ? 'success' : 'danger') " disable-transitions>
                        {{scope.row.rtRegObject.rtClass}}
                      </el-tag>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
<!--              table2           ===============-->
              <el-tab-pane label="就诊列表" :key="1" name="1">
                <left-table2   @func="getLeft" @funcs="selectRecord" :rightPassBack="rightPassBack" :text="leftText" :leftTable="leftRecord"></left-table2>
              </el-tab-pane>
<!--              table3           ===============-->
              <el-tab-pane label="就诊记录"  :key="2" name="2" >
                <left-table3 @func="getLeft" @funcs="selectRecord" :text="leftText" :leftTable="leftRecord"></left-table3>
              </el-tab-pane>
            </el-tabs>

					</el-col>
				</el-row>
			</el-aside>
			<el-container style="height: 100%;"><!-- 右边 -->
				<el-header height="80px" style="line-height: 80px; background-color: #B3C0D1;color: #333;"><!-- ******************************* 头部信息按钮部分 ***************************-->
					<el-row>
						<el-form :model="headerInput"  :rules="rulesHeader" status-icon  ref="headerInput" label-width="80px" class="demo-ruleForm te" >
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
								<el-form-item label="病人类型" label-width="80px" prop="optionsValue" style="margin-bottom: 0px">
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
                  <el-input size="mini" v-model="headerInput.mrCount" style="width: 184px" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item  label="诊类" label-width="50px">
                  <el-input size="mini" v-model="headerInput.rtClass" style="width: 60px" disabled></el-input>
                </el-form-item>
              </el-col>
					<!-- =========== -->
							<el-col >
								<el-form-item label-width="15px" >
									<el-button size="mini" @click="openAddDrug(0)" type="primary">新开药品</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="15px" >
									<el-button size="mini"  @click="openAddDrug(1)"  type="primary">病理检验</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="15px" >
									<el-button size="mini" @click="openAddDrug(2)" type="primary">手术项目</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="15px" >
									<el-button size="mini" type="warning" @click="saveDoctor('headerInput')">保存</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="15px" >
									<el-button size="mini" @click="openAddDrug(3)"  type="primary">历史病例</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="15px" >
									<el-button size="mini" @click="openAddDrug(4)" type="primary">转住院</el-button>
								</el-form-item>
							</el-col>

							<el-col >
								<el-form-item label-width="15px" >
									<el-button size="mini" @click="overDoctor('headerInput')" type="primary">结束就诊</el-button>
								</el-form-item>
							</el-col>
							<el-col >
								<el-form-item label-width="15px" >
									<el-button size="mini" @click="pushUrl('/home')" type="success">返回主页</el-button>
								</el-form-item>
							</el-col>
            </el-form>
          </el-row>
				</el-header>
        <!-- ================================================== 主体页面表格 ==================================================-->
				<el-main style="background-color: #E9EEF3;color: #333;padding: 5px;" >
					<el-tabs type="border-card" v-model="zhutiKey" >
            <el-tab-pane :key="0"   label="西药处方" >
              <opcTable1 @func="getTest1" :textValues="recipeObject.xpNotes" :rightTableData1="rightTableData1"></opcTable1>
            </el-tab-pane>
            <el-tab-pane :key="1"  label="中药处方">
              <opcTable2 @func="getTest2" :textValues="recipeObject.zpNotes"  :rightTableData2="rightTableData2"></opcTable2>
            </el-tab-pane>
            <el-tab-pane  :key="2" label="病理检验">
              <opcTable3 @func="getTest3" :textValues="tjCodeManObject.manProposal" :rightTableData3="rightTableData3"></opcTable3>
            </el-tab-pane>
            <el-tab-pane  :key="3"  label="手术项目">
              <opcTable4 @func="getTest4" :textValues="surgeryStampObject.susText"  :rightTableData4="rightTableData4"></opcTable4>
            </el-tab-pane>

            <el-tab-pane label="病历填写" >
              <opcTable5 :rightTableData5="historyObject"></opcTable5>
            </el-tab-pane>

					</el-tabs>
				</el-main>



				<!-- 新开药品==============================================================================================================================这里的”标“签是判断药品的类型 -->
				<el-dialog title="药品筛选" width="80%" top="30px" @close="closeAddDrugFunction(0)"  v-model="isShowAddDrug"  destroy-on-close center>
          <el-form >
            <el-row>

              <el-col :offset="2" :span="5">
                <el-form-item label="药品名称" label-width="80px">
                  <el-input type="text" size="small" v-model="drugSearch.drugNameSearch" clearable placeholder="药品名称"></el-input>
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
                    <el-option
                        label="全部类别"
                        value="">
                    </el-option>
                    <el-option
                        label="外用药"
                        value="外用药">
                    </el-option>

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
                    <el-option label="全部用法" value="">
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
                  <el-button size="mini" @click="yesDrugAddDoctorEnjoin(0)" type="primary" icon="el-icon-check">一键添加</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table height="500px" :data="drugArr" ref="drugTable" @selection-change="drugSelectChange" style="width: 100%">
            <el-table-column type="selection" width="55"/>
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
				<el-dialog title="项目检验" top="30px" @close="closeAddDrugFunction(1)" v-model="isShowTj" width="80%"  destroy-on-close center>
          <el-form >
            <el-row>
              <el-col :span="5">
                <el-form-item label=检验名称 label-width="80px">
                  <el-input type="text" size="small" v-model="textTj" clearable placeholder="检验类型名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item>
                  <el-button  size="small" @click="ccooTjpro" icon="el-icon-search" type="primary" ></el-button>
                </el-form-item>
              </el-col>

              <el-col :offset="15"  :span="3">
                <el-form>
                  <el-form-item label-width="20px">
                    <el-button size="small" @click="yesDrugAddDoctorEnjoin(1)" icon="el-icon-check" type="primary">一件添加</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-form>
          <el-table height="500px" :data="tjList" style="width: 100%" ref="drugTable1" @selection-change="drugSelectChange" >
            <el-table-column  type="selection" width="55" />

            <el-table-column fixed  label="检验类型" prop="checkName" width="120"></el-table-column>
            <el-table-column fixed  label="价格" prop="checkPay" width="120"></el-table-column>
            <el-table-column fixed  label="功能属性">
              <template #default="scope">
                <el-popover effect="light" trigger="hover" placement="top" width="580px">
                  <template #default>
                    {{scope.row.indexSignificance}}
                  </template>
                  <template #reference>
                    <div  class="name-wrapper fontType">
                      <el-tag  size="small">{{scope.row.indexSignificance}}</el-tag>
                    </div>
                  </template>
                </el-popover>
              </template>
            </el-table-column>

          </el-table>
				</el-dialog>
				
				
				<!-- 手术项目=================================================================================================================================================== -->
				<el-dialog title="手术下达" top="30px" @close="closeAddDrugFunction(2)" v-model="isShowSs" width="80%"  destroy-on-close center>
				 <el-row>
					 <el-col :span="7">
						<el-input size="small" style="width: 200px;" v-model="textSpro"  clearable placeholder="请输入你要查询的内容" ></el-input>
						<el-button size="small" type="primary" @click="allDescSpro" icon="el-icon-search">查询</el-button>
					</el-col>
					<el-col :span="14">
            <el-select @change="allDescSpro"  size="small" v-model="ssOption">
              <el-option
                  label="全部类别"
                  value="">
              </el-option>
              <el-option v-for="yf in ssClass"
                         :label="yf"
                         :value="yf">
              </el-option>

            </el-select>
					</el-col>
					<el-col :span="3">
						<el-form>
							<el-form-item label-width="20px">
								<el-button size="small" @click="yesDrugAddDoctorEnjoin(2)" icon="el-icon-check" type="primary">一件添加</el-button>
							</el-form-item>
						</el-form>
					</el-col>
				 </el-row>

          <el-table height="500px" :row-class-name="tableClass"  :data="ssSproList" ref="drugTable2" @selection-change="drugSelectChange" style="width: 100%">
            <el-table-column :selectable='checkboxt' type="selection" width="55" />
            <el-table-column prop="projectName" label="项目名称"> </el-table-column>
            <el-table-column prop="projectPay" label="价格"> </el-table-column>
            <el-table-column prop="projectType" label="项目类型"> </el-table-column>
            <el-table-column prop="projectPosition" label="手术位置"> </el-table-column>
            <el-table-column   label="适应症">
              <template #default="scope">
                <el-popover effect="light" trigger="hover" placement="top" width="420px">
                  <template #default>
                    {{scope.row.projectMatters}}
                  </template>
                  <template #reference>
                    <div  class="name-wrapper fontType">
                      <el-tag  size="small">{{scope.row.projectMatters}}</el-tag>
                    </div>
                  </template>
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column label="手术禁忌">
              <template #default="scope">
                <el-popover effect="light" trigger="hover" placement="top" width="210px">
                  <template #default>
                    {{scope.row.projectTaboo}}
                  </template>
                  <template #reference>
                    <div  class="name-wrapper fontType">
                      <el-tag  size="small">{{scope.row.projectTaboo}}</el-tag>
                    </div>
                  </template>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>

				</el-dialog>
				
				<!-- 病历查看=================================================================================================================================================== -->
				<el-dialog title="过往病理"  @close="closeAddDrugFunction(3)" v-model="bingli" width="50%"  destroy-on-close center>
					 <el-table  size="mini"  :data="sickBlArr" ref="drugTable3"  style="width: 100%" height="380">
						<el-table-column fixed  label="日期" align="center" >
						  <template #default="scope">
							  <i class="el-icon-time"></i>
							  <span>{{ scope.row.chTime }}</span>
						  </template>
						</el-table-column>
						<el-table-column fixed label="病情原因" prop="chCause" align="center"></el-table-column>
						<el-table-column fixed label="处理意见" prop="chDoctorText"  align="center" ></el-table-column>
						<el-table-column fixed label="主治医师" prop="chDoctor" align="center" ></el-table-column>
					 </el-table>
				 
				</el-dialog>

        <!-- 住院申请============================================================================= -->
        <el-dialog title="住院申请" @close="closeAddDrugFunction(4)" v-model="zysqShow" width="50%"  destroy-on-close center>
          <el-row>
            <el-form ref="form" :model="zyInhospitalApply" label-width="80px" >
              <el-col :span="24">
                <el-form-item label="诊断结果：" label-width="100px">
                  <el-input style="width:600px;" v-model="zyInhospitalApply.inDiagnosis"  placeholder="请输入诊断结果"
                            rows="3" type="textarea" size="mini" maxlength="1000"
                            show-word-limit>
                  </el-input>
                </el-form-item>

              </el-col>
              <el-col :span="24">
                <el-form-item label="医生建议：" label-width="100px">
                  <el-input style="width: 600px;" v-model="zyInhospitalApply.inSuggest"  placeholder="请输给出相对的建议"
                            rows="3" type="textarea" size="mini" maxlength="1000"
                            show-word-limit>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="申请科室：" label-width="100px">
                  <el-select @change="ksDzChange" value-key="ksId"  size="small" placeholder="选择" v-model="zyInhospitalApply.ksObj" >
                    <el-option v-for="yf in ksList" :key="yf.ksId" :label="yf.ksName" :value="yf" >
                    </el-option>
                 </el-select>
                  <span style="color:red; margin-left: 20px"> {{ksDzs}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-button size="mini" style="margin-left: 315px" @click="addZy" type="primary">申请住院</el-button>
              </el-col>
            </el-form>
          </el-row>
        </el-dialog>
				
			</el-container>
		</el-container>
	</el-container>
</template>


<script>
  import LeftTable2 from "./opc/LeftTable2.vue";
  import LeftTable3 from "./opc/LeftTable3.vue";
  export default{
    components: {LeftTable3, LeftTable2},
    provide(){
      return {
        funcBlack:this.rightPassBack,
      };
    },
    data(){
			return{
        zhutiKey:"0",//左边表格切换按钮model
        //就诊表  VO 包括了就诊记录的一切集合和对象
        recordVo:{
          medicalRecordObject:{},/*就诊记录表*/
          recipeObject:{},/*处方表*/
          historyObject:{},/*病历表*/
          tjCodeManObject:{},/*检验单表*/
          tjManResultList:[],/*检验中间表集合*/
          surgeryStampObject:{},/*手术单表*/
          centerSurgeryList:[],/*手术集合表*/
        },
        //就诊记录表
        medicalRecordObject:{
          mrNumber:'',
          mrCount:'',
          mrDoctorName:'',
          mrDiagnoseRecord:'',
          mrKsName:'',
          mrIdCard:'',
          mrState:'',
          mrSickType:'',
          mrTotalMoney:'',
          mrMcCard:'',
          sId:0,
          sickNumber:0,
          bnNumber:0,
          mcNumber:0,
        },
        // 病历表
        historyObject:{
          chNumber:0,
          chComplaint:null,
          chHistory:null,
          chFamilyHistory:null,
          chCause:null,
          chDoctorText:null,
          chOe:null,
          chOps:null,
        },
        //处方表
        recipeObject:{
          recipeNumber:0,
          recipeSickName:'',
          recipeDoctorName:'',
          recipeDoctorText:'',
          recipeDrugState:0,
          xpNotes:'',
          zpNotes:'',
          sickNumber:'',
          sId:'',
          recipePrice:0,
          xpList:[],
          zpList:[],
        },
        //检验单表
        tjCodeManObject:{
          manId:0,
          manName:'',
          manSid:'',
          manGender:'',
          manAge:'',
          manPhone:'',
          manPhy:'',
          manBirthtime:'',
          manProposal:'',
        },
        tjManResultList:[],
        //手术
        surgeryStampObject:{
          susNumber:0,
          susSum:0,
          susText:'',
        },
        centerSurgeryList:[],
        //操作人员
        token:[],
        options:[
          { value: '0', label: '小孩' },
          { value: '1', label: '成年人' },
          { value: '2', label: '老人' },
          { value: '3', label: '孕妇' }
        ],
        // 排号表
        leftTopTable:[],
        //就诊记录表查询
        leftRecord:[],
        leftText:'',//呼叫列表搜索内容
        // 头部model属性
        headerInput:{
          bnCount:'',
          mcCard:'',
          bnIdCard:'',
          bnSickName:'',
          bnKsName:'',
          sickSex:'',
          sickAge:'',
          sickPhone:'',
          rtClass:'',
          mrCount:'',
          optionsValue:'',//病人类型 老人还是。。。
          rtNumber:0,
          mcNumber:0,
          sickNumber:0,
          bnNumber:0,
        },
        rulesHeader: {//非空校验
          optionsValue: [{ required: true, message: " ", trigger: 'blur' },],
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
        isShowAddDrug:false,//是否显示添加药品弹框
        selectDrugArr:[],//医生选中数据
        rightTableData1:[],//西药处方
        rightTableData2: [],//中药处方
        rightTableData3:[],/*检验处方列表*/
        rightTableData4:[],/*手术处方表*/
        indexRecord:'0',//切换默认值
        loading:false, // 呼叫的登入加载
        testDuqu:'',//正在呼叫
        //体检======================
        isShowTj:false,//开关选项
        tjList:[],//体检项目集合
        textTj:"",//搜索条件

        //手术======================
        textSpro:'',//手术搜索条件
        ssSproList:[],//手术项目集合
        isShowSs:false,//手术开关选项
        ssClass:[],//手术等级列表
        ssOption:'',//选择对象等级

        //病例====================
        bingli:false,//病历开关
        sickBlArr:[],
        //转住院======================
        /*住院集合表*/
        zyInhospitalApply:{
          inDiagnosis:'',
          inSuggest:'',
          sickNumber:'',
          ksName:'',
          ksId:'',//科室id
          inProposer:'',//医生名字
          sId:'',//医生外键
          mrNumber:0,
          ksObj:{}
        },
        rtNumberZy:0,
        zysqShow:false,/*弹窗*/
        ksList:[],/*科室信息*/
        ksDzs:'',
        vals:null,

			}
		},
		methods: {
      //右边点击事件
      rightPassBack(val){
        this.$confirm("是否读取病\t”"+val.medicalRecordObject.opcObject.bnSickName+"”\t人信息？").then(_ =>{
          this.leftChuanZhi(val);
        }).catch(_ => {});
      },
      //就诊列表双击选中，回传值
      leftChuanZhi(val){
        this.resultVo();
        this.headerInput={
          bnNumber: val.medicalRecordObject.opcObject.bnNumber,
          bnCount: val.medicalRecordObject.opcObject.bnCount,
          mcCard:val.medicalRecordObject.mrMcCard,
          bnIdCard:val.medicalRecordObject.opcObject.bnIdCard,
          bnSickName:val.medicalRecordObject.opcObject.bnSickName,
          bnKsName:val.medicalRecordObject.opcObject.bnKsName,
          sickSex:val.medicalRecordObject.sickObject.sickSex,
          sickAge:val.medicalRecordObject.sickObject.sickAge,
          sickPhone:val.medicalRecordObject.sickObject.sickPhone,
          sickNumber:val.medicalRecordObject.sickObject.sickNumber,
          rtClass:val.medicalRecordObject.opcObject.rtClass,
          mrCount:val.medicalRecordObject.mrCount,
          optionsValue:val.medicalRecordObject.mrSickType,//病人类型 老人还是。。。
          rtNumber:val.medicalRecordObject.opcObject.rtNumber,
          mcNumber: val.medicalRecordObject.mcNumber
        }
        //就诊记录表
        this.medicalRecordObject=val.medicalRecordObject;
        this.historyObject = val.historyObject;/*病历集合*/
        console.log(this.historyObject)
        this.recipeObject = val.recipeObject;/*处方集合*/
        if(val.tjCodeManObject!=null){//判断空值对象
          this.tjCodeManObject = val.tjCodeManObject;/*体检对象*/
        }
        this.tjManResultList=val.tjManResultList;/*体检集合*/
        this.surgeryStampObject=val.surgeryStampObject/*手术对象*/
        this.centerSurgeryList=val.centerSurgeryList;/*手术集合*/
        if(this.recipeObject.xpNotes == null){
          this.recipeObject.xpNotes="";
        }
        if(this.recipeObject.zpNotes ==null){
          this.recipeObject.zpNotes="";
        }
        if(this.tjCodeManObject.manProposal==null){
          this.tjCodeManObject.manProposal="";
        }
        if(this.surgeryStampObject.susText==null){
          this.surgeryStampObject.susText="";
        }
        /*在返回去添加到原先选中的集合中*/
        //西药处方回流
        if(this.recipeObject.zpList.length>0 && this.recipeObject.zpList[0].zpNumber != 0){
          this.recipeObject.zpList.forEach((drug,i)=>{
            drug.zpObject={
              zpName:drug.zpName,
              zpSpecification:drug.zpSpecification,
              zpCount:drug.zpCount,
              zpUsage:drug.zpUsage,
              zpPrice:drug.zpPrice,
              zpEntrust:drug.zpEntrust,
              drugId:drug.drugId,
              zpNumber:drug.zpNumber,
              recipeNumber:drug.recipeNumber,
              zpStatePrice:drug.zpStatePrice,
            },
            this.rightTableData2.push(drug);
          })
        }
        // 中药处方回流
        if(this.recipeObject.xpList.length>0 && this.recipeObject.xpList[0].rdNumber != 0){
          this.recipeObject.xpList.forEach((drug,i)=>{
            drug.xpObject={//格外在添加个对象进去
              rdNumber:drug.rdNumber,
              rdName:drug.rdName,
              rdFyjl:drug.rdDrugSpecification,
              rdDw:drug.rdSpecSpecification,
              rdCount:drug.rdCount,
              rdPrice:drug.rdPrice,
              rdEntrust:drug.rdEntrust,
              drugId:drug.drugId,
              rdNumber:drug.rdNumber,
              rdStatePrice:drug.rdStatePrice,
              recipeNumber:drug.recipeNumber,
            }
            this.rightTableData1.push(drug);
          })
        }
        //对体检的回流
        if(this.tjManResultList.length>0 && this.tjManResultList[0].manResultId !=0){
          let tjText = ''//体检结果拼接
          this.tjManResultList.forEach((drug,i)=>{
            drug.pro={
              checkId:drug.pro.checkId,
              checkName:drug.pro.checkName,
              checkPay:drug.pro.checkPay,
              indexSignificance:drug.pro.indexSignificance,
              manResult:drug.manResult,
              manPayState:drug.manPayState,
              manProposal:drug.manPayState,
              manResultId:drug.manResultId,
              manId:drug.manId,
            }
            tjText+=drug.manResult+'\n';
            this.rightTableData3.push(drug);
          })
          //对病例的体检结果回显
          this.historyObject.chOe=tjText;

        }
        //对手术的回流
        if(this.centerSurgeryList.length>0 && this.centerSurgeryList[0].susId !=0){
          let tjSs = ''//体检结果拼接
          this.centerSurgeryList.forEach((drug,i)=>{
            drug.ssObject={
              projectName:drug.ssObject.projectName,
              projectPay:drug.ssObject.projectPay,
              projectType:drug.ssObject.projectType,
              projectPosition:drug.ssObject.projectPosition,
              projectId:drug.projectId,
              susDoctorText:drug.susDoctorText,
              susMessage:drug.susMessage,
              susPayState:drug.susPayState,
              susNumber:drug.susNumber,
              susId:drug.susId,
            }
            tjSs+=drug.susDoctorText+'\n';
            this.rightTableData4.push(drug);
          });
          this.historyObject.chOps=tjSs;
        }
      },
		  // 加入后台部分-------------------------------------------------------------------
      //查询就诊记录表，已经完成就诊的
      selectRecord(){
        this.axios.post("selectRA",{index:this.indexRecord,texts:this.leftText}).then((v)=>{
          this.leftRecord = v.data;
        }).catch();
      },
      //子组件传值过来。对处方的意见建议，等值接收到vo去
      getTest1(data){
        this.recipeObject.xpNotes = data
      },
      getTest2(data){
        this.recipeObject.zpNotes = data
      },
      getTest3(data){
        this.tjCodeManObject.manProposal= data
      },
      getTest4(data){
        this.surgeryStampObject.susText = data
      },
      getLeft(data){
        this.leftText = data
      },
      //结束就诊---------------------结束就诊
      overDoctor(headerInput) {
        if(this.headerInput.bnSickName!=''){
          this.$refs[headerInput].validate((valid)=>{
            if(valid){
              this.$confirm('是否结束就诊？').then(_ => {
                //判断医生是否做了病历检验
                if(this.historyObject.chComplaint!=''){

                  this.addRecipeObject(2);
                  this.axios.post('addRecord',this.recordVo).then((v)=>{
                    if(v.data=='ok'){
                      this.$message({
                        showClose: true,
                        type: 'success',
                        message: '就诊完成，'+this.headerInput.bnSickName+'的病人信息您可从就诊记录中查询~'
                      });
                      this.countLeftTopTable();//刷新排号界面
                      this.resultVo()//重置所有面板属性
                    }
                  }).catch(()=>{})
                }else{
                  this.$message({
                    showClose: true,
                    type: 'error',
                    message: '病人病历未填写~',
                  });
                }

              }).catch(_ => {});
            }else{
              this.$message({
                showClose: true,
                type: 'error',
                message: '请选择病人类型~'
              });
            }
          });
        }else{
          this.$message({
            showClose: true,
            type: 'error',
            message: '请先呼叫病人~'
          });
        }
      },
      //保存就诊记录------------------保存就诊记录
      saveDoctor(headerInput) {
        if(this.headerInput.bnSickName!=''){
          this.$refs[headerInput].validate((valid)=>{
            if(valid){
             // 保存提示
              const loading = this.$loading({ lock: true, text: 'Loading', spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)' });
              //延迟界面
              setTimeout(() => { loading.close(); }, 1000);
              this.$confirm('是否保存就诊？').then(_ => {
                //判断医生是否做了病历检验
                  this.addRecipeObject(1);
                  console.log("添加完后的西药集合"+this.recordVo.recipeObject.xpList)
                this.axios.post('addRecord',this.recordVo).then((v)=>{
                    if(v.data=='ok'){
                      this.$message({
                        showClose: true,
                        type: 'success',
                        message: '就诊完成，'+this.headerInput.bnSickName+'的病人信息您可从就诊记录中查询~'
                      });
                      this.countLeftTopTable();//刷新排号界面
                      this.resultVo()//重置所有面板属性
                    }
                  }).catch(()=>{})


              }).catch(_ => {});
            }else{
              this.$message({
                showClose: true,
                type: 'error',
                message: '请选择病人类型~'
              });
            }
          });
        }else{
          this.$message({
            showClose: true,
            type: 'error',
            message: '请先呼叫病人~'
          });
        }
      },
      // 呼叫列表
      call(){
        if(this.headerInput.mcCard==''){
          this.$confirm('您确定读取下一条数吗？').then(suc => {
            this.loading=true
            this.testDuqu='正在呼叫'+this.leftTopTable[0].bnCount+'号'+this.leftTopTable[0].bnSickName+'~'
          }).catch(err => { this.loading=false })
        }else {
          this.$alert('您当前正在执行【' + this.headerInput.bnSickName + '】 的问诊操作！请保存或结束就诊后在进行下一位操作', {
            distinguishCancelAndClose: true,
            showClose: false,
            closeOnClickModal: false,
            confirmButtonText: '确定',
            type: 'warning',
            callback: action => {
            }
          });
        }

      },
      jumpMark(){ //跳号
        if( this.loading == true){
          this.axios.post('jumpMark',this.leftTopTable[0]).then((v)=>{
            console.log(v.data)
            if(v.data=='ok'){
              this.$confirm('当前正在执行【' + this.leftTopTable[0].bnSickName + '】 的跳号操作！如果跳号将把该病人的问诊排号数据移除到最后一位！  ', '确认信息', {
                distinguishCancelAndClose: true,
                showClose:false,
                closeOnClickModal:false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  showClose: true,
                  type: 'success',
                  message: '跳号成功!'
                });
                this.loading=false;
                this.countLeftTopTable(); //查询单个科室今天挂号的总数
                this.resultLeftTopTable();//重置中药和西药和头部的对象和集合
              }).catch(() => {
                this.$message({
                  showClose: true,
                  type: 'info',
                  message: '已取消跳号'
                });
              });
            }
          }).catch(()=>{ })
        }else{
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请呼叫病人在进行跳号~'
          });
        }
      },
      //接诊
      jieZheng(){
        if(this.loading==true){
          this.axios.post('upRtNumber',{rtNumber:this.leftTopTable[0].rtNumber}).then((v)=>{
          }).catch(()=>{ })
            return setTimeout(()=>{
              this.headerInput.rtNumber = this.leftTopTable[0].rtNumber;
              this.headerInput.sickNumber=this.leftTopTable[0].rtRegObject.sickNumber;
              this.headerInput.bnCount = this.leftTopTable[0].bnCount
              this.headerInput.mcCard = this.leftTopTable[0].rtRegObject.cardObject.mcCard
              this.headerInput.rtClass = this.leftTopTable[0].rtRegObject.rtClass
              this.headerInput.sickPhone = this.leftTopTable[0].rtRegObject.cardObject.mzSick.sickPhone
              this.headerInput.sickAge = this.leftTopTable[0].rtRegObject.cardObject.mzSick.sickAge
              this.headerInput.bnSickName = this.leftTopTable[0].bnSickName
              this.headerInput.sickSex = this.leftTopTable[0].rtRegObject.cardObject.mzSick.sickSex
              this.headerInput.bnIdCard = this.leftTopTable[0].bnIdCard
              this.headerInput.bnKsName = this.leftTopTable[0].bnKsName;
              this.headerInput.bnNumber = this.leftTopTable[0].bnNumber;
              this.headerInput.mcNumber = this.leftTopTable[0].rtRegObject.cardObject.mcNumber;
              var number = this.formatDate(this.leftTopTable[0].bnTime,'yyyyMMddhhmm').toString()
                  +this.token.ksId.toString()+this.token.tid.toString()+this.headerInput.bnCount.toString()
              this.headerInput.mrCount = number;
              this.loading=false;
              return 'success';
            },500)
        }else {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请呼叫病人在进行接诊~'
          });
        }
      },
      //查询单个科室今天挂号的总数
      countLeftTopTable(){
        this.axios.post('allMzOpcNumber',{ksName:this.token.ksId,science:this.token.tid}).then((v)=>{
          this.leftTopTable=v.data
        }).catch(()=>{ })
        this.selectRecord();
      },
      //重置中药和西药和头部的对象和集合
      resultLeftTopTable(){
        this.rightTableData1=[];
        this.rightTableData2=[];
        this.headerInput={
          bnCount:'',
          mcCard:'',
          bnIdCard:'',
          bnSickName:'',
          sickSex:'',
          sickAge:'',
          sickPhone:'',
          rtClass:'',
          mrCount:'',
          optionsValue:'',//病人类型 老人还是。。。
        };
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

        this.axios.post('all-drca').then((v) => {
          this.searchYfDrcaNameArr = v.data;
          this.drugSearchFunction();//调用搜索药品方法
        }).catch();

        this.axios.post('ssType').then((v) => {
          this.ssClass = v.data;
        }).catch();
        //搜索检验项目
        this.ccooTjpro();
        //搜索手术项目
        this.allDescSpro();
        //转住院科室查询
        this.axios({url:'selectKs',params:{index:1}}).then((v) => {
          this.ksList = v.data;
        }).catch();
      },
      //搜索药品方法=================药药药药药药药药药药药药药药
      drugSearchFunction(){
        this.axios.post('select-drug-drugName',this.drugSearch).then((v)=>{
          this.drugArr = v.data;
        }).catch();
      },
      //搜索检验项目=================检验检验检验检验检验检验检验
      ccooTjpro(){
        this.axios.get('allDescTjpros',{params:{seach:this.textTj} }).then((v) => {
          this.tjList = v.data;
        }).catch();
      },
      //搜索项目手术================手术手术手术手术手术手术手术
      allDescSpro(){
        this.axios.post('mzAllDescSpro',{projectName:this.textSpro,projectType:this.ssOption}).then((v) => {
          this.ssSproList = v.data;
        }).catch();
      },
      //手术选择权限
      checkboxt(row){
        if(row.projectType=="一级手术" || row.projectType=="二级手术"){
          return true;
        }else{
          return false;
        }
      },
      //表格样式判断禁用
      tableClass({row, rowIndex}){
        if(row.projectType != "一级手术" && row.projectType != "二级手术"){
          return 'tyzz';
        }
      },
      //添加住院================住院住院住院住院住院住院住院
      addZy(){
        alert(this.medicalRecordObject.mrNumber)
        this.axios.post('addInHospita',{inhospitalApply:this.zyInhospitalApply,rtNumber:this.rtNumberZy,mrNumber:this.medicalRecordObject.mrNumber}).then((v)=>{
          if(v.data=='ok'){
            this.$message({
              showClose: true,
              type: 'success',
              message: '转院成功~'
            });
            this.closeAddDrugFunction(4);
            this.resultVo();
            this.countLeftTopTable()//刷新排号
          }
        }).catch();
      },
      //选项卡对象属性确定后change改变事件赋值
      ksDzChange(){
        if(this.zyInhospitalApply.ksObj != null){
          this.zyInhospitalApply.ksId=this.zyInhospitalApply.ksObj.ksId//科室id
          this.zyInhospitalApply.ksName=this.zyInhospitalApply.ksObj.ksName;
          this.ksDzs =this.zyInhospitalApply.ksObj.ksDz
        }
z
      },
      //关闭药品弹框时候调用（以及和关闭掉其他检验项目时的操作）
      closeAddDrugFunction(index){
        if(index==0){//药品
          this.$refs.drugTable.clearSelection();
          this.isShowAddDrug = false;
        }else if(index==1){// 体检
          this.$refs.drugTable1.clearSelection();
          this.isShowTj = false;
        }else if(index==2){// 手术
          this.$refs.drugTable2.clearSelection();
          this.isShowSs = false;
        }else if(index==3){//病例
          this.$refs.drugTable3.clearSelection();
          this.bingli=false;
        }else if(index==4){ //转住院
          this.zyInhospitalApply={
            inDiagnosis:'',
            inSuggest:'',
            sickNumber:'',
            ksName:'',
            ksId:'',//科室id
            inProposer:'',//医生名字
            sId:'',//医生外键
            ksObj:{}
          }
          this.ksDzs="";
          this.zysqShow = false;
        }
      },
      //药品选中调用方法
      drugSelectChange(obj){
        this.selectDrugArr = obj;
      },
      //打开添加药品方法
      openAddDrug(index){
        if(this.headerInput.sickSex == ''){
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请选择病人'
          });
          return;
        }else{
          if(index==0){
            this.isShowAddDrug = true;//药品
          }else if(index ==1){
            this.isShowTj = true;//检验
          }else if(index==2){
            this.isShowSs = true;//手术
          }else if(index==3){//病例
            this.axios({url:'selectBl',params:{index:this.headerInput.sickNumber}}).then((v)=>{
              this.sickBlArr = v.data;
              console.log(this.sickBlArr)
            }).catch();
            this.bingli=true;
          }else if(index==4){//转住院
            this.rtNumberZy =this.headerInput.rtNumber;
            this.zyInhospitalApply.sickNumber=this.headerInput.sickNumber;
            this.zyInhospitalApply.inProposer=this.token.sname;//医生名字
            this.zyInhospitalApply.sId=this.token.sid;//医生外键
            this.zyInhospitalApply.mrNumber=this.medicalRecordObject.sickNumber;
            this.zysqShow=true;
            console.log(this.rtNumberZy)
          }

        }
      },
      //添加vo类
      addRecipeObject(index){
        //就诊记录表(保存就进)***************************************************************
          if(this.medicalRecordObject.mrNumber != 0){
            var sum1 = 0;//西药总价钱
            this.rightTableData1.forEach((drug,i)=>{//循环判断总价钱
              sum1 += (drug.xpObject.rdPrice*drug.xpObject.rdCount);
            })
            var sum2 = 0;//中药总价钱
            this.rightTableData2.forEach((drug,i)=>{//循环判断总价钱
              sum2 += (drug.zpObject.zpCount*drug.zpObject.zpPrice);
            })
            var sum3 = 0;//体检总价钱
            this.rightTableData3.forEach((drug,i)=>{//循环判断总价钱
              sum3 += drug.pro.checkPay;
            })
            var sum4 = 0;//手术总价钱
            this.rightTableData4.forEach((drug,i)=>{//循环判断总价钱
              sum4 += drug.ssObject.projectPay;
            })
            this.medicalRecordObject.mrState=index;//结束就诊就把状态改成1进入就诊记录表2是就诊已经完成
            this.medicalRecordObject.mrTotalMoney = sum1+sum2+sum3+sum4;//这里还得加上其他检验的钱
            this.medicalRecordObject.mrDiagnoseRecord=this.historyObject.chDoctorText;//结果后面在获取
            this.recordVo.medicalRecordObject=this.medicalRecordObject;
            console.log(this.medicalRecordObject)
            //处方表添加)***************************************************************
            this.recipeObject.recipePrice = sum1+sum2;
            if(this.rightTableData1.length>0 || this.rightTableData2.length>0){
              // 添加西药处方集合
              if(this.rightTableData1.length>0){
                if(this.recipeObject.xpList.length>0 || this.recipeObject.xpList[0].rdNumber==0){
                  this.recipeObject.xpList=[]
                }
                //清空好添加
                this.rightTableData1.forEach((drug,i)=>{
                  //判断是否皮试
                  this.recipeObject.xpList.push(drug.xpObject);
                })
                console.log(this.recipeObject.xpList)
              }
              //中药处方
              if(this.rightTableData2.length>0){
                if(this.recipeObject.zpList.length>0 || this.recipeObject.xpList[0].zpNumber==0){
                  this.recipeObject.zpList=[]
                }
                //清空好添加
                this.rightTableData2.forEach((drug,i)=>{
                  this.recipeObject.zpList.push(drug.zpObject)
                })
                console.log(this.recipeObject.zpList)
              }
              this.recordVo.recipeObject=this.recipeObject;//新增到处方表vo
            }
            console.log(this.recipeObject)
            this.recordVo.tjCodeManObject=this.tjCodeManObject;
            //检验添加)***************************************************************
            this.tjCodeManObject.manPhy=sum3;
            this.recordVo.tjCodeManObject=this.tjCodeManObject;//新增到处方表vo
            if(this.rightTableData3.length>0){
              //如果集合不为空就归零集合
              if(this.tjManResultList.length>0 || this.tjManResultList[0].manResultId==0){
                this.tjManResultList=[];
              }
              //添加检验集合表
              this.rightTableData3.forEach((drug,i)=>{
                this.tjManResultList.push(drug.pro)
              })
              this.recordVo.tjManResultList = this.tjManResultList;//新增到处方表vo
              console.log(this.tjManResultList)
            }
            console.log(this.tjCodeManObject)
            //手术添加)***************************************************************
            this.surgeryStampObject.susSum=sum4;
            this.recordVo.surgeryStampObject=this.surgeryStampObject;
            if(this.rightTableData4.length>0){
              if(this.centerSurgeryList.length>0 || this.centerSurgeryList[0].susId ==0){
                this.centerSurgeryList=[]
              }
              //添加手术集合表
              this.rightTableData4.forEach((drug,i)=>{
                this.centerSurgeryList.push(drug.ssObject)
              })
              console.log(this.centerSurgeryList)
              this.recordVo.centerSurgeryList=this.centerSurgeryList;
              console.log(this.recordVo.centerSurgeryList)
            }
            console.log((this.surgeryStampObject))
            console.log(this.historyObject)
            this.recordVo.historyObject=this.historyObject;//新增到病历表vo
          }else{
            this.medicalRecordObject.mrCount=this.headerInput.mrCount;
            this.medicalRecordObject.mrDoctorName=this.token.sname;
            this.medicalRecordObject.mrDiagnoseRecord=this.historyObject.chDoctorText;//结果后面在获取
            this.medicalRecordObject.mrKsName=this.headerInput.bnKsName;
            this.medicalRecordObject.mrIdCard=this.headerInput.bnIdCard;
            this.medicalRecordObject.mrState=index;//结束就诊就把状态改成1进入就诊记录表2是就诊已经完成
            this.medicalRecordObject.sId=this.token.sid;
            this.medicalRecordObject.mrSickType = this.headerInput.optionsValue;
            var sum1 = 0;//西药总价钱
            this.rightTableData1.forEach((drug,i)=>{//循环判断总价钱
              sum1 += (drug.xpObject.rdPrice*drug.xpObject.rdCount);
            })
            var sum2 = 0;//中药总价钱
            this.rightTableData2.forEach((drug,i)=>{//循环判断总价钱
              sum2 += (drug.zpObject.zpCount*drug.zpObject.zpPrice);
            })
            var sum3 = 0;//体检总价钱
            this.rightTableData3.forEach((drug,i)=>{//循环判断总价钱
              sum3 += drug.pro.checkPay;
            })
            var sum4 = 0;//手术总价钱
            this.rightTableData4.forEach((drug,i)=>{//循环判断总价钱
              sum4 += drug.ssObject.projectPay;
            })
            this.medicalRecordObject.mrTotalMoney = sum1+sum2+sum3+sum4;//这里还得加上其他检验的钱
            this.medicalRecordObject.sickNumber=this.headerInput.sickNumber;
            this.medicalRecordObject.bnNumber=this.headerInput.bnNumber;
            this.medicalRecordObject.mrMcCard=this.headerInput.mcCard;
            this.medicalRecordObject.mcNumber=this.headerInput.mcNumber;
            //新增到就诊记录表vo
            this.recordVo.medicalRecordObject=this.medicalRecordObject;
            //处方表添加)***************************************************************
            this.recipeObject.recipeSickName=this.headerInput.bnSickName;
            this.recipeObject.recipeDoctorName=this.token.sname;
            this.recipeObject.recipeDoctorText=null;
            this.recipeObject.sickNumber=this.headerInput.sickNumber;
            this.recipeObject.sId=this.token.sid;
            this.recipeObject.recipeDrugState=0;
            this.recipeObject.recipePrice = sum1+sum2;
            if(this.rightTableData1.length>0 || this.rightTableData2.length>0){
              // 添加西药处方集合
              if(this.rightTableData1.length>0){
                this.rightTableData1.forEach((drug,i)=>{
                  this.recipeObject.xpList.push(drug.xpObject);
                })
              }
              //中药处方
              if(this.rightTableData2.length>0){
                this.rightTableData2.forEach((drug,i)=>{
                  this.recipeObject.zpList.push(drug.zpObject)
                })
              }
            }
            this.recordVo.recipeObject=this.recipeObject;//新增到处方表vo
            console.log(this.recipeObject.xpList)
            console.log(this.recipeObject.zpList)
            //检验添加)***************************************************************
            this.tjCodeManObject.manAge=this.headerInput.sickAge;
            this.tjCodeManObject.manName=this.headerInput.bnSickName;
            this.tjCodeManObject.manPhone=this.headerInput.sickPhone;
            this.tjCodeManObject.manGender=this.headerInput.sickSex;
            this.tjCodeManObject.manSid=this.headerInput.bnIdCard;
            this.tjCodeManObject.manBirthtime=this.getInfo(this.headerInput.bnIdCard).birth;
            this.tjCodeManObject.manPhy=sum3;
            this.recordVo.tjCodeManObject=this.tjCodeManObject;//新增到处方表vo
            if(this.rightTableData3.length>0){
              //添加检验集合表
              this.rightTableData3.forEach((drug,i)=>{
                drug.tjList={
                  checkId:drug.checkId,
                }
                this.tjManResultList.push(drug.tjList)
              })
              this.recordVo.tjManResultList = this.tjManResultList;//新增到处方表vo
            }
            //手术添加)***************************************************************
            this.surgeryStampObject.susSum=sum4;
            this.recordVo.surgeryStampObject=this.surgeryStampObject;
            if(this.rightTableData4.length>0){
              //添加手术集合表
              this.rightTableData4.forEach((drug,i)=>{
                drug.ssList={
                  projectId:drug.projectId,
                  susMessage:drug.ssObject.susDoctorText,
                }
                this.centerSurgeryList.push(drug.ssList)
              })
              this.recordVo.centerSurgeryList=this.centerSurgeryList;
            }
            this.recordVo.historyObject=this.historyObject;//新增到病历表vo
          }
      },
      //结束就诊重置
      resultVo(){
        // 头部信息栏
        this.headerInput={
          bnCount:'',
          mcCard:'',
          bnIdCard:'',
          bnSickName:'',
          bnKsName:'',
          sickSex:'',
          sickAge:'',
          sickPhone:'',
          rtClass:'',
          mrCount:'',
          optionsValue:'',//病人类型 老人还是。。。
          rtNumber:0,
          mcNumber:0,
          sickNumber:0,
          bnNumber:0,
        };
        // 就诊记录VO
        this.recordVo={
          medicalRecordObject:{},/*就诊记录表*/
          recipeObject:{},/*处方表*/
          historyObject:{},/*病历表*/
          tjCodeManObject:{},/*检验单表*/
          tjManResultList:[],/*检验中间表集合*/
          surgeryStampObject:{},/*手术单表*/
          centerSurgeryList:[],/*手术集合表*/
        };
        //就诊记录表对象
        this.medicalRecordObject={
          mrNumber:'',
          mrCount:'',
          mrDoctorName:'',
          mrDiagnoseRecord:'',
          mrKsName:'',
          mrIdCard:'',
          mrState:'',
          mrSickType:'',
          mrTotalMoney:'',
          mrMcCard:'',
          sId:0,
          sickNumber:0,
          bnNumber:0,
          mcNumber:0,
        };
        //处方表对象
        this.recipeObject={
          recipeNumber:0,
          recipeSickName:'',
          recipeDoctorName:'',
          recipeDoctorText:'',
          recipeDrugState:0,
          xpNotes:'',
          zpNotes:'',
          sickNumber:'',
          sId:'',
          recipePrice:0,
          xpList:[],
          zpList:[],
        };
        //病历表对象
        this.historyObject={
          chNumber:0,
          chComplaint:null,
          chHistory:null,
          chFamilyHistory:null,
          chCause:null,
          chDoctorText:null,
          chOe:null,
          chOps:null,
        };
        // 检验对象
        this.tjCodeManObject={
          manId:0,
          manName:'',
          manSid:'',
          manGender:'',
          manAge:'',
          manPhone:'',
          manPhy:'',
          manBirthtime:'',
          manProposal:'',
        };
        //手术
        this.surgeryStampObject={
          susNumber:0,
          susSum:0,
          susText:'',
        },
        // 检验集合
        this.tjManResultList=[];
        //手术 集合
        this.centerSurgeryList=[];
        // 表集合
        this.rightTableData1=[];
        this.rightTableData2=[];
        this.rightTableData3=[];
        this.rightTableData4=[];
      },
      //确定将选中的药品放入到对应的表格中，0处方1检验2手术
      yesDrugAddDoctorEnjoin(index){
        if(this.selectDrugArr.length == 0){
          this.$message({
            showClose: true,
            type: 'warning',
            message: '未选中药品！'
          });
        }
        let is = false;/*终止添加，的判断属性*/

        for (let drug of this.selectDrugArr){
            if(index==0){ /*对处方药品的添加去重和提示*/
              this.rightTableData1.forEach((list,i)=>{
                if(drug.drugName==list.xpObject.rdName && list.xpObject.rdStatePrice==0){
                  is = true;
                  this.$message({
                    showClose: true,
                    type: 'warning',
                    message: "药品“\t"+list.xpObject.rdName+"\t“已存在！"
                  });
                  return;
                }else if(drug.drugName==list.xpObject.rdName && list.xpObject.rdStatePrice!=0){
                  this.$notify({
                    title: '注意',
                    message: "药品“\t"+list.xpObject.rdName+"\t“已存在！ 并且已经完成缴费~",
                    type: 'warning',
                    position: 'top-left',
                  })
                }

              });
              this.rightTableData2.forEach((list,i)=>{
                if(drug.drugName==list.zpObject.zpName && list.zpObject.zpStatePrice==0){
                  is = true;
                  this.$message({
                    showClose: true,
                    type: 'warning',
                    message: "药品“\t"+list.zpObject.zpName+"\t“已存在！"
                  });
                  return ;
                }else if(drug.drugName==list.zpObject.zpName && list.zpObject.zpStatePrice!=0){
                  this.$notify({
                    title: '注意',
                    message: "药品“\t"+list.zpObject.zpName+"\t“已存在！ 并且已经完成缴费~",
                    type: 'warning',
                    position: 'top-left',
                  })
                }

              });
            }else if(index == 1){/*对检验的添加去重和提示*/
              this.rightTableData3.forEach((list,i)=>{
                if(drug.checkId==list.pro.checkId && list.pro.manPayState == 0){
                  is = true;
                  this.$message({
                    showClose: true,
                    type: 'warning',
                    message: "项目“\t"+list.pro.checkName+"\t”已存在列表中！"
                  });
                  return;
                }else if(drug.checkId==list.pro.checkId && list.pro.manPayState !=0){
                  this.$notify({
                    title: '注意',
                    message: "检验项目“\t"+list.pro.checkName+"\t”已存在列表中！ 并且已经完成缴费~",
                    type: 'warning',
                    position: 'top-left',
                  })
                }
              });
            }else if(index == 2){/*对手术的添加去重和提示*/
              this.rightTableData4.forEach((list,i)=>{
                if(drug.projectId==list.ssObject.projectId && list.ssObject.susPayState == 0){
                  is = true;
                  this.$message({
                    showClose: true,
                    type: 'warning',
                    message: "手术项目“\t"+list.ssObject.projectName+"\t”已存在列表中！ 并且已经完成缴费~",
                  });
                  return;
                }else if(drug.projectId==list.ssObject.projectId && list.ssObject.susPayState !=0 ){
                  this.$notify({
                    title: '注意',
                    message: "手术项目“\t"+list.ssObject.projectName+"\t”已存在列表中！ 并且已经完成缴费~",
                    type: 'warning',
                    position: 'top-left',
                  })
                }
              });
            }
            //当条件满足终止循环
            if(is){
              return false;
            }

            if(index==0){/*对处方药品的添加*/
              if(drug.yfDrcaName=="中药"){
                drug.zpObject={
                  zpName:drug.drugName,
                  zpSpecification:drug.specSpecification,
                  zpCount:1,
                  zpUsage:drug.drugRemark,
                  zpPrice:drug.drugPrice,
                  zpEntrust:'',
                  zpStatePrice:0,
                  drugId:drug.drugId,
                },
                this.zhutiKey="1";
                this.rightTableData2.push(drug);
              }else{
                drug.xpObject={//格外在添加个对象进去
                  rdName:drug.drugName,
                  rdFyjl:drug.drugSpecification,
                  rdDw:drug.specSpecification,
                  rdCount:1,
                  rdPrice:drug.drugPrice,
                  rdEntrust:'',
                  rdStatePrice:0,
                  drugId:drug.drugId,
                }
                this.zhutiKey="0";
                this.rightTableData1.push(drug);
              }

            }else if(index == 1){/*对检验的添加*/
              drug.pro={
                checkId:drug.checkId,
                checkName:drug.checkName,
                checkPay:drug.checkPay,
                indexSignificance:drug.indexSignificance,
                manResult:'',
                manPayState:0,
              }
              this.zhutiKey="2";
              this.rightTableData3.push(drug);
            }else if(index == 2){/*对手术的添加*/
              drug.ssObject={
                projectName:drug.projectName,
                projectPay:drug.projectPay,
                projectType:drug.projectType,
                projectPosition:drug.projectPosition,
                projectId:drug.projectId,
                susDoctorText:'',
                susMessage:'',
                susPayState:0,
              }
              this.zhutiKey="3";
              this.rightTableData4.push(drug);
            }

        }
        this.closeAddDrugFunction(index);/*关闭药品弹框时候调用（根据index值来关闭相对应的集合属性）*/
      },

      //没有加入后台的部分-----------------------------------------------------------------------
			  filterTag(value, row) {/* 复诊初诊标签方法 */
				  return row.rtRegObject.rtClass === value;
			  },
        pushUrl(path){/* 页面跳转 */
          this.$confirm('是否返回主页？').then(_ => {
            this.$router.push(path);
          }).catch(_ => {});
        },
      //时间格式化
      formatDate (thistime, fmt) {
        let $this = new Date(thistime)
        let o = {
          'M+': $this.getMonth() + 1,
          'd+': $this.getDate(),
          'h+': $this.getHours(),
          'm+': $this.getMinutes(),
          's+': $this.getSeconds(),
          'q+': Math.floor(($this.getMonth() + 3) / 3),
          'S': $this.getMilliseconds()
        }
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, ($this.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt;
      },
      //身份证日期获取
      getInfo(idCard) {
        let sex = null;
        let birth = null;
        let age = null;

        let myDate = new Date();
        let month = myDate.getMonth() + 1;
        let day = myDate.getDate();

        if(idCard.length===18){
          age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
          sex = idCard.substring(16,17);
          birth = idCard.substring(6,10)+"-"+idCard.substring(10,12)+"-"+idCard.substring(12,14);
          if (idCard.substring(10, 12) < month || idCard.substring(10, 12) === month && idCard.substring(12, 14) <= day) age++;

        }
        if(idCard.length===15){
          age = myDate.getFullYear() - idCard.substring(6, 8) - 1901;
          sex = idCard.substring(13,14);
          birth = "19"+idCard.substring(6,8)+"-"+idCard.substring(8,10)+"-"+idCard.substring(10,12);
          if (idCard.substring(8, 10) < month || idCard.substring(8, 10) === month && idCard.substring(10, 12) <= day) age++;
        }

        if(sex%2 === 0)
          sex = '女';  // 性别代码 1代表男，0代表女，暂时不涉及其他类型性别
        else
          sex = '男';

        return  {age , sex, birth}
      },
		},
		created() {
      this.token= this.$store.state.token == null ? null : this.$store.state.token.list;//将登录存入的值在取出来
      this.operationInit()
    },
    // watch: {
    //   leftTopTable() {
    //     this.timer()
    //   }
    // },
    // destroyed() {
    //   clearTimeout(this.timer)
    // },

	}
</script>

<style scoped>
  /*/deep/ .el-table__body tr.current-row>td{*/
  /*  background-color: #8BD3FF!important;*/
  /*  color: white;*/
  /*  !* color: #f19944; *!  !* 设置文字颜色，可以选择不设置 *!*/
  /*}*/
   /deep/.el-tabs--border-card>.el-tabs__content{
     padding: 0px;
   }
   .te /deep/ .el-input__inner {
     color: red;
     font-size: 13px;
     cursor: pointer;
   }
  /deep/ .el-table .success {
    background: #42B8FF;
    color: white;
  }
  /* !*去掉鼠标悬浮效果*!*/
   >>> .el-table tbody tr:hover > td {
     background-color: transparent !important
  }
  .fontType{
    width: 100%;   /*一定要设置宽度，或者元素内含的百分比*/
    overflow:hidden; /*溢出的部分隐藏*/
    white-space: nowrap; /*文本不换行*/
    text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
  }
  /deep/ .el-table .tyzz {
    /*background: #FF9C9C;*/
    color: #FF4545;
  }
</style>
