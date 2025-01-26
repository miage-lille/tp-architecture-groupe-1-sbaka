import { IMailer } from 'src/core/ports/mailer.interface';
import { Executable } from 'src/shared/executable';
import { User } from 'src/users/entities/user.entity';
import { IUserRepository } from 'src/users/ports/user-repository.interface';
import { IParticipationRepository } from 'src/webinars/ports/participation-repository.interface';
import { IWebinarRepository } from 'src/webinars/ports/webinar-repository.interface';
import { Participation } from '../entities/participation.entity';
import { WebinarNotFoundException } from '../exceptions/webinar-not-found';
import { WebinarNoMoreSeatsException } from '../exceptions/webinar-no-more-seats';

type Request = {
  webinarId: string;
  user: User;
};
type Response = {
  participation : Participation;
};

export class BookSeat implements Executable<Request, Response> {
  constructor(
    private readonly participationRepository: IParticipationRepository,
    private readonly userRepository: IUserRepository,
    private readonly webinarRepository: IWebinarRepository,
    private readonly mailer: IMailer,
  ) {}
  async execute(payload: Request): Promise<Response> {
    const { webinarId, user } = payload;
    // if the user does not exist, we save it
    const userExists = await this.userRepository.findById(user.props.id);
    if (!userExists) {
      await this.userRepository.save(user);
    }
    // if the webinar does not exist, we throw an error
    const webinarExists = await this.webinarRepository.findById(webinarId);
    if (!webinarExists) {
      throw new WebinarNotFoundException();
    }


    const participations = await this.participationRepository.findByWebinarId(webinarId);
    // if there are no more seats, we throw an error
    if(webinarExists.props.seats - participations.length <= 0){
      throw new WebinarNoMoreSeatsException();
    }

    // we create a new participation
    const participation = new Participation({
      webinarId,
      userId: user.props.id,
    });
    
    // this throws an error if the participation already exists
    await this.participationRepository.save(participation);


    // we send an email to the user
    await this.mailer.send({
      to: user.props.email,
      subject: 'You have booked a seat for the webinar',
      body: `You have successfully booked a seat for the webinar with id ${webinarId}`,
    });
    return { participation };
  }
}
