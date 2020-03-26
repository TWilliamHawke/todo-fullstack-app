import Axios from "axios"

export const refreshToken = async (refToken) => {
  const { data } = await Axios.post('/api/user/refresh', {refToken})
  
  localStorage.setItem('tokens', JSON.stringify(data))
  return data.token
}


export const getToken = async() => {
  const tokens = localStorage.getItem('tokens')
  if(!tokens) throw new Error('you hasnt tokens')
  const {token, refToken, tokenDie} = JSON.parse(tokens)

  if(tokenDie > Date.now()) return `Bearer ${token}`
  const newToken = await refreshToken(refToken)
  return `Bearer ${newToken}`
}