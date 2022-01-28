export class ServerMultiError extends Error {
    constructor(public readonly errors: Error[]) {
        super();
    }
}