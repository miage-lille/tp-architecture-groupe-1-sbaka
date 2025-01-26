export class WebinarNotFoundException extends Error {
  constructor() {
    super('Webinar inexistant');
    this.name = 'WebinarInexistantException';
  }
}
