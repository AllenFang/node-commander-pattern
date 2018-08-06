import { injectable } from 'inversify';
import Repository from '.';
import { QueryResult } from 'pg';
import IUserRepository from '../interfaces/repository/userRepository.interface';
import User from '../entities/user';

@injectable()
class UserRepository extends Repository implements IUserRepository {
  async query(userId: number): Promise<User> {
    await this.client.connect();

    const res: QueryResult = await this.client.query({
      name: 'fetch-user',
      text: `select * from public.users where id = $1`,
      values: [userId]
    });

    this.client.end();
    const [result] = res.rows;
    if (result) {
      return <User>{
        id: result.id,
        name: result.name
      };
    }
    return null;
  }
}

export default UserRepository;