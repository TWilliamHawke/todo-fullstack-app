const todoFilter = (dbTodoList, filter) => {
  const { limit, title, show } = filter;

  const filteredTodo = dbTodoList
    .filter((todo) => todo.title.includes(title))
    .filter((todo) => {
      switch (show) {
        case "active":
          return !todo.done;
        case "done":
          return todo.done;
        default:
          return true;
      }
    });
  const todoLength = filteredTodo.length;
  const todoList = filteredTodo.splice(limit || -10);
  return { todoList, todoLength };
};

module.exports = todoFilter