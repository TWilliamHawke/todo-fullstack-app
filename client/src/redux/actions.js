import { CREATE_USER_SUCCESS, AUTH_REQUEST, AUTH_FAILURE, HIDE_AUTH_MESSAGES, LOGIN_SUCCESS, FETCH_TODOS_FAILURE, FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, LOGOUT } from "./types"
import axios from 'axios'
import { getToken } from '../utils/token'
import {transformErrors} from './actionHelpers'


export const setAuth = () => ({type: LOGIN_SUCCESS})

export const authRequest = () => ({type: AUTH_REQUEST})

export const hideMessages = () => ({type: HIDE_AUTH_MESSAGES})

export const createUserSuccess = () => ({type: CREATE_USER_SUCCESS})

export const authFailure = (errors) => {
  const payload = transformErrors(errors)
  return {type: AUTH_FAILURE, payload}
}

export const createUser = (data) => async dispatch => {
  dispatch(authRequest())
  try {
    await axios.post('/api/user/signup', data)
    dispatch(createUserSuccess())

  } catch(e) {
    dispatch(authFailure(e.response.data))
  }
}

export const loginUser = (user) => async dispatch => {
  dispatch(authRequest())
  try {
    const {data} = await axios.post('/api/user/login', user)
    localStorage.setItem('tokens', JSON.stringify(data))
    dispatch(setAuth())

  } catch(e) {
    dispatch(authFailure(e.response.data))
  }
}

export const logout = () => {
  localStorage.removeItem('tokens')
  return {type: LOGOUT}
}

export const fetchTodosSuccess = (payload) => ({type: FETCH_TODOS_SUCCESS, payload})

export const fetchTodosFailure = (errors) => {
  const payload = transformErrors(errors)
  return {type: FETCH_TODOS_FAILURE, payload}
}

export const fetchTodo = (method, data) => async (dispatch, getState) => {
  dispatch({type: FETCH_TODOS_REQUEST})

  try {
    const {limit, title, show} = getState().filter
    
    const url = `/api/todo?limit=${limit}&title=${title}&show=${show}`
    const token = await getToken()
    const response = await axios(url, { method, data, headers: {Authorization: token}})
    const todoList = response.data

    dispatch(fetchTodosSuccess(todoList))

  } catch(e) {
    if(!e.response) return console.log(e)
    if(e.response.data.logout) {
      dispatch(logout())
      return dispatch(authFailure(e.response.data))
    }
    dispatch(fetchTodosFailure(e.response.data))
  }

}



