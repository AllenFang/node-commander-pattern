import Base from "../base";
import ICommandHandler from '../../interfaces/commandHandler/commandHandler.interface';
import { injectable, inject } from '../../../node_modules/inversify';
import { TYPES } from '../../types';
import ITodoListRepository from '../../interfaces/repository/todoListRepository.interface';
import TodoList from '../../entities/todoList';
import QueryTodoListCommand from '../../commands/todoList/query';
import ITodoItemRepository from '../../interfaces/repository/todoItemRepository.interface';
import TodoItem from '../../entities/todoItem';

@injectable()
class QueryTodoListCommandHandler extends Base implements ICommandHandler {
  private todoListRepository: ITodoListRepository
  private todoItemRepository: ITodoItemRepository

  constructor(
    @inject(TYPES.ITodoListRepository) todoListRepository: ITodoListRepository,
    @inject(TYPES.ITodoItemRepository) todoItemRepository: ITodoItemRepository
  ) {
    super();
    this.todoListRepository = todoListRepository;
    this.todoItemRepository = todoItemRepository;
  }

  async execute(command: QueryTodoListCommand): Promise<void> {
    const badReuqest = command.validate();
    if (badReuqest) {
      this.emit('BAD_REQUEST', badReuqest);
      return;
    }

    try {
      const todoList: TodoList = await this.todoListRepository.query(command.todoListId);
      if (!todoList) {
        this.emit('NOT_FOUND');
      } else {
        const items: Array<TodoItem> = await this.todoItemRepository.queryByList(command.todoListId);
        todoList.items = items;
        this.emit('SUCCESS', todoList);
      }
    } catch(e) {
      this.emit('ERROR', e);
    }
  }
}

export default QueryTodoListCommandHandler;