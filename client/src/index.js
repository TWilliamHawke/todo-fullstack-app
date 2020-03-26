import React from 'react';
import { render } from 'react-dom'
import Routes from './routes';
import './style.scss'
import {Provider} from 'react-redux'
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="todo-app">
        <Routes />
      </div>
    </Provider>
  )
}

render(<App />, document.getElementById('root'))