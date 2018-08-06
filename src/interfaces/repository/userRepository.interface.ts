import User from '../../entities/user';

interface IUserRepository {
  query(userId: number): Promise<User>
}

export default IUserRepository;
