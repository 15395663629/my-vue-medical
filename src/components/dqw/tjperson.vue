<template>
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>统计</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row>
			<el-col :span="3">
				统计
			</el-col>
		</el-row>
		<!--=============================================统计表格===================================-->
		<el-row>
			<el-col>
				<el-table
				    ref="multipleTable"
				    :data="empArr"
				    tooltip-effect="dark"
				    style="width: 100%"
				    @selection-change="handleSelectionChange">
				    <el-table-column
				      label="项目"
					  prop="empId"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="empName"
				      label="人员数量">
				    </el-table-column>
				    <el-table-column
				      prop="empDate"
				      label="状态">
				    </el-table-column>
					
					
					<el-table-column width="400px"
					      align="right">
						   <template  #header>
						  <el-row>
							  
							  <el-col :span="1"></el-col>
							  
							  <el-col :span="10">
								  <el-select v-model="isBedZT" size="small" placeholder="请选择">
								      <el-option
								        label="正常"
								        value="vale">
								      </el-option>
								  	<el-option
								  	label="有异常"
								  	value="item.value">
								  		</el-option>
								  </el-select>
							  </el-col>
						  </el-row>
							  
					      </template>
						  
						  <template  #default="r">
						    <el-button>修改</el-button>
						  </template>
					    </el-table-column>
					
				  </el-table>
				  <!--分页插件-->
				   <el-pagination
				  					style="text-align: center;"
				        @size-change="totalCut"
				        @current-change="pageCut"
				        :current-page="1"
				        :page-sizes="[2,4,6,8,10]"
				        :page-size="size"
				        layout="total, sizes, prev, pager, next, jumper"
				        :total="total">
				    </el-pagination>
					
			</el-col>
			
		</el-row>
</template>

<script>

</script>

<style>
</style>
