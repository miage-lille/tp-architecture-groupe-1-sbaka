import { Webinar } from 'src/webinars/entities/webinar.entity';
import { IUserRepository } from '../ports/user-repository.interface';
import { User } from '../entities/user.entity';

export class InMemoryUserRepository implements IUserRepository {
  constructor(public database: Webinar[] = []) {}
  async findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
