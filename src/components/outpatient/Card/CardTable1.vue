<template>
  <el-table
      :data="mzSickList.slice((wardCurrentPage-1)*wardPageSize,wardCurrentPage*wardPageSize)"
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

    <el-table-column label="操作" min-width="200px" align="center" ><!-- 这里得做个判断，如果是挂失记录查询就不显示操作 -->
      <template #default="scope">
        <el-button
            size="mini"
            type="primary"
            plain
            @click="isPawd(scope.row)">修改密码</el-button>
        <el-button
            size="mini"
            type="warning"
            plain
            @click="pawdReset(scope.row.mcNumber)">重置密码</el-button>
        <el-button
            size="mini"
            type="danger"
            plain
            @click="isCard(scope.row)">挂失补办</el-button>
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
                  :total="mzSickList.length">
  </el-pagination>
  <!-- ================================================密码修改================================================ -->
  <el-dialog :close-on-click-modal="false" :close-on-press-escape="false"
             :before-close="resetForm1" title="提示" v-model="isShowPawd" width="27%" center  >
    <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码" prop="pass">
        <el-input size="small" type="password" v-model="ruleForm1.pass" style="width: 200px" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pawd">
        <el-input size="small" type="password" v-model="ruleForm1.pawd" style="width: 200px" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input size="small" type="password" v-model="ruleForm1.checkPass" style="width: 200px" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item >
          <el-button size="mini" type="primary" @click="submitFormPawd('ruleForm1')">提交</el-button>
          <el-button size="mini" @click="resetForm1">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- ================================================挂失补办================================================ -->
  <el-dialog :close-on-click-modal="false" :close-on-press-escape="false"
               :before-close="resetForm2" title="提示" v-model="isShowCard" width="32%" center  >
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-radio-group v-model="radio1" class=" my-radio-group"  size="mini">
        <el-radio-button label="挂失补办" @click="isShowTable(1)"></el-radio-button>
        <el-radio-button label="挂失退额" @click="isShowTable(2)"></el-radio-button>
      </el-radio-group>

      <div v-if="isShow1" style="margin-top: 30px"> <!--挂失补办-->
        <el-form-item label="密码" prop="pass">
          <el-input size="small" type="password" v-model="ruleForm2.pass" style="width: 200px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="mcNumberCard" label="诊疗卡卡号:"  >
          <el-input class="te" size="small"  v-model="ruleForm2.mcNumberCard" style="width: 200px ;margin-right: 3px " disabled></el-input>
          <el-button type="primary" @click="submitMedicalCard()" icon="el-icon-paperclip" size="mini">生成诊疗卡</el-button>
        </el-form-item>
        <el-form-item label-width="265px">
          <template #default="scope">
            <el-button size="small" type="primary" @click="cardReset('ruleForm2')">挂失补办</el-button>
            <el-button size="small" @click="resetForm2">取消</el-button>
          </template>
        </el-form-item>
      </div>
      <div v-if="isShow2"  ><!--挂失退额-->
        <el-form-item label="姓名：" style="margin-top:20px; height: 20px">
          <span>{{cardArr.mzSick.sickName}}</span>
        </el-form-item>
        <el-form-item label="诊疗卡卡号："  style="height: 20px" >
          <span>{{cardArr.mcCard}}</span>
        </el-form-item>
        <el-form-item label="身份证："  style="height: 20px" >
          <span>{{cardArr.mcIdCard}}</span>
        </el-form-item>
        <el-form-item label="余额："  style="height: 20px" >
          <span>{{cardArr.mcBalance}}</span>
        </el-form-item>
        <el-form-item label="密码：" prop="pass"  style="margin-top:20px; width:100% " >
          <el-input size="small" type="password" v-model="ruleForm2.pass" style="width: 150px;margin-right: 30px" autocomplete="off"></el-input>
          <el-button size="mini" type="primary" @click="cardReturn('ruleForm2')">退额打印</el-button>
          <el-button size="mini" @click="resetForm2">取消</el-button>
        </el-form-item>
      </div>

    </el-form>
  </el-dialog>

</template>

<script>
import {ElMessage} from "element-plus";//提示警告

export default{
  props:{
    mzSickList:{
      type:Array,
      required:true
    },
  },
  data(){
    var validatePassbkgs = (rule, value, callback) => { //补卡密码校验
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if(value !=this.cardArr.mcPawd){
        console.log(1+"--"+value)
        callback(new Error('您输入的密码错误'));
      }else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => { //密码校验
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if(value !=this.cardArr.mcPawd){
        console.log(1+"--"+value)
        callback(new Error('您输入的密码错误'));
      }else {
        if (this.ruleForm1.checkPass !== '') {
          this.$refs.ruleForm1.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => { //密码校验
      if (value === '') {
        callback(new Error('请输入密码'));
      }else {
        if (this.ruleForm1.checkPass !== '') {
          this.$refs.ruleForm1.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {//密码校验
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm1.pawd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      radio1:"挂失补办",
      cardArr:'',//密码修改的集合
      ruleForm1: { //密码修改校验数组
        pass: '',
        pawd:'',
        checkPass: '',
      },
      ruleForm2: { //密码修改校验数组
        pass: '',
        mcNumberCard:''
      },
      rules1: {//密码校验
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pawd:[
          { validator: validatePass1, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },
      rules2: {//密码校验
        pass: [
          { validator: validatePassbkgs, trigger: 'blur' }
        ],
        mcNumberCard:[{required: true, message: "请生成诊疗卡", trigger: 'blur'}],
      },
      isShowCard:false,//修改密码弹窗
      isShowPawd:false,//修改密码弹窗
      wardCurrentPage:1,//分页属性
      wardPageSize:4,
      isShow1:true,//复选框切换
      isShow2:false,
      token:[],
    }
  },
  methods:{
    //挂失补办窗口----------------------------------------挂失补办-----------------------------------------------------
    isShowTable(index){ //复选框切换
      if(index==2){
        this.isShow1=false;
        this.isShow2=true;
      }else{
        this.isShow1=true;
        this.isShow2=false;
      }
      this.resetForms()
    },
    resetForms() {//切换的时候数值关闭
      this.ruleForm2.pass='';
      this.ruleForm2.mcNumberCard='';
      this.$refs['ruleForm2'].resetFields();
    },
    resetForm2() {//刷新修改密码表单
      console.log("22222s")
      this.isShowCard=false;
      this.cardArr={
        mzSick:'',
      };
      this.ruleForm2.pass='';
      this.ruleForm2.mcNumberCard='';
      this.$refs['ruleForm2'].resetFields();
    },
    isCard(row){
      this.isShowCard=true;
      this.cardArr=row;
      console.log(row)
      console.log(this.cardArr.mcPawd)
      console.log(this.cardArr)
    },
    cardReset(formName){//挂失补办
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('cardState',{mcNumber:this.cardArr.mcNumber,mcCard:this.ruleForm2.mcNumberCard,userId:this.token.uid}).then((v)=>{
            console.log(v.data)
            if(v.data=='ok'){
              ElMessage.success({
                message: '挂失补办成功~新的卡号为：'+this.ruleForm2.mcNumberCard,
                type: 'success'
              });
              this.resetForm2()//刷新主界面的校验提示
              this.$parent.allDescSick();//刷新主界面的表格
            }
          }).catch(function(){

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    cardReturn(formName){//挂失退额
      this.$refs[formName].validate((valid) => {
        console.log("挂失退额")
        if (valid) {
          this.axios.post('cardQuit',{mcNumber:this.cardArr.mcNumber,userId:this.token.uid}).then((v)=>{
            console.log(v.data)
            if(v.data=='ok'){
              console.log("挂失退额")
              ElMessage.error({
                message: '卡号挂失成功~退出余额：'+this.cardArr.mcBalance+"元！请注意查收。",
                type: 'error'
              });
              this.resetForm2()//刷新主界面的校验提示
              this.$parent.allDescSick();//刷新主界面的表格
              console.log("挂失退额1111")
            }
          }).catch(function(){

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitMedicalCard() { // 生成诊疗卡卡号
      this.axios.post("inserMedicalCard").then((res) => {
        console.log(res.data)
        this.ruleForm2.mcNumberCard=res.data
        ElMessage.success({
          message: '恭喜你，生成成功~',
          type: 'success'
        });
      }).catch(() => {})
    },
    //打开修改密码窗口---------------------------------------------修改密码------------------------------------------------
    isPawd(row){
      this.isShowPawd=true;
      this.cardArr=row;
    },
    submitFormPawd(formName) { //修改密码
      console.log("sssss")
      this.$refs[formName].validate((valid) => {
        console.log("sssss1111")
        if (valid) {
          this.axios.post('updatePawd',{mcNumber:this.cardArr.mcNumber,pawd1:this.ruleForm1.checkPass,userId:this.token.uid}).then((v)=>{
            console.log(v.data)
            if(v.data=='ok'){
              ElMessage.success({
                message: '修改成功~',
                type: 'success'
              });
              this.resetForm1()//刷新主界面的校验提示
              this.$parent.allDescSick();//刷新主界面的表格
            }
          }).catch(function(){

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm1() {//刷新修改密码表单
      console.log("111111")
      this.isShowPawd=false;
        this.cardArr={
          mzSick:'',
        };
      this.ruleForm1.checkPass='';
      this.ruleForm1.pass='';
      this.ruleForm1.pawd='';
      this.ruleForm1.mcNumberCard='';
      this.$refs['ruleForm1'].resetFields();
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
    //-----------------------------------------------------------密码重置---------------------------------
    pawdReset(row){
      this.axios({
        url:'pawdReset',
        params:{mcNumber:row}
      }).then((v)=>{
        console.log(v.data)
        if(v.data=='ok'){
          console.log("11111111111")
          ElMessage.warning({
            message: '密码重置成功！初始化密码为身份证后6位~',
            type: 'warning'
          });
          this.$parent.allDescSick();//刷新主界面的表格
        }
      }).catch(function(){

      })
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
}
</style>