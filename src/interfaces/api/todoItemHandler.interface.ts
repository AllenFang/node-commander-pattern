import { Request, Response } from 'express';
import IHandler from './handler.interface';

interface ITodoItemHandler extends IHandler {
  get(req: Request, res: Response): void
  create(req: Request, res: Response): void
}

export default ITodoItemHandler;
