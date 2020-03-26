import React, { useEffect } from 'react';
import './todo-list.css'
import TodoItem from '../TodoItem/TodoItem';
import { connect } from 'react-redux';
import { fetchTodo } from '../../redux/actions'

const TodoList = ({todoList, fetchTodo}) => {
  useEffect(() => {
    fetchTodo('get',null, 'limit=-10')
  }, [])

  return (
    <ul className="list-group todo-list">
      { todoList.map(({ _id: id, ...todo}) => <TodoItem key={id} id={id} {...todo} label={'some'} />) }
    </ul>
  );
};

const mapDispatchToProps = {
  fetchTodo
}

const mapStateToProps = ({todo}) => ({
  todoList: todo.todoList
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);