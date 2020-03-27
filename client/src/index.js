import React from 'react';
import { render } from 'react-dom'
import Routes from './routes';
import './style.scss'
import {Provider} from 'react-redux'
import { store } from './redux/store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
      <div className="todo-app">
        <Routes />
      </div>
      </ErrorBoundary>
    </Provider>
  )
}

render(<App />, document.getElementById('root'))