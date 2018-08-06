import { Container } from "inversify";
import { TYPES } from "./types";
import ICommandHandler from './interfaces/commandHandler/commandHandler.interface';

import ITodoItemHandler from './interfaces/api/todoItemHandler.interface';
import TodoItemHandler from './api/todoItem/handler';

import ITodoListHandler from './interfaces/api/todoListHandler.interface';
import TodoListHandler from './api/todoList/handler';

import IUserHandler from './interfaces/api/userHandler.interface';
import UserHandler from './api/user/handler';


import QueryAllTodoListCommandHandler from './commandHandler/todoList/queryAll';
import CreateTodoListCommandHandler from './commandHandler/todoList/create';
import CreateTodoItemCommandHandler from './commandHandler/todoItem/create';
import QueryTodoListCommandHandler from './commandHandler/todoList/query';
import QueryTodoItemCommandHandler from './commandHandler/todoItem/query';
import QueryUserCommandHandler from './commandHandler/user/query';

import ITodoListRepository from './interfaces/repository/todoListRepository.interface';
import TodoListRepository from './repository/todoListRepository';

import IUserRepository from './interfaces/repository/userRepository.interface';
import UserRepository from './repository/userRepository';

import ITodoItemRepository from './interfaces/repository/todoItemRepository.interface';
import TodoItemRepository from './repository/todoItemRepository';

const container = new Container();
// Command Handler
container.bind<ICommandHandler>(TYPES.ICommandHandler).to(QueryTodoItemCommandHandler).whenTargetNamed("queryTodoItem");
container.bind<ICommandHandler>(TYPES.ICommandHandler).to(CreateTodoListCommandHandler).whenTargetNamed("createTodoList");
container.bind<ICommandHandler>(TYPES.ICommandHandler).to(QueryAllTodoListCommandHandler).whenTargetNamed("queryAllTodoList");
container.bind<ICommandHandler>(TYPES.ICommandHandler).to(QueryTodoListCommandHandler).whenTargetNamed("queryTodoList");
container.bind<ICommandHandler>(TYPES.ICommandHandler).to(QueryUserCommandHandler).whenTargetNamed("queryUser");
container.bind<ICommandHandler>(TYPES.ICommandHandler).to(CreateTodoItemCommandHandler).whenTargetNamed("createTodo");

// Route Handler
container.bind<ITodoItemHandler>(TYPES.ITodoItemHandler).to(TodoItemHandler);
container.bind<ITodoListHandler>(TYPES.ITodoListHandler).to(TodoListHandler);
container.bind<IUserHandler>(TYPES.IUserHandler).to(UserHandler);

// Repository
container.bind<ITodoListRepository>(TYPES.ITodoListRepository).to(TodoListRepository);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<ITodoItemRepository>(TYPES.ITodoItemRepository).to(TodoItemRepository);

export { container };
