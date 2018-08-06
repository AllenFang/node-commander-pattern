const TYPES = {
  ICommandHandler: Symbol.for("ICommandHandler"),
  ITodoItemHandler: Symbol.for("ITodoItemHandler"),
  ITodoListHandler: Symbol.for("ITodoListHandler"),
  IUserHandler: Symbol.for("IUserHandler"),
  ITodoListRepository: Symbol.for("ITodoListRepository"),
  IUserRepository: Symbol.for("IUserRepository"),
  ITodoItemRepository: Symbol.for("ITodoItemRepository")
}

export { TYPES };
