import React from 'react'
import { shallow } from 'enzyme'
import ConnectedLoginPage, {LoginPage} from './LoginPage'
import configStore from 'redux-mock-store'

describe('test dummy component', () => {
  let wrapper
  const changePage = jest.fn()
  const loginUser = jest.fn()
  beforeEach(() => {
    wrapper = shallow(<LoginPage changePage={changePage} loginUser={loginUser} />)
  })

  it('should transfer create user function to authForm props', () => {
    wrapper.find('Connect(AuthForm)').props().fetchForm()
    expect(loginUser).toBeCalled()
  })

  it('should call changePage function on click', () => {
    wrapper.find('button').simulate('click')
    expect(changePage).toBeCalled()
  })
})

describe('test connected component', () => {
  let wrapper, store
  beforeAll(() => {
    const mockStore = configStore()
    store = mockStore({user: {}})
    wrapper = shallow(<ConnectedLoginPage store={store} />).find('LoginPage')
  })

  it('should receive props from store', () => {
    expect(wrapper.prop('loginUser')).toBeInstanceOf(Function)
  })
})