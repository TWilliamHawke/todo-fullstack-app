import { CREATE_USER_FAILURE, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, AUTH_REQUEST, AUTH_FAILURE, HIDE_AUTH_MESSAGES, LOGIN_SUCCESS } from "./types"

const initial_state = {
  id: null,
  token: null,
  reftoken: null,
  errors: [],
  loading: false,
  successMessage: false
}


const handlers = {
  default: state => state,
  [AUTH_REQUEST]: state => ({...state, loading: true, errors: []}),
  [AUTH_FAILURE]: (state, payload) => ({
    ...state, loading: false, errors: payload
  }),
  [CREATE_USER_SUCCESS]: state => ({...state, loading:false, successMessage: true}),
  [HIDE_AUTH_MESSAGES]: state => ({...state, successMessage: false, errors:[]}),
  [LOGIN_SUCCESS]: state => ({...state, loading: false})
}

export const userReducer = (state = initial_state, {type, payload}) => {
  const handler = handlers[type]|| handlers.default

  return handler(state, payload)
}