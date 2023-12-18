export class InvalidCredentialsError extends Error {
  public readonly name
  constructor() {
    super('Invalid credentials')
    this.name = 'InvalidCredentialsError'
  }
}
