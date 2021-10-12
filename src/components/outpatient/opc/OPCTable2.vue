
<template>
	<el-table :data="rightTableData2"  :summary-method="getSummaries2" show-summary
            style="width: 100%" size="mini" 	height="470" >
    <el-table-column fixed  label="药品名称" align="center" width="120">
      <template #default="scope">
        <span>{{scope.row.zpObject.zpName}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="功效" align="center"  width="170">
      <template #default="scope">
        <span>{{scope.row.zpObject.zpUsage }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="单位" align="center"  width="60">
      <template #default="scope">
        <span>{{scope.row.zpObject.zpSpecification}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="单价" align="center" width="100">
      <template #default="scope">
        <span>{{scope.row.zpObject.zpPrice}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="总金额"  width="150" align="center">
      <template #default="scope">
        <span>{{scope.row.zpObject.zpCount*scope.row.zpObject.zpPrice}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed  label="计数"  width="200" align="center">
      <template #default="scope">
        <el-input-number size="mini" v-model="scope.row.zpObject.zpCount"  :min="1" :max="100"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column fixed label="嘱托" width="220" class="patientText">
      <template #default="scope">
        <el-input type="textarea" size="mini" v-model="scope.row.zpObject.zpEntrust" rows="1" maxlength="400" ></el-input>
      </template>
    </el-table-column>
    <el-table-column fixed align="center" label="操作" width="100">
      <template #default="scope">
        <div v-if="scope.row.zpObject.zpStatePrice == 0">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index,scope.row.zpNumber)" circle></el-button>
        </div>
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
          handleDelete(index,i) {
            if(i==undefined){
              this.rightTableData2.splice(index,1);
            }else{
              this.axios.post('deleteRe',{index:2,number:i}).then((v)=>{
                if(v.data=="ok"){
                  this.rightTableData2.splice(index,1);
                }
              }).catch(()=>{})
            }
          },
          //计算总和
          getSummaries2(param) {
            const { columns} = param;//获取到的整个表格的总栏位数
            const sums = [];//合计表个数组
            var sum = 0;//总价钱
            this.rightTableData2.forEach((drug,i)=>{//循环判断总价钱
              sum += (drug.zpObject.zpPrice*drug.zpObject.zpCount);
            })
            columns.forEach((column, index) => {//获取合计的位置
              if (index === 0) {
                sums[index] = '合计：';
				sums[index+1]=sum.toFixed(2)+"  元";
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

