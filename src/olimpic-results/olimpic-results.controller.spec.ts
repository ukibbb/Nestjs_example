import { Test, TestingModule } from '@nestjs/testing';
import { OlimpicResultsService } from './olimpic-results.service';
import { OlimpicResultsController } from './olimpic-results.controller';

jest.mock('./olimpic-results.service');

describe('OlimicResultsController', () => {
  let module: TestingModule;
  let controller: OlimpicResultsController;
  let service: OlimpicResultsService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [OlimpicResultsController],
      providers: [OlimpicResultsService],
    }).compile();
  });

  beforeEach(() => {
    service = module.get<OlimpicResultsService>(OlimpicResultsService);
    controller = module.get<OlimpicResultsController>(OlimpicResultsController);
  });

  it('Should OlimpicResultsController be defined.', () => {
    expect(controller).toBeDefined();
  });

  it('Should pass query params with required values.', async () => {
    jest
      .spyOn(service, 'getResults')
      .mockReturnValue({ offset: 0, limit: 5 } as any);
    expect(
      await controller.getResults({ offset: '0', limit: '5' } as any),
    ).toStrictEqual({ offset: 0, limit: 5 });
  });
});
