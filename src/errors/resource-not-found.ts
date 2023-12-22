export class ResourceNotFoundError extends Error {
  public readonly name: string
  constructor() {
    super('Resource not found.')
    this.name = 'ResourceNotFoundError'
  }
}
