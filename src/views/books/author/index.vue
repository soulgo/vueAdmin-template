<template>
    <div class="author">
      <!--搜索-->
      <el-col :span="8">
        <el-input placeholder="搜索" v-model="params.search" @keyup.enter.native="searchClick">
          <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
        </el-input>
      </el-col>
    <!--添加按钮-->
      <el-col :span="16" style="text-align: right">
        <el-button type="primary" @click="handleAddBtn" >添加作者</el-button>
      </el-col>
      <author-list :value="authors" @edit="handleEdit" @delete="handleDelete"></author-list>
    <!--模态窗增加表单-->
      <el-dialog
        title="添加"
        :visible.sync="dialogVisibleForAdd"
        width="50%">
        <author-form
          ref="authorForm"
          @submit="handleSubmitAdd"
          @cancel="handleCancelAdd">
        </author-form>
      </el-dialog>
      <el-dialog title="更新作者信息" :visible.sync="dialogVisibleForEdit" width="50%">
        <author-form
          ref="authorForm"
          :form="currentValue"
          @submit="handleSubmitEdit"
          @cancel="handleCancelEdit">
        </author-form>
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
  import { getAuthorList, createAuthor, updateAuthor, deleteAuthor } from '@/api/books/author'
  import AuthorList from './table'
  import AuthorForm from './form'
  export default {
    name: 'author',
    components: {
      AuthorList,
      AuthorForm
    },
    data() {
      return {
        authors: [],
        totalNum: 0,
        dialogVisibleForAdd: false,
        dialogVisibleForEdit: false,
        currentValue: '',
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
        getAuthorList(this.params).then(res => {
          this.totalNum = res.count
          this.authors = res.results
        })
      },
      /* 分页 */
      handleCurrentChange(val) {
        this.params.page = val
        this.fetchData()
      },
      /* 搜索 */
      searchClick() {
        this.fetchData()
      },
      /* 添加按钮 */
      handleAddBtn() {
        this.dialogVisibleForAdd = true
      },
      handleSubmitAdd(value) {
        createAuthor(value).then(res => {
          this.$message({
            message: '创建作者信息成功',
            type: 'success'
          })
          this.handleCancelAdd()
          this.fetchData()
        })
      },
      handleCancelAdd() {
        this.dialogVisibleForAdd = false
        this.$refs.authorForm.$refs.form.resetFields()
      },
      /* 更新组，弹出模态窗、提交数据、取消 */
      handleEdit(value) {
        /* 将子组件传来的值给父组件的变量，然后渲染表单 */
        this.currentValue = { ...value }
        this.dialogVisibleForEdit = true
      },
      /* 编辑作者信息 */
      handleSubmitEdit(value) {
        const { id, ...params } = value
        updateAuthor({ id, params }).then(res => {
          this.$message({
            message: '更新作者信息成功',
            type: 'success'
          })
          this.handleCancelEdit()
          this.fetchData()
        })
      },
      handleCancelEdit() {
        this.dialogVisibleForEdit = false
        this.$refs.authorForm.$refs.form.resetFields()
      },
      /* 删除 */
      handleDelete(id) {
        deleteAuthor(id).then(res => {
          this.$message({
            message: '删除作者成功',
            type: 'success'
          })
          this.params.page = 1
          this.fetchData()
        })
      }
    }
  }
</script>

<style scoped>

</style>
