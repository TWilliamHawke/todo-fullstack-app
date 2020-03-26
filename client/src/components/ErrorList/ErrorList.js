import React from 'react';
import './error-list.css'

const ErrorList = ({data}) => {
  if(!data.length) return null
  return (
    <>
      {data.map((e, i) => <p key={i} className='error'>{e}</p>)}
    </>
  );
};

export default ErrorList;