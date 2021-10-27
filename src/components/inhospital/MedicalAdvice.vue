<template>
  <el-container style="height: 100%;">
    <el-container style="height: 100%;">

      <el-aside width="350px" style="background-color: #E7ECF1;color: #333;"> <!-- 右边 -->

        <el-row style="height: 30px;background-color: #D3DCE6;line-height: 30px">
          <el-col :span="3" >
            <el-button type="success"  @click="pushUrl('/home')"  size="mini">退出</el-button>
          </el-col>

          <el-col  :offset="6" :span="14">
            护士工作站
          </el-col>
        </el-row>

        <el-row style="height: 30px;background-color: #D3DCE6;line-height: 30px">
          <el-col style="color: red" :offset="7" :span="14">
            {{currentTime}}
          </el-col>
        </el-row>

        <el-row style="height: 30px;background-color: #D3DCE6;line-height: 30px">
          <el-col  :offset="8" :span="14">
            <span style="font-size: 14px">所属科室 ：</span><span style="font-size: 14px">{{staffKsName}}</span>
          </el-col>
        </el-row>

        <el-row style="height: 30px;background-color: #D3DCE6;line-height: 30px">
          <el-col :offset="8" :span="14">
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
                height="443px"
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
        <el-header height="120px"  style=" background-color: #B3C0D1;color: #333;padding-top: 15px;"><!-- 头部信息按钮部分-->
          <el-form  >
            <el-row>
              <el-col :span="4">
                <el-form-item label="住院号" label-width="70px" style="margin-bottom: 0px">
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
                <el-form-item label="管理护士" label-width="80px"  style="margin-bottom: 0px">
                  <el-input size="mini" class="patientText" v-model="patientBaseObj.sName" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row style="margin-top: 15px">
              <el-col  :span="6">
                <el-form-item label="入院时间" label-width="80px" style="margin-bottom: 0px">
                  <el-input  size="mini" class="patientText" v-model="patientBaseObj.ptInDate"  disabled></el-input>
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
              <el-col :span="4">
                <el-form-item label="科室" label-width="50px"  style="margin-bottom: 0px">
                  <el-input class="patientText" size="mini" v-model="patientBaseObj.ksName"  disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="病床" label-width="50px"  style="margin-bottom: 0px">
                  <el-input class="patientText" size="mini" v-model="patientBaseObj.bdName"   disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-header>






        <el-main  style="background-color: #E9EEF3;color: #333;padding:5px;" ><!-- 主体页面========================================================================-->
          <el-tabs @tab-click="patientSwitchFunction" v-model="maxCard" type="border-card" >

<!--            &lt;!&ndash;==========================================================================需要执行的医嘱&ndash;&gt;-->
            <el-tab-pane name="执行医嘱" :key="'执行医嘱'" label="执行医嘱">
              <el-form>
                <el-row style="height: 45px; line-height: 45px">

                  <el-col :span="2">
                      <el-form-item>
                        <el-button :disabled="!patientBaseObj.ptName != ''" type="primary" @click="doctorEnjoinExecuteAll" size="mini">全部执行</el-button>
                      </el-form-item>
                  </el-col>

                  <el-col :offset="1" :span="2">
                    <el-form-item>
                      <el-button  :disabled="!patientBaseObj.ptName != ''" type="primary" @click="doctorEnjoinExecuteSelectChange" size="mini">执行已选择</el-button>
                    </el-form-item>
                  </el-col>


                  <el-col :offset="1" :span="3">
                    <el-form-item>
                      <el-button  :disabled="!patientBaseObj.ptName != ''" type="primary" @click="openPayText" size="mini">新增费用信息</el-button>
                    </el-form-item>


                    <!--========================================================费用信息弹框========================-->
                    <el-dialog title="费用信息" v-model="isShowAddPayText" @close="closePatientPay">

                      <el-form :rules="patientPayObjRules" ref="patientPayObj" :model="patientPayObj">
                        <el-row>
                          <el-col>
                            <el-form-item label="当前操作人：" label-width="100px">
                              <el-input readonly disabled v-model="staff.sname"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>

<!--                        <el-row>-->
<!--                          <el-col  :span="12">-->
<!--                            <el-form-item label="费用内容：" label-width="100px">-->
<!--                              <el-input type="textarea" v-model="patientPayObj.poText" placeholder="扣费内容"></el-input>-->
<!--                            </el-form-item>-->
<!--                          </el-col>-->

                          <el-row>

                            <el-col  :span="12">
                              <el-form-item prop="poText" label="费用内容：" label-width="100px">
                                <el-select
                                    v-model="patientPayObj.poText"
                                    filterable
                                    @blur="selectPayBlurFun"
                                    placeholder="请选择或者输入">
                                  <el-option
                                      v-for="item in selectCostName"
                                      :key="item.derId"
                                      :label="item.derIs"
                                      :value="item.derIs">
                                  </el-option>
                                </el-select>
                               </el-form-item>
                            </el-col>


                          <el-col :offset="1" :span="8">
                            <el-form-item prop="poPrice" label="费用：" label-width="70px">
                              <el-input onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"  v-model="patientPayObj.poPrice"  placeholder="费用"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>

                      </el-form>

                      <template #footer>
                        <el-row>
                          <el-col :span="18"></el-col>
                          <el-col :span="2">
                            <el-button @click="addPatientPay" size="small" type="primary">确定</el-button>
                          </el-col>
                          <el-col :span="1"></el-col>
                          <el-col :span="2">
                            <el-button @click="closePatientPay"  size="small" type="danger">取消</el-button>
                          </el-col>
                          <el-col :span="1"></el-col>
                        </el-row>
                      </template>

                    </el-dialog>

                  </el-col>




<!--                  <el-col :offset="1" :span="2">-->
<!--                    <el-form-item>-->
<!--                      <el-button :disabled="!patientBaseObj.ptName != ''" type="success" size="mini">打印已选择</el-button>-->
<!--                    </el-form-item>-->
<!--                  </el-col>-->

                  <el-col :offset="4" :span="5">
                    <el-form-item>
                      <el-tag type="info" effect="dark" >可执行</el-tag>&nbsp;
                      <el-tag effect="dark">已执行</el-tag>&nbsp;
                      <el-tag type="danger" effect="dark">临时医嘱</el-tag>&nbsp;
                    </el-form-item>
                  </el-col>

                </el-row>
              </el-form>
              <!--查看所有详表医嘱-->
              <el-row>
                <el-col>
                  <el-table
                      @selection-change="doctorEnjoinSelectChange"
                      :data="doctorEnjoinDetailsArr.slice((doctorEnjoinDetailsCurrentPage-1)*doctorEnjoinDetailsPageSize,doctorEnjoinDetailsCurrentPage*doctorEnjoinDetailsPageSize)" :row-class-name="tableDoctorEnjoinExecute"  height="415px" size="small" >
                                        <el-table-column :selectable='patientDoctorExecuteSelection'  type="selection" width="50px"></el-table-column>

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
            </el-tab-pane>

            <el-tab-pane name="执行记录" :key="'执行记录'" label="执行记录">
                <DoctorExecuteRecord ref="DoctorExecuteRecord" :patient-obj="patientBaseObj"></DoctorExecuteRecord>
            </el-tab-pane>

          </el-tabs>


        </el-main>

      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import DoctorExecuteRecord from "./MedicalAdvice/DoctorExecuteRecord.vue";

export default{
  components:{DoctorExecuteRecord},

  data(){
    return{
      //================================================校验
      patientPayObjRules: {//非空校验
        poText:[{required:true,message:"费用内容不能为空！",trigger:'change'}],
        poPrice:[{required:true,message:"费用不能为空！",trigger:'blur'}],
      },
      //========================================================================员工数据
      staff:{},//员工对象


      //========================================================================病人数据
      patientBaseObj:{//病人申请信息对象
      },
      patientQueryText:'',//病人查询值
      patientBaseArr:[],//病人数组
      tabPaneIs:'0',//选中病人查看
      currentTime:'',

      //=========================医嘱卡片数据
      maxCard:'执行医嘱',//卡片当前位置


      //====================================================================科室药品库存调拨记录数据
      deptDrugAllotObj:{//科室药品库存调拨记录对象

      },
      deptDrugAllotAll:[],//科室药品库存调拨记录数组
      staffKsName:'',
      //============================================病人费用信息
      isShowAddPayText:false,//是否显示病人费用信息弹框
      patientPayObj:{//病人新开费用对象
        poText:'',
        poSid:'',
        poPrice:'',
        poPtNo:''
      },
      selectCostName:[],//费用名称查询数组


      //=====================================================================执行医嘱数据
      doctorEnjoinDetailsArr:[],//医嘱详情数组
      doctorEnjoinSelectDetailsArr:[],//选中的医嘱数组

      // //=====================================================================科室药品库存数据
      // drugPharmacyObj:{
      //   dpId: '',//编号
      //   ksId:'', //连接科室编号
      //   dpInventory:'',//库存数量
      //   drugId:'',//药品编号
      //   dpDrugPrice:'',//药品价格
      //   dpDrugUnit:'',//药品单位名称
      //   dpDrugName:''//药品的名称
      // },//药品库存对象
      // drugPharmacyArr:[],//药品库存数组
      // //=============双击科室药品数据
      // dbclickPharmacyObj:{},



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
      // window.tableDbText: this.tableDbText(),



    }
  },
  mounted() {
    window.tableDbTexts = this.tableDbText;
  },
  methods: {
    //========================================================================页面初始化数据方法
    operationInit() {
      console.log(this.staff)
      //初始化病人数据
      this.axios({
        url: 'select-patient-sId',
        params: {sId: this.staff.sid, ksId:this.staff.ksId, text:this.patientQueryText,is:2}
      }).then((v) => {
        this.patientBaseArr = v.data;
      }).catch();
      this.axios({url:'select-ks-obj',params:{ksId:this.staff.ksId}}).then((v)=>{
        this.staffKsName = v.data.ksName;
      }).catch();

      //初始化科室药品库存数据
      this.axios({
        url:'select-drug-pharmacyByKsId',
        params:{ksId:this.staff.ksId}
      }).then((v)=>{
        this.drugPharmacyArr = v.data;
      });

    },
    //
    // tableDbEdit(row, column, cell, event) {
    //   if (column.label == "库存警戒线") {
    //     let cellInput = document.createElement("input");
    //     cellInput.value = row.dpGuard;
    //     cellInput.setAttribute("type", "text");
    //     cellInput.style.width = "40%";
    //     cellInput.style.position = 'absolute';
    //     cellInput.style.top = '12px';
    //     cell.appendChild(cellInput);
    //     cellInput.focus();
    //     cellInput.onblur = function() {
    //       // alert(row.dpId)
    //
    //       tableDbTexts(row,cellInput,event,cell);
    //     };
    //   }
   //  // },
   // tableDbText(row,cellInput,event,cell){
   //    // alert('s')
   //    this.axios.post('update-byDpId-dpGuard',{bpId:row.dpId,dpGuard:cellInput.value}).then((v)=>{
   //      // event.target.innerHTML = cellInput.value;
   //      // alert(cellInput.value)
   //      cell.removeChild(cellInput);
   //      //初始化科室药品库存数据
   //      this.axios({
   //        url:'select-drug-pharmacyByKsId',
   //        params:{ksId:this.staff.ksId}
   //      }).then((v)=>{
   //        this.drugPharmacyArr = v.data;
   //        console.log(this.drugPharmacyArr)
   //      });
   //    }).catch();
   //  },

    //=======================================================================执行医嘱
    //全部执行
    doctorEnjoinExecuteAll(){
      this.axios.post('addDoctorEnjoinExecute',{doctorEnjoinList:this.doctorEnjoinSelectDetailsArr.length == 0 ? this.doctorEnjoinDetailsArr : this.doctorEnjoinSelectDetailsArr,sId:this.staff.sid}).then((v)=>{
        console.log(v.data);
        this.$message({
          type: 'success',
          message: '执行成功'
        });
        this.patientChange();
      })
    },
    //选中医嘱调用
    doctorEnjoinSelectChange(row){
      console.log(row)
      this.doctorEnjoinSelectDetailsArr = row;
    },
    //执行已选择
    doctorEnjoinExecuteSelectChange(){
      if(this.doctorEnjoinSelectDetailsArr.length == 0){
        this.$message({
          type: 'error',
          message: '未选中医嘱信息'
        });
        return;
      };
      this.axios.post('addDoctorEnjoinExecute',{doctorEnjoinList:this.doctorEnjoinSelectDetailsArr,sId:this.staff.sid}).then((v)=>{
        console.log(v.data);
        this.$message({
          type: 'success',
          message: '执行成功'
        });
        this.patientChange();
      })
    },



    //=======================================================================查看医嘱方法
    // //切换查看医嘱表格
    // selectLookDoctorEnjoinTable(){
    //   if(this.patientBaseObj.ptNo != undefined){
    //     if(this.isMainOrMinor == 2){
    //       this.axios({url:'select-doctorEnjoin-ByPtNo',params:{ptNo:this.patientBaseObj.ptNo}}).then((v)=>{
    //         console.log(v.data);
    //         this.doctorEnjoinArr = v.data;
    //       }).catch((data)=>{})
    //     }else{
    //       this.axios({url:'select-doctorEnjoinDetails-ByPtNo',params:{ptNo:this.patientBaseObj.ptNo}}).then((v)=>{
    //         console.log(v.data)
    //         this.doctorEnjoinDetailsArr = v.data;
    //       })
    //     }
    //   }
    // },

    //费用内容选择器失去焦点时调用
    selectPayBlurFun(e){
      console.log(e.target.value)
      this.patientPayObj.poText = e.target.value;
    },

    //=======================================================================表格双击事件
    dbclickDrugPharmacy(obj){
      this.dbclickPharmacyObj = obj;
    },

    //========================================================================病人方法
    //==切换我的病人和本科病人是调用
    patientSwitchKsOrI() {// is 1是查看自己的病人 不是1就是查看本科室的病人
      if (this.tabPaneIs == 0) {
        this.axios({
          url: 'select-patient-sId',
          params: {sId: this.staff.sid, ksId:this.staff.ksId, text: this.patientQueryText,is:2}
        }).then((v) => {
          this.patientBaseArr = v.data;
        }).catch((data) => {

        });
      } else {
        this.axios({
          url: 'select-patient-sId',
          params: {sId: '', ksId: this.staff.ksId, text: this.patientQueryText,is:2}
        }).then((v) => {
          this.patientBaseArr = v.data;
        }).catch((data) => {
        });
      }
    },
    pushUrl(path){/* 页面跳转 */
      this.$confirm('是否返回主页？').then(_ => {
        this.$router.push(path);
      }).catch(_ => {});
    },


    //选中病人方法
    async patientChecked(obj) {
      console.log(obj);

      this.patientBaseObj.ptNo = obj.ptNo;
      this.patientBaseObj.ptName = obj.ptName;
      this.patientBaseObj.ptInDate = obj.ptInDate;
      this.patientBaseObj.ptHomeAdder = obj.ptHomeAdder;
      this.patientBaseObj.ptDiagnoseName = obj.ptDiagnoseName;
      this.patientBaseObj.ptAge = obj.ptAge;
      this.patientBaseObj.ptSex = obj.ptSex;
      this.patientBaseObj.ksName = obj.ksName;
      this.patientBaseObj.ptIphone = obj.ptIphone;
      this.patientBaseObj.sName = obj.staff.sname;
      this.patientBaseObj.bdName = obj.bed.bdName;
      this.patientBaseObj.ptInDay = parseFloat((new Date().getTime() - Date.parse(obj.ptInDate))  / (1*24*60*60*1000)).toFixed(0) + '天';//算出入院天数
      this.patientChange();
      this.patientSwitchFunction();
    },
    //刷新病人医嘱
    patientChange(){
      this.axios({url:'selectDoctorEnjoinDetailsByPtNo',params:{ptNo:this.patientBaseObj.ptNo}}).then((v)=>{
        this.doctorEnjoinDetailsArr = v.data;
      }).catch();
    },

    //===========================新增费用信息方法
    //打开新开费用弹框
    openPayText(){
      this.isShowAddPayText = true;//显示病人费用信息弹框
      this.axios({url:'select-costName'}).then((v)=>{
        this.selectCostName = v.data;
        console.log(v.data)
      }).catch();
      this.patientPayObj.poPtNo = this.patientBaseObj.ptNo;//病人编号
      this.patientPayObj.poSid = this.staff.sid;//员工编号
    },
    //新增病人费用信息方法
    addPatientPay(){
      this.$refs['patientPayObj'].validate((valid)=>{
        if(valid){
          console.log(this.patientPayObj)
          this.axios.post("addPatientPay",this.patientPayObj).then((v)=>{
            this.$message({
              type: 'success',
              message: '添加成功！！'
            });
            this.isShowAddPayText = false;
          }).catch();
        }
      })
    },
    //关闭新增病人费用弹框
    closePatientPay(){
      this.$refs['patientPayObj'].resetFields();
      this.isShowAddPayText = false;//关闭病人费用信息弹框
      this.patientPayObj = {//病人新开费用对象
        poText:'',
        poSid:'',
        poPrice:'',
        poPtNo:''
      };
    },


    //========================================================================切换操作时调用方法
    patientSwitchFunction(){
      if(this.maxCard == '执行医嘱'){


      }else if(this.maxCard == '执行记录'){
        this.$refs.DoctorExecuteRecord.initExecuteRecord();
      }
    },
    //是否禁用医嘱复选框
    patientDoctorExecuteSelection(row){
      if(this.formatDate(row.desPresentDate, 'yyyy-MM-dd') == this.formatDate(new Date(), 'yyyy-MM-dd') || row.desIs == 2){
        return false;
      }else{
        return true;
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

    //==========================================================渲染表格数据
    //判断当前选择的病人
    tablePatientBaseRowClassName({row, rowIndex}) {
      if (this.patientBaseObj.ptNo == row.ptNo) {
        return 'success';
      }
    },
    //判断医嘱是否已经执行
    tableDoctorEnjoinExecute({row, rowIndex}){
      if(this.formatDate(row.desPresentDate, 'yyyy-MM-dd') == this.formatDate(new Date(), 'yyyy-MM-dd')){
        return 'doctorErro';
      }else if(row.deLongorshort == 2){
        return  'doctorErros'
      }
    },
    //判断科室药品是否低于库存警戒线
    tablezyDrugPharmacyGuard({row, rowIndex}) {
      //如果该药品没有设置库存警戒线就设置表格字体为黄色
      if(row.dpGuard == '' || row.dpGuard == null){
        return 'noGuard';
      }
        if(row.dpGuard > row.dpInventory){
          return 'tyyz';
        }
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
    this.staff = this.$store.state.token.list;//将登录存入的值在取出来
    this.operationInit();//初始化页面数据
    //初始化当前时间

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

/deep/ .el-table .doctorErro {
  color: blue;
}

/deep/ .el-table .doctorErros {
  color: red;
}

/deep/ .el-table .tyyz {
  /*background: #FF9C9C;*/
  color: #FF4545;
}

/deep/ .el-table .noGuard {
  color: blue;
}

/deep/ .el-divider--horizontal{
  margin: 10px 0px;
}

::v-deep .el-table tbody tr:hover > td {
  background-color: transparent;
}
</style>
