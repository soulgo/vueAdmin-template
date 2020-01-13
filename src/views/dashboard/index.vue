<template>
  <div class="dashboard-container">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
    <el-table-column
      prop="id"
      label="id">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名">
    </el-table-column>
    <el-table-column
      prop="email"
      label="电子邮箱">
    </el-table-column>
    </el-table>
  <div style="text-align: center;margin-top: 10px" v-show="totalNum>=10">
    <el-pagination
      background
      layout="total,prev, pager, next"
      @current-change="handleCurrentChange"
      :total="totalNum">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import { getUserList } from '@/api/dashboard'
export default {
  data() {
    return {
      tableData: [],
      totalNum: 0,
      params: {
        page: 1
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getUserList(this.params).then(res => {
        this.totalNum = res.count
        this.tableData = res.results
      })
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.fetchData()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
