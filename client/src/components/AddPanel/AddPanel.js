import React, { useState } from 'react';
import { fetchTodo } from '../../redux/actions'
import './add-panel.css'
import { connect } from 'react-redux';

const AddPanel = ({ fetchTodo, loading }) => {
  const [title, setTitle] = useState('')

  const onSubmit = e => {
    if(loading) return
    e.preventDefault()
    fetchTodo('post', {title})
  }
  const onChangeTitle = e => {
    setTitle(e.target.value)
  }

  return (
    <form
      onSubmit={onSubmit}
      className='d-flex add-panel'>
      <input type='text'
        placeholder='What is next'
        onChange={onChangeTitle}
        value = {title}
        className='form-control add-input'></input>
      <button
        disabled={loading}
        type='submit'
        className='btn btn-outline-secondary'
        >Add item</button>
    </form>
  );
};

const mapStateToProps = state => ({loading: state.todo.loading})

const mapDispatchToProps = {
  fetchTodo
}


export default connect(mapStateToProps, mapDispatchToProps)(AddPanel)