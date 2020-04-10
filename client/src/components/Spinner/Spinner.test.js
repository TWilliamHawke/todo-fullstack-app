import React from 'react'
import {shallow} from 'enzyme'
import Spinner from './Spinner'

test('render correct text', () => {
  const wrapper = shallow(<Spinner />)
  expect(wrapper.find('.sr-only').props().children).toMatch('Loading')
})