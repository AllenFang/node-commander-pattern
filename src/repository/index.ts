import { Client } from 'pg';

import { injectable, decorate } from 'inversify';


class Repository {
  protected client: Client;

  constructor() {
    this.client = new Client({
      host: 'postgres',
      port: 5432,
      user: 'postgres',
      password: '123456',
      database: 'postgres'
    });
  }

  close() {
    this.client.end();
  }
}

decorate(injectable(), Repository);

export default Repository;
