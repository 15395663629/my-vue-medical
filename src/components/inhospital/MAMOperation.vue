<template>
  <el-container style="height: 100%;">
    <el-container style="height: 100%;">
      <el-aside width="350px" style="background-color: #E7ECF1;color: #333;"> <!-- 右边 -->
        <el-row style="height: 30px;background-color: #D3DCE6;line-height: 30px">
          <el-col style="margin-left: 130px" >
            医生工作站
          </el-col>
        </el-row>

        <el-row style="height: 30px;background-color: #D3DCE6;line-height: 30px">
          <el-col style="color: red" :offset="7" :span="12">
            {{currentTime}}
          </el-col>
        </el-row>

        <el-row style="height: 30px;background-color: #D3DCE6;line-height: 30px">
          <el-col style="margin-left: 125px">
            <span style="font-size: 14px">所属科室 ：</span><span style="font-size: 14px">{{staffKsName}}</span>
          </el-col>
        </el-row>

        <el-row style="height: 30px;background-color: #D3DCE6;line-height: 30px">
          <el-col style="margin-left: 115px" >
            <span style="font-size: 14px">医生名称 ：</span><span style="font-size: 14px">{{staff.sname}}</span>
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
                height="453px"
                @cell-click="patientChecked"
                :data="patientBaseArr.slice((patientCurrentPage-1)*patientPageSize,patientCurrentPage*patientPageSize)"
                :row-class-name="tablePatientBaseRowClassName"
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
                @size-change="patientSizeChange"
                @current-change="patientCurrentChange"
                :current-page="patientCurrentPage"
                :page-sizes="[2,4,6,8,10]"
                :page-size="patientPageSize"
                layout="total, sizes, prev, pager, next"
                :total="patientBaseArr.length">
            </el-pagination>
          </el-col>
        </el-row>

      </el-aside>

      <el-container style="height: 100%;"><!-- 右边 -->
        <el-header  height="120px"  style=" background-color: #B3C0D1;color: #333;padding-top: 15px"><!-- 头部信息按钮部分-->
          <el-form  >
          <el-row>
              <el-col :span="4">
                <el-form-item label="住院号" label-width="80px" style="margin-bottom: 0px">
                  <el-input size="mini"  v-model="patientBaseObj.ptNo" class="patientText"  disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="姓名" label-width="50px"  style="margin-bottom: 0px">
                  <el-input  size="mini" class="patientText" v-model="patientBaseObj.ptName"   disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="性别"  label-width="50px"  style="margin-bottom: 0px">
                  <el-input  size="mini" class="patientText" v-model="patientBaseObj.ptSex"  disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
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
              <el-col  :span="5">
                <el-form-item label="入院时间" label-width="80px" style="margin-bottom: 0px">
                  <el-input  size="mini" class="patientText"  v-model="patientBaseObj.ptInDate"  disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
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
              <el-col :span="4">
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
                <el-table-column label="是否处方药">
                  <template #default="obj">
                    {{obj.row.drugPrescription == 1 ? '是' : '否'}}
                  </template>
                </el-table-column>
                <el-table-column prop="drugUnit" label="药品单位"> </el-table-column>
                <el-table-column prop="yfDrcaName" label="类别">
                  <template #default="obj">
                    <span v-if="obj.row.iss == 1">{{obj.row.yfDrcaName}}</span>
                    <span v-if="obj.row.iss != 1">外用药</span>
                  </template>
                </el-table-column>
                <el-table-column label="处方价格" prop="drugParticle"/>
                <el-table-column label="价格" prop="drugPrice"/>
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
                <el-col v-if="doctorEnjoinObj.deId != ''" :span="3">
                  <el-button type="danger"  size="mini">重整医嘱</el-button>
                </el-col>


                <el-col  :span="4">
                  <el-date-picker :disabled="doctorEnjoinObj.deId != ''"
                      @change="doctorEnjoinDate"
                      size="mini"
                      v-model="doctorEnjoinObj.deExecuteDate"
                      type="date"
                      placeholder="执行日期">
                  </el-date-picker>
                </el-col>


                <el-col :offset="1" style="line-height: 30px" :span="5">
                    <el-radio-group v-model="doctorEnjoinObj.deLongorshort"  @change="selectAddDoctorEnjoinTable">
                      <el-radio :label="2">临时医嘱</el-radio>
                      <el-radio :label="1">长期医嘱</el-radio>
                    </el-radio-group>
                </el-col>

                <el-col :offset="1" :span="1">
                  <el-button type="info" @click="emptyDoctorEnjoin" size="mini">重置</el-button>
                </el-col>

                <el-col :offset="1" :span="1">
                  <el-button type="success" @click="addCaseHistory"  size="mini">添加病例</el-button>
                  <CaseHistory :patient-obj="patientBaseObj" ref="caseRef" ></CaseHistory>
                </el-col>

                <el-col :offset="1" :span="2">
                  <el-button type="primary" v-if="doctorEnjoinObj.deId == ''" :disabled="doctorEnjoinObj.dedList == 0" @click="insertDoctorEnjoin()" size="mini">保存医嘱</el-button>
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
                    <el-table-column prop="desDrugName" width="150px" label="医嘱内容"> </el-table-column>
                    <el-table-column prop="desUnit" label="规格"></el-table-column>
                    <el-table-column prop="desUsage" label="用法"></el-table-column>
                    <el-table-column width="100px" label="数量">

                      <template #default="obj">
                        <el-input-number :min="1" style="width: 90px" size="mini" v-model="obj.row.desCount" type="text"/>
                      </template>

                    </el-table-column>
                    <el-table-column label="剂量">

                      <template #default="obj">
                        <el-input size="mini" v-model="obj.row.desMeasure" placeholder="药品剂量" type="text"/>
                      </template>

                    </el-table-column>
                    <el-table-column prop="desFrequency" label="频率">
                      <template #default="obj">
                        <el-input-number :min="1" style="width: 90px" size="mini" v-model="obj.row.desFrequency" type="text"/>
                      </template>
                    </el-table-column>
                    <el-table-column width="160px" label="嘱托">
                      <template #default="obj">
                        <el-input size="mini" v-model="obj.row.desText" placeholder="嘱托" type="textarea"/>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100px">
                      <template #default="obj">
                        <el-button  size="mini" @click="deleteDoctorEnjoinMassage(obj)" type="danger">删除</el-button>
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


            </el-tab-pane>

            <!--==========================================================================查看医嘱-->
            <el-tab-pane name="查看医嘱" :key="'查看医嘱'" label="查看医嘱">
              <el-row>
                <el-col style="padding-left: 15px;margin-top: 6px" :span="5">
                    <el-radio-group v-model="isMainOrMinor" size="mini" :disabled="isMainOrMinor == 3"  @change="selectLookDoctorEnjoinTable">
                      <el-radio :label="2">医嘱单</el-radio>
                      <el-radio :label="1">医嘱详单</el-radio>
                    </el-radio-group>
                </el-col>

                <el-col :span="4">
                  <span style="font-size: 12px;">医嘱类型:</span>&nbsp;
                  <el-select @change="selectLookDoctorEnjoinTable" v-model="doctorEnjoinWhere.doctorType" placeholder="请选择" style="width: 90px" size="mini">
                    <el-option label="全部医嘱" :value="0"></el-option>
                    <el-option label="长期医嘱" :value="1"></el-option>
                    <el-option label="临时医嘱" :value="2"></el-option>
                  </el-select>
                </el-col>


                <el-col  :span="8">
                  &nbsp;<span style="font-size: 12px;">执行日期：</span>&nbsp;

                  <el-date-picker style="width: 125px" @change="selectLookDoctorEnjoinTable" v-model="doctorEnjoinWhere.startDate"
                                  type="date"
                                  size="mini"
                                  placeholder="日期">
                  </el-date-picker>
                  &nbsp;<span style="font-size: 12px;">至</span>&nbsp;
                  <el-date-picker style="width: 125px" @change="selectLookDoctorEnjoinTable" v-model="doctorEnjoinWhere.endDate"
                                  type="date"
                                  size="mini"
                                  placeholder="日期">
                  </el-date-picker>
                </el-col>

                <el-col  :span="5">
                    <el-tag size="small" type="info" effect="dark">可执行</el-tag>&nbsp;
                    <el-tag type="danger" size="small" effect="dark">已停用</el-tag>&nbsp;
                    <el-tag effect="dark" size="small">临时医嘱</el-tag>&nbsp;
                </el-col>

                <el-col  v-if="isMainOrMinor == 3" :span="1">
                    <el-button size="mini" @click="lookDoctorEnjoinDetailsAll" type="primary">
                      查看所有医嘱
                    </el-button>
                </el-col>
              </el-row>


              <el-divider></el-divider>

              <!--查看主表医嘱-->
              <el-row v-if="isMainOrMinor == 2">
                <el-col>
                  <el-table :data="doctorEnjoinArr.slice((doctorEnjoinCurrentPage-1)*doctorEnjoinPageSize,doctorEnjoinCurrentPage*doctorEnjoinPageSize)"
                            :row-class-name="tableDoctorEnjoinDetailsRowClassName" height="420px" size="small" >
                    <el-table-column label="下嘱日期" prop="deDate"></el-table-column>
                    <el-table-column label="下嘱医生" width="100px" prop="deDoctorName"></el-table-column>
                    <el-table-column width="100px" label="医嘱类型">
                      <template #default="obj">
                        {{obj.row.deLongorshort == 1 ? '长期医嘱' : '临时医嘱'}}
                      </template>
                    </el-table-column>
                    <el-table-column label="执行时间" prop="deExecuteDate"></el-table-column>
                    <el-table-column label="结束时间" prop="deEndDate"></el-table-column>
                    <el-table-column label="说明" prop="deText"></el-table-column>
                    <el-table-column label="操作">
                      <template #default="obj">
                        <el-button type="danger" v-if="obj.row.deEndDate == null ? true : false" @click="openStopDoctorEnjoin(obj)" size="mini">整单停嘱</el-button>
                        <el-button type="primary" @click="lookDoctorEnjoinDetailsTable(obj.row)" size="mini">详情</el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                  <!--分页插件-->
                  <el-pagination
                      style="text-align: center;"
                      @size-change="doctorEnjoinSizeChange"
                      @current-change="doctorEnjoinCurrentChange"
                      :current-page="doctorEnjoinCurrentPage"
                      :page-sizes="[2,4,6,8,10]"
                      :page-size="doctorEnjoinPageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="doctorEnjoinArr.length">
                  </el-pagination>
                </el-col>
              </el-row>

              <!--查看所有详表医嘱-->
              <el-row v-if="isMainOrMinor == 1 || isMainOrMinor == 3 ">
                <el-col>
                  <el-table :data="doctorEnjoinDetailsArr.slice((doctorEnjoinDetailsCurrentPage-1)*doctorEnjoinDetailsPageSize,doctorEnjoinDetailsCurrentPage*doctorEnjoinDetailsPageSize)" :row-class-name="tableDoctorEnjoinDetailsRowClassName"  height="420px" size="small" >
<!--                    <el-table-column v-if="patientBaseObj.ptNo == null" type="selection" width="50px"></el-table-column>-->
                    <el-table-column width="140px" label="下嘱日期" prop="desEnteringDate"></el-table-column>
                    <el-table-column label="下嘱医生" width="100px" prop="deDoctorName"></el-table-column>
                    <el-table-column  label="医嘱类型">
                      <template #default="obj">
                        {{obj.row.deLongorshort == 1 ? '长期医嘱' : '临时医嘱'}}
                      </template>
                    </el-table-column>
                    <el-table-column label="执行时间" prop="desExecuteDate"></el-table-column>
                    <el-table-column label="结束时间" prop="desEndDate"></el-table-column>
                    <el-table-column label="药品名称" prop="desDrugName"></el-table-column>
                    <el-table-column label="数量" prop="desCount"></el-table-column>
                    <el-table-column label="剂量" prop="desMeasure"></el-table-column>
                    <el-table-column label="频率" prop="desFrequency"></el-table-column>
                    <el-table-column label="嘱托" prop="desText"></el-table-column>
                    <el-table-column label="药品类型">

                      <template #default="obj">
                        {{obj.row.desDrugIs == 1 ? '药物' : obj.row.desDrugIs == 2 ? '外用药' : '处方药'}}
                      </template>

                    </el-table-column>
                    <el-table-column label="操作">
                      <template #default="obj">
                        <el-button v-if="obj.row.desEndDate == null ? true : false" type="danger" @click="openStopDoctorEnjoin(obj)" size="mini">停嘱</el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                  <!--分页插件-->
                  <el-pagination
                      style="text-align: center;"
                      @size-change="doctorEnjoinDetailsSizeChange"
                      @current-change="doctorEnjoinDetailsCurrentChange"
                      :current-page="doctorEnjoinDetailsCurrentPage"
                      :page-sizes="[2,4,6,8,10]"
                      :page-size="doctorEnjoinDetailsPageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="doctorEnjoinDetailsArr.length">
                  </el-pagination>
                </el-col>
              </el-row>

              <!--============================================================================================================停嘱弹框-->
              <el-dialog width="35%" top="12%" @close="closeStopDoctorEnjoinDetails" v-model="isStopDoctorEnjoin" title="停嘱操作" >
                <el-form>

                  <el-row>
                    <el-col :offset="1" :span="8">
                      <el-form-item label-width="70px" label="停嘱日期">
                        <el-date-picker style="width: 140px" :disabled="doctorEnjoinObj.deId != ''"
                                        @change="stopDoctorEnjoinDateChange"
                                        size="small"
                                        v-model="stopDoctorEnjoin.sdeDate"
                                        type="date"
                                        placeholder="停嘱日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :offset="3" :span="10">
                      <el-form-item label-width="70px" label="医生名称">
                          <el-input  size="small" v-model="staff.sname"  disabled />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :offset="1" :span="21">
                      <el-form-item label-width="70px"  label="停嘱原因">
                        <el-input placeholder="停嘱原因" v-model="stopDoctorEnjoin.sdeStopCause" type="textarea" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                </el-form>

                <template #footer>
                   <el-row>
                      <el-col :span="18"></el-col>
                      <el-col :span="2">
                        <el-button size="small" @click="addStopDoctorEnjoinDetails" type="primary">确定</el-button>
                      </el-col>
                       <el-col :span="1"></el-col>
                       <el-col :span="2">
                         <el-button size="small" @click="closeStopDoctorEnjoinDetails" type="danger">取消</el-button>
                       </el-col>
                       <el-col :span="1"></el-col>
                     </el-row>
                </template>
              </el-dialog>

            </el-tab-pane>

            <el-tab-pane name="查看病历" :key="'查看病历'" label="查看病历">
              <lokkCaseHistory ref="lokkCaseHistoryRef" :patient-obj="patientBaseObj"></lokkCaseHistory>
            </el-tab-pane>

            <el-tab-pane name="检验项目" :key="'检验项目'" label="检验项目">
              <labWork :patient-obj="patientBaseObj"></labWork>
            </el-tab-pane>
            <el-tab-pane name="检验结果" :key="'检验结果'" label="检验结果">
              <lab-work-result ref="resultFun" :patient-obj="patientBaseObj"></lab-work-result>
            </el-tab-pane>
          </el-tabs>
        </el-main>

      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import labWork from "./MAMOperation/labWork.vue";//化验项目页面
import labWorkResult from "./MAMOperation/labWorkResult.vue";//查看化验结果页面
import CaseHistory from "./MAMOperation/CaseHistory.vue";//添加病例页面
import lokkCaseHistory from "./MAMOperation/lookCaseHistory.vue";
//查看病历页面

export default{
  components:{labWork,labWorkResult,CaseHistory,lokkCaseHistory},
  data(){
    return{
      //========================================================================员工数据
      staff:{},//员工对象
      staffKsName:'',//科室名称

      //======================查询条件数据
      doctorEnjoinWhere:{
        startDate:'',//开始日期
        endDate:'',//结束日期
        searchLike:'',//模糊搜索
        doctorType:0,//医嘱类型
        sIdArr:[],//员工编号数组
        ksIdArr:[],//科室编号数组
        ptNo:''
      },


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
        searchIs:''//查询是否处方药
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
        desExecuteDate:'',//开始执行时间
        desEndDate:'',//结束时间
        desIs:'',//是否停止执行医嘱
        desPresentDate:''//最新执行时间
      },

      //=======================================================================查看医嘱 数据
      doctorEnjoinArr:[],//医嘱数组
      doctorEnjoinDetailsArr:[],//医嘱详情数组
      isMainOrMinor:2,//1显示所有数据  2显示主表数据
      isStopDoctorEnjoin:false,//是否显示停嘱弹框
      staffNname:'',//医生名称
      //===================停嘱数据
      stopDoctorEnjoinVue:{//停嘱对象（前台做操作）
      },
      stopDoctorEnjoinDetailsIndex:'',//修改下标
      stopDoctorEnjoin:{//停嘱对象(返回到后台的)
        derId:'',//停嘱编号 主表编号或者是详表编号
        stopIs:'',//1代表主表编号 2代表详表编号
        sId:'',//医生编号
        sdeDoctorName:'',//停嘱医生名称
        sdeStopCause:'',//停嘱原因
        sdeDate:'',//停嘱日期
        ptNo:''//病人住院号
      },
      currentTime:'',//时间
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
        DesExecuteDate:'',//开始执行时间
        DesEndDate:'',//结束时间
        desIs:'',//是否停止执行医嘱
        desPresentDate:''//最新执行时间
      },
      DoctorEnjoinMassageIndex:'',//下标 这个方便修改时候用
      DoctorEnjoinMassageTitle:'',//医嘱信息弹框标题



      //=====================================================================分页数据
      //病人分页数据
      patientCurrentPage:1,//当前页
      patientPageSize:6,//页大小
      //医嘱分页
      doctorEnjoinCurrentPage:1,//当前页
      doctorEnjoinPageSize:6,//页大小
      //医嘱详情分页
      doctorEnjoinDetailsCurrentPage:1,//页大小
      doctorEnjoinDetailsPageSize:6,//页大小




    }
  },
  methods: {
    //========================================================================页面初始化数据方法
    operationInit() {
      this.axios({
        url: 'select-patient-sId',
        params: {sId:this.staff.sid, ksksId: '', text: this.patientQueryText,is:1}
      }).then((v) => {
        console.log(v.data)
        this.patientBaseArr = v.data;
      }).catch();
      this.axios({url:'select-ks-obj',params:{ksId:this.staff.ksId}}).then((v)=>{
        this.staffKsName = v.data.ksName;
      }).catch();
      this.doctorEnjoinObj.deExecuteDate = new Date();

      this.axios.post('select-drug-usage').then((v) => {
        this.searchDrugUsageArr = v.data;
      }).catch();

      this.axios.post('all-spec').then((v) => {
        this.searchSpecifcationsArr = v.data;
      }).catch();

      this.axios.post('all-drca').then((v) => {
        this.searchYfDrcaNameArr = v.data;
        this.drugSearchFunction();//调用搜索药品方法
      }).catch();
    },

    //=======================================新开医嘱切换长期医嘱短期医嘱
    selectAddDoctorEnjoinTable(){
      if(this.doctorEnjoinObj.deLongorshort == 1){
        if(this.doctorEnjoinObj.dedList.length > 0){
          this.$confirm("切换长期医嘱需要将药品数据清空   是否清空？", '提示信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: "清空",
            cancelButtonText: "取消"
          }).then(() => {
            this.doctorEnjoinObj.dedList = [];
          }).catch(action => {
            this.doctorEnjoinObj.deLongorshort = 2;
            this.$message({
              type: 'warning',
              message:'取消切换'
            })
          });
        }
      }
    },

    //=======================================================================查看医嘱方法
    //切换查看医嘱表格
    selectLookDoctorEnjoinTable(){
      if(this.patientBaseObj.ptNo != undefined){
        this.doctorEnjoinWhere.ptNo = this.patientBaseObj.ptNo;
        if(this.isMainOrMinor == 2){
            this.axios.post('select-doctorEnjoin-ByPtNo',this.doctorEnjoinWhere).then((v)=>{
              console.log(v.data);
              this.doctorEnjoinArr = v.data;
            }).catch((data)=>{})
        }else{
          this.axios.post('select-doctorEnjoinDetails-ByPtNo',this.doctorEnjoinWhere).then((v)=>{
            console.log(v.data)
            this.doctorEnjoinDetailsArr = v.data;
          })
        }
      }
    },
    //主表数据点击查看详情方法
    lookDoctorEnjoinDetailsTable(obj){
      this.doctorEnjoinDetailsArr = obj.dedList;
      this.isMainOrMinor = 3;
      this.doctorEnjoinDetailsCurrentPage = 1;//重置医嘱详情里面的当前页
    },
    //点击查看所有医嘱方法
    lookDoctorEnjoinDetailsAll(){
      this.selectLookDoctorEnjoinTable();
      this.isMainOrMinor = 1;
      this.stopDoctorEnjoinVue;
    },
    //打开停嘱弹框方法
    openStopDoctorEnjoin(obj){
      console.log(obj);
      if(this.staff.sid != obj.row.sid){
        this.$message({
          type: 'warning',
          message: '不能操作其它医生的医嘱'
        });
        return;
      }

        this.stopDoctorEnjoinVue = obj.row;
        if(this.isMainOrMinor == 1 || this.isMainOrMinor == 3){
          this.stopDoctorEnjoin.derId = obj.row.desId;//将医嘱详情编号赋值
        }else{
          this.stopDoctorEnjoin.derId = obj.row.deId;//将医嘱详情编号赋值
        }
        this.stopDoctorEnjoinDetailsIndex = obj.$index;//当前选中下标
        this.staffNname = this.staff.sname;
        this.isStopDoctorEnjoin = true;
    },
    //当停嘱日期改变是调用
    stopDoctorEnjoinDateChange(){
      if(this.stopDoctorEnjoin.sdeDate != '' && this.stopDoctorEnjoin.sdeDate != null){
        if(this.isMainOrMinor == 1 || this.isMainOrMinor == 3){
          if(this.formatDate(this.stopDoctorEnjoin.sdeDate,'yyyy-MM-dd') < this.formatDate(this.stopDoctorEnjoinVue.desExecuteDate,'yyyy-MM-dd')){
            this.$message({
              type: 'warning',
              message: '停嘱日期不能再执行日期之前'
            });
            this.stopDoctorEnjoin.sdeDate = '';
          }
        }else{
          if(this.formatDate(this.stopDoctorEnjoin.sdeDate,'yyyy-MM-dd') < this.formatDate(this.stopDoctorEnjoinVue.deExecuteDate,'yyyy-MM-dd')){
            this.$message({
              type: 'warning',
              message: '停嘱日期不能再执行日期之前'
            });
            this.stopDoctorEnjoin.sdeDate = '';
          }
        }
      }
    },
    //新增停嘱数据（修改）（弹框确定按钮）
    addStopDoctorEnjoinDetails(){
      // if(this.staff.sid != ){

      // }
      // console.log()

      this.stopDoctorEnjoin.ptNo = this.patientBaseObj.ptNo;
      this.stopDoctorEnjoin.sdeDoctorName = this.staff.sname;
      this.stopDoctorEnjoin.sId = this.staff.sid;
      this.stopDoctorEnjoin.stopIs = this.isMainOrMinor == 3 ? 1 : this.isMainOrMinor;
      console.log(this.stopDoctorEnjoin);
      this.axios.post('stop-doctor-enjoin',this.stopDoctorEnjoin).then((v)=>{
        if(this.isMainOrMinor == 1 || this.isMainOrMinor == 3){
          this.stopDoctorEnjoinVue.desEndDate = this.formatDate(this.stopDoctorEnjoin.sdeDate,'yyyy-MM-dd');
          this.doctorEnjoinDetailsArr.splice(this.stopDoctorEnjoinDetailsIndex, 1, this.stopDoctorEnjoinVue);//修改
        }else{
          this.stopDoctorEnjoinVue.deEndDate = this.formatDate(this.stopDoctorEnjoin.sdeDate,'yyyy-MM-dd');
          this.doctorEnjoinArr.splice(this.stopDoctorEnjoinDetailsIndex, 1, this.stopDoctorEnjoinVue);//修改
        }
        this.$message({
          type: 'success',
          message: '停嘱成功'
        });
        this.closeStopDoctorEnjoinDetails();

      }).catch();
    },
    //关闭停嘱弹框
    closeStopDoctorEnjoinDetails(){
      this.isStopDoctorEnjoin = false;
      this.stopDoctorEnjoin = {//停嘱对象(返回到后台的)
            derId:'',//停嘱编号 主表编号或者是详表编号
            stopIs:'',//1代表主表编号 2代表详表编号
            sId:'',//医生编号
            sdeDoctorName:'',//停嘱医生名称
            sdeStopCause:'',//停嘱原因
            sdeDate:'',//停嘱日期
            ptNo:''//病人住院号
      };
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

      for (let drug of this.selectDrugArr){
        this.doctorEnjoinDetailsObj.desDrugName = drug.drugName;
        this.doctorEnjoinDetailsObj.desUnit = drug.drugUnit;
        this.doctorEnjoinDetailsObj.desPrice = drug.iss == 2 ? drug.drugPrice : drug.iss == 1 && drug.drugPrescription == 1 ? drug.drugParticle : drug.drugPrice;
        this.doctorEnjoinDetailsObj.desUsage = drug.drugUsage;
        this.doctorEnjoinDetailsObj.desCount = 1;
        this.doctorEnjoinDetailsObj.desDrugIs = drug.iss == 2 ? 2 : drug.iss == 1 && drug.drugPrescription == 1 ? 3 : 1;//药品还是耗材或者处方药
        this.doctorEnjoinDetailsObj.desDrugId = drug.drugId;
        this.doctorEnjoinDetailsObj.desEnteringDate = this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
        this.doctorEnjoinObj.dedList.push(this.doctorEnjoinDetailsObj);
        console.log(this.doctorEnjoinObj);

        this.doctorEnjoinDetailsObj = {//医嘱详情实体类
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
          DesExecuteDate:'',//开始执行时间
          DesEndDate:'',//结束时间
          desIs:'',//是否停止执行医嘱
          desPresentDate:''//最新执行时间
        };
      }
      this.closeAddDrugFunction();
    },
    //判断时间是否正确(医嘱执行时间更改时调用)
    doctorEnjoinDate() {
      console.log(this.doctorEnjoinObj.deExecuteDate)
        if(this.doctorEnjoinObj.deExecuteDate == null){
          return;
        }
        if (this.formatDate(this.doctorEnjoinObj.deExecuteDate, 'yyyy-MM-dd') < this.formatDate(new Date(), 'yyyy-MM-dd')) {
          this.doctorEnjoinObj.deExecuteDate = '';
          this.$message({
            type: 'warning',
            message: '时间错误！  请重新选择'
          });
        }
    },
    //确定新增医嘱
    async insertDoctorEnjoin() {
      if (this.patientBaseObj.ptNo == '') {
        this.$notify.error({
          title: '错误',
          message: '病人信息错误！！',
          duration: 1700,
          position: 'top-left'
        });
        return;
      }

      if (this.doctorEnjoinObj.deExecuteDate == '') {
        this.$notify.error({
          title: '错误',
          message: '请选择医嘱日期！',
          duration: 1700,
          position: 'top-left'
        });
        return;
      }

      let iss = false;
      // alert(this.patientBaseObj.ptPrice)
       if(this.patientBaseObj.ptPrice < 0){
          iss = await this.$confirm("病人【"+this.patientBaseObj.ptName+"】 已欠费【"+this.patientBaseObj.ptPrice+"】是否继续开立医嘱", '提示信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: "取消开立",
          cancelButtonText: "确定开立"
        }).then(() => {
         return true;
        }).catch(action => {
          return false;
        });
      }
      if(iss){
        this.$message({
          type: 'warning',
          message:'已取消开立'
        })
        return;
      }

      this.doctorEnjoinObj.ptNo = this.patientBaseObj.ptNo;
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
      this.doctorEnjoinObj.deExecuteDate = '';
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
    // openDoctorEnjoinMassage(obj) {
    //   let dej = obj.row;
    //   this.DoctorEnjoinMassageObj.desId = dej.desId;//医嘱详细编号
    //   this.DoctorEnjoinMassageObj.desId = dej.deId;//连接医嘱编号
    //   this.DoctorEnjoinMassageObj.desDrugId = dej.desDrugId;//连接药品编号或者耗材
    //   this.DoctorEnjoinMassageObj.desDrugIs = dej.desDrugIs;//是药品还是耗材 1是药品 2是耗材
    //   this.DoctorEnjoinMassageObj.desDrugName = dej.desDrugName;//药品名称或者耗材名称
    //   this.DoctorEnjoinMassageObj.desText = dej.desText;//医嘱内容
    //   this.DoctorEnjoinMassageObj.desSpecification = dej.desSpecification;//规格
    //   this.DoctorEnjoinMassageObj.desMeasure = dej.desMeasure;//计量
    //   this.DoctorEnjoinMassageObj.desFrequency = dej.desFrequency;//频率(一天多少次)
    //   this.DoctorEnjoinMassageObj.desUnit = dej.desUnit;//单位
    //   this.DoctorEnjoinMassageObj.desUsage = dej.desUsage;//用法
    //   this.DoctorEnjoinMassageObj.desCount = dej.desCount;//今天一天的用量
    //   this.DoctorEnjoinMassageObj.desPrice = dej.desPrice;//价格
    //   this.DoctorEnjoinMassageObj.desEnteringDate = dej.desEnteringDate;//录入时间
    //   this.DoctorEnjoinMassageObj.desIs = dej.desIs;//是否停止执行医嘱
    //   this.DoctorEnjoinMassageObj.desPresentDate = dej.desPresentDate;//最新执行时间
    //
    //
    //   this.isDoctorEnjoinMessageShow = true;
    //   this.DoctorEnjoinMassageTitle = '医嘱信息 【 ' + obj.row.desDrugName + ' 】';
    //   this.DoctorEnjoinMassageIndex = obj.$index;//将医嘱详情下标放进去方便修改
    // },
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
      this.drugSearchFunction();
    },
    //搜索药品方法
    drugSearchFunction() {
      if(this.doctorEnjoinObj.deLongorshort == 1){
        this.drugSearch.searchIs = 1;
      }else{
        this.drugSearch.searchIs = '';
      }
      this.axios.post('select-drug-drugName', this.drugSearch).then((v) => {
        console.log(v.data)
        this.drugArr = v.data;
      }).catch();
    },
    //关闭药品弹框时候调用
    closeAddDrugFunction() {
      this.$refs.drugTable.clearSelection();
      this.isShowAddDrug = false;
      this.drugSearch = {//药品搜索对象
            searchDrugUsage:'',//药品用法
            drugNameSearch:'',//药品模糊查询
            searchSpecId:'',//药品单位
            searchYfDrcaName:'',//类别搜索（中药、西药）
            searchIs:''//查询是否处方药
      }
    },


    //========================================================================病人方法
    //==切换我的病人和本科病人是调用
    patientSwitchKsOrI() {// is 1是查看自己的病人 不是1就是查看本科室的病人
      if (this.tabPaneIs == 0) {
        this.axios({
          url: 'select-patient-sId',
          params: {sId: this.staff.sid, ksId: '', text: this.patientQueryText,is:1}
        }).then((v) => {
          this.patientBaseArr = v.data;
        }).catch((data) => {

        });
      } else {
        this.axios({
          url: 'select-patient-sId',
          params: {sId: '', ksId: this.staff.ksId, text: this.patientQueryText,is:1}
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
      this.patientBaseObj.ptPrice = obj.ptPrice;
      this.patientBaseObj.ptPayMoney = obj.ptPayMoney;
      this.patientBaseObj.ptIphone = obj.ptIphone;
      this.patientBaseObj.ptInDay = parseFloat((new Date().getTime() - Date.parse(obj.ptInDate))  / (1*24*60*60*1000)).toFixed(0) + '天';//算出入院天数
      this.patientBaseObj.ptSickNumber = obj.ptSickNumber;

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
        this.selectLookDoctorEnjoinTable();
      }else if(this.maxCard == '检验项目'){

      }else if(this.maxCard == '查看病历'){
        this.$refs.lokkCaseHistoryRef.changeCase();

      }else if(this.maxCard == '检验结果'){
        this.$refs.resultFun.initResultMan();
      }
    },







    //========================================================================格式化日期方法
    //格式化日期  thistime时间  fmt格式
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
    //判断当前选择的病人
    tablePatientBaseRowClassName({row, rowIndex}) {
      if (this.patientBaseObj.ptNo == row.ptNo) {
        return 'success';
      }
    },
    //判断医嘱是否停用 如果停用的表格就标红
    tableDoctorEnjoinDetailsRowClassName({row, rowIndex}) {
      if (row.desEndDate != '' && row.desEndDate != null) {
        if(this.formatDate(row.desEndDate, 'yyyy-MM-dd') <= this.formatDate(new Date(), 'yyyy-MM-dd')){
          return 'tyyz';
        }
      }else if(row.deLongorshort == 2){
        return 'tyyzs';
      }
    },
    //判断医嘱是否停用 如果停用的表格就标红
    // tableDoctorEnjoinRowClassName({row, rowIndex}) {
    //   if (row.deEndDate != '' && row.deEndDate != null) {
    //     if(this.formatDate(row.deEndDate, 'yyyy-MM-dd') <= this.formatDate(new Date(), 'yyyy-MM-dd')){
    //       return 'tyyz';
    //     }
    //   }else if(row.deLongorshort == 2){
    //       return 'tyyzs';
    //   }
    // },


    //添加病例方法
    addCaseHistory(){
      this.$refs.caseRef.caseShow();
    },

    //===========================================================分页方法
    //====病人分页方法
    patientSizeChange: function(size) {
      this.patientPageSize = size;
    },
    patientCurrentChange: function(currentPage) {
      this.patientCurrentPage = currentPage;
    },

    //====医嘱分页方法
    doctorEnjoinSizeChange: function(size) {
      this.doctorEnjoinPageSize = size;
    },
    doctorEnjoinCurrentChange: function(currentPage) {
      this.doctorEnjoinCurrentPage = currentPage;
    },

    //====医嘱详情分页方法
    doctorEnjoinDetailsSizeChange: function(size) {
      this.doctorEnjoinDetailsPageSize = size;
    },
    //住院申请Current变了调用
    doctorEnjoinDetailsCurrentChange: function(currentPage) {
      this.doctorEnjoinDetailsCurrentPage = currentPage;
    },

    //时间方法
    appendZero(obj) {
      if (obj < 10) {
        return "0" + obj;
      } else {
        return obj;
      }
    },

  },
  created() {
    this.staff = this.$store.state.token.list;//将登录存入的值在取出来
    this.operationInit();//初始化页面数据
    //初始化当前时间
    var vm = this;
    vm.date_value = setInterval(() => {
      var y = new Date().getFullYear();
      var m = vm.appendZero(new Date().getMonth() + 1);
      var d = vm.appendZero(new Date().getDate());
      var ho = vm.appendZero(new Date().getHours());
      var mi = vm.appendZero(new Date().getMinutes());
      var miao  =vm.appendZero(new Date().getSeconds())
      //修改数据date
      vm.currentTime = y + "/" + m + '/' + d + ' ' + ho + ':' + mi+':'+ miao;
    }, 1000);
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

/deep/ .el-table .tyyz {
  /*background: #FF9C9C;*/
  color: #FF4545;
}

/deep/ .el-table .tyyzs {
  /*background: #FF9C9C;*/
  color: blue;
}

/deep/ .el-divider--horizontal{
  margin: 10px 0px;
}

::v-deep .el-table tbody tr:hover > td {
  background-color: transparent;
}
</style>
