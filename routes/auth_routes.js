const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { getTokensByRef, getTokensById } = require('../utils/generateTokens')
const router = new Router()

router.post('/signup', [
    check('email', 'incorrect email').normalizeEmail().isEmail(),
    check('password', 'Password is too short').isLength({ min: 6 })
  ], async (req, res) => {

  try {
    const {email, password} = req.body
    const errors = validationResult(req)
  
    if(!errors.isEmpty()) {
      return res.status(422).json({
        message: 'validation errors', 
        errors: errors.array()
      })
    }
  
    const checkExist = await User.findOne({email})
    if(checkExist) {
      return res.status(403).json({message: 'User is already exist'})
    }
  
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await new User({email, password: hashedPassword})
    await user.save()
  
    res.status(201).json(user)
  
  } catch(e) {
    console.log(e)
    res.status(400).json({message: 'Some server error'})
  }
})

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(!user) return res.status(403).json({message: 'User does not exist'})

    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword) return res.status(403).json({message: 'Wrong password'})

    const tokens = getTokensById(user._id);
    res.json(tokens)

  } catch(e) {
    console.log(e)
    res.status(400).json({message: 'Some server error'})
  }
})

router.post('/refresh', async(req, res) => {
  try {
    const {refToken} = req.body

    const {id} = jwt.verify(refToken, config.get('secretRef'))
    const tokens = getTokensByRef(id);

    res.json(tokens)

  } catch(e) {
    console.log(e)
    res.status(400).json({message: 'Some server error', logout: true})
  }
})


module.exports = router