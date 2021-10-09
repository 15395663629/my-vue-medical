<template>
  <el-row>
    <el-col  :span="14">
      <el-input @change="textareas"  placeholder="请输入病人姓名或者身份证" v-model="text" size="mini" clearable type="text"/>
    </el-col>
    <el-col :span="1" >
      <el-button  size="mini" @click="selectLeftTable" icon="el-icon-search" type="primary" ></el-button>
    </el-col>
  </el-row>
  <el-col><!-- ================================================== 左下 第二个table ==================================================-->
    <el-table highlight-current-row  size="mini"  @cell-dblclick="rightPassBack"	 :data="leftTable" style="width: 100%" height="530">
      <el-table-column fixed  label="序号" align="center" prop="medicalRecordObject.mrNumber" width="70"></el-table-column>
      <el-table-column fixed label="就诊信息" align="center" width="200" >
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="210px" >
            <template #default>
              <p>姓名：{{ scope.row.medicalRecordObject.sickObject.sickName }}</p>
              <p>年龄： {{ scope.row.medicalRecordObject.sickObject.sickAge }}</p>
              <p>性别： {{ scope.row.medicalRecordObject.sickObject.sickSex }}</p>
              <p>身份证： {{ scope.row.medicalRecordObject.sickObject.sickIdCard }}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.medicalRecordObject.sickObject.sickName }}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column  fixed label="就诊卡号"  align="center" width="130" >
        <template #default="scope">
          <div class="name-wrapper">
            <el-tag size="medium">{{ scope.row.medicalRecordObject.mrMcCard }}</el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-col>
</template>

<script >
	export default{
    emits:['func','funcs'],
      // inject:['funcBlack(val)'],
	    props:{
        leftTable:{
          type:Array,
          required:true
        },
        text:{
          type:String,
          required: true
        },
        rightPassBack:{
          type:Function,
          required:true,
        }
	    },
	    data(){
	        return {
	            
	        }
	    },
		methods:{
      // rightPassBack(val){
      //   this.funcBlack(val);
      // },
      textareas(){
        this.$emit('func',this.text)
      },
      selectLeftTable(){
        this.$emit('funcs')
      },
		}
	}
</script>

<style>
</style>
