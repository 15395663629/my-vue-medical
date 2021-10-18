<template>
	

	<!--=====================================================================添加手术申请======================-->
	
			<el-dialog title="手术申请" v-model="isSSShow">
				<el-form  ref="ruleForm" label-width="100px" class="">

				<el-row style="color: red;">
					申请信息
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="住院号:&emsp;" label-width="80px">
							<el-input v-model="ssApply.ptNo" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col  :span="7">
						<el-form-item label="姓名:" label-width="80px">
							<el-input v-model="ssApply.ptName" size="mini"></el-input>
						</el-form-item>
					</el-col>
								<el-col :offset="2" :span="8">
										<el-form-item label="术前诊断:" label-width="80px">
						<el-input v-model="ssApply.ptDiagnoseName"  size="mini"></el-input>
								</el-form-item>
					</el-col>
				</el-row>
				<el-row style="padding-top:6px ;">
					<el-col  :span="7">
						<el-form-item label="拟施手术:" label-width="80px">
							<el-input style="font-color:red;" readonly="readonly" v-model="ssApply.simulationOperation" size="mini"></el-input>
						</el-form-item>
								</el-col>
								<el-col  :span="10">
									<el-form-item label="拟施日期:" label-width="80px">
										<el-date-picker
                        size="mini"
                        v-model="ssApply.simulationTime"
										  type="date"
										  >
										</el-date-picker>
									</el-form-item>
								</el-col>
				</el-row>
			</el-form>
				<el-row style="color: red;">
						手术选择
				</el-row>
			  <el-row >
          <el-table
              :data="sproject"
              tooltip-effect="dark"
              height="400"
              size="mini"
              @select="select"
              ref="ssdata"
              style="width: 100%">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="编号"
                prop="projectNumber"
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
                label="科室">

            </el-table-column>
            <el-table-column
                prop="projectPosition"
                label="开刀位置">
            </el-table-column>
          </el-table>
				
			  </el-row>
			  <el-row>
				  <el-col :span="3" :offset="11">
				  <el-button type="primary" @click="ssdoorApply()">提交申请</el-button>
				  </el-col>
			  </el-row>
			</el-dialog>
	
	
	<!--=====================================================================出院弹框======================-->
	<el-dialog title="申请出院" @close="closeDischargeApply" v-model="isCYShow">
	  <el-form>
		  <el-row>
			  <el-col :offset="1" :span="9">
				  <el-form-item label="病人名称：" label-width="90px">
            <div style="border-bottom: 1px solid #D0D2D6">{{dischargeApplyObj.ptName}}</div>

				  </el-form-item>
			  </el-col>
			   <el-col :offset="2" :span="9">
				   <el-form-item label="性别：" label-width="90px">
             <div style="border-bottom: 1px solid #D0D2D6">{{dischargeApplyObj.ptSex}}</div>
				   </el-form-item>
			   </el-col>
		  </el-row>
		  
		  <el-row>
		  	<el-col :offset="1" :span="9">
				<el-form-item label="科室：" label-width="90px">
					<div style="border-bottom: 1px solid #D0D2D6">{{dischargeApplyObj.ksName}}</div>
				</el-form-item>
			</el-col>
        <el-col :offset="2" :span="9">
          <el-form-item label="预交金额：" label-width="90px">
            <div style="border-bottom: 1px solid #D0D2D6">{{dischargeApplyObj.ptPayMoney}}</div>
          </el-form-item>
        </el-col>
		  </el-row>

      <el-row>
        <el-col :offset="1" :span="9">
          <el-form-item label="治疗医生：" label-width="90px">
            <div style="border-bottom: 1px solid #D0D2D6">{{dischargeApplyObj.sName}}</div>
          </el-form-item>
        </el-col>

        <el-col :offset="2" :span="9">
          <el-form-item label="已用：" label-width="90px">
            <div style="border-bottom: 1px solid #D0D2D6">{{patientPrice}}</div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :offset="1" :span="9">
          <el-form-item label="床位：" label-width="90px">
            <div style="border-bottom: 1px solid #D0D2D6">{{dischargeApplyObj.bdName}}</div>
          </el-form-item>
        </el-col>

        <el-col :offset="2" :span="9">
          <el-form-item label="余额：" label-width="90px">
            <div style="border-bottom: 1px solid #D0D2D6">{{dischargeApplyObj.ptPrice}}</div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>

        <el-col :offset="1" :span="20">
          <el-form-item label="申请原因：" label-width="90px">
            <el-input v-model="dischargeApplyObj.dgaCause" type="textarea" placeholder="原因"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
	  </el-form>
	  
	  <template #footer>
	  		<el-row>
	  			<el-col :span="18"></el-col>
	  			<el-col :span="2">
	  				<el-button @click="addDischargeApply()" type="primary">确定</el-button>
	  			</el-col>
	  			<el-col :span="1"></el-col>
	  			<el-col :span="2">
	  				<el-button @click="closeDischargeApply" type="danger">取消</el-button>
	  			</el-col>
	  			<el-col :span="1"></el-col>
	  		</el-row>
	  </template>
	</el-dialog>
	
	
	<!--=====================================================================转科弹框======================-->
	<el-dialog title="转科" width="45%" v-model="isZKShow" @close="closeChangeDeptFunction">
	  <el-form>
		  <el-row>
			  <el-col :span="10">
				  <el-form-item label="选择科室" label-width="80px">
				  	<el-select @change="changeKsFunction" v-model="changeDeptObj.cdrAfterKs" placeholder="请选择">
				  	    <el-option v-for="ks in ksArr"
				  	      :label="ks.ksName"
				  	      :value="ks.ksId"
                  :disabled="ks.isBt"
                >
				  	    </el-option>
				  	  </el-select>
				  </el-form-item>
			  </el-col>

        <el-col :offset="2" :span="10">
          <el-form-item label="主治医生" label-width="80px">
            <el-select v-model="changeDeptObj.doctorId" placeholder="请选择">
              <el-option v-for="sta in this.staffArr"
                  :label="sta.sname"
                  :value="sta.sid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
		  </el-row>


      <el-row>
        <el-col :span="22">
          <el-form-item label="转科原因" label-width="80px">
            <el-input type="textarea" v-model="changeDeptObj.cdrCause" placeholder="填写原因"></el-input>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row>
        <el-col :span="22">
          <el-form-item label="是否跟随" label-width="80px">
            <el-switch active-text="医嘱跟随" active-value="1" v-model="changeDeptObj.cdrDoctorIs" inactive-text="医嘱不跟随" inactive-value="2"></el-switch>
          </el-form-item>
        </el-col>

      </el-row>
	  </el-form>
	  
	  <template #footer>
	  		<el-row>
	  			<el-col :span="17"></el-col>
	  			<el-col :span="2">
	  				<el-button @click="addChangeDeptFunction('empFrom')" size="small" type="primary">确定</el-button>
	  			</el-col>
	  			<el-col :span="1"></el-col>
	  			<el-col :span="2">
	  				<el-button @click="closeChangeDeptFunction" size="small" type="danger">取消</el-button>
	  			</el-col>
	  		</el-row>
	  </template>
	</el-dialog>

  <!--=============================================查询条件===================================-->
  <el-row style="margin-bottom:10px;padding-top:15px ">

    <el-col :offset="1" :span="3">
      <el-input size="mini" v-model="doctorEnjoinWhere.searchLike" placeholder="病人姓名或者住院号"></el-input>
    </el-col>
    <el-col  :span="1">
      <el-button size="mini" @click="patientBaseInit" icon="el-icon-search" type="primary" ></el-button>
    </el-col>


    <el-col  style="margin-left: 10px;" :span="5">
      <span style="font-size: 12px;">治疗医生：</span>&nbsp;
      <el-select @change="patientBaseInit"  placeholder="请选择"  style="width: 160px" v-model="doctorEnjoinWhere.sIdArr" multiple collapse-tags size="mini">
        <el-option v-for="st in staffArrs"
                   :label="st.sname"
                   :value="st.sid"/>
      </el-select>
    </el-col>

    <el-col :span="4">
      <span style="font-size: 12px;">科室：</span>&nbsp;
      <el-select size="mini" v-model="doctorEnjoinWhere.ksIdArr" placeholder="请选择" @change="patientBaseInit"  multiple collapse-tags style="width: 160px" >
        <el-option v-for="ks in ksArr"
                   :label="ks.ksName"
                   :value="ks.ksId">
        </el-option>
      </el-select>
    </el-col>


    <el-col style="margin-left: 15px" :span="8">
      &nbsp;<span style="font-size: 12px;">日期区间：</span>&nbsp;

      <el-date-picker style="width: 160px" @change="patientBaseInit" v-model="doctorEnjoinWhere.startDate"
                      type="date"
                      size="mini"
                      value-format="YYYY-MM-DD"
                      placeholder="日期">
      </el-date-picker>
      &nbsp;<span style="font-size: 12px;">至</span>&nbsp;
      <el-date-picker style="width: 160px" @change="patientBaseInit" v-model="doctorEnjoinWhere.endDate"
                      type="date"
                      size="mini"
                      value-format="YYYY-MM-DD"
                      placeholder="日期">
      </el-date-picker>
    </el-col>
  </el-row>


  <!--=============================================================================病人信息表格-->
  <el-row>
    <el-col>
      <el-table
          :data="patientBaseArr"
          tooltip-effect="dark"
          height="470px"
          style="width: 100%">
        <el-table-column align="center" label="住院病人信息">


          <el-table-column label="住院号" prop="ptNo"></el-table-column>
          <el-table-column label="姓名">
            <template #default="scope" >
              <el-popover width="300" effect="light"   trigger="hover" placement="top">
                <template #default >
                  <p>姓名: {{ scope.row.ptName }}</p>
                  <p>年龄: {{ scope.row.ptAge }}</p>
                  <p>性别: {{ scope.row.ptSex }}</p>
                  <p>电话: {{ scope.row.ptIphone }}</p>
                  <p>住址: {{ scope.row.ptHomeAdder }}</p>
                </template>
                <template #reference>
                  <div class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.ptName }}</el-tag>
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column label="联系人">
            <template #default="scope">
              <el-badge style="position: absolute;top: 20px" :value="scope.row.listContacts[0].ctsName == null ? '暂无' :  scope.row.listContacts.length">
                    <el-button @click="openContactsText(scope.row)" size="mini">联系人</el-button>
              </el-badge>
            </template>
          </el-table-column>
          <el-table-column prop="ptInDate" width="140px" label="入院日期"></el-table-column>
          <el-table-column prop="ksName" label="科室"></el-table-column>
          <el-table-column prop="staff.sname" label="主治医生"></el-table-column>
          <el-table-column prop="ptPayMoney" label="预交金"></el-table-column>
          <el-table-column prop="ptPrice" label="余额"></el-table-column>
          <el-table-column label="门诊诊断">
            <template #default="pt">
              <el-button @click="openMzDiagnose(pt.row)" type="text">诊断信息</el-button>
            </template>
          </el-table-column>
          <el-table-column label="床位名称">
            <template #default="obj">
              <el-tag v-if="obj.row.bed.bdName == null" type="danger">未分配</el-tag>
              <el-tag v-if="obj.row.bed.bdName != null" type="success">{{obj.row.bed.bdName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="260px" >
            <template #default="obj">
              <el-row v-if="obj.row.ptIs == 1">
                <el-col :span="5"><el-button @click="openDischargeApply(obj.row)" size="mini" type="success">申请出院</el-button></el-col>

                <el-col :offset="4" :span="3"><el-button @click="openChangeKsFunction(obj.row)" size="mini" type="danger">转科</el-button></el-col>

                <el-col :offset="4" :span="5"><el-button size="mini" @click="ssopenApply(obj.row)" type="primary">手术申请</el-button></el-col>
              </el-row>

              <el-row v-if="obj.row.ptIs != 1">
                <el-col :offset="6"><el-button @click="offDischargeApply(obj.row)" size="mini" type="info">取消出院申请</el-button></el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <!--分页插件-->
      <el-pagination
          style="text-align: center;"
          @size-change="patientBaseSizeChange"
          @current-change="patientBaseCurrentChange"
          :current-page="patientBaseCurrent"
          :page-sizes="[2,4,6,8,10]"
          :page-size="patientBaseSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="patientBaseArr.length">
      </el-pagination>
    </el-col>
  </el-row>

  <!--=============================================添加病人联系人弹框===================================-->
  <el-dialog top="160px" width="40%" title="添加联系人" @close="closeAddContacts" v-model="isShowAddCts">

    <el-form ref="contacts" :model="contactsObj" :rules="contactsRules">

      <el-row>
        <el-col  :span="11">
          <el-form-item prop="ctsName" label="姓名" label-width="90px">
            <el-input v-model="contactsObj.ctsName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :offset="1" :span="11">
          <el-form-item label="联系电话" prop="ctsIphone" label-width="90px">
            <el-input v-model="contactsObj.ctsIphone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col  :span="11">
          <el-form-item label="关系" prop="ctsRelation" label-width="90px">
            <el-input v-model="contactsObj.ctsRelation"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <template #footer>
      <el-row>
        <el-col :span="18"></el-col>
        <el-col :span="2">
          <el-button @click="addContacts" size="small" type="primary">确定</el-button>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="2">
          <el-button @click="closeAddContacts" size="small" type="danger">取消</el-button>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
    </template>
  </el-dialog>


  <!--=============================================取消出院申请弹框===================================-->
  <el-dialog  v-model="isShowCallDischargeApply" @close="closeClaaDischargeApply" title="取消申请">

    <el-row>
      <el-col>
        <el-input placeholder="取消原因" type="textarea" v-model="CallDischargeApply.dgaNoCause"></el-input>
      </el-col>
    </el-row>

    <template #footer>
      <el-row>
        <el-col :span="18"></el-col>
        <el-col :span="2">
          <el-button @click="addClaaDischargeApply" size="small" type="primary">确定</el-button>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="2">
          <el-button @click="closeClaaDischargeApply" size="small" type="danger">取消</el-button>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
    </template>

  </el-dialog>



  <!--=============================================显示联系人表格===================================-->
  <el-dialog style="margin: 0px;padding: 0px" v-model="isShowTextCts" @close="closeContactsDialog" title="联系人">
    <el-row>
      <el-col>
        <el-button type="primary" @click="openContactsTK()" size="mini">新增</el-button>
      </el-col>
    </el-row>

    <el-table size="mini" border="true" :data="contactsArr">
      <el-table-column property="ctsName" label="姓名"></el-table-column>
      <el-table-column property="ctsIphone" label="联系电话"></el-table-column>
      <el-table-column property="ctsRelation" label="与患者关系"></el-table-column>
      <el-table-column label="操作">
        <template #default="obj">
          <el-button type="warning" @click="updateContacts(obj.row)" size="mini">修改</el-button>
          <el-button type="info" @click="deleteContacts(obj.row)" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>



  <!--门诊诊断弹框-->
  <el-dialog  title="门诊诊断信息" v-model="mzDiagnoseIsShow">
    <div style="height: 200px">
      <el-row>

        <el-col :span="3">
          <span>门诊诊断：</span>
        </el-col>

        <el-col :span="16">
          {{mzDiagnoseText}}
        </el-col>

      </el-row>

    </div>
  </el-dialog>

</template>

<script>
	export default{
		data(){
      var checkPhone = (rule, value, callback) => {//电话号码验证
            const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
            if (!value) {
              return callback(new Error('电话号码不能为空'))
            }
            setTimeout(() => {
              if (!Number.isInteger(+value)) {
                callback(new Error('请输入数字值'))
              } else {
                if (phoneReg.test(value)) {
                  callback()
                } else {
                  callback(new Error('电话号码格式不正确'))
                }
              }
            }, 100)
          }
			return{
        //================================================校验
        contactsRules:{
          ctsName:[{required:true,message:"姓名不能为空！",trigger:'change'}],
              ctsIphone:[{required:true,trigger:'blur',validator:checkPhone}],
              ctsRelation:[{required:true,message:"关系不能为空！",trigger:'change'}],
        },

        //================================================病人信息数据
        patientBaseArr:[
				],
				isCYShow:false,//显示出院申请弹框
				isSSShow:false,//显示手术弹框
        patientBaseSize:8,//页大小
        patientBaseCurrent:1,//当前页

        sproject:[],//手术集合
        ssApply:{//手术申请对象
          applyId:'',
          ptNo:'',
          simulationOperation:'',
          simulationTime:'',
          sId:'',
          projectId:'',
          changeId:'',
          operationId:'',

          ptDiagnoseName:'',
          ptName:''
        },

        token:'',
        //===============================================门诊诊断信息数据
        mzDiagnoseIsShow:false,//显示门诊诊断弹框
        mzDiagnoseText:'',//诊断信息


        //============================================患者联系人数据
        contactsObj:{
          ctsId:'',
          ptNo:'',//住院号
          ctsName:'',
          ctsIphone:'',
          ctsRelation:''
        },
        contactsArr:[],//联系人数组
        contactsIndex:null,//下标用来修改
        isShowAddCts:false,//是否显示添加患者联系人弹框
        isShowTextCts:false,//显示联系人


        //======================查询条件数据
        doctorEnjoinWhere:{
          startDate:'',//开始日期
          endDate:'',//结束日期
          searchLike:'',//模糊搜索
          doctorType:'',//医嘱类型
          sIdArr:[],//员工编号数组
          ksIdArr:[],//科室编号数组
          ptNo:''
        },


        //==============================================转科数据
        changeDeptObj:{//转科对象
          cdrId:'',
          cdrCause:'',
          ptNo:'',
          cdrBeforeKs:'',
          cdrAfterKs:'',
          cdrDoctorIs:'',
          bdId:'',//病床编号
          doctorId:'',//主治医生
          cdrDate:'',
          sId:''
        },
        changeDeptArr:[],//转科数组
        isZKShow:false,//显示转科弹框

        //=============================科室数据
        ksArr:[],//科室数组

        //===========================医生数据
        staffArr:[],//治疗医生数组
        staffArrs:[],//主治医生数组
        staff:{},//当前登录员工

        //======================================================出院申请数据
        dischargeApplyObj:{
          dgaCause:'',//申请原因
          ptId:'',//住院号
          sId:'',//操作人
          ptName:'',//病人名称
          ptSex:'',//病人性别
          ksName:'',//科室名称
          sName:'',//治疗医生名称
          ptPayMoney:'',//总费用
          ptPrice:'',//余额
          bdName:''//病床名称
        },


        //======================================取消申请出院数据
        isShowCallDischargeApply:false,//是否显示取消申请出院弹框
        CallDischargeApply:{//取消申请对象
          ptNo:'',//取消申请住院号
          dgaNoCause:'',//取消原因
        },
			}
		},
		methods:{
		  //==================================初始化病人住院信息
      patientBaseInit() {
        this.axios.post('patientAlls',this.doctorEnjoinWhere).then((v) => {//查询所有病人登记信息
          console.log(v.data)
          this.patientBaseArr = v.data;
        }).catch((date) => {
        });
        this.axios({url:'select-patient-staffAll'}).then((v)=>{
          this.staffArrs = v.data;
        }).catch();
        //查询手术
        this.axios.get("http://localhost:8089/allDescSpro",{params:{input:this.input}}).then((res)=>{
          this.sproject = res.data;
        }).catch()

        this.axios({url:'zy-ks-list'}).then((v)=>{//查询住院部科室信息
          this.ksArr = v.data;
        }).catch((data)=>{

        })
      },


      //设置单选
      select(selection, row) {
        this.$refs.ssdata.clearSelection();
        if (selection.length === 0) { // 判断selection是否有值存在
          return;
        }
        this.ssApply.simulationOperation=row.projectName;
        this.ssApply.projectId=row.projectId;
        this.$refs.ssdata.toggleRowSelection(row, true);

      },
      //打开申请手术弹框
      ssopenApply(row){
        this.ssApply.ptName=row.ptName
        this.ssApply.ptDiagnoseName=row.ptDiagnoseName
        this.token =this.$store.state.token//获取当前用户
        this.ssApply.sId=this.token.list.sid
        this.ssApply.ptNo=row.ptNo
        this.isSSShow=true;
      },
      //手术弹框确认按钮
      ssdoorApply(){
        this.axios.post("http://localhost:8089/aOrUApply",{proj:this.ssApply}).then((res)=>{
          this.patientBaseInit();
        }).catch()
        this.isSSShow=false;
      },
      //============================================申请出院方法
      //打开申请出院弹框
      openDischargeApply(obj){
        this.dischargeApplyObj.ptNo = obj.ptNo;//住院号
        this.dischargeApplyObj.sId = this.staff.sid;//操作人
        this.dischargeApplyObj.ptName = obj.ptName;//病人名称
        this.dischargeApplyObj.ptSex = obj.ptSex;//病人性别
        this.dischargeApplyObj.ksName = obj.ksName;//科室名称
        this.dischargeApplyObj.sName = obj.staff.sname;//治疗医生名称
        this.dischargeApplyObj.ptPayMoney = obj.ptPayMoney;//总费用
        this.dischargeApplyObj.ptPrice = obj.ptPrice//余额
        this.dischargeApplyObj.bdName = obj.bed.bdName == null ? '未分配' : obj.bed.bdName;//病床名称
        this.isCYShow = true;
      },
      //添加出院申请
      addDischargeApply(){
        this.axios.post('/dis/addDischarge',this.dischargeApplyObj).then((v)=>{
          if(v.data == "yes"){
            this.$message({
              type: 'success',
              message: '申请成功'
            });
          }
          this.closeDischargeApply();
          this.patientBaseInit();//刷新表格
          console.log(v.data)
        }).catch();
      },
      //关闭申请出院弹框
      closeDischargeApply(){
        this.isCYShow = false;
        this.dischargeApplyObj = {
          dgaCause:'',//申请原因
          ptId:'',//住院号
          sId:'',//操作人
          ptName:'',//病人名称
          ptSex:'',//病人性别
          ksName:'',//科室名称
          sName:'',//治疗医生名称
          ptPayMoney:'',//总费用
          ptPrice:'',//余额
          bdName:''//病床名称
        };
      },
      //取消出院申请
      offDischargeApply(obj){
        console.log(obj)
        this.isShowCallDischargeApply = true;
        this.CallDischargeApply.ptNo = obj.ptNo;
      },
      //确定取消出院申请
      addClaaDischargeApply(){
        this.axios.post('/dis/updata-patient-apply',this.CallDischargeApply).then((v)=>{
          this.patientBaseInit();//刷新表格
          this.closeClaaDischargeApply();//关闭取消住院申请弹框
        }).catch();
      },
      //关闭取消出院申请弹框
      closeClaaDischargeApply(){
        this.isShowCallDischargeApply = false;
        this.CallDischargeApply.ptNo = '';
        this.CallDischargeApply.dgaNoCause = '';
      },


      //========================================病人诊断信息方法
      openMzDiagnose(obj){
        this.mzDiagnoseText = obj.ptDiagnoseName;
        this.mzDiagnoseIsShow = true;
      },

      //===============================================病人转科方法
      //打开病人转科弹框
      openChangeKsFunction(row){
        console.log(row)
        for(let idx in this.ksArr){
          if(this.ksArr[idx].ksId == row.ksId){
            this.ksArr[idx].isBt = true;//禁用掉选择
          }else{
            this.ksArr[idx].isBt = false;//启用选择
          }
        }
        // alert(this.staff.sid);
        console.log(row)
        // alert(row.bdId)
        this.changeDeptObj.cdrBeforeKs = row.ksId;//之前科室
        this.changeDeptObj.bdId = row.bdId;//病床编号
        this.changeDeptObj.ptNo = row.ptNo;//住院号
        this.isZKShow = true;
      },
      //确定转科方法
      addChangeDeptFunction(form){
        this.changeDeptObj.sId = this.staff.sid;//操作员
        console.log(this.changeDeptObj)
        this.axios.post('patient-changeDept',this.changeDeptObj).then((v)=>{
          if(v.data){
            this.$message({
              type: 'success',
              message: '转科成功'
            });
          }
          console.log(v.data);
          this.closeChangeDeptFunction();
          this.patientBaseInit();
        }).catch((data)=>{

        });
      },
      //关闭转科方法
      closeChangeDeptFunction(){
        this.changeDeptObj = {//转科对象
          cdrId:'',
          cdrCause:'',
          ptNo:'',
          cdrBeforeKs:'',
          cdrAfterKs:'',
          cdrDoctorIs:'',
          bdId:'',
          cdrDate:'',
          sId:''
        };
        this.isZKShow = false
      },

      //修改科室调用方法
      changeKsFunction(ksId){
        this.changeDeptObj.sId = '';
        if(ksId == this.changeDeptObj.cdrBeforeKs){
          this.$message({
            type: 'warning',
            message: '转换科室与原本科室相同      请重新选择'
          });
          this.changeDeptObj.cdrAfterKs = '';
          return;
        }
        this.axios({url:"select-staff-all",params:{ksId:ksId}}).then((v)=>{//查询所有病房
          console.log(v.data)
          this.staffArr = v.data;
        }).catch((data)=>{

        });
      },



      //================================病人关系联系人方法
      //打开显示联系人表格
      openContactsText(row){
        this.isShowTextCts = true;//显示
        console.log(row);
        if(row.listContacts[0].ctsName != null){
          this.contactsArr = row.listContacts;
        }
        this.contactsObj.ptNo = row.ptNo;//将病人编号放入
      },
      //关闭联系人表格弹框
      closeContactsDialog(){
        this.isShowTextCts = false;
        this.contactsArr = [];
      },
      //打开添加联系人弹框方法
      openContactsTK(row){
        this.isShowAddCts = true;
        console.log(row);
      },
      //确定添加或者修改联系人方法
      addContacts(){
        this.$refs['contacts'].validate((valid) => {
          if (valid) {
            this.axios.post('insert-update-cts', this.contactsObj).then((v) => {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.closeAddContacts();
              this.patientBaseInit();//刷新表格
              this.selectByPtIdContacts(this.contactsObj.ptNo);//根据病人住院号查询联系人
            }).catch((data) => {

            });
          }
        });
        console.log(this.contactsObj)
      },
      //取消添加联系人方法
      closeAddContacts(){
        this.isShowAddCts = false;
        this.contactsIndex = null;
        this.contactsObj.ctsId = '';
        this.contactsObj.ctsName = '';
        this.contactsObj.ctsIphone = '';
        this.contactsObj.ctsRelation = '';
      },
      //删除联系人方法
      deleteContacts(row){
        console.log(row)
        this.axios({url:'delete-cts',params:{ctsId:row.ctsId}}).then((v)=>{
          this.$message({
            type: 'success',
            message: '删除成功'
          });
          this.patientBaseInit();//刷新表格
          this.selectByPtIdContacts(row.ptNo);
        }).catch((data)=>{

        });
      },
      //修改联系人方法
      updateContacts(row){
        console.log(row)
        this.contactsObj.ctsId = row.ctsId;
        this.contactsObj.ctsName = row.ctsName;
        this.contactsObj.ctsIphone = row.ctsIphone;
        this.contactsObj.ctsRelation = row.ctsRelation;
        this.isShowAddCts = true;
      },
      //根据住院编号查询联系人信息
      selectByPtIdContacts(ptNo){
        this.axios({url:'select-byPtNo',params:{ptNo:ptNo}}).then((v)=>{
            this.contactsArr = v.data;
        }).catch((data)=>{
        });
      },









      //==================================所有分页方法
      patientBaseSizeChange: function(size) {
        this.patientBaseSize = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      //初始页病房wardcurrentPage
      patientBaseCurrentChange: function(currentPage) {
        this.patientBaseCurrent = currentPage;
        console.log(this.currentPage) //点击第几页
      },

    },
    created() {
      this.staff = this.$store.state.token.list;//将登录存入的值在取出来
		  this.patientBaseInit();
    },
    computed:{
		  //计算病人费用
      patientPrice(){
        // return 100;
        return this.dischargeApplyObj.ptPayMoney - this.dischargeApplyObj.ptPrice;
      }
    }
  }
</script>

<style>
</style>
