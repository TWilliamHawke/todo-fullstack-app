const {Router} = require('express')
const isAuth = require('../middleware/auth_middleware')
const User = require('../models/User')

const router = Router()

const todoFilter = (todoList, filter) => {
  const { limit, title, show } = filter
  
  const filterTodo = todoList
    .filter(todo => todo.title.includes(title))
    .filter(todo => {
      switch (show) {
        case 'active':
          return !todo.done
        case 'done':
          return todo.done
        default: return true
      }
    })
    .splice(limit || -10)
  return filterTodo

}

router.post('/', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const { title } = req.body
  
    await user.addTodo(title)
    const  todoList = todoFilter(user.todoList, req.query)
    return res.json({todoList, todoLength: user.todoList.length})
  
  } catch(e) {
    console.log(e)
    res.status(403).json({message: 'Some server error'})
  }
})

router.get('/', isAuth, async (req,res) => {
  try{
    const user = await User.findById(req.user.id)
    const  todoList = todoFilter(user.todoList, req.query)
    return res.json({todoList, todoLength: user.todoList.length})

  } catch(e) {
    console.log(e)
    res.status(403).json({message: 'Some server error'})
  }
})

router.delete('/', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    const { id } = req.body
    await user.deleteTodo(id)

    const  todoList = todoFilter(user.todoList, req.query)
    return res.json({todoList, todoLength: user.todoList.length})

  } catch(e) {
    console.log(e)
    res.status(403).json({message: 'Some server error'})
  }
})

router.patch('/', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const { id, ...status } = req.body
    await user.changeStatus(id, status)

    const  todoList = todoFilter(user.todoList, req.query)
    return res.json({todoList, todoLength: user.todoList.length})

  } catch(e) {
    console.log(e)
    res.status(403).json({message: 'Some server error'})

  }
})

module.exports = router