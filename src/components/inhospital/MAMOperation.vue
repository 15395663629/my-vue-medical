<template>
  <el-container style="height: 100%;">
    <el-header height="30px"  style="line-height: 30px; background-color: #B3C0D1;color: #333;">
      <!-- <newDateOPC style="margin: 0px; padding: 0px;"></newDateOPC> -->

    </el-header>
    <el-container style="height: 100%;">

      <el-aside width="350px" style="background-color: #E7ECF1;color: #333;"> <!-- 右边 -->

        <el-row style="height: 120px;background-color: #D3DCE6;">
          <el-col :offset="10" :span="4">
              徐医生
          </el-col>
        </el-row>

        <el-row>

          <el-col style="background-color: white;">
            <el-tabs @tab-click="patientSwitchKsOrI" v-model="tabPaneIs"  stretch>
              <el-tab-pane name="1" :key="'1'" label="本科病人" >
              </el-tab-pane>


              <el-tab-pane name="0" :key="'0'" label="我的病人">
              </el-tab-pane>
            </el-tabs>

            <el-row>
              <el-col :offset="3" :span="14">
                <el-input  placeholder="病人姓名或者住院号" v-model="patientQueryText" size="mini" type="text"/>
              </el-col>
              <el-col :span="1" >
                <el-button  size="mini" @click="patientSwitchKsOrI" icon="el-icon-search" type="primary" ></el-button>
              </el-col>
            </el-row>
            <!--=======================================================病人表格-->
            <el-table
                height="473px"
                @cell-click="patientChecked"
                :data="patientBaseArr"
                :row-class-name="tableRowClassName"
                size="small"
                class="tablecss"
                style="width: 350px">
              <el-table-column prop="ptNo" label="住院号"></el-table-column>
              <el-table-column prop="ptName" label="姓名"></el-table-column>
              <el-table-column prop="ptDiagnoseName" label="诊断"></el-table-column>
            </el-table>
            <!--分页插件-->
            <el-pagination
                style="text-align: center;"
                @size-change="patientBaseSizeChange"
                @current-change="patientBaseCurrentChange"
                :current-page="patientBaseCurrent"
                :page-sizes="[2,4,6,8,10]"
                :page-size="patientBaseSize"
                layout="prev, pager, next, jumper"
                total="3">
            </el-pagination>
          </el-col>
        </el-row>

      </el-aside>

      <el-container style="height: 100%;"><!-- 右边 -->
        <el-header height="120px"  style=" background-color: #B3C0D1;color: #333;"><!-- 头部信息按钮部分-->
          <el-form  >
          <el-row>
              <el-col :offset="1" :span="4">
                <el-form-item label="住院号" label-width="80px" style="margin-bottom: 0px">
                  <el-input size="mini"  v-model="patientBaseObj.ptNo" class="patientText"  disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="姓名" label-width="50px"  style="margin-bottom: 0px">
                  <el-input  size="mini" class="patientText" v-model="patientBaseObj.ptName"   disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="性别"  label-width="50px"  style="margin-bottom: 0px">
                  <el-input  size="mini" class="patientText" v-model="patientBaseObj.ptSex"  disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="年龄" label-width="50px"  style="margin-bottom: 0px">
                  <el-input  size="mini" class="patientText" v-model="patientBaseObj.ptAge" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="电话" label-width="50px"  style="margin-bottom: 0px">
                  <el-input size="mini" class="patientText" v-model="patientBaseObj.ptIphone"  disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="主治医师" label-width="80px"  style="margin-bottom: 0px">
                  <el-input size="mini" class="patientText" v-model="patientBaseObj.sName"  disabled></el-input>
                </el-form-item>
              </el-col>
          </el-row>


            <el-row style="margin-top: 15px">
              <el-col :offset="1" :span="5">
                <el-form-item label="入院时间" label-width="80px" style="margin-bottom: 0px">
                  <el-input  size="mini" class="patientText" v-model="patientBaseObj.ptInDate"  disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="住院天数" label-width="80px"  style="margin-bottom: 0px">
                  <el-input  size="mini" class="patientText" v-model="patientBaseObj.ptInDay"  disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="入院诊断"  label-width="80px"  style="margin-bottom: 0px">
                  <el-input class="patientText" style="cursor: pointer;"  v-model="patientBaseObj.ptDiagnoseName" size="mini"  disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="科室" label-width="50px"  style="margin-bottom: 0px">
                  <el-input class="patientText" size="mini" v-model="patientBaseObj.ksName"  disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="病床" label-width="50px"  style="margin-bottom: 0px">
                  <el-input class="patientText" size="mini" v-model="patientBaseObj.bdName"   disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="管理护士" label-width="80px"  style="margin-bottom: 0px">
                  <el-input size="mini" class="patientText" v-model="patientBaseObj.bdName" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
         </el-header>


        <!--===============================================添加药品弹框-->
        <el-dialog top="50px" title="新增药品" width="80%" @close="closeAddDrugFunction" v-model="isShowAddDrug">

          <!--筛选条件-->
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
                <el-button size="mini" @click="yesDrugAddDoctorEnjoin" type="success">确定</el-button>
              </el-form-item>

            </el-col>



          </el-row>
          </el-form>


          <!--药品表格-->
          <el-row>

            <el-col>

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
                <el-table-column prop="specSpecification" label="药品规格"> </el-table-column>
                <el-table-column prop="drugUnit" label="药品单位"> </el-table-column>
                <el-table-column prop="yfDrcaName" label="类别"></el-table-column>
                <el-table-column prop="drugPrice" label="价格"></el-table-column>
                <el-table-column prop="drugUsage" label="药品用法"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-dialog>




        <el-main  style="background-color: #E9EEF3;color: #333;padding:5px;" ><!-- 主体页面========================================================================-->
          <el-tabs @tab-click="patientSwitchFunction" v-model="maxCard" type="border-card" >

            <!--=============================================================================医嘱开立-->
            <el-tab-pane name="开立医嘱" :key="'开立医嘱'" label="开立医嘱" >

              <el-row>

                <el-col :span="3">
                  <el-button type="primary" @click="openAddDrug" :disabled="doctorEnjoinObj.deId != ''" size="mini">选择药品</el-button>
                </el-col>
                <el-col :span="3">
                  <el-button type="primary" :disabled="doctorEnjoinObj.deId != ''" @click="openAddDrug" size="mini">选择耗材</el-button>
                </el-col>
                <el-col v-if="doctorEnjoinObj.deId != ''" :span="3">
                  <el-button type="danger"  size="mini">重整医嘱</el-button>
                </el-col>

                <el-col v-if="doctorEnjoinObj.deLongorshort == 1" :span="7">
                  <el-date-picker :disabled="doctorEnjoinObj.deId != ''"
                      size="mini"
                      v-model="doctorEnjoinObj.vueDate"
                      @change="doctorEnjoinDate"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                  </el-date-picker>
                </el-col>

                <el-col v-if="doctorEnjoinObj.deLongorshort == 2" :span="4">
                  <el-date-picker :disabled="doctorEnjoinObj.deId != ''"
                      @change="doctorEnjoinDate"
                      size="mini"
                      v-model="doctorEnjoinObj.vueDate"
                      type="date"
                      placeholder="执行日期">
                  </el-date-picker>
                </el-col>


                <el-col :offset="1" :span="2">
                  <el-select :disabled="doctorEnjoinObj.deId != ''" size="mini" @change="selectLongOrShortDoctorEnjoin" v-model="doctorEnjoinObj.deLongorshort" placeholder="请选择">
                    <el-option
                        label="长期医嘱"
                        :value="1">
                    </el-option>
                    <el-option
                        label="临时医嘱"
                        :value="2">
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :offset="1" :span="1">
                  <el-button type="info" @click="emptyDoctorEnjoin" size="mini">重置</el-button>
                </el-col>
                <el-col :offset="1" :span="2">
                  <el-button type="primary" v-if="doctorEnjoinObj.deId == ''" @click="insertDoctorEnjoin()" size="mini">保存医嘱</el-button>
                </el-col>

              </el-row>


              <el-row>
                <el-col>
                  <el-table
                      ref="multipleTable"
                      height="410px"
                      :data="doctorEnjoinObj.dedList"
                      tooltip-effect="dark"
                      size="small"
                      style="width: 100%">
                    <el-table-column prop="desEnteringDate" width="135px" label="录入时间"> </el-table-column>
                    <el-table-column prop="desDrugName" label="医嘱内容"> </el-table-column>
                    <el-table-column prop="desUnit" label="规格"></el-table-column>
                    <el-table-column prop="desUsage" label="用法"></el-table-column>
                    <el-table-column prop="desCount" label="数量"></el-table-column>
                    <el-table-column prop="desText" label="嘱托"> </el-table-column>
                    <el-table-column prop="desMeasure" label="剂量"></el-table-column>
                    <el-table-column prop="desFrequency" label="频率"></el-table-column>
                    <el-table-column prop="ssdemo" label="停嘱时间"></el-table-column>
                    <el-table-column prop="ssdemo" label="停嘱医生"> </el-table-column>
                    <el-table-column label="操作" width="150px">
                      <template #default="obj">
                        <el-button v-if="doctorEnjoinObj.deId == ''" size="mini" @click="openDoctorEnjoinMassage(obj)"  type="success">信息</el-button>
                        <el-button v-if="doctorEnjoinObj.deId == ''" size="mini" @click="deleteDoctorEnjoinMassage(obj)" type="danger">删除</el-button>


                        <el-button v-if="doctorEnjoinObj.deId != ''" size="mini" @click="deleteDoctorEnjoinMassage(obj)" type="danger">停嘱</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>

              <el-form>
              <el-row>

                  <el-col >
                    <el-form-item label-width="40px" label="说明">
                        <el-input placeholder="嘱托" v-model="doctorEnjoinObj.deText" type="textarea" />
                    </el-form-item>
                  </el-col>
              </el-row>
              </el-form>


              <!--===================================================================================添加医嘱嘱托、计量、数量、频率-->
              <el-dialog v-model="isDoctorEnjoinMessageShow" top="14%" @close="closeDoctorEnjoinMassageFunction" :title="DoctorEnjoinMassageTitle">

                <el-form>
                  <el-row style="margin-top: 30px">
                    <el-col  :span="7">
                      <el-form-item label="数量" label-width="50px">
                          <el-input v-model="DoctorEnjoinMassageObj.desCount" />
                      </el-form-item>
                    </el-col>

                    <el-col :offset="1" :span="7">
                      <el-form-item label="计量" label-width="50px">
                        <el-input placeholder="计量" v-model="DoctorEnjoinMassageObj.desMeasure" />
                      </el-form-item>
                    </el-col>

                    <el-col :offset="1" :span="7">
                      <el-form-item label="频率" label-width="50px">
                        <el-select v-model="DoctorEnjoinMassageObj.desFrequency">
                          <el-option value="1" label="pd"/>
                          <el-option value="2" label="bid" />
                          <el-option value="3" label="tid"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col  :span="23">
                      <el-form-item label="嘱托" label-width="50px">
                        <el-input type="textarea" v-model="DoctorEnjoinMassageObj.desText" placeholder="嘱托内容" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>

                <template #footer>
                  <el-row>
                    <el-col :span="18"></el-col>
                    <el-col :span="2">
                      <el-button size="small" @click="addDoctorEnjoinMassageFunction" type="primary">确定</el-button>
                    </el-col>
                    <el-col :span="1"></el-col>
                    <el-col :span="2">
                      <el-button size="small" @click="isShowZY = false" type="danger">取消</el-button>
                    </el-col>
                    <el-col :span="1"></el-col>
                  </el-row>
                </template>
              </el-dialog>

            </el-tab-pane>

            <!--==========================================================================查看医嘱-->
            <el-tab-pane name="查看医嘱" :key="'查看医嘱'" label="查看医嘱">

              <el-table :data="doctorEnjoinArr" height="480px" size="small" >

                <el-table-column label="下嘱日期" prop="deDate"></el-table-column>
                <el-table-column label="下嘱医生" prop="deDoctorName"></el-table-column>
                <el-table-column label="执行时间" prop="deExecuteDate"></el-table-column>
                <el-table-column label="结束时间" prop="deEndDate"></el-table-column>
                <el-table-column label="说明" prop="deText"></el-table-column>
                <el-table-column label="操作">
                  <template #default="obj">
                    <el-button type="danger" size="mini">整单停嘱</el-button>
                    <el-button type="primary" @click="lookDoctorEnjoinOperation(obj.row)" size="mini">操作</el-button>
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

            </el-tab-pane>

            <el-tab-pane name="化验项目" :key="'化验项目'" label="化验项目">
                <h1>as</h1>
            </el-tab-pane>
            <el-tab-pane name="化验结果" :key="'化验结果'" label="化验结果">

              <h1>3</h1>
            </el-tab-pane>
          </el-tabs>
        </el-main>

      </el-container>
    </el-container>
  </el-container>
</template>

<script>

export default{
  data(){
    return{
      //========================================================================员工数据
      staff:{},//员工对象


      //========================================================================病人数据
      patientBaseObj:{//病人申请信息对象
      },
      patientQueryText:'',//病人查询值
      patientBaseArr:[],//病人数组
      tabPaneIs:'0',//选中病人查看


      //=========================医嘱卡片数据
      maxCard:'开立医嘱',//卡片当前位置

      //========================================================================药品数据
      drugSearch:{//药品搜索对象
        searchDrugUsage:'',//药品用法
        drugNameSearch:'',//药品模糊查询
        searchSpecId:'',//药品单位
        searchYfDrcaName:'',//类别搜索（中药、西药）
      },
      searchDrugUsageArr:[],//药品用法集合
      searchSpecifcationsArr:[],//药品规格集合
      searchYfDrcaNameArr:[],//药品类别集合
      drugObj:{//药品对象

      },
      drugArr:[],//药品数组
      selectDrugArr:[],//医生选中数据
      isShowAddDrug:false,//是否显示天机药品弹框



      //========================================================================医嘱数据！！！
      doctorEnjoinObj:{//医嘱实体类
        deId:'',//医嘱编号
        deLongorshort:1,//长期医嘱还是短期医嘱(默认长期)
        ptNo:'',//连接住院登记表
        sId:'',//连接医生编号
        deDoctorName:'',//医生名称
        vueDate:'',//vue组件使用时间
        deDate:'',//下医嘱时间
        deChineseMethod:'',//如果是中药的话就有冲泡方法
        deExecuteDate:'',//执行时间
        deText:'',//嘱托
        deEndDate:'',//结束时间
        //关系
        dedList:[]//医嘱详情集合
      },
      doctorEnjoinArr:[],//医嘱数组

      doctorEnjoinDetailsObj:{//医嘱详情实体类
        desId:'',//医嘱详细编号
        deId:'',//连接医嘱编号
        desDrugId:'',//连接药品编号或者耗材
        desDrugIs:'',//是药品还是耗材 1是药品 2是耗材
        desDrugName:'',//药品名称或者耗材名称
        desText:'',//医嘱内容
        desSpecification:'',//规格
        desMeasure:'',//计量
        desFrequency:'',//频率(一天多少次)
        desUnit:'',//单位
        desUsage:'',//用法
        desCount:'',//今天一天的用量
        desPrice:'',//价格
        desEnteringDate:'',//录入时间
        desIs:'',//是否停止执行医嘱
        desPresentDate:''//最新执行时间
      },
      doctorEnjoinDetailsArr:[],//医嘱详情数组

      //========================================================================医嘱信息数据
      isDoctorEnjoinMessageShow:false,//是否显示医嘱信息弹框
      DoctorEnjoinMassageObj:{//医嘱信息对象
        desId:'',//医嘱详细编号
        deId:'',//连接医嘱编号
        desDrugId:'',//连接药品编号或者耗材
        desDrugIs:'',//是药品还是耗材 1是药品 2是耗材
        desDrugName:'',//药品名称或者耗材名称
        desText:'',//医嘱内容
        desSpecification:'',//规格
        desMeasure:'',//计量
        desFrequency:'',//频率(一天多少次)
        desUnit:'',//单位
        desUsage:'',//用法
        desCount:'',//今天一天的用量
        desPrice:'',//价格
        desEnteringDate:'',//录入时间
        desIs:'',//是否停止执行医嘱
        desPresentDate:''//最新执行时间
      },
      DoctorEnjoinMassageIndex:'',//下标 这个方便修改时候用
      DoctorEnjoinMassageTitle:'',//医嘱信息弹框标题





    }
  },
  methods: {
    //========================================================================页面初始化数据方法
    operationInit() {
      this.axios({
        url: 'select-patient-sId',
        params: {sId: this.staff.sid, ksId: '', text: this.patientQueryText}
      }).then((v) => {

        this.patientBaseArr = v.data;

      }).catch();

      this.axios.post('select-drug-usage').then((v) => {
        this.searchDrugUsageArr = v.data;
      }).catch();

      this.axios.post('all-spec').then((v) => {
        this.searchSpecifcationsArr = v.data;
      }).catch();

      this.axios.post('all-drca').then((v) => {
        this.searchYfDrcaNameArr = v.data;
        this.drugSearch.searchYfDrcaName = this.searchYfDrcaNameArr[0].yfDrcaName;
        this.drugSearchFunction();//调用搜索药品方法
      }).catch();
    },


    //=======================================================================查看医嘱方法
    //点击操作按钮的方法
    async lookDoctorEnjoinOperation(obj){
      if (this.doctorEnjoinObj.dedList != 0) {
        let is = await this.$confirm('检测到该病人有医嘱数据在医嘱页面！是否将医嘱页面的数据移除？', '提示信息', {
          distinguishCancelAndClose: true,
          showClose:false,
          closeOnClickModal:false,
          confirmButtonText: '取消操作',
          cancelButtonText: '移除后操作',
        }).then(() => {
          this.$message({
            type: 'warning',
            message: '已取消'
          });
          return true;
        }).catch(action => {
          this.emptyDoctorEnjoin();
          return false;
        });
        if (is) {
          return false;
        }
      }
      console.log(obj)
      this.maxCard = '开立医嘱';
      this.doctorEnjoinObj = obj;
      if(obj.deLongorshort == 1){
        this.doctorEnjoinObj.vueDate = [],
        this.doctorEnjoinObj.vueDate[0] = obj.deExecuteDate;//将医嘱执行时间赋值
        this.doctorEnjoinObj.vueDate[1] = obj.deEndDate;//将医嘱结束时间赋值
      }else{
        this.doctorEnjoinObj.vueDate = '';
        this.doctorEnjoinObj.vueDate = obj.deExecuteDate;//将医嘱执行时间赋值
      }

    },



    //========================================================================医嘱方法
    //确定将选中的药品放入医嘱详表
    yesDrugAddDoctorEnjoin() {
      if (this.selectDrugArr.length == 0) {
        this.$message({
          type: 'warning',
          message: '未选中药品！'
        });
        return;
      }

      for (let drug of this.selectDrugArr) {
        this.doctorEnjoinDetailsObj.desDrugName = drug.drugName;
        this.doctorEnjoinDetailsObj.desUnit = drug.drugUnit;
        this.doctorEnjoinDetailsObj.desDrugIs = 1;//1是药品
        this.doctorEnjoinDetailsObj.desPrice = drug.drugPrice;
        this.doctorEnjoinDetailsObj.desUsage = drug.drugUsage;
        this.doctorEnjoinDetailsObj.desCount = 1;
        this.doctorEnjoinDetailsObj.desDrugId = drug.drugId;
        this.doctorEnjoinDetailsObj.desEnteringDate = this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
        this.doctorEnjoinObj.dedList.push(this.doctorEnjoinDetailsObj);

        this.doctorEnjoinDetailsObj = {//医嘱详情实体类
          desId: '',//医嘱详细编号
          deId: '',//连接医嘱编号
          desDrugId: '',//连接药品编号或者耗材
          desDrugIs: '',//是药品还是耗材 1是药品 2是耗材
          desDrugName: '',//药品名称或者耗材名称
          desText: '',//医嘱内容
          desSpecification: '',//规格
          desMeasure: '',//计量
          desFrequency: '',//频率(一天多少次)
          desUnit: '',//单位
          desUsage: '',//用法
          desCount: '',//今天一天的用量
          desPrice: '',//价格
          desEnteringDate: '',//录入时间
          desIs: '',//是否停止执行医嘱
          desPresentDate: ''//最新执行时间
        };
      }
      this.closeAddDrugFunction();

    },
    //判断时间是否正确(医嘱执行时间更改时调用)
    doctorEnjoinDate() {
      if (this.doctorEnjoinObj.vueDate == null) {
        this.doctorEnjoinObj.deEndDate = '';
        this.doctorEnjoinObj.deExecuteDate = '';
        return;
      }
      if (this.doctorEnjoinObj.deLongorshort == 1) {
        if (this.formatDate(this.doctorEnjoinObj.vueDate[0], 'yyyy-MM-dd') < this.formatDate(new Date(), 'yyyy-MM-dd')) {
          this.doctorEnjoinObj.vueDate = [];
          this.doctorEnjoinObj.deExecuteDate = '';
          this.doctorEnjoinObj.deEndDate = '';
          this.$message({
            type: 'warning',
            message: '时间错误！  请重新选择'
          });
        } else {
          this.doctorEnjoinObj.deExecuteDate = this.doctorEnjoinObj.vueDate[0]; //执行时间
          this.doctorEnjoinObj.deEndDate = this.doctorEnjoinObj.vueDate[1];//结束时间
        }
      } else {
        if (this.formatDate(this.doctorEnjoinObj.vueDate, 'yyyy-MM-dd') < this.formatDate(new Date(), 'yyyy-MM-dd')) {
          this.doctorEnjoinObj.vueDate = '';
          this.doctorEnjoinObj.deExecuteDate = '';
          this.doctorEnjoinObj.deEndDate = '';
          this.$message({
            type: 'warning',
            message: '时间错误！  请重新选择'
          });
        } else {
          this.doctorEnjoinObj.deExecuteDate = this.formatDate(this.doctorEnjoinObj.vueDate, 'yyyy-MM-dd');//执行时间
        }
      }

    },
    //确定新增医嘱
    insertDoctorEnjoin() {
      console.log(this.doctorEnjoinObj);
      if (this.doctorEnjoinObj.ptNo == '') {
        this.$notify.error({
          title: '错误',
          message: '病人信息错误！！',
          duration: 1700,
          position: 'top-left'
        });
        return;
      }

      if (this.doctorEnjoinObj.vueDate == '') {
        this.$notify.error({
          title: '错误',
          message: '请选择医嘱日期！',
          duration: 1700,
          position: 'top-left'
        });
        return;
      }

      this.axios.post('add-doctorEnjoin',this.doctorEnjoinObj).then((v)=>{
        if(v.data){
          this.emptyDoctorEnjoin();
          this.$message({
            type: 'success',
            message: '开嘱成功！'
          });
        }
      }).catch((data)=>{})
    },
    //切换长期医嘱短期医嘱时调用
    selectLongOrShortDoctorEnjoin() {
      this.doctorEnjoinObj.vueDate = '';
      this.doctorEnjoinObj.deExecuteDate = '';
      this.doctorEnjoinObj.deEndDate = '';
    },
    //清空医嘱信息
    emptyDoctorEnjoin() {
      this.doctorEnjoinObj = {
        deId: '',//医嘱编号
        deLongorshort: 1,//长期医嘱还是短期医嘱(默认长期)
        ptNo: '',//连接住院登记表
        sId: '',//连接医生编号
        deDoctorName: '',//医生名称
        vueDate: '',//vue组件使用时间
        deDate: '',//下医嘱时间
        deChineseMethod: '',//如果是中药的话就有冲泡方法
        deExecuteDate: '',//执行时间
        deText: '',//嘱托
        deEndDate: '',//结束时间
        //关系
        dedList: []//医嘱详情集合
      };
    },


    //========================================================================医嘱信息方法
    //打开医嘱信息弹框
    openDoctorEnjoinMassage(obj) {
      let dej = obj.row;
      this.DoctorEnjoinMassageObj.desId = dej.desId;//医嘱详细编号
      this.DoctorEnjoinMassageObj.desId = dej.deId;//连接医嘱编号
      this.DoctorEnjoinMassageObj.desDrugId = dej.desDrugId;//连接药品编号或者耗材
      this.DoctorEnjoinMassageObj.desDrugIs = dej.desDrugIs;//是药品还是耗材 1是药品 2是耗材
      this.DoctorEnjoinMassageObj.desDrugName = dej.desDrugName;//药品名称或者耗材名称
      this.DoctorEnjoinMassageObj.desText = dej.desText;//医嘱内容
      this.DoctorEnjoinMassageObj.desSpecification = dej.desSpecification;//规格
      this.DoctorEnjoinMassageObj.desMeasure = dej.desMeasure;//计量
      this.DoctorEnjoinMassageObj.desFrequency = dej.desFrequency;//频率(一天多少次)
      this.DoctorEnjoinMassageObj.desUnit = dej.desUnit;//单位
      this.DoctorEnjoinMassageObj.desUsage = dej.desUsage;//用法
      this.DoctorEnjoinMassageObj.desCount = dej.desCount;//今天一天的用量
      this.DoctorEnjoinMassageObj.desPrice = dej.desPrice;//价格
      this.DoctorEnjoinMassageObj.desEnteringDate = dej.desEnteringDate;//录入时间
      this.DoctorEnjoinMassageObj.desIs = dej.desIs;//是否停止执行医嘱
      this.DoctorEnjoinMassageObj.desPresentDate = dej.desPresentDate;//最新执行时间


      this.isDoctorEnjoinMessageShow = true;
      this.DoctorEnjoinMassageTitle = '医嘱信息 【 ' + obj.row.desDrugName + ' 】';
      this.DoctorEnjoinMassageIndex = obj.$index;//将医嘱详情下标放进去方便修改
    },
    //添加医嘱信息方法(修改医嘱详表)
    addDoctorEnjoinMassageFunction() {
      this.doctorEnjoinObj.dedList.splice(this.DoctorEnjoinMassageIndex, 1, this.DoctorEnjoinMassageObj);//修改
      this.$message({
        type: 'success',
        message: '更新成功'
      });
      this.closeDoctorEnjoinMassageFunction();//调用关闭方法
    },
    //关闭医嘱信息方法
    closeDoctorEnjoinMassageFunction() {
      this.DoctorEnjoinMassageObj = {
        desId: '',//医嘱详细编号
        deId: '',//连接医嘱编号
        desDrugId: '',//连接药品编号或者耗材
        desDrugIs: '',//是药品还是耗材 1是药品 2是耗材
        desDrugName: '',//药品名称或者耗材名称
        desText: '',//医嘱内容
        desSpecification: '',//规格
        desMeasure: '',//计量
        desFrequency: '',//频率(一天多少次)
        desUnit: '',//单位
        desUsage: '',//用法
        desCount: '',//今天一天的用量
        desPrice: '',//价格
        desEnteringDate: '',//录入时间
        desIs: '',//是否停止执行医嘱
        desPresentDate: ''//最新执行时间
      };
      this.isDoctorEnjoinMessageShow = false;
    },
    //删除医嘱方法
    deleteDoctorEnjoinMassage(obj) {
      this.doctorEnjoinObj.dedList.splice(obj.$index, 1);
    },


    //========================================================================药品方法
    //药品选中调用方法
    drugSelectChange(obj) {
      this.selectDrugArr = obj;
    },
    //打开添加药品方法
    openAddDrug() {
      if (this.patientBaseObj.ptName == undefined) {
        this.$message({
          type: 'warning',
          message: '请选择病人'
        });
        return;
      }
      this.isShowAddDrug = true;//显示
    },
    //搜索药品方法
    drugSearchFunction() {
      this.axios.post('select-drug-drugName', this.drugSearch).then((v) => {
        console.log(v.data)
        this.drugArr = v.data;
      }).catch();
    },
    //关闭药品弹框时候调用
    closeAddDrugFunction() {
      this.$refs.drugTable.clearSelection();
      this.isShowAddDrug = false;
    },


    //========================================================================病人方法
    //==切换我的病人和本科病人是调用
    patientSwitchKsOrI() {// is 1是查看自己的病人 不是1就是查看本科室的病人
      if (this.tabPaneIs == 0) {
        this.axios({
          url: 'select-patient-sId',
          params: {sId: this.staff.sid, ksId: '', text: this.patientQueryText}
        }).then((v) => {
          this.patientBaseArr = v.data;
        }).catch((data) => {

        });
      } else {
        this.axios({
          url: 'select-patient-sId',
          params: {sId: '', ksId: this.staff.ksId, text: this.patientQueryText}
        }).then((v) => {
          this.patientBaseArr = v.data;
        }).catch((data) => {
        });
      }
    },
    //选中病人方法
    async patientChecked(obj) {
      if (this.patientBaseObj.ptNo != '') {
        if (this.patientBaseObj.ptNo != obj.ptNo) {

          if (this.doctorEnjoinObj.dedList != 0) {
            let is = await this.$confirm('当前正在执行【' + this.patientBaseObj.ptName + '】 的医嘱操作！如果切换将把该病人的医嘱数据移除  是否切换？', '确认信息', {
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
              this.emptyDoctorEnjoin();
             return false;
            });
            if(is){
              return false;
            }
          }
        }
    }

      this.patientBaseObj.ptNo = obj.ptNo;
      this.patientBaseObj.ptName = obj.ptName;
      this.patientBaseObj.ptInDate = obj.ptInDate;
      this.patientBaseObj.ptHomeAdder = obj.ptHomeAdder;
      this.patientBaseObj.ptDiagnoseName = obj.ptDiagnoseName;
      this.patientBaseObj.ptAge = obj.ptAge;
      this.patientBaseObj.ptSex = obj.ptSex;
      this.patientBaseObj.bdName = obj.bed.bdName;
      this.patientBaseObj.ksName = obj.ksName;
      this.patientBaseObj.sName = obj.staff.sname;
      this.patientBaseObj.ptIphone = obj.ptIphone;
      this.patientBaseObj.ptInDay = parseFloat((new Date().getTime() - Date.parse(obj.ptInDate))  / (1*24*60*60*1000)).toFixed(0) + '天';//算出入院天数

      this.doctorEnjoinObj.ptNo = obj.ptNo;
      this.doctorEnjoinObj.deDoctorName = this.staff.sname;//员工姓名
      this.doctorEnjoinObj.sId = this.staff.sid;//医生编号

      this.patientSwitchFunction();//调用刷新
    },
    patientQh(){
      this.maxCard = '开立医嘱';
    },



    //========================================================================切换操作时调用方法
    patientSwitchFunction(){
      if(this.maxCard == '开立医嘱'){

      }else if(this.maxCard == '查看医嘱'){
        if(this.patientBaseObj.ptNo != undefined){
          this.axios({url:'select-doctorEnjoin-ByPtNo',params:{ptNo:this.patientBaseObj.ptNo}}).then((v)=>{
            console.log(v.data);
            this.doctorEnjoinArr = v.data;
          }).catch((data)=>{})
        }
      }else if(this.maxCard == '化验项目'){

      }else if(this.maxCard == '化验结果'){

      }
    },









    //========================================================================格式化日期方法
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
    tableRowClassName({row, rowIndex}) {
      if (this.patientBaseObj.ptNo == row.ptNo) {
        return 'success';
      }
    }
  },
  created() {
    this.staff = this.$store.state.token.list;//将登录存入的值在取出来
    this.operationInit();//初始化页面数据
  }
}
</script>

<style scoped>
.patientText/deep/ .el-input__inner {
  color: #FD4C4C;
  white-space: nowrap;
  font-size: 13px;
  text-overflow: ellipsis;
}

/deep/ .el-dialog__body{
  padding: 5px 20px;
}
.tablecss /deep/ .el-table__row:hover>td{
  cursor: pointer;
  background-color: #42B8FF!important;
  color:white;
}
/*/deep/ .el-table__body tr.current-row>td{*/
/*  background-color: #8BD3FF!important;*/
/*  color: white;*/
/*  !* color: #f19944; *!  !* 设置文字颜色，可以选择不设置 *!*/
/*}*/
/*.el-table .warning-row {*/
/*  background: oldlace;*/
/*}*/

/deep/ .el-table .success {
  background: #42B8FF;
  color: white;
}

</style>
