import { injectable, Container } from 'inversify';
import { Request, Response } from 'express';

import { TYPES } from '../../types';
import ICommandHandler from '../../interfaces/commandHandler/commandHandler.interface';
import CreateTodoCommand from '../../commands/todoItem/create';
import ITodoItemHandler from '../../interfaces/api/todoItemHandler.interface';
import QueryTodoItemCommand from '../../commands/todoItem/query';

@injectable()
class TodoHandler implements ITodoItemHandler {
  private container: Container

  get = (req: Request, res: Response): void => {
    const commandHandler = this.container.getNamed<ICommandHandler>(TYPES.ICommandHandler, "queryTodoItem");
    const command = new QueryTodoItemCommand(req.params.todoId);

    commandHandler
      .on('SUCCESS', (result): void => {
        res
          .status(200)
          .send(result);
      })
      .on('NOT_FOUND', (): void => {
        res
          .status(404)
          .send(`TodoId: ${req.params.todoId} is not existed`);
      });
      
    commandHandler.execute(command);
  }

  create = (req: Request, res: Response): void => {
    const commandHandler = this.container.getNamed<ICommandHandler>(TYPES.ICommandHandler, "createTodo");
    const command = new CreateTodoCommand(req.body.name, req.body.listId);

    commandHandler
      .on('SUCCESS', (): void => {
        res
          .status(200)
          .send('ok');
      })
      .on('BAD_REQUEST', (message): void => {
        res
          .status(400)
          .send(message);
      });
      
    commandHandler.execute(command);
  }

  setContainer(container: Container): void {
    this.container = container;
  }
}

export default TodoHandler;
