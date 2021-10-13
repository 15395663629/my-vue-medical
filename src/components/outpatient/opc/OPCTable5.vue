
<template>
  <el-form :model="rightTableData5"  status-icon style="margin-top: 30px"  ref="rightTableData5" label-width="80px" class="demo-ruleForm" >
    <el-row>
      <el-col :span="23" style="margin-top: -5px">
        <el-form-item label="主诉：" label-width="100px"  >
          <el-input  v-model="rightTableData5.chComplaint"  rows="3" type="textarea" size="mini"  maxlength="400"
                     show-word-limit>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="既往病史：" label-width="100px"  >
          <el-input  v-model="rightTableData5.chHistory"  rows="3" type="textarea" size="mini"  maxlength="400"
                     show-word-limit>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="家族史：" label-width="100px"  >
          <el-input  v-model="rightTableData5.chFamilyHistory"  rows="3" type="textarea" size="mini"  maxlength="400"
                     show-word-limit>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="体检结果：" label-width="100px"  >
          <el-input  v-model="rightTableData5.chOe" style="width: 415px" rows="4" type="textarea" size="mini" disabled maxlength="200"
                     show-word-limit>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="手术结果：" label-width="100px"  >
          <el-input  v-model="rightTableData5.chOps" style="width: 415px"  rows="4" type="textarea" size="mini" disabled maxlength="200"
                     show-word-limit>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12" >
        <el-form-item label="现病史：" label-width="100px">
          <el-input style="width: 415px;" v-model="rightTableData5.chCause"  placeholder="请输入病理原因"
                    rows="8" type="textarea" size="mini" maxlength="1000"
                    show-word-limit>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="诊断建议：" label-width="100px">
          <el-input style="width: 415px;" v-model="rightTableData5.chDoctorText"  placeholder="请输入病理原因"
                    rows="8" type="textarea" size="mini" maxlength="1000"
                    show-word-limit>
          </el-input>
        </el-form-item>
      </el-col>

    </el-row>
  </el-form>
</template>

<script>
    export default{
        props:{
          rightTableData5:{
            type:Object,
            required:true
          },
        },
        data(){
            return {
                
            }
        }
    }
</script>

<style>
</style>

