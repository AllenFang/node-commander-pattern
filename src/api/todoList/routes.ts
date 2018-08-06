import { Container } from "inversify";
import { Router } from 'express';
import ITodoListHandler from '../../interfaces/api/todoListHandler.interface';
import { TYPES } from '../../types';

const router: Router = Router();


export default (container: Container): Router => {
  const handler: ITodoListHandler = container.get<ITodoListHandler>(TYPES.ITodoListHandler);
  handler.setContainer(container);

  router.put('/', handler.create);
  router.get('/', handler.getAll);
  router.get('/:todoListId', handler.get);

  return router;
}
