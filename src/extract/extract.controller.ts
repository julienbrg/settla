import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
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
import { PdfFileValidator } from '../validators/pdf-file.validator';
import { ExtractService } from './extract.service';
import { AskResponseDto } from '../dto/ask-response.dto';

@ApiTags('Extract')
@Controller('extract')
export class ExtractController {
  private readonly logger = new Logger(ExtractController.name);

  constructor(private readonly extractService: ExtractService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Extract information from PDF invoice' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'PDF invoice file to extract information from',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Invoice information extracted successfully',
    type: AskResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file format or size',
  })
  async extractInvoiceData(
    @UploadedFile(new PdfFileValidator({ maxSize: 10 * 1024 * 1024 }))
    file: Express.Multer.File,
  ): Promise<AskResponseDto> {
    this.logger.log(`Processing invoice extraction for: ${file.originalname}`);
    return this.extractService.extractInvoiceData(file);
  }
}
