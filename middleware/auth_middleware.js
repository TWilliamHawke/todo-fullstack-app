const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if(!token) return res.status(401).json({message: 'Wrong authorization data, please login again', logout: true})

    const userId = jwt.verify(token, config.get('secret'))
    req.user = userId
    
    next()
  } catch(e) {
    console.log(e)
    return res.status(401).json({message: 'Wrong authorization data, please login again', logout: true})
  }

  
}