<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="检查结果" name="first">
      <!--=============================================体检人员表格===================================-->
      <el-row>
        <el-col>
          <el-table
              ref="multipleTable"
              :data="tjry"
              tooltip-effect="dark"
              height="530"
              style="width: 100%"
              @selection-change="handleSelectionChange">
            <el-table-column
                label="编号"
                prop="empId"
            >
            </el-table-column>
            <el-table-column
                prop="empName"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="empDate"
                label="性别">
            </el-table-column>
            <el-table-column
                prop="empSalary"
                label="健康等级">
            </el-table-column>
            <el-table-column
                prop="empSalary"
                label="身份证">
            </el-table-column>
            <el-table-column
                prop="empSalary"
                label="体检项目">
            </el-table-column>
            <el-table-column
                prop="empSalary"
                label="操作" width="200px">
              <template #default="scope">
                <el-button type="primary" plain size="mini"  @click="tjjlEdit(scope.$index, scope.row)">体检详情
                </el-button>
                <el-button size="mini"  type="primary">打印</el-button>
              </template>

            </el-table-column>

            <el-table-column width="320px"
                             align="right">
              <template  #header>
                <el-row>
                  <el-col :span="10">

                    <el-input
                        v-model="fromSearch"
                        prefix-icon="el-icon-search"
                        size="small"
                        placeholder="体检人员名称"/>

                  </el-col>
                </el-row>
              </template>
            </el-table-column>

          </el-table>
          <!--分页插件-->
          <el-pagination

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
    </el-tab-pane>
    <el-tab-pane label="结果填写" name="second">

      <!--=============================================体检人员表格===================================-->
      <el-row>
        <el-col>
          <el-table
              ref="multipleTable"
              :data="tjry"
              tooltip-effect="dark"
              height="530"
              style="width: 100%"
              @selection-change="handleSelectionChange">
            <el-table-column
                label="编号"
                prop="empId"
            >
            </el-table-column>
            <el-table-column
                prop="empName"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="empDate"
                label="性别">
            </el-table-column>
            <el-table-column
                prop="empSalary"
                label="健康等级">
            </el-table-column>
            <el-table-column
                prop="empSalary"
                label="身份证">
            </el-table-column>
            <el-table-column
                prop="empSalary"
                label="体检项目">
            </el-table-column>
            <el-table-column
                prop="empSalary"
                label="操作" width="200px">
              <template #default="scope">
                <el-button type="primary" size="mini"  @click="tjjlEdit(scope.$index, scope.row)">结果填写
                </el-button>
                <el-button size="mini"  type="primary">打印</el-button>
              </template>

            </el-table-column>

            <el-table-column width="320px"
                             align="right">
              <template  #header>
                <el-row>
                  <el-col :span="10">

                    <el-input
                        v-model="fromSearch"
                        prefix-icon="el-icon-search"
                        size="small"
                        placeholder="体检人员名称"/>

                  </el-col>
                </el-row>
              </template>
            </el-table-column>

          </el-table>
          <!--分页插件-->
          <el-pagination
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
    </el-tab-pane>
  </el-tabs>

	<el-dialog title="体检详情" v-model="tjjl" width="50%" center  ><!-- 弹窗      -=-=-=-=-=-=-==-=-=-=-=--=-=-=-=-=-=-体检人员表格 -->
		<el-form  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-row>
								<el-col :span="6">
									<el-form-item label="编号:" prop="name">
									35153
									</el-form-item>
								</el-col>
								<el-col :span="6" :offset="4">
									<el-form-item label="体检人:" prop="name">
									 阿斯弗
									</el-form-item>
								</el-col>
			</el-row>
			  <el-row>
					<el-col :span="6">
						<el-form-item label="性别:" prop="name">
						男
						</el-form-item>
					</el-col>
					<el-col :span="6" :offset="4">
						<el-form-item label="身份证:" prop="name">
						234567890
						</el-form-item>
					</el-col>
			  </el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item label="体检套餐:" prop="name">
						腹部
					</el-form-item>
					</el-col>
					<el-col :span="6" :offset="4">
						<el-form-item label="套餐价格:" prop="name">
						1234元
						</el-form-item>
					</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item label="健康等级:" prop="name">
						一级健康
					</el-form-item>
				</el-col>
				<el-col :span="6" :offset="4">
					<el-form-item label="体检时间:" prop="name">
					2021年4月3日
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="22">
					<el-form-item label="体检结果:" prop="name">
					　　1.一般检查：正常
					
					　　2.内科：正常
					
					　　3.眼科：左眼4.7，又眼5.0
					
					　　4.耳鼻喉科：双侧鼻腔充血
					
					　　5.空腹血糖
					</el-form-item>
				</el-col>
					
			</el-row>
			  <el-form-item>
				  <el-col :span="1" :offset="8">
				<el-button @click="tjjlForm('ruleForm')">确定</el-button>
				</el-col>
			  </el-form-item>
		</el-form>
	</el-dialog>
	
	

</template>

<script>
	export default {
	    data () {
	      return {
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
      handleClick(tab, event) {
        console.log(tab, event);
      },
			tjjlEdit(index, row) {
				this.tjjl = true;
			},
			tjjlForm() {
				this.tjjl = false;
				this.$refs[formName].resetFields();
			}
		}
	  }
</script>

<style>
</style>
