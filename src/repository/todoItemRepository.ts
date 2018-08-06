import Repository from ".";
import { QueryResultBase, QueryResult } from 'pg';
import ITodoItemRepository from '../interfaces/repository/todoItemRepository.interface';
import { injectable } from '../../node_modules/inversify';
import TodoItem from '../entities/todoItem';

@injectable()
class TodoItemRepository extends Repository implements ITodoItemRepository {
  async create(name: string, listId: number): Promise<void> {
    await this.client.connect();

    const res: QueryResultBase = await this.client.query(
      'INSERT INTO public.todoitem(name, listid) VALUES($1, $2)',
      [name, listId]
    );

    this.client.end();
    if (res.rowCount !== 1) throw new Error('Insert Failure');
  }

  async query(todoId: number): Promise<TodoItem> {
    await this.client.connect();

    const res: QueryResult = await this.client.query({
      name: 'fetch-todoitem',
      text: `select * from public.todoitem where id = $1`,
      values: [todoId]
    });

    this.client.end();
    const [result] = res.rows;
    if (result) {
      return <TodoItem>{
        id: result.id,
        name: result.name
      };
    }
    return null;
  }

  async queryByList(todoListId: number): Promise<Array<TodoItem>> {
    await this.client.connect();

    const res: QueryResult = await this.client.query({
      name: 'fetch-todoitem',
      text: `select * from public.todoitem where listid = $1`,
      values: [todoListId]
    });

    this.client.end();

    return res.rows.map(row => (<TodoItem>{
      id: row.id,
      name: row.name
    }));
  }
}

export default TodoItemRepository;
