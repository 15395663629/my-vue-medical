
<template>
	<el-table :data="rightTableData4" :summary-method="getSummaries2" show-summary size="mini" style="width: 100%" height="450" >
    <el-table-column label="项目名称" width="180">
      <template #default="scope">
        <span>{{scope.row.projectName}}</span>
      </template>
    </el-table-column>

    <el-table-column label="价格" width="180">
      <template #default="scope">
        <span>{{scope.row.projectPay}}</span>
      </template>
    </el-table-column>

    <el-table-column label="手术类型" width="180">
      <template #default="scope">
        <span>{{scope.row.projectType}}</span>
      </template>
    </el-table-column>

    <el-table-column label="治疗范围" width="180">
      <template #default="scope">
        <span>{{scope.row.projectPosition}}</span>
      </template>
    </el-table-column>

    <el-table-column label="嘱托" width="220" class="patientText">
      <template #default="scope">
        <el-input type="textarea" size="mini" v-model="scope.row.ssObject.susDoctorText" rows="1" maxlength="400" ></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作" width="50">
      <template #default="scope">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index)" circle></el-button>
      </template>
    </el-table-column>


  </el-table>
  <h4>检验项目留言：</h4>
  <el-input type="textarea" placeholder="请输入病理原因"  @change="textareas" v-model="textValues" maxlength="400" :rows="3"
            show-word-limit>
  </el-input>
</template>

<script>
    export default{
      emits:['func'],
      props:{
        rightTableData4:{
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
          this.rightTableData4.splice(index, 1);
        },
        //计算总和
        getSummaries2(param) {
          const { columns} = param;//获取到的整个表格的总栏位数
          const sums = [];//合计表个数组
          var sum = 0;//总价钱
          this.rightTableData4.forEach((drug,i)=>{//循环判断总价钱
            sum += drug.projectPay;
          })
          columns.forEach((column, index) => {//获取合计的位置
            if (index === 0) {
              sums[index] = '合计';
              sums[index+1]=sum.toFixed(2)+"元";
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
</style>

