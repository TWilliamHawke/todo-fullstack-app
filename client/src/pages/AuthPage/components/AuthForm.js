import React, { useState } from 'react';
import { connect } from 'react-redux';
import ErrorList from '../../../components/ErrorList/ErrorList';

const AuthForm = ({fetchForm, children, loading, pageName, errors, successMessage}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('123456')

  const formHandler = e => {
    e.preventDefault()
    fetchForm({email, password})
  }

  const formValidator = () => {
    return !loading && password.length > 5 && email.length > 5
  }

  return(
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
        {children}
      </div>
      <ErrorList data={errors} />
      {successMessage && <div className="alert alert-success">Account has been created!</div>}
      <div className='text-center'>
        <button type="submit" disabled={!formValidator()} className="btn btn-outline-secondary">{pageName}</button>
      </div>
    </form>
  )
}

const mapStateToProps = ({user}) => ({
  loading: user.loading,
  errors: user.errors,
  successMessage: user.successMessage
})

export default connect(mapStateToProps)(AuthForm)