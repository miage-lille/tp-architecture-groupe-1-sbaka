export class WebinarSeatAlreadyBookedException extends Error {
  constructor() {
    super('Seat already booked');
    this.name = 'WebinarSeatAlreadyBookedException';
  }
}