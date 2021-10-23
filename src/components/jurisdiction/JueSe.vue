<template>
	<el-button type="primary"  @click="dialogVisible1 = true">新增角色</el-button>
	<!-- <el-button type="primary">重置密码</el-button> -->
	<el-table ref="multipleTable" :data="role.slice((page-1)*size,page*size)" tooltip-effect="dark" style="width: 100%"
	 class="dome">
		<el-table-column type="selection" >
		</el-table-column>
		<el-table-column prop="rid" label="姓名">
		</el-table-column>
      <el-table-column prop="rname" label="角色名" >
      </el-table-column>
    <el-table-column prop="roles.rname" label="父级角色" >
    </el-table-column>
		<el-table-column label="操作">
			<template v-slot:default="r">
				<el-button type="primary" @click="getRoleFuns(r.row)">角色授权</el-button>
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
      :total="role.length">
  </el-pagination>
  <!--                 新增角色弹框                                   -->
	<el-dialog title="角色管理" v-model="dialogVisible1" width="30%" @close="clear" >
		请输入角色名称：<el-input type="text" style="width: 40%;" v-model="rolename"></el-input><br />
		请选择父级名称：<el-select v-model="value" placeholder="请选择"
			style="width: 20%;margin-top:20px;"  @change="dome($event)">
			<el-option v-for="item in dept" :key="item.rid" :label="item.rname" :value="item.rid">
			</el-option>
		</el-select><br />
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="addRole">确 定</el-button>
			</span>
		</template>
	</el-dialog>
  <!-- 角色授权弹框-->
  <el-dialog title="角色授权" v-model="dialogVisible" width="30%" >
    <el-scrollbar height="200px">
      <el-tree ref="tree" :data="funs" node-key="fctionId"
               :props="props" show-checkbox  default-expand-all
      >
      </el-tree>
    </el-scrollbar>
    <template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveGrant()">确 定</el-button>
			</span>
    </template>
  </el-dialog>

</template>

<script>
import  qs from 'qs'
	export default {
		data() {
			return {
			  //角色列表
        role:[],
        //部门列表
        dept:[],
        //权限
        funs:[],
        //已授权权限
        rolefuns:[],
		//新增角色
		rolelist:{
			rid:0,
			rname:'',
			roId:0,
		},
		rosid:'',
        roleId:'',
        size:4,
        page:1,
        dialogVisible:false,
				dialogVisible1:false,
				formLabelWidth: '120px',
				value: '',
        cs:[],
        rolename:'',
        props: {
          id:'fctionId',
          label: 'fctionAssembly',
          children: 'list'
        },
        dage:[] ,

			}
		},

		methods: {
      getData(){
        this.axios.post("http://localhost:8089/role-list").then((v)=>{
          this.role=v.data
        }).catch()
        //查询部门
        this.axios.get("http://localhost:8089/roles-list").then((v)=>{
          this.dept=v.data

        }).catch()
        this.axios.get("http://localhost:8089/func-list").then((v)=>{
          this.funs=v.data
        }).catch()
      },
      getRoleFuns(row){
        this.roleId=row.rid
        this.axios.get("role-funs",{params:{roleId:this.roleId}}).then((res)=>{
          this.rolefuns = res.data;
          this. dialogVisible =true
          this.$nextTick(function() {
            this.$refs.tree.setCheckedKeys(this.rolefuns)
          })
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
	  //获取角色父级编号
      dome(event){
        this.rosid=event
        console.log(event)
      },
      saveGrant(){
        var funs=this.$refs.tree.getCheckedKeys();
        var grant = JSON.stringify({roleId:this.roleId,funs:funs})
        this.axios.post("save-grant",qs.stringify({grant:grant})).then((res)=>{
          this.funs = res.data;
          this.dialogVisible = false;
          this.roleId = '';
          this.getData();
        }).catch()

      },
	  //新增角色
	  addRole(){
		  this.rolelist.rname=this.rolename
		  this.rolelist.roId=this.rosid
      console.log(this.rolelist)
      if(this.rolename=="" || this.rolename===undefined){
       return  this.$message.error("不能为空")
      }
      for (let i=0; i<this.role.length; i++){
        if(this.rolename==this.role[i].rname){
          return this.$message.error("已存在")
        }
      }
		  this.axios.post("add-role",this.rolelist).then((v)=>{
		    console.log(v.data)
			 if(v.data==1){
				 this.clear()
				 this.getData()
				 this.dialogVisible1=false
			 }else{
				 console.log(v.data)
			 }
		  }).catch()
	  },
	  clear(){
		  this.rolename=""
		  this.rosid=""
	  }
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
</style>
