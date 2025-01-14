import { IParticipationRepository } from './../ports/participation-repository.interface';
import { IUserRepository } from 'src/users/ports/user-repository.interface';
import { IMailer } from 'src/core/ports/mailer.interface';
import { IWebinarRepository } from '../ports/webinar-repository.interface';
import { id } from 'date-fns/locale';
import { User } from 'src/users/entities/user.entity';
import { InMemoryParticipationRepository } from '../adapters/participation-repository.in-memory';
import { InMemoryUserRepository } from 'src/users/adapters/user-repository.in-memory';
import { InMemoryWebinarRepository } from '../adapters/webinar-repository.in-memory';
import { InMemoryMailer } from 'src/core/adapters/in-memory-mailer';

describe('Feature: Organize webinars', () => {
  let participationRepository: IParticipationRepository;
  let userRepository: IUserRepository;
  let webinarRepository: IWebinarRepository;
  let mailer: IMailer;

  let payload = {
    webinarId: 'webinar-id-123',
    user: {
      id: 'user-id-123',
      email: 'user@test.ts',
      password: 'pwd',
    },
  };

  beforeEach(() => {
    participationRepository = new InMemoryParticipationRepository();
    userRepository = new InMemoryUserRepository();
    webinarRepository = new InMemoryWebinarRepository();
    mailer = new InMemoryMailer();
  });
});
