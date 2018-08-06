import { Container } from 'inversify';

interface IHandler {
  setContainer(container: Container): void
}

export default IHandler;