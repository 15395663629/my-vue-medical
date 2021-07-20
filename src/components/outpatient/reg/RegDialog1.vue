<template>
  <div class="block" style="margin-top: 8px;">
    <el-date-picker
        v-model="newDate"
        type="date"
        placeholder="选择日期"
        format="YYYY 年 MM 月 DD 日" @change="dateTimes">
    </el-date-picker>
    <el-select v-model="opValue" placeholder="问诊选择" style="width: 188px;">
      <el-option
          v-for="item in optionsRge1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
  </div>
  <el-table
      size="mini"
      height="490"
      :data="list"
      style="width: 100%">
    <el-table-column
        label="日期"
        width="180">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.sDate }}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="姓名"
        width="150" >
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" >
          <template #default>
            <p>姓名：{{ scope.row.sDoctor }}</p>
            <p>所属科室： {{ scope.row.sOverKsName }}</p>
            <p>学术： {{ scope.row.sType}}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.sDoctor }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
        label="类型"
        width="100" align="center">
      <template #default="scope">
        <span style="margin-left: 10px">{{ scope.row.sScience }}</span>
      </template>
    </el-table-column>

    <el-table-column
        label="挂号费"
        width="100">
      <template #default="scope">
        <span style="margin-left: 10px">{{scope.row.sPrice}}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <div v-if="booleanDate==1">
          <el-button size="mini" type="success" @click="isDialog1(scope.row)" >当天挂号</el-button>
        </div>
        <div v-if="booleanDate==2">
          <el-button size="mini" type="warning" @click="isDialog2(scope.row)">预约挂号</el-button>
        </div>
        <div v-if="booleanDate=='' ">

        </div>
      </template>
    </el-table-column>
  </el-table>
  <!--分页插件-->
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


  <el-dialog  title="当天挂号" :close-on-click-modal="false" :before-close="resetForm"  :close-on-press-escape="false" v-model="isShow1" width="44%" center  ><!-- 第一个弹窗普通挂号 -->
    <el-row><!-- :rules="rules" -->
      <el-form :rules="rules"  status-icon :model="regArr" ref="regArr" label-width="100px" size="small" class="demo-ruleForm">
        <el-col>
          <el-form-item label="挂号日期：">
            <el-date-picker
                  style="width: 350px; font-size: 15px;"
                v-model="regArr.rtTime"
                type="date"
                disabled
                format="YYYY 年 MM 月 DD 日">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="卡号：" prop="mcCard">
            <el-input class="te"  v-model="regArr.mcCard"  @keyup="byIdCard(regArr.mcCard)"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="就诊：" prop="rtClass">
            <el-select class="te"   v-model="regArr.rtClass" placeholder="请选择" style="width: 188px;" @change="jiZheng(regArr.rtClass)">
              <el-option
                  v-for="item in optionsRge2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="姓名：" >
            <el-input class="te"  v-model="regArr.sickName" disabled></el-input>
          </el-form-item>
        </el-col>
        <!--				<el-col >-->
        <!--					<el-form-item label="问诊诊室" >-->
        <!--						<el-input></el-input>-->
        <!--					</el-form-item>-->
        <!--				</el-col>-->
        <el-col>
          <el-form-item label="科室：" >
            <el-input class="te"  v-model="regArr.rtOverKsName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="诊断医生：" >
            <el-input class="te"  v-model="regArr.rtDoctor"  disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="医生职位：" >
            <el-input class="te"  v-model="regArr.rtType" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="挂号类型：" >
            <el-input class="te"  v-model="regArr.rtScience" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="挂号费：" >
            <el-input class="te" v-model="regArr.rtPrice" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label-width="455px">
            <el-button type="primary" @click="submitFormReg('regArr')">提交</el-button>
            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>

<!--
 ============================================================
-->

  <el-dialog  title="预约挂号"  :close-on-click-modal="false" :before-close="resetForm"  :close-on-press-escape="false" v-model="isShow2"  width="43%" center  ><!-- 弹窗预约挂号新增 -->
    <el-row><!-- :rules="rules" -->
      <el-form :rules="rules" size="small" status-icon :model="regArr" ref="regArr" label-width="100px" class="demo-ruleForm">
        <el-col>
          <el-form-item label="挂号日期：">
            <el-date-picker
                style="width: 350px; font-size: 15px;"
                v-model="regArr.rtTime"
                type="date"
                disabled
                format="YYYY 年 MM 月 DD 日">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="卡号：" prop="mcCard">
            <el-input class="te"  v-model="regArr.mcCard"  @keyup="byIdCard(regArr.mcCard)"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="就诊：" prop="rtClass">
            <el-select class="te"   v-model="regArr.rtClass" placeholder="请选择" style="width: 188px;">
              <el-option
                  v-for="item in optionsRge3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="姓名：" >
            <el-input class="te"  v-model="regArr.sickName" disabled></el-input>
          </el-form-item>
        </el-col>
        <!--				<el-col >-->
        <!--					<el-form-item label="问诊诊室" >-->
        <!--						<el-input></el-input>-->
        <!--					</el-form-item>-->
        <!--				</el-col>-->
        <el-col>
          <el-form-item label="科室：" >
            <el-input class="te"  v-model="regArr.rtOverKsName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="诊断医生：" >
            <el-input class="te"  v-model="regArr.rtDoctor"  disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="医生职位：" >
            <el-input class="te"  v-model="regArr.rtType" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="挂号类型：" >
            <el-input class="te"  v-model="regArr.rtScience" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="挂号费：" >
            <el-input class="te" v-model="regArr.rtPrice" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label-width="455px">
            <el-button type="primary" @click="submitFormReg('regArr')">提交</el-button>
            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>

</template>

<script>
import { ElMessage } from 'element-plus'
  export default {
    props:{
      list:{
        type:Array,
        required:true,
      },
      newDate:{
        type: String,
        required:true,
      },
      getNowTime:{
        type:Function,
        required:true,
      }
    },
    data(){
      var validata = (rule, value, callback) => { //table2 校验
        if (value === '') {
          callback(new Error('请输入卡号'));
        }else if(value != this.regArr.cardObject.mcCard){
          callback(new Error('卡号不存在'));
        }else{
          callback();
        }
      };
      return{
        token:[],//操作人员
        isShow1:false,//弹窗 - 挂号
        isShow2:false,//弹窗 - 预约挂号
        optionsRge1:[{//选项列表1
            value: '1',
            label: '普通门诊'
          },{
            value: '2',
            label: '专家门诊'
          },
          ],
        opValue:'',
        optionsRge2: [{
          value: '初诊',
          label: '初诊'
        }, {
          value: '复诊',
          label: '复诊'
        },{
            value: '急诊',
            label: '急诊'
        }],
        optionsRge3: [{
          value: '初诊',
          label: '初诊'
        }, {
          value: '复诊',
          label: '复诊'
        }],
        price:0,
        regArr:{
          sickName:'',//这两个不在实体类里
          mcCard:'',

          rtTime:'',
          rtClass:'',
          rtOverKsName:'',
          rtDoctor:'',
          rtType:'',
          rtScience:'',
          rtPrice:0,
          rtState:'',
          sId:'',
          cardObject:'',
        },
        rules: {//密码校验
          mcCard: [
            { validator: validata, trigger: 'blur' }
          ],
          rtClass:[
            {required: true, message: "请选择就诊", trigger: 'blur'}
          ],
        },
        booleanDate:0,//时间戳判断点
      }
    },
    methods:{
      isDialog1(row){//挂号=======================================================================================
        this.isShow1 = true;
        this.regArr.rtTime =row.sDate;
        this.regArr.rtOverKsName=row.sOverKsName;
        this.regArr.rtDoctor=row.sDoctor
        this.regArr.rtType=row.sType
        this.regArr.rtScience=row.sScience
        this.price =row.sPrice;
        this.regArr.rtPrice=row.sPrice
        this.regArr.rtState='当天挂号';
        this.regArr.sId=this.token.uid;
        console.log(this.token)
      },
      submitFormReg(form){
        this.$refs[form].validate((valid)=>{
          if (valid) {
            if(this.regArr.cardObject.mcBalance < this.regArr.rtPrice){
              ElMessage.error({
                message: '您卡余额   '+this.regArr.cardObject.mcBalance+'   不足\n请前往充值页面进行充值~',
                type: 'success'
              });
            }else{
              this.axios.post('addReg',this.regArr).then((v)=>{
                console.log(v.data)
                if(v.data=='ok'){
                  ElMessage.success({
                    message: '挂号成功!,已扣取挂号费'+this.regArr.rtPrice+'元~请注意查收',
                    type: 'success'
                  });
                  this.resetForm()//刷新主界面的校验提示
                }
              }).catch(function(){

              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      jiZheng(test){
        if(test == '急诊'){
          this.regArr.rtPrice =parseInt(this.regArr.rtPrice)+5;
        }else{
          this.regArr.rtPrice = this.price;
        }
      },
      isDialog2(row){//预约挂号====================================================================================
        this.isShow2 = true;
        this.regArr.rtTime =row.sDate;
        this.regArr.rtOverKsName=row.sOverKsName;
        this.regArr.rtDoctor=row.sDoctor
        this.regArr.rtType=row.sType
        this.regArr.rtScience=row.sScience
        this.price =row.sPrice;
        this.regArr.rtPrice=row.sPrice
        this.regArr.rtState='预约挂号';
        this.regArr.sId=this.token.uid;
      },
      resetForm(){//取消
        this.isShow2 = false;
        this.isShow1 = false;
        this.regArr={
          cardObject:'',
        };
        this.$refs['regArr'].resetFields();
      },
      getTimestamp(time) { //把时间日期转成时间戳
        return (new Date(time)).getTime() / 1000
      },
      dateTimes(){//根据时间显示按钮
        var dates = this.getTimestamp(this.getNowTime());
        if(dates < this.getTimestamp(this.newDate)){
          this.booleanDate=2;
        }else if(dates === this.getTimestamp(this.newDate)){
          this.booleanDate=1;
        }else{
          alert("您选择的时间不符合当前时间~")
          this.booleanDate=0;
        }
      },
      byIdCard(test){//实时刷新查询
        this.axios({
          url:'byIdCard',
          params:{mcCard:test}
        }).then((v)=>{
          this.regArr.cardObject=v.data;
          this.regArr.sickName=this.regArr.cardObject.mzSick.sickName;//查询到的用户名赋值到model显示属性中
        }).catch(function(){

        })
      },
    },
    created() {
      this.dateTimes()
      this.token= this.$store.state.token == null ? null : this.$store.state.token.list;//将登录存入的值在取出来
    },
  }
</script>

<style scoped>
.te /deep/ .el-input__inner {
  color: #ff0000;
  font-size: 13px;
  cursor: pointer;
}
</style>