import { Module } from '@nestjs/common';
import { OlimpicResultsService } from './olimpic-results.service';
import { OlimpicResultsController } from './olimpic-results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OlimpicResultModel, MedalsTotalModel } from './models/results';

@Module({
  imports: [TypeOrmModule.forFeature([OlimpicResultModel, MedalsTotalModel])],
  providers: [OlimpicResultsService],
  controllers: [OlimpicResultsController],
})
export class OlimpicResultsModule {}
