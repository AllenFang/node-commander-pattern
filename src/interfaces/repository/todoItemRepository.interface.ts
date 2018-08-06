import TodoItem from '../../entities/todoItem';

interface ITodoItemRepository {
  create(name: string, listId: number): Promise<void>
  query(todoId: number): Promise<TodoItem>
  queryByList(todoListId: number): Promise<Array<TodoItem>>
}

export default ITodoItemRepository;
