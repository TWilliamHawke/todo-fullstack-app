import React from 'react';

const LoginForm = () => {
  return (
    <>
      <div className='link-wrapper'>
        <button onClick={() => setIsLoginPage(false)} className="link-btn">Need account?</button>
      </div>
      <div className='text-center'>
        <button type="submit" className="btn btn-outline-secondary">Login</button>
      </div>
    </>
  );
};

export default LoginForm;