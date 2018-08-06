import Base from "../base";
import ICommandHandler from '../../interfaces/commandHandler/commandHandler.interface';
import { injectable, inject } from '../../../node_modules/inversify';
import { TYPES } from '../../types';
import ITodoListRepository from '../../interfaces/repository/todoListRepository.interface';
import TodoList from '../../entities/todoList';

@injectable()
class QueryAllTodoListCommandHandler extends Base implements ICommandHandler {
  private repository: ITodoListRepository

  constructor(@inject(TYPES.ITodoListRepository) repository: ITodoListRepository) {
    super();
    this.repository = repository;
  }

  async execute(): Promise<void> {
    try {
      const todoList: Array<TodoList> = await this.repository.queryAll();
      this.emit('SUCCESS', todoList);
    } catch(e) {
      this.emit('ERROR', e);
    }
  }
}

export default QueryAllTodoListCommandHandler;