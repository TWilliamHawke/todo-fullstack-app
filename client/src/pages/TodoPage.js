import React from 'react';
import { connect } from 'react-redux';
import AppHeader from '../components/AppHeader/AppHeader';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import TodoList from '../components/TodoList/TodoList';
import ItemStatusFilter from '../components/ItemStatusFilter/ItemStatusFilter';
import AddPanel from '../components/AddPanel/AddPanel';
import LoadMoreButton from '../components/LoadMoreButton/LoadMoreButton';
import ErrorList from '../components/ErrorList/ErrorList';

import './TodoPage.css'

export const TodoPage = ({errors}) => {
  return (
    <>
      <AppHeader />
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>
      <TodoList />
      <ErrorList data={errors} />
      <AddPanel />
      <LoadMoreButton />
    </>
  );
};

const mapStateToProps = state => ({
  errors: state.todo.errors
})

export default connect(mapStateToProps)(TodoPage);