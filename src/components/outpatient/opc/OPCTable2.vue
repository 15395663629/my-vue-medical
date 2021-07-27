
<template>
	<el-table :data="rightTableData2" style="width: 100%" size="mini" 	height="450" >
    <el-table-column fixed  label="药品名称" align="center" width="120">
      <template #default="scope">
        <span>{{scope.row.drugName}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="功效" align="center"  width="120">
      <template #default="scope">
        <span>{{scope.row.drugRemark }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="服用剂量" align="center"  width="150">
      <template #default="scope">
        <span>{{scope.row.drugSpecification }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="单位" align="center"  width="60">
      <template #default="scope">
        <span>{{scope.row.specSpecification}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="单价" align="center" width="100">
      <template #default="scope">
        <span>{{scope.row.drugPrice}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="总金额"  width="150" align="center">
      <template #default="scope">
        <span>{{scope.row.zpObject.zpCount*scope.row.drugPrice}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="计数"  width="150" align="center">
      <template #default="scope">
        <el-input-number size="mini" v-model="scope.row.zpObject.zpCount"  :min="1" :max="100"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column label="嘱托" width="220" class="patientText">
      <template #default="scope">
        <el-input type="textarea" size="mini" v-model="scope.row.zpObject.zpEntrust" rows="1" maxlength="400" ></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作" width="50">
      <template #default="scope">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index)" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
	  <h4>中药处方留言：</h4>
	  <el-input
	  		type="textarea"
	  		placeholder="请输入病理原因"
	  		v-model="textarea2"
	  		maxlength="400"
	  		:rows="4"
	  		show-word-limit>
	  </el-input>
</template>

<script>
    export default{
        props:{
            rightTableData2:{
                type:Array,
                required:true
            },
            textarea2:{
                type:String,
                required:true
            }
        },
        data(){
            return {
                
            }
        },
        methods: {
          handleDelete(index) {
            this.rightTableData2.splice(index, 1);
          }
        }
    }
</script>

<style>
    /*table{*/
    /*    margin-top: 20px;*/
    /*}*/
    /*td{*/
    /*    text-align: center;*/
    /*    width: 100px;*/
    /*}*/
</style>

