<template><!-- 药品缴费 -->
  430224199805045517
  {{leftTableList}}
  <el-row>
    <el-col :span="10"  style="margin-top: 20px">
      <el-row >
        <el-col :span="24">
          <el-input size="small" style="width: 200px;" v-model="leftText"  placeholder="请输入你要查询的内容" ></el-input>
          <el-button size="small" @click="selectRecord" type="primary" icon="el-icon-search">查询</el-button>
        </el-col>
        <el-form   status-icon :model="leftRecordObject"   ref="leftRecordObject" label-width="100px" class="demo-ruleForm te">
          <el-col :span="12" >
            <el-form-item  label="问诊号："  style="margin:10px 0px 0px 0px">
              <el-input size="mini" v-model="leftRecordObject.mrCount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="姓名："  style="margin: 10px 0px 0px 0px ">
              <el-input size="mini"   v-model="leftRecordObject.recipeSickName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证：" style="margin-bottom: 0px">
              <el-input size="mini"  v-model="leftRecordObject.mrIdCard" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="就诊卡号："  style="margin-bottom: 0px">
              <el-input size="mini"  v-model="leftRecordObject.mrMcCard" disabled></el-input>
            </el-form-item>
          </el-col >
          <el-col :span="12">
            <el-form-item label="电话：" style="margin-bottom: 0px">
              <el-input size="mini"  v-model="leftRecordObject.sickPhone"  disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item  label="就诊科室：" style="margin-bottom: 0px" >
              <el-input size="mini"  v-model="leftRecordObject.mrKsName"  disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="诊断医生：" style="margin-bottom: 0px" >
              <el-input size="mini"   v-model="leftRecordObject.mrDoctorName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="项目总金额：" style="margin-bottom: 0px">
              <el-input size="mini"  v-model="leftRecordObject.mrTotalMoney"  disabled></el-input>
            </el-form-item>
          </el-col >
        </el-form>

        <el-table show-summary size="mini" height="370" row-key="date" style="margin-top: 25px" :data="leftTableList">
          <el-table-column fixed prop="xmName"  align="center" label="项目类型"  filter-placement="bottom-end">
            <template #default="scope">
              <el-tag size="small"  :type="colorType(scope.row.xmName)" disable-transitions>
                {{scope.row.xmName}}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column fixed  label="项目总金额" >
            <template #default="scope">
                {{scope.row.xmSum}}
            </template>
          </el-table-column>
          <el-table-column fixed  label="项目留言"  align="center" >
            <template #default="scope">
              {{scope.row.xmText}}
            </template>
          </el-table-column>

          <el-table-column fixed label="项目总览">
            <template #default="scope">
              <el-popover effect="light" trigger="hover" placement="top" width="220px">
                <template #default>
                  <table>
                    <tr>
                      <td style="width: 100px">名称</td>
                      <td style="width: 70px">价格</td>
                      <td style="width: 50px">数量</td>
                    </tr>
                    <tr  v-for="x in scope.row.xmContent">
                      <td style="width: 100px">{{x.coName}}</td>
                      <td style="width: 70px">{{x.coPrice}}</td>
                      <td style="width: 50px">{{x.coCount}}</td>
                    </tr>
                  </table>
                </template>
                <template #reference>
                  <div  class="name-wrapper">
                    <el-tag  size="small">{{scope.row.xmName=="西药处方" || scope.row.xmName=="中药处方"  ? "药品": (scope.row.xmName=="病理检验" ? "检验":"手术")}}</el-tag>
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column fixed  label="操作" align="center" >
            <template #default="scope">
              <el-button type="success" size="mini" plain @click="forPrinting(scope.row.xmNumber)">收费打印</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-row>

    </el-col>
<!--    缴费查询   -->
    <el-col :span="14" style="margin-top: 20px">
      <el-row>
        <el-col :span="24" style="margin-left: 10px">
          <el-input size="small" style="width: 200px;" placeholder="请输入你要查询的内容" ></el-input>
          <el-button size="small" type="primary" icon="el-icon-search">查询</el-button>
        </el-col>
        <el-table size="mini"  height="560px" row-key="date"  :data="tableData" style="width: 100% ;margin-top: 5px;margin-left: 10px">

          <el-table-column fixed label="序号"> </el-table-column>
          <el-table-column fixed label="就诊卡号"> </el-table-column>
          <el-table-column fixed label="姓名"> </el-table-column>
          <el-table-column fixed label="项目总览">
            <template #default="scope">
              <el-popover effect="light" trigger="hover" placement="top">
                <template #default>
                  <p>嘱托详情: {{ scope.row.address }}</p>
                </template>
                <template #reference>
                  <div  class="name-wrapper">
                    <el-tag  size="small">{{ scope.row.address }}</el-tag>
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column fixed label="项目总金额"> </el-table-column>
          <el-table-column fixed  label="操作">
            <template #default="scope">
              <el-tooltip content="打印小票" >
                <el-button
                    size="mini"
                    type="success"
                    icon="el-icon-printer"
                    circle
                    @click="handleEdit(scope.$index, scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>

        </el-table>
      </el-row>

    </el-col>

  </el-row>


</template>

<script>
	export default {
		data() {
			return {

				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					tag: '项目缴费',
					drugType:'中药'
				},
				],
        //输入text
        leftText:'',

        rightText:'',
        //显示的病人对象
        leftRecordObject:{
          mrCount:'',
          recipeSickName:'',
          mrIdCard:'',
          mrMcCard:'',
          sickPhone:'',
          mrKsName:'',
          mrDoctorName:'',
          mrTotalMoney:'',
        },
        leftRecordList:'',
        //项目集合
        leftTableList:[],
        //西药处方
        xpObject:{
          xmNumber:0,
          xmName:'',
          xmSum:'',
          xmText:'',
          xmContent:[],
        },
        //中药处方
        zpObject:{
				  xmNumber:0,
          xmName:'',
          xmSum:'',
          xmText:'',
          xmContent:[],
        },
        //药品赋值对象
        contentObject:{},
        //西药暂用数组
        contentArr1:[],
        //中药暂用数组
        contentArr2:[],
			}
		},
		 methods: {
		  /*搜索输入*/
       selectRecord(){
         if(this.leftText!=null){
           // 每次添加之前先清空一边集合
           this.leftTableList=[];
           this.axios.post("selectAllRecords",{texts:this.leftText}).then((v)=>{
             //赋值到个人信息去
             this.leftRecordObject.mrCount = v.data.mrCount;
             this.leftRecordObject.recipeSickName = v.data.recipeObject.recipeSickName;
             this.leftRecordObject.mrIdCard = v.data.mrIdCard;
             this.leftRecordObject.mrMcCard = v.data.mrMcCard;
             this.leftRecordObject.sickPhone  = v.data.sickObject.sickPhone;
             this.leftRecordObject.mrKsName   = v.data.mrKsName;
             this.leftRecordObject.mrDoctorName = v.data.mrDoctorName;
             this.leftRecordObject.mrTotalMoney  = v.data.mrTotalMoney;
             this.leftRecordList = v.data;
             //赋值集合 -- 表格显示
             this.leftRecordListFunction(this.leftRecordList)
           }).catch();
         }
       },
       //项目总览，--赋值
       leftRecordListFunction(row){
          if(row.recipeObject.xpList[0].rdName !=null && ''!= row.recipeObject.xpList[0].rdName){
            var sum1 = 0;//西药总价钱
            row.recipeObject.xpList.forEach((drug,i)=>{//循环判断总价钱
              sum1 += (drug.rdPrice*drug.rdCount);
            })
            this.xpObject.xmNumber = row.recipeObject.recipeNumber;
            this.xpObject.xmName="西药处方";
            this.xpObject.xmSum = sum1;
            this.xpObject.xmText = row.recipeObject.xpNotes;

            row.recipeObject.xpList.forEach((b,i)=>{
              //先添加一遍在清空数组
              this.contentObject.coName = b.rdName;
              this.contentObject.coPrice = b.rdPrice;
              this.contentObject.coCount =b.rdCount;
              this.contentArr1.push(this.contentObject)
              //清空数组
              this.contentObject={};
            })
            this.xpObject.xmContent=this.contentArr1
            this.leftTableList.push(this.xpObject)
          }
         if(row.recipeObject.zpList[0].zpName !=null && '' != row.recipeObject.zpList[0].zpName){
           var sum2 = 0;//中药总价钱
           row.recipeObject.zpList.forEach((drug,i)=>{//循环判断总价钱
             sum2 += (drug.zpPrice*drug.zpCount);
           })
           this.xpObject.xmNumber = row.recipeObject.recipeNumber;
           this.zpObject.xmName="中药处方";
           this.zpObject.xmSum = sum2;
           this.zpObject.xmText = row.recipeObject.zpNotes;

           row.recipeObject.zpList.forEach((b,i)=>{
             //先添加一遍在清空数组
             this.contentObject.coName = b.zpName;
             this.contentObject.coPrice = b.zpPrice;
             this.contentObject.coCount =b.zpCount;
             this.contentArr2.push(this.contentObject)
             //清空数组
             this.contentObject={};
           })
           this.zpObject.xmContent=this.contentArr2
           this.leftTableList.push(this.zpObject)
         }
         console.log(this.leftTableList)
       },
       forPrinting(index){
         this.axios.post("forPrinting",{index:index}).then((v)=>{
           console.log(v.data)
         }).catch();
       },
       //标签方法
       colorType(value) {
         if(value=="西药处方" || value == "中药处方"){
            return 'success';
         }else{
           return 'primary';
         }
       },


		},
		
	};
</script>

<style scoped>
.te /deep/ .el-input__inner {
  color: red;
  font-size: 13px;
  cursor: pointer;
}
</style>
