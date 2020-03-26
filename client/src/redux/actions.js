import { CREATE_USER_SUCCESS, AUTH_REQUEST, AUTH_FAILURE, HIDE_AUTH_MESSAGES, LOGIN_SUCCESS, FETCH_TODOS_FAILURE, FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, SET_FILTER_DONE, SET_FILTER_TITLE, SET_FILTER_LIMIT } from "./types"
import axios from 'axios'
import { getToken } from '../utils/token'

const authFailure = (data, type) => {
  let payload = ['Server is not aviable']

  if(data.errors) {
    payload = data.errors.map(error => error.msg)
  } else if (data.message) {
    payload = [data.message]
  }
  return {type, payload}
}

export const createUser = (data) => async dispatch => {
  dispatch({type: AUTH_REQUEST})
  try {
    await axios.post('/api/user/signup', data)
    dispatch({type: CREATE_USER_SUCCESS})

  } catch(e) {
    dispatch(authFailure(e.response.data, AUTH_FAILURE))
  }
}

export const loginUser = (user) => async dispatch => {
  dispatch({type: AUTH_REQUEST})
  try {
    const {data} = await axios.post('/api/user/login', user)
    localStorage.setItem('tokens', JSON.stringify(data))
    dispatch({type: LOGIN_SUCCESS})

  } catch(e) {
    dispatch(authFailure(e.response.data))
  }
}

export const hideMessages = () => ({type: HIDE_AUTH_MESSAGES})


export const fetchTodo = (method, data) => async (dispatch, getState) => {
  dispatch({type: FETCH_TODOS_REQUEST})

  try {
    const {limit, title, show} = getState().filter
    
    const url = `/api/todo?limit=${limit}&title=${title}&show=${show}`
    console.log(url)
    const token = await getToken()
    const response = await axios(url, { method, data, headers: {Authorization: token}})
    const todoList = response.data

    dispatch({type: FETCH_TODOS_SUCCESS, payload:todoList})

  } catch(e) {
    if(!e.response) return console.log(e)
    dispatch(authFailure(e.response.data, FETCH_TODOS_FAILURE))
  }

}

export const setFilterDone = payload => dispatch =>  {
  dispatch({type: SET_FILTER_DONE, payload})
  dispatch(fetchTodo('get'))
}

export const setFilterTitle = payload => dispatch =>  {
  dispatch({type: SET_FILTER_TITLE, payload})
  dispatch(fetchTodo('get'))
}

export const setFilterLimit = () => dispatch =>  {
  dispatch({type: SET_FILTER_LIMIT})
  dispatch(fetchTodo('get'))
}

