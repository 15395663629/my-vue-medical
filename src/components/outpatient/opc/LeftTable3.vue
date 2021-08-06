<template>
  <el-row>
    <el-col  :span="14">
      <el-input  placeholder="请输入病人姓名或者身份证" v-model="text" size="mini" type="text"/>
    </el-col>
    <el-col :span="1" >
      <el-button  size="mini" @click="" icon="el-icon-search" type="primary" ></el-button>
    </el-col>
  </el-row>
  <el-col><!-- ================================================== 左下 第二个table ==================================================-->
    <el-table  size="mini"  :data="leftTable" highlight-current-row style="width: 100%" height="530">

      <el-table-column fixed  label="序号"  width="50">
        <template #default="scope">
          {{ scope.row.mrNumber}}
        </template>
      </el-table-column>
      <el-table-column
          fixed
          label="姓名"
          width="100" align="center"  >
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top"  width="210px">
            <template #default>
              <p>姓名：{{ scope.row.recipeObject.recipeSickName}}</p>
              <p>身份证： {{ scope.row.mrIdCard }}</p>
              <p>就诊卡： {{ scope.row.mrMcCard}}</p>
              <p>挂号时间： {{ scope.row.mrSection}}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.recipeObject.recipeSickName}}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column fixed label="处方" width="150" align="center" >
        <template #default="scope" >
          <el-popover effect="light" trigger="hover" placement="top" width="300px">
            <template #default>
              <p>就诊卡： {{ scope.row.mrMcCard}}</p>
              <p>姓名：{{ scope.row.sDoctor }}</p>
              <p>所属科室： {{ scope.row.sOverKsName }}</p>
              <p>学术： {{ scope.row.sType}}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">处方药</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
<!--        <el-popover placement="right" :width="400" trigger="click" >-->
<!--          <template #reference>-->
<!--            <el-button type="primary" plain size="mini">处方列表</el-button>-->
<!--          </template>-->
<!--          <el-table :data="leftTable"  size="mini" >-->
<!--            <el-table-column width="100" property="date" label="药名">-->
<!--              <template #default="scope">-->
<!--                {{ scope.row.mrMcCard}}-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column width="100" property="date" label="数量">-->
<!--              <template #default="scope">-->
<!--                {{ scope.row.mrMcCard}}-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column width="100" property="date" label="医嘱">-->
<!--              <template #default="scope">-->
<!--                {{ scope.row.mrMcCard}}-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </el-popover>-->
      </el-table-column>

      <el-table-column
          fixed
          label="病理诊断"
          width="100" align="center" >
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top"  width="300px">
            <template #default>
              <p>结束时间：{{ scope.row.mrOverTime }}</p>
              <p>诊断结果： {{ scope.row.mrDiagnoseRecord }}</p>
              <p>处理建议： </p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.mrDiagnoseRecord }}病理结果</el-tag>
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
	    props:{
          leftTable:{
            type:Array,
            required:true
          },
          text:{
            type:String,
            required: true
          },
	    },
	    data(){
	        return {
	        }
	    },
		methods:{
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
</style>
