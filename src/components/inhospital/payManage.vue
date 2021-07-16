<template>
	<!--=============================================新增病人缴费单弹框===================================-->
	<el-dialog title="新增缴费" @close="closePayBt" v-model="isPayShow">
		<el-form>
			<el-row>
				<el-col :offset="2" :span="9">
					<el-form-item label="缴费金额" label-width="80px">
						<el-input v-model="payObj.pyPrice"></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :offset="2" :span="9">
					<el-form-item label="操作人" label-width="80px">
						<el-input v-model="staff.sname" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		
		<template #footer>
				<el-row>
					<el-col :span="18"></el-col>
					<el-col :span="2">
						<el-button @click="addPayFunction('empFrom')" type="primary">确定</el-button>
					</el-col>
					<el-col :span="1"></el-col>
					<el-col :span="2">
						<el-button @click="isShowZY = false" type="danger">取消</el-button>
					</el-col>
					<el-col :span="1"></el-col>
				</el-row>
		</template>
	</el-dialog>
	
	<!--=============================================费用明细===================================-->
	<el-dialog title="费用明细" v-model="isPayRecordShow">
		
		<el-table
		    ref="multipleTable"
		    :data="empArr"
		    tooltip-effect="dark"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      label="费用编号"
			  prop="empId"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="empName"
		      label="费用名称">
		    </el-table-column>
		    <el-table-column
		      prop="empDate"
		      label="费用价格">
		    </el-table-column>
			<el-table-column
			  prop="empSalary"
			  label="扣除时间">
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
		
	</el-dialog>
	
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
            <el-table-column prop="ptPayMoney" label="总费用"></el-table-column>

            <el-table-column prop="ptPrice" label="余额"></el-table-column>


				  <el-table-column label="操作" width="200px">
				  	<template  #default='scope'>
						<el-button size="mini" type="primary" @click.stop="openPayBt(scope.row)" >缴费</el-button>
				  		 <el-button size="mini" type="primary" @click.stop="isPayRecordShow = true" >查看费用明细</el-button>
				  	</template>
				  </el-table-column>
			    </el-table-column>
			  </el-table>
      <!--分页插件-->
      <el-pagination
          style="text-align: center;"
          @size-change="patientHandleSizeChange"
          @current-change="patientHandleCurrentChange"
          :current-page="patientCurrent"
          :page-sizes="[2,4,6,8,10]"
          :page-size="patientSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="patientBaseArr">
      </el-pagination>
		</el-col>
	</el-row>
	

  <!--=====================================病人缴费详细弹框=============================================-->

  <el-dialog title="病人缴费详细" v-model="isShowPayDetail">

    <el-table
        :data="payArr.slice((payCurrent-1)*paySize,payCurrent*paySize)"
        border
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
        <el-table-column prop="staff.sname"
            label="操作护士">
      </el-table-column>
    </el-table>
    <!--分页插件-->
    <el-pagination
        style="text-align: right;"
        @size-change="paySizeChange"
        @current-change="payCurrentChange"
        :current-page="payCurrent"
        :page-sizes="[2,4,6,8,10]"
        :page-size="paySize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="payArr.length">
    </el-pagination>

  </el-dialog>

</template>

<script>
	export default {
	    data() {
	      return {
	        //===========================病人信息
          patientPayObj:{//病人缴费实体类

          },
          patientPayArr:[],
          patientPayCurrent:1,//病人信息当前页
          patientPaySize:8,//病人信息页大小


          //=================缴费详细
          payObj:{//缴费实体类
            pyId:'',
            pyPrice:'',
            pyDate:'',
            ptNo:'',
            ptName:'',
            sId:''
          },
          payArr:[],//缴费数组
          payCurrent:1,//缴费详细当前页
          paySize:6,//缴费详细页大小



          //=====================================病人缴费详情数据
          payArr:[],
          isShowPayDetail:false,//是否显示病人缴费详细


          //===========================当前登录人信息
          staff:{},//员工对象

			    isPayShow:false,//显示新增缴费单
			    isPayRecordShow:false,//显示病人费用明细表
			    jfText:'缴费记录'
	      }
	    },
		methods:{
	      //==============================初始化病人信息以及病人缴费信息
      patientAndPayInit(){
        this.axios({url:"PatientAndPay"}).then((v)=>{
          console.log(v.data);
          this.patientPayArr = v.data;
        }).catch((date)=>{

        })


      },

      //=============================新增缴费方法
      addPayFunction(form){
        this.payObj.sId = this.staff.sid;
        this.axios.post('addPay',this.payObj).then((v)=>{//新增缴费记录
          this.$message({
            type: 'success',
            message: '成功向 【'+this.payObj.ptName+"】 缴入 【"+this.payObj.pyPrice+"】元"
          });
          this.patientAndPayInit();
          this.closePayBt();
        }).catch((data)=>{

        });
      },

      //==============================病人缴费详情方法
      openPayDetails(row){
        console.log(row)
        this.isShowPayDetail = true;
        this.payArr = row.listPay;
      },

      //打开缴费弹框方法
      openPayBt(row){
        this.isPayShow = true;
        this.payObj.ptNo = row.ptNo;
        this.payObj.ptName = row.ptName;
      },
      //关闭缴费弹框
      closePayBt(){
        this.isPayShow =false;
        this.payObj = {//缴费实体类
              pyId:'',
              pyPrice:'',
              pyDate:'',
              ptNo:'',
              ptName: '',
              sId:''
        };
      },
			valueBRObj(row){
				this.jfText = '缴费记录（'+row.ptName+'）'
			},


      // 住院申请size变了调用
      paySizeChange: function(size) {
        this.paySize = size;
      },
      //住院申请Current变了调用
      payCurrentChange: function(currentPage) {
        this.payCurrent = currentPage;
      }


		},
    created() {
	      this.patientAndPayInit();
        this.staff = this.$store.state.token.list;//将登录存入的值在取出来
        console.log(this.$store.state.token.list)
    }
  }
</script>

<style >
	.works{
		padding: 15px;
	}
	/deep/.el-table__row:hover>td{
		cursor: pointer;
		background-color: #D2FFF0!important
	}
	/deep/.el-table__body tr.current-row>td{
	  background-color: #D2FFF0!important
	  /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
	}
</style>
