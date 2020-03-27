import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import TodoPage from './pages/TodoPage';
import { connect } from 'react-redux';
import AuthPage from './pages/AuthPage';
import { setAuth } from './redux/actions';


const Routes = ({isAuth, setAuth}) => {
  const tokens = localStorage.getItem('tokens')

  useEffect(() => {
    if(tokens) setAuth()
  }, [])

  if(tokens || isAuth) return <TodoPage />
  return <AuthPage />
};

const mapStateToProps = state => ({
  isAuth: state.user.isAuth
})

const mapDispatchToProps = {setAuth}
export default connect(mapStateToProps, mapDispatchToProps)(Routes);