import React from 'react';
import AuthForm from '../AuthPage/components/AuthForm';
import { loginUser } from '../../redux/actions'
import { connect } from 'react-redux';

const LoginPage = ({changePage, loginUser}) => {

  return(
    <>
      <h3>Login</h3>
      <AuthForm fetchForm={loginUser} pageName='Login' >
        <button onClick={() => changePage(false)} className="link-btn">Need account?</button>
      </AuthForm>
    </>
  )
}

const mapDispatchToProps = {loginUser}

export default connect(null, mapDispatchToProps)(LoginPage);