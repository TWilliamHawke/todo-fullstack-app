import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import TodoPage from './pages/TodoPage';
import { connect } from 'react-redux';
import AuthPage from './pages/AuthPage';


const Routes = () => {
  const tokens = localStorage.getItem('tokens')
  if(tokens) return <TodoPage />
  return <AuthPage />
};


export default Routes;