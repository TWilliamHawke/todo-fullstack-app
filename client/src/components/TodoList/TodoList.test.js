import React from 'react'
import {shallow, mount} from 'enzyme'
import ConnectedTodoList, { TodoList } from './TodoList'
import configStore from 'redux-mock-store'

describe('test dumb component', () => {
  let wrapper
  beforeEach(() => {
    const props = {
      todoList: [
        {_id: 1, otherProps: 'test props'},
        {_id: 2, otherProps: 'test props'},
        {_id: 3, otherProps: 'test props'}
      ]
    }
    wrapper = shallow(<TodoList {...props} />)
  })

  it('shold map todolist array', () => {
    expect(wrapper.find('Connect(TodoItem)').length).toBe(3)
  })

  it('should give correct props to list items', () => {
    const item = wrapper.find('Connect(TodoItem)').first()
    expect(item.prop('id')).toBe(1)
    expect(item.prop('otherProps')).toBe('test props')
  })

})

describe('mount todolist', () => {
  it('should call useEffect', () => {
    const fetchMock = jest.fn()

    mount(<TodoList todoList={[]} fetchTodo={fetchMock} />)
    expect(fetchMock).toBeCalled()
  })
})

describe('test connected component', () => {
  it('should receive props from store', () => {
    const mockStore = configStore()
    const store = mockStore({todo: {
      todoList: 'testArray',
    }})
    const wrapper = shallow(
      <ConnectedTodoList store={store} />
    ).find('TodoList')

    expect(wrapper.prop('todoList')).toBe('testArray')
    expect(wrapper.prop('fetchTodo')).toBeInstanceOf(Function)
    
  })
})