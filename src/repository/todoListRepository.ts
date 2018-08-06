import ITodoListRepository from "../interfaces/repository/todoListRepository.interface";
import { injectable } from 'inversify';
import Repository from '.';
import { QueryResultBase, QueryResult } from 'pg';
import TodoList from '../entities/todoList';

@injectable()
class TodoListRepository extends Repository implements ITodoListRepository {
  constructor() {
    super();
    this.client.connect();
  }

  async create(name: string, userId: number): Promise<void> {    
    const res: QueryResultBase = await this.client.query(
      'INSERT INTO public.todolist(name, userid) VALUES($1, $2)',
      [name, userId]
    );

    this.close();
    if (res.rowCount !== 1) throw new Error('Insert Failure');
  }

  async queryByUser(userId: number): Promise<Array<TodoList>> {
    const res: QueryResult = await this.client.query({
      name: 'fetch-todo-list-by-user',
      text: `select id, name from public.todolist where userid = $1`,
      values: [userId]
    });

    return res.rows.map(row => (<TodoList>{
      id: row.id,
      name: row.name,
      userId: row.userid
    }));
  }

  async queryAll(): Promise<Array<TodoList>> {
    const res: QueryResult = await this.client.query({
      name: 'fetch-todo-list-by-user',
      text: `select * from public.todolist`,
      values: []
    });

    return res.rows.map(row => (<TodoList>{
      id: row.id,
      name: row.name,
      userId: row.userid
    }));
  }

  async query(id: number): Promise<TodoList> {
    const res: QueryResult = await this.client.query({
      name: 'fetch-todo-list-by-id',
      text: `select * from public.todolist where id = $1`,
      values: [id]
    });

    const [result] = res.rows;
    if (result) {
      const row = res.rows[0];
      return <TodoList>{
        id: row.id,
        name: row.name,
        userId: row.userid
      };
    }
    return null;
  }
}

export default TodoListRepository;