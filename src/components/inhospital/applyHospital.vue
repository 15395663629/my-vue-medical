<template>
  <!--=============================================查询条件===================================-->
  <el-row style="margin:0px 0px 10px 30px;padding-top: 10px;">

    <el-col :span="2">
      <el-button size="mini" @click="openFormSick" type="primary">新增</el-button>
    </el-col>


    <el-col :offset="2" :span="5">
      <el-input size="mini" v-model="doctorEnjoinWhere.searchLike" placeholder="病人姓名或者住院号"></el-input>
    </el-col>
    <el-col  :span="1">
      <el-button size="mini" @click="hospitalInit" icon="el-icon-search" type="primary" ></el-button>
    </el-col>

    <el-col :offset="1" :span="3">
      <span style="font-size: 12px;">科室：</span>&nbsp;
      <el-select size="mini" v-model="doctorEnjoinWhere.doctorType" placeholder="请选择" @change="hospitalInit"  style="width: 100px" >
        <el-option label="全部科室" value=""></el-option>
        <el-option v-for="ks in ksArr"
                   :label="ks.ksName"
                   :value="ks.ksId">
        </el-option>
      </el-select>
    </el-col>


    <el-col :offset="1" :span="9">
      &nbsp;<span style="font-size: 12px;">日期区间：</span>&nbsp;

      <el-date-picker style="width: 160px" @change="hospitalInit" v-model="doctorEnjoinWhere.startDate"
                      type="date"
                      size="mini"
                      value-format="YYYY-MM-DD"
                      placeholder="日期">
      </el-date-picker>
      &nbsp;<span style="font-size: 12px;">至</span>&nbsp;
      <el-date-picker style="width: 160px" @change="hospitalInit" v-model="doctorEnjoinWhere.endDate"
                      type="date"
                      size="mini"
                      value-format="YYYY-MM-DD"
                      placeholder="日期">
      </el-date-picker>
    </el-col>
  </el-row>


  <el-row>
		<el-col>
			<!--=============================================住院申请病人表格===================================-->
				<el-table
				    ref="multipleTable"
				    :data="InhospitalApplyArr"
				    tooltip-effect="dark"
				    style="width: 100%"
            height="550"
				    @selection-change="handleSelectionChange">
				    <el-table-column
				      prop="sick.sickName"
				      label="病人名称">
				    </el-table-column>
          <el-table-column prop="sick.sickSex" label="性别"></el-table-column>
				    <el-table-column
				      prop="inDiagnosis"
				      label="诊断结果">
				    </el-table-column>
					<el-table-column
					  prop="staff.sname"
					  label="申请人">
					</el-table-column>

          <el-table-column prop="inApplyDate" label="申请时间"></el-table-column>

					<el-table-column
					prop="ksName"
					  label="住院科室">
					</el-table-column>
					
					<el-table-column  label="操作">
						  <!--这里放操作按钮-->
						  <template  #default='scope'>
						  	<el-button size="mini" type="danger" icon="el-icon-delete" @click="callHospital(scope.row)">取消申请</el-button>
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
		</el-col>
	</el-row>






  <el-dialog title="新增住院申请"  :close-on-click-modal="false" :before-close="resetFormSick"  :close-on-press-escape="false"  v-model="isShow3" width="45%" center  ><!-- 病人新增 -->
    <el-row><!-- :rules="rules" -->
      <el-form  size="small" ref="mzSickArr" :model="mzSickArr" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-col>
          <el-form-item  prop="mcNumberCard" label="诊疗卡卡号:" >
            <el-input class="te" v-model="mzSickArr.mcNumberCard"  disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="sickName" label="姓名" >
            <el-input v-model="mzSickArr.sickName"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="sickPhone" label="电话" >
            <el-input v-model="mzSickArr.sickPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="sickIdCard" label="身份证" >
            <el-input @input="getInfo(mzSickArr.sickIdCard)" v-model="mzSickArr.sickIdCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item prop="sickAge"  label="年龄" >
            <el-input  v-model="mzSickArr.sickAge" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="sickSex" label="性别" >
            <el-select v-model="mzSickArr.sickSex" placeholder="请选择"  style="width: 188px" disabled>
              <el-option
                  v-for="item in optionsSex"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item  label="家庭地址" >
            <el-input v-model="mzSickArr.sickSite"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="ksId" label="住院科室">
            <el-select v-model="mzSickArr.ksId" placeholder="请选择" @change="ksSelectFun"  style="width: 188px" >
              <el-option v-for="ks in ksArr"
                         :label="ks.ksName"
                         :value="ks.ksId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

<!--        <el-col>-->
<!--          <el-form-item prop="sId" label="主治医生" >-->
<!--            <el-select v-model="mzSickArr.sId" placeholder="请选择"  style="width: 188px" >-->
<!--              <el-option v-for="sf in staffArr"-->
<!--                         :label="sf.staff.sname"-->
<!--                         :value="sf.staff.sid">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
        <el-col>
          <el-form-item label-width="455px">
            <el-button type="primary" @click="addHospital('mzSickArr')">确定</el-button>
            <el-button @click="resetFormSick">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>
</template>

<script>
	import {ElMessage} from "element-plus";

  export default {
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
	        return {
            rules: {//非空校验
              sickIdCard: [{ required: true, message: "身份证不能为空", trigger: 'blur' },
                { min: 6, max: 18, message: "身份证格式大于或小于18位", trigger: 'blur' }],
              sickPhone: [{ required: true, trigger: 'blur',validator:checkPhone }],
              sickName:[{required: true, message: "输入栏不能为空", trigger: 'blur'}],
              // sickSex:[{required: true, message: "输入栏不能为空", trigger: 'blur'},],
              // sickAge: [{required: true, message: "输入栏不能为空", trigger: 'blur'},],
              // mcNumberCard:[{required: true, message: "请生成诊疗卡", trigger: 'blur'}],
              ksId:[{required:true,message:"请选择住院科室！",trigger:'blur'}],
              // sId:[{required:true,message:"请选择治疗医生！",trigger:'blur'}],
            },

            //====================================住院申请数据
            InhospitalApplyObj:{//住院申请对象
              name:'',
              zdxx:'',
              idCardNo:'',
              baseInfo:'',
              sex:'',
              age:'',
              birthday:'',
              birthplace:'',
              ksId:'',//住院科室
              sId:''//主治医生
            },
            isShow3:false,//弹窗 - 病人新增
            //======================查询条件数据
            doctorEnjoinWhere:{
              startDate:'',//开始日期
              endDate:'',//结束日期
              searchLike:'',//模糊搜索
              doctorType:'',//医嘱类型
              sIdArr:[],//员工编号
              ptNo:''
            },
            InhospitalApplyArr:[],//住院申请数组
            isShowXZBR:false,//是否显示住院申请弹框

            //新增住院申请数据
            mzSickArr:{//病人新增的对象
              sickNumber:0,
              sickIdCard:"",
              sickName:"",
              sickPhone:"",
              sickAge:'',
              sickSex:"",
              sickSite:"",
              mcNumberCard:'',//诊疗卡字段
              ksId:"",//住院科室
              sId:"",//主治医师
              operatorId:'',//操作员编号
            },

            //科室集合
            ksArr:[],
            //员工集合
            staffArr:[],
          //==========================当前登录的员工信息
            staff:{}

	        }
	    },
	    methods: {
        //=========================初始化住院申请信息
        hospitalInit(){
          this.axios.post('selectNoHspApply',this.doctorEnjoinWhere).then((v)=>{
            this.InhospitalApplyArr = v.data;
            console.log(v.data)
          }).catch((data)=>{

          });

          //查询所有科室
          this.axios.post("zy-ks-list").then((v)=>{
            console.log(v.data);
            this.ksArr = v.data;
          }).catch((data)=>{

          });
          this.mzSickArr.ksId = this.staff.ksId;

          this.ksSelectFun();
        },
        //新增住院申请
        addHospital(formName){
          this.mzSickArr.operatorId = this.staff.sid;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.axios.post("add-inHospital-mzSick", this.mzSickArr).then((res) => {
                console.log(res.data)
                if (res.data) {
                  this.resetFormSick();
                  console.log("ssssss")
                  this.hospitalInit();
                  this.$message({
                    type: 'success',
                    message: '申请成功'
                  });
                }
              }).catch(() => {
              })
            }
          });
        },
        //科室修改是调用查询该科室的排班信息
        ksSelectFun(){
          //根据科室编号查询排班人员
          this.axios({url:"home-sch-byksId",params:{ksId:this.mzSickArr.ksId}}).then((v)=>{
            console.log(v.data);
            this.staffArr = v.data;
          }).catch((data)=>{

          });
        },


        //取消病人住院申请
        callHospital(row){

          this.$confirm("确定要取消住院申请", '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(()=>{
            this.axios({url:'updateHspInIs',params:{inId:row.inId}}).then((v)=>{
              this.hospitalInit();//更新数据
              this.$message({
                type: 'success',
                message: '取消成功'
              });
            }).catch((data)=>{
              this.$message({
                type: 'warning',
                message: '取消失败'
              });
            });

          }).catch(()=>{
          })
        },
        //打开新增住院申请弹框
        openFormSick(){
          this.isShow3 = true;
          this.axios.post("inserMedicalCard").then((res) => {//获取诊疗号码
            this.mzSickArr.mcNumberCard=res.data
          }).catch(() => {})
        },

        resetFormSick() { //X关闭按钮
          this.isShow3 = false;
          this.mzSickArr.sickSite="";
          this.$refs['mzSickArr'].resetFields();
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

          this.mzSickArr.sickSex=sex;
          this.mzSickArr.sickAge=age;

          if(this.mzSickArr.sickIdCard==''){
            this.mzSickArr.sickSex='';
            this.mzSickArr.sickAge='';
          }
          return  {age , sex, birth}
        },

	    },
    created() {
      this.staff = this.$store.state.token.list;//将登录存入的值在取出来
      this.hospitalInit();//初始化信息
    }

  }
</script>

<style scoped>
.works{
  padding: 15px;
}
</style>
