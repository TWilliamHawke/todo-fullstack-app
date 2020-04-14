import React from 'react'
import { mount, shallow } from 'enzyme'
import ConnectedRoutes, { Routes } from './Routes'
import configStore from 'redux-mock-store'

jest.mock('./pages/AuthPage/AuthPage', () => (() => <h1>AuthPage</h1>))
jest.mock('./pages/TodoPage.js', () => (() => <h1>TodoPage</h1>))

describe('test dumb component', () => {
  let wrapper
  const authMock = jest.fn()
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => 'someToken')
    wrapper = mount(<Routes isAuth={true} setAuth={authMock} />)
  })

  it('should call setAuth function', () => {
    expect(authMock).toBeCalled()
  })

  it('should render todoPage', () => {
    expect(wrapper.find('h1').text()).toBe('TodoPage')
  })
})

describe('test dumb component', () => {
  let wrapper
  const authMock = jest.fn()
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => false)
    wrapper = mount(<Routes isAuth={false} setAuth={authMock} />)
  })

  it('should not call setAuth function', () => {
    expect(authMock).not.toBeCalled()
  })

  it('should render authPage', () => {
    expect(wrapper.find('h1').text()).toBe('AuthPage')
  })
})

describe('test connected component', () => {
  it('should receive props from store', () => {
    const mockStore = configStore()
    const store = mockStore({user: {
      isAuth: 'testAuth',
    }})
    const wrapper = shallow(
      <ConnectedRoutes store={store} />
    ).find('Routes')

    expect(wrapper.prop('isAuth')).toBe('testAuth')
    expect(wrapper.prop('setAuth')).toBeInstanceOf(Function)
    
  })
})