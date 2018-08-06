import ICommandHandler from "../../interfaces/commandHandler/commandHandler.interface";
import Base from '../base';
import { injectable, inject } from 'inversify';
import ITodoItemRepository from '../../interfaces/repository/todoItemRepository.interface';
import ITodoListRepository from '../../interfaces/repository/todoListRepository.interface';
import { TYPES } from '../../types';
import TodoList from '../../entities/todoList';
import CreateTodoCommand from '../../commands/todoItem/create';

@injectable()
class CreateTodoItemCommandHandler extends Base implements ICommandHandler {
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

  async execute(command: CreateTodoCommand): Promise<void> {
    const badReuqest = command.validate();
    if (badReuqest) {
      this.emit('BAD_REQUEST', badReuqest);
      return;
    }
    try {
      const todoList: TodoList = await this.todoListRepository.query(command.listId);
      if (!todoList) {
        this.emit('BAD_REQUEST', 'This target Todo List is not existing');
        return;
      }
      await this.todoItemRepository.create(command.name, command.listId);
      this.emit('SUCCESS');
    } catch(e) {
      this.emit('ERROR', e);
    }
  }
}

export default CreateTodoItemCommandHandler;
