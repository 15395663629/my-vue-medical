<template>
  <el-row>
    <el-form style="padding-top: 10px">
      <el-col :span="19">
      <el-form-item  label="人员信息:" label-width="100px">
           <el-input class="myin" @input="getData"  v-model="sermen1" placeholder="请输入你要查询的记录" ></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="5" label-width="220px">
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-col>
    </el-form>

  </el-row>
      <!--=============================================已出结果检查人员表单表格===================================-->
      <el-row>
        <el-col>
          <el-table :data="tjman1.slice((currentPage1-1)*pagesize1,currentPage1*pagesize1)" height="450"  tooltip-effect="dark" style="width: 100%;">
            <el-table-column
                label="编号"
                prop="manId"
            >
            </el-table-column>
            <el-table-column
                prop="manName"
                label="姓名">
              <template #default="scope">
                <el-popover effect="light" trigger="hover"  placement="top">
                  <template #default>
                    <p>姓名: {{ scope.row.manName }}</p>
                    <p>年龄: {{ scope.row.manAge }}</p>
                    <p>出生日期: {{ scope.row.manBirthtime }}</p>
                  </template>
                  <template #reference>
                    <div class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.manName }}</el-tag>
                    </div>
                  </template>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
                width="60"
                prop="manGender"
                label="性别">
            </el-table-column>
            <el-table-column
                prop="manPhone"
                label="手机号">
            </el-table-column>
            <el-table-column
                width="200"
                prop="manSid"
                label="身份证">
            </el-table-column>
            <el-table-column
                prop="manPhy"
                label="价格">
            </el-table-column>
            <el-table-column
                prop="manTime"

                label="体检时间">
            </el-table-column>
            <el-table-column
                width="220px"
                label="操作">
              <template #default="scope">
                <el-button size="mini" @click="tjjlEdit(scope.row)" type="primary" plain>查看</el-button>
              </template>
            </el-table-column>

          </el-table>
          <!--分页插件-->
          <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="1"
              :page-sizes="[2,4,6,8,10]"
              :page-size="pagesize1"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tjman1.length">
          </el-pagination>
        </el-col>
      </el-row>
	<el-dialog title="" v-model="tjjl" width="50%" center  ><!-- 弹窗     -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-检查结果 -->
    <el-button style="margin-right:200px" type="primary"  v-print='"no"'><i class="el-icon-printer"></i></el-button>
    <div id="no">
      <span style="font-size: 23px;margin-left: 300px">检查结果</span>
      <hr>
    <el-form label-width="100px">
			<el-row>
								<el-col :span="6">
									<el-form-item label="体检人:" prop="name" >
                    <span v-for="(t,i) in tjjg.slice(0,1)" >{{t.man.manName}}</span>
									</el-form-item>
								</el-col>
								<el-col :span="6" :offset="4">
									<el-form-item label="年龄:" prop="name">
                    <span v-for="(t,i) in tjjg.slice(0,1)" >{{t.man.manAge}}</span>
									</el-form-item>
								</el-col>
			</el-row>
			  <el-row>
					<el-col :span="6">
						<el-form-item label="性别:" prop="name">
              <span v-for="(t,i) in tjjg.slice(0,1)" >{{t.man.manGender}}</span>
						</el-form-item>
					</el-col>
					<el-col :span="9" :offset="4">
						<el-form-item label="身份证:" prop="name">
              <span v-for="(t,i) in tjjg.slice(0,1)" >{{t.man.manSid}}</span>
						</el-form-item>
					</el-col>
			  </el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item label="出生日期:" prop="name">
            <span v-for="(t,i) in tjjg.slice(0,1)" >{{t.man.manBirthtime}}</span>
					</el-form-item>
					</el-col>
					<el-col :span="6" :offset="4">
						<el-form-item label="体检日期:" prop="name">
              <span v-for="(t,i) in tjjg.slice(0,1)" >{{t.man.manTime}}</span>
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item label="价格:" prop="name">
            <span v-for="(t,i) in tjjg.slice(0,1)" >{{t.man.manPhy}}</span>
					</el-form-item>
				</el-col>
				<el-col :span="8" :offset="4">
					<el-form-item label="手机号:" prop="name">
            <span v-for="(t,i) in tjjg.slice(0,1)" >{{t.man.manPhone}}</span>
					</el-form-item>
				</el-col>
			</el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="结束时间:" prop="name">
            <span v-for="(t,i) in tjjg.slice(0,1)" >{{t.manDate}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <hr>
      <el-table :data="tjjg">
        <el-table-column
            width="150px"
            prop="pro.checkName"
            label="检查项目">
        </el-table-column>
        <el-table-column
            prop="manResult"
            label="检查结果">
        </el-table-column>
        <el-table-column
            width="100px"
            prop="staff.sname"
            label="检查人员">
        </el-table-column>
        <el-table-column
            prop="manProposal"
            label="医生建议">
        </el-table-column>
      </el-table>
		</el-form>
    </div>
	</el-dialog>

  <el-dialog title="填写检查结果" v-model="txjg" width="40%" center  ><!-- 弹窗  新增   -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-检查结果填写 -->
    <span v-for="(t,i) in aloneg" >{{t.checkName}}:<el-input  v-model="t.tjCodeIndex"></el-input></span>
    <span style="color: red">医生建议：<el-input v-model="manProposal"  type="textarea"> </el-input></span>
    <el-row>
      <el-col :span="2" :offset="10">
        <el-button type="primary" style="margin-top: 20px" @click="txjgForm">确定</el-button>
      </el-col>
    </el-row>

  </el-dialog>

</template>

<script>
	import qs from "qs";

  export default {
	    data () {
	      return {

	        txjg:false,//填写结果弹框
	        tjjg:[],//结果
          aloneg:[],
          Res:[],//单结果集合
          jg:[],
          manId:'',//新增结果字段
          manProposal:'',//新增结果字段医生建议
          currentPage: 1, //1初始页
          pagesize: 10, //    1每页的数据
          currentPage1: 1, //2初始页
          pagesize1: 10, //    2每页的数据
          manState:1,//状态
          sermen:'',//结果搜索未填
          sermen1:'',//结果搜索已填
	        //体检人员集合未填写结果
          tjman: [],
          //体检人员集合已填写结果
          tjman1: [],
	        //卡片modle
          activeName:'first',
          sfmy:"",
          tjry:[{
            ssId: '11',
            ssName: '20202',
            sscard: ' 15183456789',
            ssbed: '复诊',
            sstime: '2121-2-2',
            ssdemo:'开颅',
          },
          {
            ssId: '12',
            ssName: '20202',
            sscard: ' 15183456789',
            ssbed: '复诊',
            sstime: '2121-2-1',
            ssdemo:'开膛'
          }],
          value: '',
          tjjl:false,
              radio1: '查看全部',
          }
        },
		methods: {
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize) //每页下拉显示数据
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        console.log(this.currentPage) //点击第几页
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange1: function (size) {
        this.pagesize1 = size;
        console.log(this.pagesize1) //每页下拉显示数据
      },
      handleCurrentChange1: function (currentPage) {
        this.currentPage1 = currentPage;
        console.log(this.currentPage1) //点击第几页
      },
      // 体检人员预约参数
      getData() {
        this.axios.get("http://localhost:8089/allMan", {
          params: {
            manState: this.manState,
            sermen: this.serman
          }
        }).then((res) => {
          this.tjman = res.data;
        }).catch()
        //已填写结果
        this.axios.get("http://localhost:8089/allMan2", {
          params: {
            sermen: this.sermen1
          }
        }).then((res) => {
          this.tjman1 = res.data;
        }).catch()
      },
      //检查结果填写弹框
      txjgAdd(row) {
        this.manId=row.manId
        //查询体检人员所含项目
        this.axios.get("http://localhost:8089/aloneMp", {params: {manId: row.manId}
        }).then((res) => {
          this.aloneg = res.data;
        }).catch()
        console.log(this.Res)
        this.txjg = true;
      },
      //确认填写结果
      txjgForm() {
        var aa=[];
        var bb=[];
        this.aloneg.forEach(v=>{
          this.Res.push({'checkId':v.checkId,manResult:v.tjCodeIndex,manId:this.manId})
        })
        //更改医生指导意见
        this.axios.post('http://localhost:8089/upd-manY', qs.stringify({manProposal:this.manProposal,manId:this.manId}))
            .then((v)=>{
              if(v.data == 'ok'){
              }else{
                alert(v.data);
              }
            }).catch(function(){
        })
        //改状态
        this.axios.post('http://localhost:8089/upde-tman', qs.stringify({manState:2,manId:this.manId}))
            .then((v)=>{
              if(v.data == 'ok'){
                // this.getData()
              }else{
                alert(v.data);
              }
            }).catch(function(){
        })
        //批量新增结果
        this.axios.post("http://localhost:8089/resAdd",{listArr:this.Res}).then((res)=>{
          this.getData();
        }).catch()
        this.txjg = false;
      },
      //卡片
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //检查结果
			tjjlEdit(row) {
        this.axios.get("http://localhost:8089/aloneRes", {params: {manId: row.manId}
        }).then((res) => {
          this.tjjg = res.data;
        }).catch()
				this.tjjl = true;
			},//检查结果详情关闭
			tjjlForm() {
				this.tjjl = false;
				this.$refs[formName].resetFields();
			}
		},created() {
      this.getData()
    },
	  }
</script>

<style>
</style>
