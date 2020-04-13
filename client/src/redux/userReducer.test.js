import {userReducer, initial_state as reducerState} from './userReducer'
import { CREATE_USER_SUCCESS, AUTH_REQUEST, HIDE_AUTH_MESSAGES, LOGOUT, AUTH_FAILURE, LOGIN_SUCCESS } from './types'

describe('test without data', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, {})).toEqual(reducerState)
  })
})

describe('test before loading', () => {

  it('should change loading params and remove errors', () => {
    const initialState = {
      ...reducerState,
      loading: false,
      successMessage: true,
      errors: ['some error'],
    }
    const expectedState = {
      ...reducerState,
      successMessage: false,
      loading: true,
      errors: []
    }
    const action = {type: AUTH_REQUEST}
    expect(userReducer(initialState, action)).toEqual(expectedState)
  })

  it('should hide messages and clear errors', () => {
    const initialState = {
      ...reducerState,
      successMessage: true,
      errors: ['some error'],
    }
    const expectedState = {
      ...reducerState,
      successMessage: false,
      errors: []
    }
    const action = {type: HIDE_AUTH_MESSAGES}
    expect(userReducer(initialState, action)).toEqual(expectedState)
  })

  it('should set isAuth to false', () => {
    const initialState = {
      ...reducerState,
      isAuth: true
    }
    const expectedState = {
      ...reducerState,
      isAuth: false
    }
    const action = {type: LOGOUT}
    expect(userReducer(initialState, action)).toEqual(expectedState)
  })
})

describe('test on end of loading', () => {
  const initialState = {
    errors: [],
    loading: true,
    successMessage: false,
    isAuth: false  
  }

  it('should set errors array', () => {
    const expectedState = {
      ...initialState,
      loading: false,
      errors: ['some error']
    }
    const action = {type: AUTH_FAILURE, payload: ['some error']}
    expect(userReducer(initialState, action)).toEqual(expectedState)
  })

  it('should set isAuth success', () => {
    const expectedState = {
      ...initialState,
      loading: false,
      isAuth: true
    }
    const action = { type: LOGIN_SUCCESS}
    expect(userReducer(initialState, action)).toEqual(expectedState)
  })

  it('should show success message', () => {
    const expectedState = {
      ...initialState,
      loading: false,
      successMessage: true
    }
    const action = {type: CREATE_USER_SUCCESS}
    expect(userReducer(initialState, action)).toEqual(expectedState)
  })
})
