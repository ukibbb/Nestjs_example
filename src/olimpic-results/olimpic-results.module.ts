import { Module } from '@nestjs/common';
import { OlimpicResultsService } from './olimpic-results.service';
import { OlimpicResultsController } from './olimpic-results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OlimpicResultEntity } from './entity/olimpic-result.entity';
import { MedalsTotalEntity } from './entity/medals-total.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OlimpicResultEntity, MedalsTotalEntity])],
  providers: [OlimpicResultsService],
  controllers: [OlimpicResultsController],
})
export class OlimpicResultsModule {}
