<template >
  <el-row class="row-one">
    <el-col :span="24">
      病人信息：<el-input class="ss-br-xx" @input="getData" v-model="seach" placeholder="请输入你要查询的病人" ></el-input>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
      <el-button  @click="drawer = true" style="margin-left: 500px" type="primary">手术室管理</el-button>
    </el-col>
  </el-row>
  <el-drawer
      title="手术室管理"
      size="600px"
      v-model="drawer"
      :direction='direction'
      :before-close="handleClose">
    <el-button   style="margin-left: 500px" @click="sssEdit('',1)" type="primary">新增</el-button>
    <el-table
        size="mini"
        :data="room"
        style="width:600px"
        height="450px"
    >
      <el-table-column
          label="编号"
          prop="operationName">
        <template #default="scope">
          <el-popover effect="light" trigger="hover"  placement="top">
            <template #default>
              <p>地址: {{ scope.row.operationRoomAddress }}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.operationName }}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
          prop="operationType"
          label="类别">
      </el-table-column>
      <el-table-column
          prop="deptks.ksName"
          label="科室">
      </el-table-column>
      <el-table-column
          prop="baseResultMap.sname"
          label="负责人">
      </el-table-column>
      <el-table-column
          prop="operationZt"
          label="状态">
        <template #default="scope">
          <div class="name-wrapper">
            <el-tag :type="scope.row.operationZt==0?'success':(scope.row.operationZt==1?'warning':'info')" size="medium">{{ scope.row.operationZt==0?'空闲':(scope.row.operationZt==1?'忙':'停用') }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template #default="scope">
          <el-button
              size="mini"
              type="primary"

              @click="sssEdit(scope.row)">修改</el-button>
          <el-button
              size="mini"
              type="danger"
              v-show="scope.row.operationZt!=2"
              @click="opensss(scope.row,2)">停用</el-button>
          <el-button
              size="mini"
              type="success"
              v-show="scope.row.operationZt==2"
              @click="opensss(scope.row,0)">启用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <span style="font-size:12px">(1)Ⅰ类手术间：即无菌净化手术间，主要接受颅脑、心脏、脏器移植等手术。
    (2)Ⅱ类手术间：即无菌手术间，主要接受脾切除手术、闭合性骨折切开复位术、眼内手术、甲状腺切除术等无菌手术。
    (3)Ⅲ类手术间：即有菌手术间，接受胃、胆囊、肝、阑尾、肾、肺等部位的手术。
    (4)Ⅳ类手术间：即感染手术间，主要接受阑尾穿孔腹膜炎手术、结核性脓肿、脓肿切开引流等手术。
    (5)Ⅴ类手术间：即特殊感染手术间，主要接受绿脓杆菌、气性坏疽杆菌、破伤风杆菌等感染的手术。</span>

  </el-drawer>

  <el-dialog width="40%" :title='stit' v-model="sss">
    <el-form>
      <el-row>
        <el-col :span="10">
          <el-form-item label="编号：" label-width="120px">
            <el-input v-model="ssr.operationName" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :offset="1" :span="10">
          <el-form-item label="科室:" label-width="120px">
            <el-select v-model="ssr.ksId" placeholder="请选择">
              <el-option
                  v-for="item in department"
                  :key="item.value"
                  :label="item.ksName"
                  :value="item.ksId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="类别：" label-width="120px">
            <el-select v-model="ssr.operationType" placeholder="请选择">
              <el-option
                  v-for="item in ssml"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :offset="1" :span="10">
          <el-form-item label="负责人:" label-width="120px">
            <el-select v-model="ssr.sid" placeholder="请选择">
              <el-option
                  v-for="item in staf"
                  :key="item.value"
                  :label="item.sname"
                  :value="item.sid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21">
          <el-form-item label="地址：" label-width="120px">
            <el-input v-model="ssr.operationRoomAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-col :span="1" :offset="11">
          <el-button type="primary" @click="ssmForm()">确定</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-row>
    <el-col :span="6">
      结果：<span>{{sApply.length}}</span>条
    </el-col>
  </el-row>
  <el-row >



    <!--=====================================================================重新选择手术弹框======================-->

    <el-dialog title="手术项目" v-model="cxxzss">
      <el-row >
        <el-table
            :data="sproject"
            tooltip-effect="dark"
            height="400"
            size="mini"
            ref="ssdata"
            style="width: 100%">
          <el-table-column
              label="编号"
              prop="projectNumber"
          >
          </el-table-column>
          <el-table-column
              prop="projectName"
              label="手术名称">
          </el-table-column>
          <el-table-column
              prop="projectType"
              label="手术类型">
          </el-table-column>
          <el-table-column
              prop="projectPay"
              label="手术价格">
          </el-table-column>
          <el-table-column
              prop="ksName"
              label="科室">

          </el-table-column>
          <el-table-column
              prop="projectPosition"
              label="开刀位置">
          </el-table-column>
          <el-table-column width="150px" align="right">
            <template  #header>
              <el-input
                  @input="getData"
                  v-model="input"
                  prefix-icon="el-icon-search"
                  size="small"
                  placeholder="项目搜索"/>
            </template>
            <template #default="scope">
              <el-button size="mini" type="primary" @click="xzss(scope.row)">选择</el-button>
            </template>

          </el-table-column>
        </el-table>

      </el-row>
    </el-dialog>





    <!-- 选择员工弹框-->
    <el-dialog title="选择员工" v-model="dialogVisible" width="30%" >
      <el-form>
        <el-row>
          <el-col :span="20">
            <el-form-item label="主刀医生:" label-width="120px">
              <el-select v-model="ssApply.operationDoctor" placeholder="请选择">
                <el-option
                    v-for="item in sta1"
                    :key="item.value"
                    :label="item.sname"
                    :value="item.sid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="麻醉师:" label-width="120px">
              <el-select v-model="ssApply.operationAnathe" placeholder="请选择">
                <el-option
                    v-for="item in sta2"
                    :key="item.value"
                    :label="item.sname"
                    :value="item.sid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="助手:" label-width="120px">
              <el-select v-model="ssApply.operationHelper" placeholder="请选择">
                <el-option
                    v-for="item in sta3"
                    :key="item.value"
                    :label="item.sname"
                    :value="item.sid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveGrant()">确 定</el-button>
			</span>
      </template>
    </el-dialog>


    <!-- ====================================================开始手术弹框 ====================================================================-->
    <el-dialog title="手术安排" v-model="apss">
      <el-form ref="ssap" :rules="rulesa" :model="ssap" label-width="100px" class="">
        <el-row style="color: red;">
          病人信息
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="病人姓名:" label-width="80px">
              <el-input readonly="readonly" size="mini"  v-model="ssApply1.ptname"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="4">
            <el-form-item label="床号:" label-width="60px">
              <el-input readonly="readonly" size="mini" v-model="ssApply1.ptcno"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="8">
            <el-form-item label="身份证:" label-width="60px">
              <el-input readonly="readonly" size="mini" v-model="ssApply1.sidc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="color: red;">
          申请信息
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="住院号:&emsp;" label-width="80px">
              <el-input readonly="readonly" size="mini" v-model="ssApply.ptNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="7">
            <el-form-item  label="术前诊断:" label-width="80px">
              <el-input readonly="readonly" size="mini" v-model="ssApply1.ptryzd"></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1"  :span="7">
            <el-form-item label="手术室:&emsp;" label-width="80px" prop="ssrname">
              <el-input readonly="readonly" size="mini" v-model="ssApply1.ssrname" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="主治医生:" label-width="80px">
              <el-input readonly="readonly" size="mini" v-model="ssApply1.zddc"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="7">
            <el-form-item label="拟施手术:" label-width="80px">
              <el-input  readonly="readonly" size="mini"  v-model="ssApply.simulationOperation"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="10">
            <el-form-item label="拟施日期:" label-width="80px">
              <el-input readonly="readonly" size="mini" v-model="ssApply.simulationTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="color: red;">
          手术信息
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="手术名称:" label-width="80px">
              <el-input readonly="readonly" size="mini" v-model="ssApply1.ssname"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="8">
            <el-form-item label="" label-width="100px">
              <el-button size="mini" @click="ksEdit" type="primary">重新选择手术</el-button>
            </el-form-item>
          </el-col>
          <el-col  :span="4">
            <el-form-item label="" label-width="100px">
              <el-button size="mini" @click="dialogVisible=true" v-show="ssApply.operationHelper==''||ssApply.operationAnathe==''||ssApply.operationDoctor==''" type="primary">选择医生</el-button>
              <el-button  size="mini"  @click="dialogVisible=true" v-show="ssApply.operationHelper!=''&&ssApply.operationAnathe!=''&&ssApply.operationDoctor!=''" type="success">已选择</el-button>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="所需麻醉:" prop="changeId"  label-width="80px">
              <el-select size="mini" v-model="ssApply.changeId" placeholder="请选择" style="width: 120px;">
                <el-option
                    v-for="item in mzproject"
                    :key="item.anaesthesiaId"
                    :label="item.operationAnaesthesia"
                    :value="item.anaesthesiaId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8">
            <el-form-item label="麻醉药品:" label-width="90px" prop="mzyp">
              <el-input readonly="readonly" size="mini" v-model="ssApply1.mzyp"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row >
        <el-tabs v-model="activeName">
          <el-tab-pane style="width:730px" label="手术室选择" name="first">
            <el-table
                size="mini"
                :data="room1"
                height="200px"
            >
              <el-table-column
                  label="编号"
                  prop="operationName">
                <template #default="scope">
                  <el-popover effect="light" trigger="hover"  placement="top">
                    <template #default>
                      <p>地址: {{ scope.row.operationRoomAddress }}</p>
                    </template>
                    <template #reference>
                      <div class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.operationName }}</el-tag>
                      </div>
                    </template>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                  prop="operationType"
                  label="类别">
              </el-table-column>
              <el-table-column
                  prop="deptks.ksName"
                  label="科室">
              </el-table-column>
              <el-table-column
                  prop="baseResultMap.sname"
                  label="负责人">
              </el-table-column>
              <el-table-column
                  prop="operationZt"
                  label="状态">
                <template #default="scope">
                  <div class="name-wrapper">
                    <el-tag :type="scope.row.operationZt==0?'success':(scope.row.operationZt==1?'warning':'info')" size="medium">{{ scope.row.operationZt==0?'空闲':(scope.row.operationZt==1?'忙':'停用') }}</el-tag>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150px">
                <template #default="scope">
                  <el-button
                      size="mini"
                      type="primary"
                      @click="ssstk(scope.row)">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- ==================================================================麻醉表格 ==================================================================-->

          <el-tab-pane style="width:730px"  label="麻醉选择" name="second">
            <el-table
                size="mini"
                :data="tableData"
                height="200px"
                style="width: 100%">
              <el-table-column
                  label="药品名称"
                  prop="drugName">
              </el-table-column>
              <el-table-column
                  label="药品类别"
                  prop="yfDrugcategory.yfDrcaName">
              </el-table-column>
              <el-table-column
                  label="药品功效"
                  prop="drugRemark">
              </el-table-column>
              <el-table-column
                  label="处方药"
                  prop="drugPrescription">
                <template #default="scope">
                  {{scope.row.drugPrescription == 1?'处方药':'非处方药'}}
                </template>
              </el-table-column>
              <el-table-column
                  label="操作">
                <template #default="scope">
                  <el-button type="primary" plain size="mini" @click="ypEdit(scope.row)">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>


      </el-row>
      <el-row>
        <el-col :span="3" :offset="11">
          <el-button type="primary" @click="apssForm('ssap')">开始</el-button>
        </el-col>
      </el-row>
    </el-dialog>




    <!--=====================================================================结束手术弹框======================-->

    <el-dialog title="手术结果" width="45%" v-model="jsss">
      <el-form  label-width="100px">
        <el-row >
          <el-col  :span="8">
            <el-form-item label="住院号:" label-width="80px">
              <el-input v-model="ssjl.ptNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手术时长:" label-width="80px">
              <el-time-picker
                  v-model="sssc"
                  is-range
                  range-separator="To"
                  start-placeholder="Start time"
                  end-placeholder="End time"
              >
              </el-time-picker>
            </el-form-item>

          </el-col>

        </el-row>
        <el-row>
          <el-col  :span="7">
            <el-form-item label="术后处理:" label-width="80px">
              <el-input type="textarea" style="width: 570px"  v-model="ssjl.operationHandle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" :offset="11">
            <el-button type="primary" @click="qrjsForm()">确认</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>





    <!-- ====================================================表格                ==========================================-->
    <el-table
        ref="multipleTable"
        :data="sApply.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        tooltip-effect="dark"
        height="450"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          label="住院号"
          prop="ptNo"
      >
      </el-table-column>
      <el-table-column
          prop="ptdx.ptName"
          label="姓名">
        <template #default="scope" >
          <el-popover width="300" effect="light"   trigger="hover" placement="top">
            <template #default >
              <p>姓名: {{ scope.row.ptdx.ptName }}</p>
              <p>年龄: {{ scope.row.ptdx.ptAge }}</p>
              <p>性别: {{ scope.row.ptdx.ptSex }}</p>
              <p>电话: {{ scope.row.ptdx.ptIphone }}</p>
              <p>住址: {{ scope.row.ptdx.ptHomeAdder }}</p>
            </template>
            <template #reference>
              <div class="name-wrapper">
                <el-tag size="medium">{{ scope.row.ptdx.ptName }}</el-tag>
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
          prop="ptdx.ptDiagnoseName"
          label="术前诊断">
      </el-table-column>
      <el-table-column
          prop="simulationOperation"
          label="拟施手术">
      </el-table-column>
      <el-table-column
          prop="simulationTime"
          label="拟施日期">
      </el-table-column>
      <el-table-column
          prop="ptdx.staff.sname"
          label="主治医师">
      </el-table-column>
      <el-table-column label="操作" width="220px">
        <template #default="scope">
          <el-button size="mini" type="primary" @click="apssEdit(scope.row)"  v-show="scope.row.applyZt==0">开始</el-button>
          <el-button style="margin-left: 0px" size="mini" type="success" :loading="true" v-show="scope.row.applyZt==1">手术中</el-button>
          <el-button size="mini" type="warning" @click="jsssForm(scope.row)" v-show="scope.row.applyZt==1">结束</el-button>
          <el-button v-show="scope.row.applyZt!=1" size="mini" type="danger" @click="applyDelete(scope.row)" >取消申请</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页插件-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[2,4,6,8,10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="sApply.length">
    </el-pagination>
  </el-row>

</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      sta1:[],//员工主刀1
      sta2:[],//麻醉师2
      sta3:[],//护士3
      dialogVisible:false,
      funs:[],//员工
      currentPage: 1, //初始页
      pagesize:10, //    每页的数据
      mzproject:[],//单个项目所选麻醉
      tableData: [],//麻醉药品
      input:'',//手术搜索
      cxxzss:false,//重新选择手术弹框
      props: {
        id:'sid',
        label: 'sname',
        children: 'dept.deName'
      },
      ssApply:{//手术申请对象
        applyId:'',
        ptNo:'',
        simulationOperation:'',
        simulationTime:'',
        sId:'',
        projectId:'',
        changeId:'',
        operationId:'',
        hocusId:'',
        operationDoctor:'',
        operationAnathe:'',
        operationHelper:'',
        applyZt:'',
      },
      ssApply1:{//手术安排对象
        ssname:'',
        ptname:'',
        ptcno:'',
        ptryzd:'',
        sidc:'',
        zddc:'',
        mzyp:'',
        ssrname:''
      },
      // 安排手术卡片
      activeName: 'first',
      loading: true,
      url: '../static/img/login.gif',
      seach:'',//手术申请搜索
      staf:[],//员工
      department:[],//科室
      sproject:[],//手术集合
      stit:'',//手术室弹框标题
      sss:false,//手术室弹框
      room:[],//手术室集合
      room1:[],//开始手术时选择手术室
      drawer: false,
      direction: 'ltr',//抽屉方向
      textarea:"",
      price:0,//手术费用
      price1:0,//手术费用
      sApply:[],//手术申请集合
      ckArr:0,
      apss: false,
      jsss:false,//结束手术弹框
      centerDialogVisible: false,
      currentPage3:5,

      ssml:[{
        text:'Ⅰ类手术间',
        value:'Ⅰ类手术间'
      },{
        text:'Ⅱ类手术间',
        value:'Ⅱ类手术间'
      },{
        text:'Ⅲ类手术间',
        value:'Ⅲ类手术间'
      },{
        text:'Ⅳ类手术间',
        value:'Ⅳ类手术间'
      },{
        text:'Ⅴ类手术间',
        value:'Ⅴ类手术间'
      }
      ],
      sssc:'',//时间model
      ssrq:{//手术室dx
        operationId:'',
        operationName:'',
        operationZt:0,
        operationRoomAddress:'',
        operationType:'',
        ksId:'',
        sid:''
      },
      ssjl:{//手术记录dx
        operationNum:'',
        operationTime:'',
        operationDate:'',
        projectId:'',
        operationHandle:'',
        operationHocus:'',
        operationDoctor:'',
        operationAnathe:'',
        operationHelper:'',
        ptNo:'',
        simulationOperation:'',
        hocusId:''
      },
      ssr:{//手术室dx
        operationId:'',
        operationName:'',
        operationZt:0,
        operationRoomAddress:'',
        operationType:'',
        ksId:'',
        sid:''
      }
    };
  },
  methods: {
    //手术室基础参数
    getData() {
      // 查询员工
      this.axios.get("selectall-staff").then((res)=>{
        this.funs = res.data
      }).catch()
      // this.axios.get('add-sch').then((v)=>{
      //   this.funs=v.data
      // }).catch()
      //查询麻醉药
      this.axios.post("http://localhost:8089/yp-ss").then((res)=>{
        this.tableData = res.data;
      }).catch()
      //查询手术
      this.axios.get("http://localhost:8089/allDescSpro1",{params:{input:this.input}}).then((res)=>{
        this.sproject = res.data;
      }).catch()
      //所有手术室
      this.axios.get("http://localhost:8089/sssRoom").then((res) => {
        this.room = res.data;
      }).catch()
      //所有空闲手术室（安排用）
      this.axios.get("http://localhost:8089/sssRoom",{params: {seach:0}}).then((res) => {
        this.room1 = res.data;
      }).catch()
      //所有手术申请
      this.axios.get("http://localhost:8089/sssApply",{params: {seach:this.seach}}).then((res) => {
        this.sApply = res.data;
      }).catch()
      //科室
      this.axios.get("http://localhost:8089/ks-list").then((res)=>{
        this.department = res.data;
      }).catch()
      //员工
      this.axios.get("http://localhost:8089/staff-ks",{params: {id:4}}).then((res)=>{
        this.staf = res.data;
      }).catch()
      //主刀
      this.axios.get("http://localhost:8089/staff-t",{params: {id:3}}).then((res)=>{
        this.sta1 = res.data;
      }).catch()
      // 麻醉师
      this.axios.get("http://localhost:8089/staff-t",{params: {id:1}}).then((res)=>{
        this.sta2 = res.data;
      }).catch()
      //护士
      this.axios.get("http://localhost:8089/staff-t",{params: {id:9}}).then((res)=>{
        this.sta3 = res.data;
      }).catch()
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize) //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage) //点击第几页
    },
    //抽屉关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    //选择手术确认
    xzss(row){
      this.ssApply.projectId=row.projectId,
      this.ssApply1.ssname=row.projectName,
          console.log(row.projectPay)
      this.price=this.price1-row.projectPay
      console.log(this.price)
          this.axios.get("http://localhost:8089/mzprot",{params:{projectId:this.ssApply.projectId}}).then((res)=>{
            this.mzproject = res.data;
          }).catch()
      this.cxxzss=false
    },
    //开始手术弹框
    apssEdit(row){
      if(row!=''){
        this.ssApply1.ssname=row.simulationOperation
        this.ssApply1.ptname=row.ptdx.ptName
        this.ssApply1.ptcno=row.ptdx.bdId
        this.ssApply1.ptryzd=row.ptdx.ptDiagnoseName
        this.ssApply1.sidc=row.ptdx.ptCapacityNo
        this.ssApply1.zddc=row.ptdx.staff.sname

        this.ssApply.applyId=row.applyId
        this.ssApply.projectId=row.projectId
        this.ssApply.simulationOperation=row.simulationOperation
        this.ssApply.simulationTime=row.simulationTime
        this.ssApply.ptNo=row.ptdx.ptNo
        this.ssApply.sId=row.ys.sid

        this.price1=row.ptdx.ptPrice
      }
      let aa=0;

      this.axios.get("http://localhost:8089/mzprot",{params:{projectId:this.ssApply.projectId}}).then((res)=>{
        this.mzproject = res.data;
      }).catch()
      this.axios.get("http://localhost:8089/ssprot",{params:{projectId:this.ssApply.projectId}}).then((res)=>{
        var ww=0;
        res.data.forEach(function(x){
          ww=x.projectPay
        });
        console.log(ww)
        this.price=row.ptdx.ptPrice-ww
        console.log(this.price)
      }).catch()
      this.apss=true;
    },
    //手术安排弹框确认按钮
    apssForm(formName) {
      this.ssApply.applyZt=1
      if(this.ssApply.operationHelper==''||this.ssApply.operationAnathe==''||this.ssApply.operationDoctor==''){
        this.$message({
          type: 'warning',
          message: '请选择手术人员'
        });
      }else if(this.ssApply.changeId==''){
        this.$message({
          type: 'warning',
          message: '请选择麻醉方式'
        });
      } else if(this.ssApply1.ssrname==''){
        this.$message({
          type: 'warning',
          message: '请选择手术室'
        });
      }else if(this.ssApply1.mzyp==''){
        this.$message({
          type: 'warning',
          message: '请选择麻醉药品'
        });
      }else {
        this.apss = false
        //修改手术申请
        this.axios.post("http://localhost:8089/aOrUApply",{proj:this.ssApply}).then((res)=>{
        }).catch()
        //修改费用
        this.axios.post("http://localhost:8089/upd-pricess",qs.stringify({price:this.price,ptNo:this.ssApply.ptNo})).then((res)=>{
        }).catch()
        //修改手术室
        this.axios.post('http://localhost:8089/upd-roomzt', qs.stringify({operationZt:1,operationId:this.ssApply.operationId}))
            .then((v)=>{
              if(v.data == 'ok'){
                this.getData()
              }else{
                alert(v.data);
              }
            }).catch(function(){
        })
        this.$refs[formName].resetFields();
      }

    },
    // 删除手术申请
    applyDelete(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post('http://localhost:8089/delet-ssap', qs.stringify({applyId:row.applyId}))
            .then((v)=>{
              if(v.data == 'ok'){
                this.getData()
              }else{
                alert(v.data);
              }
            }).catch(function(){

        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 选择员工确认
    saveGrant(){
      this.dialogVisible=false
    },
    //结束弹框确认
    jsssForm(row) {
      this.ssjl.ptNo=row.ptNo
      this.ssjl.operationDate=this.getNowFormatDate()
      this.ssjl.projectId=row.projectId
      this.ssjl.operationHocus=row.changeId
      this.ssjl.hocusId=row.hocusId
      this.ssjl.simulationOperation=row.simulationOperation

      this.ssApply.applyId=row.applyId
      this.ssApply.projectId=row.projectId
      this.ssApply.simulationOperation=row.simulationOperation
      this.ssApply.simulationTime=row.simulationTime
      this.ssApply.ptNo=row.ptdx.ptNo
      this.ssApply.sId=row.ys.sid
      this.ssApply.changeId=row.changeId
      this.ssApply.operationId=row.operationId
      this.ssApply.hocusId=row.hocusId
      this.ssjl.operationDoctor=row.operationDoctor
      this.ssjl.operationAnathe=row.operationAnathe
      this.ssjl.operationHelper=row.operationHelper

      this.jsss = true
    },
    //时间格式化
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
    //确认结束按钮
    qrjsForm(){
      console.log(this.ssjl)
      //格式化时间
      var sj=this.formatDate(this.sssc[0],'hh:mm:ss').toString()+"-"+this.formatDate(this.sssc[1],'hh:mm:ss').toString()
      this.ssjl.operationTime=sj

      this.ssApply.applyZt=3
      //修改手术申请状态
      this.axios.post("http://localhost:8089/aOrUApply",{proj:this.ssApply}).then((res)=>{
        this.getData();
      }).catch()
      //修改手术室状态
      this.axios.post('http://localhost:8089/upd-roomzt', qs.stringify({operationZt:0,operationId:this.ssApply.operationId}))
          .then((v)=>{
            if(v.data == 'ok'){
              this.getData()
            }else{
              alert(v.data);
            }
          }).catch(function(){
      })
      //修改手术记录
      this.axios.post("http://localhost:8089/aOrUDatils",{proj:this.ssjl}).then((res)=>{
        this.getData();
      }).catch()

      this.jsss=false
    },
    //重新选择手术弹框
    ksEdit(){
      this.cxxzss=true;
    },
    //重新选择手术室框
    ssstk(row){
      this.ssApply1.ssrname=row.operationName
      this.activeName='second'
      this.ssApply.operationId=row.operationId
    },
    //重新选择药品
    ypEdit(row){
      this.ssApply1.mzyp=row.drugName
      this.ssApply.hocusId=row.drugId
    },
    //打开新增修改手术室
    sssEdit(row,is) {
      this.stit = is == 1 ? '新增手术室' : '修改手术室';//设置弹框标题
      if(row!=''){
        this.ssr.operationId=row.operationId
        this.ssr.operationName=row.operationName
        this.ssr.operationZt=row.operationZt
        this.ssr.operationRoomAddress=row.operationRoomAddress
        this.ssr.operationType=row.operationType
        this.ssr.ksId=row.ksId
        this.ssr.sid=row.sid
      }else{
        //清空弹框
        this.ssr= {};
        let aa=new Date().getFullYear()+new Date().getDay();
        this.ssr.operationName=("SM"+aa+Math.round(Math.random()*1000))
      }

      this.sss = true
    },
    //获取当前时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator = ":";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hour = date.getHours ();//状取兰刖时回的时
      var minute = date.getMinutes() ; //获取当前时间的分
      var second = date.getSeconds() ; //获取当前时间的秒
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var showTime = year+seperator1+month+seperator1+strDate+" "+hour+seperator+minute+seperator+second;
      return showTime;
    },
    //手术室弹框确认
    ssmForm(){
      console.log(this.ssr)
      this.axios.post("http://localhost:8089/aOrUroom",{proj:this.ssr}).then((res)=>{
        this.getData();
      }).catch()
      this.sss=false
    },
    //手术室状态更改
    opensss(row,is) {
      let aa= is == 2 ? '停用' : '启用';
      this.$confirm('是否确认'+aa+'?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //调用更改方法
        this.sssEdit1(row,is);
        this.$message({
          type: 'success',
          message: '成功'+aa
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'+aa
        });
      });
    },
    //修改手术室状态
    sssEdit1(row,is){
      this.axios.post('http://localhost:8089/upd-roomzt', qs.stringify({operationZt:is,operationId:row.operationId}))
          .then((v)=>{
            if(v.data == 'ok'){
              this.getData()
            }else{
              alert(v.data);
            }
          }).catch(function(){
      })
    }
  },created() {
    this.getData()
  }
};
</script>

<style scoped>
.qq{
  margin-top: 8px;
}
.works{
  padding: 15px;
}
.ss-br-xx{
  padding-top: 5px;
  width: 200px;
}
</style>
