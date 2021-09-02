<template >
	<div>
		<el-row>
			<el-col :span="8">
				<el-row>
					<el-col :span="24">
						<el-button  size="small" style="width: 100%;" type="primary" plain @click="countLeftTopTable">刷新候诊病人</el-button>
					</el-col>
					<el-col :span="8">
						<el-button style="width: 100%;" type="primary" plain @click="call">呼叫病人</el-button>
					</el-col>
					<el-col :span="8">
						<el-button style="width: 100%;" type="primary" plain @click="jieZheng" >接诊</el-button>
					</el-col>
					<el-col :span="8">
						<el-button style="width: 100%;"  type="primary" plain @click="jumpMark">跳号</el-button>
					</el-col>
				</el-row>
				<el-tabs v-model="indexObs" stretch  ><!-- @tab-click="selectRecord" -->
					<el-tab-pane  label="呼叫列表" :key="0" name ="0"> <!--@row-click="addTopHeader"-->
						<el-table  v-loading="loading" element-loading-text="读取中..."
						style="width: 100%" height="500">
								<el-table-column fixed  label="排列序号"   width="100"></el-table-column>
								<el-table-column fixed  label="姓名"  width="100"></el-table-column>
								<el-table-column prop="tag" label="标签"
								width="100" :filters="[{ text: '复诊', value: '复诊' }, { text: '初诊', value: '初诊' }]"
								:filter-method="filterTag"  filter-placement="bottom-end">
									<template #default="scope">
										<el-tag :type="scope.row.tag === '复诊' ? 'primary' : 'success'" disable-transitions>
										{{scope.row.tag}}
										</el-tag>
									</template>
								</el-table-column>
						</el-table>
					</el-tab-pane>
				<!--              table2           ===============-->
					<el-tab-pane label="就诊列表" :key="1" name="1">
						
					</el-tab-pane>
				
				</el-tabs>
				
				
				
				
				
			</el-col>
			<el-col :span="16" >
				<el-row >
					<el-form   status-icon label-width="95px" style="margin-top: 20px;">
						<el-col  style="height: 40px">
							<el-form-item label="就诊号" >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 40px">
							<el-form-item label="姓名" >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col  style="height: 40px">
							<el-form-item label="性别" >
								<el-input size="mini" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 40px">
							<el-form-item label="年龄" >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 45px">
							<el-form-item label="诊断医生" >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 45px">
							<el-form-item label="诊断科室" >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						
						<el-col style="height: 45px;width: 420px; margin-top: 10px;">
							<el-form-item label="过敏及特殊病史" label-width="120px" >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 45px; width: 420px; margin-top: 10px;">
							<el-form-item label="送检医师要求" label-width="120px" >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col> 
						<el-col style="height: 45px; width: 420px;">
							<el-form-item label="检查方法"  label-width="120px" >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						
						
						<el-col style="height: 45px ;width: 420px;">
							<el-form-item label="检查部位和名称" label-width="120px" >
								<el-input size="mini"  disabled></el-input>
							</el-form-item>
						</el-col>
						
						<el-col style="height: 60px;width: 840px;">
							<el-form-item label="临床诊断" label-width="120px" >
								<el-input size="mini" type="textarea" disabled></el-input>
							</el-form-item>
						</el-col>
						
						<el-col  style="height: 60px ;width: 840px;">
							<el-form-item label="送检医师留言" label-width="120px" >
								<el-input size="mini" type="textarea"  disabled></el-input>
							</el-form-item>
						</el-col>
						
						
						
						<el-col style="height: 200px ;width: 420px; margin-top: 10px;" >
							<el-form-item label="放射学表现" style="width: 400px;">
								<el-input style="width: 320px;" v-model="textarea2"  placeholder="请输入病理原因" 
								rows="12" type="textarea" size="mini" maxlength="1000"
								           show-word-limit>
								</el-input>
							</el-form-item>
						</el-col>
						
						<el-col style="height: 200px ;width: 420px; margin-top: 10px;" >
							<el-form-item label="放射学诊断" style="width: 400px;">
								<el-input style="width: 325px;" v-model="textarea2"  placeholder="请输入病理原因" 
								rows="12" type="textarea" size="mini" maxlength="1000"
								           show-word-limit>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col style="height: 45px;float: right;margin-right: 25px; margin-top: 40px;" >
							<el-form-item label-width="20px">
								<el-button size="small"  type="primary" style="width: 130px;" icon="el-icon-s-claim">
									打印诊断结果
								</el-button>
							</el-form-item>
						</el-col>
					</el-form>
				</el-row>
			</el-col>
			
		</el-row>
		
		<!-- table=============================== -->

	</div>
</template>

<script >
	export default {
		data() {
			return {
				
				indexObs:0,
				
			};
		},
		 methods: {
			 filterTag(value, row) {/* 复诊初诊标签方法 */
			 	return row.tag === value;
			 },
			 openJa(){
				 this.$confirm('您确定读取下一条数吗？').then(suc => {
					this.loading=true
				 }).catch(err => {
					this.loading=false
				 })
			 },
			handleEdit(index, row) {
				console.log(index, row);
			},
			  handleDelete(index, row) {
				console.log(index, row);
			}
		}
	};
</script>

<style>
</style>

