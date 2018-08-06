class QueryTodoListCommand {
  todoListId: number;

  constructor(todoListId: number) {
    this.todoListId = todoListId;
  }

  validate(): string {
    let message = [];
    if (!this.todoListId) message.push('todoListId is empty');
    if (message.length > 0) return message.join(',');
    return '';
  }
}

export default QueryTodoListCommand;