import React from 'react'
import { shallow } from 'enzyme'
import ConnectedAppHeader, { AppHeader } from './AppHeader'
import configStore from 'redux-mock-store'


jest.mock('../../redux/actions.js', () => ({
  logout: jest.fn(() => ({type: 'logout'}))
}))

describe('dummy component test', () => {
  let wrapper, logoutMock
  
  beforeAll(() => {
    logoutMock = jest.fn(() => {})
  })
  
  beforeEach(() => {
    wrapper = shallow(<AppHeader logout={logoutMock} />)
  })

  it('should render correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Todo List')
  })

  it('should call logout function', () => {
    wrapper.find('button').simulate('click')
    expect(logoutMock).toBeCalled()
  })

})

describe('connected component test', () => {
  let store, wrapper
  beforeEach(() => {
    const mockStore = configStore()
    store = mockStore({})
    wrapper = shallow(<ConnectedAppHeader store={store} />).find(AppHeader)
  })

  test('logout props should be same that was imported', () => {
    expect(wrapper.props().logout()).toEqual({type: 'logout'})
  })
})