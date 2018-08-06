import { Response, Request } from 'express';
import { injectable, Container } from 'inversify';

import { TYPES } from '../../types';
import IUserHandler from '../../interfaces/api/userHandler.interface';
import ICommandHandler from '../../interfaces/commandHandler/commandHandler.interface';
import QueryUserCommand from '../../commands/user/query';

@injectable()
class UserHandler implements IUserHandler {
  private container: Container
  query = (req: Request, res: Response): void => {
    const commandHandler: ICommandHandler = this.container.getNamed<ICommandHandler>(TYPES.ICommandHandler, "queryUser");
    const command = new QueryUserCommand(req.params.userId);

    commandHandler
      .on('SUCCESS', (result): void => {
        res
          .status(200)
          .send(result);
      })
      .on('ERROR', (e): void => {
        res
        .status(500)
        .send(e);
      })
      .on('NOT_FOUND', (): void => {
        res
          .status(404)
          .send(`UserID: ${req.params.userId} is not existed`);
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

export default UserHandler;