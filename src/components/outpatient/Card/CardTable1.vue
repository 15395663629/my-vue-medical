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
            @click="handleEdit(scope.$index, scope.row)">卡号挂失</el-button>
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

  <el-dialog :close-on-click-modal="false" :close-on-press-escape="false"
             :before-close="resetForm2" title="提示" v-model="isShowPawd" width="27%" center  ><!-- 密码修改======================== -->
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码" prop="pass">
        <el-input size="small" type="password" v-model="ruleForm.pass" style="width: 200px" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pawd">
        <el-input size="small" type="password" v-model="ruleForm.pawd" style="width: 200px" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input size="small" type="password" v-model="ruleForm.checkPass" style="width: 200px" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item >
        <template #default="scope">
          <el-button size="mini" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button size="mini" @click="resetForm('ruleForm')">取消</el-button>
        </template>
      </el-form-item>
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
    var validatePass = (rule, value, callback) => { //密码校验
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if(value !=this.cardArr.mcPawd){
        callback(new Error('您输入的密码于旧密码不一致'));
      }else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => { //密码校验
      if (value === '') {
        callback(new Error('请输入密码'));
      }else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {//密码校验
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pawd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      cardArr:[],
      ruleForm: {
        pass: '',
        pawd:'',
        checkPass: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pawd:[
          { validator: validatePass1, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },

      isShowPawd:false,//修改密码弹窗
      wardCurrentPage:1,
      wardPageSize:4,
    }
  },
  methods:{
    isPawd(row,){
      this.isShowPawd=true;
      this.cardArr=row;
    },
    submitForm(formName,index) {
      console.log(index)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('updatePawd',{mcNumber:this.cardArr.mcNumber,pawd1:this.ruleForm.checkPass}).then((v)=>{
            console.log(v.data)
            if(v.data=='ok'){
              console.log("11111111111")
              ElMessage.success({
                message: '修改密码成功！',
                type: 'success'
              });
              this.resetForm(formName)
            }
          }).catch(function(){

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(formName) {//
      console.log("11111")
      this.isShowPawd=false;
      this.cardArr=[];
      this.ruleForm.checkPass='';
      this.ruleForm.pass='';
      this.ruleForm.pawd='';
      this.$refs[formName].resetFields();
    },
    resetForm2() {
      console.log("22 1")
      this.isShowPawd=false;
      this.cardArr=[];
      this.ruleForm.checkPass='';
      this.ruleForm.pass='';
      this.ruleForm.pawd='';
    },
    // 初始病房每页数据数wardpagesize和数据data
    wardHandleSizeChange: function(size) {
      this.wardPageSize = size;
      console.log(this.pagesize) //每页下拉显示数据
    },
    //初始页病房wardcurrentPage
    wardHandleCurrentChange: function(currentPage) {
      this.wardCurrentPage = currentPage;
      console.log(this.currentPage) //点击第几页allDescSick
    },
    //密码修改
    updatePawd(index,row){
      this.axios({
        url:'updatePawd',
        params:{mcNumber:index,pawd1:row}
      }).then((v)=>{
        console.log(v.data)
        if(v.data=='ok'){
          console.log("11111111111")
          ElMessage.success({
            message: '修改密码成功！',
            type: 'success'
          });
        }
      }).catch(function(){

      })
    },
    //密码重置
    pawdReset(row){
      this.axios({
        url:'pawdReset',
        params:{mcNumber:row}
      }).then((v)=>{
        console.log(v.data)
        if(v.data=='ok'){
          console.log("11111111111")
          ElMessage.success({
            message: '密码重置成功！初始化密码为身份证后6位~',
            type: 'success'
          });
        }
      }).catch(function(){

      })
    },


  }

}
</script>

<style scoped>

</style>