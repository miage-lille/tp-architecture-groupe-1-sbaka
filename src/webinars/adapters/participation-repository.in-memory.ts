import { Participation } from '../entities/participation.entity';
import { WebinarSeatAlreadyBookedException } from '../exceptions/webinar-seat-already-booked';
import { IParticipationRepository } from '../ports/participation-repository.interface';

export class InMemoryParticipationRepository
  implements IParticipationRepository
{
  constructor(public database: Participation[] = []) {}

  async findByWebinarId(webinarId: string): Promise<Participation[]> {
    return this.database.filter(
      (participation) => participation.props.webinarId === webinarId,
    );
  }

  async save(newParticipation: Participation): Promise<void> {
    if (
      this.database.find(
        (participation) =>
          participation.props.userId === newParticipation.props.userId,
      )
    ) {
      throw new WebinarSeatAlreadyBookedException();  
    }
    this.database.push(newParticipation);
  }
}
