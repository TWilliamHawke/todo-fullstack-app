import React from 'react'
import ConnectedSearchPanel, { SearchPanel } from './SearchPanel'
import {render, fireEvent, cleanup} from '@testing-library/react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'


jest.mock('../../redux/filtersActions.js', () => (
  {setFilterTitle: jest.fn(() => ({type: 'test action'}))}
  ))
  
afterEach(cleanup)

describe('test dummy coomponent', () => {

  const setup = () => {
    const {getByPlaceholderText} = render(<SearchPanel setFilterTitle={jest.fn(() => {})} />)
    const input = getByPlaceholderText('type to search')
    return input
  }

  test('render will be correctly', () => {
    const input = setup()
    expect(input.type).toBe('text')
  })
  
  it('should change input value', () => {
    const input = setup()
  
    expect(input.value).toBe('')
    fireEvent.change(input, { target:{ value: 'qwerty' }})
    expect(input.value).toBe('qwerty')
  })
})

describe('test connected component', () => {
  let input, store
  beforeEach(() => {
    const mockStore = configureStore([thunk])
    store = mockStore({})
    const {getByPlaceholderText} = render(<ConnectedSearchPanel store={store} />)
    input = getByPlaceholderText('type to search')
  })

  it('should dispatch test action with change event', () => {
    expect(input.value).toBe('')
    fireEvent.change(input, { target:{ value: 'qwerty' }})
    expect(store.getActions()[0]).toEqual({type: 'test action'})
  })
})