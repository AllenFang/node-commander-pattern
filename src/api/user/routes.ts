import { Container } from "inversify";
import { Router } from 'express';
import IUserHandler from '../../interfaces/api/userHandler.interface';
import { TYPES } from '../../types';

const router: Router = Router();


export default (container: Container): Router => {
  const handler: IUserHandler = container.get<IUserHandler>(TYPES.IUserHandler);
  handler.setContainer(container);

  router.get('/:userId', handler.query);

  return router;
}
