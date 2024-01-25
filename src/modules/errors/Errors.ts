export class BaseError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = "BaseError";
    this.statusCode = statusCode;
  }
}

export class ApiError extends BaseError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    this.name = "ApiError";
  }
}


