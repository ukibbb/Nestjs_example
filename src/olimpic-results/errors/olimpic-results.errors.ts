import { HttpException } from '@nestjs/common';

export class CountryNotUniqueException extends HttpException {
  constructor(message: object | string, status: number) {
    super(message, status);
  }
}
