import { Test, TestingModule } from '@nestjs/testing';
import { StartController } from './start.controller';
import { StartService } from './start.service';
import { StartDto } from '../dto/start.dto';
import { Logger } from '@nestjs/common';

describe('StartController', () => {
  let controller: StartController;
  let service: StartService;

  // Mock file for testing
  const mockFile = {
    fieldname: 'file',
    originalname: 'test-invoice.pdf',
    encoding: '7bit',
    mimetype: 'application/pdf',
    buffer: Buffer.from('PDF test content'),
    size: 1024,
    stream: null,
    destination: '',
    filename: '',
    path: '',
  } as Express.Multer.File;

  // Mock response from service
  const mockServiceResponse = {
    path: '/path/to/test-invoice.pdf',
    filename: 'test-invoice.pdf',
    size: 1024,
    timestamp: '2025-05-06T12:30:45.123Z',
    referenceId: 'INV-2025-001',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StartController],
      providers: [
        {
          provide: StartService,
          useValue: {
            storeInvoice: jest.fn().mockResolvedValue(mockServiceResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<StartController>(StartController);
    service = module.get<StartService>(StartService);

    // Mock logger to prevent console output during tests
    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadInvoice', () => {
    it('should upload an invoice file and return the response from service', async () => {
      const startDto: StartDto = { referenceId: 'INV-2025-001' };

      const result = await controller.uploadInvoice(mockFile, startDto);

      expect(service.storeInvoice).toHaveBeenCalledWith(
        mockFile,
        startDto.referenceId,
      );
      expect(result).toEqual(mockServiceResponse);
    });

    it('should upload an invoice file without reference ID', async () => {
      const startDto: StartDto = {};
      const resultWithoutRefId = {
        ...mockServiceResponse,
        referenceId: undefined,
      };

      jest
        .spyOn(service, 'storeInvoice')
        .mockResolvedValueOnce(resultWithoutRefId);

      const result = await controller.uploadInvoice(mockFile, startDto);

      expect(service.storeInvoice).toHaveBeenCalledWith(mockFile, undefined);
      expect(result).toEqual(resultWithoutRefId);
    });

    it('should log received invoice information', async () => {
      const loggerSpy = jest.spyOn(Logger.prototype, 'log');
      const startDto: StartDto = { referenceId: 'INV-2025-001' };

      await controller.uploadInvoice(mockFile, startDto);

      expect(loggerSpy).toHaveBeenCalledWith(
        expect.stringContaining(mockFile.originalname),
      );
    });
  });
});
