
<template>
	<el-table :data="rightTableData3" :summary-method="getSummaries2" show-summary
            style="width: 100%" size="mini" height="470" 	>
		
    <el-table-column label="项目名称" align="center" width="200px">
      <template #default="scope">
        <span>{{scope.row.pro.checkName}}</span>
      </template>
    </el-table-column>

		<el-table-column label="价格"  align="center" width="100px">
		  <template #default="scope">
        <span>{{scope.row.pro.checkPay}}</span>
		  </template>
		</el-table-column>

    <el-table-column label="功能" align="center">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="410px" >
          <template #default>
            <p>检验结果： {{scope.row.pro.manResult}}</p>
            <p>医生建议： {{scope.row.pro.manProposal}}</p>
          </template>
          <template #reference>
            <div class="name-wrapper ">
              <el-tag size="medium">{{scope.row.pro.indexSignificance}}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column align="center" label="操作" width="100">
      <template #default="scope">
        <div v-if="scope.row.pro.manPayState == 0">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index,scope.row.manResultId)" circle></el-button>
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
            rightTableData3:{
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
              this.rightTableData3.splice(index,1);
            }else{
              this.axios.post('deleteRe',{index:3,number:i}).then((v)=>{
                if(v.data=="ok"){
                  this.rightTableData3.splice(index,1);
                  this.$parent.selectRecord();
                }
              }).catch(()=>{})
            }
          },
          //计算总和
          getSummaries2(param) {
            const { columns} = param;//获取到的整个表格的总栏位数
            const sums = [];//合计表个数组
            var sum = 0;//总价钱
            this.rightTableData3.forEach((drug,i)=>{//循环判断总价钱
              sum += drug.pro.checkPay;
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

<style scoped>
.fontType{
  width: 95%;   /*一定要设置宽度，或者元素内含的百分比*/
  overflow:hidden; /*溢出的部分隐藏*/
  white-space: nowrap; /*文本不换行*/
  text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
}
</style>

