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
    <el-table  size="mini"  :data="leftTable" style="width: 100%" height="530">
      <el-table-column fixed  label="序号"  width="50"></el-table-column>
      <el-table-column
          fixed
          label="姓名"
          width="100" >
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top"  >
            <template #default>
              <p>姓名：{{ scope.row.sDoctor }}</p>
              <p>身份证： {{ scope.row.sOverKsName }}</p>
              <p>就诊卡： {{ scope.row.sType}}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.sDoctor }}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
          fixed
          label="处方"
          width="100" >
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" >
            <template #default>
              <p>姓名：{{ scope.row.sDoctor }}</p>
              <p>所属科室： {{ scope.row.sOverKsName }}</p>
              <p>学术： {{ scope.row.sType}}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.sDoctor }}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
          fixed
          label="病理诊断"
          width="150" >
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" >
            <template #default>
              <p>姓名：{{ scope.row.sDoctor }}</p>
              <p>所属科室： {{ scope.row.sOverKsName }}</p>
              <p>学术： {{ scope.row.sType}}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.sDoctor }}</el-tag>
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

		}
	}
</script>

<style>
</style>
