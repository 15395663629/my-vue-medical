<template>
  {{leftTables}}
  <el-row>
    <el-col :span="18">
      <el-input style="width:250px" class="my-el-input" v-model="input1" placeholder="请输入你要查询的病理或医生信息" ></el-input>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
    </el-col>
    <el-col :span="6">
      <el-button  type="primary" @click="isShow()" icon="el-icon-circle-plus-outline" style="margin-left: 10px" >添加病人信息</el-button>
    </el-col>
  </el-row>

  <div class="block" style="margin-top: 8px;">
    <el-date-picker v-model="guaHaoVO.dateVue"  type="date" placeholder="选择日期"
        format="YYYY年MM月DD日" @change="dateTimes()">
    </el-date-picker>
    <el-select v-model="guaHaoVO.ksId" style="width: 230px;" placeholder="请选择科室">
      <el-option
          v-for="item in options1"
          :key="item.ksId"
          :label="item.ksName"
          :value="item.ksId">
      </el-option>
    </el-select>
  </div>
<!--  表格显示-->
  <el-table size="mini" height="490" style="width: 100%"
            :data="leftTables.slice((wardCurrentPage-1)*wardPageSize,wardCurrentPage*wardPageSize)"  >
    <el-table-column label="开始时间" width="90" prop="frequency.fstartTime" ></el-table-column>
    <el-table-column label="结束时间" width="90" prop="frequency.fendTime" ></el-table-column>

    <el-table-column  label="姓名" width="90"  align="center">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" >
          <template #default>
            <p>姓名：{{ scope.row.staff.sname }}</p>
            <p>所属科室： {{ scope.row.departmentKs.ksName }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.staff.sname }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column  label="就诊地址" prop="departmentKs.ksDz" width="110" align="center">
    </el-table-column>
    <el-table-column  label="类型" width="80" align="center">
      <template #default="scope">
        <span style="margin-left: 10px">{{ scope.row.title.tname }}</span>
      </template>
    </el-table-column>

    <el-table-column label="费用"  width="70" align="center">
      <template #default="scope">
        <span style="margin-left: 10px">{{scope.row.register.rmoeny}}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作"  align="center">
      <template #default="scope">
        <div v-if="booleanDate==1">
          <el-button size="mini" type="success" @click="isDialog1(scope.row)" >当天挂号</el-button>
        </div>
        <div v-if="booleanDate==2">
          <el-button size="mini" type="warning" @click="isDialog2(scope.row)">预约挂号</el-button>
        </div>
        <div v-if="booleanDate=='' ">

        </div>
      </template>
    </el-table-column>
  </el-table>
  <!--分页插件-->
  <el-pagination  @size-change="wardHandleSizeChange" @current-change="wardHandleCurrentChange"
                  style="text-align: center; margin-top: 10px"
                  :current-page="wardCurrentPage"
                  :page-sizes="[2,4,6,8]"
                  :page-size="wardPageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="leftTables.length">
  </el-pagination>


  <el-dialog  title="当天挂号" :close-on-click-modal="false" :before-close="resetForm"  :close-on-press-escape="false" v-model="isShow1" width="44%" center  ><!-- 第一个弹窗普通挂号 -->
    <el-row><!-- :rules="rules" -->
      <el-form :rules="rules"  status-icon :model="regArr" ref="regArr" label-width="100px" size="small" class="demo-ruleForm">
        <el-col>
          <el-form-item label="挂号日期："  >
            <el-input v-model="regArr.rtOnsetTime" style="width: 300px" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="卡号：" prop="mcCard">
            <el-input class="te"  onkeyup="value=value.replace(/[^\d]/g,'')"  v-model="regArr.mcCard"  @keyup="byIdCard(regArr.mcCard)"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="就诊：" prop="rtClass">
            <el-select class="te"   v-model="regArr.rtClass" placeholder="请选择" style="width: 188px;" @change="jiZheng(regArr.rtClass)">
              <el-option
                  v-for="item in optionsRge2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="姓名：" >
            <el-input class="te"  v-model="regArr.sickName" disabled></el-input>
          </el-form-item>
        </el-col>
        <!--				<el-col >-->
        <!--					<el-form-item label="问诊诊室" >-->
        <!--						<el-input></el-input>-->
        <!--					</el-form-item>-->
        <!--				</el-col>-->
        <el-col>
          <el-form-item label="科室：" >
            <el-input class="te"  v-model="regArr.rtOverKsName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="诊断医生：" >
            <el-input class="te"  v-model="regArr.rtDoctor"  disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="医生职位：" >
            <el-input class="te"  v-model="regArr.rtDoctorGenre" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="挂号类型：" >
            <el-input class="te"  v-model="regArr.rtScience" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="挂号费：" >
            <el-input class="te" v-model="regArr.rtPrice" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label-width="455px">
            <el-button type="primary" @click="submitFormReg('regArr')">提交</el-button>
            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>

<!--
 ============================================================
-->

  <el-dialog  title="预约挂号"  :close-on-click-modal="false" :before-close="resetForm"  :close-on-press-escape="false" v-model="isShow2"  width="43%" center  ><!-- 弹窗预约挂号新增 -->
    <el-row><!-- :rules="rules" -->
      <el-form :rules="rules" size="small" status-icon :model="regArr" ref="regArr" label-width="100px" class="demo-ruleForm">
        <el-col>
          <el-form-item label="挂号日期：">
            <el-date-picker
                style="width: 350px; font-size: 15px;"
                v-model="regArr.rtOnsetTime"
                type="date"
                disabled
                format="YYYY 年 MM 月 DD 日">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="卡号：" prop="mcCard">
            <el-input class="te"  v-model="regArr.mcCard" onkeyup="value=value.replace(/[^\d]/g,'')"   @keyup="byIdCard(regArr.mcCard)"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="就诊：" prop="rtClass">
            <el-select class="te"   v-model="regArr.rtClass" placeholder="请选择" style="width: 188px;">
              <el-option
                  v-for="item in optionsRge2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="姓名：" >
            <el-input class="te"  v-model="regArr.sickName" disabled></el-input>
          </el-form-item>
        </el-col>
        <!--				<el-col >-->
        <!--					<el-form-item label="问诊诊室" >-->
        <!--						<el-input></el-input>-->
        <!--					</el-form-item>-->
        <!--				</el-col>-->
        <el-col>
          <el-form-item label="科室：" >
            <el-input class="te"  v-model="regArr.rtOverKsName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="诊断医生：" >
            <el-input class="te"  v-model="regArr.rtDoctor"  disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="医生职位：" >
            <el-input class="te"  v-model="regArr.rtDoctorGenre" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="挂号类型：" >
            <el-input class="te"  v-model="regArr.rtScience" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="挂号费：" >
            <el-input class="te" v-model="regArr.rtPrice" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label-width="455px">
            <el-button type="primary" @click="submitFormReg('regArr')">提交</el-button>
            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>

</template>

<script>
import { ElMessage } from 'element-plus'
import moment from 'moment'
  export default {
    props:{
      isShow:{
        type:Function,
        required:true,
      },
      getNowTime:{
        type:Function,
        required:true,
      },
      allRightTable:{
        type:Function,
        required:true,
      },
    },
    data(){
      var validata = (rule, value, callback) => { //table2 校验
        if (value === '') {
          callback(new Error('请输入卡号'));
        }else if(value != this.regArr.cardObject.mcCard && value != this.regArr.cardObject.mcIdCard){
          callback(new Error('卡号不存在'));
        }else{
          callback();
        }
      };
      return{
        leftTables:[],
        wardCurrentPage:1,//分页属性
        wardPageSize:4,
        token:[],//操作人员
        isShow1:false,//弹窗 - 挂号
        isShow2:false,//弹窗 - 预约挂号
        optionsRge2: [{
          value: '初诊',
          label: '初诊'
        }, {
          value: '复诊',
          label: '复诊'
        }],
        price:0,
        regArr:{
          sickName:'',//这两个不在实体类里
          mcCard:'',
          rtOnsetTime:'',
          rtClass:'',
          rtOverKsName:'',
          rtDoctor:'',
          rtType:'',
          rtScience:'',
          rtPrice:0,
          rtDoctorGenre:'',
          sId:'',
          cardObject:'',
        },
        rules: {//密码校验
          mcCard: [
            { validator: validata, trigger: 'blur' }
          ],
          rtClass:[
            {required: true, message: "请选择就诊", trigger: 'blur'}
          ],
        },
        booleanDate:0,//时间戳判断点
        options1:[],//科室选择
        sOverKsName:1,//选择科室value
        input1:'',//查询搜索框
        guaHaoVO:{
          dateVue:0,
          dateJav:0,
          ksId:1,
          text:'',
          index:0,
        },
        newDates:Date,
      }
    },
    methods:{
      //科室列表
      allAepartmentKs(){
        this.axios({ url:'allAepartmentKs' }).then((v)=>{
          this.options1=v.data;
        }).catch();
      },
      //查询排班
      selectScheduling(){
        if(this.guaHaoVO.dateVue == this.getNowTime(new Date())){
          this.guaHaoVO.index=0;
        }else{
          this.guaHaoVO.index=1;
        }
        this.axios.post('week-sch',this.guaHaoVO).then((v) => {
          this.leftTables=v.data;
          if(v.data.length<=0){
            this.$message({
              showClose: true,
              type: 'warning',
              message: "该日期暂时没有医生值班！"
            });
          }
        }).catch(() => {})
      },
      isDialog1(row){//挂号=======================================================================================
        this.isShow1 = true;
        this.regArr.rtOnsetTime =row.rq+" "+row.frequency.fstartTime+"~"+row.frequency.fendTime;
        console.log(this.regArr.rtOnsetTime)
        this.regArr.rtOverKsName=row.sOverKsName;
        this.regArr.rtDoctor=row.sDoctor
        this.regArr.rtDoctorGenre=row.sType
        this.regArr.rtScience=row.sScience
        this.price =row.sPrice;
        this.regArr.rtPrice=row.sPrice
        this.regArr.rtType='当天挂号';
        this.regArr.sId=this.token.uid;
        console.log(this.token)
      },
      submitFormReg(form){
        this.$refs[form].validate((valid)=>{
          if (valid) {
            if(this.regArr.cardObject.mcBalance < this.regArr.rtPrice){
              ElMessage.error({
                message: '您卡余额   '+this.regArr.cardObject.mcBalance+'   不足\n请前往充值页面进行充值~',
                type: 'success'
              });
            }else{
              this.axios.post('addReg',this.regArr).then((v)=>{
                console.log(v.data)
                if(v.data=='ok'){
                  ElMessage.success({
                    message: '挂号成功!,已扣取挂号费'+this.regArr.rtPrice+'元~请注意查收',
                    type: 'success'
                  });
                  this.resetForm()//刷新主界面的校验提示
                  this.allRightTable()//刷新父组件的挂号记录表查询
                }
              }).catch(function(){

              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      jiZheng(test){
        if(test == '急诊'){
          this.regArr.rtPrice =parseInt(this.regArr.rtPrice)+5;
        }else{
          this.regArr.rtPrice = this.price;
        }
      },
      isDialog2(row){//预约挂号====================================================================================
        this.isShow2 = true;
        this.regArr.rtOnsetTime =row.sDate;
        this.regArr.rtOverKsName=row.sOverKsName;
        this.regArr.rtDoctor=row.sDoctor
        this.regArr.rtDoctorGenre=row.sType
        this.regArr.rtScience=row.sScience
        this.price =row.sPrice;
        this.regArr.rtPrice=row.sPrice
        this.regArr.rtType='预约挂号';
        this.regArr.sId=this.token.uid;
      },
      resetForm(){//取消
        this.isShow2 = false;
        this.isShow1 = false;
        this.regArr={
          cardObject:'',
        };
        this.$refs['regArr'].resetFields();
      },
      getTimestamp(time) { //把时间日期转成时间戳
        return (new Date(time)).getTime() / 1000
      },
      dateTimes(){//根据时间显示按钮
        this.selectScheduling()
        var dates = this.getNowTimes(this.guaHaoVO.dateVue);
        var newDate = this.getNowTime();
        if(this.getTimestamp(dates) > this.getTimestamp(newDate)){
          this.booleanDate=1;
        }else if(this.getTimestamp(dates) == this.getTimestamp(newDate)){
          this.booleanDate=0;
        }else{
          alert("您选择日期里没有医生值班~")
        }
      },
      byIdCard(test){//实时刷新查询
        this.axios({
          url:'byIdCard',
          params:{mcCard:test}
        }).then((v)=>{
          this.regArr.cardObject=v.data;
          this.regArr.sickName=this.regArr.cardObject.mzSick.sickName;//查询到的用户名赋值到model显示属性中
        }).catch(function(){

        })
      },
      // 初始病房每页数据数wardpagesize和数据data-----------------------分页方法------------------------------
      wardHandleSizeChange: function(size) {
        this.wardPageSize = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      //初始页病房wardcurrentPage
      wardHandleCurrentChange: function(currentPage) {
        this.wardCurrentPage = currentPage;
        console.log(this.currentPage) //点击第几页allDescSick
      },
      //格式化时间样式
      getNowTimes(nowDate) {
        var now = nowDate;
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth(); //得到月份
        var date = now.getDate(); //得到日期
        // var hour =" 00:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
        // var hour = now.getHours();
        // var mf = now.getMinutes()<10 ? '0'+ now.getMinutes() : now.getMinutes();
        // var t_s = now.getTime();//转化为时间戳毫秒数
        // now.setTime(t_s + 1000 * 60 * 60 * 24)
        month = month + 1;
        month = month.toString().padStart(2, "0");
        date = date.toString().padStart(2, "0");
        var defaultDate = `${year}-${month}-${date}`;
        return defaultDate;
        // this.$set(this.info, "stockDate", defaultDate);
      },
      // //格式化时间样式
      // getNowTimes2(nowDate) {
      //   var nextDate = new Date(nowDate.getTime() + 24*60*60*1000)
      //   return nextDate;
      // },
    },
    created() {
      this.guaHaoVO.dateVue =this.getNowTime(new Date());
      this.guaHaoVO.dateJav = this.getNowTime(new Date());
      this.allAepartmentKs();//科室查询
      this.selectScheduling();//查询排班
      this.token= this.$store.state.token == null ? null : this.$store.state.token.list;//将登录存入的值在取出来
    },
  }
</script>

<style scoped>
.te /deep/ .el-input__inner {
  color: #ff0000;
  font-size: 13px;
  cursor: pointer;
}
</style>