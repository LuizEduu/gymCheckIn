export class InvalidCredentialsError extends Error {
  public readonly name: string
  constructor() {
    super('Invalid credentials')
    this.name = 'InvalidCredentialsError'
  }
}
