import BaseError from './BaseError'

export default class APIError extends BaseError {
  constructor(
    public readonly status: number,
    public readonly code: string,
    public readonly message: string,
  ) {
    super('APIError', status, true, code, message, new Date())
  }
}