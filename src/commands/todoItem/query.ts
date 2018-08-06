class QueryTodoItemCommand {
  todoId: number;

  constructor(todoId: number) {
    this.todoId = todoId;
  }

  validate(): string {
    let message = [];
    if (!this.todoId) message.push('todoId is empty');
    if (message.length > 0) return message.join(',');
    return '';
  }
}

export default QueryTodoItemCommand;