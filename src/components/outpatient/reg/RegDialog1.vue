<template>
  {{}}
  <el-row>
    <el-col :span="18">
      <el-input style="width:200px" class="my-el-input" v-model="guaHaoVO.text" clearable placeholder="医生姓名查询" ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="selectScheduling">查询</el-button>
    </el-col>
    <el-col :span="6">
      <el-button  type="primary" @click="isShow()" icon="el-icon-circle-plus-outline" style="float: right" >添加病人信息</el-button>
    </el-col>
  </el-row>

  <div class="block" style="margin-top: 8px;">
    <el-date-picker v-model="guaHaoVO.dateVue" clearable type="date" placeholder="清空后默认七天内的排班"
        format="YYYY年MM月DD日" @change="selectScheduling">
    </el-date-picker>
    <el-select v-model="guaHaoVO.ksId" style="width: 150px;" clearable @change="selectScheduling" placeholder="请选择科室">
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
    <el-table-column label="排班日期" width="90" prop="rq" ></el-table-column>
    <el-table-column  label="结束&开始" width="90"  align="center">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" >
          <template #default>
            <p>开始时间：{{ scope.row.frequency.fstartTime }}</p>
            <p>结束时间： {{ scope.row.frequency.fendTime }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag type="danger" size="medium">{{ scope.row.frequency.fendTime }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>
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
        <div v-if="scope.row.indexs==0">
          <el-button size="mini" type="success" @click="isDialog1(scope.row,0)" plain>当天挂号</el-button>
        </div>
        <div v-if="scope.row.indexs==1">
          <el-button size="mini" type="warning" @click="isDialog1(scope.row,1)" plain>预约挂号</el-button>
        </div>
        <div v-else>

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


  <el-dialog  title="挂号" :close-on-click-modal="false" :before-close="resetForm"  :close-on-press-escape="false" v-model="isShow1" width="44%" center  ><!-- 第一个弹窗普通挂号 -->
    <el-row><!-- :rules="rules" -->
      <el-form :rules="rules"  status-icon :model="regArr" ref="regArr" label-width="100px" size="small" class="demo-ruleForm">
        <el-col>
          <el-form-item label="挂号日期："  >
            <el-input v-model="regArr.rtOnsetTime" style="width: 300px" disabled></el-input>430224199805045517
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="卡号：" prop="mcCard">
            <el-input class="te" style="width: 190px"  onkeyup="value=value.replace(/[^\d]/g,'')" clearable  v-model="regArr.mcCard"  @keyup="byIdCard(regArr.mcCard)"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="就诊：" prop="rtClass">
            <el-select class="te"   v-model="regArr.rtClass" placeholder="请选择" style="width: 188px;" >
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
        <el-col :span="12" :offset="5" >
          <el-form-item label="" prop="radioSf">
              <el-radio-group v-model="regArr.radioSf">
                <el-radio :label="1">其他收费</el-radio>
                <el-radio :label="2">诊疗卡收费</el-radio>
              </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="float: right">
          <el-form-item label-width="0px" >
            <el-button type="primary" @click="submitFormReg('regArr')">提交</el-button><!--  submitFormReg('regArr')   -->
            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>

</template>

<script>
import { ElMessage } from 'element-plus'
import { h } from 'vue'
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
          ksId:null,
          cardObject: {},
          //判断选项缴费
          radioSf:null,
          doctorSid:0,
        },
        rules: {//密码校验
          mcCard: [
            { validator: validata, trigger: 'blur' }
          ],
          rtClass:[
            {required: true, message: "请选择就诊", trigger: 'blur'}
          ],
          radioSf:[
            {required: true, message: "请选择支付方式", trigger: 'blur'}
          ]
        },
        booleanDate:0,//时间戳判断点
        options1:[],//科室选择
        sOverKsName:1,//选择科室value
        guaHaoVO:{
          dateVue:0,
          dateJav:0,
          ksId:null,
          text:null,
          index:0,
        },
        //现在时间（格式话后的时间）
        newDates:this.getNowTimes(new Date()),
      }
    },
    methods:{
      //收取费用
      guaHaoPrinting(){
        this.axios.post('addReg',{regArr:this.regArr,radioSf:this.regArr.radioSf}).then((v)=>{
          console.log(v.data)
          if(v.data=='ok'){
            if(this.regArr.radioSf==2){
              ElMessage.success({
                message:'挂号成功!挂号费用为'+this.regArr.rtPrice+'元\n诊疗卡余额'+(this.regArr.cardObject.mcBalance-this.regArr.rtPrice)+'元~请注意查收',
                type: 'success'
              });
            }else{
              ElMessage.success({
                message: '挂号成功!挂号费用为'+this.regArr.rtPrice+'请注意查收',
                type: 'success'
              });
            }
            this.resetForm()//刷新主界面的校验提示
            this.allRightTable()//刷新父组件的挂号记录表查询
          }
        }).catch(function(){})
      },
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
          this.leftTables=[];
          if(v.data.length<=0){
            this.$message({
              showClose: true,
              type: 'warning',
              message: "该日期暂时没有医生值班！"
            });
          }else{
            this.leftTables=v.data;
            this.dateTimes(this.leftTables);
          }
        }).catch(() => {})
      },
      isDialog1(row,index){//挂号=======================================================================================
        this.isShow1 = true;
        this.regArr.rtOnsetTime =row.rq+" "+row.frequency.fstartTime;/*+"~"+row.frequency.fendTime*/
        console.log(this.regArr.rtOnsetTime)
        this.regArr.rtOverKsName=row.departmentKs.ksName;
        this.regArr.ksId = row.departmentKs.ksId;
        this.regArr.rtDoctor=row.staff.sname;
        this.regArr.rtDoctorGenre=row.title.tname
        this.regArr.rtScience=row.title.tname+"号",
        // this.price = row.register.rmoeny;
        this.regArr.rtPrice=row.register.rmoeny
        this.regArr.doctorSid = row.staff.sid;//医师员工id
        if(index==0){
          this.regArr.rtType='当天挂号';
        }else{
          this.regArr.rtType='预约挂号';
        }
        this.regArr.sId=this.token.uid;
        console.log(this.token)
      },
      //挂号收费
      submitFormReg(form){
        this.$refs[form].validate((valid)=>{
          if (valid) {
            if(this.regArr.radioSf == 2){
              if(this.regArr.cardObject.mcBalance < this.regArr.rtPrice){
                ElMessage.error({
                  message: '您卡余额   '+this.regArr.cardObject.mcBalance+'   不足\n请前往充值页面进行充值~',
                  type: 'success'
                });
              }else{
                let that = this;
                this.$prompt('密码输入', '提示', {
                  inputPlaceholder: '请输入您要缴费的卡号密码',
                  inputType:"password",
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  inputErrorMessage: '输入不能为空',
                  inputValidator: (value) => {       // 点击按钮时，对文本框里面的值进行验证
                    if(value !=this.regArr.cardObject.mcPawd) {
                      return '密码错误';
                    }
                  },
                }).then(({ value }) => {
                  if(value == this.regArr.cardObject.mcPawd) {
                    this.guaHaoPrinting()
                  }
                }).catch(() => {
                  that.$message({
                    showClose: true,
                    type: 'info',
                    message: '取消挂号'
                  });
                })
              }

            }else{
              this.$confirm('请确认已完成缴费需求!', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              }).then(() => {
                    this.guaHaoPrinting()
              }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消挂号',
                    })
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(){//取消
        this.isShow1 = false;
        this.regArr={
          cardObject:'',
        };
        this.$refs['regArr'].resetFields();
      },
      getTimestamp(time) { //把时间日期转成时间戳
        return (new Date(time)).getTime() / 1000
      },
      dateTimes(row){//根据时间显示按钮
        var newDate = this.getNowTime();
        if(row.length>0){
          row.forEach((v,i)=>{
            console.log(v.indexs)
            if(this.getTimestamp(v.rq) > this.getTimestamp(newDate)){
              v.indexs=1;
            }else if(this.getTimestamp(v.rq) == this.getTimestamp(newDate)){
              v.indexs=0;
            }else{
              v.indexs=2;
            }
          })
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
        if(nowDate !=null){
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
        }
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