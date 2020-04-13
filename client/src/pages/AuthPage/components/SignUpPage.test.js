import React from 'react'
import { shallow } from 'enzyme'
import ConnectedSignUpPage, { SignUpPage } from './SignUpPage'
import configStore from 'redux-mock-store'

describe('test dummy component', () => {
  let wrapper
  const changePage = jest.fn()
  const createUser = jest.fn()
  beforeEach(() => {
    wrapper = shallow(<SignUpPage changePage={changePage} createUser={createUser} />)
  })

  it('should transfer create user function to authForm props', () => {
    wrapper.find('Connect(AuthForm)').props().fetchForm()
    expect(createUser).toBeCalled()
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
    wrapper = shallow(<ConnectedSignUpPage store={store} />).find('SignUpPage')
  })

  it('should receive props from store', () => {
    expect(wrapper.prop('createUser')).toBeInstanceOf(Function)
  })
})