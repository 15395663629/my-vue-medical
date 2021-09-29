<template>
  <el-row>
    <el-col  :span="14">
      <el-input @change="textareas" placeholder="请输入病人姓名或者身份证" v-model="text" size="mini" type="text"/>
    </el-col>
    <el-col :span="1" >
      <el-button  size="mini" @click="selectLeftTable()" icon="el-icon-search" type="primary" ></el-button>
    </el-col>
  </el-row>
  <el-col><!-- ================================================== 左下 第二个table ==================================================-->
    <el-table  size="mini"  :data="leftTable" style="width: 100%" height="530">
      <el-table-column fixed  label="序号" align="center" prop="medicalRecordObject.mrNumber" width="70"></el-table-column>
      <el-table-column fixed label="就诊信息" align="center" width="200" >
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="210px" >
            <template #default>
              <p>就诊卡号： {{ scope.row.medicalRecordObject.mrMcCard }}</p>
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

      <el-table-column  fixed label="医疗诊断"  align="center" width="130" >
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="210px" >
            <template #default>
              <p>主诉： {{ scope.row.historyObject.chComplaint }}</p>
              <p>检验结果： {{ scope.row.chOe}}</p>
              <p>手术结果： {{ scope.row.chOps }}</p>
              <p>病因：{{ scope.row.chCause }}</p>
              <p>建议： {{ scope.row.chDoctorText }}</p>
            </template>
            <template #reference>
              <div class="name-wrapper fontType" >
                <el-tag size="medium">{{ scope.row.historyObject.chComplaint  }}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>

    </el-table>

  </el-col>
	
</template>

<script>
	export default{
    emits:['func','funcs'],
	    props:{
          leftTable:{
            type:Array,
            required:true
          },
          text:{
            type:String,
            required: true
          },
        // selectLeftTable:{
        //   type:Function,
        //   required: true
        // },
	    },
	    data(){
	        return {
	        }
	    },
		methods:{
      textareas(){
        this.$emit('func',this.text)
      },
      selectLeftTable(){
        this.$emit('funcs')
      },
		},
    created() {

    }
  }
</script>

<style>
tr.current-row > td,
.el-table__body tr:hover > td {
  background:#42B8FF;
}
.fontType{
  width: 80%;   /*一定要设置宽度，或者元素内含的百分比*/
  overflow:hidden; /*溢出的部分隐藏*/
  white-space: nowrap; /*文本不换行*/
  text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
}
</style>
