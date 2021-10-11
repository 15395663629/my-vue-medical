
<template>
	<el-table  :data="rightTableData4" :summary-method="getSummaries2" show-summary size="mini" style="width: 100%" height="450" >
    <el-table-column label="项目名称" >
      <template #default="scope">
        <span>{{scope.row.ssObject.projectName}}</span>
      </template>
    </el-table-column>

    <el-table-column label="价格" >
      <template #default="scope">
        <span>{{scope.row.ssObject.projectPay}}</span>
      </template>
    </el-table-column>

    <el-table-column label="手术类型">
      <template #default="scope">
        <span>{{scope.row.ssObject.projectType}}</span>
      </template>
    </el-table-column>

    <el-table-column label="治疗范围" >
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="250px">
          <template #default>
            <p>手术结果： {{scope.row.ssObject.susDoctorText}}</p>
          </template>
          <template #reference>
            <div class="name-wrapper ">
              <el-tag size="medium">{{scope.row.ssObject.projectPosition}}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>

    </el-table-column>

    <el-table-column label="嘱托" class="patientText">
      <template #default="scope">
        <el-input type="textarea" size="mini" v-model="scope.row.ssObject.susDoctorText" rows="1" maxlength="400" ></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="操作" width="50">
      <template #default="scope">
        <div v-if="scope.row.ssObject.susPayState == 0">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index,scope.row.susNumber)" circle></el-button>
        </div>
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
        handleDelete(index,i) {
          if(i==undefined){
            this.rightTableData4.splice(index,1);
          }else{
            this.axios.post('deleteRe',{index:4,number:i}).then((v)=>{
              if(v.data=="ok"){
                this.rightTableData4.splice(index,1);
              }
            }).catch(()=>{})
          }
        },
        //计算总和
        getSummaries2(param) {
          const { columns} = param;//获取到的整个表格的总栏位数
          const sums = [];//合计表个数组
          var sum = 0;//总价钱
          this.rightTableData4.forEach((drug,i)=>{//循环判断总价钱
            sum += drug.ssObject.projectPay;
          })
          columns.forEach((column, index) => {//获取合计的位置
            if (index === 0) {
              sums[index] = '合计：'+sum.toFixed(2)+"   元";
              // sums[index+1]=
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

