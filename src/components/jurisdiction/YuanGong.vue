<template>

	<div class="xxx">
		<el-button type="primary" @click="dialogVisible1 = true">新增员工</el-button>
		<!-- <el-button type="primary">编辑员工</el-button> -->
		<span class="name">
			姓名：<el-input style="width: 140px;" v-model="name" value="" placeholder="请输入员工姓名"></el-input>
			<el-button type="primary" icon="el-icon-orange" style="margin-left: 20px;">查询</el-button>
		</span>
	</div>

	<el-table ref="multipleTable" :data="funs.slice((page-1)*size,page*size)" tooltip-effect="dark" style="width: 100%"
		 class="dome">
		<el-table-column type="selection">
		</el-table-column>
    <el-table-column prop="sid" label="员工编号" width="150px">
    </el-table-column>
    <el-table-column label="信息"  width="200px">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="250px">
          <template #default>
            <p>身份证:      {{ scope.row.ssore}}</p><br />
            <p>联系电话:    {{ scope.row.sphone }}</p><br />
            <p>入职日期:    {{ scope.row.sdate }}</p><br />
            <p>用户名:     {{ scope.row.user.uname }}</p><br />
            <p>职称:       {{ scope.row.t.tname }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.sname }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="ks.ksName" label="所属科室" >
    </el-table-column>

	<el-table-column prop="szt" label="状态" >
		<template v-slot="scope">
			<p v-if="scope.row.szt==0">在职</p>
			<p v-if="scope.row.szt==1">离职</p>
		</template>
	</el-table-column >
		<el-table-column label="操作" >
			<template v-slot:default="r">
				<el-button type="primary" size="mini" @click="getRoleFuns(r.row)">授权</el-button>
        <el-button type="primary" size="mini"  @click="chongzhi(r.row)">重置密码</el-button>
				<el-button type="primary" @click="bianji(r.row)" size="mini">编辑</el-button>
				<el-button type="primary" size="mini"  @click="open(r.row)">离职</el-button>
				
			</template>
		</el-table-column>

	</el-table>
	<!--分页插件-->
  <el-pagination
      style="text-align: center;margin-top: 10px"
      @size-change="HandleSizeChange"
      @current-change="HandleCurrentChange"
      :current-page="page"
      :page-sizes="[2,4,6,8,10]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="funs.length">
  </el-pagination>
	<el-dialog title="员工信息" v-model="dialogVisible1" width="40%" @close="qingchu">
    <el-form :model="from" ref="form" :rules="rules">
      <el-form-item >
        <el-col :span="11">
          <el-form-item label="员工姓名:" prop="sName">
            <el-input v-model="from.sName" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名:" prop="uName">
            <el-input v-model="from.uName"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="密 码:" prop="uPswd" style="width:90%;margin-left: 20px">
            <el-input type="password" v-model="from.uPswd"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="职 称:" >
            <el-select v-model="from.tId" placeholder="请选择"  @change="selTiId($event)">
              <el-option v-for="item1 in title" :key="item1.tid" :label="item1.tname" :value="item1.tid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="部 门:" style="width:90%;margin-left: 25px">
            <el-select v-model="from.deptid" placeholder="请选择"
                       @change="ksDeId($event)">
              <el-option v-for="item in dplist" :key="item.deId" :label="item.deName" :value="item.deId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="科 室:" >
            <el-select v-model="from.ksId"
                       @change="seksId($event)">
              <el-option v-for="item in deptks" :key="item.ksId" :label="item.ksName" :value="item.ksId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
       <el-form-item label="身份证：" prop="sSore">
         <el-input v-model="from.sSore"></el-input>
       </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="联系电话：" prop="sPhone">
            <el-input v-model="from.sPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

    </el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="onSubmit('form')">确 定</el-button>
			</span>
		</template>
	</el-dialog>
  <!-- 角色授权弹框-->
  <el-dialog title="员工授权" v-model="dialogVisible" width="30%" >
<!--    <el-tree ref="tree" :data="roles" node-key="rid"-->
<!--             :props="props" show-checkbox  default-expand-all-->
<!--             >-->
<!--    </el-tree>-->
    请选择角色：<el-select v-model="value1" multiple placeholder="请选择角色" style="width: 30%;margin-left: 20px">
      <el-option
          v-for="item in roles"
          :key="item.rid"
          :label="item.rname"
          :value="item.rid">
      </el-option>
    </el-select>
    <template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveGrant()">确 定</el-button>
			</span>
    </template>
  </el-dialog>
</template>

<script>
import qs from 'qs'
	export default {
		data() {
			return {
        value1:[],
        from:{
          sId:0,
          sName:'',
          sSore:'',
          sPhone: '',
          ksId:'',
          tId:'',
          uId:'',
          uName:'',
          uPswd:'',
          deptid:''
        },
        error:{
          user:''
        },
        rules:{
          sName:[
            { required: true, message: '请输入员工姓名', trigger: 'blur' },
          ],
          uName:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          uPswd:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          ],
          sSore:[
            { required: true, message: '请输入证件号', trigger: 'blur' },
            {
              pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
              message: '请输入正确的证件号'
            },
            { min: 15, max: 18, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          ],
          sPhone:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {
              pattern: /^1(3|4|5|6|7|8)\d{9}$/,
              message: '请输入正确的手机号'
            },
          ]
        },
			  funs:[],
        size:4,
        page:1,
        cs:'',
        props: {
          id:'rid',
          label: 'rname',
        },
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
        //授权角色
        roles:[],
        //已授权
        rols:[],

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
        dialogVisible:false,
        name:''
			}
		},

		methods: {
      open(row) {
        // this.axios.post('',).then().catch()
        this.axios({
          url:"quit-staff",
          params:{id:row.sid}
        }).then((v)=>{
          if(v.data==="ok"){
            this.$message.error("离职成功")
            this.getData()
          }else{
            this.$message.error("离职失败")

          }
        }).catch();
      },
      getData(){
        //查询员工
        this.axios.get("selectall-staff").then((res)=>{
          this.funs = res.data
          this.cs=this.funs.sid
          console.log(this.funs)
        }).catch()
        //查询部门
        this.axios.get("http://localhost:8089/bm-list").then((v)=>{
              this.dplist=v.data
              //查询科室
        }).catch()
        //查询角色
        this.axios.get("http://localhost:8089/staff-menus").then((v)=>{
          this.roles=v.data
          console.log(this.roles)
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
      getRoleFuns(row){
        this.rId=row.user.uid
        this.axios.get("staff-funs",{params:{rId:this.rId}}).then((res)=>{
          this.value1 = res.data;
          this. dialogVisible =true

        }).catch()
      },
      saveGrant(){
        // var funs=this.$refs.tree.getCheckedKeys();
        var grant = JSON.stringify({rId:this.rId,funs:this.value1})
        this.axios.post("save-staff",qs.stringify({grant:grant})).then((res)=>{
          this.funs = res.data;
          this.dialogVisible = false;
          this.roleId = '';
          this.getData();
        }).catch()
      },
      onSubmit(formName){
        this.$refs[formName].validate(valid =>{
          if (valid) {
            console.log(this.from.sId+'编号')
            if(this.from.sId === 0){
              console.log(this.from,"新增")
              for (let i = 0 ; i<this.funs.length ; i++){
                if(this.user.uname==this.funs[i].user.uname){
                  return this.$message.error("用户已存在")
                }
              }
              for (let i=0;i<this.funs.length;i++){
                if(this.from.sSore==this.funs[i].ssore){
                  return this.$message.error("身份证重复")
                }
              }
              this.axios.post("add-staff",qs.stringify(this.from)).then((v)=>{
                this.getData()
                this.qingchu()
                this.dialogVisible1= false
              }).catch()
            }else{
              for (let i = 0 ; i<this.funs.length ; i++){
                if(this.user.uname==this.funs[i].user.uname){
                  return this.$message.error("用户已存在")
                }
              }
              for (let i=0;i<this.funs.length;i++){
                if(this.from.sSore==this.funs[i].ssore){
                  return this.$message.error("身份证重复")
                }
              }
              //编辑
              console.log("232323",this.from)
              this.axios.post("upa-staff",qs.stringify(this.from)).then((v)=>{
                this.getData()
                this.qingchu()
                this.dialogVisible1= false
              }).catch()
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      bianji(row){
        this.dialogVisible1 = true
        this.from.sId=row.sid
        console.log(row,"----====")
        this.from.sName = row.sname
        this.from.uName = row.user.uname
        this.from.uPswd = row.user.upswd
        this.from.tId = row.t.tid
        this.from.deptid = row.dept.deId
        this.from.ksId = row.ks.ksName
        this.ksDeId(row.ks.ksId);

        this.from.sSore=row.ssore
        this.from.sPhone=row.sphone
        this.from.uId=row.user.uid
      },
      chongzhi(row){
        this.axios({
          url:"reset",
          params:{uid:row.user.uid,ssore:row.ssore}
        }).then((v)=>{
        if(v.data===0){
          this.$message.success("重置成功")
          this.getData()
        }else{
          this.$message.error("系统异常")
        }
        }).catch();
      },
      qingchu(){
        this.from={
          sId:0,
          sName:'',
          sSore:'',
          sPhone: '',
          ksId:'',
          tId:'',
          uId:'',
          uName:'',
          uPswd:'',
          deptid:''
        }

      }
			
		},
    created() {
		  this.getData()
    },

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
