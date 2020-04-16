const jwt = require('jsonwebtoken')
const config = require('config')


const getTokensById = (id) => {
  const token = jwt.sign({id}, config.get('secret'), {expiresIn: '1h'})
  const refToken = jwt.sign({id}, config.get('secretRef'))
  const tokenDie = Date.now() + 3000*1000

  return {token, refToken, tokenDie}
}

const getTokensByRef = (refToken) => {
  const {id} = jwt.verify(refToken, config.get('secretRef'))
  const tokens = getTokensById(id)
  return tokens
}

module.exports = {
  getTokensById,
  getTokensByRef
}