<template>
  <el-dialog  title="预约挂号" v-model="isShow" width="43%" center  ><!-- 弹窗预约挂号新增 -->
    <el-row><!-- :rules="rules" -->
      <el-form size="small" status-icon :model="regArr1" ref="regArr1" label-width="100px" class="demo-ruleForm">
        <el-col>
          <el-form-item label="挂号日期" >
            <el-date-picker
                style="width: 252px;"
                v-model="date1"
                type="date"
                disabled
                format="YYYY 年 MM 月 DD 日">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="卡号" >
            <el-input v-model="regArr1.mcCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="姓名" >
            <el-input v-model="regArr1.sickName"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="挂号类型" >
            <el-select v-model="regArr1.rtType" placeholder="请选择" style="width: 188px;">
              <el-option
                  v-for="item in optionsRge1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="就诊" >
            <el-select  v-model="regArr1.rtClass" placeholder="请选择" style="width: 188px;">
              <el-option
                  v-for="item in optionsRge2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!--				<el-col >-->
        <!--					<el-form-item label="问诊诊室" >-->
        <!--						<el-input></el-input>-->
        <!--					</el-form-item>-->
        <!--				</el-col>-->

        <el-col>
          <el-form-item label="科室" >
            <el-input v-model="regArr1.rtOverKsName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="诊断医生" >
            <el-input v-model="regArr1.rtDoctor"  disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="学术" >
            <el-input v-model="regArr1.rtScience" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="挂号费" >
            <el-input class="te" v-model="regArr1.rtPrice" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label-width="455px">
            <el-button type="primary" @click="submitFormReg('regArr')">提交</el-button>
            <el-button @click="resetForm('regArr')">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
  export default {
    props:{
      isShow:{
        type:Boolean,
        required: true,
      },
      // list:{
      //   type:Array,
      //   required:true,
      // }
    },
    data(){
      return{
        optionsRge1:[{//选项列表1
            value: '1',
            label: '普通门诊'
          },{
            value: '2',
            label: '专家门诊'
          },
          ],
        optionsRge2: [{
          value: '选项1',
          label: '初诊'
        }, {
          value: '选项2',
          label: '复诊'
        }],
        regArr1:{
          mcCard:'',
          sickName:'',
          rtType:'',
          rtClass:'',
          rtOverKsName:'',
          rtDoctor:'',
          rtScience:'',
          rtPrice:'',
        }
      }
    },
    methods:{

    }
  }
</script>

<style scoped>
.te /deep/ .el-input__inner {
  color: #ff0000;
  font-size: 18px;
  cursor: pointer;
  width: 188px;
}
</style>