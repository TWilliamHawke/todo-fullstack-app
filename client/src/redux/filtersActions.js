import { fetchTodo } from './actions'
import { SET_FILTER_DONE, SET_FILTER_TITLE, SET_FILTER_LIMIT } from './types'


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