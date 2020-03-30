const { Schema, model } = require('mongoose')

const user = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  todoList: [
    {
      title: {
        type:String,
        required: true
      },
      important: {
        type: Boolean,
        required: true,
        default: false
      },
      done: {
        type: Boolean,
        required: true,
        default: false
      }
    }
  ]
})

user.methods.addTodo = function(title) {
  const todoList = [...this.todoList]
  const todo = {title, important: false, done: false}

  todoList.push(todo)
  this.todoList = todoList
  return this.save()
}

user.methods.deleteTodo = function(id) {
  const todoList = [...this.todoList]
  const newList = todoList.filter(todo => todo._id.toString() !== id)

  this.todoList = newList
  return this.save()

}

user.methods.changeStatus = function(id, status) {
  const todoList = [...this.todoList]
  const idx = todoList.findIndex(todo => todo._id.toString() === id)
  todoList[idx] = Object.assign(todoList[idx], status)
  return this.save()
}


module.exports = model('User', user)