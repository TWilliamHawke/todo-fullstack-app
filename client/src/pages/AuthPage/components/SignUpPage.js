import React from 'react';
import AuthForm from './AuthForm';
import { createUser } from 'Src/redux/actions'
import { connect } from 'react-redux';

const SignUpPage = ({changePage, createUser}) => {

  return(
    <>
      <h3>Sign Up</h3>
      <AuthForm fetchForm={createUser} pageName='Sign Up' >
        <button onClick={() => changePage(true)} className="link-btn">Have account?</button>
      </AuthForm>
    </>
  )
}

const mapDispatchToProps = {createUser}

export default connect(null, mapDispatchToProps)(SignUpPage);

