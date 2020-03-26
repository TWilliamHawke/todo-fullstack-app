import React from 'react';
import { fetchTodo, setFilterLimit } from '../../redux/actions'
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import './load-more-buttons.css'

const LoadMoreButton = ({ setFilterLimit, loading }) => {
  let className = 'btn btn-outline-secondary btn-lg btn-block'
  if(!loading) className += ' load-more'

  return (
    <button
      onClick={setFilterLimit}
     className={className}>
      {loading ? <Spinner /> : 'LoadMore'}
    </button>
  );
};

const mapDispatchToProps = {
  setFilterLimit
}

const mapStateToProps = state => ({loading: state.todo.loading})

export default connect(mapStateToProps, mapDispatchToProps)(LoadMoreButton);