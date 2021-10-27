<template><!-- 药品缴费 -->
  {{}}
  <el-row>
    <el-col :span="10"  style="margin-top: 10px">
      <el-row >
        <el-col :span="24">
          <el-input size="small" style="width: 200px;" v-model="leftText" clearable placeholder="请输入就诊号查询" ></el-input>
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
          <el-col :span="24" style="margin-top: 20px" :offset="8">
            <el-radio-group v-model="radioSf">
              <el-radio :label="1">其他&支付</el-radio>
              <el-radio :label="2">诊疗卡支付</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="11" :offset="1" style="margin-top: 15px">
            <el-button style="margin-left: 6px" type="primary" @click="shouFei" size="mini" plain>收取全部费用</el-button>
          </el-col>
        </el-form>
      <el-table  size="mini" height="350" row-key="date" style="margin-top: 10px" :data="leftTableList">
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
          <el-table-column fixed label="项目总览">
            <template #default="scope">
              <el-popover effect="light" trigger="hover" placement="top" width="320px">
                <template #default>
                  <table>
                    <tr>
                      <td style="width: 200px">名称</td>
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
                    <el-tag  size="small">{{ (scope.row.xmName=="西药处方" || scope.row.xmName=="中药处方")  ? "药品":(scope.row.xmName=="手术项目" ? "手术":"体检") }}</el-tag>
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column fixed  label="项目留言" >
            <template #default="scope">
              <div class="fontType">
                {{scope.row.xmText}}
              </div>
            </template>
          </el-table-column>

<!--          <el-table-column fixed  label="操作" align="center" >-->
<!--            <template #default="scope">-->
<!--              <el-button type="success" size="mini" plain   @click="forPrinting(scope.$index,scope.row.xmNumber,scope.row.xmName,scope.row)" >收费打印</el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->

        </el-table>
      </el-row>

    </el-col>
<!--    缴费查询   -->
    <el-col :span="14" style="margin-top: 10px">
      <el-row>
        <el-col :span="24" style="margin-left: 10px">
          <el-input size="small" style="width: 200px;" v-model="rightText" clearable placeholder="请输入你要查询的内容" ></el-input>
          <el-button size="small" type="primary" @click="selectRecordsAll" icon="el-icon-search" >查询</el-button>
        </el-col>
        <el-table size="mini"  height="530px" row-key="date"  style="width: 100% ;margin-top: 5px;margin-left: 10px"
                  :data="rightList.slice((wardCurrentPage-1)*wardPageSize,wardCurrentPage*wardPageSize)" >

        <el-table-column fixed label="序号" prop="medicalRecordObject.mrNumber" width="80px" align="center"> </el-table-column>
        <el-table-column fixed label="就诊卡号" prop="medicalRecordObject.mrMcCard"> </el-table-column>
        <el-table-column fixed label="姓名" prop="medicalRecordObject.sickObject.sickName"></el-table-column>

        <el-table-column fixed label="项目总览" width="230px" >
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top">
              <template #default>
                <p>药品处方总价: {{ scope.row.recipeObject.recipePrice}}</p>
                <p>体检项目总价: {{ scope.row.tjCodeManObject.manPhy}}</p>
                <p>手术项目总价: {{ scope.row.surgeryStampObject.susSum}}</p>
              </template>
              <template #reference>
                  <el-tag type="success" size="small" class="fontType2">{{ scope.row.historyObject.chComplaint }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
          <el-table-column fixed label="项目总金额" prop="medicalRecordObject.mrTotalMoney" width="120px" align="center"></el-table-column>
          <el-table-column fixed  label="操作" width="80px" align="center">
            <template #default="scope">
              <el-tooltip content="打印小票" >
                <el-button  size="mini" type="success" icon="el-icon-printer" circle
                    @click="onStart(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          </el-table>
        <!--分页插件-->
        <el-pagination  @size-change="wardHandleSizeChange" @current-change="wardHandleCurrentChange"
                        style="text-align: center; margin:5px 0px 0px 180px;"
                        :current-page="wardCurrentPage"
                        :page-sizes="[2,4,6,8]"
                        :page-size="wardPageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="rightList.length">
        </el-pagination>
      </el-row>
    </el-col>
  </el-row>
<!--暂时没用到-->
<!--  <el-dialog title="其他&缴费"  top="130px" v-model="isShowQtjf" width="28%" :before-close="resetForm">-->
<!--    <el-form  :model="priceVO" :rules="rules" rsu ref="regArr" label-width="100px" size="small" class="demo-ruleForm">-->
<!--      <el-form-item label="实收金额：" label-width="100px" prop="shPrice">-->
<!--        <el-input type="text" size="small" v-model="priceVO.shPrice" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="找零：" label-width="100px" >-->
<!--        {{handleClose()}}-->
<!--      </el-form-item>-->
<!--      <span class="dialog-footer" style="margin-left:240px">-->
<!--        <el-button @click="resetForm" size="small" >取 消</el-button>-->
<!--        <el-button type="primary" @click="shPriceUp('regArr')" size="small">确 定</el-button>-->
<!--      </span>-->
<!--    </el-form>-->
<!--  </el-dialog>-->

</template>

<script>
import {getLodop} from "../../js/LodopFuncs";
import { h } from 'vue'
	export default {
		data() {
			return {
			  /*暂时没用到*/
        // priceVO:{
        //   shPrice:null,
        //   zlPrice:this.handleClose,
        // },
        // rules: {//金额校验
        //   shPrice:[
        //     {required: true, message: "实收金额不能为空", trigger: 'blur'}
        //   ]
        // },
        // isShowQtjf:false,
        //判断打印显示开关
        isShowJFMX:false,
        //判断缴费卡缴还是其他缴
        radioSf:2,
				//输入text
				leftText:'',
				rightText:'',
        //未缴费人员集合
        leftList:[],
				//已缴费人员的集合
				rightList:[],
				//显示的病人对象
				leftRecordObject:{
				  mrCount:'',
				  recipeSickName:'',
				  mrIdCard:'',
				  mrMcCard:'',
				  sickPhone:'',
				  mrKsName:'',
				  mrDoctorName:'',
				  mrTotalMoney:null,
				},
				//下表格项目集合
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
          /*缴费记录需求属性*/
          mcCard:'',
          recipeSum:0,
          recipeNumber:'',
          sId:'',
          sickNumber:'',
        },
        ssObject:{
          xmNumber:0,
          xmName:'',
          xmSum:'',
          xmText:'',
          xmContent:[],
          /*缴费记录需求属性*/
          mcCard:'',
          recipeSum:0,
          recipeNumber:'',
          sId:'',
          sickNumber:'',
        },
        tjObject:{
          xmNumber:0,
          xmName:'',
          xmSum:'',
          xmText:'',
          xmContent:[],
          /*缴费记录需求属性*/
          mcCard:'',
          recipeSum:0,
          recipeNumber:'',
          sId:'',
          sickNumber:'',
        },
				//西药赋值对象
				contentObject1:{},
        //中药赋值对象
        contentObject2:{},
        //手术赋值对象
        contentObject3:{},
        //体检赋值对象
        contentObject4:{},
				//西药暂用数组
				contentArr1:[],
				//中药暂用数组
				contentArr2:[],
        //手术暂用数组
        contentArr3:[],
        //体检暂用数组
        contentArr4:[],
        token:[],//操作人员
        //获取缴费人员的
        mcCardNumber:{},
        sums:0,//获取到的总金额
        wardCurrentPage:1,//分页属性
        wardPageSize:4,
        sumsa:0,//提交时的总金额


			}
		},
		 methods: {
		  //打印
       //==============================打印
       onStart: function(row) {
         const LODOP = getLodop()
         LODOP.PRINT_INIT('');
         var strStyle =
             "<style> table,td,th {border-bottom: 1px solid black;border-collapse: collapse;margin:5px 0px;text-align: center;}<style>"
         this.AddPrintContent(this.formatDate(new Date(),"yyyy年MM月dd日 hh:ss:mm"),row)
         LODOP.PREVIEW()
       },
      //格式化日期  thistime时间  fmt格式
       formatDate (thistime, fmt) {
         let $this = new Date(thistime)
         let o = {
           'M+': $this.getMonth() + 1,
           'd+': $this.getDate(),
           'h+': $this.getHours(),
           'm+': $this.getMinutes(),
           's+': $this.getSeconds(),
           'q+': Math.floor(($this.getMonth() + 3) / 3),
           'S': $this.getMilliseconds()
         }
         if (/(y+)/.test(fmt)) {
           fmt = fmt.replace(RegExp.$1, ($this.getFullYear() + '').substr(4 - RegExp.$1.length))
         }
         for (var k in o) {
           if (new RegExp('(' + k + ')').test(fmt)) {
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
           }
         }
         return fmt;
       },
       AddPrintContent: function(sj,row) {
         let LODOP = getLodop();
         LODOP.ADD_PRINT_TEXT(15, 300, 300, 25, "柿子医院项目费用明细");
         LODOP.SET_PRINT_STYLEA(1, "FontName", "隶书");
         LODOP.SET_PRINT_STYLEA(1, "FontSize", 15);
         LODOP.SET_PRINT_STYLEA(1, "FontColor", 0);
         LODOP.ADD_PRINT_TEXT(55, 50, 831, 20, "   患者姓名:" +
             row.medicalRecordObject.sickObject.sickName + "                          " +
             "                          就诊时间:" + row.medicalRecordObject.mrSection);
         LODOP.SET_PRINT_STYLEA(2, "FontName", "隶书");
         LODOP.SET_PRINT_STYLEA(2, "FontSize", 10);
         LODOP.ADD_PRINT_TEXT(75, 50, 831, 20, "   就诊号:" + row.medicalRecordObject.mrCount + "                      " +
             "                     结束时间:" + row.medicalRecordObject.mrOverTime);
         LODOP.SET_PRINT_STYLEA(3, "FontName", "隶书");
         LODOP.SET_PRINT_STYLEA(3, "FontSize", 10);
         LODOP.ADD_PRINT_TEXT(95, 50, 831, 20, "   打印日期:" +sj+"                                   "+"操作人:"+row.paymentList[0].pmSname);
         LODOP.SET_PRINT_STYLEA(4, "FontName", "隶书");
         LODOP.SET_PRINT_STYLEA(4, "FontSize", 10);
         LODOP.ADD_PRINT_TEXT(110, 50, 1000, 25, "———————————————————————————————————————————————————————");
         LODOP.SET_PRINT_STYLEA(5, "FontName", "隶书");
         LODOP.SET_PRINT_STYLEA(5, "FontSize", 10);

         LODOP.ADD_PRINT_TEXT(130, 50, 300, 25,  "项目收费明细：");
         LODOP.SET_PRINT_STYLEA(6, "FontName", "隶书");
         LODOP.SET_PRINT_STYLEA(6, "FontSize", 15);
         LODOP.SET_PRINT_STYLEA(6, "FontColor", 0);
         //********************西药处方
         LODOP.ADD_PRINT_TEXT(300, 50, 300, 25,  "西药处方：");
         LODOP.SET_PRINT_STYLEA(7, "FontName", "隶书");
         LODOP.SET_PRINT_STYLEA(7, "FontSize", 10);
         LODOP.SET_PRINT_STYLEA(7, "FontColor", 0);
         if(row.recipeObject.xpList[0].rdNumber !=0){
           let height1 = 320;
           row.recipeObject.xpList.forEach(i=>{
             LODOP.ADD_PRINT_TEXT(height1, 50, 300, 25,  i.rdName +"     "+ i.rdPrice+"元");
             LODOP.SET_PRINT_STYLEA(7, "FontName", "隶书");
             LODOP.SET_PRINT_STYLEA(7, "FontSize", 10);
             LODOP.SET_PRINT_STYLEA(7, "FontColor", 0);
             height1 = height1 + 25;
           })
         }
         //********************中药处方
         LODOP.ADD_PRINT_TEXT(300, 500, 300, 25,  "中药处方：");
         LODOP.SET_PRINT_STYLEA(8, "FontName", "隶书");
         LODOP.SET_PRINT_STYLEA(8, "FontSize", 10);
         LODOP.SET_PRINT_STYLEA(8, "FontColor", 0);
         if(row.recipeObject.zpList[0].zpNumber !=0){
           let height2 = 320;
           row.recipeObject.zpList.forEach(i=>{
             LODOP.ADD_PRINT_TEXT(height2, 500, 300, 25,  i.zpName +"     "+ i.zpPrice+"元");
             LODOP.SET_PRINT_STYLEA(8, "FontName", "隶书");
             LODOP.SET_PRINT_STYLEA(8, "FontSize", 10);
             LODOP.SET_PRINT_STYLEA(8, "FontColor", 0);
             height2 = height2 + 25;
           })
         }
         //********************体检处方
         LODOP.ADD_PRINT_TEXT(150, 50, 300, 25,  "体检处方：");
         LODOP.SET_PRINT_STYLEA(7, "FontName", "隶书");
         LODOP.SET_PRINT_STYLEA(7, "FontSize", 10);
         LODOP.SET_PRINT_STYLEA(7, "FontColor", 0);
         if(row.tjManResultList[0].manResultId !=0){
           let height3 = 170;
           row.tjManResultList.forEach(i=>{
             LODOP.ADD_PRINT_TEXT(height3, 50, 300, 25,  i.pro.checkName +"     "+ i.pro.checkPay+"元");
             LODOP.SET_PRINT_STYLEA(7, "FontName", "隶书");
             LODOP.SET_PRINT_STYLEA(7, "FontSize", 10);
             LODOP.SET_PRINT_STYLEA(7, "FontColor", 0);
             height3 = height3 + 25;
           })
         }
         //********************手术处方
         LODOP.ADD_PRINT_TEXT(150, 500, 300, 25,  "手术处方：");
         LODOP.SET_PRINT_STYLEA(8, "FontName", "隶书");
         LODOP.SET_PRINT_STYLEA(8, "FontSize", 10);
         LODOP.SET_PRINT_STYLEA(8, "FontColor", 0);
         if(row.centerSurgeryList[0].susId !=0){
           let height4 = 170;
           row.centerSurgeryList.forEach(i=>{
             LODOP.ADD_PRINT_TEXT(height4, 500, 300, 25,  i.ssObject.projectName +"     "+ i.ssObject.projectPay+"元");
             LODOP.SET_PRINT_STYLEA(8, "FontName", "隶书");
             LODOP.SET_PRINT_STYLEA(8, "FontSize", 10);
             LODOP.SET_PRINT_STYLEA(8, "FontColor", 0);
             height4 = height4 + 25;
           })
         }

       },

		  /*搜索输入*/
		   selectRecord(){
         if(this.leftText!=null && this.leftText != ''){
           // 每次添加之前先清空一边集合
             this.axios.post("selectAllRecords",{texts:this.leftText}).then((v)=>{
            if(v.data != ''){
              this.resultAllVo()
              this.leftList=v.data;
              //赋值到个人信息去
              this.leftRecordObject.mrCount = v.data.medicalRecordObject.mrCount;
              this.leftRecordObject.recipeSickName = v.data.medicalRecordObject.opcObject.bnSickName;
              this.leftRecordObject.mrIdCard = v.data.medicalRecordObject.mrIdCard;
              this.leftRecordObject.mrMcCard = v.data.medicalRecordObject.mrMcCard;
              this.leftRecordObject.sickPhone  = v.data.medicalRecordObject.sickObject.sickPhone;
              this.leftRecordObject.mrKsName   = v.data.medicalRecordObject.mrKsName;
              this.leftRecordObject.mrDoctorName = v.data.medicalRecordObject.mrDoctorName;
              let sums= 0
              if(v.data.recipeObject.xpList.length>0 && v.data.recipeObject.xpList[0].rdNumber !=0){
                v.data.recipeObject.xpList.forEach((drug,i)=>{
                  sums+=(drug.rdPrice*drug.rdCount);
                })
              }
              if(v.data.recipeObject.zpList.length>0 && v.data.recipeObject.zpList[0].zpNumber !=0){
                v.data.recipeObject.zpList.forEach((drug,i)=>{
                  sums+=(drug.zpPrice*drug.zpCount);
                })
              }
              if(v.data.tjManResultList.length>0 && v.data.tjManResultList[0].manResultId !=0){
                v.data.tjManResultList.forEach((drug,i)=>{
                  sums+=drug.pro.checkPay;
                })
              }
              if(v.data.centerSurgeryList.length>0 && v.data.centerSurgeryList[0].susId !=0){
                v.data.centerSurgeryList.forEach((drug,i)=>{
                  sums+=drug.ssObject.projectPay;
                })
              }
              this.sumsa = sums;
              this.leftRecordObject.mrTotalMoney  = sums;
              this.leftRecordListFunction(this.leftList)
              this.sCardPawd();
            }else{
              this.resultAllVo()
              this.$message({
                showClose: true,
                type: 'warning',
                message: '没有该患者的任何收费信息~'
              });
            }

             }).catch( );
         }
		   },
		   //项目总览，--赋值
		   leftRecordListFunction(row){
		     //西药
          if(row.recipeObject.xpList[0].rdStatePrice == 0 && row.recipeObject.xpList[0].rdNumber != 0){
          var sum1 = 0;//西药总价钱
          row.recipeObject.xpList.forEach((drug,i)=>{//循环判断总价钱
            sum1 += (drug.rdPrice*drug.rdCount);
          })
          this.xpObject.xmNumber = row.recipeObject.recipeNumber;
          this.xpObject.xmName="西药处方";
          this.xpObject.xmSum = sum1;
          this.xpObject.xmText = row.recipeObject.xpNotes;
          row.recipeObject.xpList.forEach((b,i)=>{
            if(b.rdStatePrice==0){
              //清空数组
              this.contentObject1={};
              //先添加一遍在清空数组
              this.contentObject1.coName = b.rdName;
              this.contentObject1.coPrice = b.rdPrice;
              this.contentObject1.coCount =b.rdCount;
              this.contentArr1.push(this.contentObject1)
            }
          })
          this.xpObject.xmContent=this.contentArr1;
            //赋值完后清空集合
          this.contentArr1=[];
          this.leftTableList.push(this.xpObject)
          }
          //中药
          if(row.recipeObject.zpList[0].zpStatePrice ==0  && row.recipeObject.zpList[0].zpNumber != 0){
           var sum2 = 0;//中药总价钱
           row.recipeObject.zpList.forEach((drug,i)=>{//循环判断总价钱
           sum2 += (drug.zpPrice*drug.zpCount);
           })
           this.zpObject.xmNumber = row.recipeObject.recipeNumber;
           this.zpObject.xmName="中药处方";
           this.zpObject.xmSum = sum2;
           this.zpObject.xmText = row.recipeObject.zpNotes;
           row.recipeObject.zpList.forEach((b,i)=>{
             if(b.zpStatePrice==0){
               //清空数组
               this.contentObject2={};
               //先添加一遍在清空数组
               this.contentObject2.coName = b.zpName;
               this.contentObject2.coPrice = b.zpPrice;
               this.contentObject2.coCount =b.zpCount;
               this.contentArr2.push(this.contentObject2)
             }
           })
           this.zpObject.xmContent=this.contentArr2
            //赋值完后清空集合
            this.contentArr2=[];
           this.leftTableList.push(this.zpObject)
         }


         //手术
         if(row.centerSurgeryList[0].susPayState ==0  && row.centerSurgeryList[0].susId != 0){
           var sum3 = 0;//手术总价钱
           row.centerSurgeryList.forEach((drug,i)=>{//循环判断总价钱
             sum3 += drug.ssObject.projectPay;
           })
           this.ssObject.xmNumber = row.surgeryStampObject.susNumber;
           this.ssObject.xmName="手术项目";
           this.ssObject.xmSum = sum3;
           this.ssObject.xmText = row.surgeryStampObject.susText;
           row.centerSurgeryList.forEach((b,i)=>{
             if(b.susPayState==0){
               //清空数组
               this.contentObject3={};
               //先添加一遍在清空数组
               this.contentObject3.coName = b.ssObject.projectName;
               this.contentObject3.coPrice = b.ssObject.projectPay;
               this.contentObject3.coCount = 1;
               this.contentArr3.push(this.contentObject3)
             }
           })
           this.ssObject.xmContent=this.contentArr3
           //赋值完后清空集合
           this.contentArr3=[];
           this.leftTableList.push(this.ssObject)
         }

          //体检
          if(row.tjManResultList[0].manPayState ==0  && row.tjManResultList[0].manResultId != 0){
            var sum4 = 0;//中药总价钱
            row.tjManResultList.forEach((drug,i)=>{//循环判断总价钱
              sum4 += drug.pro.checkPay
            })
            this.tjObject.xmNumber = row.tjCodeManObject.manId;
            this.tjObject.xmName="体检项目";
            this.tjObject.xmSum = sum4;
            this.tjObject.xmText = row.tjCodeManObject.manProposal;
            row.tjManResultList.forEach((b,i)=>{
              if(b.manPayState==0){
                //清空数组
                this.contentObject4={};
                //先添加一遍在清空数组
                this.contentObject4.coName = b.pro.checkName;
                this.contentObject4.coPrice = b.pro.checkPay;
                this.contentObject4.coCount = 1;
                this.contentArr4.push(this.contentObject4)
              }
            })
            this.tjObject.xmContent=this.contentArr4
            //赋值完后清空集合
            this.contentArr4=[];
            this.leftTableList.push(this.tjObject)
          }

		   },
       //收取费用
       shouFei(){
		     if(this.leftRecordObject.mrCount!=''
         ){
           if(this.radioSf==2){
             let that = this;
             this.$prompt('密码输入', '提示', {
               inputPlaceholder: '请输入您要缴费的卡号密码',
               inputType:"password",
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               inputErrorMessage: '输入不能为空',
               inputValidator: (value) => {       // 点击按钮时，对文本框里面的值进行验证
                 if(value !=this.mcCardNumber.mcPawd) {
                   return '密码错误';
                 }
               },
             }).then(({ value }) => {
               if(value == this.mcCardNumber.mcPawd) {
                 this.forPrinting()
               }
             }).catch(() => {
               that.$message({
                 showClose: true,
                 type: 'info',
                 message: '取消缴费'
               });
             })

           }else{
             // this.isShowQtjf=true;//没用到了
             this.$msgbox({
               title: '消息',
               message: h('p', null, [
                 h('span', null, '您的医疗费用收取额度为“'),
                 h('i', { style: 'color: red' }, this.leftRecordObject.mrTotalMoney),
                 h('span', null, '“元，请确认已完成缴费收取!'),
               ]),
               showCancelButton: true,
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               beforeClose: (action, instance, done) => {
                 if (action === 'confirm') {
                   instance.confirmButtonLoading = true
                   instance.confirmButtonText = '执行中...'
                   this.forPrinting()
                   setTimeout(() => {
                     done()
                     setTimeout(() => {
                       instance.confirmButtonLoading = false
                     }, 300)
                   }, 3000)
                 } else {
                   done()
                 }
               },
             }).then((action) => {

             }).catch(()=>{ })

           }
         }
       },
		   //收费打印价格
		   forPrinting(){
         this.axios.post("forPrinting",{recordVo:this.leftList,sId:this.token.sid,index:this.radioSf,price:this.leftRecordObject.mrTotalMoney}).then((v)=>{
           if(this.radioSf==2){
               if(v.data == 'ok'){
                 this.$message({
                   showClose: true,
                   type: 'success',
                   message: '缴费成功您的账户余额还剩“'+(this.mcCardNumber.mcBalance-this.sumsa)+'”元'
                 });
                 this.leftText='';
                 this.resultAllVo()
                 this.selectRecordsAll();
               }else if(v.data == 'no'){
                 this.$message({
                   showClose: true,
                   type: 'error',
                   message: '您卡上余额：“'+this.mcCardNumber.mcBalance+'”元，不足以完成此次的缴费，请及时充值~'
                 });
              }
           }else{
             this.$message({
               showClose: true,
               type: 'success',
               message: '缴费成功,本次缴费“'+this.leftRecordObject.mrTotalMoney+'”元，请注意查收'
             });
             this.leftText='';
             this.resultAllVo();
             this.selectRecordsAll();
           }
         }).catch();
		   },
       //密码查询
       sCardPawd(){
         this.axios.post("sCardPawd",{card:this.leftRecordObject.mrMcCard}).then((v)=>{
             this.mcCardNumber = v.data;
            this.sums=(this.mcCardNumber.mcBalance ).toFixed(2);
         }).catch();
       },
       //查询所有的缴费记录总记录
       selectRecordsAll(){
         this.axios.post("selectRecordsAll",{text:this.rightText}).then((v)=>{
           this.rightList =v.data;
         }).catch( );
       },
       //重置所有
       resultAllVo(){
         this.leftList=[];
		     //病人信息
         this.leftRecordObject={
               mrCount:'',
               recipeSickName:'',
               mrIdCard:'',
               mrMcCard:'',
               sickPhone:'',
               mrKsName:'',
               mrDoctorName:'',
               mrTotalMoney:'',
         },
             // 未缴费搜索后查询人员集合
         this.leftTableList=[];
         // 西药处方
         this.xpObject={
           xmNumber:0,
           xmName:'',
           xmSum:'',
           xmText:'',
           xmContent:[],
           /*缴费记录需求属性*/
           mcCard:'',
           recipeSum:0,
           recipeNumber:'',
           sId:'',
           sickNumber:'',
         },
             //中药处方
         this.zpObject={
               xmNumber:0,
               xmName:'',
               xmSum:'',
               xmText:'',
               xmContent:[],
               /*缴费记录需求属性*/
               mcCard:'',
               recipeSum:0,
               recipeNumber:'',
               sId:'',
               sickNumber:'',
         },
         this.tjObject={
               xmNumber:0,
               xmName:'',
               xmSum:'',
               xmText:'',
               xmContent:[],
               /*缴费记录需求属性*/
               mcCard:'',
               recipeSum:0,
               recipeNumber:'',
               sId:'',
               sickNumber:'',
         },
         //西药赋值对象
         this.contentObject1={},
         //中药赋值对象
         this.contentObject2={},
         //手术赋值对象
         this.contentObject3={},
         //体检赋值对象
         this.contentObject4={},
         //西药暂用数组
         this.contentArr1=[],
             //中药暂用数组
         this.contentArr2=[],
             //手术暂用数组
         this.contentArr3=[],
             //体检暂用数组
         this.contentArr4=[],

          //诊疗卡信息
         this.mcCardNumber={};
         //扣除余额
         this.sums=0;
       },
      //标签button的class修改方法
       colorType(value) {
         if(value=="西药处方" || value == "中药处方"){
           return 'success';
         }else if(value=="体检项目"){
           return 'primary';
         }else{
           return 'danger';
         }
       },
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
       //格式化日期  thistime时间  fmt格式
       formatDate (thistime, fmt) {
         let $this = new Date(thistime)
         let o = {
           'M+': $this.getMonth() + 1,
           'd+': $this.getDate(),
           'h+': $this.getHours(),
           'm+': $this.getMinutes(),
           's+': $this.getSeconds(),
           'q+': Math.floor(($this.getMonth() + 3) / 3),
           'S': $this.getMilliseconds()
         }
         if (/(y+)/.test(fmt)) {
           fmt = fmt.replace(RegExp.$1, ($this.getFullYear() + '').substr(4 - RegExp.$1.length))
         }
         for (var k in o) {
           if (new RegExp('(' + k + ')').test(fmt)) {
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
           }
         }
         return fmt;
       },
       //结算找零
       // handleClose() {
       //   this.priceVO.zlPrice=(this.priceVO.shPrice - this.leftRecordObject.mrTotalMoney);
       //   return this.priceVO.zlPrice;
       // },
       // // 充值找零弹窗
       // resetForm(){
       //   this.isShowQtjf=false;
       //   this.priceVO={
       //     shPrice:null,
       //     zlPrice:this.handleClose,
       //   };
       //   this.$refs['regArr'].resetFields();
       // },
       // //收费提交
       // shPriceUp(form){
       //   this.$refs[form].validate((valid)=>{
       //     if (valid) {
       //       this.forPrinting();
       //     } else {
       //       console.log('error submit!!');
       //       return false;
       //     }
       //   });
       // },
		},
		created(){
      this.token= this.$store.state.token == null ? null : this.$store.state.token.list;//将登录存入的值在取出来
			this.selectRecordsAll()
		}
		
	};
</script>

<style scoped>
.te /deep/ .el-input__inner {
  color: #ff0000;
  font-size: 13px;
  cursor: pointer;
}
.fontType{
  width: 80%;   /*一定要设置宽度，或者元素内含的百分比*/
  overflow:hidden; /*溢出的部分隐藏*/
  white-space: nowrap; /*文本不换行*/
  text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
}
.fontType2{
  width: 80%;   /*一定要设置宽度，或者元素内含的百分比*/
  overflow:hidden; /*溢出的部分隐藏*/
  white-space: nowrap; /*文本不换行*/
  text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
  background: #ecf5ff;
  color: #409eff;
  border-radius: 3px;
}
</style>
