import { filtersReducer } from './filtersReducer'
import { SET_FILTER_LIMIT, SET_FILTER_TITLE, SET_FILTER_DONE } from './types'

const initialState = {
  limit: -10,
  title: '',
  show: 'all',
}

describe('test without data',() => {
  it('should return initial state', () => {
    expect(filtersReducer(undefined, {})).toEqual(initialState)
  })
})

describe('test with SET_FILTER_LIMIT action', () => {
  const expectedState = {
    limit: -20,
    title: '',
    show: 'all'
  }
  it('should return expected state', () => {
    const action = {type: SET_FILTER_LIMIT}
    expect(filtersReducer(initialState, action)).toEqual(expectedState)
  })
})

describe('test with SET_FILTER_TITLE action', () => {
  const expectedState = {
    limit: -10,
    title: 'some title',
    show: 'all'
  }
  it('should return expected state', () => {
    const action = {type: SET_FILTER_TITLE, payload: 'some title'}
    expect(filtersReducer(initialState, action)).toEqual(expectedState)
  })
})

describe('test with SET_FILTER_DONE action', () => {
  const expectedState = {
    limit: -10,
    title: '',
    show: 'some'
  }
  it('should return expected state', () => {
    const action = {type: SET_FILTER_DONE, payload: 'some'}
    expect(filtersReducer(initialState, action)).toEqual(expectedState)
  })
})

