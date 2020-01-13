const vuexDemo = {
  state: {
    todoList: [
      { text: 'Learn Vue' },
      { text: 'Learn Javascript' },
      { text: 'Learn PHP' },
      { text: 'Learn Golang' }
    ]
  },
  mutations: {
    updateTodoList(state, newVal) {
      state.todoList = newVal
    }
  },
  actions: {
    TodoListActions(context, newVal) {
      context.commit('updateTodoList', newVal)
    }
  }
}
export default vuexDemo
