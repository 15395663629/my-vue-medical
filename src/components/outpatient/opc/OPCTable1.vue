<template>
	<el-table  :summary-method="getSummaries1" show-summary
            :data="rightTableData1" style=" width: 100%;" height="470px" size="mini" >
    <el-table-column fixed    label="药品名称"  align="center" width="200">
      <template #default="scope">
        <span>{{scope.row.xpObject.rdName}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="服用剂量"  align="center"  width="150">
      <template #default="scope">
        <span>{{scope.row.xpObject.rdFyjl }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="单位" align="center"  width="60">
      <template #default="scope">
        <span>{{scope.row.xpObject.rdDw}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="单价" align="center"  width="120">
      <template #default="scope">
        <span>{{scope.row.xpObject.rdPrice}}</span>
      </template>
    </el-table-column>
    <el-table-column  fixed label="总金额"  width="120" align="center">
      <template #default="scope" class="sums">
        <span>{{towNumber(scope.row.xpObject.rdCount*scope.row.xpObject.rdPrice)}}</span>
      </template>
    </el-table-column>

    <el-table-column fixed  label="计数"  width="150" align="center">
      <template #default="scope">
        <div v-if="scope.row.xpObject.rdStatePrice == 0">
        <el-input-number size="mini" style="width: 100px" v-model="scope.row.xpObject.rdCount"  :min="1" :max="100"></el-input-number>
        </div>
        <div v-else>
          <el-input-number size="mini" style="width: 100px" v-model="scope.row.xpObject.rdCount"  :min="1" :max="100" disabled></el-input-number>
        </div>
      </template>
    </el-table-column>
    <el-table-column fixed label="嘱托" width="200" class="patientText">
      <template #default="scope">
        <div v-if="scope.row.xpObject.rdStatePrice == 0">
        <el-input type="textarea" size="mini" v-model="scope.row.xpObject.rdEntrust" rows="1" maxlength="400" ></el-input>
        </div>
        <div v-else>
          <el-input type="textarea" size="mini" v-model="scope.row.xpObject.rdEntrust" rows="1" maxlength="400" disabled></el-input>
        </div>
      </template>
    </el-table-column>

    <el-table-column fixed align="center" label="操作" width="110">
        <template #default="scope">
          <div v-if="scope.row.xpObject.rdStatePrice == 0">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index,scope.row.rdNumber)" circle></el-button>
          </div>
        </template>
		</el-table-column>

  </el-table>
	  <h4>西药处方留言：</h4>
	  <el-input
	  		type="textarea"
	  		placeholder="请输入病理原因"
        @change="textareas"
        ref="dszx"
	  		v-model="textValues"
	  		maxlength="400"
	  		:rows="3"
	  		show-word-limit>
	  </el-input>
</template>

<script>
    export default{
      emits:['func'],
        props:{
            rightTableData1:{
                type:Object,
                required:true
            },
          textValues:{
              type:String,
              required: true
            },
        },
        data(){
            return {
            }
        },
      methods:{
        handleDelete(index,i){
          if(i==undefined){
            this.rightTableData1.splice(index,1);
          }else{
            this.axios.post('deleteRe',{index:1,number:i}).then((v)=>{
              if(v.data=="ok"){
                this.rightTableData1.splice(index,1);
              }
            }).catch(()=>{})
          }
        },
        towNumber(val) {
          return val.toFixed(2);
        },
        getSummaries1(param) {
          const { columns} = param;//获取到的整个表格的总栏位数
          const sums = [];//合计表个数组
          var sum = 0;//总价钱
          this.rightTableData1.forEach((drug,i)=>{//循环判断总价钱
            sum += (drug.xpObject.rdPrice*drug.xpObject.rdCount);
          })
          columns.forEach((column, index) => {//获取合计的位置
            if (index === 0) {
              sums[index] = "合计：";
			  sums[index+1] = sum.toFixed(2)+"  元";
              return;
            }
          });
          return sums;
        },
        textareas(){
          this.$emit('func',this.textValues)
        },
      },
      created() {

      }

    }
</script>

<style>
.patientText/deep/ .el-input__inner {
  color: #FD4C4C;
  white-space: nowrap;
  font-size: 13px;
  text-overflow: ellipsis;
}
</style>

