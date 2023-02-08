import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  Res,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { OlimpicResultsService } from './olimpic-results.service';
import { OlimpicResult } from 'src/olimpic-results/validation/results';

@Controller('olimpic/results')
export class OlimpicResultsController {
  constructor(private resultsService: OlimpicResultsService) {}

  @Get('/list')
  async getResults(@Res() res: Response, @Query() query) {
    try {
      const result = await this.resultsService.getResults(query);
      return res.status(HttpStatus.OK).json(result);
    } catch (e) {
      const error = e as Error;
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: JSON.parse(error.message),
      });
    }
  }

  @Post('/add')
  async addResult(@Res() res: Response, @Body() result: OlimpicResult) {
    try {
      const insertedResult = await this.resultsService.addResult(result);
      return res.status(HttpStatus.CREATED).json(insertedResult);
    } catch (e) {
      const error = e as Error;
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: JSON.parse(error.message),
      });
    }
  }

  @Put('/update/:id')
  async updateResult(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Body() result: OlimpicResult,
  ) {
    const updatedResult = await this.resultsService.updateResult(id, result);
    return res.status(HttpStatus.OK).json(updatedResult);
  }

  @Delete('remove/:id')
  async deleteResult(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      await this.resultsService.deleteResult(id);
      return res.status(HttpStatus.NO_CONTENT);
    } catch (e) {
      const error = e as Error;
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: JSON.parse(error.message),
      });
    }
  }
}
