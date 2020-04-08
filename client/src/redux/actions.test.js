import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import { createUser, authFailure, setAuth, authRequest, hideMessages, createUserSuccess, loginUser, logout, fetchTodosSuccess, fetchTodosFailure, fetchTodo } from './actions'
import { CREATE_USER_SUCCESS, AUTH_REQUEST, AUTH_FAILURE, LOGIN_SUCCESS, HIDE_AUTH_MESSAGES, LOGOUT, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE, FETCH_TODOS_REQUEST } from './types'
import { transformErrors } from './actionHelpers'
//import { getToken } from '../utils/token'

jest.mock('axios')
jest.mock('../utils/token.js', () => ({getToken: jest.fn(() => 'testToken')}))
jest.mock('./actionHelpers.js', () => ({transformErrors: jest.fn(() => 'transformed Array')}))

const mockStore = configureMockStore([thunk])
let store


describe('authFailure action', () => {

  // it('should call transformError', () => {
  //   authFailure('data')
  //   expect(transformErrors).toBeCalled()
  //   expect(transformErrors).toBeCalledWith('data')
  // })
  
  it('should return correct action', () => {

    expect(authFailure('data')).toEqual({type:AUTH_FAILURE, payload: 'transformed Array'})
  })
})

describe('setAuth action', () => {
  it('should return LOGIN_SUCCESS type', () => {
    expect(setAuth().type).toBe(LOGIN_SUCCESS)
  })
})

describe('authRequest action', () => {
  it('should return AUTH_REQUEST type', () => {
    expect(authRequest().type).toBe(AUTH_REQUEST)
  })
})

describe('hideMessage action', () => {
  it('should return HIDE_AUTH_MESSAGES type', () => {
    expect(hideMessages().type).toBe(HIDE_AUTH_MESSAGES)
  })
})

describe('createUserSuccess action', () => {
  it('should return CREATE_USER_SUCCESS type', () => {
    expect(createUserSuccess().type).toBe(CREATE_USER_SUCCESS)
  })
})

//===================
// Create User

describe('createUser action', () => {

  beforeAll(() => {
    axios.post
      .mockResolvedValueOnce('data')
      .mockResolvedValueOnce('data')
      .mockResolvedValueOnce('data')
      .mockRejectedValue({response: {data: ''}})
  })

  afterAll(() => {
    axios.post.mockClear()
  })

  beforeEach(async () => {
    store = mockStore(() => {})
    await store.dispatch(createUser('userData'))
  })

  it('should call axios', async () => {

    expect(axios.post).toBeCalledTimes(1)
    expect(axios.post.mock.calls[0][1]).toBe('userData')
  })

  it('should create AUTH_REQUEST action first', () => {
    expect(store.getActions()[0].type).toBe(AUTH_REQUEST)
  })
  
  it('should create CREATE_USER_SUCCESS type', () => {
    expect(store.getActions()[1].type).toBe(CREATE_USER_SUCCESS)
  })

  it('should create AUTH_FAILURE with error responce', () => {
    expect(store.getActions()[1]).toEqual(authFailure('data'))
  })
})

//========
//login user

describe('login user action', () => {
  beforeAll(() => {
    // jest.spyOn(Storage.prototype, 'setItem')
    jest.spyOn(JSON, 'stringify').mockImplementation(() => 'storageData')
    axios.post
      .mockRejectedValueOnce({response: {data: ''}})
      .mockResolvedValue({data: 'tokens'})
  })

  afterAll(() => {
    axios.post.mockClear()
  })

  beforeEach(async () => {
    store = mockStore({})
    await store.dispatch(loginUser('some data'))
  })

  it('should create AUTH_FAILURE with error responce', () => {
    expect(store.getActions()[1]).toEqual(authFailure('data'))
  })

  // it('should call axios', () => {
  //   expect(axios.post.mock.calls[0][1]).toBe('some data')
  // })

  // it('should call json stringify', () => {
  //   expect(JSON.stringify).toBeCalledWith('tokens')
  // })

  // it('call localstorage', () => {
  //   expect(localStorage.setItem.mock.calls[0][0]).toBe('tokens')
  //   expect(localStorage.setItem.mock.calls[0][1]).toBe('storageData')
  // })

  it('should create AUTH_REQUEST action first', () => {
    expect(store.getActions()[0].type).toBe(AUTH_REQUEST)
  })
  
  it('should create SET_AUTH type', () => {
    expect(store.getActions()[1].type).toBe(LOGIN_SUCCESS)
  })

})

describe('logout function', () => {
  // beforeAll(() => {

  //   jest.spyOn(Storage.prototype, 'removeItem')
  // })

  // it('should call localStorage', () => {
  //   logout()
  //   expect(localStorage.removeItem).toBeCalledWith('tokens')
  // })

  it('should return ', () => {
    expect(logout().type).toBe(LOGOUT)
  })
})

describe('fetchTodosSuccess action', () => {
  it('should return FETCH_TODOS_SUCCESS type', () => {
    const expectedAction = {type: FETCH_TODOS_SUCCESS, payload: 'data'}
    expect(fetchTodosSuccess('data')).toEqual(expectedAction)
  })
})

describe('fetchTodosFailure action', () => {

  it('should call transformErrors functioin', () => {
    fetchTodosFailure('errors')
    expect(transformErrors).toBeCalledWith('errors')
  })

  it('should return acion', () => {
    const expectedAction = { type: FETCH_TODOS_FAILURE, payload: 'transformed Array'}
    expect(fetchTodosFailure('errors')).toEqual(expectedAction)
  })
})

describe('fetch todos action', () => {

  beforeEach(() => {
    store = mockStore({filter: {limit: 10, title: 'test', show: 'all'}})
  })

  describe('test with success axios querry', () => {
    beforeAll(() => {
      axios.mockResolvedValue({data: 'todos'})
    })
  
    afterAll(() => {
      axios.mockClear()
    })
    
    beforeEach(async () => {
      await store.dispatch(fetchTodo('testMethod', 'testData'))
    })
  
    it('should dispatch FETCH_TODOS_REQUEST first', () => {
      expect(store.getActions()[0].type).toBe(FETCH_TODOS_REQUEST)
    })
  
    // it('should call getToken function', () => {
    //   expect(getToken).toBeCalled()
    // })
    
    it('should call axios', () => {
      const url = '/api/todo?limit=10&title=test&show=all'
      const axiosParams = {method: 'testMethod', data: 'testData', headers: {Authorization: 'testToken'}}
      expect(axios.mock.calls[0][0]).toBe(url)
      expect(axios.mock.calls[0][1]).toEqual(axiosParams)
    })
  
    it('should dispatch FETCH_TODOS_SUCCESS with right data', () => {
      expect(store.getActions()[1]).toEqual({type: FETCH_TODOS_SUCCESS, payload: 'todos'})
    })
  
  })

  describe('test with axios failure', () => {
    afterEach(() => {
      axios.mockClear()
    })
    
    it('should dispatch logout and AUTH_FAILURE', async () => {
      axios.mockRejectedValue({response: {data: {logout: true}}})
      await store.dispatch(fetchTodo('get', 'somedata'))
      expect(store.getActions()[1].type).toBe(LOGOUT)
      expect(store.getActions()[2].type).toBe(AUTH_FAILURE)
    })
    
    it('should dispatch FETCH_TODOS_FAILURE without logout', async () => {
      axios.mockRejectedValue({response: {data: {logout: false}}})
      await store.dispatch(fetchTodo('get', 'somedata'))
      expect(store.getActions()[1].type).toBe(FETCH_TODOS_FAILURE)
    })
  })

})