<template >
	<el-row class="row-one">
		<el-col :span="24">
			 病人信息：<el-input class="ss-br-xx" v-model="input" placeholder="请输入你要查询的病人" ></el-input>  
			<el-button type="primary" icon="el-icon-search">查询</el-button>
      <el-button  @click="drawer = true" style="margin-left: 500px" type="primary">手术室管理</el-button>
		</el-col>
	</el-row>
  <el-drawer
      title="手术室管理"
      size="600px"
      v-model="drawer"
      :direction='direction'
      :before-close="handleClose">
    <el-button   style="margin-left: 500px" @click="sssEdit('',1)" type="primary">新增</el-button>
    <el-table
        size="mini"
        :data="room"
        style="width:600px"
        height="450px"
        >
      <el-table-column
          label="编号"
          prop="operationName">
        <template #default="scope">
          <el-popover effect="light" trigger="hover"  placement="top">
            <template #default>
              <p>地址: {{ scope.row.operationRoomAddress }}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.operationName }}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
          prop="operationType"
          label="类别">
      </el-table-column>
      <el-table-column
          prop="deptks.ksName"
          label="科室">
      </el-table-column>
      <el-table-column
          prop="baseResultMap.sname"
          label="负责人">
      </el-table-column>
      <el-table-column
          prop="operationZt"
          label="状态">
        <template #default="scope">
              <div class="name-wrapper">
                <el-tag :type="scope.row.operationZt==0?'success':(scope.row.operationZt==1?'warning':'info')" size="medium">{{ scope.row.operationZt==0?'空闲':(scope.row.operationZt==1?'忙':'停用') }}</el-tag>
              </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template #default="scope">
          <el-button
              size="mini"
              type="primary"

              @click="sssEdit(scope.row)">修改</el-button>
          <el-button
              size="mini"
              type="danger"
              v-show="scope.row.operationZt!=2"
              @click="opensss(scope.row,2)">停用</el-button>
          <el-button
              size="mini"
              type="success"
              v-show="scope.row.operationZt==2"
              @click="opensss(scope.row,0)">启用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <span style="font-size:12px">(1)Ⅰ类手术间：即无菌净化手术间，主要接受颅脑、心脏、脏器移植等手术。
    (2)Ⅱ类手术间：即无菌手术间，主要接受脾切除手术、闭合性骨折切开复位术、眼内手术、甲状腺切除术等无菌手术。
    (3)Ⅲ类手术间：即有菌手术间，接受胃、胆囊、肝、阑尾、肾、肺等部位的手术。
    (4)Ⅳ类手术间：即感染手术间，主要接受阑尾穿孔腹膜炎手术、结核性脓肿、脓肿切开引流等手术。
    (5)Ⅴ类手术间：即特殊感染手术间，主要接受绿脓杆菌、气性坏疽杆菌、破伤风杆菌等感染的手术。</span>

  </el-drawer>

  <el-dialog width="40%" :title='stit' v-model="sss">
    <el-form>
      <el-row>
      <el-col :span="10">
        <el-form-item label="编号：" label-width="120px">
          <el-input v-model="ssr.operationName" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :offset="1" :span="10">
        <el-form-item label="科室:" label-width="120px">
          <el-select v-model="ssr.ksId" placeholder="请选择">
            <el-option
                v-for="item in department"
                :key="item.value"
                :label="item.ksName"
                :value="item.ksId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="类别：" label-width="120px">
            <el-select v-model="ssr.operationType" placeholder="请选择">
              <el-option
                  v-for="item in ssml"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :offset="1" :span="10">
          <el-form-item label="负责人:" label-width="120px">
            <el-select v-model="ssr.sid" placeholder="请选择">
              <el-option
                  v-for="item in staf"
                  :key="item.value"
                  :label="item.sname"
                  :value="item.sid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21">
          <el-form-item label="地址：" label-width="120px">
            <el-input v-model="ssr.operationRoomAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-col :span="1" :offset="11">
          <el-button type="primary" @click="ssmForm()">确定</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </el-dialog>
	<el-row>
		<el-col :span="6">
			结果：<span>2</span>条
		</el-col>
	</el-row>
	<el-row >
		<!-- ====================================================弹框 ====================================================-->
		<el-dialog title="手术安排" v-model="apss">
			<el-form  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="">
				<el-row style="color: red;">
								  手术信息
				</el-row>
				<el-row>
					<el-col :span="5">
						<el-form-item label="手术名称:" label-width="80px">
							<el-input></el-input>
						</el-form-item>
					</el-col>
					<el-col  :span="5">
						<el-form-item label="手术类型:" label-width="80px">
							<el-input></el-input>
						</el-form-item>
					</el-col>
					<el-col :offset="1" :span="7">
									<el-form-item label="手术部位:" label-width="80px">
										<el-input></el-input>
									</el-form-item>
					</el-col>
				</el-row>
				<el-row style="color: red;">
								  病人信息
				</el-row>
				<el-row>
					<el-col :span="5">
						<el-form-item label="病人姓名:" label-width="80px">
							<el-input></el-input>
						</el-form-item>
					</el-col>
					<el-col  :span="3">
						<el-form-item label="床号:" label-width="60px">
							<el-input></el-input>
						</el-form-item>
					</el-col>
								<el-col :offset="1" :span="2">
									<el-form-item label="性别:" label-width="60px">
										<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :offset="1" :span="3">
									<el-form-item label="年龄:" label-width="60px">
										<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :offset="2" :span="7">
									<el-form-item label="单&emsp;据:" label-width="60px">
										<el-input></el-input>
									</el-form-item>
								</el-col>
				</el-row>
			
			<el-row style="padding-top:6px ;">
				<el-col :span="5">
					<el-form-item label="科&emsp;&emsp;室:" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				<el-col :offset="3" :span="7">
					<el-form-item label="入院诊断:" label-width="80px">
						<el-input></el-input>
								</el-form-item>
				</el-col>
				<el-col :offset="2" :span="7">
					<el-form-item label="身份证:" label-width="60px">
							<el-input></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style="color: red;">
				申请信息
			</el-row>
			<el-row>
				<el-col :span="7">
					<el-form-item label="住院号:&emsp;" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				<el-col  :span="3">
					<el-form-item label="身高:" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
							<el-col :span="4">
								<el-form-item label="体重:" label-width="80px">
									<el-input></el-input>
								</el-form-item>
							</el-col>
							<el-col :offset="2" :span="7">
									<el-form-item label="术前诊断:" label-width="80px">
					<el-input></el-input>
							</el-form-item>
				</el-col>
			</el-row>
			<el-row style="padding-top:6px ;">
				<el-col :span="6">
					<el-form-item label="主刀医生:&emsp;" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				<el-col  :span="7">
					<el-form-item label="拟施手术:" label-width="80px">
						<el-input></el-input>
					</el-form-item>
							</el-col>
							<el-col  :span="10">
								<el-form-item label="拟施日期:" label-width="80px">
									<el-date-picker
									  v-model="value1"
									  type="daterange"
									  start-placeholder="Start Date"
									  end-placeholder="End Date"
									  :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]">
									</el-date-picker>
								</el-form-item>
							</el-col>
			</el-row>
		</el-form>
			<el-row style="color: red;">
					手术室选择
			</el-row>
		  <el-row >
        <el-table
            size="mini"
            :data="room1"
            height="200px"
        >
          <el-table-column
              label="编号"
              prop="operationName">
            <template #default="scope">
              <el-popover effect="light" trigger="hover"  placement="top">
                <template #default>
                  <p>地址: {{ scope.row.operationRoomAddress }}</p>
                </template>
                <template #reference>
                  <div class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.operationName }}</el-tag>
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
              prop="operationType"
              label="类别">
          </el-table-column>
          <el-table-column
              prop="deptks.ksName"
              label="科室">
          </el-table-column>
          <el-table-column
              prop="baseResultMap.sname"
              label="负责人">
          </el-table-column>
          <el-table-column
              prop="operationZt"
              label="状态">
            <template #default="scope">
              <div class="name-wrapper">
                <el-tag :type="scope.row.operationZt==0?'success':(scope.row.operationZt==1?'warning':'info')" size="medium">{{ scope.row.operationZt==0?'空闲':(scope.row.operationZt==1?'忙':'停用') }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template #default="scope">
              <el-button
                  size="mini"
                  type="primary"

                  @click="sssEdit(scope.row)">修改</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  v-show="scope.row.operationZt!=2"
                  @click="opensss(scope.row,2)">停用</el-button>
              <el-button
                  size="mini"
                  type="success"
                  v-show="scope.row.operationZt==2"
                  @click="opensss(scope.row,0)">启用</el-button>
            </template>
          </el-table-column>
        </el-table>
			
		  </el-row>
		  <el-row>
			  <el-col :span="3" :offset="11">
			  <el-button type="primary" @click="apssForm('ruleForm')">开始</el-button>
			  </el-col>
		  </el-row>
		</el-dialog>
<!-- ====================================================表格                ==========================================-->
		<el-table
		    ref="multipleTable"
		    :data="sApply"
		    tooltip-effect="dark"
			height="450"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      label="住院号"
			  prop="ptNo"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="ptdx.ptName"
		      label="姓名">
          <template #default="scope" >
            <el-popover width="300" effect="light"   trigger="hover" placement="top">
              <template #default >
                <p>姓名: {{ scope.row.ptdx.ptName }}</p>
                <p>年龄: {{ scope.row.ptdx.ptAge }}</p>
                <p>性别: {{ scope.row.ptdx.ptSex }}</p>
                <p>电话: {{ scope.row.ptdx.ptIphone }}</p>
                <p>住址: {{ scope.row.ptdx.ptHomeAdder }}</p>
              </template>
              <template #reference>
                <div class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.ptdx.ptName }}</el-tag>
                </div>
              </template>
            </el-popover>
          </template>
		    </el-table-column>
		    <el-table-column
		      prop="ptdx.ptDiagnoseName"
		      label="术前诊断">
		    </el-table-column>
			<el-table-column
			  prop="simulationOperation"
			  label="拟施手术">
			</el-table-column>
			<el-table-column
			  prop="simulationTime"
			  label="拟施日期">
			</el-table-column>
			<el-table-column
			  prop="ptdx.staff.sname"
			  label="主治医师">
			</el-table-column>
			<el-table-column label="操作" width="400px">
			      <template #default="scope">
			        <el-button
			          size="mini"
					  type="primary"
			          @click="apss=true">开始</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">取消申请</el-button>
			      </template>
			</el-table-column>
		</el-table>
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
	</el-row>
	
</template>

<script>
	import qs from "qs";

  export default {
		data() {
			return {
        seach:'',//手术申请搜索
			  staf:[],//员工
        department:[],//科室
			  stit:'',//手术室弹框标题
			  sss:false,//手术室弹框
			  room:[],//手术室集合
        room1:[],//开始手术时选择手术室
        drawer: false,
        direction: 'ltr',//抽屉方向
				textarea:"",
        sApply:[],//手术申请集合
				apss: false,
				centerDialogVisible: false,
				currentPage3: 5,
        ssml:[{
          text:'Ⅰ类手术间',
          value:'Ⅰ类手术间'
        },{
          text:'Ⅱ类手术间',
          value:'Ⅱ类手术间'
        },{
          text:'Ⅲ类手术间',
          value:'Ⅲ类手术间'
        },{
          text:'Ⅳ类手术间',
          value:'Ⅳ类手术间'
        },{
          text:'Ⅴ类手术间',
          value:'Ⅴ类手术间'
        }
        ],
        ssrq:{//手术室dx
          operationId:'',
          operationName:'',
          operationZt:0,
          operationRoomAddress:'',
          operationType:'',
          ksId:'',
          sid:''
        },
        ssr:{//手术室dx
          operationId:'',
          operationName:'',
          operationZt:0,
          operationRoomAddress:'',
          operationType:'',
          ksId:'',
          sid:''
        }
			};
		},
		 methods: {
		  //手术室基础参数
       getData() {
         this.axios.get("http://localhost:8089/sssRoom").then((res) => {
           this.room = res.data;
         }).catch()
         this.axios.get("http://localhost:8089/sssRoom",{params: {seach:0}}).then((res) => {
           this.room1 = res.data;
         }).catch()
         this.axios.get("http://localhost:8089/sssApply",{params: {seach:this.seach}}).then((res) => {
           this.sApply = res.data;
         }).catch()
         //科室
         this.axios.get("http://localhost:8089/ks-list").then((res)=>{
           this.department = res.data;
         }).catch()
         //员工
         this.axios.get("http://localhost:8089/staff-ks",{params: {id:4}}).then((res)=>{
           this.staf = res.data;
         }).catch()
       },
       //抽屉关闭
			  handleClose(done) {
				this.$confirm('确认关闭？')
				  .then(_ => {
					done();
				  })
				  .catch(_ => {});
			  },
       //打开新增修改手术室
       sssEdit(row,is) {
         this.stit = is == 1 ? '新增手术室' : '修改手术室';//设置弹框标题
         if(row!=''){
           this.ssr.operationId=row.operationId
           this.ssr.operationName=row.operationName
           this.ssr.operationZt=row.operationZt
           this.ssr.operationRoomAddress=row.operationRoomAddress
           this.ssr.operationType=row.operationType
           this.ssr.ksId=row.ksId
           this.ssr.sid=row.sid
         }else{
           //清空弹框
           this.ssr= {};
           let aa=new Date().getFullYear()+new Date().getDay();
           this.ssr.operationName=("SM"+aa+Math.round(Math.random()*1000))
         }

         this.sss = true
       },
       //手术室弹框确认
       ssmForm(){
         console.log(this.ssr)
         this.axios.post("http://localhost:8089/aOrUroom",{proj:this.ssr}).then((res)=>{
           this.getData();
         }).catch()
         this.sss=false
       },
       opensss(row,is) {
         let aa= is == 2 ? '停用' : '启用';
         this.$confirm('是否确认'+aa+'?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           //调用更改方法
           this.sssEdit1(row,is);
           this.$message({
             type: 'success',
             message: '成功'+aa
           });
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消'+aa
           });
         });
       },
       //修改手术室状态
       sssEdit1(row,is){
         this.axios.post('http://localhost:8089/upd-roomzt', qs.stringify({operationZt:is,operationId:row.operationId}))
             .then((v)=>{
               if(v.data == 'ok'){
                 this.getData()
               }else{
                 alert(v.data);
               }
             }).catch(function(){
         })
       },
			  apssForm(formName) {
			  	this.apss = false
			  	this.$refs[formName].resetFields();
			  }
		},created() {
		  this.getData()
    }
  };
</script>

<style>
	.qq{
		margin-top: 8px;
	}
	.works{
			padding: 15px;
		}
	.ss-br-xx{
		padding-top: 5px;
		width: 200px;
	}
</style>
