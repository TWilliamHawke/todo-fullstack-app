import { FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS } from "./types"

const initialState = {
  loading:true,
  todoList: [],
  errors: [],
  todoLength: 0,
  filters: {
    limit: -10,
    title: '',
    show: 'all',
  }
}

const handlers = {
  [FETCH_TODOS_REQUEST]: (state) => ({...state, loading: true}),
  [FETCH_TODOS_SUCCESS]: (state, {payload}) => ({...state, loading:false, todoList: payload}) ,
  default: state => state
}

export const todoReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.default

  return handler(state, action)
}