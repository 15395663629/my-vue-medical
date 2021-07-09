<template>

	<!--=============================================新增修改床位弹框===================================-->
	<el-dialog v-model="isShowAddBed" title="新增床位">
		<el-form>
			<el-row>
				<el-col :span="8">
					<el-form-item label="床位编号" label-width="80px">
						<el-input disabled></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="2"></el-col>
				
				<el-col :span="9">
					<el-form-item label="床位名称" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			
			<el-row>
				<el-col :span="8">
					<el-form-item label="床位价格" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
				
				<el-col :span="2"></el-col>
				
				<el-col :span="9">
					<el-form-item label="床位状态" label-width="80px">
						<el-select v-model="isBedZT" placeholder="请选择">
						    <el-option
						      label="可入住"
						      value="value">
						    </el-option>
							<el-option
							  label="需维修"
							  value="item.value">
							</el-option>
						  </el-select>
					</el-form-item>
				</el-col>
			</el-row>
			
			<el-row>
				<el-col :span="8">
					<el-form-item label="管理护士" label-width="80px">
						<el-select v-model="isBedZT" placeholder="请选择">
						    <el-option
						      label="张三"
						      value="vale">
						    </el-option>
							<el-option
							  label="李四"
							  value="item.value">
							</el-option>
						  </el-select>
					</el-form-item>
				</el-col>
				
				<el-col :span="2"></el-col>
				
				<el-col :span="9">
					<el-form-item label="所属科室" label-width="80px">
						<el-input></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		
		<template #footer>
				<el-button @click="addEmp('empFrom')" type="primary">确定</el-button>
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
		 <el-input @blur="wardArrInit" v-model="wardSearchText"></el-input>
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
          height="345px"
          :header-cell-style="{background:'#000', color:'#fff'}"
          @cell-click="wardClickBedObj"
          :data="wardArr.slice((wardCurrentPage-1)*wardPageSize,wardCurrentPage*wardPageSize)"
          style="width: 100%"
          @selection-change="handleSelectionChange">
       <el-table-column label="病房管理" align="center">
         <el-table-column
             label="病房编号"
             prop="wdId">
         </el-table-column>
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


        <el-table-column width="100px"
                         align="right">
          <template  #header>
            <el-button @click.stop="openWardTk(1)" type="primary" size="mini">新增病房</el-button>
          </template>
          <template  #default="r">
            <el-button @click.stop="openWardTk(2,r.row)" size="mini">修改</el-button>
          </template>
        </el-table-column>

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




  <el-row >
    <el-col :offset="19" :span="4">
      <el-select v-model="isBedZT" placeholder="请选择查看">
        <el-option
            label="本科室"
            value="vale">
        </el-option>
        <el-option
            label="所有科室"
            value="item.value">
        </el-option>
        <el-option
            label="骨科"
            value="vale">
        </el-option>
        <el-option
            label="耳鼻喉科"
            value="vale">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
	
	
	<!--=============================================床位信息表格===================================-->
	<el-row>
		<el-col>
			<el-table
			    ref="multipleTable"
          :data="bedArr.slice((bedCurrentPage-1)*bedPageSize,bedCurrentPage*bedPageSize)"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <el-table-column align="center" label="病床管理" >
            <el-table-column
                label="病床编号"
                prop="bdId"
            >
            </el-table-column>
            <el-table-column
                prop="bdName"
                label="床位名称">
            </el-table-column>
            <el-table-column
                prop="bdIs"
                label="床位状态">
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

          </el-table-column>

				<el-table-column width="230px"
				      align="right">
					   <template  #header>
					  <el-row>
						  <el-col :span="14">
							    <el-input
							      v-model="fromSearch"
                    prefix-icon="el-icon-search"
							      size="small"
							      placeholder="病床名称"/>
						  </el-col>
						  <el-col :span="1"></el-col>
						  <el-col :span="5">
                <el-button size="mini" type="primary">新增床位</el-button>
						  </el-col>
					  </el-row>
				      </template>
					  <template  #default="r">
					    <el-button size="mini">修改</el-button>
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
</template>

<script>
  import qs from "qs"
	export default{
		data(){
			return{
			  wardSearchText:'',//病房搜索值
				isShowAddBed:false,//病床弹框是否显示
				isBedZT:'',

        //病房
        wardObj:{//病房对象
            // wdId:'',//病房编号
            // wdName:'',//病房名称
            // ksId:'',//科室编号
            // sId:'',//员工编号
            // listBed:[//病床数组
            //
            // ],
            // staff:{}//员工对象
        },
        wardArr:[//病房集合
        ],
        isWradShow:false,//是否显示新增或者修改病房弹框
        titleWard:'',//新增或者修改病床弹框标题
        wardCurrentPage:1,//病房分页当前页初始化
        wardPageSize:4,//病房分页页数初始化


        //科室
        xzKsId:'',//选择科室编号
        ksArr:[//科室集合

        ],

        //员工
        xzStaffId:'',//选择员工编号
        staffArr:[//员工集合

        ],

        //病床
        bedObj:{//病床对象
          bdId:'',
          bdName:'',
          wdId:'',
          bdPrice:'',
          bdIs:'',
          ptNo:''
        },
        bedArr:[//病床数组

        ],
        bedCurrentPage:1,//病房分页当前页初始化
        bedPageSize:4//病房分页页数初始化
			}
		},
		methods:{
			wardArrInit(){
			  this.axios({url:"zyWard",params:{search:this.wardSearchText}}).then((v)=>{//查询所有病房
			    console.log(v.data)
            this.wardArr = v.data;
        }).catch((data)=>{

        });

        this.axios.post("ks-list").then((v)=>{//查询所有科室
          console.log(v.data);
          this.ksArr = v.data;
        }).catch((data)=>{

        });
      },
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
      },


      //点击病房表格将病房表格数据放入病床表格方法
      wardClickBedObj(row){
        this.bedArr = row.listBed;
      }
		},
    created() {
		  this.wardArrInit();
    }
  }
</script>

<style>
	.works{
		padding: 15px;
	}
	.el-dialog__body{
		padding: 20px 60px;
		padding-left:100px ;
		text-align: center;
	}
  .el-table__row:hover>td{
    cursor: pointer;
    background-color: #D2FFF0!important
  }
  .el-table__body tr.current-row>td{
    background-color: #D2FFF0!important
    /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
  }
</style>
