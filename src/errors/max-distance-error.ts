export class MaxDistanceError extends Error {
  public readonly name: string
  constructor() {
    super('Max distance reached.')
    this.name = 'MaxDistanceError'
  }
}
