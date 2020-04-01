import Axios from "axios"
import * as tokenjs from './token'

export const refreshToken = async (refToken) => {
  const { data } = await Axios.post('/api/user/refresh', {refToken})
  
  localStorage.setItem('tokens', JSON.stringify(data))
  return data.token
}


export const getToken = async() => {
  const tokens = localStorage.getItem('tokens')
  if(!tokens) throw new Error('you hasnt tokens')
  const {token, refToken, tokenDie} = JSON.parse(tokens)

  //tokenDie = date.now + 1h on server
  if(tokenDie > Date.now()) return `Bearer ${token}`
  const newToken = await tokenjs.refreshToken(refToken)
  return `Bearer ${newToken}`
}