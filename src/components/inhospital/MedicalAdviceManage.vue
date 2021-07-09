<template>
	
	<el-row>
		<el-col>
				<el-table
				height="300px"
				@cell-click="valueId"
				   :data="tableData"
				   border highlight-current-row
				   style="width: 100%">
				   
				   <el-table-column align="center" prop="zyrq" label="病人列表">
					   
					   
					   <el-table-column prop="zyrq" label="住院日期">
					   </el-table-column>
					   <el-table-column prop="name" label="姓名" >
					   </el-table-column>
					   <el-table-column prop="ksName" label="科室" >
					   </el-table-column>
					   <el-table-column prop="bed" label="床位">
					   </el-table-column>
					   <el-table-column
					     prop="price"
					     label="余额">
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
	
	<div style="height: 20px;"></div>
	
	
	<el-row v-if="longAndShortBtShow" style="background-color: white; padding: 8px; margin-bottom: 10px;">
		<el-col :span="6">
			<h3 style="margin-bottom: 5px;">{{names}}</h3>
		</el-col>
		 
		 <el-col :span="14"></el-col>
		 
		<el-col :span="2">
			<el-popover
			    placement="top-start"
			    title="长期医嘱"
			    :width="200"
			    trigger="hover"
			    content="长期医嘱主要用来 嘱咐每天的用药针剂等"
			  >
			    <template #reference>
			     	<el-button size="small" @click="addYZ(1)" type="primary">添加长期医嘱</el-button>
			    </template>
			  </el-popover>
		</el-col>
		<el-col :span="2">
			<el-popover
			    placement="top-start"
			    title="临时医嘱"
			    :width="200"
			    trigger="hover"
			    content="临时医嘱用来 添加化验也可以添加药品和针剂等"
			  >
			    <template #reference>
			     	<el-button size="small" @click="addYZ(2)" type="primary">添加临时医嘱</el-button>
			    </template>
			  </el-popover>
			
		</el-col>
	</el-row>
	
	
	
	<el-row v-if="longAndShortBtShow" >
		<el-col>
				<el-table
				   :data="yzxxdxArr"
				   border height="350px"
				   style="width: 100%">
				   <el-table-column
					 prop="yzId"
					 label="医嘱编号">
				   </el-table-column>
				   <el-table-column prop="xzys" label="下嘱医生" > </el-table-column>
					<el-table-column prop="xzData" label="下嘱时间" ></el-table-column>
					<el-table-column label="医嘱类别" >
						<template #default="scope">
							{{scope.row.yzLb == 1 ? '长期医嘱' : '短期医嘱'}}
						</template> 
					</el-table-column>
					
					<el-table-column
							width="140px"
					      align="right">
					      <template #header>
					        <el-select v-model="longAndShortYZ"  placeholder="请选择">
					           <el-option
					               label="所有医嘱"
					               value="3">
					             </el-option>
					           
					           <el-option
					               label="长期医嘱"
					               value="1">
					             </el-option>
					           
					           <el-option
					               label="临时医嘱"
					               value="2">
					             </el-option>
								 
					           </el-select>
					      </template>
					      <template #default="scope">
					        <el-button @click="updateYZ(scope.row)" type="danger">修改医嘱</el-button>
					      </template>
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
	
</template>

<script>
	 export default {
	    data() {
	      return {
	        tableData: [{
			  zyId:'1',
	          zyrq: '2016-05-02',
	          name: '王小虎',
	          price: '3000',
			  ksName:'骨科',
			  bed:'骨科201-1号床',
			  yzxxArr:[
				  {
					  yzId:'1',
					  xzys:"李四",
					  xzData:'2020-10-24 10:24:43',
					  yzLb:'1',//医嘱类别1是长期医嘱2是短期医嘱
				  },
				  {
				  	  yzId:'2',
				  	  xzys:"王五",
				  	  xzData:'2020-10-24 10:24:43',
				  	  yzLb:'2',//医嘱类别1是长期医嘱2是短期医嘱
				  }
			  ]
	        }],
			patientObj:{},//病人对象
			yzxxdxArr:[//医嘱详细信息
				
			],
			longAndShortYZ:'所有医嘱',//长期医嘱、短期医嘱、所有医嘱
			longAndShortBtShow:false,
			drawer:false,
			names:'医嘱内容'
	      }
		  },
		  methods:{
			  valueId(row){
				  this.yzxxdxArr = row.yzxxArr;
				  this.patientObj = row;
				 this.drawer = true; 
				 this.pdYZShow();
				 this.names = '医嘱内容：（'+row.name+'）';
			  },
				pdYZShow(){//显示详细医嘱数据
					if(this.yzxxdxArr == ''){
						this.longAndShortBtShow = false;
					}else{
						this.longAndShortBtShow = true;
					}
				},
				updateYZ(row){
					this.$router.push({name:'MAMOperation',params:{medical:JSON.stringify(row),is:row.yzLb}});
				},
				addYZ(is){//添加长期医嘱短期医嘱
					if(this.longAndShortYZ == ''){
						this.$message({type: 'error', message: '病人信息错误'});
					}
					if(is == 1){
						this.$router.push({name:'MAMOperation',params:{medical:JSON.stringify(this.patientObj),is:1}});
					}else{
						this.$router.push({name:'MAMOperation',params:{medical:JSON.stringify(this.patientObj),is:2}});
					}
				}
		  }
	    }
</script>

<style scoped>
	.works{
		padding: 15px;
	}
	.ysRow{
		background-color: #D2FFF0;
	}
	.el-table__row:hover>td{
		cursor: pointer;
		background-color: #D2FFF0!important
	}
	.el-table__body tr.current-row>td{
	  background-color: #D2FFF0!important
	  /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
	}
</style>
