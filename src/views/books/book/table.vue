<template>
    <div class="book-list">
      <el-table
        :data="value"
        border
        stripe
        style="width: 100%">
        <el-table-column
          label="ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="书名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="作者"
          prop="author"
          type="scope">
          <template slot-scope="props">
            <div v-for="item in props.row.authors">
              <span style="float: left">{{ item.name }}, </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
        label="出版社"
        prop="publisher"
        type="scope">
          <template slot-scope="props">
            {{ props.row.publisher[0].name}}
          </template>
        </el-table-column>
        <el-table-column
          label="出版日期"
          prop="publication_date">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
      name: 'book-list',
      props: ['value']
    }
</script>

<style scoped>

</style>
