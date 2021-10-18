<template>

	<!--=============================================选择住院申请病人弹框===================================-->
	<el-dialog title="选择住院申请病人" v-model="isShowXZBR">
		<el-table
		    ref="multipleTable"
		    :data="InhospitalApplyArr.slice((hospitalCurrent-1)*hospitalSize,hospitalCurrent*hospitalSize)"
		    tooltip-effect="dark"
		    style="width: 100%"
        height="340px"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      label="病人名称"
			  prop="sick.sickName"
		      >
		    </el-table-column>
		    <el-table-column
            width="140px"
		      prop="inApplyDate"
		      label="申请住院日期">
		    </el-table-column>
		    <el-table-column
		      prop="inDiagnosis"
		      label="诊断结果">
		    </el-table-column>
      <el-table-column
          prop="inSuggest"
          label="医生建议">
      </el-table-column>

      <el-table-column
      prop="ksName"
      label="科室">
      </el-table-column>

			<el-table-column
			  prop="staff.sname"
			  label="申请人">
			</el-table-column>

			<el-table-column width="120px"
			      align="right">
			      <template  #header>
			        <el-input	v-model="fromSearch" prefix-icon="el-icon-search"
			          size="mini"
			          placeholder="病人名称搜索"/>
			      </template>
				  
				  <!--这里放操作按钮-->
				  <template  #default='scope'>
				  	<el-button type="success" @click="hospitalXZ(scope.row)" size="mini" >选择</el-button>
				  </template>
			    </el-table-column>
			
		  </el-table>
		  <!--分页插件-->
		   <el-pagination
		  					style="text-align: center;"
		        @size-change="hospitalHandleSizeChange"
		        @current-change="hospitalHandleCurrentChange"
		        :current-page="hospitalCurrent"
		        :page-sizes="[2,4,6,8,10]"
		        :page-size="hospitalSize"
		        layout="total, sizes, prev, pager, next, jumper"
		        :total="InhospitalApplyArr.length">
		      </el-pagination>
	</el-dialog>
	
	
	
	
	<!--=============================================新增住院申请信息弹框===================================-->
	<el-dialog title="住院登记" @close="PatientClear" v-model="isShowZY">
		<el-form ref="patientBaseObj" :rules="patientBaseObjRules" :model="patientBaseObj">
			<el-row>
				<el-col :span="8">
					<el-form-item label="姓名" label-width="80px">
						<el-input disabled v-model="patientBaseObj.ptName"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-button @click="isShowXZBR = true" type="primary" icon="el-icon-user-solid"></el-button>
				</el-col>
				
				<el-col :offset="1" :span="9">
					<el-form-item label="门诊诊断" label-width="80px">
						<el-input disabled v-model="patientBaseObj.ptDiagnoseName"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="9">
					<el-form-item label="性别" label-width="80px">
					 <el-radio-group disabled v-model="patientBaseObj.ptSex">
					    <el-radio  label="男">男</el-radio>
					    <el-radio label="女">女</el-radio>
					  </el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="3">
				</el-col>
				
				<el-col  :span="9">
					<el-form-item prop="ptPayMoney" label="预交金额" label-width="80px">
						<el-input  onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')" v-model="patientBaseObj.ptPayMoney"></el-input>
					</el-form-item>
				</el-col>
				
			</el-row>
			
			<el-row>
				<el-col :span="8">
					<el-form-item label="年龄" label-width="80px">
						<el-input disabled v-model="patientBaseObj.ptAge"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
				</el-col>

        <el-col :span="9">
          <el-form-item prop="ksId" label="科室" label-width="80px">
            <el-select v-model="patientBaseObj.ksId" @change="ksSelectFun" placeholder="请选择">
              <el-option v-for="ks in ksArr"
                  :label="ks.ksName"
                  :value="ks.ksId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

			</el-row>
			
			<el-row>
				<el-col :span="8">
					<el-form-item label="地址" label-width="80px">
						<el-input disabled v-model="patientBaseObj.ptHomeAdder"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
				</el-col>

        <el-col  :span="9">
          <el-form-item prop="sId" label="治疗医生" label-width="80px">
            <el-select v-model="patientBaseObj.sId"  placeholder="请选择">
              <el-option v-for="st in staffArr"
                         :label="st.staff.sname"
                         :value="st.staff.sid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

			</el-row>
			
			
			
			<el-row>
				<el-col :span="8">
					<el-form-item label="电话" label-width="80px">
						<el-input disabled v-model="patientBaseObj.ptIphone"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
				</el-col>

        <el-col :span="9">
          <el-form-item label="身份证" label-width="80px">
            <el-input  disabled v-model="patientBaseObj.ptCapacityNo"></el-input>
          </el-form-item>
        </el-col>

			</el-row>

      <el-row>
        <el-col :offset="1">
            <el-tag style="margin-right: 10px"
                :key="cts"
                v-for="(cts,index) in this.patientBaseObj.listContacts"
                closable
                @click="updateContacts(index,cts)"
                :disable-transitions="false"
                @close="deleteContacts(index)">
             关系：{{cts.ctsRelation}}  &nbsp;&nbsp;姓名：{{cts.ctsName}}
            </el-tag>

            <el-button type="primary" @click="isShowAddCts = true" size="mini">添加联系人</el-button>
        </el-col>
      </el-row>
		</el-form>
		
		
		<template #footer>
				<el-row>
					<el-col :span="18"></el-col>
					<el-col :span="2">
						<el-button @click="addPatientFunction('empFrom')" size="small" type="primary">确定</el-button>
					</el-col>
					<el-col :span="1"></el-col>
					<el-col :span="2">
						<el-button @click="PatientClear" size="small" type="danger">取消</el-button>
					</el-col>
					<el-col :span="1"></el-col>
				</el-row>
		</template>
	</el-dialog>

  <!--=============================================添加病人联系人弹框===================================-->
  <el-dialog top="160px" width="40%" title="添加联系人" @close="closeAddContacts" v-model="isShowAddCts">

    <el-form ref="contacts" :rules="contactsRules" :model="contacts">

      <el-row>
        <el-col  :span="11">
          <el-form-item prop="ctsName" label="姓名" label-width="90px">
            <el-input v-model="contacts.ctsName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :offset="1" :span="11">
          <el-form-item prop="ctsIphone" label="联系电话" label-width="90px">
            <el-input v-model="contacts.ctsIphone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col  :span="11">
          <el-form-item label="关系" prop="ctsRelation" label-width="90px">
            <el-input v-model="contacts.ctsRelation"></el-input>
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


  <!--=============================================查询条件===================================-->
  <el-row style="margin-bottom:10px">

    <el-col :span="2">
      <el-button @click="isShowZY = true" size="mini" type="primary">添加</el-button>
    </el-col>


    <el-col :offset="3" :span="5">
      <el-input size="mini" v-model="doctorEnjoinWhere.searchLike" placeholder="病人姓名或者住院号"></el-input>
    </el-col>
    <el-col  :span="1">
      <el-button size="mini" @click="patientBaseInit" icon="el-icon-search" type="primary" ></el-button>
    </el-col>

    <el-col :offset="1" :span="10">
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


	<!--=============================================住院登记表格===================================-->
	<el-row>
		<el-col>
			<el-table
			    :data="patientBaseArr.slice((patientCurrent-1)*patientSize,patientCurrent*patientSize)"
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

<!--          <el-table-column label="联系人">-->
<!--            <template #default="scope">-->

<!--              <el-badge style="position: absolute;top: 10px" :value="scope.row.listContacts[0].ctsName == null ? '暂无' :  scope.row.listContacts.length">-->
<!--                <el-popover-->
<!--                    placement="right"-->
<!--                    :width="330"-->
<!--                    trigger="click"-->
<!--                >-->
<!--                  <template #reference>-->
<!--                    <el-button size="mini">联系人</el-button>-->
<!--                  </template>-->
<!--                  <el-table size="mini" height="200px" :data="scope.row.listContacts">-->
<!--                    <el-table-column width="100" property="ctsName" label="姓名"></el-table-column>-->
<!--                    <el-table-column width="130" property="ctsIphone" label="联系电话"></el-table-column>-->
<!--                    <el-table-column width="100" property="ctsRelation" label="与患者关系"></el-table-column>-->
<!--                  </el-table>-->
<!--                </el-popover>-->
<!--              </el-badge>-->

<!--            </template>-->
<!--          </el-table-column>-->

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
          <el-table-column
              label="床位名称">

            <template #default="obj">
              <el-tag v-if="obj.row.bed.bdName == null" type="danger">未分配</el-tag>

              <el-tag v-if="obj.row.bed.bdName != null" type="success">{{obj.row.bed.bdName}}</el-tag>
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
        patientBaseObjRules: {//非空校验
          ksId:[{required:true,message:"请选择住院科室！",trigger:'change'}],
          sId:[{required: true, message: "请选择主治医生", trigger: 'change'}],
          ptPayMoney: [{ required: true, message: "预交金额不能为空", trigger: 'change' }],
        },
        contactsRules:{
          ctsName:[{required:true,message:"姓名不能为空！",trigger:'change'}],
          ctsIphone:[{required:true,trigger:'blur',validator:checkPhone}],
          ctsRelation:[{required:true,message:"关系不能为空！",trigger:'change'}],
        },

			  //=====================================================住院申请
				InhospitalApplyArr:[//住院申请数组
					
				],
				InhospitalApplyObj:{//住院申请对象
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
        inHospitalApplyObj:{
          inId:'',
          sickNumber:'',
          inDiagnosis:'',//诊断结果
          inSuggest:'',//医生建议
          inApplyDate:'',
          ksId:'',
          ksName:'',
          inProposer:'',
          sId:'',
          inIs:'',
          mrNumber:'',//就诊记录表
          ptNo:''//住院号
        },
				csrq:'',
				isShowXZBR:false,//选择住院病人弹框
				isShowZY:false,//住院申请弹框
        hospitalCurrent:1,//住院申请当前页
        hospitalSize:4,//住院申请页大小
				isSex:'',
				fromSearch:'',

        //======================查询条件数据
        doctorEnjoinWhere:{
          startDate:'',//开始日期
          endDate:'',//结束日期
          searchLike:'',//模糊搜索
          doctorType:2,//医嘱类型
          sIdArr:[],//员工编号
          ptNo:''
        },

        //============================================患者联系人数据
        contacts:{
          ctsId:'',
          ctsName:'',
          ctsIphone:'',
          ctsRelation:''
        },
        contactsIndex:null,//下标用来修改
        isShowAddCts:false,//是否显示添加患者联系人弹框




        //========================================================住院登记数据
        patientBaseObj:{//住院登记实体类
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
          listContacts:[],//病人联系人数组
          inId:'',
          ptPrice:'',
          ptSickNumber:''
        },
        patientBaseArr:[],//住院登记数组
        patientCurrent:1,//住院登记分页当前页
        patientSize:8,//住院登记分页页大小

        //====================================科室数据
        ksArr:[],//科室数组



        //======================================医生数据
        staffArr:[]
			}
		},
		methods:{
		  //==========================================初始化住院登记信息以及住院申请信息
      patientBaseInit(){
        this.axios.post('patientAll',this.doctorEnjoinWhere).then((v)=>{//查询所有病人登记信息
          console.log(v.data)
          this.patientBaseArr = v.data;
        }).catch((date)=>{
        });
        this.axios({url:'selectNoHspApply'}).then((v)=>{//查询所有病人登记信息
          console.log(v.data)
          this.InhospitalApplyArr = v.data;
        }).catch((date)=>{
        });
        //查询所有科室
        this.axios.post("zy-ks-list").then((v)=>{
          console.log(v.data);
          this.ksArr = v.data;
          // this.ksSelectFun();//查询排班信息
        }).catch((data)=>{
        });
      },

      //科室修改是调用查询该科室的排班信息
      ksSelectFun(){
        //根据科室编号查询排班人员
        this.axios({url:"home-sch-byksId",params:{ksId:this.patientBaseObj.ksId}}).then((v)=>{
          console.log(v.data);
          this.staffArr = v.data;
          this.patientBaseObj.sId = '';
        }).catch((data)=>{

        });
      },


      //================================病人关系联系人方法
      //确定添加联系人方法
      addContacts(){
        this.$refs['contacts'].validate((valid) => {
          if (valid) {
            if(this.contactsIndex != null){
              this.patientBaseObj.listContacts.splice(this.contactsIndex,1,this.contacts);
            }else{
              this.patientBaseObj.listContacts.push(this.contacts);
            }
            this.closeAddContacts();
            console.log(this.patientBaseObj)
          }
        });
      },
      //取消添加联系人方法
      closeAddContacts(){
        this.isShowAddCts = false;
        this.contactsIndex = null;
        this.contacts = {
              ctsId:'',
              ctsName:'',
              ctsIphone:'',
              ctsRelation:''
        };
        this.$refs['contacts'].resetFields();
      },
      //删除联系人方法
      deleteContacts(row){
        console.log(row)
        this.patientBaseObj.listContacts.splice(row,1);
      },
      //修改联系人方法
      updateContacts(index,row){
        console.log(row)
        this.contacts.ctsName = row.ctsName;
        this.contacts.ctsIphone = row.ctsIphone;
        this.contacts.ctsRelation = row.ctsRelation;
        this.isShowAddCts = true;
        this.contactsIndex = index;
      },



      //======================================================住院申请方法

      //选择住院申请
      hospitalXZ(obj){
            this.patientBaseObj.ptSickNumber = obj.sick.sickNumber;//病人信息编号
            this.patientBaseObj.ptName = obj.sick.sickName;//病人名称
            this.patientBaseObj.ptSex = obj.sick.sickSex;//性别
            this.patientBaseObj.ptBirthDate = obj.sick.sickTime;//出生日期
            this.patientBaseObj.ptCapacityNo = obj.sick.sickIdCard;//身份证
            this.patientBaseObj.ptHomeAdder= obj.sick.sickSite;//住址
            this.patientBaseObj.ksId = obj.ksId;//科室编号
            this.patientBaseObj.ptIphone= obj.sick.sickPhone;//电话
            this.patientBaseObj.ptDiagnoseName = obj.inDiagnosis;//诊断结果
            this.patientBaseObj.ptAge= obj.sick.sickAge;//年龄
            this.patientBaseObj.inId = obj.inId;//住院申请编号

        this.ksSelectFun();//调用查询员工
        this.isShowXZBR = false;
      },
      // //更改科室后调用
      // ksChangeStaff(ksId){
      //   this.patientBaseObj.sId = '';
      //   this.axios({url:"select-staff-all",params:{ksId:ksId}}).then((v)=>{//查询所有病房
      //     console.log(v.data)
      //     this.staffArr = v.data;
      //   }).catch((data)=>{
      //
      //   });
      // },
      //清空住院登记方法
      PatientClear(){
        this.isShowZY = false;
        this.patientBaseObj = {//住院登记实体类
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
          listContacts:[],//病人联系人数组
          inId:'',
          ptPrice:''
        };
        this.staffArr = [];
        this.$refs['patientBaseObj'].resetFields();
      },


      //========================================住院登记方法

      //新增住院方法
      addPatientFunction(){
        // if(this.patientBaseObj.inId == ''){
        //   this.$message({
        //     type:'error',
        //     message:'未选择住院病人'
        //   });
        //   return;
        // }
        this.$refs['patientBaseObj'].validate((valid) => {
          if (valid) {
            this.axios.post("addPatient",this.patientBaseObj).then((v)=>{
              this.PatientClear();
              this.patientBaseInit();
              this.$message({
                type: 'success',
                message: '登记成功       请尽快分配床位'
              });
            }).catch((data)=>{

            });
          }
        });
      },



      //========================分页方法
      // 住院登记size变了调用
      patientHandleSizeChange: function(size) {
        this.patientSize = size;
      },
      //住院登记Current变了调用
      patientHandleCurrentChange: function(currentPage) {
        this.patientCurrent = currentPage;
      },
      // 住院申请size变了调用
      hospitalHandleSizeChange: function(size) {
        this.hospitalSize = size;
      },
      //住院申请Current变了调用
      hospitalHandleCurrentChange: function(currentPage) {
        this.hospitalCurrent = currentPage;
      }

		},
    created() {
      this.patientBaseInit();
    }
  }
</script>

<style>
	.works{
		padding: 15px;
	}
	/* .el-dialog__body{
		padding: 20px 60px;
	} */
</style>
