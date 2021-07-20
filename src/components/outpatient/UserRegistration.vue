<template>
	<el-row :gutter="10" > <!-- 选择挂号================== -->
		<el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-col >
				<el-select v-model="sOverKsName" style="width: 140px;" placeholder="请选择科室">
					<el-option
					  v-for="item in options1"
					  :key="item.ksId"
					  :label="item.ksName"
					  :value="item.ksId">
					</el-option>
				</el-select>
<!--				<el-select v-model="value2" style="width: 155px;" disabled placeholder="请选择看诊内容">-->
<!--					<el-option-->
<!--					  v-for="item in options"-->
<!--					  :key="item.value"-->
<!--					  :label="item.label"-->
<!--					  :value="item.value">-->
<!--					</el-option>-->
<!--				</el-select>-->
			</el-col>
			<el-col >
				<el-input style="width:250px" class="my-el-input" v-model="input" placeholder="请输入你要查询的病理或医生信息" ></el-input>
				<el-button type="primary" icon="el-icon-search">查询</el-button>
			</el-col>
			<el-col>
				<el-button  type="primary" @click="isShow3 = true" icon="el-icon-circle-plus-outline" class="my-radio-group" >添加病人信息</el-button>
			</el-col>
			<el-col >
				<el-input style="width:220px" class="my-el-input" v-model="input" placeholder="请输入你要查询的挂号信息" ></el-input>
				<el-button type="primary" icon="el-icon-search">查询</el-button>
			</el-col>
		</el-form>
	</el-row>
	<el-row :gutter="10"> <!-- 左边第一个表格 -->
		<el-col :span="12">
      <regDialog1 :isShow="isShow1" :newDate="date1" :list="leftTable" :getNowTime="getNowTime"></regDialog1>
		</el-col>
		
		
		<el-col :span="12"> <!-- 右边表格 -->
			<el-radio-group v-model="radio2" class=" my-radio-group"  size="mini" style="margin-top: 20px;">
			  <el-radio-button label="查看全部"></el-radio-button>
			  <el-radio-button label="当天挂号"></el-radio-button>
			  <el-radio-button label="预约挂号"></el-radio-button>
			</el-radio-group>
			
			<el-table
          size="mini"
          height="490"
			   :data="tableData2"
			   style="width: 100%">
			   <el-table-column
			     label="日期"
			     width="180">
			     <template #default="scope">
			       <i class="el-icon-time"></i>
			       <span style="margin-left: 10px">{{ scope.row.date }}</span>
			     </template>
			   </el-table-column>
			   <el-table-column
			     label="姓名"
			     width="180">
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
			   <el-table-column prop="tag" label="标签" 
			   width="100" :filters="[{ text: '复诊', value: '复诊' }, { text: '初诊', value: '初诊' }]"
			   :filter-method="filterTag"  filter-placement="bottom-end">
			   	<template #default="scope" >
			   		<el-tag :type="scope.row.tag === '复诊' ? 'primary' : 'success'" disable-transitions>
			   		{{scope.row.tag}}
			   		</el-tag>
			   	</template>
			   </el-table-column>
			   <el-table-column label="操作">
			     <template #default="scope">
			       <el-button
			         size="mini"
					 type="success"
			         @click="handleEdit(scope.$index, scope.row)">打印小票</el-button>
			     </template>
			   </el-table-column>
			 </el-table>
			 <el-pagination
			  		style="text-align: center; margin-top: 10px;"
			        @size-change="totalCut"
			        @current-change="pageCut"
			        :current-page="1"
			        :page-sizes="[2,4,6,8,10]"
			        :page-size="size"
			        layout="total, sizes, prev, pager, next, jumper"
			        :total="total">
			 </el-pagination>
		</el-col>
	</el-row>


  <regDialog2 :isShow="isShow2"></regDialog2>
<!--  <regDialog3 :list="" :isShow="isShow3"></regDialog3>-->
  <el-dialog title="提示"  :close-on-click-modal="false" :before-close="resetFormSick"  :close-on-press-escape="false"  v-model="isShow3" width="45%" center  ><!-- 病人新增 -->
    <el-row><!-- :rules="rules" -->
      <el-form  size="small" ref="mzSickArr" :model="mzSickArr" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-col>
          <el-form-item prop="sickName" label="姓名" >
            <el-input v-model="mzSickArr.sickName"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="sickPhone" label="电话" >
            <el-input v-model="mzSickArr.sickPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="sickIdCard" label="身份证" >
            <el-input @change="getInfo(mzSickArr.sickIdCard)" v-model="mzSickArr.sickIdCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="sickAge"  label="年龄" >
            <el-input  v-model="mzSickArr.sickAge"></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item prop="sickSex" label="性别" >
            <el-select v-model="mzSickArr.sickSex" placeholder="请选择"  style="width: 188px">
              <el-option
                  v-for="item in optionsSex"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item  label="家庭地址" >
            <el-input v-model="mzSickArr.sickSite"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item  prop="mcNumberCard" label="诊疗卡卡号:"  >
            <el-input class="te" v-model="mzSickArr.mcNumberCard"  disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item  label-width="10px">
            <el-button type="primary" @click="submitMedicalCard('mzSickArr')" icon="el-icon-paperclip" size="small">生成诊疗卡</el-button>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label-width="455px">
            <el-button type="primary" @click="submitMzSick('mzSickArr')">提交</el-button>
            <el-button @click="resetForm('mzSickArr')">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>

</template>

<script>
import { defineComponent } from 'vue' //时间加年月
import { ElMessage } from 'element-plus'
	export default {
		data() {
			return {
				date1: this.getNowTime(),/* 日期选择器 */
				isShow3:false,//弹窗 - 病人新增
				input:"",//查询搜索框
				radio2:"查看全部",
        leftTable: [{  /* 表格部分1 */
				  sDate: '2021-08-01',
          sOverKsName:'妇科',
          sDoctor:'徐宏🐟',
          sScience:'普通号',
          sType:'主任医师',
          sPrice:'19',
				},],
        sOverKsName:'',
        //加入后台的部分------------------------------------------------------------------------------------------------------------------------
        mzSickList:[], //病人新增************************************************************************
        mzSickArr:{
          sickNumber:0,
          sickIdCard:"",
          sickName:"",
          sickPhone:"",
          sickAge:'',
          sickSex:"",
          sickSite:"",
          mcNumberCard:'',//诊疗卡字段
        },
        optionsSex: [{
          value: '选项1',
          label: '男'
        }, {
          value: '选项2',
          label: '女'
        }],
        rules: {//非空校验
          sickIdCard: [{ required: true, message: "身份证不能为空", trigger: 'blur' },
                        { min: 6, max: 18, message: "身份证格式大于或小于18位", trigger: 'blur' }],
          sickPhone: [{ required: true, message: "电话不能为空", trigger: 'blur' },],
          sickName:[{required: true, message: "输入栏不能为空", trigger: 'blur'}],
          sickSex:[{required: true, message: "输入栏不能为空", trigger: 'blur'},],
          sickAge: [{required: true, message: "输入栏不能为空", trigger: 'blur'},],
          mcNumberCard:[{required: true, message: "请生成诊疗卡", trigger: 'blur'}],

        },
        // 挂号***************************************************************************************************************************
        options1:[],//科室选择


			}
		},
		 methods: {
       filterTag(value, row) {/* 复诊初诊标签方法 */
         return row.tag === value;
       },
       handleEdit(index, row) {/* 表格的选择方法 */
         console.log(index, row);
       },
       handleDelete(index, row) {
         console.log(index, row);
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
       resetForm(formName) {//取消
         this.isShow1 = false
         this.isShow2 = false
         this.isShow3 = false
         this.$refs[formName].resetFields();
       },
       // 挂号***************************************************************************************************************************
       allAepartmentKs(){//科室列表
         this.axios({
           url:'allAepartmentKs'
         }).then((v)=>{
           console.log(v.data)
           this.options1=v.data;
         }).catch();
       },
       //病人新增************************************************************************************************************************
       submitMzSick(formName) { // 确定病人新增
         this.$refs[formName].validate((valid) => {
           if (valid) {
             this.axios.post("addMzSick", this.mzSickArr).then((res) => {
               console.log(res.data)
               if (res.data == 'ok') {
                 this.$refs[formName].resetFields();//注意这里只能刷新加了prop的
                 this.resetMzSick()
                 console.log("ssssss")
               }
             }).catch(() => {
             })
           }
         });
       },
       resetMzSick(){
         this.isShow3=false;
         this.mzSickArr.sickNumber=0;
         this.mzSickArr.sickIdCard="";
         this.mzSickArr.sickName="";
         this.mzSickArr.sickPhone="";
         this.mzSickArr.sickAge='';
         this.mzSickArr.sickSex="";
         this.mzSickArr.sickSite="";
         this.mzSickArr.mcNumberCard='';
       },
       resetFormSick(){ //X关闭按钮
         this.isShow3=false;
         this.$refs['mzSickArr'].resetFields();
       },
       submitMedicalCard(formName) { // 生成诊疗卡卡号
         this.axios.post("inserMedicalCard").then((res) => {
           console.log(res.data)
           this.mzSickArr.mcNumberCard=res.data
           ElMessage.success({
             message: '恭喜你，生成成功~',
             type: 'success'
           });
           console.log("1111")
         }).catch(() => {})

       },
			//处理默认选中当前日期
			getNowTime() {
				var now = new Date();
				var year = now.getFullYear(); //得到年份
				var month = now.getMonth(); //得到月份
				var date = now.getDate(); //得到日期
				var hour =" 00:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
				month = month + 1;
				month = month.toString().padStart(2, "0");
				date = date.toString().padStart(2, "0");
				var defaultDate = `${year}-${month}-${date}${hour}`;
				console.log(defaultDate)

				return defaultDate;
				// this.$set(this.info, "stockDate", defaultDate);
			},
       //身份证日期获取
       getInfo(idCard) {
         console.log("11111111111")
         let sex = null;
         let birth = null;
         let age = null;

         let myDate = new Date();
         let month = myDate.getMonth() + 1;
         let day = myDate.getDate();


         if(idCard.length===18){
           age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
           sex = idCard.substring(16,17);
           birth = idCard.substring(6,10)+"-"+idCard.substring(10,12)+"-"+idCard.substring(12,14);
           if (idCard.substring(10, 12) < month || idCard.substring(10, 12) === month && idCard.substring(12, 14) <= day) age++;

         }
         if(idCard.length===15){
           age = myDate.getFullYear() - idCard.substring(6, 8) - 1901;
           sex = idCard.substring(13,14);
           birth = "19"+idCard.substring(6,8)+"-"+idCard.substring(8,10)+"-"+idCard.substring(10,12);
           if (idCard.substring(8, 10) < month || idCard.substring(8, 10) === month && idCard.substring(10, 12) <= day) age++;
         }

         if(sex%2 === 0)
           sex = '女';  // 性别代码 1代表男，0代表女，暂时不涉及其他类型性别
         else
           sex = '男';

         this.mzSickArr.sickSex=sex;
         this.mzSickArr.sickAge=age;

         if(this.mzSickArr.sickIdCard==''){
           this.mzSickArr.sickSex='';
           this.mzSickArr.sickAge='';
         }
         return  {age , sex, birth}
       },
		},
    created() {
      this.allAepartmentKs();
      this.token = this.$store.state.token//获取用户当前系统操作人员
    },

  };
</script>

<style scoped>
.te /deep/ .el-input__inner {
  color: red;
  font-size: 18px;
  cursor: pointer;
}
</style>