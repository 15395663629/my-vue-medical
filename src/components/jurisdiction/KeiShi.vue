<template>
	<div class="wz">
		<el-button type="primary" @click="dialogVisible1 = true">新增科室</el-button>
		<span style="margin-left: 20px;">
			<el-input style="width: 120px;" v-model="kname" value=""></el-input>
			<el-button type="primary" icon="el-icon-orange" style="margin-left: 20px;" @click="select(this.kname)">查询科室</el-button>
		</span>

	</div>
    <!-- 表格 -->
	<el-table ref="multipleTable" :data="kslist.slice((page-1)*size,page*size)" tooltip-effect="dark" style="width: 100%"
		@selection-change="handleSelectionChange" class="dome">
		<el-table-column type="selection" >
		</el-table-column>
		<el-table-column label="科室编号" prop="ksId">
		</el-table-column>
		<el-table-column prop="ksName" label="科室名称" >
		</el-table-column>
    <el-table-column prop="ksDz" label="科室地址" >
    </el-table-column>
		<el-table-column prop="dept.deName" label="所属部门">
		</el-table-column>
		<el-table-column label="操作">
			<template v-slot:default="r">
<!--				<el-button type="danger" @click="open">删除</el-button>-->
				<el-button type="primary"  size="small" @click="bj(r.row)">编辑科室</el-button>

			</template>
		</el-table-column>

	</el-table>
	<!--分页插件-->
  <!-- 分页插件 -->
  <el-pagination
      style="text-align: center;margin-top: 10px"
      @size-change="HandleSizeChange"
      @current-change="HandleCurrentChange"
      :current-page="page"
      :page-sizes="[2,4,6,8,10]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="kslist.length">
  </el-pagination>


	<el-dialog title="科室管理" v-model="dialogVisible1" width="30%" >
		科室名称：<el-input type="text" style="width: 40%;" v-model="ksName"></el-input><br />
		部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门 ：<el-select v-model="value" placeholder="请选择"
			style="width: 20%;margin-top:20px;" @change="dome($event)">
			<el-option v-for="item in dplist" :key="item.deId" :label="item.deName" :value="item.deId" >

			</el-option>
		</el-select><br />
    科室地址：<el-input type="text"  style="width: 40%;margin-top: 20px" v-model="ksdz"></el-input>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="cs()">取 消</el-button>
				<el-button type="primary" @click="ook()">确 定</el-button>
			</span>
		</template>
	</el-dialog>

</template>

<script>
import  qs from 'qs'
	export default {
		data() {
			return {

			  kname:'',
        ksdz:'',
			  dplist:[],//查询部门
			  kslist:[],//表格查询集合
				dialogVisible1: false,
				multipleSelection: [],
				dialogTableVisible: false,
        deId:'',
				value: '',
        ksName:'',
        ks:{
			    ksId:0,
          ksName:'',
          ksDz:'',
          deId:0
        },
        //分页
        size:4,
        page:1
			}
		},

		methods: {
      getData(){
        //查询表格
        this.axios.get('http://localhost:8089/ks-list').then((v)=>{
          this.kslist=v.data
          console.log(this.kslist)
        }).catch()
        //查询部门
        this.axios.get("http://localhost:8089/bm-list").then((v)=>{
          this.dplist=v.data

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
			},
      //获取部门id
      dome(event){
        this.deId=event
        // console.log(this.deId)
      },
      cs(){
        this.dialogVisible1=false
        this.qc()

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
      ook(){
        this.ks.ksName =this.ksName
        this.ks.ksDz=this.ksdz
        this.ks.deId =this.deId
       if(this.ks.ksId===0){
         this.axios.post("http://localhost:8089/add-ks",this.ks).then((v)=>{
           if(v.data===1){
             this.qc()
             this.getData()
           }else{
             console.log(v.data)
           }
         }).catch()
       }else{
         this.axios.post("http://localhost:8089/upa-ks",this.ks).then((v)=>{
           if(v.data===1){
             this.qc()
             this.getData()
           }else{
             console.log(v.data)
           }
         }).catch()
       }
        this.dialogVisible1=false
      },
      //编辑
      bj(row){
        //回传值给页面
        console.log(row.dept)
        if(row.dept!==null){
          this.ksName=row.ksName
          this.value=row.dept.deName
          this.deId=row.deId
          this.ksdz=row.ksDz
        }else{
          this.ksName=row.ksName
          this.ksdz=row.ksDz
          console.log(2)
        }

        //给对象赋值
        this.ks.ksId=row.ksId
        this.ks.ksName=row.ksName
        this.ks.deId=row.deId
        this.ks.ksDz=row.ksDz
        this.dialogVisible1=true
      },
      //清空下拉框的值
    qc(){
        this.ksName=""
        this.value=""
        this.deId=''
      this.kname=''
    },
      //查询科室
      select(name){
       this.ks.ksName=name
        if(this.ks.ksName.length===0){
          this.getData()
        }
        this.axios.post('http://localhost:8089/select-ks',this.ks).then((v)=>{
          this.kslist=v.data
          console.log(this.kslist)
        }).catch()
      },
		},
    created() {
		  this.getData()
    }
  }
</script>


<style>
	.dome {
		margin-top: 20px;
	}

	/* .wz{
		margin-left: -1150px;
	} */
</style>
