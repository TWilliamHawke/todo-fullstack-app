import React, { useState, useEffect } from 'react';
import { hideMessages } from 'Src/redux/actions'
import './auth-page.css'
import { connect } from 'react-redux';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

export const AuthPage = ({ hideMessages, successMessage }) => {
  const [isLoginPage, setIsLoginPage] = useState(true)

  useEffect(() => {
    if(!successMessage) return;

    setIsLoginPage(true)
  }, [successMessage])

  const changePage = (name) => {
    hideMessages()
    setIsLoginPage(name)
  }

  return (
    <>
      <h1>Todo List</h1>
      {isLoginPage && <LoginPage changePage={changePage} />}
      {!isLoginPage && <SignUpPage changePage={changePage} />}
    </>
  );
};


const mapStateToProps = ({user}) => ({
  successMessage: user.successMessage
})

const mapDispatchToProps = { hideMessages }

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
