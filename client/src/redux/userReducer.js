import { CREATE_USER_SUCCESS, AUTH_REQUEST, AUTH_FAILURE, HIDE_AUTH_MESSAGES, LOGIN_SUCCESS, LOGOUT } from "./types"

const initial_state = {
  errors: [],
  loading: false,
  successMessage: false,
  isAuth: false
}


const handlers = {
  default: state => state,
  [AUTH_REQUEST]: state => ({...state, loading: true, errors: []}),
  [AUTH_FAILURE]: (state, payload) => ({
    ...state, loading: false, errors: payload
  }),
  [CREATE_USER_SUCCESS]: state => ({...state, loading:false, successMessage: true}),
  [HIDE_AUTH_MESSAGES]: state => ({...state, successMessage: false, errors:[]}),
  [LOGIN_SUCCESS]: state => ({...state, loading: false, isAuth: true}),
  [LOGOUT]: state => ({...state, isAuth: false})
}

export const userReducer = (state = initial_state, {type, payload}) => {
  const handler = handlers[type]|| handlers.default

  return handler(state, payload)
}