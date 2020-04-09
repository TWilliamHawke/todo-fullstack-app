import { setFilterDone, setFilterLimit, setFilterTitle } from "./filtersActions"
import { fetchTodo } from "./actions"
import thunk from "redux-thunk"
import configureMockStore from 'redux-mock-store'
import { SET_FILTER_DONE, SET_FILTER_LIMIT, SET_FILTER_TITLE } from "./types"

jest.mock('./actions.js')

const mockStore = configureMockStore([thunk])
fetchTodo.mockImplementation(() => ({type: ''}))

describe('filter done action', () => {
  let store

  beforeAll(() => {
    fetchTodo.mockClear()
    store = mockStore({})
    store.dispatch(setFilterDone('some data'))
  })

  it('should return correct action', () => {
    const expectationResult = {type: SET_FILTER_DONE, payload: 'some data'}
    expect(store.getActions()[0]).toEqual(expectationResult)
  })

  it('should call fetch todo action', () => {
    expect(fetchTodo).toBeCalledTimes(1)
    expect(fetchTodo).toBeCalledWith('get')
  })
})

describe('filter limit action', () => {
  let store

  beforeAll(() => {
    fetchTodo.mockClear()
    store = mockStore({})
    store.dispatch(setFilterLimit())
  })

  it('should return correct action(SET_FILTER_LIMIT)', () => {
    const expectationResult = { type: SET_FILTER_LIMIT }
    expect(store.getActions()[0]).toEqual(expectationResult)
  })

  it('should call fetch todo action(limit)', () => {
    expect(fetchTodo).toBeCalledTimes(1)
    expect(fetchTodo).toBeCalledWith('get')
  })
})

describe('filter title action', () => {
  let store

  beforeAll(() => {
    fetchTodo.mockClear()
    store = mockStore({})
    store.dispatch(setFilterTitle('some data'))
  })

  it('should return correct action(SET_FILTER_TITLE)', () => {
    const expectationResult = {type: SET_FILTER_TITLE, payload: 'some data'}
    expect(store.getActions()[0]).toEqual(expectationResult)
  })

  it('should call fetch todo action(title)', () => {
    expect(fetchTodo).toBeCalledWith('get')
    expect(fetchTodo).toBeCalledTimes(1)
  })
})

