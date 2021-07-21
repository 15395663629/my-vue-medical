<template>
	<div>
		员工管理
	</div>
	
	<div class="xxx">
		<el-button type="primary" @click="dialogVisible1 = true">新增员工</el-button>
		<!-- <el-button type="primary">编辑员工</el-button> -->
		<el-button type="primary" @click="cs">重置密码</el-button>
		<span class="name">
			姓名：<el-input style="width: 120px;" v-model="name" value=""></el-input>
			<el-button type="primary" icon="el-icon-orange" style="margin-left: 20px;">查询</el-button>
		</span>
	</div>

	<el-table ref="multipleTable" :data="funs.slice((page-1)*size,page*size)" tooltip-effect="dark" style="width: 100%"
		@selection-change="handleSelectionChange" class="dome">
		<el-table-column type="selection">
		</el-table-column>
    <el-table-column prop="sid" label="员工编号">
    </el-table-column>
		<el-table-column prop="sname" label="姓名" >
		</el-table-column>
<!--    <el-table-column label="姓名" width="180">-->
<!--      <template #default="scope" >-->
<!--        <el-popover width="300" effect="light"   trigger="hover" placement="top">-->
<!--          <template #default >-->
<!--            <p>姓名: {{ scope.row.mzSick.sickName }}</p>-->
<!--            <p>住址: {{ scope.row.mzSick.sickSite }}</p>-->
<!--            <p>建立日期: {{ scope.row.mzSick.sickTime }}</p>-->
<!--          </template>-->
<!--          <template #reference>-->
<!--            <div class="name-wrapper">-->
<!--              <el-tag size="medium">{{ scope.row.mzSick.sickName }}</el-tag>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-popover>-->
<!--      </template>-->
<!--    </el-table-column>-->
		<el-table-column prop="ssore" label="身份证" >
		</el-table-column>
    <el-table-column prop="sphone" label="联系电话" >
    </el-table-column>
    <el-table-column prop="sdate" label="入职日期" >
    </el-table-column>
    <el-table-column prop="user.uname" label="用户名" >
    </el-table-column>
    <el-table-column prop="ks.ksName" label="所属科室" >
    </el-table-column>
    <el-table-column prop="t.tname" label="职称" >
    </el-table-column>
	<el-table-column prop="szt" label="状态" >
		<template v-slot="scope">
			<p v-if="scope.row.szt==0">在职</p>
			<p v-if="scope.row.szt==1">离职</p>
		</template>
	</el-table-column >
		<el-table-column label="操作" width="250px">
			<template v-slot:default="r">
				<el-button type="primary" size="mini" @click="dialogVisible=true">授权</el-button>
				<el-button type="primary" @click="bianji(r.row)" size="mini">编辑</el-button>
				<el-button type="primary" size="mini">离职</el-button>
				
			</template>
		</el-table-column>

	</el-table>
	<!--分页插件-->
  <el-pagination
      style="text-align: center;margin-top: 10px"
      @size-change="HandleSizeChange"
      @current-change=" "
      :current-page="page"
      :page-sizes="[2,4,6,8,10]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="funs.length">
  </el-pagination>
	<el-dialog title="员工信息" v-model="dialogVisible1" width="40%" :before-close="handleClose">
			员工姓名：<el-input type="text" style="width: 30%;" v-model="sname"></el-input>
      用户名：<el-input type="text" style="width: 30%" v-model="uname"></el-input><br>
      密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：<el-input type="password" style="width: 30%;margin-top:20px;" v-model="upass"></el-input>
			科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室：<el-select v-model="yuangong" placeholder="请选择"
				style="width: 25%;margin-top:20px;" @change="seksId($event)">
				<el-option v-for="item in deptks" :key="item.ksId" :label="item.ksName" :value="item.ksId">
				</el-option>
			</el-select><br>
			部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门：<el-select v-model="dept" placeholder="请选择"
				style="width: 25%;margin-top:20px;" @change="ksDeId($event)">
				<el-option v-for="item in dplist" :key="item.deId" :label="item.deName" :value="item.deId">
				</el-option>
			</el-select>
      <span style="margin-left: 25px"></span>
      角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：<el-select v-model="jusei" placeholder="请选择" style="width: 25%;margin-top:20px;" @change="selRoId($event)">
      <el-option v-for="item1 in roles" :key="item1.rid" :label="item1.rname" :value="item1.rid">
      </el-option>
    </el-select><br />

      职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<el-select v-model="tile" placeholder="请选择" style="width: 25%;margin-top:20px;" @change="selTiId($event)">
      <el-option v-for="item1 in title" :key="item1.tid" :label="item1.tname" :value="item1.tid">
      </el-option>
    </el-select>
      <span style="margin-left: 25px"></span>
			身份证&nbsp;&nbsp;&nbsp;：<el-input type="text" style="width: 40%;margin-top:20px;" v-model="ssore"></el-input><br />
			联系电话：<el-input type="text" style="width: 40%; margin-top: 20px;" v-model="phone"></el-input>
		<template #footer>

			<span class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="determine()">确 定</el-button>
			</span>
		</template>
	</el-dialog>
  <!-- 角色授权弹框-->
  <el-dialog title="角色授权" v-model="dialogVisible" width="30%" style="height: 50%">
<!--    <el-tree ref="tree" :data="funs" node-key="fctionId"-->
<!--             :props="props" show-checkbox  default-expand-all-->
<!--             @check-change="checkChange">-->
<!--    </el-tree>-->
  </el-dialog>
</template>

<script>
import qs from 'qs'
	export default {
		data() {
			return {
			  funs:[],
        size:4,
        page:1,
       /*
       员工表字段
        */
        sname:'',
        uname:'',
        upass:'',
        ssore:'',
        phone:'',
        staff:{
			    sid:0,
          sname:'',
          ssore:'',
          sphone:'',
          sdate:'',
          uid:0,
          ksId:0,
          tid:0,

        },
        user:{
          uid:0,
          uname:'',
          upswd:''
        },
        /*分割线*/
		multipleSelection:[],
		uid:'',
        dialogVisible1:false,
      dplist:[],
        title:[],
        deptks:[],
        roles:[],

        yuangong:'',
        jusei:'',
        dept:'',
        kslist:'',
        rolse:'',
        tile:'',


        bmId:0,
        keId:0,
        tId:0,
        rId:0,
        dialogVisible:false
			}
		},

		methods: {
      getData(){
        //查询员工
        this.axios.get("selectall-staff").then((res)=>{
          this.funs = res.data
          console.log(this.funs)
        }).catch()
        //查询部门
        this.axios.get("http://localhost:8089/bm-list").then((v)=>{
              this.dplist=v.data
              //查询科室
        }).catch()
        //查询角色
        this.axios.get("http://localhost:8089/role-list").then((v)=>{
          this.roles=v.data
        }).catch()
        //查询职称
        this.axios.get("http://localhost:8089/titel-list").then((v)=>{
          this.title=v.data
        }).catch()
      },
      seksId(event){
        this.ksId=event
      },
      selRoId(event){
        this.rId=event
      },
      selTiId(event){
        this.tId=event
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
      ksDeId(event){
        this.deId=event
          this.axios({
            url:"bmks-list",
            params:{id:this.deId}
          }).then((v)=>{
            this.deptks=v.data;
            console.log(v.data)
          }).catch();

      },
      determine(){
        this.staff.sname=this.sname
        this.staff.ssore=this.ssore
        this.staff.sphone=this.phone
        this.staff.sdate=new Date()
        this.staff.ksId=this.ksId
        this.staff.tid=this.tId
        this.user.uname=this.uname
        this.user.upswd=this.upass
        console.log(this.staff.sid)

       if(this.staff.sid===0){
         // this.axios.post('add-staff',qs.stringify(data)).then().catch()
         this.axios({
           url:"add-staff",
           params:{staff:this.staff,user:this.user,rId:this.rId}
         }).then((v)=>{
           this.getData()
           this.qingchu()
           this.dialogVisible1= false
         }).catch();
       }else{
         //编辑
         console.log(123123132)
         this.axios({
           url:"upa-staff",
           params:{staff:this.staff,user:this.user,rId:this.rId}
         }).then((v)=>{
           this.getData()
           this.qingchu()
           this.dialogVisible1= false
         }).catch();
       }
      },
      qingchu(){
        this.sname=''
       this.ssore=''
        this.phone=''

      this.yuangong=''
        this.jusei=''
        this.tile=''
        this.dept=''
       this.uname=''
        this.upass=''
      },
      bianji(row){
       console.log(row)
        this.staff.sid=row.sid
        this.dialogVisible1=true
        //回显数据
        this.sname=row.sname
        this.ssore=row.ssore
        this.phone=row.sphone
        this.yuangong=row.ks.ksName
        this.jusei=row.role.rname
        this.tile=row.t.tname
        this.dept=row.dept.deName
        this.user.uid=row.user.uid
        this.uname=row.user.uname
        this.upass=row.user.upswd
        //打包对象
        this.staff.sname=this.sname
        this.staff.ssore=this.ssore
        this.staff.sphone=this.phone
        this.staff.sdate=new Date()
        this.staff.ksId=this.ksId
        this.staff.tid=row.t.tid
        this.user.uname=this.uname
        this.user.upswd=this.upass
      },
      //员工授权
      getRoles(row){
        this.uid=row.user.uid
        console.log(this.uid)
        this. dialogVisible =true
        // this.axios.get("role-funs",{params:{roleId:this.roleId}}).then((res)=>{
        //   this.rolefuns = res.data;
        //   this. dialogVisible =true
        //   this.$nextTick(function() {
        //     this.$refs.tree.setCheckedKeys(this.rolefuns)
        //   })
        // }).catch()
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

	/* .xxx{
		margin-left: -500px;
	} */
	.name {
		margin-left: 500px;
	}
</style>
