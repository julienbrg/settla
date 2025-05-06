import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

interface PdfFileValidatorOptions {
  optional?: boolean;
  maxSize?: number;
}

@Injectable()
export class PdfFileValidator implements PipeTransform {
  private optional: boolean;
  private maxSize: number;

  constructor(options: PdfFileValidatorOptions = {}) {
    this.optional = options.optional || false;
    this.maxSize = options.maxSize || 10 * 1024 * 1024; // Default 10MB
  }

  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value) {
      if (this.optional) {
        return undefined;
      }
      throw new BadRequestException('PDF file is required');
    }

    if (!value.mimetype || !value.mimetype.includes('pdf')) {
      throw new BadRequestException(
        'Only PDF files are allowed for processing',
      );
    }

    if (value.size > this.maxSize) {
      throw new BadRequestException(
        `File size exceeds the maximum allowed size (${Math.floor(
          this.maxSize / (1024 * 1024),
        )}MB)`,
      );
    }

    return value;
  }
}
