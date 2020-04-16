const {Router} = require('express')
const isAuth = require('../middleware/auth_middleware')
const User = require('../models/User')
const todoFilter = require("../utils/todoFilter");

const router = Router()


router.post('/', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const { title } = req.body
  
    await user.addTodo(title)
    const todoData = todoFilter(user.todoList, req.query)
    return res.json(todoData)
  
  } catch(e) {
    console.log(e)
    res.status(403).json({message: 'Some server error'})
  }
})

router.get('/', isAuth, async (req,res) => {
  try{
    const user = await User.findById(req.user.id)
    const todoData = todoFilter(user.todoList, req.query)
    return res.json(todoData)

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

    const todoData = todoFilter(user.todoList, req.query)
    return res.json(todoData)

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

    const todoData = todoFilter(user.todoList, req.query)
    return res.json(todoData)

  } catch(e) {
    console.log(e)
    res.status(403).json({message: 'Some server error'})

  }
})

module.exports = router