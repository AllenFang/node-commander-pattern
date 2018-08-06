import TodoItem from './todoItem';

interface TodoList {
  id: number,
  name: string,
  userId: number,
  items: Array<TodoItem>
}

export default TodoList;