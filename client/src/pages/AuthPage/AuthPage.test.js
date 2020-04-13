import React from 'react'
import { shallow } from 'enzyme'
import ConnectedAuthPage, { AuthPage } from './AuthPage'
import configStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { render, fireEvent} from '@testing-library/react'

const hideMessage = jest.fn(() => {})
jest.mock('../../redux/actions.js', () => ({
  loginUser: jest.fn(() => ({type: 'test'})),
  createUser: jest.fn(() => ({type: 'test'})),
  hideMessages: jest.fn(() => ({type: 'hideMessage'}))
}))

describe('test dummy component', () => {

  const setup = () => {
    const mockStore = configStore()
    const store = mockStore({todo: { errors: []}, user: {errors: []}, filter: {}})
    const {container, rerender} = render(
      <Provider store={store} >
        <AuthPage hideMessages={hideMessage} />
      </Provider>)
    return {container, rerender, store}
  }

  it('should render login page by default', () => {
    const {container} = setup()
    const header = container.querySelector('h3')
    expect(header.textContent).toBe('Login')
    fireEvent.click(container.querySelector('.link-btn'))
    expect(container.querySelector('h3').textContent).toBe('Sign Up')
  })

  describe('test after change page', () => {
    
    it('should change page on click', () => {
      let {container} = setup()
      fireEvent.click(container.querySelector('.link-btn'))
      expect(hideMessage).toBeCalled()
      expect(container.querySelector('h3').textContent).toBe('Sign Up')
    })
    
    it('should change page to login after showing success message', () => {
      let {container, rerender, store} = setup()
      fireEvent.click(container.querySelector('.link-btn'))
      rerender(<Provider store={store} ><AuthPage successMessage={true} hideMessages={hideMessage} /></Provider>)
      expect(container.querySelector('h3').textContent).toBe('Login')
      })
  })

})

describe('test connected component', () => {
  let wrapper
  beforeEach(() => {
    const mockStore = configStore()
    const store = mockStore({user: {successMessage: 'sometext'}})
    wrapper = shallow(<ConnectedAuthPage store={store} />).find('AuthPage')
  })

  it('should receive props from reducer', () => {
    expect(wrapper.props().successMessage).toBe('sometext')
    expect(wrapper.props().hideMessages()).toEqual({type: 'hideMessage'})
  })
})

