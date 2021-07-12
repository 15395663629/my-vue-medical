<template>

	<!--=============================================新增修改床位弹框===================================-->
	<el-dialog @close="bedAddOrUpdateReset('bedForm')" v-model="isShowAddBed" title="新增床位">
		<el-form ref="bedForm"  :model="bedObj">
			<el-row>
				<el-col :span="9">
					<el-form-item label="床位名称" label-width="80px">
						<el-input v-model="bedObj.bdName"></el-input>
					</el-form-item>
				</el-col>

        <el-col :span="2"></el-col>

        <el-col :span="9">
          <el-form-item label="床位价格" label-width="80px">
            <el-input v-model="bedObj.bdPrice"></el-input>
          </el-form-item>
        </el-col>
			</el-row>


			<el-row>
        <el-col :span="9">
          <el-form-item label="所属科室" label-width="80px">
              <el-select @change="bedKsChangeFunction(1)" v-model="bedObj.ksId">
                <el-option v-for="ks in ksArr"
                           :label="ks.ksName"
                           :value="ks.ksId">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>


        <el-col :span="2"></el-col>


        <el-col :span="9">
          <el-form-item label="选择病房" label-width="80px">
            <el-select v-model="bedObj.wdObj" value-key="wdId"  @change="bedChangeFunction" placeholder="请选择">
              <el-option v-for="wd in selectBedWardArr"
                         :value="wd"
                         :label="wd.wdName"
                         :key="wd.wdId"
                          >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>


			</el-row>

      <el-row>
        <el-col :span="9">
          <el-form-item label="管理护士" label-width="80px">
            <el-input  v-model="bedObj.sName" disabled></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="2"></el-col>

        <el-col :span="9">
          <el-form-item label="床位状态" label-width="80px">
            <el-select @change="isBd" v-model="bedObj.bdIs" >
              <el-option
                  label="可入住"
                  :value="1">
              </el-option>
              <el-option
                  label="停用"
                  :value="2">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
		</el-form>
		
		<template #footer>
				<el-button @click="bedAddOrUpdate()" type="primary">确定</el-button>
				<el-button @click="isShowAddBed = false" type="danger">取消</el-button>
		</template>
	</el-dialog>

  <!--=============================================新增修改病房弹框===================================-->
  <el-dialog width="40%" v-model="isWradShow" @close="wardAddOrUpdateReset('wardForm')" :title="titleWard">
    <el-form ref="wardForm"  :model="wardObj">
      
      <el-row >
        <el-col :span="1"/>
         <el-col :span="10">
           <el-form-item label="病房名称" label-width="80px">
             <el-input v-model="wardObj.wdName"></el-input>
           </el-form-item>
         </el-col>
         <el-col :offset="2" :span="10">
           <el-form-item label="所属科室" label-width="80px">
             <el-select @change="ksChangeFunction(1)" v-model="wardObj.ksId">
               <el-option v-for="ks in ksArr"
                   :label="ks.ksName"
                   :value="ks.ksId">
               </el-option>
             </el-select>
           </el-form-item>
         </el-col>
      </el-row>

      <el-row >
        <el-col :span="1"/>
        <el-col :span="10">
          <el-form-item label="管理护士" label-width="80px">
            <el-select @change="staffChangeFunction" v-model="wardObj.sId">
              <el-option v-for="sf in staffArr"
                         :label="sf.sname"
                         :value="sf.sid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>

    </el-form>

    <template #footer>
      <el-button @click="wardaddOrUpdate('wardForm')" type="primary">确定</el-button>
      <el-button @click="wardAddOrUpdateReset('wardForm')" type="danger">取消</el-button>
    </template>

  </el-dialog>



  <!--=============================================查询病房输入框和搜索按钮===================================-->
	<el-row>
    <el-col :span="9"></el-col>
		<el-col :span="5">
		 <el-input @blur="wardArrInit" placeholder="病房名称或者护士名称搜索" v-model="wardSearchText"></el-input>
		</el-col>
    <el-col :span="1">
      <el-button  @click="wardArrInit" icon="el-icon-search" type="primary" ></el-button>
    </el-col>
    <el-col :span="9"></el-col>
	</el-row>


  <!--=============================================病房信息表格===================================-->
  <el-row>
    <el-col>
      <el-table
          ref="multipleTable"
          highlight-current-row
          height="700px"
          :header-cell-style="{background:'#F4F4F4'}"
          @cell-click="openBedDrawer"
          :data="wardArr.slice((wardCurrentPage-1)*wardPageSize,wardCurrentPage*wardPageSize)"
          style="width: 100%"
          @selection-change="handleSelectionChange">
       <el-table-column label="病房管理" align="center">
         <el-table-column
             prop="wdName"
             label="病房名称">
         </el-table-column>
         <el-table-column
             prop="ksName"
             label="科室">
         </el-table-column>
         <el-table-column
             prop="staff.sname"
             label="管理护士">
         </el-table-column>
        </el-table-column>
        <el-table-column width="100px"
                         align="right">
          <template  #header>
            <el-button @click.stop="openWardTk(1)" type="primary" size="mini">新增病房</el-button>
          </template>
          <template  #default="r">
            <el-button @click.stop="openWardTk(2,r.row)" size="mini">修改</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!--分页插件-->
      <el-pagination @size-change="wardHandleSizeChange" @current-change="wardHandleCurrentChange"
          style="text-align: center;"

          :current-page="wardCurrentPage"
          :page-sizes="[2,4,6,8]"
          :page-size="wardPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="wardArr.length">
      </el-pagination>
    </el-col>
  </el-row>




 <!--==================================================显示某个病房的病床抽屉====================================================-->
  <el-drawer
      :title="bedDrawerTitle"
      v-model="bedDrawerIsShow"
      direction="btt"
      size="50%"
      :before-close="handleClose" destroy-on-close>

    <!--=============================================床位信息表格===================================-->
    <el-row>
      <el-col :offset="2" :span="20">
        <el-table
            ref="multipleTable"
            :data="bedArr.slice((bedCurrentPage-1)*bedPageSize,bedCurrentPage*bedPageSize)"
            :header-cell-style="{background:'#F4F4F4'}"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                prop="bdName"
                label="床位名称">
            </el-table-column>
            <el-table-column
                label="床位状态">

              <template #default="scope">
                <el-tag :type="scope.row.bdIs == 1 ? 'success' : scope.row.bdIs == 2 ? 'info' : scope.row.bdIs == 3 ? '已入住' : ''"
                >{{scope.row.bdIs == 1 ? '空位' : scope.row.bdIs == 2 ? '停用' : scope.row.bdIs == 3 ? '已入住' : ''}}</el-tag>

              </template>

            </el-table-column>
            <el-table-column
                prop="bdPrice"
                label="病床价格">
            </el-table-column>
            <el-table-column
                prop="ptNo"
                label="病人住院号">
            </el-table-column>
            <el-table-column
                prop="ptName"
                label="入住病人">
            </el-table-column>

          <el-table-column width="260px"
                           align="right">
            <template  #header>
              <el-row>
                <el-col :span="14">
                  <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="5">
                  <el-button size="mini" @click="openBedTk()" type="primary">新增床位</el-button>
                </el-col>
              </el-row>
            </template>
            <template  #default="r">
              <el-button v-if="r.row.bdIs != 3 && r.row.bdIs == 2"
                         @click="openisBdId(r,1)" type="success" size="mini">恢复使用</el-button>

              <el-button v-if="r.row.bdIs != 3 && r.row.bdIs != 2"
                  @click="openBedTk(r)" size="mini">修改</el-button>


              <el-button v-if="r.row.bdIs == 3"
                         @click="openBedTk(r)" type="primary" size="mini">转病床</el-button>

              <el-button v-if="r.row.bdIs != 3 && r.row.bdIs != 2"
                         @click="openBedTk(r)" size="mini">入住病人</el-button>

              <el-button v-if="r.row.bdIs != 3 && r.row.bdIs != 2"
                         @click="openisBdId(r,2)" type="danger" size="mini">停用</el-button>


            </template>
          </el-table-column>

        </el-table>
        <!--分页插件-->
        <el-pagination @size-change="bedHandleSizeChange" @current-change="bedHandleCurrentChange"
                       style="text-align: center;"
                       :current-page="bedCurrentPage"
                       :page-sizes="[2,4,6,8]"
                       :page-size="bedPageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="bedArr.length">
        </el-pagination>
      </el-col>
    </el-row>



  </el-drawer>


  <!--=============================================选择住院申请病人弹框===================================-->
  <el-dialog title="选择住院申请病人" v-model="isShowPatient">
    <el-table
        ref="multipleTable"
        :data="empArr"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          label="病人编号"
          prop="pdId"
      >
      </el-table-column>
      <el-table-column
          prop="empName"
          label="申请住院日期">
      </el-table-column>
      <el-table-column
          prop="empDate"
          label="诊断结果">
      </el-table-column>
      <el-table-column
          prop="empSalary"
          label="申请人">
      </el-table-column>


      <el-table-column width="200px"
                       align="right">
        <template  #header>
          <el-input
              v-model="fromSearch"
              prefix-icon="el-icon-search"
              size="small"
              placeholder="病人名称搜索"/>
        </template>

        <!--这里放操作按钮-->
        <template  #default='scope'>
          <el-button type="danger" icon="el-icon-delete" @click="delEmp(scope.row)" circle>删除</el-button>
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
  </el-dialog>


</template>

<script>
  import qs from "qs"
	export default{
		data(){
			return{
			  //================================病人信息及病人表格数据操作
        isShowPatient:false,//是否显示申请病人弹框
        inHospitalApplyObj:{//病人申请信息对象
          inId:'',
          sickNumber:'',
          inDiagnosis:'',
          inApplyDate:'',
          ksId:'',
          ksName:'',
          inProposer:'',
          sId:'',
          inIs:''
        },
        inHospitalApplyArr:[//病人申请信息数组

        ],




			  //=================================病房抽屉、新增修改病床
        bedDrawerIsShow:false,//是否显示病床抽屉
        bedDrawerTitle:'',//病床抽屉标题
        //病床
        bedObj:{//病床对象
          bdId:'',
          bdName:'',
          wdId:'',
          wdObj:'',//病房对象
          bdPrice:'',
          bdIs:'',
          ptNo:'',
          ksId:'',//科室编号
          sName:''//护士名称
        },
        bedArr:[//病床数组

        ],
        selectBedWardArr:[//新增病床使用的病房集合

        ],
        isShowAddBed:false,//病床弹框是否显示






        //==============================病房
        wardSearchText:'',//病房搜索值
        isBedZT:'',
        wardObj:{//病房对象

        },
        wardArr:[//病房集合
        ],
        isWradShow:false,//是否显示新增或者修改病房弹框
        titleWard:'',//新增或者修改病床弹框标题
        wardCurrentPage:1,//病房分页当前页初始化
        wardPageSize:4,//病房分页页数初始化



        //=================科室
        xzKsId:'',//选择科室编号
        ksArr:[//科室集合

        ],

        //=========================员工
        xzStaffId:'',//选择员工编号
        staffArr:[//员工集合

        ],

        search:'',//搜索

        bedCurrentPage:1,//病房分页当前页初始化
        bedPageSize:4//病房分页页数初始化
			}
		},
		methods:{
			//===========================初始化病房信息方法
		  wardArrInit(){
			  this.axios({url:"zyWard",params:{search:this.wardSearchText}}).then((v)=>{//查询所有病房
			    console.log(v.data)
            this.wardArr = v.data;
        }).catch((data)=>{

        });

        //查询所有科室
        this.axios.post("ks-list").then((v)=>{
          console.log(v.data);
          this.ksArr = v.data;
        }).catch((data)=>{

        });
      },

      //================================病床
      //打开病床抽屉方法
      openBedDrawer(row){
		    this.bedDrawerIsShow = true;//打开drawer弹框

        this.bedArr = row.listBed;//将病房的病床集合给到定义在外面的病床集合
        this.bedDrawerTitle = "病房名称："+row.wdName;//设置drawer框的title
        this.bedObj.ksId = row.ksId;//将病房的科室编号放入病床
        this.bedKsChangeFunction();//调用查询病房的方法
        this.bedObj.wdId = row.wdId;//将病房编号放入病床对象里面
        this.bedObj.wdObj = row;//将病房对象放入病房
        this.bedObj.sName = row.staff.sname;//将管理护士名称传入病床对象
      },
      //添加病床  科室改变的时候将被调用
      bedKsChangeFunction(is,wdId){
		    this.axios({url:"wardByKsId",params:{ksId:this.bedObj.ksId}}).then((v)=>{
		      this.selectBedWardArr = v.data;
        }).catch((data)=>{

        });
      },
      //添加病床  病房改变时将调用
      bedChangeFunction(row){
		    this.bedObj.sName = row.staff.sname;
      },
      //打开新增或者修改病床弹框
      openBedTk(bed){
		    if(bed != undefined){
          this.bedObj.bdId = bed.row.bdId;
          this.bedObj.bdName = bed.row.bdName;
          this.bedObj.bdPrice = bed.row.bdPrice;
          this.bedObj.bdIs = bed.row.bdIs;
        }
        console.log(this.bedObj)
        this.isShowAddBed = true;
      },
      //新增病床或者修改病床方法
      bedAddOrUpdate(){
        this.axios.post("bedAddOrUpdate",this.bedObj).then((v)=>{//新增
          console.log(v.data);
          this.bedAddOrUpdateReset("bedForm");//清空数据
        }).catch((data)=>{

        });
      },
      //清除病房新增或者修改弹框的表单方法
      bedAddOrUpdateReset(formName){
        this.isBedShow = false;
        this.bedClear();
        this.$refs[formName].resetFields();
      },
      //清空病床弹框数据
      bedClear() {
		    this.bedObj.bdId = '';
        this.bedObj.bdIs = '';
        this.bedObj.bdName = '';
        this.bedObj.bdPrice = '';
		  },
      //修改病床状态
      openisBdId(row,is) {
        let titelText;//弹框标题
        let yesText;//确认之后的文本
        let noText;//取消之后的文本
        let btYes;//确定按钮文本
        let btNo;//取消按钮文本


		    if(is == 1){
          titelText = "确定要启用【"+row.row.bdName+"】病床吗？";
          yesText = "成功启用【"+row.row.bdName+"】病床";
          noText = "取消启用【"+row.row.bdName+"】病床";
          btYes = "确定启用";
          btNo = "取消启用";
        }else{
          titelText = "确定要停用【"+row.row.bdName+"】病床吗？";
          yesText = "成功停用【"+row.row.bdName+"】病床";
          noText = "取消停用【"+row.row.bdName+"】病床";
          btYes = "确定停用";
          btNo = "放弃停用";
        }
        this.$confirm(titelText, '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: btYes,
          cancelButtonText: btNo
        }).then(() => {
              this.axios.post("bedUpdateBdIs",{bdIs:is,bdId:row.row.bdId}).then((v)=>{
                console.log(v)
                this.bedSelectByWdId(this.bedObj.wdId);
              }).catch((data)=>{
              });
              this.$message({
                type: 'success',
                message: yesText
              });
        }).catch(action => {
              this.$message({
                type: 'warning',
                message:noText
              })
            });
      },
      //根据病房编号查询病床
      bedSelectByWdId(wdId){
        this.axios({url:"bedSelectByWdId",params:{wdId:wdId}}).then((v)=>{
          this.bedArr = v.data;
        }).catch((data)=>{

        });
      },





      ///==========================病房
      //打开新增或者修改弹框
      //is参数用来判断是新增还是修改 1是新增  2是修改
      //ward病房对象
      openWardTk(is,ward){
			  this.wardObj.ksId = '';
        this.wardObj.sId = '';

        this.isWradShow = true;//打开弹框
        this.titleWard = is == 1 ? '新增病房' : '修改病房';//设置弹框标题

        if(ward != undefined){//判断是否有值
          this.wardObj.wdId = ward.wdId;
          this.wardObj.ksId = ward.ksId;
          this.wardObj.sId = ward.sid;
          this.wardObj.wdName = ward.wdName;
          this.ksChangeFunction();
        }
      },
      //新增或者修改病房方法
      wardaddOrUpdate(form){
      console.log(this.wardObj)

        this.axios.post("addOrUpdataWard",this.wardObj).then((v)=>{//新增
          console.log(v.data);
          this.wardArrInit();//重新查询所有数据
          this.wardAddOrUpdateReset("formWard");//清除表单以及数据
        }).catch((data)=>{
        });
      },
      //清除新增或者修改弹框的表单方法
      wardAddOrUpdateReset(formName){
        this.isWradShow = false;
        this.wardClear();
        this.$refs[formName].resetFields();
      },
      //清空病房弹框数据
      wardClear(){
			  this.wardObj = {//病房对象
          // wdId:'',//病房编号
          // wdName:'',//病房名称
          // ksId:'',//科室编号
          // sId:'',//员工编号
          // listBed:[//病床数组
          //
          // ],
          // staff: {}//员工对象
        }
      },
      //选择科室值发生改变是触发
      ksChangeFunction(is){
			  if(is == 1){//如果是等于1就说明他不是从弹框那边调用的就需要将员工编号清空
          this.wardObj.sId = '';
        }

        this.axios({url:"select-staff-all",params:{ksId:this.wardObj.ksId}}).then((v)=>{//查询所有病房
          console.log(v.data)
          this.staffArr = v.data;
        }).catch((data)=>{

        });
      },
      //选择员工值发生改变时触发
      staffChangeFunction(){

      },


      // 初始病房每页数据数wardpagesize和数据data
      wardHandleSizeChange: function(size) {
        this.wardPageSize = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      //初始页病房wardcurrentPage
      wardHandleCurrentChange: function(currentPage) {
        this.wardCurrentPage = currentPage;
        console.log(this.currentPage) //点击第几页
      },

      // 初始病床每页数据数wardpagesize和数据data
      bedHandleSizeChange: function(size) {
        this.bedPageSize = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      //初始页病床bedcurrentPage
      bedHandleCurrentChange: function(currentPage) {
        this.bedCurrentPage = currentPage;
        console.log(this.currentPage) //点击第几页
      }


      // //点击病房表格将病房表格数据放入病床表格方法
      // wardClickBedObj(row){
      //
      // }
		},
    created() {
		  this.wardArrInit();
    }
  }

</script>

<style scoped>
	.works{
		padding: 15px;
	}
  .el-drawer__header{
    margin-bottom: 0px;
  }
  .tabless /deep/{
    /*.el-table__row:hover>td{*/
    /*  cursor: pointer;*/
    /*}*/
  }

</style>