
<template>
	<!--=============================================新增病人缴费单弹框===================================-->
	<el-dialog title="病人缴费" @close="closePayBt" width="45%" v-model="isPayShow">
		<el-form ref="payObj" :rules="payObjRules" :model="payObj">
      <el-row>
        <el-col :offset="1" :span="9">
          <el-form-item label="病人姓名" label-width="80px">
            <el-input size="medium" class="te" disabled v-model="payObj.ptName"></el-input>
          </el-form-item>
        </el-col>

        <el-col :offset="1" :span="9">
          <el-form-item label="当前余额" label-width="80px">
            <el-input size="medium" class="te" v-model="payObj.ptPrice" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>


			<el-row>
        <el-col :offset="1" :span="9">
          <el-form-item label="操作人" label-width="80px">
            <el-input size="medium" class="te" v-model="staff.sname" disabled></el-input>
          </el-form-item>
        </el-col>

				<el-col :offset="1" :span="9">
					<el-form-item prop="pyPrice" label="缴费金额" label-width="80px">
						<el-input size="medium"  onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"  v-model="payObj.pyPrice"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

      <el-row>
        <el-col :offset="1">
          <el-form-item  label-width="80px" label="请选择:" prop="pyWay">
            <el-radio-group v-model="payObj.pyWay" size="small">
              <el-radio label="现金">现金</el-radio>
              <el-radio label="微信">微信</el-radio>
              <el-radio label="支付宝">支付宝</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
		</el-form>
		
		<template #footer>
				<el-row>
					<el-col :span="18"></el-col>
					<el-col :span="2">
						<el-button size="mini" @click="addPayFunction()" type="primary">确定</el-button>
					</el-col>
					<el-col :span="1"></el-col>
					<el-col :span="2">
						<el-button @click="closePayBt" size="mini" type="danger">取消</el-button>
					</el-col>
					<el-col :span="1"></el-col>
				</el-row>
		</template>
	</el-dialog>
	
	<!--=============================================费用明细===================================-->
	<el-dialog width="55%"  title="费用明细" v-model="isPayRecordShow" >

    <el-row style="margin-bottom:10px">

      <el-col  :span="1">
        <el-button @click="emptyPayWhere" type="primary" size="mini">清空条件</el-button>
      </el-col>

      <el-col :offset="2" :span="7">
        <span style="font-size: 12px;">操作员:</span>&nbsp;
        <el-select @change="costTabsClick" style="width: 160px" v-model="doctorEnjoinWhere.sIdArr" multiple collapse-tags size="mini">
          <el-option v-for="st in staffArr"
                     :label="st.sname"
                     :value="st.sid"/>
        </el-select>
      </el-col>

      <el-col  :span="12">
        &nbsp;<span style="font-size: 12px;">日期区间：</span>&nbsp;

        <el-date-picker style="width: 140px" @change="costTabsClick" v-model="doctorEnjoinWhere.startDate"
                        type="date"
                        size="mini"
                        value-format="YYYY-MM-DD"
                        placeholder="日期">
        </el-date-picker>
        &nbsp;<span style="font-size: 12px;">至</span>&nbsp;
        <el-date-picker style="width: 140px" @change="costTabsClick" v-model="doctorEnjoinWhere.endDate"
                        type="date"
                        size="mini"
                        value-format="YYYY-MM-DD"
                        placeholder="日期">
        </el-date-picker>
      </el-col>

      <el-col  :span="1">
        <el-button @click="onStart" type="success" size="mini">打印</el-button>
      </el-col>

    </el-row>

    <el-row>

      <el-col>

        <el-tabs v-model="costTabs" @tab-click="costTabsClick">
          <el-tab-pane label="全部费用" name="全部费用"/>
          <el-tab-pane label="医嘱药品费用" name="医嘱药品费用" />
          <el-tab-pane label="床位费用" name="床位费用" />
          <el-tab-pane label="化验项目费用" name="化验项目费用" />
          <el-tab-pane label="其它费用" name="其它费用" />
          <el-tab-pane label="手术费用" name="手术费用" />
          <el-tab-pane  label="病人缴费" name="病人缴费" >

            <el-table size="mini"
                      :data="payArr"
                      id="dys"
                      height="340px"
                      style="width: 100%">
              <el-table-column
                  prop="pyId"
                  label="缴费编号"
                  width="180">
              </el-table-column>
              <el-table-column prop="pyPrice"
                               label="缴费金额">
              </el-table-column>
              <el-table-column
                  prop="pyDate"
                  label="缴费时间">
              </el-table-column>
              <el-table-column
                  prop="pyWay"
                  label="缴费方式">
              </el-table-column>
              <el-table-column prop="staff.sname"
                               label="操作护士">
              </el-table-column>
            </el-table>
            <!--分页插件-->
            <!--        <el-pagination-->
            <!--            style="text-align: right;"-->
            <!--            @size-change="paySizeChange"-->
            <!--            @current-change="payCurrentChange"-->
            <!--            :current-page="payCurrent"-->
            <!--            :page-sizes="[2,4,6,8,10]"-->
            <!--            :page-size="paySize"-->
            <!--            layout="total, sizes, prev, pager, next, jumper"-->
            <!--            :total="payArr.length">-->
            <!--        </el-pagination>-->

          </el-tab-pane>


        </el-tabs>
        <el-table height="340px" v-if="isShowCostTable"
                  ref="multipleTable"
                  :data="patientCostArr"
                  id="dy"
                  size="mini"
                  tooltip-effect="dark"
                  style="width: 100%">
          <el-table-column
              label="费用编号"
              prop="pcdId"
          >
          </el-table-column>
          <el-table-column
              prop="name"
              label="费用名称">
          </el-table-column>

          <el-table-column
              prop="sname"
              label="操作员工">
          </el-table-column>

          <el-table-column
              prop="pcdDate"
              label="扣除时间">
          </el-table-column>

          <el-table-column
              label="费用价格">
            <template #default="obj">
              {{obj.row.pcdPrice.toFixed(2)}}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
	</el-dialog>




  <!--=============================================查询条件===================================-->
  <el-row style="margin-bottom:10px;padding-top: 15px">


    <el-col :offset="3" :span="5">
      <el-input size="mini" v-model="payWhere.searchLike" placeholder="病人姓名或者住院号"></el-input>
    </el-col>
    <el-col  :span="1">
      <el-button size="mini" @click="patientAndPayInit" icon="el-icon-search" type="primary" ></el-button>
    </el-col>

    <el-col :offset="1"  style="margin-top: 4px" :span="4">
      <el-radio-group v-model="payWhere.doctorType" style="font-size: 10px"   @change="patientAndPayInit">
        <el-radio  :label="2">病人余额</el-radio>
        <el-radio :label="1">已交金额</el-radio>
      </el-radio-group>
    </el-col>

    <el-col :span="10">
      &nbsp;<span style="font-size: 12px;">金额区间：</span>&nbsp;

     <el-input onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')" v-model="payWhere.startPrice"  @change="patientAndPayInit" size="mini" style="width: 150px" placeholder="输入金额"></el-input>
      &nbsp;<span style="font-size: 12px;">至</span>&nbsp;
      <el-input onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')" v-model="payWhere.endPrice"  @change="patientAndPayInit" size="mini" style="width: 150px" placeholder="输入金额"></el-input>
    </el-col>
  </el-row>
	
	<!--===============================================================================病人信息表格-->
	<el-row>
		<el-col>
			<el-table
			    :data="patientPayArr"
			    border
          size="small"
          @cell-click="openPayDetails"
				height="470px"
			    style="width: 100%">
			    <el-table-column
				  align="center"
			      label="病人列表"
			      width="180">
				  
				  <el-table-column
				    prop="ptNo"
				    label="住院号"
				    width="180">
				  </el-table-column>
				  <el-table-column prop="ptName"
				    label="病人名称">
				  </el-table-column>
				  <el-table-column prop="ksName"
				    label="科室">
				  </el-table-column>
            <el-table-column prop="ptPayMoney" label="已交金额"></el-table-column>

            <el-table-column prop="ptPrice" label="余额"></el-table-column>


				  <el-table-column label="操作" width="200px">
				  	<template  #default='scope'>
						<el-button size="mini" type="primary" @click.stop="openPayBt(scope.row)" >缴费</el-button>
				  		 <el-button size="mini" type="primary" @click.stop="lookCostClick(scope.row)" >查看费用明细</el-button>
				  	</template>
				  </el-table-column>
			    </el-table-column>
			  </el-table>
		</el-col>
	</el-row>
	

  <!--=====================================病人缴费详细弹框=============================================-->


</template>

<script>
import {getLodop} from '../../js/LodopFuncs';

	export default {
	    data() {
	      return {
          //================================================校验
          payObjRules: {//非空校验
            pyWay:[{required:true,message:"请选择付款方式！",trigger:'blue'}],
            pyPrice:[{required: true, message: "金额不能为空", trigger: 'blue'}],
          },

	        //===========================病人信息
          patientPayObj:{//病人缴费实体类

          },
          patientPayArr:[],
          patientPayCurrent:1,//病人信息当前页
          patientPaySize:8,//病人信息页大小

          //======================查询条件数据
          doctorEnjoinWhere:{
            startDate:'',//开始日期
            endDate:'',//结束日期
            searchLike:'',//模糊搜索
            doctorType:0,//医嘱类型
            sIdArr:[],//员工编号
            ptNo:''
          },
          payWhere:{
            startDate:'',//开始日期
            endDate:'',//结束日期
            searchLike:'',//模糊搜索
            doctorType:2,//医嘱类型
            sIdArr:[],//员工编号
            startPrice:'',//开始金额
            endPrice:'',//结束金额
            ptNo:''
          },

          //=================缴费详细
          payObj:{//缴费实体类
            pyId:'',
            pyPrice:'',
            pyDate:'',
            ptNo:'',
            ptName:'',
            sId:'',
            ptPrice:'',//病人余额
            pyWay:''//缴费方式
          },
          payArr:[],//缴费数组
          payCurrent:1,//缴费详细当前页
          paySize:6,//缴费详细页大小

          //======================费用显示数据
          patientCostArr:[],//医嘱费用详情
          costTabs:'全部费用',
          isShowCostTable:true,//是否显示费用表格



          //=====================================病人缴费详情数据
          payArr:[],
          isShowPayDetail:false,//是否显示病人缴费详细


          //===========================当前登录人信息
          staff:{},//员工对象
          staffArr:[],//员工对象


			    isPayShow:false,//显示新增缴费单
			    isPayRecordShow:false,//显示病人费用明细表
			    jfText:'缴费记录'
	      }
	    },
		methods:{
	      //==============================初始化病人信息以及病人缴费信息
      patientAndPayInit(){
        console.log(getLodop);
        this.axios.post("PatientAndPay",this.payWhere).then((v)=>{
          console.log(v.data);
          this.patientPayArr = v.data;
        }).catch((date)=>{

        })
      },

      //根据住院编号查询所有操作员
      patientSelectStaff(ptNo){
        this.axios({url:"selectBy-ptno-staff",params:{ptNo:ptNo}}).then((v)=>{
          console.log(v.data)
          this.staffArr = v.data;//员工数组
        });
      },
      onStart: function() {
        const LODOP = getLodop()
        LODOP.PRINT_INIT('')
        var strStyle =
            "<style> table,td,th {border-bottom: 1px solid black;border-collapse: collapse;margin:5px 0px;text-align: center;}</style>"
        this.AddPrintContent(this.formatDate(new Date(),"yyyy年MM月dd日"))
        if(this.costTabs != '病人缴费') {
          LODOP.ADD_PRINT_HTM(100, 20, '40%', '100%', strStyle + document.getElementById('dy').innerHTML);
          let sum = 0;
          this.patientCostArr.forEach(i=>{
            console.log(i)
           sum += i.pcdPrice;
          });
          LODOP.ADD_PRINT_HTM(document.getElementById('dy').children[2].children[0].scrollHeight+120, 690, '40%', '100%','合计'+sum.toFixed(2));
        }else{
          LODOP.ADD_PRINT_HTM(100, 20, '40%', '100%', strStyle + document.getElementById('dys').innerHTML)
          let sum = 0;
          this.payArr.forEach(i=>{
            console.log(i)
            sum += i.pyPrice;
          });
          LODOP.ADD_PRINT_HTM(document.getElementById('dys').children[2].children[0].scrollHeight+120, 690, '40%', '100%','合计'+sum.toFixed(2));
        }
        LODOP.PREVIEW()

      },
      AddPrintContent: function(sj) {
        let LODOP = getLodop();
        LODOP.ADD_PRINT_TEXT(15, 300, 300, 25, "柿子医院费用明细");
        LODOP.SET_PRINT_STYLEA(1, "FontName", "隶书");
        LODOP.SET_PRINT_STYLEA(1, "FontSize", 15);
        LODOP.SET_PRINT_STYLEA(1, "FontColor", 0);
        LODOP.ADD_PRINT_TEXT(55, 50, 431, 20, "患者姓名:" + this.payObj.ptName + "                            住院号:" + this.payObj.ptNo);
        LODOP.SET_PRINT_STYLEA(2, "FontName", "隶书");
        LODOP.SET_PRINT_STYLEA(2, "FontSize", 10);
        LODOP.ADD_PRINT_TEXT(75, 50, 431, 20, "打印日期:" + sj);
        LODOP.SET_PRINT_STYLEA(3, "FontName", "隶书");
        LODOP.SET_PRINT_STYLEA(3, "FontSize", 10);
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

      //清空费用查询条件
      emptyPayWhere(){
        this.doctorEnjoinWhere = {
          startDate:'',//开始日期
              endDate:'',//结束日期
              searchLike:'',//模糊搜索
              doctorType:0,//医嘱类型
              sId:'',//员工编号
              ptNo:''
        },
            this.costTabsClick();//重新查询
      },

      //=============================新增缴费方法
      addPayFunction(){
        this.payObj.sId = this.staff.sid;
        this.$refs['payObj'].validate((valid)=>{
          if (valid){
            this.axios.post('addPay',this.payObj).then((v)=>{//新增缴费记录
              this.$message({
                type: 'success',
                message: '成功向 【'+this.payObj.ptName+"】 缴入 【"+this.payObj.pyPrice+"】元"
              });
              this.patientAndPayInit();
              this.closePayBt();
            }).catch((data)=>{

            });
          }
        });
      },

      patientPaySum(param){
        const { columns} = param;//获取到的整个表格的总栏位数
        const sums = [];//合计表个数组
        var sum = 0;//总价钱
        if(this.isShowCostTable){
          this.patientCostArr.forEach((pay,i)=>{//循环判断总价钱
            sum += pay.pcdPrice;
          })
        }else{
          this.payArr.forEach((pay,i)=>{//循环判断总价钱
            sum += pay.pyPrice;
          })
        }

        columns.forEach((column, index) => {//获取合计的位置
          if(index === 4){
            sums[index] = "合计:"+sum.toFixed(2);
            return;
          }
        });
        return sums;
      },

      //==============================病人缴费详情方法
      openPayDetails(row){

      },

      //打开缴费弹框方法
      openPayBt(row){
        this.isPayShow = true;
        this.payObj.ptNo = row.ptNo;
        this.payObj.ptName = row.ptName;
        this.payObj.ptPrice = row.ptPrice;
      },
      //关闭缴费弹框
      closePayBt(){
        this.isPayShow =false;
        this.payObj = {//缴费实体类
          pyId:'',
          pyPrice:'',
          pyDate:'',
          ptNo:'',
          ptName:'',
          sId:'',
          ptPrice:'',//病人余额
          pyWay:''//缴费方式
        };
      },
			valueBRObj(row){
				this.jfText = '缴费记录（'+row.ptName+'）'
			},
      //=======================显示费用方法
      costTabsClick(){
        if(this.costTabs == '全部费用'){
          this.isShowCostTable = true;
          this.axios.post("select-by-ptNo",{ptNo:this.payObj.ptNo,payWhere:this.doctorEnjoinWhere}).then((v)=>{//查询病人缴费记录
            this.patientCostArr = v.data;
            console.log(v.data)
          });
        }else if(this.costTabs != '全部费用' && this.costTabs != '病人缴费'){
          this.isShowCostTable = true;
          this.axios.post("select-by-ptNo",{ptNo:this.payObj.ptNo,text:this.costTabs,payWhere:this.doctorEnjoinWhere}).then((v)=>{//查询病人缴费记录
            this.patientCostArr = v.data;
          });
        }else{
          this.isShowCostTable = false;
          this.axios.post( "select-pay-byPtId", {ptNo: this.payObj.ptNo,payWhere:this.doctorEnjoinWhere}).then((v) => {//查询病人缴费记录
            this.payArr = v.data;
          });
        }
      },
      lookCostClick(obj){
        console.log(obj.listPay)
        this.isPayRecordShow = true;
        this.payObj.ptNo = obj.ptNo;
        this.payObj.ptName = obj.ptName;
        this.patientSelectStaff(obj.ptNo);
        this.costTabsClick();
      },


      // 住院申请size变了调用
      paySizeChange: function(size) {
        this.paySize = size;
      },
      //住院申请Current变了调用
      payCurrentChange: function(currentPage) {
        this.payCurrent = currentPage;
      },
      //显示只保留两位小数
      towNumber(val) {
        return val.toFixed(2);
      }
		},
    created() {
      this.staff = this.$store.state.token.list;//将登录存入的值在取出来
	      this.patientAndPayInit();
        console.log(this.$store.state.token.list)
    }
  }
</script>

<style scoped>
	.works{
		padding: 15px;
	}

  .te /deep/ .el-input__inner {
    color: red;
    font-size: 18px;
    cursor: pointer;
  }


</style>
