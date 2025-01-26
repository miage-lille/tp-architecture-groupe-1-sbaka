import { IMailer } from 'src/core/ports/mailer.interface';
import { IWebinarRepository } from '../ports/webinar-repository.interface';
import { User } from 'src/users/entities/user.entity';
import { InMemoryParticipationRepository } from '../adapters/participation-repository.in-memory';
import { InMemoryUserRepository } from 'src/users/adapters/user-repository.in-memory';
import { InMemoryWebinarRepository } from '../adapters/webinar-repository.in-memory';
import { InMemoryMailer } from 'src/core/adapters/in-memory-mailer';
import { BookSeat } from './book-seat';

describe('Feature: Organize webinars', () => {
  let participationRepository: InMemoryParticipationRepository;
  let userRepository: InMemoryUserRepository;
  let webinarRepository: IWebinarRepository;
  let mailer: IMailer;
  let useCase: BookSeat;

  let payload = {
    webinarId: 'webinar-id-123',
    user: new User({
      id: 'u-1',
      email: 'my.mail@mail.co',
      password: 'myPassword-123',
    }),
  };

  beforeEach(() => {
    participationRepository = new InMemoryParticipationRepository();
    userRepository = new InMemoryUserRepository();
    webinarRepository = new InMemoryWebinarRepository();
    mailer = new InMemoryMailer();
    useCase = new BookSeat(
      participationRepository,
      userRepository,
      webinarRepository,
      mailer,
    );
  });

  function expectUserToEqual(user: User) {
    expect(user).toEqual({
      props: {
        id: 'user-1',
        email: 'my.mail@mail.te',
        password: 'myPassword123',
      },
      initialState: {
        id: 'user-1',
        email: 'my.mail@mail.te',
        password: 'myPassword123',
      },
    });
  }

  describe('Scenario: User books a seat for a webinar', () => {
    it('Given a user and a webinar id, when the user books a seat, then the user should be in the database', async () => {
      await useCase.execute(payload);

      const savedUser = userRepository.database[0];
      expectUserToEqual(savedUser);
    });

    it('Given a user and a webinar id, when the user books a seat, then a participation should be returned', async () => {
      const result = await useCase.execute(payload);

      expect(result).toEqual({
        participation: {
          props: {
            id: 'participation-1',
            webinarId: 'webinar-id-123',
            userId: 'user-1',
          },
          initialState: {
            id: 'participation-1',
            webinarId: 'webinar-id-123',
            userId: 'user-1',
          },
        },
      });
    });
    it('Given a user and a webinar id, when the user books a seat, then the participation should be saved in the repository', async () => {
      await useCase.execute(payload);

      const savedParticipation = participationRepository.database[0];
      expect(savedParticipation).toEqual({
        props: {
          id: 'participation-1',
          webinarId: 'webinar-id-123',
          userId: 'user-1',
        },
        initialState: {
          id: 'participation-1',
          webinarId: 'webinar-id-123',
          userId: 'user-1',
        },
      });
    });
  });

  describe('Scenario: User books a seat for a webinar that does not exist', () => {
    it('Given a user and a webinar id, when the user books a seat, then an error should be thrown', async () => {
      await expect(useCase.execute(payload)).rejects.toThrow('Webinar not found');
    });
  });

});
