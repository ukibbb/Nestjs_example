import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  HttpStatus,
  ParseIntPipe,
  BadRequestException,
  HttpCode,
  InternalServerErrorException,
} from '@nestjs/common';
import { OlimpicResultsService } from './olimpic-results.service';
import { OlimpicResult } from './validation/olimpic-result.validation';
import { ResultQuery } from './validation/result-query.validation';
import {
  CountryNotUniqueException,
  OlimpicResultNotExists,
} from './errors/olimpic-results.errors';
import { ZodError } from 'zod';
import { TypeORMError } from 'typeorm';

//// https://www.npmjs.com/package/nestjs-zod - could be more "nest" way to do validation with dto's.

@Controller('olimpic/results')
export class OlimpicResultsController {
  constructor(private resultsService: OlimpicResultsService) {}

  @Get('/list')
  @HttpCode(HttpStatus.OK)
  async getResults(@Query() query: Partial<ResultQuery>) {
    try {
      const validatedQuery = await ResultQuery.parseAsync(query);
      return await this.resultsService.getResults(validatedQuery);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new BadRequestException(e.issues);
      }
      throw new InternalServerErrorException();
    }
  }

  @Post('/add')
  @HttpCode(HttpStatus.CREATED)
  async addResult(@Body() body: Partial<OlimpicResult>) {
    try {
      const result = await OlimpicResult.parseAsync(body);
      return await this.resultsService.addResult(result);
    } catch (e) {
      if (e instanceof TypeORMError) {
        throw new CountryNotUniqueException(
          'This country is already on the list.',
          400,
        );
      } else if (e instanceof ZodError) {
        throw new BadRequestException(e.issues);
      }
      throw new InternalServerErrorException();
    }
  }

  @Put('/update/:id')
  @HttpCode(HttpStatus.OK)
  async updateResult(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: OlimpicResult,
  ) {
    try {
      const validatedRecord = await OlimpicResult.parseAsync(body);
      return await this.resultsService.updateResult(id, validatedRecord);
    } catch (e) {
      if (e instanceof TypeError) {
        throw new OlimpicResultNotExists(
          "Result with this id doesn't exist.",
          400,
        );
      } else if (e instanceof ZodError) {
        throw new BadRequestException(e.issues);
      }
      throw new InternalServerErrorException();
    }
  }

  @Delete('remove/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteResult(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.resultsService.deleteResult(id);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
