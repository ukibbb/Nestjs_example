import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { OlimpicResult } from './validation/olimpic-result.validation';
import { ResultQuery } from './validation/result-query.validation';

import { OlimpicResultEntity } from './entity/olimpic-result.entity';
import { MedalsTotalEntity } from './entity/medals-total.entity';

@Injectable()
export class OlimpicResultsService {
  constructor(
    @InjectRepository(OlimpicResultEntity)
    private resultRepository: Repository<OlimpicResultEntity>,
    @InjectRepository(MedalsTotalEntity)
    private medalsRespository: Repository<MedalsTotalEntity>,
  ) {}

  async getResults(query: ResultQuery) {
    const findOptions: FindManyOptions = {
      take: query.limit,
      skip: query.offset,
      order: {
        medals: {
          gold: 'DESC',
          silver: 'DESC',
          bronze: 'DESC',
        },
      },
    };
    !('sorted' in query)
      ? (findOptions.order = { medalsOverall: 'DESC', ...findOptions.order })
      : findOptions;

    return this.resultRepository.find(findOptions);
  }

  async addResult(record: OlimpicResult) {
    const medals = this.medalsRespository.create({
      gold: record.medals.gold,
      silver: record.medals.silver,
      bronze: record.medals.bronze,
    });

    const result = this.resultRepository.create({
      country: record.country,
      image: record.image,
      medalsOverall: record.medalsOverall,
      medals,
    });

    return this.resultRepository.save(result);
  }

  async deleteResult(id: number) {
    return this.resultRepository.delete(id);
  }

  async updateResult(id: number, record: OlimpicResult) {
    const {
      medals: { id: medalsId },
    } = await this.resultRepository.findOne({ where: { id } });

    const medals = this.medalsRespository.create({
      id: medalsId,
      gold: record.medals.gold,
      bronze: record.medals.bronze,
      silver: record.medals.silver,
    });

    const result = this.resultRepository.create({
      id,
      country: record.country,
      image: record.image,
      medals,
      medalsOverall: record.medalsOverall,
    });

    return this.resultRepository.save(result);
  }
}
