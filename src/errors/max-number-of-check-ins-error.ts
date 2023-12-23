export class MaxNumbersOfCheckInError extends Error {
  public readonly name: string
  constructor() {
    super('Max number of check-ins reached.')
    this.name = 'MaxNumbersOfCheckInError'
  }
}
