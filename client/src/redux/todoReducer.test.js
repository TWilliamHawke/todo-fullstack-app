import {todoReducer, initialState as reducerState} from './todoReducer'
import { FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE } from './types'

describe('test without data', () => {
  it('should return initial state', () => {
    expect(todoReducer(undefined, {})).toEqual(reducerState)
  })
})

describe('test on loading start', () => {
  it('should change loading params and remove errors', () => {
    const expectedState = reducerState
    const initialState = {
      loading:false,
      todoList: [],
      errors: ['some error'],
      todoLength: 0,    
    }
    const action = {type: FETCH_TODOS_REQUEST}
    expect(todoReducer(initialState, action)).toEqual(expectedState)
  })
})

describe('test on loading end', () => {
  it('should set todolost and todoLength with FETCH_TODOS_SUCCESS action', () => {
    const expectedState = {
      loading: false,
      todoList: ['some todo'],
      errors: [],
      todoLength: 42
    }
    const action = {
      type: FETCH_TODOS_SUCCESS,
      payload: {todoList: ['some todo'], todoLength: 42}}

    expect(todoReducer(reducerState, action)).toEqual(expectedState)
  })

  it('should set errors with FETCH_TODOS_FAILURE action', () => {
    const expectedState = {
      loading: false,
      todoList: [],
      todoLength: 0,
      errors: ['some errors']
    }
    const action = {type: FETCH_TODOS_FAILURE, payload: ['some errors']}
    expect(todoReducer(reducerState, action)).toEqual(expectedState)
  })
})
