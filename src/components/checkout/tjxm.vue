<template>
	<el-row class="row-one">		
		<el-form label-width="100px" >
			<el-col :span="9">
				<el-form-item label="类型：" label-width="60px">
					<el-select style="width: 120px" v-model="value" placeholder="请选择">
						<el-option
						  v-for="item in tjmeal"
						  :key="item.value"
						  :label="item.checkIndex"
						  :value="item.codeType">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item  label="套餐信息:" label-width="100px">
					<el-input style="width: 180px" v-model="input" placeholder="请输入你要查询的套餐" ></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="" label-width="44px">
					<el-button type="primary" icon="el-icon-search">查询</el-button>
					</el-form-item>
			</el-col>
			<el-col :span="5" >
				<el-form-item label="" label-width="449px">
				<el-button type="primary"  @click="tjtcEdit()">新增套餐</el-button>	
				</el-form-item>
			</el-col>
		</el-form>
			
	</el-row>
	
	<el-dialog title="套餐" v-model="tjtc" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-套餐======================================= -->
		<el-form  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-row>
								<el-col :span="6">
									<el-form-item label="编号:" prop="name">
									<el-input></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6" :offset="4">
									<el-form-item label="套餐名称:" prop="name">
									<el-input></el-input>
									</el-form-item>
								</el-col>
			</el-row>
			<el-row>
					<el-col :span="6">
							<el-form-item label="体检类型:" prop="name">
							 <el-select v-model="value" placeholder="请选择">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
							</el-form-item>
						</el-col>
								<el-col :span="6" :offset="4">
						<el-form-item label="套餐价格:" prop="name">
						<el-input></el-input>
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>
				<el-col>
					选择所含项目
				</el-col>
			</el-row>
			<el-row > <!-- ============================================所含项目表格============================================ -->
				<el-table :data="yldate" style="width: 100%;height: 300px;" v-if="isShow!==null">
					<el-table-column
					      type="selection"
					      width="55">
					    </el-table-column>
					<el-table-column label="编号" width="70">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					
				    <el-table-column label="医疗项目名称" width="120">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.name }}</span>
						</template>
				    </el-table-column>
					<el-table-column label="价格" width="80">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.price }}</span>
						</template>
					</el-table-column>
					<el-table-column label="指标" width="100">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.lx }}</span>
						</template>
					</el-table-column>
				    <el-table-column label="指标意义">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.zbyy }}</span>
						</template>
				    </el-table-column>
					<el-table-column width="150px"
								  align="right">
								  <template  #header>
									<el-input
									  v-model="ssss"
										prefix-icon="el-icon-search"
									  size="small"
									  placeholder="项目搜索"/>
								  </template>
					</el-table-column>
				</el-table>
			</el-row>
			  <el-form-item>
				  <el-col :span="1" :offset="8">
				<el-button @click="tjtcForm('ruleForm')">确定</el-button>
				</el-col>
			  </el-form-item>
		</el-form>
	</el-dialog>
	
	
	<el-dialog title="套餐详情" v-model="tcxq" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-套餐详情======================================= -->
		<el-form  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-row>
								<el-col :span="6">
									<el-form-item label="编号:" prop="name">
									1232
									</el-form-item>
								</el-col>
								<el-col :span="12" :offset="4">
									<el-form-item label="套餐名称:" prop="name">
									套餐名称: 爱康君安【中枢神经系统体检套餐】
									</el-form-item>
								</el-col>
			</el-row>
			<el-row>
					<el-col :span="6">
							<el-form-item label="体检类型:" prop="name">
							 工作体检
							</el-form-item>
						</el-col>
								<el-col :span="6" :offset="4">
						<el-form-item label="套餐价格:" prop="name">
						390
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>
				<el-col>
					所含项目
				</el-col>
			</el-row>
			<el-row > <!-- ============================================所含项目表格============================================ -->
				<el-table :data="yldate" style="width: 100%;height: 300px;">
					<el-table-column label="编号" width="70">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.date }}</span>
						</template>
					</el-table-column>
					
				    <el-table-column label="医疗项目名称" width="120">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.name }}</span>
						</template>
				    </el-table-column>
					<el-table-column label="价格" width="80">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.price }}</span>
						</template>
					</el-table-column>
					<el-table-column label="指标" width="100">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.lx }}</span>
						</template>
					</el-table-column>
				    <el-table-column label="指标意义">
						<template #default="scope">
							<span style="margin-left: 10px">{{ scope.row.zbyy }}</span>
						</template>
				    </el-table-column>
					<el-table-column width="150px"
								  align="right">
								  <template  #header>
									<el-input
									  v-model="ssss"
										prefix-icon="el-icon-search"
									  size="small"
									  placeholder="项目搜索"/>
								  </template>
					</el-table-column>
				</el-table>
			</el-row>
			  <el-form-item>
				  <el-col :span="1" :offset="8">
				<el-button @click="tcxqForm('ruleForm')">确定</el-button>
				</el-col>
			  </el-form-item>
		</el-form>
	</el-dialog>
	
	<el-dialog :title="tilt" v-model="jcxm" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-医疗项目======================================= -->
		<el-form  status-icon v-model="jcdx" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-row>
								<el-col :span="7" >
									<el-form-item label="项目名称:" prop="name">
									<el-input v-model="jcdx.checkName"></el-input>
									</el-form-item>
								</el-col>
        <el-col :span="7" :offset="4">
          <el-form-item label="价格:" prop="name">
            <el-input v-model="jcdx.checkPay"></el-input>
          </el-form-item>
        </el-col>
			</el-row>
			<el-row>
          <el-col :span="7">
          <el-form-item label="指标:" prop="name">
            <el-input v-model="jcdx.tjCodeIndex.indexName"></el-input>
          </el-form-item>
          </el-col>
					<el-col :span="7" :offset="4">
						<el-form-item label="指标意义:" prop="name">
						<el-input v-model="jcdx.tjCodeIndex.indexSignificance"
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>

			</el-row>
			<el-form-item>
							  <el-col :span="1" :offset="8">
							<el-button type="primary" @click="jcxmForm('ruleForm')">确定</el-button>
							</el-col>
			</el-form-item>
		</el-form>
	</el-dialog>
	
	

	<el-row > <!-- ==================================================================上表格 ==================================================================-->
		<el-table :data="tjmeal" style="width: 100%;height:200px;" v-if="isShow!==null">
			<el-table-column label="编号" width="180">
				<template #default="scope">
					<span style="margin-left: 10px">{{ scope.row.codeId }}</span>
				</template>
			</el-table-column>
			
		    <el-table-column label="套餐名称" width="300">
				<template #default="scope">
				<el-popover effect="light" trigger="hover"  placement="top">
					<template #default>
						<p>套餐名称: {{ scope.row.codeName }}</p>
					</template>
					<template #reference>
		            <div class="name-wrapper">
		              <el-tag size="medium">{{ scope.row.codeName }}</el-tag>
		            </div>
		          </template>
				</el-popover>
		      </template>
		    </el-table-column>
			<el-table-column label="价格">
				<template #default="scope">
					<span style="margin-left: 10px">{{ scope.row.codePay }}</span>
				</template>
			</el-table-column>
			<el-table-column label="体检类型">
				<template #default="scope">
					<span style="margin-left: 10px">{{ scope.row.checkIndex }}</span>
				</template>
			</el-table-column>
		    <el-table-column label="操作">
		      <template #default="scope">
				  <el-button
				    size="mini"
				    @click="tcxqEdit(scope.$index, scope.row)">套餐详情
				    </el-button>
		        <el-button
		          size="mini"
				  type="primary"
		          @click="tjtcEdit(scope.$index, scope.row)">修改
				  </el-button>
				  <el-button
				    size="mini"
					type="danger">删除
				    </el-button>
		      </template>
		    </el-table-column>
		</el-table>
 <!--分页插件-->
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
	

		<el-row>
			<el-col  style="padding-bottom: 5px" :span="3" :offset="19">
					<el-button type="primary" @click=jcxmEdit(1)>新增项目</el-button>
			</el-col>
		</el-row>

	<!-- ============================================下表格============================================ -->
	<el-row > 
		<el-table :data="tjpro.slice((currentPage-1)*psize,currentPage*psize)"
              style="width: 100%;height: 220px;" v-if="isShow!==null">
			<el-table-column label="编号" width="180" prop="checkId">
			</el-table-column>
			
		    <el-table-column label="医疗项目名称" prop="checkName" >
				<template #default="scope">
				<el-popover effect="light" trigger="hover"  placement="top">
					<template #default>
						<p>项目名称: {{ scope.row.checkName }}</p>
					</template>
					<template #reference>
		            <div class="name-wrapper">
		              <el-tag size="medium">{{ scope.row.checkName }}</el-tag>
		            </div>
		          </template>
				</el-popover>
		      </template>
		    </el-table-column>
			<el-table-column label="价格" prop="checkPay">
			</el-table-column>
			<el-table-column label="指标" prop="indexName">
        <template #default="scope">
          <el-popover effect="light" trigger="hover"  placement="top">
            <template #default>
              <p>指标意义: {{ scope.row.tjCodeIndex.indexSignificance }}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.tjCodeIndex.indexName }}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
			</el-table-column>
			<el-table-column width="180" label="操作">
			  <template #default="scope">
			    <el-button
			      size="mini"
			      @click="jcxmEdit('1',scope.row)">修改
				  </el-button>
				  <el-button
				    size="mini"
            @click="tprojDelete(scope.row)"
					type="danger">删除
				    </el-button>
			  </template>
			  
			</el-table-column>
			<el-table-column width="150px"
						  align="right">
						  <template  #header>
							<el-input
                  @change="getData"
							  v-model="seach"
								prefix-icon="el-icon-search"
							  size="small"
							  placeholder="项目搜索"/>
						  </template>
			</el-table-column>
		</el-table>
		 <!--分页插件-->
						  <el-pagination
						 					style="text-align: center;"
						       @size-change="handleSizeChange"
						       @current-change="handleCurrentChange"
						       :current-page="1"
						       :page-sizes="[2,4,6,8,10]"
						       :page-size="psize"
						       layout="total, sizes, prev, pager, next, jumper"
						       :total="tjpro.length">
              </el-pagination>
	</el-row>
	
</template>

<script>
	import qs from "qs";

  export default {
	    data () {
	      return {
          tjmeal:[],//体检套餐集合
	        tilt:'',//弹框标题
          seach: '',//搜索
          currentPage: 1, //初始页
          psize:2, //每页的数据
          tjpro:[],//检查项目集合
          xmzb:[],//指标集合
          jcdx:{//检查项目对象
            //检查主键
            checkId:'',
            // 名称
            checkName:'',
            // 价格
            checkPay: '',
            // 指标编号
            indexId:'',
            tjCodeIndex:{
              // 指标编号
              indexId:'',
              // 指标
              indexName:'',
              // 指标意义
              indexSignificance:''
            }
          },
			        value: '',
			isShow:false,
			tjtc:false,
			tcxq:false,
			jcxm:false,
			input: '',
	        radio1: '查看全部',
			tableData:[{
				date: '123',
				name: '爱康君安【中枢神经系统体检套餐】',
				price:'233',
				lx:'入职体检'
			}],
			ruleForm: {
			          pass: '',
			          checkPass: '',
			          age: ''
			}
        }
	    },
		methods: {
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function(size) {
        this.psize = size;
        console.log(this.psize) //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
        console.log(this.currentPage) //点击第几页
      },
      // 检查项目基础参数
        getData(){
          this.axios.get("http://localhost:8089/allDescTjpro",{params:{seach:this.seach}}).then((res)=>{
            this.tjpro = res.data;
          }).catch()
          this.axios.get("http://localhost:8089/allIndex").then((res)=>{
            this.xmzb = res.data;
          }).catch()

        },
      // 检查项目基础参数
      getMeal(){
        this.axios.get("http://localhost:8089/allMeal",{params:{search:this.search}}).then((res)=>{
          this.tjmeal = res.data;
        }).catch()
        this.axios.get("http://localhost:8089/allIndex").then((res)=>{
          this.xmzb = res.data;
        }).catch()

      },
        jcxmEdit(is, row) {
          this.tilt = is = 1 ? '新增检查项目' : '修改检查项目';//设置弹框标题
          if(row != undefined){//判断是否有值
            this.jcdx.checkId= row.checkId;
            this.jcdx.checkName= row.checkName;
            this.jcdx.checkPay= row.checkPay;
            this.jcdx.indexId= row.indexId;
            this.jcdx.tjCodeIndex.indexId=row.tjCodeIndex.indexId
            this.jcdx.tjCodeIndex.indexName=row.tjCodeIndex.indexName
            this.jcdx.tjCodeIndex.indexSignificance=row.tjCodeIndex.indexSignificance

          }
          this.jcxm = true;
        },
        tjtcEdit(index, row) {
          this.tjtc = true;
        },
        tcxqEdit(index, row) {
          this.tcxq = true;
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
      //删除
      tprojDelete(row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.sctproj(row)
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
      //删除
      sctproj(row){
        this.axios.post('http://localhost:8089/delet-troj', qs.stringify({index:row.indexId}))
            .then((v)=>{
              if(v.data == 'ok'){
                this.getData()
              }else{
                alert(v.data);
              }
            }).catch(function(){

        })
      },
      //清除修改与删除检查项目弹框
      inspectClear(formName){
        this.jcdx = {
          tjCodeIndex:'',
        }
        this.$refs[formName].resetFields();
      },
      //修改与新增检查项目确认按钮
        jcxmForm(formName) {
          console.log(this.jcdx)
          this.axios.post("http://localhost:8089/addOrUpdataTroj",{troj:this.jcdx}).then((res)=>{
            this.getData();
            this.inspectClear(formName);
          }).catch()
          this.jcxm = false
        },
        tjtcForm(formName) {
          this.tjtc = false
          this.$refs[formName].resetFields();
        },
        tcxqForm(formName) {
          this.tcxq = false
          this.$refs[formName].resetFields();
        }
      },created() {
        this.getData()
        this.getMeal()
      }
	  }
</script>

<style scoped>
	.my-el-tc{
		padding-top: 5px;
		width: 200px;
	}
	.works{
			padding: 15px;
		}
</style>

