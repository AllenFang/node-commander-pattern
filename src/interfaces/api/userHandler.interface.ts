import { Request, Response } from 'express';
import IHandler from './handler.interface';

interface IUserHandler extends IHandler {
  query(req: Request, res: Response): void
}

export default IUserHandler;
