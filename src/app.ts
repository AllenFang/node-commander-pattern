import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';

import todoListRouter from './api/todoList/routes';
import todoRouter from './api/todoItem/routes';
import userRouter from './api/user/routes';
import { container } from './inversify.config';

const app: express.Application = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/todoList', todoListRouter(container));
app.use('/todoItem', todoRouter(container));
app.use('/user', userRouter(container));
app.listen(3001, () => {
  console.log('listen on 3001 port ok!!');
});