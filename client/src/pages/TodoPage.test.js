import { shallow } from 'enzyme'
import ConnectedTodoPage, { TodoPage } from './TodoPage'
import React from 'react'
import configureMockStore  from 'redux-mock-store'
import {shallowToJson} from 'enzyme-to-json'

describe('dummy component', () => {
  it('should rendered correctly', () => {
    const wrapper = shallow(<TodoPage errors='error array' />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should render errorList with correct data', () => {
    const wrapper = shallow(<TodoPage errors='error array' />)
    expect(wrapper.find('ErrorList').props().data).toBe('error array')
  })
})

describe('connected component', () => {
  let store, wrapper

  beforeAll(() => {
    const mockStore = configureMockStore()
    store = mockStore({todo: {errors: 'errors array'}})
    wrapper = shallow(<ConnectedTodoPage store={store} />).find(TodoPage)
  })

  it('should receive props from store', () => {
    expect(wrapper.props().errors).toBe('errors array')
  })

})