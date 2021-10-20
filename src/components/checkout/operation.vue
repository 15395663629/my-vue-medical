<template>
	<el-row class="row-one">
    <el-form label-width="100px" style="padding-top: 10px" >
      <el-col :span="5">
        <el-form-item  label="体检人员信息:" label-width="100px">
          <el-input   @input="getData" style="width: 200px" v-model="serman" placeholder="请输入你要查询的体检人员" ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="" label-width="92px">
          <el-button @click="getData" type="primary" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="5" >
        <el-form-item label="" label-width="449px">
          <el-button type="primary"  @click="xztjEdit(1)">新增</el-button>
        </el-form-item>
      </el-col>
    </el-form>
	</el-row>


<!--办理诊疗卡弹框------------------------------------------------------------------------------------------------------------------>
  <el-dialog title="提示"  :close-on-click-modal="false" :before-close="resetFormSick"  :close-on-press-escape="false"  v-model="isShow3" width="45%" center  ><!-- 病人新增 -->
    <el-row><!-- :rules="rules" -->
      <el-form  size="small" ref="mzSickArr" :model="mzSickArr" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-col>
          <el-form-item prop="sickName" label="姓名" >
            <el-input v-model="mzSickArr.sickName"  disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="sickPhone" label="电话" >
            <el-input  v-model="mzSickArr.sickPhone"  disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="sickIdCard" label="身份证" >
            <el-input  @input="getInfo(mzSickArr.sickIdCard)" v-model="mzSickArr.sickIdCard"  disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="sickAge"  label="年龄" >
            <el-input readonly="readonly"  v-model="mzSickArr.sickAge"   disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item prop="sickSex" label="性别" >
            <el-select readonly="readonly" v-model="mzSickArr.sickSex" placeholder="请选择"  style="width: 188px">
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
            <el-input v-model="mzSickArr.sickSite" ></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item  prop="mcNumberCard" label="诊疗卡卡号:"  >
            <el-input class="te" v-model="mzSickArr.mcNumberCard"  disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item  label-width="10px">
            <el-button type="primary" @click="submitMedicalCard('mzSickArr')" icon="el-icon-paperclip" size="small">生成诊疗卡</el-button>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label-width="455px">
            <el-button type="primary" @click="submitMzSick('mzSickArr')">提交</el-button>
            <el-button @click="resetFormSick">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>


	<el-dialog :title=tiltm v-model="xztj" width="50%" :before-close="xgman" center style="overflow: auto"  ><!-- 弹框      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-新增体检人员弹框======================================= -->
		<el-form :model="man"  status-icon :rules="rulesm" ref="inserman" label-width="100px" class="demo-ruleForm">
			<el-row>
				<el-col :span="8">
						<el-form-item label="体检人:" prop="manName">
								<el-input size="mini" v-model="man.manName"></el-input>
						</el-form-item>
				</el-col>
        <el-col :span="10">
          <el-form-item label="身份证:" prop="manSid">
            <el-input size="mini"  @input="getId(man.manSid)" v-model="man.manSid"></el-input>
          </el-form-item>
        </el-col>
			</el-row>
			<el-row>
					<el-col :span="8">
									<el-form-item label="性别:" prop="name">
									    <el-radio v-model="man.manGender" label="男">男</el-radio>
									    <el-radio v-model="man.manGender" label="女">女</el-radio>
									</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="年龄:" prop="manAge">
						<el-input readonly="readonly" size="mini" v-model="man.manAge"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="7">
            <el-form-item label="出生日期:" prop="manBirthtime">
              <el-input readonly="readonly" size="mini" v-model="man.manBirthtime"></el-input>
            </el-form-item>
          </el-col>
			</el-row>
			<el-row>
        <el-col :span="8">
          <el-form-item label="手机号:" prop="manPhone">
            <el-input size="mini" v-model="man.manPhone"  oninput="value=value.replace( /^1[0-9]{11}$/,'')"></el-input>
          </el-form-item>
        </el-col>
				<el-col :span="7">
					<el-form-item label="体检时间:" prop="name">
						<div  class="block">
						    <el-date-picker
                    v-model="man.manTime"
                    size="mini"
                    @input="console.log(man.manTime)"
						      type="date"
						      placeholder="选择日期">
						    </el-date-picker>
						  </div>
					</el-form-item>
					
				</el-col>
				
			</el-row>

			<el-row >
        <!-- ==================================================================套餐表格 ==================================================================-->
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane style="width:730px" label="套餐选择" name="first">
              <el-table size="mini" :data="tjmeal" ref="tcdata" @selection-change="handleSelectionChange"
                        @select="select"
                        @select-all="false"
                        height="230">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column label="编号" width="180">
                  <template #default="scope">
                    <span>{{ scope.row.codeId }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="套餐名称" width="200">
                  <template #default="scope">
                    <el-popover effect="light" trigger="hover"  placement="top">
                      <template #default>
                        <p>套餐名称: {{ scope.row.codeName }}</p>
                      </template>
                      <template #reference>
                        <div class="name-wrapper">
                          <el-tag size="medium">{{ scope.row.codeName }}</el-tag>
                        </div>
                      </template>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="价格">
                  <template #default="scope">
                    <span style="margin-left: 10px">{{ scope.row.codePay }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="体检类型">
                  <template #default="scope">
                    <span style="margin-left: 10px">{{ scope.row.checkIndex }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <!-- ==================================================================项目表格 ==================================================================-->

            <el-tab-pane style="width:730px"  label="项目选择" name="second">
              <el-table size="mini" height="230" :data="tjpro"
                        @selection-change="handleSelectionChange1"
                        ref="jcxmtable"  style="width: 100%;">
                <el-table-column
                    :reserve-selection="true"
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column label="编号" width="180" prop="checkId">
                </el-table-column>

                <el-table-column label="医疗项目名称" prop="checkName" >
                  <template #default="scope">
                    <el-popover effect="light" trigger="hover"  placement="top">
                      <template #default>
                        <p>项目名称: {{ scope.row.checkName }}</p>
                      </template>
                      <template #reference>
                        <div class="name-wrapper">
                          <el-tag size="medium">{{ scope.row.checkName }}</el-tag>
                        </div>
                      </template>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="价格" prop="checkPay">
                </el-table-column>
                <el-table-column label="指标" prop="indexName">
                  <template #default="scope">
                    <el-popover effect="light" trigger="hover"  placement="top">
                      <template #default>
                        <p>指标意义: {{ scope.row.indexSignificance }}</p>
                      </template>
                      <template #reference>
                        <div class="name-wrapper">
                          <el-tag size="medium">{{ scope.row.indexName }}</el-tag>
                        </div>
                      </template>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>

			</el-row>
			<el-form-item>
							  <el-col :span="1" :offset="8">
							<el-button type="primary" @click="xztjForm('inserman')">确定</el-button>
							</el-col>
			</el-form-item>
		</el-form>
	</el-dialog>

  <el-dialog title="确认启用?" v-model="qyry" width="50%" center style="overflow:auto"  ><!-- 弹框      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-启用体检人员======================================= -->

          <!-- ==================================================================项目表格 ==================================================================-->
        <el-form>
          所含项目
            <el-table size="mini" height="230" :data="aloneg"
                        style="width: 100%;">
              <el-table-column label="编号" width="180" prop="checkId">
              </el-table-column>

              <el-table-column label="医疗项目名称" prop="checkName" >
                <template #default="scope">
                  <el-popover effect="light" trigger="hover"  placement="top">
                    <template #default>
                      <p>项目名称: {{ scope.row.checkName }}</p>
                    </template>
                    <template #reference>
                      <div class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.checkName }}</el-tag>
                      </div>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="价格" prop="checkPay">
              </el-table-column>
              <el-table-column label="指标" prop="indexName">
                <template #default="scope">
                  <el-popover effect="light" trigger="hover"  placement="top">
                    <template #default>
                      <p>指标意义: {{ scope.row.indexSignificance }}</p>
                    </template>
                    <template #reference>
                      <div class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.indexName }}</el-tag>
                      </div>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
      <el-form-item>
        <el-col :span="13">
          <span>请输入密码:</span>
          <el-input type="password" v-model="rlmm"  style="margin-top: 5px;width: 300px"></el-input>
        </el-col>
        <el-col :span="1" :offset="6">
            <el-button style="margin-top: 5px" type="primary" @click="qyryForm()">确定</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </el-dialog>


	<!-- ==================================================体检人员表================================================== -->
	<el-row>
		<el-col>
			<el-table :data="tjman.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="450"  tooltip-effect="dark" :row-class-name="tableRowClassName" style="width: 100%;">
			    <el-table-column
			      label="编号"
				  prop="manId"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="manName"
			      label="姓名">
            <template #default="scope">
              <el-popover effect="light" trigger="hover"  placement="top">
                <template #default>
                  <p>姓名: {{ scope.row.manName }}</p>
                  <p>年龄: {{ scope.row.manAge }}</p>
                  <p>出生日期: {{ scope.row.manBirthtime }}</p>
                </template>
                <template #reference>
                  <div class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.manName }}</el-tag>
                  </div>
                </template>
              </el-popover>
            </template>
			    </el-table-column>
			    <el-table-column
              width="60"
			      prop="manGender"
			      label="性别">
			    </el-table-column>
				<el-table-column
				  prop="manPhone"
				  label="手机号">
				</el-table-column>
				<el-table-column
            width="200"
				  prop="manSid"
				  label="身份证">
				</el-table-column>
        <el-table-column
            prop="manPhy"
            label="价格">
        </el-table-column>
				<el-table-column
				  prop="manTime"

				  label="体检时间">
				</el-table-column>
				<el-table-column
          width="220px"
				  label="操作">
          <template #default="scope">
          <el-button size="mini" @click="xztjEdit(0,scope.row)" type="primary" >修改</el-button>
				  <el-button size="mini" type="primary" @click="qyryEdit(scope.row)" v-show="getNowFormatDate==scope.row.manTime && scope.row.mcBalance!=null">启用</el-button>
          <el-button size="mini" type="primary" @click="aMc(scope.row)" v-show="scope.row.mcBalance==null">办卡</el-button>
				  <el-button size="mini"  @click="deletman(scope.row)" type="danger">取消</el-button>
          </template>
				</el-table-column>
				
			  </el-table>
			  <!--分页插件-->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[2,4,6,8,10]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tjman.length">
      </el-pagination>
		</el-col>
	</el-row>
  <el-row>
    <el-col span="8" style="margin-top: 6px">
      <span style="color: red">未办理诊疗卡</span>
    </el-col>
    <el-col span="9" offset="8" style="margin-top: 6px">
      <span style="color: burlywood;margin-left: 20px;padding: 10px">预约时间即将到期</span>
    </el-col>
  </el-row>
</template>

<script>
import qs from "qs";
import {ElMessage} from "element-plus";

export default {
    data() {
      return {
        rlmm:'',//诊疗卡密码
        ryrow:[],//启用row
        tiltm:'',//弹框标题
        tjsj:[],
        ksan:false,
        tc: 0,//项目选中\
        Res:[],
        //套餐
        tjmeal: '',
        // 卡片
        activeName: 'first',
        //检查项目
        tjpro: [],
        currentPage: 1, //初始页
        pagesize:10, //    每页的数据
        //控制查询出来的人都是预约的
        manState: 0,
        token:[],//当前用户
        // 搜索字段、
        serman: '',
        aloneg:[],//体检人员所含项目
        tjprox: [],//套餐详情
        // 体检人员集合
        tjman: [],
        value: '',
        mzSickArr:{//病人新增的对象
          sickNumber:0,
          sickIdCard:"",
          sickName:"",
          sickPhone:"",
          sickAge:'',
          sickSex:"",
          sickSite:"",
          mcNumberCard:'',//诊疗卡字段
        },
        rulesm:{
          manName:[
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          manSid:[
            { required: true, message: '请输入身份证', trigger: 'blur' }
          ],
          manPhone:[
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
        },
        // 体检人员对象
        man: {
          manId: 0,
          manName: '',
          manSid: '',
          manGender: '',
          manTime: '',
          manBirthtime: '',
          manAge: '',
          manPhone:'',
          manPhy: '',
          manState: '',
          manProposal:'',
          manMzZyId:'',
          manMzZyIs:'',
        },
        isShow3:false,//诊疗卡弹框
        qyry:false,//启用弹框
        xztj: false,//新增修改弹框
        input: '',
        radio: '1'
      }
    },
    methods: {
      submitMzSick(formName) { // 确定病人新增
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {

            this.axios.post("addMzSick", this.mzSickArr).then((res) => {
              console.log(res.data)
              if (res.data == 'ok') {
                this.resetFormSick()
              }
            }).catch(() => {
            })
          }
        });
        this.isShow3=false
        this.getData()
      },
      // 办理诊疗卡
      aMc(row){
        this.mzSickArr.sickName=row.manName
        this.mzSickArr.sickPhone=row.manPhone
        this.mzSickArr.sickIdCard=row.manSid
        this.mzSickArr.sickAge=row.manAge
        this.mzSickArr.sickSex=row.manGender
        this.isShow3=true
      },
      // 更改表格颜色
      tableRowClassName({row, rowIndex}) {
        if (row.manTime === this.getNowFormatDate1(-1,this.getNowFormatDate)) {
          return 'warning-row';
        }else if (row.mcBalance == null) {
          return 'danger-row';
        }
        return '';
      },
      //获取当前时间后七天
      getNowFormatDate1(num,time) {
        let n = num;
        let d = '';
        if(time) {
          d = new Date(time);
        } else {
          d = new Date();
        }
        let year = d.getFullYear();
        let mon = d.getMonth() + 1;
        let day = d.getDate();
        if(day <= n) {
          if(mon > 1) {
            mon = mon - 1;
          } else {
            year = year - 1;
            mon = 12;
          }
        }
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return s;
      },
      //修改时间
      alonem(manTime,manId){
        this.axios.post('http://localhost:8089/updTjman', qs.stringify({manTime:manTime,manId:manId}))
            .then((v)=>{
              if(v.data == 'ok'){

              }else{
                alert(v.data);
              }
            }).catch(function(){
        })
      },
      //默认勾选项目选择套餐时
      cleaxm() {
        this.$refs.jcxmtable.clearSelection();
        for (let i = 0; i < this.tjprox.length; i++) {
          for (let j = 0; j < this.tjpro.length; j++) {
            if (this.tjprox[i].checkId == this.tjpro[j].checkId) {
              this.$refs.jcxmtable.toggleRowSelection(this.tjpro[j], true)
            }
          }
        }
      },
      //设置单选
      select(selection, row) {
        this.$refs.tcdata.clearSelection();
        if (selection.length === 0) { // 判断selection是否有值存在
          return;
        }
        this.$refs.tcdata.toggleRowSelection(row, true);

      },
      //套餐多选赋值
      handleSelectionChange(val) {
        // 只选择套餐时算套餐价格
        var ss=0;
        val.forEach(v => {
          // 查询套餐中的检查项目，
          this.cheageMeal(v)
          ss=v.codePay
        })
        this.man.manPhy=ss;
      },
      //套餐项目多选赋值
      handleSelectionChange1(val) {
        var ss = [];
        var aa = 0;
        val.forEach(v => {
          ss.push(v.checkId)
          aa=aa+v.checkPay
        })
        this.tc=aa;
        this.man.jcXm = ss;
      },
      //卡片
      handleClick(tab, event) {

      },
      //默认勾选项目修改时
      cleaxm1() {
        this.$refs.jcxmtable.clearSelection();
        this.$refs.tcdata.clearSelection();
        for (let i = 0; i < this.aloneg.length; i++) {
          for (let j = 0; j < this.tjpro.length; j++) {
            if (this.aloneg[i].checkId == this.tjpro[j].checkId) {
              this.$refs.jcxmtable.toggleRowSelection(this.tjpro[j], true)
            }
          }
        }
      },
      submitMedicalCard(formName) { // 生成诊疗卡卡号
        this.axios.post("inserMedicalCard").then((res) => {
          console.log(res.data)
          this.mzSickArr.mcNumberCard=res.data
          ElMessage.success({
            message: '恭喜你，生成成功~',
            type: 'success'
          });
          console.log("1111")
        }).catch(() => {})

      },
      // 查询体检人员所含项目
      aloneMp(row,is){
        this.axios.get("http://localhost:8089/aloneMp", {params: {manId: row.manId}
        }).then((res) => {
          this.aloneg = res.data;
          //判断是否为需要渲染
          if(is!=1){
            this.cleaxm1()
            //强制渲染
            this.$forceUpdate();
          }
        }).catch()
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        console.log(this.currentPage) //点击第几页
      },
      // 体检套餐检查项目基础参数================
      getMeal() {
        this.axios.get("http://localhost:8089/allDescTjpro", {params: {seach: this.seach}}).then((res) => {
          this.tjpro = res.data;
        }).catch()
        this.axios.get("http://localhost:8089/allMeal", {
          params: {
            codeType: this.CodeType
          }
        }).then((res) => {
          this.tjmeal = res.data;
        }).catch()
      },
      // 体检人员预约参数
      getData() {
        var bb=this.getNowFormatDate1(-7,this.getNowFormatDate)
        var aa=[];
        this.axios.get("http://localhost:8089/allMan", {params: {sermen: this.serman}
        }).then((res) => {
          //如果当前客户体检时间已过期自动将时间调为未来第七天
          res.data.forEach(v=>{
            if(v.manTime<this.getNowFormatDate){
              this.alonem(bb,v.manId)
            }
          })
          this.$forceUpdate();
          this.tjman = res.data;
        }).catch()
      },
      //查询套餐详情所含项目
      cheageMeal(row) {
        this.axios.get("http://localhost:8089/aloneProt", {params: {codeId: row.codeId}}).then((res) => {
          this.tjprox = res.data;
          //设置项目默认选中
          this.cleaxm()
          //强制刷新
          this.$forceUpdate();
        }).catch()
      },
      //启用打开
      qyryEdit(row){
        this.ryrow=row;
        this.aloneMp(row,1)
        this.qyry=true;
      },
      //启用确认按钮
      qyryForm(){

        this.manstate(this.ryrow)
      },
      //打开新增修改弹框
      xztjEdit(is,row) {
        this.inserClear()
        this.tiltm = is == 1 ? '新增体检人员' : '修改体检人员';//设置弹框标题
        if(row != undefined){//判断是否有值
          this.activeName='second';
          this.man.manId=row.manId;
          this.man.manName=row.manName
          this.man.manSid=row.manSid
          this.man.manGender=row.manGender
          this.man.manBirthtime=row.manBirthtime
          this.man.manAge=row.manAge
          this.man.manPhone=row.manPhone
          this.man.manTime=row.manTime
          //调用查询体检人员所含项目方法
          this.aloneMp(row)
        }
        this.xztj = true;
      },
      // 新增体检人员确认按钮
      xztjForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //如果手动选择了项目就重新就算价格
            if(this.man.jcXm.length!=this.tjprox.length){
              this.man.manPhy=this.tc
            }
            //如果选的时间是当前时间之前的，就将时间改成当前时间后七天
            if(this.man.manTime<this.getNowFormatDate){
              this.man.manTime=this.getNowFormatDate1(-7,this.getNowFormatDate)
            }
            if(this.man.jcXm.length!=0){
              this.axios.post("http://localhost:8089/addOrUpdataMan", {manj: this.man}).then((res) => {
                this.getData()
                this.inserClear();
              }).catch()
              this.xztj = false
            }else {
              this.$message.error('所选项目不能为空');
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      //体检人员修改状态
      manstate(row){
        //调用查询诊疗卡方法
          this.manj(row)
      },
      //体检人员弹框x
      xgman(){
        this.xztj=false;
        this.$refs['inserman'].resetFields();
      },
      //删除人员
      deletman(row){
        this.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('http://localhost:8089/delet-man', qs.stringify({manId:row.manId}))
              .then((v)=>{
                if(v.data == 'ok'){
                  this.getData()
                }else{
                  alert(v.data);
                }
              }).catch(function(){

          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //修改状态方法
      manu(row){
         this.axios.post('http://localhost:8089/upde-tman', qs.stringify({manState:1,manId:row.manId}))
            .then((v)=>{
              if(v.data == 'ok'){
                this.getData()
              }else{
                alert(v.data);
              }
            }).catch(function(){
        })
      },
      //查询诊疗卡
      manj(row){
        let aa='没卡';
        let bb=this.rlmm;
        let cc='';
          this.axios.get("http://localhost:8089/aloneCard", {params: {sId:row.manSid}}).then((res) => {
              res.data.forEach(v=>{
                console.log(v.mcPawd)
                aa=v.mcBalance
                cc=v.mcPawd
              })
            if(bb==cc){
              if(aa>=row.manPhy){
                //调用扣钱方法
                this.updmoney(aa-row.manPhy,row.manSid)
                this.token =this.$store.state.token//获取当前用户
                this.aloneg.forEach(v=>{
                  this.Res.push({'checkId':v.checkId,manResult:v.tjCodeIndex,manId:row.manId,sId:this.token.list.sid})
                })
                //批量新增结果
                this.axios.post("http://localhost:8089/resAdd",{listArr:this.Res}).then((res)=>{
                  this.getData();
                }).catch()
                //修改状态方法
                this.manu(row)
                this.$message({
                  message: '已启用，消费'+row.manPhy+'元',
                  type: 'success'
                });
                this.qyry=false;
              }else if(aa<row.manPhy){
                this.$message.error('卡上余额不足，请充值');
              }
            }else {
              this.$message.error('密码错误');
            }

        }).catch(function(){
        })
      },
      //修改金额方法
      updmoney(mcBalance,mcIdCard){
        this.axios.post('http://localhost:8089/updeMoney', qs.stringify({mcBalance:mcBalance,mcIdCard:mcIdCard}))
            .then((v)=>{
              if(v.data == 'ok'){

              }else{
                alert(v.data);
              }
            }).catch(function(){
        })
      },
    //身份证日期获取
      getId(idCard) {
      let sex = null;
      let birth = null;
      let age = null;

      let myDate = new Date();
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();

      if (idCard.length === 18) {
        age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
        sex = idCard.substring(16, 17);
        birth = idCard.substring(6, 10) + "-" + idCard.substring(10, 12) + "-" + idCard.substring(12, 14);
        if (idCard.substring(10, 12) < month || idCard.substring(10, 12) === month && idCard.substring(12, 14) <= day) age++;

      }
      if (idCard.length === 15) {
        age = myDate.getFullYear() - idCard.substring(6, 8) - 1901;
        sex = idCard.substring(13, 14);
        birth = "19" + idCard.substring(6, 8) + "-" + idCard.substring(8, 10) + "-" + idCard.substring(10, 12);
        if (idCard.substring(8, 10) < month || idCard.substring(8, 10) === month && idCard.substring(10, 12) <= day) age++;
      }

      if (sex % 2 === 0)
        sex = '女';  // 性别代码 1代表男，0代表女，暂时不涉及其他类型性别
      else
        sex = '男';

      this.man.manGender = sex;
      this.man.manAge = age;
      this.man.manBirthtime = birth;

      if (this.man.manSid == '') {
        this.man.manSid = '';
        this.man.manBirthtime = '';
      }
      return {age, sex, birth}
    },
    //清空弹框
      inserClear() {
          // this.$refs.jcxmtable.clearSelection();
          // this.$refs.tcdata.clearSelection();
        // 体检人员对象
        this.man= {
              manId: 0,
              manName: '',
              manSid: '',
              manGender: '',
              manTime: '',
              manBirthtime: '',
              manAge: '',
              manPhone: '',
              manPhy: '',
              manState: '',
              jcXm: '',
        }
      }
    },
    filters:{
      formatDate(time){
        let date=new Date(time)
        return formatDate(date,'yyyy-MM-dd')
      }
    },
    computed:{
      //获取当前时间
      getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      }

    },created() {
      this.getData()
      this.getMeal()
    },
  }
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .danger-row {
  color: #ff0000;
}
</style>

