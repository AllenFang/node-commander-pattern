class CreateTodoCommand {
  name: string;
  listId: number;

  constructor(name: string, listId: number) {
    this.name = name;
    this.listId = listId;
  }

  validate(): string {
    let message = [];
    if (!this.name) message.push('Todo Item name is necessary');
    if (!this.listId) message.push('Todo Item should belong to a Todo List');
    if (message.length > 0) return message.join(',');
    return '';
  }
}

export default CreateTodoCommand;