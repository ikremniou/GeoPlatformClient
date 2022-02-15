export class ServerMultiError extends Error {
  constructor(public readonly errors: Error[]) {
    super();
    this.message = errors.map(error => error.message).join('\n');
  }
}
