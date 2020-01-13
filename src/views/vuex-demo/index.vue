<template>
  <div class="vuex-demo">
    <el-input v-model="value" @keyup.enter.native="add"></el-input>
    <ul>
      <li v-for="(todo,index) in todos" :key="index">
        {{ index }} : {{ todo }}
        <el-button @click="remove(index)">删除</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'vuex-demo',
  data() {
    return {
      value: '',
      todos: this.$store.state.vuexDemo.todoList
    }
  },
  methods: {
    add() {
      this.todos.push({ text: this.value })
      // dispatch进行更新todoList里的情况
      // 更新和删除都需要调用store里的dispatch的情形
      this.$store.dispatch('TodoListActions', this.todos)
    },
    remove(index) {
      this.todos.splice(index, 1)
      this.$store.dispatch('TodoListActions', this.todos)
    }
  }
}
</script>
<style lang="scss" scoped>
.vuex-demo {
  position: relative;
}
</style>
