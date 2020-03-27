import { FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE } from "./types"

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
  [FETCH_TODOS_SUCCESS]: (state, {todoList, todoLength}) => ({...state, loading:false, todoList, todoLength}),
  [FETCH_TODOS_FAILURE]: (state, payload) => ({...state, loading: false, errors: payload}),
  default: state => state,
}

export const todoReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.default

  return handler(state, action.payload)
}