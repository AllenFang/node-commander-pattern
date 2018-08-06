import { Container } from "inversify";
import { Router } from 'express';
import { TYPES } from '../../types';
import ITodoItemHandler from '../../interfaces/api/todoItemHandler.interface';

const router: Router = Router();


export default (container: Container): Router => {
  const handler: ITodoItemHandler = container.get<ITodoItemHandler>(TYPES.ITodoItemHandler);
  handler.setContainer(container);

  router.put('/', handler.create);
  router.get('/:todoId', handler.get);

  return router;
}
