import { SET_FILTER_DONE, SET_FILTER_LIMIT, SET_FILTER_TITLE } from "./types"

const initialState = {
  limit: -10,
  title: '',
  show: 'all',
}
const handlers = {
  [SET_FILTER_DONE]: (state, payload) => ({...state, show: payload}),
  [SET_FILTER_TITLE]: (state, payload) => ({...state, title: payload}),
  [SET_FILTER_LIMIT]: (state) => ({...state, limit: state.limit - 10}),
  default: state => state
}

export const filtersReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.default
  return handler(state, action.payload)
}