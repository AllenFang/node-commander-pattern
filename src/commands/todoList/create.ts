class CreateTodoListCommand {
  name: string;
  userId: number;

  constructor(name: string, userId: number) {
    this.name = name;
    this.userId = userId;
  }

  validate(): string {
    let message = [];
    if (!this.name) message.push('ToDoList name is necessary');
    if (!this.userId) message.push('ToDoList should belong to a user');
    if (message.length > 0) return message.join(',');
    return '';
  }
}

export default CreateTodoListCommand;