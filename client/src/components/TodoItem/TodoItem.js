import React from 'react';
import './todo-item.css'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { fetchTodo } from '../../redux/actions'
import { connect } from 'react-redux';

const TodoItem = ({ fetchTodo, done, important, title, id, loading }) => {
  let clasNames = 'todo-list-item'
  if(done) {
    clasNames += ' done'
  }
  if(important) {
    clasNames += ' important'
  }

  const onDone = () => {
    if(loading) return
    fetchTodo('patch', {id, done: !done})
  }

  return (
    <li className='list-group-item'>
    <span className={clasNames}>
      <span
        className="todo-list-item-label"
        onClick = { onDone }>
        {title}
      </span>

      <button 
        type="button"
        onClick = {() => fetchTodo('patch', {id, important: !important})}
        disabled={loading}
        className="btn btn-outline-success btn-sm float-right">
        <FontAwesomeIcon icon={faExclamation} />
      </button>

      <button
        type="button"
        onClick = {() => fetchTodo('delete', {id})}
        disabled={loading}
        className="btn btn-outline-danger btn-sm float-right">
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </span>
    </li>
  );


}

const mapStateToProps = state => ({loading: state.todo.loading})

const mapDispatchToProps = {
  fetchTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);