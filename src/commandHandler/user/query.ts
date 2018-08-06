import ICommandHandler from "../../interfaces/commandHandler/commandHandler.interface";
import Base from '../base';
import { injectable, inject } from 'inversify';
import ITodoListRepository from '../../interfaces/repository/todoListRepository.interface';
import IUserRepository from '../../interfaces/repository/userRepository.interface';
import { TYPES } from '../../types';
import QueryUserCommand from '../../commands/user/query';
import User from '../../entities/user';
import TodoList from '../../entities/todoList';

@injectable()
class QueryUserCommandHandler extends Base implements ICommandHandler {
  private todoRepository: ITodoListRepository
  private userRepository: IUserRepository

  constructor(
    @inject(TYPES.ITodoListRepository) todoRepository: ITodoListRepository,
    @inject(TYPES.IUserRepository) userRepository: IUserRepository
  ) {
    super();
    this.todoRepository = todoRepository;
    this.userRepository = userRepository;
  }

  async execute(command: QueryUserCommand): Promise<void> {
    const badReuqest = command.validate();
    if (badReuqest) {
      this.emit('BAD_REQUEST', badReuqest);
      return;
    }
    try {
      const user: User = await this.userRepository.query(command.userId);
      if (!user) {
        this.emit('NOT_FOUND');
      } else {
        const todoList: Array<TodoList> = await this.todoRepository.queryByUser(command.userId);
        user.todoList = todoList;
        this.emit('SUCCESS', user);
      }
    } catch(e) {
      this.emit('ERROR', e);
    }
  }
}

export default QueryUserCommandHandler;
