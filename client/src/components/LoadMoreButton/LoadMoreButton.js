import React from 'react';
import { fetchTodo, setFilterLimit } from '../../redux/actions'
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import './load-more-buttons.css'

const LoadMoreButton = ({ setFilterLimit, loading, limit, todoLength }) => {
  let className = 'btn btn-outline-secondary btn-lg btn-block'
  if(!loading) className += ' load-more'
  const showingCount = todoLength + limit < 0 ? todoLength : limit * -1
  return (
    <>
      <p className='todo-count'>Loaded {showingCount} of {todoLength}</p>
    <button
      disabled={todoLength + limit < 0}
      onClick={setFilterLimit}
     className={className}>
      {loading ? <Spinner /> : 'LoadMore'}
    </button>
    </>
  );
};

const mapDispatchToProps = {
  setFilterLimit
}

const mapStateToProps = state => ({
  limit: state.filter.limit,
  loading: state.todo.loading,
  todoLength: state.todo.todoLength
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadMoreButton);