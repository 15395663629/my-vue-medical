<template>
	<el-row class="row-one">		
		<el-form label-width="100px" >
			<el-col :span="9">
				<el-form-item label="类型：" label-width="60px">
					<el-select  @change="getMeal" style="width: 120px" v-model="CodeType" placeholder="请选择">
						<el-option
						  v-for="item in xmzb"
						  :key="item.value"
						  :label="item.checkIndex"
						  :value="item.typeId">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item  label="套餐信息:" label-width="100px">
					<el-input  @input="getMeal" style="width: 180px" v-model="search" placeholder="请输入你要查询的套餐" ></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="5">
				<el-form-item label="" label-width="44px">
					<el-button @click="getMeal" type="primary" icon="el-icon-search">查询</el-button>
					</el-form-item>
			</el-col>
			<el-col :span="5" >
				<el-form-item label="" label-width="449px">
				<el-button type="primary"  @click="tjtcEdit(1,'','inserdate')">新增套餐</el-button>
				</el-form-item>
			</el-col>
		</el-form>
			
	</el-row>
	
	<el-dialog :title="tctitl" v-model="tjtc" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-新增套餐======================================= -->
		<el-form   ref="tjtcForm" v-model="tcdx" label-width="100px" class="demo-ruleForm">
			<el-row>
            <el-col :span="8">
									<el-form-item label="套餐名称:" prop="name">
									<el-input v-model="tcdx.codeName"></el-input>
									</el-form-item>
						</el-col>
            <el-col :span="6" :offset="4">
              <el-form-item label="套餐价格:" prop="name">
                <el-input v-model="tcdx.codePay"></el-input>
              </el-form-item>
            </el-col>
			</el-row>
			<el-row>
					<el-col :span="8">
							<el-form-item label="体检类型:" prop="name">
							 <el-select v-model="tcdx.codeType" placeholder='请选择'>
							    <el-option
                      v-for="item in xmzb"
                      :key="item.value"
                      :label="item.checkIndex"
                      :value="item.typeId">
							    </el-option>
							  </el-select>
							</el-form-item>
						</el-col>

			</el-row>
			<el-row>
				<el-col>
					选择所含项目
				</el-col>
			</el-row>
			<el-row > <!-- ============================================新增修改套餐所含项目表格============================================ -->
				<el-table height="300"
                  ref="inserdata"
                  :data="tjpro"
                  :row-key="(tjpro) => tjpro.checkId"
                  style="width: 100%;"
                  @selection-change="handleSelectionChange">
					<el-table-column
              :reserve-selection="true"
					      type="selection"
                v-model="tcdx.TjAn"
					      width="55">
          </el-table-column>
          <el-table-column label="编号" width="180"  prop="checkId">
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
                  <p>指标意义: {{ scope.row.indexSignificance }}</p>
                </template>
                <template #reference>
                  <div class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.indexName }}</el-tag>
                  </div>
                </template>
              </el-popover>
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

			</el-row>
			  <el-form-item>
				  <el-col :span="1" :offset="8">
				<el-button @click="tjtcForm('inserdate')">确定</el-button>
				</el-col>
			  </el-form-item>
		</el-form>
	</el-dialog>
	
	
	<el-dialog title="套餐详情" v-model="tcxq" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-套餐详情======================================= -->
		<el-form  :modal="tcdx" label-width="100px" class="demo-ruleForm">
			<el-row>
								<el-col :span="6">
									<el-form-item label="编号:" prop="name">
                    {{ tcdx.codeId }}
									</el-form-item>
								</el-col>
								<el-col :span="12" :offset="4">
									<el-form-item label="套餐名称:" prop="name">
                    {{ tcdx.codeName }}
									</el-form-item>
								</el-col>
			</el-row>
			<el-row>
					<el-col :span="6">
							<el-form-item label="体检类型:" prop="name">
                {{ tcdx.checkIndex }}
							</el-form-item>
						</el-col>
								<el-col :span="6" :offset="4">
						<el-form-item label="套餐价格:" prop="name">
              {{ tcdx.codePay }}
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>
				<el-col>
					所含项目
				</el-col>
			</el-row>
			<el-row > <!-- ============================================所含项目表格============================================ -->
				<el-table :data="tjprox" style="width: 100%;height: 300px;">
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
          <el-table-column label="指标" prop="tag">
            <template #default="scope">
              <el-popover effect="light" trigger="hover"  placement="top">
                <template #default>
                  <p>指标意义: {{ scope.row.indexSignificance }}</p>
                </template>
                <template #reference>
                  <div class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.indexName }}</el-tag>
                  </div>
                </template>
              </el-popover>
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
	
	<el-dialog :title="tilt" v-model="jcxm" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-新增医疗项目======================================= -->
		<el-form  status-icon v-model="jcdx" :ref="jcdww"  label-width="100px" class="demo-ruleForm">
			<el-row>
								<el-col :span="7" >
									<el-form-item label="项目名称:" prop="name">
									<el-input v-model="jcdx.checkName"></el-input>
									</el-form-item>
								</el-col>
              <el-col :span="7">
                <el-form-item label="价格:" prop="name">
                  <el-input v-model="jcdx.checkPay"></el-input>
                </el-form-item>
              </el-col>
            <el-col :span="7" >
              <el-form-item label="科室:" prop="name">
                <el-select   v-model="jcdx.ksId" placeholder="请选择">
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
          <el-col :span="9">
          <el-form-item label="指标:" prop="name">
            <el-input  size="mini" v-model="jcdx.indexName" type="textarea" :rows="3"></el-input>
          </el-form-item>
          </el-col>
					<el-col :span="9" :offset="2">
						<el-form-item label="指标意义:" prop="name">
						<el-input size="mini" v-model="jcdx.indexSignificance"
                      type="textarea"
                      :rows="3"
                      placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>

			</el-row>
			<el-form-item>
							  <el-col :span="1" :offset="8">
							<el-button type="primary" @click="jcxmForm()">确定</el-button>
							</el-col>
			</el-form-item>
		</el-form>
	</el-dialog>
	
	

	<el-row > <!-- ==================================================================上表格 ==================================================================-->
		<el-table size="mini" height="200" :data="tjmeal.slice((currentPage1-1)*psize1,currentPage1*psize1)" style="width: 100%;" v-if="isShow!==null">
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
              type="primary" plain
				    size="mini"
				    @click="tcxqEdit(scope.row)">套餐详情
				    </el-button>
		        <el-button
		          size="mini"
				  type="primary"
		          @click="tjtcEdit(2,scope.row,'inserdata')">修改
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
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="1"
        :page-sizes="[2,4,6,8,10]"
        :page-size="psize1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tjmeal.length">
    </el-pagination>
	</el-row>
	

		<el-row>
			<el-col  style="padding-bottom: 5px" :span="3" :offset="19">
					<el-button type="primary" @click=jcxmEdit(1)>新增项目</el-button>
			</el-col>
		</el-row>

	<!-- ============================================下表格============================================ -->
	<el-row > 
		<el-table  size="mini" height="220" :data="tjpro.slice((currentPage-1)*psize,currentPage*psize)"
            ref="jcxmtable"   style="width: 100%;">
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
      <el-table-column label="科室" prop="deptks.ksName">
      </el-table-column>
			<el-table-column label="指标" prop="indexName">
        <template #default="scope">
          <el-popover effect="light" trigger="hover"  placement="top">
            <template #default>
              <p>指标意义: {{ scope.row.indexSignificance }}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.indexName }}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
			</el-table-column>
			<el-table-column width="180" label="操作">
			  <template #default="scope">
			    <el-button
			      size="mini"
			      @click="jcxmEdit('2',scope.row,jcxmtable)">修改
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
                  @input="getData"
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
          department:[],//科室集合
          search: '',//套餐搜索框
          tctitl:'',//套餐弹框标题
	        tjprol:[],//体检套餐所含项目集合
          tjprox:[],//体检套餐详情集合
          tjmeal:[],//体检套餐集合
	        tilt:'',//检查项目弹框标题
          seach: '',//搜索
          currentPage: 1, //初始页
          psize:2, //每页的数据
          currentPage1: 1, //初始页
          psize1:2, //套餐每页的数据
          tjpro:[],//检查项目集合
          tjow:[],
          xmzb:[],//套餐类型集合
          jcdx:{//检查项目对象
            //检查主键
            checkId:'',
            // 名称
            checkName:'',
            // 价格
            checkPay: '',
            // 指标
            indexName:'',
            // 指标意义
            indexSignificance:'',
            ksId:''
            },
          jcdww:{//检查项目对象
            //检查主键
            checkId:'',
            // 名称
            checkName:'',
            // 价格
            checkPay: '',
              // 指标
            indexName:'',
              // 指标意义
            indexSignificance:'',
            ksId:''
          },
          //体检套餐对象
          tcdx:{
            codeId:'',
            codeName:'',
            codePay:'',
            codeType:0,
            //检查项目集合
            TjAn:''
          },
          //套餐类型model
      CodeType:"",
			isShow:false,
			tjtc:false,
			tcxq:false,
			jcxm:false,
			input: '',
        }
	    },
		methods: {
	      cleaxm(){
          this.$refs.inserdata.clearSelection();
          for (let i = 0; i < this.tjow.length; i++) {
            for (let j = 0; j < this.tjpro.length; j++) {
              if (this.tjow[i].checkId == this.tjpro[j].checkId) {
                this.$refs.inserdata.toggleRowSelection(this.tjpro[j],true)
              }
            }
          }
        },
	      //套餐项目多选赋值
      handleSelectionChange(val) {
        console.log(val)
       var aa=[];
        val.forEach(v=>{
          aa.push(v.checkId)
        })
        this.tcdx.TjAn = aa;
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function(size) {
        this.psize = size;
        console.log(this.psize) //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
        console.log(this.currentPage) //点击第几页
      },

      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange1: function(size) {
        this.psize1 = size;
        console.log(this.psize1) //每页下拉显示数据
      },
      handleCurrentChange1: function(currentPage) {
        this.currentPage1 = currentPage;
        console.log(this.currentPage1) //点击第几页
      },

      // 检查项目基础参数
        getData(){
	        //科室
          this.axios.get("http://localhost:8089/ks-list").then((res)=>{
            this.department = res.data;
          }).catch()
          this.axios.get("http://localhost:8089/allDescTjpro",{params:{seach:this.seach}}).then((res)=>{
            this.tjpro = res.data;
          }).catch()
        },
      // 体检套餐基础参数================
      getMeal(){
        this.axios.get("http://localhost:8089/allMeal",{params:{checkIndex:this.search,codeName:this.search,codeType:this.CodeType}}).then((res)=>{
          this.tjmeal = res.data;
        }).catch()
//体检类型
        this.axios.get("http://localhost:8089/allTJtype").then((res)=>{
          this.xmzb = res.data;
          console.log(this.xmzb)
        }).catch()

      },
      //新增修改项目弹框
        jcxmEdit(is, row,formName) {
          this.tilt = is == 1 ? '新增检查项目' : '修改检查项目';//设置弹框标题
          var rr=[];
          if(row != undefined){//判断是否有值
            this.jcdx.checkId= row.checkId;
            this.jcdx.checkName= row.checkName;
            this.jcdx.checkPay= row.checkPay;
            this.jcdx.indexId=row.indexId;
            this.jcdx.indexName=row.indexName
            this.jcdx.indexSignificance=row.indexSignificance
            this.jcdx.ksId=parseInt(row.deptks.ksId)
          }else {
            this.inspectClear()
          }
          this.jcxm = true;
        },
      // 新增修改套餐弹框====
        tjtcEdit(is,row,fromName) {
          this.tctitl = is == 1 ? '新增套餐' : '修改套餐';//设置弹框标题
          if(row != undefined) {//判断是否有值
            this.tcdx.codeId=row.codeId;
            this.tcdx.codeName=row.codeName;
            this.tcdx.codePay=row.codePay;
            this.tcdx.codeType=parseInt(row.codeType);
            this.tcdx.TjAn = row.TjAn;
            var ww=[];


            this.axios.get("http://localhost:8089/aloneProt",{params:{codeId:row.codeId}}).then((res)=>{
              this.tjow = res.data;
              res.data.forEach(q=>{
                ww.push(q.checkId)
              })
              // 调用默认勾选原有的项目
              this.cleaxm()
              //强制渲染
              this.$forceUpdate();
              this.tcdx.TjAn=ww;
            }).catch()
          }else{
            this.inspectClear1(fromName);

          }

          this.tjtc = true;
        },
      //修改与新增套餐确认按钮===========
      tjtcForm(formName) {
        console.log(this.tcdx.TjAn)
        if (this.tcdx.TjAn.length == 0) {
          this.$message.warning("没有勾选检查，无法创建")
          return;
        }else {
          this.axios.post("http://localhost:8089/addOrUpdataMroj",{mroj:this.tcdx}).then((res)=>{
            this.getMeal();
            this.inspectClear1(formName);

          }).catch()
          this.tjtc = false
        }
      },
      //套餐详情弹框===========
        tcxqEdit(row) {
        this.tcdx.codeId=row.codeId;
        this.tcdx.codeName=row.codeName;
        this.tcdx.codePay=row.codePay;
        this.tcdx.checkIndex=row.checkIndex
          this.axios.get("http://localhost:8089/aloneProt",{params:{codeId:row.codeId}}).then((res)=>{
            this.tjprox = res.data;
          }).catch()
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
      //删除检查项目
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
      //删除检查项目
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
      inspectClear(){
        this.jcdx=this.jcdww
      },
      //清除修改与套餐弹框
      inspectClear1(formName){
        this.$refs[formName].resetFields();
      },
      //修改与新增检查项目确认按钮
        jcxmForm() {
          console.log(this.jcdx)
          this.axios.post("http://localhost:8089/addOrUpdataTroj",{troj:this.jcdx}).then((res)=>{
            this.getData();
            this.inspectClear();
          }).catch()

          this.jcxm = false
        },

      // 关闭体检详情
        tcxqForm() {
          this.tcxq = false
        }
      },created() {
        this.getData()
        this.getMeal()
      },
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

