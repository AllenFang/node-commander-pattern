import { injectable, inject } from "inversify";
import Base from '../base';
import ICommandHandler from '../../interfaces/commandHandler/commandHandler.interface';
import QueryTodoItemCommand from '../../commands/todoItem/query';
import ITodoItemRepository from '../../interfaces/repository/todoItemRepository.interface';
import { TYPES } from '../../types';
import TodoItem from '../../entities/todoItem';

@injectable()
class QueryTodoItemCommandHandler extends Base implements ICommandHandler {
  private todoItemRepository: ITodoItemRepository

  constructor(@inject(TYPES.ITodoItemRepository) todoItemRepository: ITodoItemRepository) {
    super();
    this.todoItemRepository = todoItemRepository;
  }

  async execute(command: QueryTodoItemCommand): Promise<void> {
    const badReuqest = command.validate();
    if (badReuqest) {
      this.emit('BAD_REQUEST', badReuqest);
      return;
    }

    try {
      const todoItem: TodoItem = await this.todoItemRepository.query(command.todoId);
      if (!todoItem) {
        this.emit('NOT_FOUND');
      } else {
        this.emit('SUCCESS', todoItem);
      }
    } catch(e) {
      this.emit('ERROR', e);
    }
  }
}

export default QueryTodoItemCommandHandler;
