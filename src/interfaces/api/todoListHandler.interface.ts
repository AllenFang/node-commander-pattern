import { Request, Response } from 'express';
import IHandler from './handler.interface';

interface ITodoListHandler extends IHandler {
  create(req: Request, res: Response): void
  getAll(req: Request, res: Response): void
  get(req: Request, res: Response): void
}

export default ITodoListHandler;
