const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth_routes')
const todoRouter = require('./routes/todo_routes')
const config = require('config')

const app = express()

const isLocalDb = true

const mongoUrl = isLocalDb ? 'mongodb://localhost:27017/todo-server-app' : config.get('mongoUrl')

app.use(express.json({ extended: true }))

app.use('/api/user', authRoutes)
app.use('/api/todo', todoRouter)

const start = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    app.listen(5000, () => {console.log('server has running')})

  } catch(e) {
    console.log(e)
  }
}

start()

