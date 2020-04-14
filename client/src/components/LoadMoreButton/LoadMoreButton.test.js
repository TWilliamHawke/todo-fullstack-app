import React from 'react'
import {shallow} from 'enzyme'
import  ConnectedLoadMoreButton, { LoadMoreButton } from './LoadMoreButton'
import configStore from 'redux-mock-store'

describe('test dumb component', () => {
  let wrapper, button
  const mockFilter = jest.fn()
  const props = {
    setFilterLimit: mockFilter,
    loading: false,
    limit: 5,
    todoLength: 10
  }

  describe('test with active button', () => {
    beforeAll(() => {
      wrapper = shallow(<LoadMoreButton {...props} />)
      button = wrapper.find('button')
    })
  
    test('button should be active', () => {
      expect(button.props().disabled).toBe(false)
      expect(button.text()).toBe('Load More')
    })
  
    test('todo count should display correctly', () => {
      expect(wrapper.find('.todo-count').text()).toMatch('5 of 10')
    })

    test('button class shound include load-more', () => {
      expect(button.hasClass('load-more')).toBe(true)
    })
  
    test('filter function should be called', () => {
      button.simulate('click')
      expect(mockFilter).toBeCalled()
    })
  })

  describe('test while loading', () => {
    beforeEach(() => {
      props.loading = true
      wrapper = shallow(<LoadMoreButton {...props} />)
      button = wrapper.find('button')
    })

    test('button should be disabled', () => {
      expect(button.prop('disabled')).toBe(true)
      expect(button.find('Spinner')).toHaveLength(1)
    })
  })
})

describe('test connected component', () => {
  it('should receive props from store', () => {
    const mockStore = configStore()
    const store = mockStore({todo: {
      todoList: [1, 2, 3],
      loading: 'testLoading',
      todoLength: 'testLength'
    }})
    const wrapper = shallow(
      <ConnectedLoadMoreButton store={store} />
    ).find('LoadMoreButton')

    expect(wrapper.prop('limit')).toBe(3)
    expect(wrapper.prop('loading')).toBe('testLoading')
    expect(wrapper.prop('todoLength')).toBe('testLength')
    expect(wrapper.prop('setFilterLimit')).toBeInstanceOf(Function)
    
  })
})