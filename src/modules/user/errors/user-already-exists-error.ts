export class UserAlreadyExistsError extends Error {
  public readonly name
  constructor() {
    super('e-mail already exists.')
    this.name = 'UserAlreadyExistsError'
  }
}
