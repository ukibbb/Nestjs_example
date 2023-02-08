import { Injectable } from '@nestjs/common';
import { OlimpicResult, ResultsQuery } from './validation/results';
import { Repository, FindManyOptions } from 'typeorm';
import { OlimpicResultModel, MedalsTotalModel } from './models/results';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OlimpicResultsService {
  constructor(
    @InjectRepository(OlimpicResultModel)
    private resultRepository: Repository<OlimpicResultModel>,
    @InjectRepository(MedalsTotalModel)
    private medalsRespository: Repository<MedalsTotalModel>,
  ) {}

  async getResults(query: ResultsQuery) {
    const validatedQuery = await ResultsQuery.parseAsync(query);
    let findOptions: FindManyOptions = {
      relations: {
        medals: true,
      },
      take: validatedQuery.limit,
      skip: validatedQuery.offset,
      order: {
        medals: {
          gold: 'DESC',
          silver: 'DESC',
          bronze: 'DESC',
        },
      },
    };
    !('sorted' in validatedQuery)
      ? (findOptions.order = { medalsOverall: 'DESC', ...findOptions.order })
      : findOptions;

    return await this.resultRepository.find(findOptions);
  }

  async addResult(record: OlimpicResult) {
    const validatedRecord = await OlimpicResult.parseAsync(record);
    const result = new OlimpicResultModel();
    const medals = new MedalsTotalModel();
    // Couldn't find in a docs more gracefull way to handle this
    result.country = validatedRecord.country;
    result.image = validatedRecord.image;
    result.medalsOverall = validatedRecord.medalsOverall;
    medals.gold = validatedRecord.medals.gold;
    medals.silver = validatedRecord.medals.silver;
    medals.bronze = validatedRecord.medals.bronze;
    await this.medalsRespository.save(medals);
    result.medals = medals;
    const insertedRecord = await this.resultRepository.save(result);

    return { ...validatedRecord, id: insertedRecord.id };
  }

  async deleteResult(id: number) {
    return this.resultRepository.delete(id);
  }

  async updateResult(id: number, record: OlimpicResult) {
    const validatedRecord = await OlimpicResult.parseAsync(record);
    const result = await this.resultRepository.find({
      relations: {
        medals: true,
      },
      where: {
        id: id,
      },
    });

    await this.medalsRespository.update(
      result[0].medals,
      validatedRecord.medals,
    );
    await this.resultRepository.update(id, {
      country: validatedRecord.country,
      image: validatedRecord.image,
      medalsOverall: validatedRecord.medalsOverall,
    });

    return { ...validatedRecord, id: id };
  }
}
