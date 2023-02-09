import { Module } from '@nestjs/common';
import { OlimpicResultsModule } from './olimpic-results/olimpic-results.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OlimpicResultEntity } from './olimpic-results/entity/olimpic-result.entity';
import { MedalsTotalEntity } from './olimpic-results/entity/medals-total.entity';
import { createConfig } from './shared/config/config';

const dbConfig = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    const dbConfig = await createConfig(process.env as any);
    return {
      type: 'mysql',
      host: 'db',
      port: dbConfig.MYSQL_PORT,
      username: dbConfig.MYSQL_USER,
      database: dbConfig.MYSQL_DATABASE,
      password: dbConfig.MYSQL_PASSWORD,
      entities: [OlimpicResultEntity, MedalsTotalEntity],
      autoLoadEntities: true,
      synchronize: true,
    };
  },
};

@Module({
  imports: [OlimpicResultsModule, TypeOrmModule.forRootAsync(dbConfig)],
})
export class AppModule {}
