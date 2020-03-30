const express = require('express')
const authRoutes = require('./routes/auth_routes')
const todoRouter = require('./routes/todo_routes')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/user', authRoutes)
app.use('/api/todo', todoRouter)

module.exports = app
