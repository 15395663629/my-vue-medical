
<template>
  <el-form :model="rightTableData5"  status-icon style="margin-top: 10px"  ref="rightTableData5" label-width="80px" class="demo-ruleForm" >
    <el-row>
      <el-col :span="23">
        <el-form-item label="主诉：" label-width="100px"  >
            <el-input  v-model="rightTableData5.chComplaint" autosize type="textarea" size="mini"  maxlength="400" show-word-limit>
            </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="既往病史：" label-width="100px"  >
          <el-input v-model="rightTableData5.chHistory" autosize type="textarea" size="mini"  maxlength="400"
                     show-word-limit>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="家族史：" label-width="100px"  >
          <el-input  v-model="rightTableData5.chFamilyHistory"   autosize type="textarea" size="mini"  maxlength="400"
                     show-word-limit>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="体检结果：" label-width="100px"  >
          <el-input  v-model="rightTableData5.chOe"  rows="4" type="textarea" size="mini" disabled maxlength="400"
                     show-word-limit>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="现病史：" label-width="100px"  >
          <el-input  v-model="rightTableData5.chCause"  autosize type="textarea" size="mini"  maxlength="400"
                     show-word-limit>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="23">
        <el-form-item label="处理和建议：" label-width="100px"  >
          <el-input  v-model="rightTableData5.chDoctorText"  rows="10" type="textarea" size="mini" maxlength="1000"
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

