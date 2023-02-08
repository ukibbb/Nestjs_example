import { Module } from '@nestjs/common';

import { OlimpicResultsModule } from './olimpic-results/olimpic-results.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  OlimpicResultModel,
  MedalsTotalModel,
} from './olimpic-results/models/results';

@Module({
  imports: [
    OlimpicResultsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'root',
      entities: [OlimpicResultModel, MedalsTotalModel],
      autoLoadEntities: true,
      synchronize: true, // do not use in production.
    }),
  ],
})
export class AppModule {}
