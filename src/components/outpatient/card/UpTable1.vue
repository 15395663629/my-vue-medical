<template>
  <el-table
      :data="upList.slice((wardCurrentPage-1)*wardPageSize,wardCurrentPage*wardPageSize)"
      style="width: 100%"
      height="460" >
    <el-table-column
        label="就诊卡号"
        width="180">
      <template #default="scope">
        <span >{{ scope.row.mcCard}}</span>
      </template>
    </el-table-column>
    <el-table-column label="姓名" width="180">
      <template #default="scope" >
        <el-popover width="300" effect="light"   trigger="hover" placement="top">
          <template #default >
            <p>姓名: {{ scope.row.mzSick.sickName }}</p>
            <p>住址: {{ scope.row.mzSick.sickSite }}</p>
            <p>建立日期: {{ scope.row.mzSick.sickTime }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.mzSick.sickName }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="身份证" width="240">
      <template #default="scope">
        <span >{{ scope.row.mcIdCard}}</span>
      </template>
    </el-table-column>

    <el-table-column label="电话" width="180">
      <template #default="scope">
        <span >{{ scope.row.mzSick.sickPhone}}</span>
      </template>
    </el-table-column>

    <el-table-column label="余额" width="180">
      <template #default="scope">
        <span >{{ scope.row.mcBalance}}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button  size="mini" type="warning"  plain  @click="billCard(scope.row.mcNumber)">消费记录</el-button>
        <el-button size="mini" type="primary"   plain  @click="cardRecharge(scope.row)">诊卡充值</el-button>
        <el-button  size="mini" type="danger"   plain  @click="cardRefund(scope.row)">诊卡退款</el-button>
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
                  :total="upList.length">
  </el-pagination>

  <!-- ================================================充值================================================ -->
  <el-dialog title="提示"  :close-on-click-modal="false" :close-on-press-escape="false"
             :before-close="resetForm1"  v-model="isUpTable1" width="43%" center  ><!-- 诊疗卡充值窗口 -->
    <el-row><!-- :rules="rules" -->
      <el-form :model="ruleForm1" status-icon  ref="ruleForm1" :rules="rules1" label-width="100px" class="demo-ruleForm">
        <el-col>
          <el-form-item label="诊疗卡卡号:" >
            <el-input  class="te" v-model="cardArr.mcCard" size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="卡余额:" >
            <el-input  class="te" v-model="cardArr.mcBalance" size="small" disabled ></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="密码:" prop="pass">
            <el-input type="password"  size="small" v-model="ruleForm1.pass" placeholder="请输入您的密码"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="充值金额:" prop="upPrice">
            <el-input size="small"  onkeyup="value=value.replace(/[^\d]/g,'')"  v-model="ruleForm1.upPrice" placeholder="请输入您要充值的金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="请选择:" prop="payment">
            <el-radio-group v-model="ruleForm1.payment" size="small">
              <el-radio label="现金">现金</el-radio>
              <el-radio label="微信">微信</el-radio>
              <el-radio label="支付宝">支付宝</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label-width="125px">
            <el-button type="primary" size="small" @click="submitForm1('ruleForm1')">提交</el-button>
            <el-button @click="resetForm1" size="small">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>
  <!-- ================================================退取钱================================================ -->
  <el-dialog  :close-on-click-modal="false" :before-close="resetForm2"  :close-on-press-escape="false" title="提示" v-model="isUpTable2" width="43%" center  ><!-- 诊疗卡退款 -->
    <el-row><!-- :rules="rules" -->
      <el-form :model="ruleForm2"  status-icon :rules="rules2"  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-col>
          <el-form-item label="诊疗卡卡号:" >
            <el-input  class="te" v-model="cardArr.mcCard"   size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="卡余额:" >
            <el-input  class="te"  v-model="cardArr.mcBalance"  size="small" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="密码:" prop="pass">
            <el-input type="password" size="small" v-model="ruleForm2.pass" placeholder="请输入您的密码"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="退款余额:" prop="upPrice">
            <el-input size="small"  onkeyup="value=value.replace(/[^\d]/g,'')"  v-model="ruleForm2.upPrice" placeholder="请输入您要退款金额数"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label-width="455px">
            <el-button type="primary" size="small" @click="submitForm2('ruleForm2')">提交</el-button>
            <el-button @click="resetForm2" size="small">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>

  <!-- 消费记录表查询=================================================================================================================================================== -->
  <el-dialog title="诊疗卡消费记录"  @close="closeBill" v-model="billShow" width="50%"  destroy-on-close center>
    <el-table  size="mini"  :data="cardBill" ref="closeBills"  style="width: 100%" height="380">
      <el-table-column fixed  label="日期" align="center" >
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.cbTime }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed label="消费用途" prop="cbCause" align="center"></el-table-column>
      <el-table-column fixed label="消费金额" prop="cbPrice"  align="center" ></el-table-column>
      <el-table-column fixed label="操作医生" prop="staff.sname" align="center" ></el-table-column>
    </el-table>
  </el-dialog>

</template>

<script>
import {ElMessage} from "element-plus";//提示警告

export default{
  props:{
    upList:{
      type:Array,
      required:true
    },
  },
  data(){
    var validate1 = (rule, value, callback) => { //table1 校验
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if(value !=this.cardArr.mcPawd){
        console.log(1+"--"+value)
        callback(new Error('您输入的密码错误'));
      }else {
        if (this.ruleForm1.pass !== '') {
          this.$refs.ruleForm1.validateField('pass');
        }
        callback();
      }
    };
    var validate2 = (rule, value, callback) => { //table2 校验
      if (value === '') {
        callback(new Error('请输入金额'));
      }else if(value <= 0){
        console.log(1+"--"+value)
        callback(new Error('你输入的金额有误~'));
      }else {
        if (this.ruleForm1.upPrice !== '') {
          this.$refs.ruleForm1.validateField('upPrice');
        }
        callback();
      }
    };
    var validate3 = (rule, value, callback) => { //table2 校验
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if(value !=this.cardArr.mcPawd){
        console.log(1+"--"+value)
        callback(new Error('您输入的密码错误'));
      }else {
        if (this.ruleForm2.pass !== '') {
          this.$refs.ruleForm2.validateField('pass');
        }
        callback();
      }
    };
    var validate4 = (rule, value, callback) => { //table2 校验
      if (value === '') {
        callback(new Error('请输入金额'));
      }else if(value > this.cardArr.mcBalance){
        console.log(1+"--"+value)
        callback(new Error('请输入正确的金额~'));
      }else {
        if (this.ruleForm2.upPrice !== '') {
          this.$refs.ruleForm2.validateField('upPrice');
        }
        callback();
      }
    };
    return {
      isUpTable1:false,//充值
      isUpTable2:false,//退钱
      wardCurrentPage:1,//分页属性
      wardPageSize:4,
      token:[],
      cardArr:'',//共用的数组
      ruleForm1:{
        pass:'',
        payment:'',
        upPrice:'',
      },
      ruleForm2:{
        pass:'',
        upPrice:'',
      },
      rules1: {//密码校验
        pass: [
          { validator: validate1, trigger: 'blur' }
        ],
        payment:[
          {required: true, message: "请选择支付方式", trigger: 'blur'}
        ],
        upPrice: [
          { validator: validate2, trigger: 'blur' }
        ],
      },
      rules2: {//密码校验
        pass: [
          { validator: validate3, trigger: 'blur' }
        ],
        upPrice: [
          { validator: validate4, trigger: 'blur' }
        ],
      },
      cardBill:[],
      billShow:false,

    }
  },
  methods:{
    billCard(index){
      this.billShow=true;
      this.axios({url:'billCard',params:{card:index}}).then((v)=>{
        this.cardBill=v.data
      }).catch({});
    },
    closeBill(){
      this.billShow=false;
      this.cardBill=[];
      this.$refs.closeBills.clearSelection();
    },
    cardRecharge(row){//充值---------------------------------------------------------------
      this.isUpTable1=true;
      this.cardArr=row;
      console.log(this.cardArr)
    },
    submitForm1(formName){
      this.$refs[formName].validate((valid) => {
        console.log("formName1111111111")
        if (valid) {
          this.axios.post('setCardPrcie',{
            mcNumber:this.cardArr.mcNumber, upPrice:this.ruleForm1.upPrice,
            payment:this.ruleForm1.payment, userId:this.token.uid,index:1}).then((v)=>{
            console.log(v.data)
            if(v.data=='ok'){
              ElMessage.success({
                message: '充值成功，充值金额  '+this.ruleForm1.upPrice+"  已成功入账~",
                type: 'success'
              });
              this.resetForm1()//刷新主界面的校验提示
              this.$parent.allDescSick();//刷新主界面的表格
              this.$parent.allAlterLose()
            }
          }).catch(function(){

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm1() {//刷新 充值页面
      console.log("111111")
      this.isUpTable1=false;
      this.cardArr={
        mzSick:'',
      };
      this.ruleForm1.payment='';
      this.ruleForm1.upPrice='';
      this.ruleForm1.pass='';
      this.$refs['ruleForm1'].resetFields();
    },
    cardRefund(row){//退钱---------------------------------------------------------------
      this.isUpTable2=true;
      this.cardArr=row;
      console.log(this.cardArr)
    },
    submitForm2(formName){
      this.$refs[formName].validate((valid) => {
        console.log("formName1111111111")
        if (valid) {
          this.axios.post('setCardPrcie',{
            mcNumber:this.cardArr.mcNumber, upPrice:this.ruleForm2.upPrice,
            payment:'', userId:this.token.uid,index:2}).then((v)=>{
            console.log(v.data)
            if(v.data=='ok'){
              ElMessage.success({
                message: '退款成功，退款金额  '+this.ruleForm2.upPrice+"  请注意查收~",
                type: 'success'
              });
              this.resetForm2()//刷新主界面的校验提示
              this.$parent.allDescSick();//刷新主界面的表格
              this.$parent.allAlterLose()
            }
          }).catch(function(){

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm2() {//刷新 充值页面
      console.log("111111")
      this.isUpTable2=false;
      this.cardArr={
        mzSick:'',
      };
      this.ruleForm2.upPrice='';
      this.ruleForm2.pass='';
      this.$refs['ruleForm2'].resetFields();
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

  },
  created() {
    this.token= this.$store.state.token == null ? null : this.$store.state.token.list;//将登录存入的值在取出来
  }


}
</script>

<style scoped>
.te /deep/ .el-input__inner {
  color: red;
  font-size: 18px;
  cursor: pointer;
  width: 188px;
}
</style>