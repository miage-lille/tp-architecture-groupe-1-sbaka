import { IUserRepository } from '../ports/user-repository.interface';
import { User } from '../entities/user.entity';

export class InMemoryUserRepository implements IUserRepository {
  constructor(public database: User[] = []) {}
  save(user: User): Promise<void> {
    this.database.push(user);
    return Promise.resolve();
  }
  async findById(id: string): Promise<User | null> {
    return await this.database.find((user) => user.props.id === id) || null;
  }
}
