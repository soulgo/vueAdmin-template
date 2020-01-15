<template>
    <div class="manufacturer-form">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="主机厂商" prop="vendor_name">
            <el-input v-model="form.vendor_name" placeholder="请输入主机供应商"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="form.tel" placeholder="请输入电话" ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="mail">
            <el-input v-model="form.mail" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
    <div class="btn-wrapper">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button size="small" type="primary" @click="SubmitForm">立即创建</el-button>
    </div>
    </el-form>
    </div>
</template>

<script>
    export default {
      name: 'manufacturer-form',
      // props: ['isLoading', 'value'],
      props: {
        isLoading: {
          required: true,
          type: Boolean
        },
        form: {
          type: Object,
          default() {
            return {
              vendor_name: '',
              tel: '',
              mail: '',
              remark: ''
            }
          }
        }
      },
      data() {
        return {
          rules: {
            vendor_name: [
              { required: true, message: '请输入主机厂商', trigger: 'blur' }
            ],
            tel: [
              { required: true, message: '请输入电话', trigger: 'blur' }
            ],
            mail: [
              { required: true, message: '请输入邮箱', trigger: 'blur' }
            ],
            remark: [
              { required: true, message: '请输入备注', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        SubmitForm() {
          this.$refs.form.validate(valid => {
            if (!valid) {
              return
            }
            // 将form数据传到父组件
            this.$emit('submit', this.form)
          })
        },
        cancel() {
          this.$emit('cancel')
        }
      }
    }
</script>

<style lang="scss" scoped>
.manufacturer-form {
  position: relative;
  display: block;
  .btn-wrapper {
    text-align: right;
  }
}
</style>
