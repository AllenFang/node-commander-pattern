import TodoList from './todoList';

interface User {
  id: number,
  name: string,
  todoList: Array<TodoList>
}

export default User;