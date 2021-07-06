<template>
	
	<!--=============================================病人信息表===================================-->
	<el-row>
		<el-col>
			 <el-table
			 @cell-click="valueId"
			    :data="tableData"
				height="350px"
			    border
			    style="width: 100%">
			    <el-table-column
				  align="center"
			      label="病人列表">
				  
				  <el-table-column
				    prop="name"
				    label="住院号"
				    width="180">
				  </el-table-column>
				  <el-table-column
				    prop="address"
				    label="病人名称">
				  </el-table-column>
				  <el-table-column
				    prop="name"
				    label="性别"
				    width="180">
				  </el-table-column>
				  <el-table-column
				    prop="address"
				    label="年龄">
				  </el-table-column>
				  <el-table-column
				    prop="name"
				    label="科室"
				    width="180">
				  </el-table-column>
				  <el-table-column
				    prop="address"
				    label="床位">
				  </el-table-column>
			    </el-table-column>
			  </el-table>
			  <!--分页插件-->
			   <el-pagination
			  	   style="text-align: right;"
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
	
	
	
	<!--=============================================执行医嘱表格===================================-->
	<el-row>
		<el-col>
			<el-button @click="isZxYzShow = true" size="mini" type="primary">执行已选择</el-button>
		</el-col>
	</el-row>
	<el-row>
		<el-col>
			 <el-table
			 @cell-click="valueId"
				height="380px"
			    border
			    style="width: 100%">
				
			    <el-table-column
				  align="center"
			      :label="yzText">
				    <el-table-column
				        type="selection"
				        width="55">
				      </el-table-column>
					  
					 <el-table-column
					 label="编号"
					 prop="desId">
					 </el-table-column>
				 			    <el-table-column
				 			      prop="desDrugName"
				 			      label="医嘱内容">
				 			    </el-table-column>
				 									
				 				<el-table-column
				 				  prop="desText"
				 				  label="嘱托">
				 				</el-table-column>
				 									
				 				<el-table-column
				 				  prop="desSpecification"
				 				  label="规格">
				 				</el-table-column>
								
								<el-table-column
								  prop="desNurseName"
								  label="医嘱类别">
								</el-table-column>
								
				 				<el-table-column
				 				  prop="desMeasure"
				 				  label="剂量">
				 				</el-table-column>
				 				<el-table-column
				 				  prop="desUsage"
				 				  label="用法">
				 				</el-table-column>
				 				
				 				<el-table-column
				 				  prop="desNurseName"
				 				  label="执行人">
				 				</el-table-column>
				 				
									</el-table-column>
				 			</el-table>
			  <!--分页插件-->
			   <el-pagination
			  	   style="text-align: right;"
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
	
	
	
	<!--=============================================执行医嘱表格===================================-->
	<el-dialog
	title="执行医嘱"
	  v-model="isZxYzShow"
	  direction="ttb"
	  :before-close="handleClose" destroy-on-close>
	  <el-row>
		  <el-col :span="2">执行护士</el-col>
		  <el-col :span="4"> 
		  		<el-select size="mini" v-model="zxhsName">
		  		    <el-option
		  		      label="张三"
		  		      value="value">
		  		    </el-option>
		  			<el-option
		  			  label="李四"
		  			  value="item.value">
		  			</el-option>
		  		</el-select>
		  </el-col>
		  
		  <el-col :offset="13" :span="2">
			  <el-button size="mini" type="primary">执行</el-button>
		  </el-col>
		  
		  
		  <el-col :span="2">
		  	<el-button size="mini" type="primary">打印执行单</el-button>
		  </el-col>
	  </el-row>
	  
	  
	  <el-row>
	  		  <el-col>
				<el-table>
					
					<el-table-column
					  prop="desDrugName"
					  label="医嘱内容">
					</el-table-column>
										
					<el-table-column
					  prop="desText"
					  label="嘱托">
					</el-table-column>
										
					<el-table-column
					  prop="desSpecification"
					  label="规格">
					</el-table-column>
					
					<el-table-column
					  prop="desNurseName"
					  label="医嘱类别">
					</el-table-column>
					
					<el-table-column
					  prop="desMeasure"
					  label="剂量">
					</el-table-column>
					<el-table-column
					  prop="desUsage"
					  label="用法">
					</el-table-column>
				</el-table>
			  </el-col>
	  </el-row>
	  
	  
	 </el-dialog>
	
</template>

<script>
	 export default {
	    data() {
	      return {
			zxhsName:'张三',//执行护士名称
			isZxYzShow:false,//显示执行医嘱弹框
			yzText:'医嘱详细',
			drawer:false,
			drawers:false,
			isCD:'',//长期医嘱或者短期医嘱
			names:'病人名称：'
	      }
		  },
		  methods:{
			  valueId(row){
				 this.yzText = this.getTime() + '医嘱详细（'+row.name+'）';
			  },
			  initYZText(){
				  this.yzText = this.getTime() + '医嘱详细';
			  },
			  valueIds(id){
				  if(id == 1){
					   this.isCD =  '长期医嘱详情'+this.isCD;
				  }else{
					  this.isCD =  '短期医嘱详情'+this.isCD;
				  }
					this.drawers = true; 
			  },
			  valueRow(row){
				  this.isCD = '（'+row.name+'）'
				  console.log(row)
			  },
			getTime(){
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      //以下代码依次是获取当前时间的年月日时分秒
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var minute = date.getMinutes();
      var hour = date.getHours();
      var second = date.getSeconds();
      //固定时间格式
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
          hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
          minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
          second = "0" + second;
      }
      var currentdate =  year + seperator1 + month + seperator1 + strDate ;
	  return currentdate;
	}
	    },
		created() {
			this.initYZText()
		}
		}
</script>

<style>
	.works{
		padding: 15px;
	}
	.el-table__row:hover>td{
		cursor: pointer;
		background-color: #D2FFF0!important
	}
</style>
