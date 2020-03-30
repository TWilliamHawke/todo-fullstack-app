import React, { useState, useEffect } from 'react';
import { createUser, hideMessages, loginUser } from '../redux/actions'
import './auth-page.css'
import { connect } from 'react-redux';
import ErrorList from '../components/ErrorList/ErrorList';

const AuthPage = ({createUser, loading, errors, hideMessages, successMessage, loginUser }) => {
  const [pageName, setPageName] = useState('Login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('123456')

  const formHandler = e => {
    e.preventDefault()
    if(pageName === 'Login') {
      loginUser({email, password})
    } else {
      createUser({email, password})
    }
  }

  useEffect(() => {
    if(!successMessage) return
    setPageName('Login')
  }, [successMessage])

  const formValidator = () => {
    return !loading && password.length > 5 && email.length > 5
  }

  const changePage = (name) => {
    hideMessages()
      setPageName(name)
  }

  return (
    <>
      <h1>Todo List</h1>
      <h3>{pageName}</h3>
      <form onSubmit={formHandler}>
        <div className="form-group">
          <label htmlFor="emailInput">Email address</label>
          <input type="email" 
          className="form-control" 
          value={email}
          onChange={e => setEmail(e.target.value.trim())}
          id="emailInput" aria-describedby="emailHelp"/>
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Password</label>
          <input 
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value.trim())}
            className="form-control" 
            id="passwordInput"/>
        </div>
        <div className='link-wrapper'>
          {pageName === 'Login' && <button onClick={() => changePage('Sign Up')} className="link-btn">Need account?</button>}
          {pageName !== 'Login' && <button onClick={() => changePage('Login')} className="link-btn">Have account?</button>}
        </div>
        <ErrorList data={errors} />
        {successMessage && <div className="alert alert-success">Account has been created!</div>}
        <div className='text-center'>
          <button type="submit" disabled={!formValidator()} className="btn btn-outline-secondary">{pageName}</button>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = ({user}) => ({
  loading: user.loading,
  errors: user.errors,
  successMessage: user.successMessage
})

const mapDispatchToProps = {
  createUser, hideMessages, loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
