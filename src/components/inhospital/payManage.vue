<template>
	<!--=============================================新增病人缴费单弹框===================================-->
	<el-dialog title="新增缴费" v-model="isPayShow">
		<el-form>
			<el-row>
				<el-col :offset="2" :span="9">
					<el-form-item label="缴费金额" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :offset="2" :span="9">
					<el-form-item label="操作人" label-width="80px">
						<el-input disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		
		<template #footer>
				<el-row>
					<el-col :span="18"></el-col>
					<el-col :span="2">
						<el-button @click="addEmp('empFrom')" type="primary">确定</el-button>
					</el-col>
					<el-col :span="1"></el-col>
					<el-col :span="2">
						<el-button @click="isShowZY = false" type="danger">取消</el-button>
					</el-col>
					<el-col :span="1"></el-col>
				</el-row>
		</template>
	</el-dialog>
	
	<!--=============================================新增病人缴费单弹框===================================-->
	<el-dialog title="费用明细" v-model="isPayRecordShow">
		
		<el-table
		    ref="multipleTable"
		    :data="empArr"
		    tooltip-effect="dark"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      label="费用编号"
			  prop="empId"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="empName"
		      label="费用名称">
		    </el-table-column>
		    <el-table-column
		      prop="empDate"
		      label="费用价格">
		    </el-table-column>
			<el-table-column
			  prop="empSalary"
			  label="扣除时间">
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
		
	</el-dialog>
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	<el-row>
		<el-col>
			<el-table
			    :data="ZYPatientBaseArr"
			    border
				@cell-click="valueBRObj"
				highlight-current-row
				height="350px"
			    style="width: 100%">
			    <el-table-column
			      prop="date"
				  align="center"
			      label="病人列表"
			      width="180">
				  
				  <el-table-column
				    prop="ptNo"
				    label="住院号"
				    width="180">
				  </el-table-column>
				  <el-table-column prop="ptName"
				    label="病人名称">
				  </el-table-column>
				  <el-table-column prop="ptAge"
				    label="年龄">
				  </el-table-column>
				  <el-table-column
				    prop="ptSex"
				    label="性别">
				  </el-table-column>
				  <el-table-column prop="deptId"
				    label="科室">
				  </el-table-column>
				  <el-table-column prop="bdId"
				    label="床位">
				  </el-table-column>
				  <el-table-column label="操作">
				  	<template  #default='scope'>
						<el-button size="mini" type="primary" @click.stop="isPayShow = true" >缴费</el-button>
				  		 <el-button size="mini" type="primary" @click.stop="isPayRecordShow = true" >查看费用明细</el-button>
				  	</template>
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
	
	
	
	<el-row style="margin-top: 35px;">
		<el-col>
			<el-table
			    :data="tableData"
			    border
				height="320px"
			    style="width: 100%">
			    <el-table-column
			      prop="date"
			      :label="jfText"
				  align="center"
			      width="180">
				  
				  <el-table-column
				    prop="name"
				    label="缴费编号"
				    width="180">
				  </el-table-column>
				  <el-table-column
				    label="缴费金额">
				  </el-table-column>
				  <el-table-column
				    prop="address"
				    label="缴费时间">
				  </el-table-column>
				  <el-table-column
				    label="操作人">
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
	
</template>

<script>
	export default {
	    data() {
	      return {
	        ZYPatientBaseArr: [{
	          ptNo: '101',//住院号
	          ptName: '张三',//病人名称
			  bdId:'201',//病床编号
			  ptSex: '男',//病人性别
			  deptId:'骨科',//科室编号
			  ptAge:'50',
			  
	        }],
			isPayShow:false,//显示新增缴费单
			isPayRecordShow:false,//显示病人费用明细表
			jfText:'缴费记录'
	      }
	    },
		methods:{
			valueBRObj(row){
				this.jfText = '缴费记录（'+row.ptName+'）'
			}
		}
	  }
</script>

<style >
	.works{
		padding: 15px;
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
