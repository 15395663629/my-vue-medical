
<template>
	<el-table :data="rightTableData1" style=" width: 100%;" height="450px" size="mini" >
    <el-table-column fixed  label="药品名称" align="center"   width="120">
      <template #default="scope">
        <span>{{scope.row.drugName}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="服用剂量" align="center"  width="130">
      <template #default="scope">
        <span>{{scope.row.drugSpecification }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="单位" align="center"  width="60">
      <template #default="scope">
        <span>{{scope.row.specSpecification}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="单价" align="center"  width="100">
      <template #default="scope">
        <span>{{scope.row.drugPrice}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="总金额"  width="110" align="center">
      <template #default="scope">
        <span>{{scope.row.xpObject.rdCount*scope.row.drugPrice}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="计数"  width="150" align="center">
      <template #default="scope">
        <el-input-number size="mini" v-model="scope.row.xpObject.rdCount"  :min="1" :max="100"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column fixed  label="是否皮试"  width="80" align="center">
      <template #default="scope">
        <el-checkbox v-model="scope.row.xpObject.rdSkin"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column fixed  label="输液分组"  width="120">
      <template #default="scope">
        <el-input type="textarea" size="mini" v-model="scope.row.xpObject.rdGrouping" rows="1" maxlength="400"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="嘱托" width="200" class="patientText">
      <template #default="scope">
        <el-input type="textarea" size="mini" v-model="scope.row.xpObject.rdEntrust" rows="1" maxlength="400" ></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作" width="50">
		  <template #default="scope">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index)" circle></el-button>
		  </template>
		</el-table-column>

  </el-table>
	  <h4>西药处方留言：</h4>
	  <el-input
	  		type="textarea"
	  		placeholder="请输入病理原因"
	  		v-model="textarea1"
	  		maxlength="400"
	  		:rows="4"
	  		show-word-limit>
	  </el-input>
</template>

<script>
    export default{
        props:{
            rightTableData1:{
                type:Object,
                required:true
            },
            textarea1:{
                type:String,
                required:true
            }
        },
        data(){
            return {
            }
        },
      methods:{
        handleDelete(index){
          this.rightTableData1.splice(index,1);
        }
      }

    }
</script>

<style>
.patientText/deep/ .el-input__inner {
  color: #FD4C4C;
  white-space: nowrap;
  font-size: 13px;
  text-overflow: ellipsis;
}
</style>

