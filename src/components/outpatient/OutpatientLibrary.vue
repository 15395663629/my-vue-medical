<template>
  {{}}
	<el-row>
		<el-col :span="10">
			<el-input style="width: 240px" v-model="text" placeholder="请输入患者信息方便查询" ></el-input>  
			<el-button type="primary" icon="el-icon-search" @click="allRecordsSick">查询</el-button>
		</el-col>
	</el-row>
<el-table size="mini" @row-dblclick="drawer = true" :data="allRecordList.slice((wardCurrentPage-1)*wardPageSize,wardCurrentPage*wardPageSize)"
 border height="525" style="width: 100% ; margin-top: 10px">
    <el-table-column fixed label="序号"  align="center" width="80px">
      <template #default="scope">
          {{scope.row.medicalRecordObject.mrNumber}}
      </template>
    </el-table-column>

    <el-table-column fixed prop="mrCount" label="就诊号" align="center" >
      <template #default="scope">
        <el-tag  size="mini" type="warning"  disable-transitions>
          {{scope.row.medicalRecordObject.mrCount}}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column  fixed label="姓名" align="center">
      <template #default="scope" >
        <el-popover effect="light" width="200px"  trigger="hover" placement="top">
          <template #default >
            <p>姓名: {{ scope.row.recipeObject.recipeSickName }}</p>
            <p>身份证: {{ scope.row.medicalRecordObject.mrIdCard }}</p>
			      <p>就诊卡: {{ scope.row.medicalRecordObject.mrMcCard }}</p>
            <p>电话: {{ scope.row.medicalRecordObject.sickObject.sickPhone }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.recipeObject.recipeSickName }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>
	
	<el-table-column  fixed label="挂号信息" align="center" >
	  <template #default="scope" >
	    <el-popover effect="light" width="100px"  trigger="hover" placement="top">
	      <template #default >
	        <p>排号: {{ scope.row.medicalRecordObject.opcObject.bnCount }}</p>
	        <p>挂号科室: {{ scope.row.medicalRecordObject.mrKsName}}</p>
			    <p>挂号医生: {{ scope.row.medicalRecordObject.mrDoctorName }}</p>
	        <p>挂号类型: {{ scope.row.medicalRecordObject.opcObject.bnScience }}</p>
	      </template>
	      <template #reference>
	        <div class="name-wrapper">
	          <el-tag size="medium">{{scope.row.medicalRecordObject.mrKsName }}</el-tag>
	        </div>
	      </template>
	    </el-popover>
	  </template>
	</el-table-column>

	<el-table-column fixed label="就诊时间" align="center" >
		<template #default="scope">
		  <el-tag  size="mini" type="success"  disable-transitions>
		    {{scope.row.medicalRecordObject.mrSection}}
		  </el-tag>
		</template>
	</el-table-column>
	
	<el-table-column fixed label="结束时间" align="center" >
		<template #default="scope">
		  <el-tag  size="mini"  type="danger" disable-transitions>
		    {{scope.row.medicalRecordObject.mrOverTime}}
		  </el-tag>
		</template>
	</el-table-column>
	
	<el-table-column fixed prop="recipeObject.recipeDoctorName" label="诊断结果"  align="center">
			  <template #default="scope" >
			    <el-popover effect="light" width="200px"  trigger="hover" placement="top">
			      <template #default >
			        <p>主诉: {{ scope.row.historyObject.chComplaint }}</p>
					    <p>现病史: {{ scope.row.historyObject.chCause }}</p>
			        <p>处理和建议：{{ scope.row.historyObject.chDoctorText }}</p>
			      </template>
			      <template #reference>
			        <div class="name-wrapper">
			          <el-tag size="medium" class="fontType">{{scope.row.historyObject.chDoctorText}}</el-tag>
			        </div>
			      </template>
			    </el-popover>
			  </template>
	</el-table-column>
	<el-table-column fixed label="总消费" align="center" >
    <template #default="scope">
      <el-popover effect="light" trigger="hover" placement="top" width="400px">
        <template #default>
          <table>
            <tr>
              <td style="width: 100px">消费用途</td>
              <td style="width: 100px">消费金额</td>
              <td style="width: 100px">操作人员</td>
              <td style="width: 100px">支付方式</td>
            </tr>
            <tr  v-for="x in scope.row.paymentList">
              <td style="width: 100px">{{x.pmType}}</td>
              <td style="width: 100px">{{x.pmSum}}</td>
              <td style="width: 100px">{{x.pmSname}}</td>
              <td style="width: 100px">{{x.pmPayment}}</td>
            </tr>
          </table>
        </template>
        <template #reference>
          <el-tag  size="mini"  type="danger" disable-transitions>
            {{scope.row.medicalRecordObject.mrTotalMoney}}
          </el-tag>
        </template>
      </el-popover>
    </template>

	</el-table-column>
    <el-table-column fixed label="操作"  align="center">
      <template #default="scope">
        <el-button @click="openDrawer(scope.row)" size="mini" type="primary" plain>查看</el-button>
      </template>
    </el-table-column>
	
  </el-table>
  <div class="block">
  <!--分页插件-->
	  <el-pagination  @size-change="wardHandleSizeChange" @current-change="wardHandleCurrentChange"
					  style="text-align: center; margin-top: 10px"
					  :current-page="wardCurrentPage"
					  :page-sizes="[2,4,6,8]"
					  :page-size="wardPageSize"
					  layout="total, sizes, prev, pager, next, jumper"
					  :total="allRecordList.length">
	  </el-pagination>
  </div>
							<!-- ======================抽屉 -->
	<el-drawer :with-header="false" direction="ltr" v-model="drawer" size="50%" >
		<el-row  style="margin-top: 10px;">
			<el-col :span="12">
				<h5>西药处方</h5>
				<el-table  :summary-method="getSummaries1" show-summary  size="mini" :data="xpListTable" border height="350px" style="width: 100%">
					<el-table-column align="center" prop="rdNumber" label="序号" width="50px" ></el-table-column>
					<el-table-column align="center" prop="rdName" label="药名" width="120px" ></el-table-column>
					<el-table-column align="center" prop="rdCount" label="数量"  width="50px"></el-table-column>
					<el-table-column align="center" prop="rdPrice" label="单价" ></el-table-column>
					<el-table-column align="center" label="总价" >
						<template #default="scope">
						    {{scope.row.rdCount*scope.row.rdPrice}}
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="12">
				<h5>中药处方</h5>
				<el-table :summary-method="getSummaries2" show-summary size="mini"  :data="zpListTable" border height="350px" style="width: 100%">
					<el-table-column align="center" prop="zpNumber" label="序号"  width="50px"></el-table-column>
					<el-table-column align="center" prop="zpName" label="药名" width="120px" ></el-table-column>
					<el-table-column align="center" prop="zpCount" label="数量"  width="50px"></el-table-column>
					<el-table-column align="center" prop="zpPrice" label="单价" ></el-table-column>
					<el-table-column align="center" label="总价" >
						<template #default="scope">
						    {{scope.row.zpCount*scope.row.zpPrice}}
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-row style="margin-top: 10px;">
			<el-col :span="12">
				<h5>检验项目</h5>
        <el-table  :summary-method="getSummaries3" show-summary  size="mini" :data="testListTable" border height="300px" style="width: 100%">
          <el-table-column align="center" prop="manResultId" label="序号" width="50px" ></el-table-column>
          <el-table-column align="center" prop="pro.checkName" label="项目名称" width="120px" ></el-table-column>
          <el-table-column align="center" label="项目结果"  width="130px">
            <template #default="scope" >
              <el-popover effect="light" width="270px"  trigger="hover" placement="top">
                <template #default >
                  <p>{{scope.row.manResult}}</p>
                </template>
                <template #reference>
                  <div class="name-wrapper">
                    <el-tag size="mini"  class="fontType">{{scope.row.manResult}}</el-tag>
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="pro.checkPay" label="单价" width="83px" ></el-table-column>
        </el-table>
			</el-col>
			<el-col :span="12">
				<h5>手术项目</h5>
          <el-table  :summary-method="getSummaries4" show-summary size="mini" :data="surgeryListTable" border height="300px" style="width: 100%">
          <el-table-column align="center" prop="susId" label="序号" width="50px" ></el-table-column>
          <el-table-column align="center" prop="ssObject.projectName" label="项目名称" width="250px" ></el-table-column>
          <el-table-column align="center" prop="ssObject.projectPay" label="单价" width="83px" ></el-table-column>
        </el-table>
			</el-col>
		</el-row>
	</el-drawer>
</template>

<script>
	export default {
		data() {
			return {
				drawer: false,//1层抽屉
				innerDrawer: false,//2抽屉
				wardCurrentPage:1,//分页属性
				wardPageSize:4,
				//搜索text
				text:'',
				//集合
				allRecordList:[],
				//西药集合
				xpListTable:[],
				//中药集合
				zpListTable:[],
				//检验项目
				testListTable:[],
				//手术项目
				surgeryListTable:[],
			};
		},
		 methods: {
			 // 初始病房每页数据数wardpagesize和数据data-----------------------分页方法------------------------------
			 wardHandleSizeChange: function(size) {
			   this.wardPageSize = size;
			   console.log(this.pagesize) //每页下拉显示数据
			 },
			 //初始页病房wardcurrentPage
			 wardHandleCurrentChange: function(currentPage) {
			   this.wardCurrentPage = currentPage;
			   console.log(this.currentPage) //点击第几页allDescSick
			 },
 			//查询所有的当天就诊病人信息和处方记录详情
			allRecordsSick(){
				this.axios.post("allRecordsSick",{text:this.text}).then((v)=>{
					console.log(v.data)
					this.allRecordList =v.data;
					console.log(this.allRecordList)
				}).catch( );
			},
			//集合赋值
			openDrawer(row){
				this.drawer=true;
				console.log(row)
				//西药集合
        if(row.recipeObject.xpList[0].rdNumber != 0){
          this.xpListTable=row.recipeObject.xpList;
        }
				//中药集合
        if( row.recipeObject.zpList[0].zpNumber != 0){
          this.zpListTable=row.recipeObject.zpList;
        }
				//检验项目
        if(row.tjManResultList[0].manResultId !=0){
          this.testListTable=row.tjManResultList;
        }
        //手术项目
        if(row.centerSurgeryList[0].susId !=0){
          this.surgeryListTable=row.centerSurgeryList;
        }

			},
			//计算总价
			getSummaries1(param) {
			  const { columns} = param;//获取到的整个表格的总栏位数
			  const sums = [];//合计表个数组
			  var sum = 0;//总价钱
			  this.xpListTable.forEach((drug,i)=>{//循环判断总价钱
			    sum += drug.rdPrice*drug.rdCount;
			  })
			  columns.forEach((column, index) => {//获取合计的位置
			    if (index === 3) {
			      sums[index] = "合计:";
				  sums[index+1]= sum.toFixed(2);
			      return;
			    }
			  });
			  return sums;
			},
			getSummaries2(param) {
			  const { columns} = param;//获取到的整个表格的总栏位数
			  const sums = [];//合计表个数组
			  var sum = 0;//总价钱
			  this.zpListTable.forEach((drug,i)=>{//循环判断总价钱
			    sum += drug.zpPrice*drug.zpCount;
			  })
			  columns.forEach((column, index) => {//获取合计的位置
			    if (index === 3) {
			      sums[index] = "合计:";
				  sums[index+1]= sum.toFixed(2);
			      return;
			    }
			  });
			  return sums;
			},
       getSummaries3(param) {
         const { columns} = param;//获取到的整个表格的总栏位数
         const sums = [];//合计表个数组
         var sum = 0;//总价钱
         this.testListTable.forEach((drug,i)=>{//循环判断总价钱
           sum +=drug.pro.checkPay;
         })
         columns.forEach((column, index) => {//获取合计的位置
           if (index === 2) {
             sums[index] = "合计:";
             sums[index+1]= sum.toFixed(2);
             return;
           }
         });
         return sums;
       },
       getSummaries4(param) {
         const { columns} = param;//获取到的整个表格的总栏位数
         const sums = [];//合计表个数组
         var sum = 0;//总价钱
         this.surgeryListTable.forEach((drug,i)=>{//循环判断总价钱
           sum +=drug.ssObject.projectPay;
         })
         columns.forEach((column, index) => {//获取合计的位置
           if (index === 1) {
             sums[index] = "合计:";
             sums[index+1]= sum.toFixed(2);
             return;
           }
         });
         return sums;
       },
		},
		created(){
			this.allRecordsSick()
		},
		
	};
</script>

<style scoped>
	
.fontType{
  width: 80%;   /*一定要设置宽度，或者元素内含的百分比*/
  overflow:hidden; /*溢出的部分隐藏*/
  white-space: nowrap; /*文本不换行*/
  text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
}
</style>
