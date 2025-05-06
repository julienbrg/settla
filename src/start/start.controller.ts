import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { StartService } from './start.service';
import { StartDto, StartResponseDto } from '../dto/start.dto';
import { PdfFileValidator } from '../validators/pdf-file.validator';

@ApiTags('Start')
@Controller('start')
export class StartController {
  private readonly logger = new Logger(StartController.name);

  constructor(private readonly startService: StartService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a PDF invoice to start processing' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'PDF invoice file to upload',
        },
        referenceId: {
          type: 'string',
          description: 'Optional reference ID for the invoice',
          example: 'INV-2025-001',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Invoice uploaded successfully',
    type: StartResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file format or size',
  })
  async uploadInvoice(
    @UploadedFile(new PdfFileValidator({ maxSize: 10 * 1024 * 1024 }))
    file: Express.Multer.File,
    @Body() startDto: StartDto,
  ): Promise<StartResponseDto> {
    this.logger.log(`Received invoice upload: ${file.originalname}`);
    return this.startService.storeInvoice(file, startDto.referenceId);
  }
}
