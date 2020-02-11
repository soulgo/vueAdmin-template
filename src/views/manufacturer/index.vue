<template>
    <div class="manufacturer">
      <el-button type="primary" @click="add" size="small">新增</el-button>
      <manufacturer-list :value="manufacturer" @edit="handleEdit" @delete="handleDelete">
      </manufacturer-list>
      <div style="text-align: center;margin-top: 10px" v-show="totalNum>=8">
        <el-pagination
          background
          :page-size="8"
          layout="total,prev, pager, next"
          @current-change="handleCurrentChange"
          :total="totalNum">
        </el-pagination>
      </div>
      <div>
        <el-dialog
          title="新增"
          :visible.sync="dialogVisibleFormAdd"
          width="50%">
          <manufacturer-form
            ref="manufacturerform"
            :is-loading="isLoadingCreateManufacturer"
            @submit="handleSubmitAdd"
            @cancel="handleCancelAdd"
          ></manufacturer-form>
          </el-dialog>
        <el-dialog
            title="修改"
            :visible.sync="dialogVisibleFormEdit"
            width="50%">
            <manufacturer-form
              ref="manufacturerform"
              :is-loading="isLoadingEditManufacturer"
              :form="currentValue"
              @submit="handleSubmitEdit"
              @cancel="handleCancelEdit"
            ></manufacturer-form>
          </el-dialog>
      </div>
    </div>
</template>

<script>
  import { getmanufacturerList, createmanufacturer, deletemanufacturer, updatemanufacturer } from '@/api/manufacturer'
  import manufacturerList from './list'
  import manufacturerForm from './form'
  export default {
    name: 'manufacturer',
    components: {
      manufacturerList,
      manufacturerForm
    },
    data() {
      return {
        dialogVisibleFormAdd: false,
        dialogVisibleFormEdit: false,
        manufacturer: [],
        currentValue: {},
        isLoadingCreateManufacturer: false,
        isLoadingEditManufacturer: false,
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
        getmanufacturerList(this.params).then(
          res => {
            this.totalNum = res.count
            this.manufacturer = res.results
          }
        )
      },
      handleCurrentChange(val) {
        this.params.page = val
        this.fetchData()
      },
      add() {
        this.dialogVisibleFormAdd = true
      },
      // 子组件上传到父组件，父组件进行提交
      handleSubmitAdd(value) {
        this.isLoadingCreateManufacturer = true
        createmanufacturer(value).then(
          () => {
            this.fetchData()
            this.handleCancelAdd()
            this.isLoadingCreateManufacturer = false
          },
          () => {
            this.isLoadingCreateManufacturer = false
          }
        )
      },
      handleSubmitEdit(value) {
        this.isLoadingCreateManufacturer = true
        const { id, ...params } = value
        updatemanufacturer({ id, params }).then(
          () => {
            this.fetchData()
            this.handleCancelEdit()
            this.isLoadingEditManufacturer = false
          },
          () => {
            this.isLoadingEditManufacturer = false
          }
        )
      },
      handleCancelAdd() {
        this.dialogVisibleFormAdd = false
        this.$refs.manufacturerform.$refs.form.resetFields()
      },
      handleCancelEdit() {
        this.dialogVisibleFormEdit = false
        console.log(this.$refs.manufacturerform)
        this.$refs.manufacturerform.$refs.form.resetFields()
      },
      handleEdit(value) {
        this.currentValue = { ...value }
        this.dialogVisibleFormEdit = true
      },
      handleDelete(id) {
        deletemanufacturer(id).then(
          () => {
            this.fetchData()
          },
          err => {
            console.log(err)
          }
        )
      }
    }
  }
</script>

<style scoped>
.manufacturer {
  padding: 10px;
}
</style>
