const app = require('./app')
const mongoose = require('mongoose')
const config = require('config')


const isLocalDb = false
const mongoUrl = isLocalDb ? 'mongodb://localhost:27017/todo-server-app' : config.get('mongoUrl')



const start = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(5000, () => {console.log('server has running')})

  } catch(e) {
    console.log(e)
  }
}

start()
