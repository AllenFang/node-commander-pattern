import * as EventEmitter from 'events';
import { injectable, decorate } from 'inversify';

type Handler = <T>(t: T) => void;

decorate(injectable(), EventEmitter);

@injectable()
class Base extends EventEmitter {
  on(name: string, handler: Handler): this {
    return this.addListener(name, handler);
  }
}

export default Base;
