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
          <el-button type="primary"  @click="xztjEdit()">新增</el-button>
        </el-form-item>
      </el-col>
    </el-form>
	</el-row>
	<el-dialog title="新增体检人员" v-model="xztj" width="50%" center style="overflow: auto"  ><!-- 弹框      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-新增体检人员弹框======================================= -->
		<el-form v-model="man"  status-icon :rules="rules" ref="inserman" label-width="100px" class="demo-ruleForm">
			<el-row>
				<el-col :span="8">
						<el-form-item label="体检人:" prop="name">
								<el-input size="mini" v-model="man.manName"></el-input>
						</el-form-item>
				</el-col>
        <el-col :span="10">
          <el-form-item label="身份证:" prop="name">
            <el-input size="mini"  @input="getId(man.manSid)" v-model="man.manSid"></el-input>
          </el-form-item>
        </el-col>
			</el-row>
			<el-row>
					<el-col :span="7">
									<el-form-item label="性别:" prop="name">
									    <el-radio v-model="man.manGender" label="男">男</el-radio>
									    <el-radio v-model="man.manGender" label="女">女</el-radio>
									</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="年龄:" prop="name">
						<el-input size="mini" v-model="man.manAge"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="7">
            <el-form-item label="出生日期:" prop="name">
              <el-input size="mini" v-model="man.manBirthtime"></el-input>
            </el-form-item>
          </el-col>
			</el-row>
			<el-row>
        <el-col :span="8">
          <el-form-item label="手机号:" prop="name">
            <el-input size="mini" v-model="man.manPhone"></el-input>
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
                    @click="handleSelectionChange2"
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
                        <p>指标意义: {{ scope.row.tjCodeIndex.indexSignificance }}</p>
                      </template>
                      <template #reference>
                        <div class="name-wrapper">
                          <el-tag size="medium">{{ scope.row.tjCodeIndex.indexName }}</el-tag>
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
          <el-button size="mini" type=" primary"  plain>详情</el-button>
				  <el-button size="mini" type="primary" @click="manstate(scope.row)" v-show="getNowFormatDate==scope.row.manTime && scope.row.mcBalance!=null">启用</el-button>
            <el-button size="mini" type="primary" @click="aMc" v-show="scope.row.mcBalance==null">办卡</el-button>
				  <el-button size="mini"   type="danger">取消</el-button>
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
      <div  style="background-color: red;width:14px;height: 14px;float: left;margin-top: 4px"></div>:未办理诊疗卡
    </el-col>
    <el-col span="9" offset="3" style="margin-top: 6px">
      <div  style="background-color: burlywood;width:14px;height: 14px;float: left;margin-left: 33px;margin-top: 4px"></div>:预约时间即将到期
    </el-col>
  </el-row>
</template>

<script>
import qs from "qs";

export default {
    data() {
      return {
        tjsj:[],
        ksan:false,
        tc: 0,//项目选中
        //套餐
        tjmeal: '',
        // 卡片
        activeName: 'first',
        //检查项目
        tjpro: [],
        currentPage: 1, //初始页
        pagesize: 5, //    每页的数据
        //控制查询出来的人都是预约的
        manState: 0,
        // 搜索字段、
        serman: '',
        tjprox: [],//套餐详情
        // 体检人员集合
        tjman: [],
        value: '',
        // 体检人员对象
        man: {
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
        },
        xztj: false,
        input: '',
        radio: '1',
        radio1: '查看全部',
        tableData: [{
          date: '123',
          name: '爱康君安【中枢神经系统体检套餐】',
          price: '233',
          lx: '入职体检'
        }],
        isShow:[]
      }
    },
    methods: {
      // 跳转页面
      aMc(){
        this.$router.push('/UserRegistration');
      },
      // 更改表格颜色
      tableRowClassName({row, rowIndex}) {
        console.log('ka',row)
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
      //默认勾选项目
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
        console.log(this.man.manPhy)
      },
      //卡片
      handleClick(tab, event) {

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
        this.axios.get("http://localhost:8089/allMan", {params: {manState: this.manState, sermen: this.serman}
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
      //查询套餐详情新增套餐
      cheageMeal(row) {
        this.axios.get("http://localhost:8089/aloneProt", {params: {codeId: row.codeId}}).then((res) => {
          this.tjprox = res.data;
          //设置项目默认选中
          this.cleaxm()
          //强制刷新
          this.$forceUpdate();
        }).catch()
      },
      xztjEdit() {
        this.xztj = true;
      },
      // 新增体检人员确认按钮
      xztjForm(formName) {
        console.log(this.man)
        //如果手动选择了项目就重新就算价格
        if(this.man.jcXm.length!=this.tjprox.length){
          this.man.manPhy=this.tc
        }
        //如果选的时间是当前时间之前的，就将时间改成当前时间后七天
        if(this.man.manTime<this.getNowFormatDate){
          this.man.manTime=this.getNowFormatDate1(-7,this.getNowFormatDate)
        }
        this.axios.post("http://localhost:8089/addOrUpdataMan", {manj: this.man}).then((res) => {
          this.getData()
          this.inserClear(formName);
        }).catch()
        this.xztj = false
      },
      //体检人员修改状态
      manstate(row){
        this.$confirm('是否确认启用?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.manj(row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
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
          this.axios.get("http://localhost:8089/aloneCard", {params: {sId:row.manSid}}).then((res) => {
              res.data.forEach(v=>{
                console.log(v.mcBalance)
                aa=v.mcBalance
              })
            if(aa>=row.manPhy){
              //调用扣钱方法
              this.updmoney(aa-row.manPhy,row.manSid)
              //修改状态方法
              this.manu(row)
              this.$message({
                message: '已启用，消费'+row.manPhy+'元',
                type: 'success'
              });
            }else if(aa<row.manPhy){
              this.$message.error('卡上余额不足，请充值');
            }else {
              this.$message({
                message: '请先办理诊疗卡',
                type: 'warning'
              });
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
      inserClear(formName) {
          this.$refs.jcxmtable.clearSelection();
          this.$refs.tcdata.clearSelection();
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

