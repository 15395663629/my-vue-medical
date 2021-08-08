<template>
  <h1>药库</h1>
  <el-table
      :data="tableData"
      stripe
      style="width: 100%">
    <el-table-column
        prop="date"
        label="药品名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="name"
        label="药品数量"
        width="180">
    </el-table-column>
    <el-table-column
        prop="address"
        label="仓库名称">
    </el-table-column>
    <el-table-column
        prop="address"
        label="药品批次">
    </el-table-column>
    <el-table-column
        prop="address"
        label="生产日期">
    </el-table-column>
    <el-table-column
        prop="address"
        label="供应商">
    </el-table-column>
    <el-table-column
        prop="address"
        label="操作">
      <template #default="scope">
        <el-button type="primary" plain size="mini" @click="">调拨</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

</script>

<style scoped>

</style>