<template>
	<div>部门管理</div>
  {{list}}
	<div class="wz">
		<el-button type="primary" @click="dialogVisible1 = true">新增部门</el-button>
		<span style="margin-left: 20px;">
			<el-input style="width: 120px;" v-model="name" value=""></el-input>
			<el-button type="primary"  icon="el-icon-orange" style="margin-left: 20px;">查询部门</el-button>
		</span>
		<!-- <el-button type="primary">重置密码</el-button> -->
	</div>
	 <el-table
	    ref="multipleTable"
	    :data="list"
	    tooltip-effect="dark"
	    style="width: 100%"
	    @selection-change="handleSelectionChange" class="dome">
	    <el-table-column
	      type="selection"
	      width="55">
	    </el-table-column>
	    <el-table-column
	      label="编号"
        prop="ksId"
	      width="120">

	    </el-table-column>
	    <el-table-column
	      prop="ksName"
	      label="科室名称"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="deId"
	      label="所属部门"
		   width="540"
	     >
	    </el-table-column>
		<el-table-column
		  label="操作">
		  <template v-slot:default="r">
			 <el-button type="primary" @click="open">删除</el-button>
			<el-button type="primary" @click="dialogVisible1= true">编辑部门</el-button>

		  </template>
		</el-table-column>

	  </el-table>
	  <!-- 分页插件 -->
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
	<el-dialog
	    title="部门信息"
	    v-model="dialogVisible1"
	    width="30%"
	    :before-close="handleClose">
	   <!-- 表格 -->
	   部门名称：<el-input type="text" style="width: 40%;"></el-input><br />
	   部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门：<el-select v-model="value" placeholder="请选择"
	   	style="width: 20%;margin-top:20px;">
	   	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
	   
	   	</el-option>
	   </el-select><br />
	    <template #footer>
	      <span class="dialog-footer">
	        <el-button @click="dialogVisible1 = false">取 消</el-button>
	        <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
	      </span>
	    </template>
	  </el-dialog>
	
</template>

<script>
	export default {
	    data() {
	      return {
	        list:[],
			  dialogVisible1:false,
			  dialogVisible:false,
          currentPage1: 5,
          currentPage2: 5,
			          currentPage3: 5,
			          currentPage4: 4,
	        tableData: [{
	          date: '2016-05-03',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1518 弄'
	        }, {
	          date: '2016-05-02',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1518 弄'
	        }, {
	          date: '2016-05-04',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1518 弄'
	        }, {
	          date: '2016-05-01',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1518 弄'
	        }, {
	          date: '2016-05-08',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1518 弄'
	        }, {
	          date: '2016-05-06',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1518 弄'
	        }, {
	          date: '2016-05-07',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1518 弄'
	        }],
	        multipleSelection: [],
			 dialogTableVisible: false,
			 formLabelWidth: '120px',
			 options: [{
			 	value: '选项1',
			 	label: '护理科'
			 }, {
			 	value: '选项2',
			 	label: '五官科'
			 }],
			 value: '',
			 
	      }
	    },
	
	    methods: {
        getData(){
          this.axios.get('http://localhost:8089/dome').then((v)=>{
           this.list=v.data
            console.log(this.list)
          }).catch()
        },
	      handleSelectionChange(val) {
	        this.multipleSelection = val;
			// alert(123)
	      },
		  open() {
		        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });
		        });
		      },
			  handleSizeChange(val) {
			          console.log(`每页 ${val} 条`);
			        },
			        handleCurrentChange(val) {
			          console.log(`当前页: ${val}`);
			        }
	    },
    created() {
	      this.getData()
    }
  }
	</script>


<style>
	.dome{
		margin-top: 20px;
	}
	/* .wz{
		margin-left: -1150px;
	} */
</style>
