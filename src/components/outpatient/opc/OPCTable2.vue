
<template>
	<el-table :data="rightTableData2"  :summary-method="getSummaries2" show-summary
            style="width: 100%" size="mini" 	height="470" >
    <el-table-column fixed  label="药品名称" align="center" width="120">
      <template #default="scope">
        <span>{{scope.row.drugName}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="功效" align="center"  width="120">
      <template #default="scope">
        <span>{{scope.row.drugRemark }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="服用剂量" align="center"  width="150">
      <template #default="scope">
        <span>{{scope.row.drugSpecification }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="单位" align="center"  width="60">
      <template #default="scope">
        <span>{{scope.row.specSpecification}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="单价" align="center" width="100">
      <template #default="scope">
        <span>{{scope.row.drugPrice}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="总金额"  width="150" align="center">
      <template #default="scope">
        <span>{{scope.row.zpObject.zpCount*scope.row.drugPrice}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="计数"  width="150" align="center">
      <template #default="scope">
        <el-input-number size="mini" v-model="scope.row.zpObject.zpCount"  :min="1" :max="100"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column label="嘱托" width="220" class="patientText">
      <template #default="scope">
        <el-input type="textarea" size="mini" v-model="scope.row.zpObject.zpEntrust" rows="1" maxlength="400" ></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作" width="50">
      <template #default="scope">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index)" circle></el-button>
      </template>
    </el-table-column>
  </el-table>
	  <h4>中药处方留言：</h4>
	  <el-input type="textarea" placeholder="请输入病理原因"  @change="textareas" v-model="textValues" maxlength="400" :rows="3"
	  		show-word-limit>
	  </el-input>
</template>

<script>
    export default{
        emits:['func'],
        props:{
            rightTableData2:{
                type:Array,
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
        methods: {
          //删除
          handleDelete(index) {
            this.rightTableData2.splice(index, 1);
          },
          //计算总和
          getSummaries2(param) {
            const { columns} = param;//获取到的整个表格的总栏位数
            const sums = [];//合计表个数组
            var sum = 0;//总价钱
            this.rightTableData2.forEach((drug,i)=>{//循环判断总价钱
              sum += (drug.drugPrice*drug.zpObject.zpCount);
            })
            columns.forEach((column, index) => {//获取合计的位置
              if (index === 0) {
                sums[index] = '合计\t'+sum+"\t元";
                return;
              }
            });
            return sums;
          },
          textareas(){
            this.$emit('func',this.textValues)
          },
        }
    }
</script>

<style>
    /*table{*/
    /*    margin-top: 20px;*/
    /*}*/
    /*td{*/
    /*    text-align: center;*/
    /*    width: 100px;*/
    /*}*/
</style>

