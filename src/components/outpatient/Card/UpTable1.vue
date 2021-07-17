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
        <el-button
            size="mini"
            type="primary"
            plain
            @click="">诊卡充值</el-button>
        <el-button
            size="mini"
            type="danger"
            plain
            @click="">诊卡退款</el-button>
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
  <el-dialog title="提示" v-model="isUpTable1" width="37%" center  ><!-- 诊疗卡充值窗口 -->
    <el-row><!-- :rules="rules" -->
      <el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-col>
          <el-form-item label="密码:" >
            <el-input placeholder="请输入您的密码"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="充值金额:" >
            <el-input placeholder="请输入您要充值的金额"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-form  status-icon ref="ruleForm" label-width="453px" style="margin-top: 30px;" class="demo-ruleForm">
        <el-col>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>
  <!-- ================================================退取钱================================================ -->
  <el-dialog title="提示" v-model="isUpTable2" width="37%" center  ><!-- 诊疗卡退款 -->
    <el-row><!-- :rules="rules" -->
      <el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-col>
          <el-form-item label="密码:" >
            <el-input placeholder="请输入您的密码"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="卡余额:" >
            <el-input disabled></el-input>
          </el-form-item>
        </el-col>

        <el-col>
          <el-form-item label="退款余额:" >
            <el-input placeholder="请输入您要退款金额数"></el-input>
          </el-form-item>
        </el-col>

        <el-col>
          <el-form-item label="" >
            <el-button style="width: 202px;" size="small" type="primary">一键退出所有余额</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
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
    return {
      isUpTable1:false,//充值
      isUpTable2:false,//退钱
      wardCurrentPage:1,//分页属性
      wardPageSize:4,
      token:[],
    }
  },
  methods:{
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
}
</style>