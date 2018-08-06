import TodoList from '../entities/todoList';

export const exceedLimitCountPerUser = (todoList: Array<TodoList>): boolean => {
  return todoList.length > 3;
}
