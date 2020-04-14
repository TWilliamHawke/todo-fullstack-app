import React from 'react'
import {shallow} from 'enzyme'
import ConnetctedTodoItem, { TodoItem } from './TodoItem'
import configStore from 'redux-mock-store'

describe('test dumb component', () => {
  let wrapper
  const fetchMock = jest.fn()
  
  beforeEach(() => {
    const props = {
      fetchTodo: fetchMock,
      done: true,
      important: true,
      title: 'testTitle',
      loading: false
    }
    fetchMock.mockClear()
    wrapper = shallow(<TodoItem {...props} />)
  })

  it('should render full class name', () => {
    expect(wrapper.find('span').first().hasClass('important')).toBe(true)
    expect(wrapper.find('span').first().hasClass('done')).toBe(true)
  })

  test('buttons should be active', () => {
    expect(wrapper.find('button').first().prop('disabled')).toBe(false)
  })

  it('should render title', () => {
    expect(wrapper.find('.todo-list-item-label').text()).toBe('testTitle')
  })

  test('click on title should call fetchTodo', () => {
    wrapper.find('.todo-list-item-label').simulate('click')
    expect(fetchMock).toBeCalled()
  })

  test('click on button shuld call fetchtodo', () => {
    wrapper.find('button').first().simulate('click')
    expect(fetchMock.mock.calls[0][0]).toBe('patch')
    fetchMock.mockClear()
    wrapper.find('button').at(1).simulate('click')
    expect(fetchMock.mock.calls[0][0]).toBe('delete')
  })
})

describe('test with alter props', () => {
  let wrapper
  const fetchMock = jest.fn()
  
  beforeEach(() => {
    const props = {
      fetchTodo: fetchMock,
      done: false,
      important: false,
      loading: true
    }
    fetchMock.mockClear()
    wrapper = shallow(<TodoItem {...props} />)
  })

  it('should not render full class name', () => {
    expect(wrapper.find('span').first().hasClass('important')).toBe(false)
    expect(wrapper.find('span').first().hasClass('done')).toBe(false)
  })

  test('buttons should be disabled', () => {
    expect(wrapper.find('button').first().prop('disabled')).toBe(true)
  })

  test('click on title should not call fetchTodo', () => {
    wrapper.find('.todo-list-item-label').simulate('click')
    expect(fetchMock).not.toBeCalled()
  })

})

describe('test connected component', () => {
  it('should receive props from store', () => {
    const mockStore = configStore()
    const store = mockStore({todo: {
      loading: 'testLoading',
    }})
    const wrapper = shallow(
      <ConnetctedTodoItem store={store} />
    ).find('TodoItem')

    expect(wrapper.prop('loading')).toBe('testLoading')
    expect(wrapper.prop('fetchTodo')).toBeInstanceOf(Function)
    
  })
})