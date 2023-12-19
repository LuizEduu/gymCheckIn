export class UserAlreadyExistsError extends Error {
  public readonly name: string
  constructor() {
    super('e-mail already exists.')
    this.name = 'UserAlreadyExistsError'
  }
}
