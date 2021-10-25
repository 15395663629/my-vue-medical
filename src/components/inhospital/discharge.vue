<template>
	<!--=============================================选择住院申请病人弹框===================================-->
	<el-dialog title="选择出院申请病人" @close="closeSelectPatient" v-model="isShowXZBR">

    <el-row style="margin-bottom: 10px">
      <el-col :offset="7" :span="8">
        <el-input size="mini" v-model="search" placeholder="病人住院号或者病人名称"></el-input>
      </el-col>
      <el-col :span="1" >
        <el-button size="mini" @click="dischargeInIt" icon="el-icon-search" type="primary" ></el-button>
      </el-col>
    </el-row>


		<el-table
		    ref="multipleTable"
		    :data="patientBaseArr"
		    tooltip-effect="dark"
        height="372px"
		    style="width: 100%"
        size="mini"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      label="病人编号"
			  prop="ptNo">
		    </el-table-column>
		    <el-table-column
		      prop="zyPatientBase.ptName"
		      label="病人名称">
		    </el-table-column>
		    <el-table-column
		      prop="dgaDate"
		      label="申请时间">
		    </el-table-column>
			<el-table-column
			  prop="sname"
			  label="申请人">
			</el-table-column>
			
			<el-table-column label="操作">
				<template  #default='scope'>
					<el-button size="mini" type="success" @click="addDischarge(scope.row)" >选择</el-button>
				</template>
			</el-table-column>
			
		  </el-table>
<!--		  &lt;!&ndash;分页插件&ndash;&gt;-->
<!--		   <el-pagination-->
<!--           style="text-align: center;"-->
<!--		        @size-change="totalCut"-->
<!--		        @current-change="pageCut"-->
<!--		        :current-page="1"-->
<!--		        :page-sizes="[2,4,6,8,10]"-->
<!--		        :page-size="size"-->
<!--		        layout="total, sizes, prev, pager, next, jumper"-->
<!--		        :total="total">-->
<!--       </el-pagination>-->
	</el-dialog>
	
	
	
	
	<!--=============================================新增住院申请信息弹框===================================-->
	<el-dialog top="20px"  title="出院结算" @close="colseDischargeText" v-model="isShowZY">
    <el-tabs   @tab-click="costTabsClick" v-model="costTabs" >

      <el-tab-pane style="margin-top: 12px" name="病人信息" :key="'病人信息'" label="病人信息">

        <el-form>
          <el-row>
            <el-col :offset="1" :span="7">
              <el-form-item label="病人姓名" label-width="80px">
                <el-input disabled :value="patientBaseObj.ptName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button @click="isShowXZBR = true" type="primary" icon="el-icon-user-solid"></el-button>
            </el-col>
            <el-col :offset="4" :span="9">
              <el-form-item label="住院科室" label-width="80px">
                <el-input :value="patientBaseObj.ksName" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :offset="1" :span="9">
              <el-form-item label="病人性别" label-width="80px">
                <el-input :value="patientBaseObj.ptSex" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col :offset="3" :span="9">
              <el-form-item label="病床名称" label-width="80px">
                <el-input :value="patientBaseObj.bdName" disabled></el-input>
              </el-form-item>
            </el-col>

          </el-row>


          <el-row>
            <el-col :offset="1" :span="9">
              <el-form-item label="住院天数" label-width="80px">
                <el-input :value="patientBaseObj.ptDay" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col :offset="3" :span="7">
              <el-form-item label="检验费用" label-width="80px">
                <el-input :value="patientBaseObj.checkPrice" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button @click="changeTabs('化验项目费用')" type="success" icon="el-icon-right"></el-button>
            </el-col>
          </el-row>


          <el-row>
            <el-col :offset="1" :span="7">
              <el-form-item label="医嘱费用" label-width="80px">
                <el-input :value="patientBaseObj.drugPrice" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button  @click="changeTabs('医嘱药品费用')" type="success" icon="el-icon-right"></el-button>
            </el-col>

            <el-col :offset="4" :span="7">
              <el-form-item label="缴费明细" label-width="80px">
                <el-input :value="patientBaseObj.payPrice" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button @click="changeTabs('缴费明细')" type="success" icon="el-icon-right"></el-button>
            </el-col>

          </el-row>


          <el-row>
            <el-col :offset="1" :span="7">
              <el-form-item label="手术费用" label-width="80px">
                <el-input :value="patientBaseObj.ssPrice" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button @click="changeTabs('手术费用')" type="success" icon="el-icon-right"></el-button>
            </el-col>

            <el-col :offset="4" :span="7">
              <el-form-item label="病床费用" label-width="80px">
                <el-input :value="patientBaseObj.bedPrice" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button @click="changeTabs('床位费用')" type="success" icon="el-icon-right"></el-button>
            </el-col>
          </el-row>

          <el-row>
            <el-col :offset="1" :span="9">
              <el-form-item label="已交金额" label-width="80px">
                <el-input :value="patientBaseObj.ptPayMoney" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="3" :span="9">
              <el-form-item label="余额" label-width="80px">
                <el-input :value="patientBaseObj.ptPrice" disabled></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :offset="1" :span="9">
              <el-form-item :label="patientBaseObj.ptPrice > 0 ? '应退金额' : '应交金额'" label-width="80px">
                <el-input :value="patientBaseObj.ptPrice > 0 ? patientBaseObj.ptPrice : -patientBaseObj.ptPrice" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col v-if="patientBaseObj.ptPrice < 0" :offset="3" :span="9">
              <el-form-item label="实交金额" label-width="80px">
                <el-input onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')" v-model="dischargeObj.dgSjPrice" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

      </el-tab-pane>


      <el-tab-pane style="margin-top: 12px" name="医嘱药品费用" :key="'医嘱药品费用'" label="医嘱药品费用">

        <el-table  height="434px"
                  ref="multipleTable"
                  :data="patientCostArr"
                  size="mini"
                  tooltip-effect="dark"
                  style="width: 100%">
          <el-table-column
              label="费用编号"
              prop="pcdId"
          >
          </el-table-column>
          <el-table-column
              prop="name"
              label="费用名称">
          </el-table-column>

          <el-table-column
              prop="sname"
              label="操作员工">
          </el-table-column>

          <el-table-column
              prop="pcdDate"
              label="扣除时间">
          </el-table-column>

          <el-table-column
              label="费用价格">
            <template #default="obj">
              {{obj.row.pcdPrice.toFixed(2)}}
            </template>
          </el-table-column>

        </el-table>

      </el-tab-pane>

      <el-tab-pane style="margin-top: 12px" name="床位费用" :key="'病床费用'" label="床位费用">
        <el-table  height="434px"
                  ref="multipleTable"
                  :data="patientCostArr"
                  size="mini"
                  tooltip-effect="dark"
                  style="width: 100%">
          <el-table-column
              label="费用编号"
              prop="pcdId"
          >
          </el-table-column>
          <el-table-column
              prop="name"
              label="费用名称">
          </el-table-column>

          <el-table-column
              prop="sname"
              label="操作员工">
          </el-table-column>

          <el-table-column
              prop="pcdDate"
              label="扣除时间">
          </el-table-column>

          <el-table-column
              label="费用价格">
            <template #default="obj">
              {{obj.row.pcdPrice.toFixed(2)}}
            </template>
          </el-table-column>


        </el-table>
      </el-tab-pane>

      <el-tab-pane style="margin-top: 12px" name="化验项目费用" :key="'检验费用'" label="化验项目费用">
        <el-table height="434px"
                  ref="multipleTable"
                  :data="patientCostArr"
                  size="mini"
                  tooltip-effect="dark"
                  style="width: 100%">
          <el-table-column
              label="费用编号"
              prop="pcdId"
          >
          </el-table-column>
          <el-table-column
              prop="name"
              label="费用名称">
          </el-table-column>

          <el-table-column
              prop="sname"
              label="操作员工">
          </el-table-column>

          <el-table-column
              prop="pcdDate"
              label="扣除时间">
          </el-table-column>

          <el-table-column
              label="费用价格">
            <template #default="obj">
              {{obj.row.pcdPrice.toFixed(2)}}
            </template>
          </el-table-column>


        </el-table>
      </el-tab-pane>

      <el-tab-pane style="margin-top: 12px" name="手术费用" :key="'手术费用'" label="手术费用">

        <el-table  height="434px"
                   ref="multipleTable"
                   :data="patientCostArr"
                   size="mini"
                   tooltip-effect="dark"
                   style="width: 100%">
          <el-table-column
              label="费用编号"
              prop="pcdId"
          >
          </el-table-column>
          <el-table-column
              prop="name"
              label="费用名称">
          </el-table-column>

          <el-table-column
              prop="sname"
              label="操作员工">
          </el-table-column>

          <el-table-column
              prop="pcdDate"
              label="扣除时间">
          </el-table-column>

          <el-table-column
              label="费用价格">
            <template #default="obj">
              {{obj.row.pcdPrice.toFixed(2)}}
            </template>
          </el-table-column>


        </el-table>

      </el-tab-pane>

      <el-tab-pane style="margin-top: 12px" name="缴费明细" :key="'缴费明细'" label="缴费明细">

        <el-table size="mini"
                  :data="payArr"
                  height="434px"
                  style="width: 100%">
          <el-table-column
              prop="pyId"
              label="缴费编号"
              width="180">
          </el-table-column>
          <el-table-column prop="pyPrice"
                           label="缴费金额">
          </el-table-column>
          <el-table-column
              prop="pyDate"
              label="缴费时间">
          </el-table-column>
          <el-table-column
              prop="pyWay"
              label="缴费方式">
          </el-table-column>
          <el-table-column prop="staff.sname"
                           label="操作护士">
          </el-table-column>
        </el-table>

      </el-tab-pane>
    </el-tabs>

		
		<template #footer>
				<el-button @click="addDischargeHT" size="mini" type="primary">确定</el-button>
				<el-button @click="colseDischargeText" type="danger" size="mini">取消</el-button>
		</template>
	</el-dialog>
	

  <!--=============================================查询条件===================================-->
  <el-row style="margin:0px 0px 10px 30px;padding-top: 10px;">

    <el-col  :span="1">
      <el-button @click="isShowZY = true" size="mini" type="primary">新增</el-button>
    </el-col>


    <el-col :offset="2" :span="5">
      <el-input size="mini" v-model="doctorEnjoinWhere.searchLike" placeholder="病人姓名或者住院号"></el-input>
    </el-col>
    <el-col  :span="1">
      <el-button size="mini" @click="dischargeInIt" icon="el-icon-search" type="primary" ></el-button>
    </el-col>

    <el-col :offset="1" style="margin-top: 6px" :span="4">
      <el-radio-group v-model="doctorEnjoinWhere.doctorType"   @change="dischargeInIt">
        <el-radio :label="2">入院日期</el-radio>
        <el-radio :label="1">出院日期</el-radio>
      </el-radio-group>
    </el-col>

    <el-col  :span="8">
      &nbsp;<span style="font-size: 12px;">日期区间：</span>&nbsp;

      <el-date-picker style="width: 140px" @change="dischargeInIt" v-model="doctorEnjoinWhere.startDate"
                      type="date"
                      size="mini"
                      value-format="YYYY-MM-DD"
                      placeholder="日期">
      </el-date-picker>
      &nbsp;<span style="font-size: 12px;">至</span>&nbsp;
      <el-date-picker style="width: 140px" @change="dischargeInIt" v-model="doctorEnjoinWhere.endDate"
                      type="date"
                      size="mini"
                      value-format="YYYY-MM-DD"
                      placeholder="日期">
      </el-date-picker>
    </el-col>

  </el-row>
	<!--=============================================住院登记表格===================================-->
	<el-row>
		<el-col>
			<el-table :data="dischargeArr"
          height="450px"
			    style="width: 100%">
        <el-table-column align="center" label="出院病人">


          <el-table-column
              prop="ptNo"
              label="住院号">
          </el-table-column>

          <el-table-column  label="姓名">
            <template #default="scope" >
              <el-popover width="300" effect="light"   trigger="hover" placement="top">
                <template #default >
                  <p>姓名: {{ scope.row.patientBase.ptName }}</p>
                  <p>年龄: {{ scope.row.patientBase.ptAge }}</p>
                  <p>性别: {{ scope.row.patientBase.ptSex }}</p>
                  <p>电话: {{ scope.row.patientBase.ptIphone }}</p>
                  <p>住址: {{ scope.row.patientBase.ptHomeAdder }}</p>
                </template>
                <template #reference>
                  <div class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.patientBase.ptName }}</el-tag>
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
              prop="patientBase.ptInDate"
              label="入院日期">
          </el-table-column>
          <el-table-column
              prop="patientBase.ptOutDate"
              label="出院日期">
          </el-table-column>
          <el-table-column
              prop="dgDay"
              label="住院天数">
          </el-table-column>
          <el-table-column prop="dgDepositPrice" label="总费用"></el-table-column>
          <el-table-column label="操作">
            <template #default="obj">
              <el-button type="primary" @click="showPay(obj.row)" size="mini">查看全部费用</el-button>
            </template>
          </el-table-column>

        </el-table-column>
			  </el-table>
		</el-col>
	</el-row>
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







  <!--=============================================费用明细===================================-->
  <el-dialog width="55%"  title="费用明细" v-model="isPayRecordShow" >

    <el-row style="margin-bottom:10px">

      <el-col  :span="1">
        <el-button @click="emptyPayWhere" type="primary" size="mini">清空条件</el-button>
      </el-col>

      <el-col :offset="2" :span="7">
        <span style="font-size: 12px;">操作员:</span>&nbsp;
        <el-select @change="costTabsClicks" style="width: 160px" v-model="doctorEnjoinWheres.sIdArr" multiple collapse-tags size="mini">
          <el-option v-for="st in staffArr"
                     :label="st.sname"
                     :value="st.sid"/>
        </el-select>
      </el-col>

      <el-col  :span="12">
        &nbsp;<span style="font-size: 12px;">日期区间：</span>&nbsp;

        <el-date-picker style="width: 140px" @change="costTabsClicks" v-model="doctorEnjoinWheres.startDate"
                        type="date"
                        size="mini"
                        value-format="YYYY-MM-DD"
                        placeholder="日期">
        </el-date-picker>
        &nbsp;<span style="font-size: 12px;">至</span>&nbsp;
        <el-date-picker style="width: 140px" @change="costTabsClicks" v-model="doctorEnjoinWheres.endDate"
                        type="date"
                        size="mini"
                        value-format="YYYY-MM-DD"
                        placeholder="日期">
        </el-date-picker>
      </el-col>

      <el-col  :span="1">
        <el-button @click="onStart" type="success" size="mini">打印</el-button>
      </el-col>

    </el-row>

    <el-row>

      <el-col>

        <el-tabs v-model="costTabss" @tab-click="costTabsClicks">
          <el-tab-pane label="全部费用" name="全部费用"/>
          <el-tab-pane label="医嘱药品费用" name="医嘱药品费用" />
          <el-tab-pane label="床位费用" name="床位费用" />
          <el-tab-pane label="化验项目费用" name="化验项目费用" />
          <el-tab-pane label="其它费用" name="其它费用" />
          <el-tab-pane label="手术费用" name="手术费用" />
          <el-tab-pane  label="病人缴费" name="病人缴费" >

            <el-table size="mini"
                      :data="payArrs"
                      id="dys"
                      height="340px"
                      style="width: 100%">
              <el-table-column
                  prop="pyId"
                  label="缴费编号"
                  width="180">
              </el-table-column>
              <el-table-column prop="pyPrice"
                               label="缴费金额">
              </el-table-column>
              <el-table-column
                  prop="pyDate"
                  label="缴费时间">
              </el-table-column>
              <el-table-column
                  prop="pyWay"
                  label="缴费方式">
              </el-table-column>
              <el-table-column prop="staff.sname"
                               label="操作护士">
              </el-table-column>
            </el-table>
            <!--分页插件-->
            <!--        <el-pagination-->
            <!--            style="text-align: right;"-->
            <!--            @size-change="paySizeChange"-->
            <!--            @current-change="payCurrentChange"-->
            <!--            :current-page="payCurrent"-->
            <!--            :page-sizes="[2,4,6,8,10]"-->
            <!--            :page-size="paySize"-->
            <!--            layout="total, sizes, prev, pager, next, jumper"-->
            <!--            :total="payArr.length">-->
            <!--        </el-pagination>-->

          </el-tab-pane>


        </el-tabs>
        <el-table height="340px" v-if="isShowCostTables"
                  ref="multipleTable"
                  :data="patientCostArr"
                  id="dy"
                  size="mini"
                  tooltip-effect="dark"
                  style="width: 100%">
          <el-table-column
              label="费用编号"
              prop="pcdId"
          >
          </el-table-column>
          <el-table-column
              prop="name"
              label="费用名称">
          </el-table-column>

          <el-table-column
              prop="sname"
              label="操作员工">
          </el-table-column>

          <el-table-column
              prop="pcdDate"
              label="扣除时间">
          </el-table-column>

          <el-table-column
              label="费用价格">
            <template #default="obj">
              {{obj.row.pcdPrice.toFixed(2)}}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-dialog>



</template>

<script>
	import {getLodop} from "../../js/LodopFuncs";

  export default{
		data(){
			return{
        staff:{},//医生对象

				InhospitalApplyArr:[
					
				],
        patientCostArr:[],
				InhospitalApply:{
					ptNo:'',
					sickNumber:'',
					ptSex:'',
					ptAge:'',
					ptHomeAdder:'',
					sickPhone:'',
					ptCapacityNo:'',
					ptInDate:'',
					ks:{
						ksId:'',
						ksName:''
					}
				},
        maxCard:'病人信息',
        payArr:[],//缴费明细
        payArrs:[],
        isShowCostTable:false,//是否显示费用表格
        isShowCostTables:true,//是否显示费用表格

        //===============病人数据
       patientBaseObj:{
         ptNo:'',
         ptInDate:'',
         ptName:'',
         ptSex:'',
         ptBirthDate:'',
         ptCapacityNo:'',
         ptHomeAdder:'',
         ksId:'',
         sId:'',
         ptIphone:'',
         ptDiagnoseName:'',
         bdId:'',
         ptAge:'',
         ptPayMoney:'',
         dgaId:'',
         inId:'',
         ptPrice:'',
         drugPrice:'',
         ksName:"",
         bdName:"",
         checkPrice:'',
         bedPrice:"",
         ssPrice:"",
         payPrice:"",
         ptDay:"",
         ptSickNumber:''
       },//病人实体类
        search:"",//病人搜索
        //======================查询条件数据
        doctorEnjoinWhere:{
          startDate:'',//开始日期
          endDate:'',//结束日期
          searchLike:'',//模糊搜索
          doctorType:2,//医嘱类型
          sIdArr:[],//员工编号
          ptNo:''
        },
        doctorEnjoinWheres:{
          startDate:'',//开始日期
          endDate:'',//结束日期
          searchLike:'',//模糊搜索
          doctorType:2,//医嘱类型
          sIdArr:[],//员工编号
          ptNo:''
        },
        costTabss:'全部费用',
        //=================缴费详细
        payObj:{//缴费实体类
          pyId:'',
          pyPrice:'',
          pyDate:'',
          ptNo:'',
          ptName:'',
          sId:'',
          ptInDate:'',//住院日期
          ptOutDate:'',//出院日期
          ptPrice:'',//病人余额
          pyWay:''//缴费方式
        },
        staffArr:[],

        //==============病人出院数据
        dischargeArr:[],
        dischargeObj:{
          dgId:'',
          ptNo:"",
          dgDate:"",
          sId:"",
          dgaId:"",
          dgDay:'',
          bdName:"",
          dgDepositPrice:"",
          dgUsedPrice:"",
          dgSjPrice:'',//实交金额
          dgBjPrice:""

        },
       patientBaseArr:[],//病人数组
        costTabs:'病人信息',
        isPayRecordShow:false,//显示病人费用明细表

				csrq:'',
				isShowXZBR:false,//选择住院病人弹框
				isShowZY:false,//住院申请弹框
				isSex:'',
				fromSearch:''
			}
		},
		methods:{
			dischargeInIt(){
        this.axios({url:"dis/select-discharge-all",params:{search:this.search}}).then((v)=>{
          this.patientBaseArr = v.data;
        }).catch();
        this.axios.post("dis/select-discharge-all-where",this.doctorEnjoinWhere).then((v)=>{
          console.log(v.data)
          this.dischargeArr = v.data;
        }).catch();
      },
      //选择出院病人方法
      async addDischarge(obj){


          this.patientBaseObj.ptNo = obj.ptNo;
          this.patientBaseObj.ptName = obj.zyPatientBase.ptName;
          this.patientBaseObj.ptSex = obj.zyPatientBase.ptSex;
          this.patientBaseObj.ptPayMoney = obj.zyPatientBase.ptPayMoney;
          this.patientBaseObj.ptPrice = obj.zyPatientBase.ptPrice;
          this.patientBaseObj.bdName = obj.bdName;
          this.patientBaseObj.ksName = obj.zyPatientBase.ksName;
          this.patientBaseObj.dgaId = obj.dgaId;
          this.patientBaseObj.ptDay = parseFloat((new Date().getTime() - Date.parse(obj.zyPatientBase.ptInDate))  / (1*24*60*60*1000)).toFixed(0) + '天';//算出入院天数


        this.axios({url:"select-PayBy-PtNoPrice", params: {ptNo:obj.ptNo}}).then((v) => {
          this.patientBaseObj.payPrice = v.data;
        }).catch();
          this.axios({url: "dis/cost-discharge-ptno", params: {ptNo: obj.ptNo, text: "医嘱药品费用"}}).then((v) => {
            this.patientBaseObj.drugPrice = v.data;
          }).catch();
          this.axios({url: "dis/cost-discharge-ptno", params: {ptNo: obj.ptNo, text: "其他费用"}}).then((v) => {
            this.patientBaseObj.drugPrice += v.data;
          }).catch();
          this.axios({url: "dis/cost-discharge-ptno", params: {ptNo: obj.ptNo, text: "床位费用"}}).then((v) => {
            this.patientBaseObj.bedPrice = v.data;
          }).catch();
          this.axios({url: "dis/cost-discharge-ptno", params: {ptNo: obj.ptNo, text: "化验项目费用"}}).then((v) => {
            this.patientBaseObj.checkPrice = v.data;
          }).catch();
        this.axios({url: "dis/cost-discharge-ptno", params: {ptNo: obj.ptNo, text: "手术费用"}}).then((v) => {
          this.patientBaseObj.ssPrice = v.data;
        }).catch();
          this.isShowXZBR = false;
        this.$message({
          type: 'success',
          message: "选择成功"
        });

      },
      showPay(obj){
			  console.log(obj)
        this.isPayRecordShow = true;
        this.payObj.ptNo = obj.ptNo;
        this.payObj.ptName = obj.patientBase.ptName;
        this.patientSelectStaff(obj.ptNo);
        this.payObj.ptInDate = obj.patientBase.ptInDate;
        this.payObj.ptOutDate = obj.patientBase.ptOutDate;
        this.costTabsClicks();
      },
      //==============================打印
      onStart: function() {
        const LODOP = getLodop()
        LODOP.PRINT_INIT('');
        var strStyle =
            "<style> table,td,th {border-bottom: 1px solid black;border-collapse: collapse;margin:5px 0px;text-align: center;}</style>"
        this.AddPrintContent(this.formatDate(new Date(),"yyyy年MM月dd日 hh:ss:mm"))
        if(this.costTabss != '病人缴费') {
          LODOP.ADD_PRINT_HTM(120, 20, '40%', '100%', strStyle + document.getElementById('dy').innerHTML);
          let sum = 0;
          this.patientCostArr.forEach(i=>{
            console.log(i)
            sum += i.pcdPrice;
          });
          LODOP.ADD_PRINT_HTM(document.getElementById('dy').children[2].children[0].scrollHeight+140, 690, '40%', '100%','合计'+sum.toFixed(2));
        }else{
          LODOP.ADD_PRINT_HTM(120, 20, '40%', '100%', strStyle + document.getElementById('dys').innerHTML)
          let sum = 0;
          this.payArrs.forEach(i=>{
            console.log(i)
            sum += i.pyPrice;
          });
          LODOP.ADD_PRINT_HTM(document.getElementById('dys').children[2].children[0].scrollHeight+140, 690, '40%', '100%','合计'+sum.toFixed(2));
        }
        LODOP.PREVIEW()
      },
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
      AddPrintContent: function(sj) {
        let LODOP = getLodop();
        LODOP.ADD_PRINT_TEXT(15, 300, 300, 25, "柿子医院费用明细");
        LODOP.SET_PRINT_STYLEA(1, "FontName", "隶书");
        LODOP.SET_PRINT_STYLEA(1, "FontSize", 15);
        LODOP.SET_PRINT_STYLEA(1, "FontColor", 0);
        LODOP.ADD_PRINT_TEXT(55, 50, 831, 20, "   患者姓名:" + this.payObj.ptName + "                                              住院号:" + this.payObj.ptNo);
        LODOP.SET_PRINT_STYLEA(2, "FontName", "隶书");
        LODOP.SET_PRINT_STYLEA(2, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(75, 50, 831, 20, "   住院日期:" + this.payObj.ptInDate + "                                    出院日期:" + this.payObj.ptOutDate);
        LODOP.SET_PRINT_STYLEA(3, "FontName", "隶书");
        LODOP.SET_PRINT_STYLEA(3, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(95, 50, 431, 20, "   打印日期:" + sj);
        LODOP.SET_PRINT_STYLEA(4, "FontName", "隶书");
        LODOP.SET_PRINT_STYLEA(4, "FontSize", 10);
      },

      costTabsClicks(){
        if(this.costTabss == '全部费用'){
          this.isShowCostTables = true;
          this.axios.post("select-by-ptNo",{ptNo:this.payObj.ptNo,payWhere:this.doctorEnjoinWheres}).then((v)=>{//查询病人缴费记录
            this.patientCostArr = v.data;
            console.log(v.data)
          });
        }else if(this.costTabss != '全部费用' && this.costTabss != '病人缴费'){
          this.isShowCostTables = true;
          this.axios.post("select-by-ptNo",{ptNo:this.payObj.ptNo,text:this.costTabss,payWhere:this.doctorEnjoinWheres}).then((v)=>{//查询病人缴费记录
            this.patientCostArr = v.data;
          });
        }else{
          this.isShowCostTables = false;
          this.axios.post( "select-pay-byPtId", {ptNo: this.payObj.ptNo,payWhere:this.doctorEnjoinWheres}).then((v) => {//查询病人缴费记录
            this.payArrs = v.data;
          });
        }
      },
      //根据住院编号查询所有操作员
      patientSelectStaff(ptNo){
        this.axios({url:"selectBy-ptno-staff",params:{ptNo:ptNo}}).then((v)=>{
          console.log(v.data)
          this.staffArr = v.data;//员工数组
        });
      },

      //新增确定出院
      addDischargeHT(){
        if(this.patientBaseObj.ptNo == ''){
          this.$message({
            type:"error",
            message:'请选择病人'
          });
          return;
        }
        this.dischargeObj.bdName = this.patientBaseObj.bdName;
        this.dischargeObj.ptNo = this.patientBaseObj.ptNo;
        this.dischargeObj.sId = this.staff.sid;
        this.dischargeObj.dgaId = this.patientBaseObj.dgaId;
        this.dischargeObj.dgDay = parseFloat(this.patientBaseObj.ptDay);//住院天数
        alert(this.dischargeObj.dgDay);
        this.dischargeObj.dgDepositPrice = parseFloat(this.patientBaseObj.checkPrice)+parseFloat(this.patientBaseObj.drugPrice)+parseFloat(this.patientBaseObj.bedPrice)+parseFloat(this.patientBaseObj.ssPrice);
        if(this.patientBaseObj.ptPrice > 0){
          this.dischargeObj.dgUsedPrice = this.patientBaseObj.ptPrice;//应退金额
        }else{
          if(this.dischargeObj.dgSjPrice < -this.patientBaseObj.ptPrice){//判断输入的金额大于或者等于补交金额
            this.$message({
              type:'error',
              message:'补交金额不正确！'
            });
            return;
          }
          this.dischargeObj.dgBjPrice = -this.patientBaseObj.ptPrice;//应补金额
        }
        this.axios.post("dis/add-discharge-byptNo",this.dischargeObj).then((v)=>{
          if(v.data){
            alert("新增成功")
            this.colseDischargeText();
          }
        })
      },
      closeSelectPatient(){
        this.isShowXZBR = false;
        this.search = '';
      },
      //清空出院弹框所有信息
      colseDischargeText(){
        this.patientBaseObj = {
              ptNo:'',
              ptInDate:'',
              ptName:'',
              ptSex:'',
              ptBirthDate:'',
              ptCapacityNo:'',
              ptHomeAdder:'',
              ksId:'',
              sId:'',
              ptIphone:'',
              ptDiagnoseName:'',
              bdId:'',
              dgaId:'',
              ptAge:'',
              ptPayMoney:'',
              inId:'',
              ptPrice:'',
              drugPrice:'',
              checkPrice:'',
              ksName:"",
              bdName:"",
              bedPrice:"",
              ssPrice:"",
              payPrice:"",
              ptDay: "",
              ptSickNumber:''
        };
        this.costTabs = "病人信息";
        this.patientCostArr = [];
        this.payArr = [];
        this.isShowZY = false;
      },
      costTabsClick(){
			  if(this.patientBaseObj.ptNo == ''){
          return;
        }
        if(this.costTabs != '缴费明细'){
          this.isShowCostTable = true;
          this.axios.post("select-by-ptNo-discharge",{ptNo:this.patientBaseObj.ptNo,text:this.costTabs,payWhere:this.doctorEnjoinWhere}).then((v)=>{//查询病人缴费记录
            console.log(v.data)
            this.patientCostArr = v.data;
          });
        }else{
          this.isShowCostTable = false;
          this.axios.post( "select-pay-byPtId", {ptNo: this.patientBaseObj.ptNo,payWhere:this.doctorEnjoinWhere}).then((v) => {//查询病人缴费记录
            this.payArr = v.data;
          });
        }
      },
      changeTabs(obj){
			  this.costTabs = obj;
			  this.costTabsClick();
      }
		},
    created() {
      this.staff = this.$store.state.token.list;//将登录存入的值在取出来
		  this.dischargeInIt();
    }
  }
</script>

<style scoped>
	.works{
		padding: 15px;
	}
	/*.el-dialog__body{*/
	/*	padding: 20px 60px;*/
	/*	padding-left:100px ;*/
	/*	text-align: center;*/
	/*}*/
</style>
