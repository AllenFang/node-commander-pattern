import TodoList from '../../entities/todoList';

interface ITodoListRepository {
  create(name: string, userId: number): Promise<void>
  queryByUser(userId: number): Promise<Array<TodoList>>
  queryAll(): Promise<Array<TodoList>>
  query(id: number): Promise<TodoList>
}

export default ITodoListRepository;
