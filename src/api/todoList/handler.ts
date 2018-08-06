import { Response, Request } from 'express';
import { injectable, Container } from 'inversify';

import { TYPES } from '../../types';
import ITodoListHandler from '../../interfaces/api/todoListHandler.interface';
import ICommandHandler from '../../interfaces/commandHandler/commandHandler.interface';
import CreateTodoListCommand from '../../commands/todoList/create';
import QueryTodoListCommand from '../../commands/todoList/query';

@injectable()
class TodoListHandler implements ITodoListHandler {
  private container: Container

  create = (req: Request, res: Response): void => {
    const commandHandler: ICommandHandler = this.container.getNamed<ICommandHandler>(TYPES.ICommandHandler, "createTodoList");
    const command = new CreateTodoListCommand(req.body.name, req.body.userId);

    commandHandler
      .on('SUCCESS', (): void => {
        res
          .status(200)
          .send(`insert ok`);
      })
      .on('ERROR', (e): void => {
        res
          .status(500)
          .send(e);
      })
      .on('BAD_REQUEST', (message): void => {
        res
          .status(400)
          .send(message);
      });
    commandHandler.execute(command);
  }

  getAll = (_req: Request, res: Response): void => {
    const commandHandler: ICommandHandler = this.container.getNamed<ICommandHandler>(TYPES.ICommandHandler, "queryAllTodoList");

    commandHandler
      .on('SUCCESS', (result): void => {
        res
          .status(200)
          .send(result);
      });
    commandHandler.execute();
  }

  get = (req: Request, res: Response): void => {
    const commandHandler: ICommandHandler = this.container.getNamed<ICommandHandler>(TYPES.ICommandHandler, "queryTodoList");
    const command = new QueryTodoListCommand(req.params.todoListId);

    commandHandler
      .on('SUCCESS', (result): void => {
        res
          .status(200)
          .send(result);
      })
      .on('BAD_REQUEST', (message): void => {
        res
          .status(400)
          .send(message);
      })
      .on('NOT_FOUND', (): void => {
        res
          .status(404)
          .send(`Todo List: ${req.params.todoListId} is not existed`);
      });
    commandHandler.execute(command);
  }

  setContainer(container: Container): void {
    this.container = container;
  }
}

export default TodoListHandler;