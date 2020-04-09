import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import Enzyme, { shallow, render, mount } from 'enzyme'
import tojson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

it('renders correctly', () => {
  const wrapper = shallow(<App />)

  expect(tojson(wrapper)).toMatchSnapshot()
})
