import React from 'react';
import AuthForm from './AuthForm';
import { loginUser } from 'Src/redux/actions'
import { connect } from 'react-redux';

 export const LoginPage = ({changePage, loginUser}) => {

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