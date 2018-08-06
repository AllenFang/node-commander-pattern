class QueryUserCommand {
  userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }

  validate(): string {
    let message = [];
    if (!this.userId) message.push('userId is empty');
    if (message.length > 0) return message.join(',');
    return '';
  }
}

export default QueryUserCommand;