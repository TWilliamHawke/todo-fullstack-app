import React from 'react'
import {shallow} from 'enzyme'
import ConnectedAuthForm, { AuthForm } from './AuthForm'
import { authValidator } from 'Src/utils/formValidator'
import configStore from 'redux-mock-store'
import { render, fireEvent, cleanup} from '@testing-library/react'

jest.mock('Src/utils/formValidator')

describe('test dummy component', () => {
  let wrapper
  const props = {
    fetchForm: jest.fn(),
    children: <h1>test child</h1>,
    loading: true,
    pageName: 'testName',
    errors: ['test array'],
    successMessage: true
  }
  
  beforeEach(() => {
    authValidator.mockReturnValue(false)
    wrapper = shallow(<AuthForm {...props} />)
  })

  it('should render children', () => {
    expect(wrapper.find('h1').text()).toBe('test child')
  })

  it('should render testname on button', () => {
    expect(wrapper.find('button').text()).toBe('testName')

  })

  it('should enable form submit', () => {
    expect(wrapper.find('button').prop('disabled')).toBe(false)
    wrapper.find('form').simulate('submit', {preventDefault: () => {}})
    expect(props.fetchForm).toBeCalled()
  })

  it('should transfer error list to component', () => {
    expect(wrapper.find('ErrorList').prop('data')).toEqual(['test array'])
  })

  it('should render success message', () => {
    expect(wrapper.find('.alert.alert-success').text()).toBe('Account has been created!')
  })

})

describe('testing inputs with react-testing-library', () => {
  afterEach(cleanup)

  it('should change email input', () => {
    const {container} = render(<AuthForm errors={[]} />)
    const input = container.querySelector('[type="email"')
    fireEvent.change(input, { target:{ value: 'qwerty' }})
    expect(input.value).toBe('qwerty')
  })

  it('should change password input', () => {
    const {container} = render(<AuthForm errors={[]} />)
    const input = container.querySelector('[type="password"')
    fireEvent.change(input, { target:{ value: ' qwerty ' }})
    expect(input.value).toBe('qwerty')
  })
})

describe('test connected component', () => {
  let store, wrapper
  beforeEach(() => {
    const mockStore = configStore()
    store = mockStore({
      user: {
        loading: 'testLoading',
        errors: 'testErrors',
        successMessage: 'testMessage'
    }})
    wrapper = shallow(<ConnectedAuthForm store={store} />).find('AuthForm')
  })

  it('should receive props from store', () => {
    expect(wrapper.prop('loading')).toBe('testLoading')
    expect(wrapper.prop('errors')).toBe('testErrors')
    expect(wrapper.prop('successMessage')).toBe('testMessage')
  })
})