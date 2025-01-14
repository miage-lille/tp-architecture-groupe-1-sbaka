import { Participation } from '../entities/participation.entity';
import { Webinar } from '../entities/webinar.entity';
import { IParticipationRepository } from '../ports/participation-repository.interface';

export class InMemoryParticipationRepository
  implements IParticipationRepository
{
  constructor(public database: Webinar[] = []) {}
  async findByWebinarId(webinarId: string): Promise<Participation[]> {
    throw new Error('Method not implemented.');
  }
  async save(participation: Participation): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
