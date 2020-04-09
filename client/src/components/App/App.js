import React from 'react'
import { Provider } from 'react-redux'

import Routes from 'Src/routes';
import { store } from 'Src/redux/store';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';


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

export default App
