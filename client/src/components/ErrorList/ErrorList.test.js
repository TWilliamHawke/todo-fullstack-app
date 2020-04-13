import React from 'react'
import { shallow } from 'enzyme'
import ErrorList from './ErrorList'

describe('test ErrorList ', () => {
  it('should return null with empty arrat', () => {
    const wrapper = shallow(<ErrorList data={[]} />)
    expect(wrapper.html()).toBeNull()
  })


  describe('test with error array', () => {
    let wrapper
    
    const errorsArray = [
      'message 1',
      'message 2',
      'message 3'
    ]
    beforeEach(() => {
      wrapper = shallow(<ErrorList data={errorsArray} />)
    })

    it('should render 1 element per error message', () => {
      expect(wrapper.find('p').length).toBe(3)
    })

    it('should contain error message', () => {
      expect(wrapper.find('p').first().text()).toBe('message 1')
    })
  })
})