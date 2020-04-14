import React from 'react'
import { render, cleanup, fireEvent} from '@testing-library/react'
import ConnectedAddPanel, { AddPanel } from './AddPanel'
import configStore from 'redux-mock-store'
import { shallow } from 'enzyme'

afterEach(cleanup)

describe('test dummy component', () => {
  const fetchMock = jest.fn()
  const setup = () => {
    const {container} = render(<AddPanel fetchTodo={fetchMock} loading={true} />)
    return container
  }

  it('should change input value', () => {
    const container = setup()
    const input = container.querySelector('input')
    fireEvent.change(input, {target: {value: 'qwerty'}})
    expect(input.value).toBe('qwerty')
  })

  it('should render disabled button', () => {
    const container = setup()
    const button = container.querySelector('button')
    expect(button.disabled).toBe(true)
  })

  it('should prevent submit event', () => {
    const container = setup()
    const form = container.querySelector('form')
    fireEvent.submit(form)
    expect(fetchMock).not.toBeCalled()
  })

  it('should call submit event', () => {
    const {container} = render(<AddPanel fetchTodo={fetchMock} />)
    const form = container.querySelector('form')
    fireEvent.submit(form)
    expect(fetchMock).toBeCalled()
  })
})

describe('test connected component', () => {
  let wrapper, store
  beforeEach(() => {
    const mockStore = configStore()
    store = mockStore({todo: {loading: 'testLoading'}})
    wrapper = shallow(<ConnectedAddPanel store={store} />).find('AddPanel')
  })

  it('should receive props from store', () => {
    expect(wrapper.prop('loading')).toBe('testLoading')
    expect(wrapper.prop('fetchTodo')).toBeInstanceOf(Function)
  })
})