import { Webinar } from 'src/webinars/entities/webinar.entity';

export interface IWebinarRepository {
  findById(id: string): Promise<Webinar | null>;
  create(webinar: Webinar): Promise<void>;
}
