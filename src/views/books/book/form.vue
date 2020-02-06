<template>
    <div class="book-form">
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="authors">
          <el-select v-model="form.authors" multiple filterable style="width:100%" placeholder="请选择">
            <el-option
              v-for="item in author_list"
              :key="item.index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出版社" prop="publisher">
          <el-select v-model="form.publisher" filterable placeholder="请选择">
            <el-option
              v-for="item in publish_list"
              :key="item.index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出版日期" prop="publication_date">
          <el-date-picker
            v-model="form.publication_date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
        <div class="btn-wrapper">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button size="small" type="primary" @click="submitForm">保存</el-button>
        </div>
      </el-form-item>
      </el-form>
    </div>
</template>

<script>
    import { getPublishList } from '@/api/books/publish'
    import { getAuthorList } from '@/api/books/author'
    export default {
      name: 'book-form',
      props: {
        form: {
          type: Object,
          default() {
            return {
              name: '',
              authors: '',
              publisher: [],
              publication_date: ''
            }
          }
        }
      },
      data() {
        return {
          author_list: [],
          publish_list: [],
          state: 0
        }
      },
      methods: {
        submitForm() {
          this.$refs.form.validate(valid => {
            if (!valid) {
              return
            }
            this.$emit('submit', this.form)
          })
        },
        cancel() {
          this.$emit('cancel')
        }
      },
      created() {
        this.state = 1
      },
      watch: {
        state() {
          getPublishList().then(res => {
            this.publish_list = res.results
          })
          getAuthorList().then(res => {
            console.log(res)
            this.author_list = res.results
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
.book-form {
  position: relative;
  display: block;
  .btn-wrapper{
    text-align: right;
  }
}
</style>
