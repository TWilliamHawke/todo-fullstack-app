import {createStore, combineReducers, applyMiddleware} from 'redux'
import { userReducer } from './userReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { todoReducer } from './todoReducer'
import { filtersReducer } from './filtersReducer'

const reducer = combineReducers({
  user: userReducer,
  todo: todoReducer,
  filter: filtersReducer
})

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))