import React from 'react'
import {shallow} from 'enzyme'
import ConnectedItemStatusFilter, {ItemStatusFilter} from './ItemStatusFilter'
import configStore from 'redux-mock-store'


const mockFilter = jest.fn(() => {})
jest.mock('../../redux/filtersActions.js', () => ({
  setFilterDone: jest.fn(() => ({type: 'test'}))
}))

describe('test dummy component', () => {
  let wrapper
  
  it('selected button should be active', () => {
    wrapper = shallow(<ItemStatusFilter show='active' />)
    const button = wrapper.find('.btn-info')
    expect(button.length).toBe(1)
    expect(button.props().name).toBe('active')
    
  })

  test('buttons should be inactive while loading', () => {
    wrapper = shallow(<ItemStatusFilter loading={true} />)
    const button = wrapper.find('button').first()
    expect(button.props().disabled).toBe(true)
  })

  it('should call function on click', () => {
    wrapper = shallow(<ItemStatusFilter setFilterDone={mockFilter} />)
    const button = wrapper.find('.btn-group').first()
    button.simulate('click', {target: {name: 'active'}})
    expect(mockFilter).toBeCalledTimes(1)

  })

})

describe('test connected component', () => {
  let store, wrapper
  beforeEach(() => {
    const mockStore = configStore()
    
    const state = {
      filter: {show: 'testShow'},
      todo: {loading: 'testLoading'}
    }
    store = mockStore(state)
    wrapper = shallow(<ConnectedItemStatusFilter store={store} />)
      .find('ItemStatusFilter')
  })

  it('should receive props from store', () => {
    expect(wrapper.props().loading).toBe('testLoading')
    expect(wrapper.props().show).toBe('testShow')
    expect(wrapper.props().setFilterDone()).toEqual({type: 'test'})
  })
})