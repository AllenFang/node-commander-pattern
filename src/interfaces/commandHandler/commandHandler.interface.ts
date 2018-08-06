interface ICommandEventEmitter {
  on(name: string, handler: <T>(t?: T) => void): this
}

interface ICommandHandler extends ICommandEventEmitter {
  execute(command?: any): void
}

export default ICommandHandler;
