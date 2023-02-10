import { HttpException } from '@nestjs/common';

export class CountryNotUniqueException extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}

export class OlimpicResultNotExists extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}
