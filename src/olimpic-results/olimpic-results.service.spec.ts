import { Test, TestingModule } from '@nestjs/testing';
import { OlimpicResultsService } from './olimpic-results.service';
import { OlimpicResultsController } from './olimpic-results.controller';

jest.mock('./olimpic-results.service');

describe('OlimicResultsController', () => {
  let service: OlimpicResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OlimpicResultsController],
      providers: [OlimpicResultsService],
    }).compile();

    service = module.get<OlimpicResultsService>(OlimpicResultsService);
  });
  it('OlimpicResultsService should be defined.', () => {
    expect(service).toBeDefined();
  });
});
