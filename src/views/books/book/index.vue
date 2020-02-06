<template>
    <div class="book">
      <!--搜索-->
      <el-col :span="8">
        <el-input placeholder="搜索" v-model="params.search" @keyup.enter.native="searchClick">
          <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
        </el-input>
      </el-col>
      <!--添加按钮-->
      <el-col :span="16" style="text-align: right">
        <el-button type="primary" @click="handleAddBtn">添加图书</el-button>
      </el-col>
      <book-list :value="books"></book-list>
      <!--模态窗增加表单-->
      <el-dialog
        title="添加书籍"
        :visible.sync="dialogVisibleForAdd"
        width="50%">
        <book-form
          ref="bookForm"
          @submit="handleSubmitAdd"
          @cancel="handleCancelAdd">
        </book-form>
    </el-dialog>
      <!--分页-->
      <div style="text-align: center;margin-top: 10px" v-show="totalNum>=5">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :page-size="5"
          :total="totalNum"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    import { getBookList, createBook } from '@/api/books/book'
    import BookList from './table'
    import BookForm from './form'
    export default {
      name: 'book',
      components: {
        BookForm,
        BookList
      },
      data() {
        return {
          books: [],
          totalNum: 1,
          dialogVisibleForAdd: false,
          params: {
            page: 1,
            search: ''
          }
        }
      },
      created() {
        this.fetchData()
      },
      methods: {
        fetchData() {
          getBookList(this.params).then(res => {
            this.totalNum = res.count
            this.books = res.results
          })
        },
        handleCurrentChange(val) {
          this.params.page = val
          this.fetchData()
        },
        searchClick() {
          this.fetchData()
        },
        /* 添加书籍*/
        handleAddBtn() {
          this.dialogVisibleForAdd = true
        },
        handleSubmitAdd(value) {
          createBook(value).then(res => {
            console.log(res)
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.handleCancelAdd()
            this.fetchData()
          })
        },
        handleCancelAdd() {
          this.dialogVisibleForAdd = false
          this.$refs.bookForm.$refs.form.resetFields()
        }
      }
    }
</script>

<style scoped>

</style>
