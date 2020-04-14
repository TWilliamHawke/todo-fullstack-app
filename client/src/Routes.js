import React, { useEffect } from 'react';
import TodoPage from './pages/TodoPage';
import { connect } from 'react-redux';
import AuthPage from './pages/AuthPage/AuthPage';
import { setAuth } from './redux/actions';


export const Routes = ({isAuth, setAuth}) => {
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