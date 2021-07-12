<template>
	<div>部门管理</div>
	<div class="wz">
		<el-button type="primary" @click="dialogVisible1 = true">新增部门</el-button>
		<span style="margin-left: 20px;">
			<el-input style="width: 120px;" v-model="name"></el-input>
			<el-button type="primary"  icon="el-icon-orange" style="margin-left: 20px;" @click="select(this.name)">查询部门</el-button>
		</span>
		<!-- <el-button type="primary">重置密码</el-button> -->
	</div>
  <!-- 表格 -->
  <el-table ref="multipleTable" :data="dept.slice((page-1)*size,page*size)"
            tooltip-effect="dark" style="width: 100%"
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
<!--        <el-button type="danger" @click="open(r.row)">删除</el-button>-->
        <el-button type="primary" @click="addDept(r.row)">编辑部门</el-button>
      </template>
    </el-table-column>

  </el-table>
	  <!-- 分页插件 -->
	  <el-pagination
	  	style="text-align: center;"
	       @size-change="HandleSizeChange"
	       @current-change=" "
	       :current-page="page"
	       :page-sizes="[2,4,6,8,10]"
	       :page-size="size"
	       layout="total, sizes, prev, pager, next, jumper"
	       :total="dept.length">
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
          name:'',
          valus:{
            deId:0,
            deName:'',
            deDate:''
          },
			  dialogVisible1:false,
          //分页
          size:4,
          page:1


			 
	      }
	    },
	
	    methods: {
	      //加载页面数据
        getData(){
          this.axios.get("http://localhost:8089/bm-list").then((v)=>{
            this.dept=v.data
            // console.log(this.dept)
          }).catch()
        },
        //初始每页数据数size和数据data
        HandleSizeChange: function(size) {
          this.size = size;
          console.log(this.pagesize) //每页下拉显示数据
        },
        //初始页page
        HandleCurrentChange: function(currentPage) {
          this.page = currentPage;
          console.log(this.currentPage) //点击第几页
        },

        dome(){
          if(this.valus.deId===0){
            //新增部门
            this.valus.deName=this.value
            this.valus.deDate=new Date()
            console.log(this.valus.deId)
            this.axios.post("http://localhost:8089/add-list",this.valus).then((v)=>{
             if(v.data==='ok'){
               this.clearForm()
               this.getData()
             }else{
               console.log(v.data)
             }

            }).catch()
          }else{
            //修改部门
            this.valus.deName=this.value
            this.axios.post("http://localhost:8089/upa-list",this.valus).then((v)=>{
              if(v.data==='ok'){
                this.clearForm()
                this.getData()
              }else{
                console.log(v.data)
              }
            }).catch()
            console.log(this.valus)
          }

          this.dialogVisible1=false
        },
  //删除 （待确定，部门一般不要删除）
	// 	  open(row) {
  //       this.valus.deId=row.deId
  //       this.valus.deName=row.deName
  //       this.valus.deDate=row.deDate
	// 	        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
	// 	          confirmButtonText: '确定',
	// 	          cancelButtonText: '取消',
	// 	          type: 'warning'
	// 	        }).then(() => {
	// 	          this.axios.post("http://localhost:8089/delet-list",this.valus).then((v)=>{
	// 	            if(v.data==='ok'){
	// 	              this.getData()
  //                 this.$message({
  //                   type: 'success',
  //                   message: '删除成功!'
  //                 });
  //               }else{
  //                 this.$message({
  //                   type: 'info',
  //                   message: '已取消删除'
  //                 });
  //               }
  //             }).catch()
	// 	        }).catch(() => {
	// 	          this.$message({
	// 	            type: 'info',
	// 	            message: '已取消删除'
	// 	          });
	// 	        });
	// 	      },
        select(name){
          this.name=name
          this.valus.deName=this.name
          // this.valus.deId=this.name
          // this.valus.deId=this.name
          // this.valus.deDate=this.name
         if(this.name.length === 0){
           this.getData()
         }else{
           this.axios.post("http://localhost:8089/selectlike",this.valus).then((v)=>{
             this.dept=v.data
             // this.getData()
             this.clearForm()
           }).catch()
         }
        },
			 //清空
        clearForm(){
          this.value=''
          this.name=''
        },
        addDept(row){
          this.dialogVisible1=true
          this.value=row.deName
          this.valus.deId=row.deId
          this.value=row.deName
          this.valus.deDate=row.deDate
        },

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
