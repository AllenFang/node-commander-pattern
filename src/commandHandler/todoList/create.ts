import ICommandHandler from "../../interfaces/commandHandler/commandHandler.interface";
import Base from '../base';
import { injectable, inject } from 'inversify';
import ITodoListRepository from '../../interfaces/repository/todoListRepository.interface';
import { TYPES } from '../../types';
import CreateTodoListCommand from '../../commands/todoList/create';
import { exceedLimitCountPerUser } from '../../domain/todoList';
import TodoList from '../../entities/todoList';

@injectable()
class CreateTodoListCommandHandler extends Base implements ICommandHandler {
  private repository: ITodoListRepository

  constructor(@inject(TYPES.ITodoListRepository) repository: ITodoListRepository) {
    super();
    this.repository = repository;
  }

  async execute(command: CreateTodoListCommand): Promise<void> {
    const badReuqest = command.validate();
    if (badReuqest) {
      this.emit('BAD_REQUEST', badReuqest);
      return;
    }
    try {
      const todoList: Array<TodoList> = await this.repository.queryByUser(command.userId);
      if (exceedLimitCountPerUser(todoList)) {
        this.emit('BAD_REQUEST', 'Every user only have 3 todo list at most');
        return;
      }
      await this.repository.create(command.name, command.userId);
      this.emit('SUCCESS');
    } catch(e) {
      this.emit('ERROR', e);
    }
  }
}

export default CreateTodoListCommandHandler;
