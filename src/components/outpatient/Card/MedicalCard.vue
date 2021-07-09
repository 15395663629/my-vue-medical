<template>
	<el-row> <!-- 选择挂号================== -->
		<el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-col>
				<el-form-item label-width="0px">
					<el-input   style="width: 300px;" placeholder="请输入你要查询的卡信息,或持有人信息"></el-input>
				</el-form-item>
			</el-col>
			<el-col>
				<el-form-item label-width="0px">
					<el-button type="primary" icon="el-icon-search">查询</el-button>
				</el-form-item>
			</el-col>

			
		</el-form>
	</el-row>
	<el-radio-group v-model="radio2" class=" my-radio-group"  size="mini">
	  <el-radio-button label="诊卡操作"></el-radio-button>
	  <el-radio-button label="挂失记录"></el-radio-button>
	</el-radio-group>
	<!-- 表格是得切换的 -->
	<el-table 
		:data="rightTableData1.slice((wardCurrentPage-1)*wardPageSize,wardCurrentPage*wardPageSize)"
		style="width: 100%"
		height="571"
		>
		<el-table-column
		  label="就诊卡号"
		  width="180">
		  <template #default="scope">
			<i class="el-icon-time"></i>
			<span style="margin-left: 10px">{{ scope.row.date }}</span>
		  </template>
		</el-table-column>
		<el-table-column label="姓名" width="180">
		  <template #default="scope">
			<el-popover effect="light" trigger="hover" placement="top">
			  <template #default>
				<p>姓名: {{ scope.row.name }}</p>
				<p>住址: {{ scope.row.address }}</p>
			  </template>
			  <template #reference>
				<div class="name-wrapper">
				  <el-tag size="medium">{{ scope.row.name }}</el-tag>
				</div>
			  </template>
			</el-popover>
		  </template>
		</el-table-column>
		
		<el-table-column
		  label="身份证"
		  width="180">
		</el-table-column>
		
		<el-table-column
		  label="电话"
		  width="180">
		</el-table-column>
		
		<el-table-column
		  label="余额"
		  width="180">
		</el-table-column>
		
		<el-table-column label="操作" min-width="200px" align="center" ><!-- 这里得做个判断，如果是挂失记录查询就不显示操作 -->
		  <template #default="scope">
			<el-button
			size="mini"
			type="primary"
			@click="isShow3=!isShow3">修改密码</el-button>
			<el-button
			size="mini"
			type="danger"
			@click="handleEdit(scope.$index, scope.row)"> 挂失</el-button>
		  </template>
		</el-table-column>
		<el-table-column prop="tag" label="标签"
		width="100" :filters="[{ text: '卡号挂失', value: '卡号挂失' }, { text: '密码修改', value: '密码修改' }]"
		:filter-method="filterTag"  filter-placement="bottom-end">
			<template #default="scope">
				<el-tag :type="scope.row.tag === '密码修改' ? 'primary' : 'success'" disable-transitions>
				{{scope.row.tag}}
				</el-tag>
			</template>
		</el-table-column>
	  </el-table>
  <!--分页插件-->
  <el-pagination  @size-change="wardHandleSizeChange" @current-change="wardHandleCurrentChange"
                 style="text-align: center; margin-top: 10px"
                 :current-page="wardCurrentPage"
                 :page-sizes="[2,4,6,8]"
                 :page-size="wardPageSize"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="rightTableData1.length">
  </el-pagination>
	  
	<el-dialog title="提示" v-model="isShow3" width="20%" center  ><!-- 密码修改 -->
		<el-row><!-- :rules="rules" -->
			<el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-col>
					<el-form-item label="原密码:" >
						<el-input></el-input>
					</el-form-item>
				</el-col>
				<el-col>
					<el-form-item label="新密码:" >
						<el-input></el-input>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>
		<el-row>
			<el-form  status-icon ref="ruleForm" label-width="153px" style="margin-top: 30px;" class="demo-ruleForm">
				<el-col>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
						<el-button @click="resetForm('ruleForm')">取消</el-button>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>
	</el-dialog>
	
	
</template>

<script>
	export default{
		data(){
			return{
				isShow3:false,
				radio2:"诊卡操作",
        wardCurrentPage:1,
        wardPageSize:4,
				rightTableData1: [{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄',
						  tag:"密码修改",
				},
				{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄',
						  tag:"卡号挂失",
				},
				{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄',
						  tag:"密码修改",
				},
				{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄',
						  tag:"卡号挂失",
				}],
        mzSickList:[],
        maSickArr:{

        },

			}
		},
		methods:{
			filterTag(value, row) {/* 复诊初诊标签方法 */
				return row.tag === value;
			},
      // 初始病房每页数据数wardpagesize和数据data
      wardHandleSizeChange: function(size) {
        this.wardPageSize = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      //初始页病房wardcurrentPage
      wardHandleCurrentChange: function(currentPage) {
        this.wardCurrentPage = currentPage;
        console.log(this.currentPage) //点击第几页allDescSick
      },
      //
      allDescSick(){
        this.axios({url:'allDescCard'}).then((v)=>{
          if(v.data!=null){
              this.mzSickList=v.data.list;
          }
        }).catch();
      },

		},
    created() {
      this.allDescSick();
    }
  }
</script>

<style>
</style>