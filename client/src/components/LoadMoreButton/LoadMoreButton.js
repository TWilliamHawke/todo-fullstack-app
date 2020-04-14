import React from 'react';
import { setFilterLimit } from '../../redux/filtersActions'
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import './load-more-buttons.css'

export const LoadMoreButton = ({ setFilterLimit, loading, limit, todoLength }) => {
  let className = 'btn btn-outline-secondary btn-lg btn-block'
  if(!loading) className += ' load-more'

  return (
    <>
      <p className='todo-count'>Loaded {limit} of {todoLength}</p>
      <button
        disabled={loading || todoLength === limit}
        onClick={setFilterLimit}
        className={className}>
        {loading ? <Spinner /> : 'Load More'}
      </button>
    </>
  );
};

const mapDispatchToProps = {
  setFilterLimit
}

const mapStateToProps = state => ({
  limit: state.todo.todoList.length,
  loading: state.todo.loading,
  todoLength: state.todo.todoLength
})

export default connect(mapStateToProps, mapDispatchToProps)(LoadMoreButton);