<template>
	<div>部门管理</div>
	<div class="wz">
		<el-button type="primary" @click="dialogVisible1 = true">新增部门</el-button>
		<span style="margin-left: 20px;">
			<el-input style="width: 120px;" v-model="name" value=""></el-input>
			<el-button type="primary"  icon="el-icon-orange" style="margin-left: 20px;">查询部门</el-button>
		</span>
		<!-- <el-button type="primary">重置密码</el-button> -->
	</div>
  <el-table ref="multipleTable" :data="dept" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange" class="dome">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column label="部门编号" width="120" prop="deId">
    </el-table-column>
    <el-table-column prop="deName" label="部门名称" width="120">
    </el-table-column>
    <el-table-column prop="deDate" label="创建时间" width="540">
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot:default="r">
        <el-button type="danger" @click="open">删除</el-button>
        <el-button type="primary" @click="dialogVisible1 = true">编辑部门</el-button>

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
	   部门名称：<el-input type="text" style="width: 40%;" v-model="value"></el-input><br />
	    <template #footer>
	      <span class="dialog-footer">
	        <el-button @click="dialogVisible1 = false">取 消</el-button>
	        <el-button type="primary" @click="dome()">确 定</el-button>
	      </span>
	    </template>
	  </el-dialog>
	
</template>

<script>
	export default {
	    data() {
	      return {
	        dept:[],
          value:'',
          valus:{
            deId:0,
            deName:'',
            deDate:''
          },
			  dialogVisible1:false,
			  dialogVisible:false,
          currentPage1: 5,
          currentPage2: 5,
			          currentPage3: 5,
			          currentPage4: 4,
	        multipleSelection: [],
			 dialogTableVisible: false,
			 formLabelWidth: '120px',

			 
	      }
	    },
	
	    methods: {
        getData(){
          this.axios.get("http://localhost:8089/bm-list").then((v)=>{
            this.dept=v.data
            console.log(this.dept)
          }).catch()
        },
        // cs(){
        //   console.log(this.value)
        // },
        dome(){
          this.valus.deName=this.value
          this.valus.deDate=new Date()

        this.axios.post("http://localhost:8089/add-list",this.valus).then((v)=>{
          console.log("返回："+v.data)
          this.clearForm()
          this.getData()
        }).catch()
          this.dialogVisible1=false
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
              },
        clearForm(){
          this.value=''
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
