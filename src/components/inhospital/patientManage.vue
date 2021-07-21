<template>
	

	<!--=====================================================================添加手术======================-->
	
			<el-dialog title="手术安排" v-model="isSSShow">
				<el-form  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="">
					<el-row style="color: red;">
									  手术信息
					</el-row>
					<el-row>
						<el-col :span="5">
							<el-form-item label="手术名称:" label-width="80px">
								<el-input></el-input>
							</el-form-item>
						</el-col>
						<el-col  :span="5">
							<el-form-item label="手术类型:" label-width="80px">
								<el-input></el-input>
							</el-form-item>
						</el-col>
						<el-col :offset="1" :span="7">
										<el-form-item label="手术部位:" label-width="80px">
											<el-input></el-input>
										</el-form-item>
						</el-col>
					</el-row>
					<el-row style="color: red;">
									  病人信息
					</el-row>
					<el-row>
						<el-col :span="5">
							<el-form-item label="病人姓名:" label-width="80px">
								<el-input></el-input>
							</el-form-item>
						</el-col>
						<el-col  :span="3">
							<el-form-item label="床号:" label-width="60px">
								<el-input></el-input>
							</el-form-item>
						</el-col>
									<el-col :offset="1" :span="2">
										<el-form-item label="性别:" label-width="60px">
											<el-input></el-input>
										</el-form-item>
									</el-col>
									<el-col :offset="1" :span="3">
										<el-form-item label="年龄:" label-width="60px">
											<el-input></el-input>
										</el-form-item>
									</el-col>
									<el-col :offset="2" :span="7">
										<el-form-item label="单&emsp;据:" label-width="60px">
											<el-input></el-input>
										</el-form-item>
									</el-col>
					</el-row>
				
				<el-row style="padding-top:6px ;">
					<el-col :span="5">
						<el-form-item label="科&emsp;&emsp;室:" label-width="80px">
							<el-input></el-input>
						</el-form-item>
					</el-col>
					<el-col :offset="3" :span="7">
						<el-form-item label="入院诊断:" label-width="80px">
							<el-input></el-input>
									</el-form-item>
					</el-col>
					<el-col :offset="2" :span="7">
						<el-form-item label="身份证:" label-width="60px">
								<el-input></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row style="color: red;">
					申请信息
				</el-row>
				<el-row>
					<el-col :span="7">
						<el-form-item label="住院号:&emsp;" label-width="80px">
							<el-input></el-input>
						</el-form-item>
					</el-col>
					<el-col  :span="3">
						<el-form-item label="身高:" label-width="80px">
							<el-input></el-input>
						</el-form-item>
					</el-col>
								<el-col :span="4">
									<el-form-item label="体重:" label-width="80px">
										<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :offset="2" :span="7">
										<el-form-item label="术前诊断:" label-width="80px">
						<el-input></el-input>
								</el-form-item>
					</el-col>
				</el-row>
				<el-row style="padding-top:6px ;">
					<el-col :span="6">
						<el-form-item label="主刀医生:&emsp;" label-width="80px">
							<el-input></el-input>
						</el-form-item>
					</el-col>
					<el-col  :span="7">
						<el-form-item label="拟施手术:" label-width="80px">
							<el-input></el-input>
						</el-form-item>
								</el-col>
								<el-col  :span="10">
									<el-form-item label="拟施日期:" label-width="80px">
										<el-date-picker
										  v-model="value1"
										  type="daterange"
										  start-placeholder="Start Date"
										  end-placeholder="End Date"
										  :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]">
										</el-date-picker>
									</el-form-item>
								</el-col>
				</el-row>
			</el-form>
				<el-row style="color: red;">
						手术室选择
				</el-row>
			  <el-row > 
			  	<el-table
			  	    ref="multipleTable"
			  	    :data="ssTa"
			  	    tooltip-effect="dark"
			  	    style="width:100%;height: 20%;"
			  	    @selection-change="handleSelectionChange">
			  	    <el-table-column
			  	      label="手术室编号"
			  		  prop="ssId"
			  	      >
			  	    </el-table-column>
			  	    <el-table-column
			  	      prop="ssName"
			  	      label="手术名称">
			  	    </el-table-column>
			  		<el-table-column
			  		  label="是否空闲" width="130px">
			  				是
			  		</el-table-column>
			  		<el-table-column label="操  作" width="200px">
			  		      <template #default="scope">
			  		        <el-button
			  		          size="mini"
			  		          type="primary"
			  		          @click="handleDelete(scope.$index, scope.row)">选择</el-button>
			  		      </template>
			  		    </el-table-column>
			  					<el-table-column width="150px"
			  								  align="right">
			  								  <template  #header>
			  									<el-input
			  									  v-model="ssss"
			  										prefix-icon="el-icon-search"
			  									  size="small"
			  									  placeholder="手术室搜索"/>
			  								  </template>
			  					</el-table-column>
			  					
			  	</el-table>
				
			  </el-row>
			  <el-row>
				  <el-col :span="3" :offset="11">
				  <el-button type="primary" @click="apssForm('ruleForm')">提交申请</el-button>
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


  <el-row>
    <el-col>
      <el-table
          :data="patientBaseArr"
          tooltip-effect="dark"
          height="470px"
          style="width: 100%"
      >

        <el-table-column align="center" label="住院病人信息">


          <el-table-column
              label="住院号"
              prop="ptNo"
          >
          </el-table-column>
          <el-table-column
              label="姓名">

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

          <el-table-column
              prop="ptInDate"
              label="入院日期">
          </el-table-column>
          <el-table-column
              prop="ksName"
              label="科室">
          </el-table-column>
          <el-table-column
              prop="staff.sname"
              label="主治医生">
          </el-table-column>

          <el-table-column label="门诊诊断">

            <template #default="pt">
              <el-button @click="openMzDiagnose(pt.row)" type="text">诊断信息</el-button>
            </template>

          </el-table-column>

          <el-table-column
              label="床位名称">

            <template #default="obj">
              <el-tag v-if="obj.row.bed.bdName == null" type="danger">未分配</el-tag>

              <el-tag v-if="obj.row.bed.bdName != null" type="success">{{obj.row.bed.bdName}}</el-tag>
            </template>

          </el-table-column>

          <el-table-column label="操作" width="300px" >
            <template #default="obj">
              <el-row v-if="obj.row.ptIs == 1">
                <el-col :span="5"><el-button @click="openDischargeApply(obj.row)" size="mini" type="success">申请出院</el-button></el-col>

                <el-col :offset="3" :span="5"><el-button @click="openChangeKsFunction(obj.row)" size="mini" type="danger">转科</el-button></el-col>

                <el-col :offset="1" :span="5"><el-button size="mini" @click="isSSShow = true" type="primary">手术申请</el-button></el-col>
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
          @size-change="patientHandleSizeChange"
          @current-change="patientHandleCurrentChange"
          :current-page="patientCurrent"
          :page-sizes="[2,4,6,8,10]"
          :page-size="patientSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="patientBaseArr.length">
      </el-pagination>
    </el-col>
  </el-row>

  <!--=============================================添加病人联系人弹框===================================-->
  <el-dialog top="160px" width="40%" title="添加联系人" @close="closeAddContacts" v-model="isShowAddCts">

    <el-form v-model="contactsObj">

      <el-row>
        <el-col  :span="11">
          <el-form-item label="姓名" label-width="90px">
            <el-input v-model="contactsObj.ctsName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :offset="1" :span="11">
          <el-form-item label="联系电话" label-width="90px">
            <el-input v-model="contactsObj.ctsIphone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col  :span="11">
          <el-form-item label="关系" label-width="90px">
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
			return{
			  //================================================病人信息数据
        patientBaseArr:[
				],
				isCYShow:false,//显示出院申请弹框
				isSSShow:false,//显示手术弹框

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
        this.axios({url: 'patientAll'}).then((v) => {//查询所有病人登记信息
          console.log(v.data)
          this.patientBaseArr = v.data;
        }).catch((date) => {
        });

        this.axios({url:'zy-ks-list'}).then((v)=>{//查询住院部科室信息
          this.ksArr = v.data;
        }).catch((data)=>{

        })
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
        this.axios.post('addDischarge',this.dischargeApplyObj).then((v)=>{
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
        this.axios.post('updata-patient-apply',this.CallDischargeApply).then((v)=>{
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
        console.log(this.contactsObj)
        this.axios.post('insert-update-cts',this.contactsObj).then((v)=>{
          this.$message({
            type: 'success',
            message: '操作成功'
          });
          this.closeAddContacts();
          this.patientBaseInit();//刷新表格
          this.selectByPtIdContacts(this.contactsObj.ptNo);//根据病人住院号查询联系人
        }).catch((data)=>{

        });
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
      }
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
