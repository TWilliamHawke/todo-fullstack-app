import React from 'react';
import './app-header.css'
import { logout } from '../../redux/actions'
import { connect } from 'react-redux';

export const AppHeader = ({logout}) => {

  return (
    <div className="app-header d-flex">
      <h1>Todo List</h1>
      <button onClick={logout} className='btn btn-outline-danger'>&times;</button>
    </div>
  );
};

const mapDispatchToProps = {
  logout
}

export default connect(null, mapDispatchToProps)(AppHeader);
