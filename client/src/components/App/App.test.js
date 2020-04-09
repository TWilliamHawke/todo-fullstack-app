import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { shallow, render, mount } from 'enzyme'
import tojson from 'enzyme-to-json'


it('renders correctly', () => {
  const wrapper = shallow(<App />)

  expect(tojson(wrapper)).toMatchSnapshot()
})
