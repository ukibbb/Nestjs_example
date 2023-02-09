import { Test } from '@nestjs/testing';
import { OlimpicResultsService } from './olimpic-results.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OlimpicResultEntity } from './entity/olimpic-result.entity';
import { Repository } from 'typeorm';
import { MedalsTotalEntity } from './entity/medals-total.entity';
import { OlimpicResult } from './validation/olimpic-result.validation';
const mockOlimpicResult = {
  id: 1,
  country: 'poland',
  image: 'http://image.com',
  medalsOverall: 0,
  medals: {
    id: 1,
    gold: 0,
    silver: 0,
    bronze: 0,
  },
};
describe('OlimicResultsController', () => {
  let service: OlimpicResultsService;
  let resultRepository: Repository<OlimpicResultEntity>;
  let medalRepository: Repository<MedalsTotalEntity>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OlimpicResultsService,
        {
          provide: getRepositoryToken(OlimpicResultEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(MedalsTotalEntity),
          useClass: Repository,
        },
      ],
    }).compile();
    service = await module.get(OlimpicResultsService);
    resultRepository = await module.get(
      getRepositoryToken(OlimpicResultEntity),
    );
    medalRepository = await module.get(getRepositoryToken(MedalsTotalEntity));
  });
  it('OlimpicResultsService should be defined.', () => {
    expect(service).toBeDefined();
  });
  it('should return list of results', async () => {
    jest.spyOn(resultRepository, 'find').mockImplementation(async (options) => {
      expect(options).toStrictEqual({
        take: 5,
        skip: 0,
        order: {
          medals: {
            gold: 'DESC',
            silver: 'DESC',
            bronze: 'DESC',
          },
          medalsOverall: 'DESC',
        },
      });
      return [mockOlimpicResult];
    });
    expect(await service.getResults({ limit: 5, offset: 0 })).toStrictEqual([
      mockOlimpicResult,
    ]);
  });
  it('update', async () => {
    const olimpicResult: OlimpicResult = {
      country: 'poland',
      image: 'url',
      medals: {
        gold: 1,
        silver: 0,
        bronze: 1,
      },
      medalsOverall: 2,
    };
    jest
      .spyOn(resultRepository, 'findOne')
      .mockImplementation(async (options: any): Promise<any> => {
        expect(options).toStrictEqual({
          where: { id: 151 },
        });
        return { medals: { id: 10 } };
      });
    const expectedMedals: MedalsTotalEntity = {
      id: 10,
      gold: olimpicResult.medals.gold,
      silver: olimpicResult.medals.silver,
      bronze: olimpicResult.medals.bronze,
    };
    jest
      .spyOn(medalRepository, 'create')
      .mockImplementation((object: any): any => {
        expect(object).toStrictEqual(expectedMedals);
        return object;
      });
    const expectedResult: OlimpicResultEntity = {
      id: 151,
      country: olimpicResult.country,
      image: olimpicResult.image,
      medals: {
        id: 10,
        gold: olimpicResult.medals.gold,
        silver: olimpicResult.medals.silver,
        bronze: olimpicResult.medals.bronze,
      },
      medalsOverall: olimpicResult.medalsOverall,
    };
    jest
      .spyOn(resultRepository, 'create')
      .mockImplementation((object: any): any => {
        expect(object).toStrictEqual(expectedResult);
        return object;
      });
    jest
      .spyOn(resultRepository, 'save')
      .mockImplementation(async (object: any): Promise<any> => {
        expect(object).toStrictEqual(expectedResult);
        return object;
      });
    expect(await service.updateResult(151, olimpicResult)).toStrictEqual(
      expectedResult,
    );
  });
});
