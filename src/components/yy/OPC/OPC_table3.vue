
<template>
	<el-table
		:data="rightTableData3"
		style="width: 100%"
		height="570"
		>
		 <el-table-column type="selection" width="55">
		</el-table-column>
		
		<el-table-column
		  label="日期"
		  width="180">
		  <template #default="scope">
			<i class="el-icon-time"></i>
			<span style="margin-left: 10px">{{ scope.row.date }}</span>
		  </template>
		</el-table-column>
		<el-table-column label="姓名" width="180">
		  <template #default="scope">
			<el-popover effect="light" trigger="hover" placement="top">
			  <template #default>
				<p>姓名: {{ scope.row.name }}</p>
				<p>住址: {{ scope.row.address }}</p>
			  </template>
			  <template #reference>
				<div class="name-wrapper">
				  <el-tag size="medium">{{ scope.row.name }}</el-tag>
				</div>
			  </template>
			</el-popover>
		  </template>
		</el-table-column>
		<el-table-column label="操作">
		  <template #default="scope">
			<el-button
			  size="mini"
			  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			<el-button
			  size="mini"
			  type="danger"
			  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		  </template>
		</el-table-column>
	  </el-table>
	  <h4>项目留言：</h4>
	  <el-input
	  		type="textarea"
	  		placeholder="请输入病理原因"
	  		v-model="textarea3"
	  		maxlength="400"
	  		:rows="4"
	  		show-word-limit>
	  </el-input>
</template>

<script>
    export default{
        props:{
            rightTableData3:{
                type:Array,
                required:true
            },
            textarea3:{
                type:String,
                required:true
            }
        },
        data(){
            return {
                
            }
        }
    }
</script>

<style>
    table{
        margin-top: 20px;
    }
    td{
        text-align: center;
        width: 100px;
    }
</style>

