export class WebinarNoMoreSeatsException extends Error {
  constructor() {
    super('Webinar has no more seats left');
    this.name = 'WebinarNoMoreSeatsException';
  }
}