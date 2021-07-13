<template>
	<el-button type="primary"  @click="dialogVisible1 = true">新增角色</el-button>
	<!-- <el-button type="primary">重置密码</el-button> -->
	<el-table ref="multipleTable" :data="role.slice((page-1)*size,page*size)" tooltip-effect="dark" style="width: 100%"
		@selection-change="handleSelectionChange" class="dome">
		<el-table-column type="selection" >
		</el-table-column>

		<el-table-column prop="rid" label="姓名">
		</el-table-column>
		<el-table-column prop="rname" label="地址" >
		</el-table-column>
		<el-table-column label="操作">
			<template v-slot:default="r">
				<el-button type="primary" @click="dialogVisible= true">角色授权</el-button>
			</template>
		</el-table-column>

	</el-table>
	<!--分页插件-->
	<el-pagination style="text-align: center;" @size-change="HandleSizeChange" @current-change="" :current-page="page"
		:page-sizes="[2,4,6,8,10]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="role.length">
	</el-pagination>
  <!--                 新增角色弹框                                   -->
	<el-dialog title="角色管理" v-model="dialogVisible1" width="30%" :before-close="handleClose">

		请输入角色名称：<el-input type="text" style="width: 40%;" v-model="rolename"></el-input><br />
		请选择所属部门：<el-select v-model="value" placeholder="请选择"
			style="width: 20%;margin-top:20px;"  @change="dome($event)">
			<el-option v-for="item in dept" :key="item.deId" :label="item.deName" :value="item.deId">
			</el-option>
		</el-select><br />
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
			</span>
		</template>
	</el-dialog>
  <!-- 角色授权弹框-->
  <el-dialog title="角色授权" v-model="dialogVisible" width="30%" style="height: 50%">
    <el-tree ref="tree" :data="funs" node-key="fctionId"
             :props="props" show-checkbox  default-expand-all
             @check-change="checkChange">
    </el-tree>


    <template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveGrant()">确 定</el-button>
			</span>
    </template>
  </el-dialog>

</template>

<script>
	export default {
		data() {
			return {
			  //角色列表
        role:[],
        //部门列表
        dept:[],
        //权限
        funs:[],
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
			}
		},

		methods: {
      getData(){
        this.axios.post("http://localhost:8089/role-list").then((v)=>{
          this.role=v.data
          // console.log(this.role)
        }).catch()
        //查询部门
        this.axios.get("http://localhost:8089/bm-list").then((v)=>{
          this.dept=v.data

        }).catch()
        this.axios.get("http://localhost:8089/func-list").then((v)=>{
          this.funs=v.data
          console.log(this.funs)
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
      dome(event){
        console.log(event)
      },
      saveGrant(){
        var funs=this.$refs.tree.getCheckedKeys();
        console.log(funs)
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
