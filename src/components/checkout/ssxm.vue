<template>
	<el-row class="row-one">
		<el-form label-width="100px" style="padding-top: 10px">
			<el-col :span="9">
				<el-form-item label="结果：" label-width="60px">
					{{ sproject.length }}条
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item  label="手术信息:" label-width="100px">
					<el-input  @input="getData" style="width: 200px;" v-model="input" placeholder="请输入你要查询的手术" ></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="" label-width="50px">
					<el-button @click="getData" type="primary" icon="el-icon-search">查询</el-button>
					</el-form-item>

			</el-col>
			<el-col :span="5" >
				<el-form-item label="" label-width="600px">
				<el-button type="primary"  @click="ssInser()">新增</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</el-row>
	<el-dialog title="手术详情" v-model="isShow" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-手术详情 -->
		<el-form :model="ssproject"   label-width="100px" class="demo-ruleForm">
			<el-row>
								<el-col :span="6">
									<el-form-item label="手术编号:" prop="projectId">
                    {{ssproject[0].projectId}}
									</el-form-item>
								</el-col>
								<el-col :span="6" :offset="4">
									<el-form-item label="科室:" prop="士大夫">
                    {{ssproject[0].ksName}}
									</el-form-item>
								</el-col>
			</el-row>
			  <el-row>
					<el-col :span="8">
						<el-form-item label="手术名称:" prop="projectName">
              {{ssproject[0].projectName}}
						</el-form-item>
					</el-col>
					<el-col :span="6" :offset="2">
						<el-form-item label="手术类型:" prop="name">
              {{ssproject[0].projectType}}
						</el-form-item>
					</el-col>
			  </el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item label="手术位置:" prop="name">
            {{ssproject[0].projectPosition}}
					</el-form-item>
					</el-col>
					<el-col :span="6" :offset="4">
						<el-form-item label="手术价格:" prop="name">
              {{ssproject[0].projectPay}}
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="可选麻醉:" prop="name">
            <ul>
              <li style="list-style: none;float: left" v-for="(value) in mzproject">{{value.operationAnaesthesia}}&nbsp</li>
            </ul>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="22">
					<el-form-item label="适应症:" prop="name">
					　　{{ssproject[0].projectIndication}}
					</el-form-item>
				</el-col>
					
			</el-row>
			<el-row>
				<el-col :span="22">
					<el-form-item label="注意事项:" prop="name">
					　　{{ssproject[0].projectMatters}}
					</el-form-item>
				</el-col>
					
			</el-row>
			<el-row>
				<el-col :span="22">
					<el-form-item label="手术禁忌:" prop="name">
									  　{{ssproject[0].projectTaboo}}
					</el-form-item>
				</el-col>		
			</el-row>
			  <el-form-item>
				  <el-col :span="1" :offset="8">
				<el-button @click="resetForm('ruleForm')">确定</el-button>
				</el-col>
			  </el-form-item>
		</el-form>
	</el-dialog>
	<el-dialog :title="option" :before-close="xzxgss" v-model="xgss" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-新增修改======================================= -->
		<el-form   ref="ssForm" :rules="rulessdx" :model="ssdx" label-width="100px" class="demo-ruleForm">
			<el-row>
								<el-col :span="7">
									<el-form-item  label="手术编号:" prop="name">
									<el-input v-model="ssdx.projectNumber" :disabled="true"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="7" :offset="3">
									<el-form-item label="科室:" prop="ksId">
                    <el-select v-model="ssdx.ksId" placeholder="请选择">
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
					<el-col :span="7">
						<el-form-item label="手术名称:" prop="projectName">
						<el-input v-model="ssdx.projectName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7" :offset="3">
						<el-form-item label="手术类型:" prop="projectType">
              <el-select v-model="ssdx.projectType" placeholder="请选择">
                <el-option
                    v-for="item in ssdj"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value">
                </el-option>
              </el-select>
						</el-form-item>
					</el-col>
			  </el-row>
			<el-row>
					<el-col :span="7">
							<el-form-item label="手术位置:" prop="projectPosition">
							<el-input v-model="ssdx.projectPosition"></el-input>
              </el-form-item>
          </el-col>
					<el-col :span="7" :offset="3">
						<el-form-item label="手术价格:" prop="projectPay">
						<el-input v-model="ssdx.projectPay" oninput="value=value.replace(/[^\d^\.]+/g,'')" onkeyup="value=value.replace(/[^\d^\.]+/g,'')"></el-input>
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>
				<el-col :span="9">
					<el-form-item label="适应症:" prop="projectIndication">
					<el-input
					  type="textarea"
					  :rows="2"
					  placeholder="请输入内容"
					  v-model="ssdx.projectIndication">
					</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="9" :offset="1">
						<el-form-item label="所需麻醉:" prop="ssAn">
						<el-select v-model="ssdx.ssAn" multiple placeholder="请选择" style="width: 230px;">
						    <el-option
						      v-for="item in mazui"
						      :key="item.anaesthesiaId"
                  :label="item.operationAnaesthesia"
						      :value="item.anaesthesiaId">
                </el-option>
						  </el-select>
						</el-form-item>
				</el-col>
			</el-row>
			<el-row>
								<el-col :span="9">
									<el-form-item label="手术禁忌:" prop="projectTaboo">
									  <el-input
									  type="textarea"
									  :rows="2"
									  placeholder="请输入内容"
									  v-model="ssdx.projectTaboo">
									</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="11" :offset="1">
									<el-form-item label="注意事项:" prop="projectMatters">
									<el-input
									  type="textarea"
									  :rows="2"
									  placeholder="请输入内容"
									  v-model="ssdx.projectMatters">
									</el-input>
									</el-form-item>
								</el-col>
			</el-row>
			  <el-form-item>
				  <el-col :span="1" :offset="8">
				<el-button type="primary" @click="ssForm('ssForm')">确定</el-button>
				</el-col>
			  </el-form-item>
		</el-form>
	</el-dialog>
	
	<el-row > <!--======= ============================================================表格 ==================================================-->
		<el-table
		    :data="sproject.slice((currentPage-1)*pagesize,currentPage*pagesize)"
		    tooltip-effect="dark"
			  height="450"
		    style="width: 100%">
		    <el-table-column
		      label="编号"
			  prop="projectNumber"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="projectName"
		      label="手术名称">
		    </el-table-column>
		    <el-table-column
		      prop="projectType"
		      label="手术类型">
		    </el-table-column>
			<el-table-column
			  prop="projectPay"
			  label="手术价格">
			</el-table-column>
			<el-table-column
			  prop="ksName"
			      width="180"
			  label="科室">

			</el-table-column>
			<el-table-column
			  prop="projectPosition"
			  label="开刀位置">
			</el-table-column>
			<el-table-column label="操作" width="400px">
			      <template #default="scope">
					<el-button
					  size="mini"
					  @click="handleEdit(scope.row)">详情
					  </el-button>
			        <el-button
			          size="mini"
                type="primary"
			          @click="ssEdit(scope.row)">修改</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="ssptDelete(scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
		</el-table>
		<el-pagination
				 					style="text-align: center;"
				       @size-change="handleSizeChange"
				       @current-change="handleCurrentChange"
				       :current-page="1"
				       :page-sizes="[2,4,6,8,10]"
				       :page-size="pagesize"
				       layout="total, sizes, prev, pager, next, jumper"
				       :total="sproject.length">
    </el-pagination>
	</el-row>
  一级手术是指手术过程简单、技术难度较低、风险程度较小的各种手术。
  二级手术是指手术过程不复杂、技术难度一般、风险程度中等的各种手术。
  三级手术是指手术过程较复杂、技术难度较大、风险程度较大的各种手术。
  四级手术是指手术过程复杂、技术难度大、风险程度大的各种手术。
</template>

<script>
  import qs from 'qs'
	export default {
	    data () {
	      return {
          currentPage: 1, //初始页
          pagesize: 10, //    每页的数据
	        // 弹框标题
          option:'',
          //表格数据
          sproject:[],
          ss:[],
          ssproject:[],
          mzproject:[],
          department:[],
          total:0,
          pageNo:1,
          size:5,
          projectId:'',
          mazui:[],
          // 手术项目对象？、
          ssdx:{
            //手术主键
            projectId:'0',
            // 手术编号
            projectNumber:'',
            // 科室编号
            ksId: '',
            // 手术价格
            projectPay:'',
            // 手术名称
            projectName:'',
            // 手术注意事项
            projectMatters:'',
            // 手术禁忌
            projectTaboo:'',
            // 手术适应症
            projectIndication:'',
            // 手术位置
            projectPosition:'',
            //手术麻醉对象
            ssAn:[],
            //手术等级
            projectType:''
          },
          rulessdx:{
            ksId: [
              { required: false, message: '请选择科室', trigger: 'change' },
              { required: true, message: '请选择类型', trigger: 'blur' }
            ],
            projectPay: [
              { required: true, message: '请输入价格', trigger: 'blur' },
              { required: true, message: '请输入价格', trigger: 'input' }
            ],
            projectName: [
              { required: true, message: '请输入名称', trigger: 'blur' }
            ],
            projectMatters: [
              { required: true, message: '请输入名称', trigger: 'blur' }
            ],
            projectTaboo: [
              { required: true, message: '请输入名称', trigger: 'blur' }
            ],
            projectIndication: [
              { required: true, message: '请输入名称', trigger: 'blur' }
            ],
            projectPosition: [
              { required: true, message: '请输入名称', trigger: 'blur' }
            ],
            ssAn: [
              { type: 'array', required: true, message: '请至少选择一种麻醉', trigger: 'blur' },
              { required: false, message: '请选择类型', trigger: 'change' }
            ],
            projectType: [
              { required: false, message: '请选择类型', trigger: 'change' },
              { required: true, message: '请选择类型', trigger: 'blur' }
            ],
          },
          //删筛选科室
          kssx:[{
            text:'',
            value:''
          }],

          ssdj:[{
            text:'一级手术',
            value:'一级手术'
          },{
            text:'二级手术',
            value:'二级手术'
          },{
            text:'三级手术',
            value:'三级手术'
          },{
            text:'四级手术',
            value:'四级手术'
          }
          ],
			    isShow:false,
			    xgss:false,
          // 搜索框
			    input:'',
          today: '',
			    sstime: '',
	        radio1: '查看全部'
	       }
	    },
		methods: {
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function(size) {
        this.pagesize = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
        console.log(this.currentPage) //点击第几页
      },
      getData(){
        this.axios.get("http://localhost:8089/allDescSpro",{params:{input:this.input}}).then((res)=>{
          this.sproject = res.data;
        }).catch()
        this.axios.get("http://localhost:8089/mzproject").then((res)=>{
          this.mazui = res.data;
        }).catch()
        //科室
        this.axios.get("http://localhost:8089/ks-list").then((res)=>{
          this.department = res.data;
        }).catch()

      },
      // 手术详情
			handleEdit(row) {
        this.projectId=row.projectId;
        console.log(this.projectId)
        this.axios.get("http://localhost:8089/ssprot",{params:{projectId:this.projectId}}).then((res)=>{
          this.ssproject = res.data;
          this.isShow = true;
        }).catch()
        this.axios.get("http://localhost:8089/mzprot",{params:{projectId:this.projectId}}).then((res)=>{
          this.mzproject = res.data;
        }).catch()
			},
      //删除
      ssptDelete(row){
        this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.get("http://localhost:8089/ssdproDetail",{params:{projectId:row.projectId}}).then((res)=>{
            let aa=res.data;
            if(res.data==null||res.data==""){
              this.scprjt(row)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else {
              this.$message({
                type: 'info',
                message: '此项目已留有记录,无法删除'
              });
            }
          }).catch()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除
      scprjt(row){
        this.axios.post('http://localhost:8089/delet-sprot', qs.stringify({projectId:row.projectId}))
            .then((v)=>{
              if(v.data == 'ok'){
                this.getData()
              }else{
                alert(v.data);
              }
            }).catch(function(){

        })
      },
      // 新增
			ssInser() {
        this.option='新增手术';
        this.opertClear();
        this.today=new Date().getFullYear()+new Date().getDay();
        this.ssdx.projectNumber=("SS"+this.today+Math.round(Math.random()*1000))
        this.xgss = true;
			},
      // 修改
      ssEdit(row) {
        this.option='修改手术';
        this.projectId=row.projectId;
        console.log(this.projectId)
        this.axios.get("http://localhost:8089/alone-pro",{params:{projectId:this.projectId}}).then((res)=>{
          var dx=[];//定义一个集合用于接受
          dx = res.data;
          this.ssdx=dx[0]
          console.log(dx)
          this.xgss = true;
        }).catch()
        this.axios.get("http://localhost:8089/mzprot",{params:{projectId:this.projectId}}).then((res)=>{
          this.ssdx.ssAn = res.data;
          var ss=[];
          res.data.forEach(function(x){
              ss.push(x.anaesthesiaId)
          });
          this.ssdx.ssAn=ss
          console.log(ss)
        }).catch()
          this.xgss = true;

      },
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					alert('submit!');
				  } else {
					console.log('error submit!!');
					return false;
				  }
				});
			},
      resetForm(formName) {
        this.isShow = false
      },
      //清除手术弹框数据
      opertClear(){
        this.ssdx = {
          //手术主键
          projectId:'',
          // 手术编号
          projectNumber:'',
          // 科室编号
          ksId: '',
          // 手术价格
          projectPay:'',
          // 手术名称
          projectName:'',
          // 手术注意事项
          projectMatters:'',
          // 手术禁忌
          projectTaboo:'',
          // 手术适应症
          projectIndication:'',
          // 手术位置
          projectPosition:'',
          //手术麻醉对象
          ssAn:'',
          //手术等级
          projectType:''
        }
      },
      // 手术弹框x
      xzxgss(){
        this.xgss=false;
        this.opertClear();
        this.$refs['ssForm'].resetFields();
      },
      //确定新增
			ssForm(formName) {
        if(this.option=='新增手术'){
          this.axios.get("http://localhost:8089/ssqProject",{params:{projectName:this.ssdx.projectName}}).then((res)=>{
            let aa=res.data;
            if(res.data==null||res.data==""){
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  this.axios.post("http://localhost:8089/addOrUpdataProj",{proj:this.ssdx,ssAn:this.ssdx.ssAn}).then((res)=>{
                    this.getData();
                    this.$refs[formName].resetFields();
                  }).catch()
                  this.xgss = false;
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            }else {
              this.$message({
                type: 'info',
                message: '此项目已存在'
              });
            }
          }).catch()
        }else{
          this.axios.post("http://localhost:8089/addOrUpdataProj",{proj:this.ssdx,ssAn:this.ssdx.ssAn}).then((res)=>{
            this.getData();
            this.$refs[formName].resetFields();
          }).catch()
          this.xgss = false;
        }



			}
		},
    created() {
      this.getData()
    }
  }
</script>

<style scoped>
	.my-el-time{
		padding-top: 20px;
		width: 200px;
	}
	.myin{
		padding-top: 20px;
		width: 200px;
	}

</style>

