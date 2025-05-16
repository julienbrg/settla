import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class StartDto {
  @ApiProperty({
    description: 'Optional reference ID for the invoice',
    example: 'INV-2025-001',
    required: false,
  })
  @IsString()
  @IsOptional()
  referenceId?: string;
}

export class StartResponseDto {
  @ApiProperty({
    description: 'Path where the invoice was stored',
    example: 'data/invoices/invoice-123456.pdf',
  })
  path: string;

  @ApiProperty({
    description: 'Original filename',
    example: 'invoice.pdf',
  })
  filename: string;

  @ApiProperty({
    description: 'Size of file in bytes',
    example: 12345,
  })
  size: number;

  @ApiProperty({
    description: 'Timestamp of upload',
    example: '2025-05-06T12:30:45.123Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Reference ID (if provided)',
    example: 'INV-2025-001',
    required: false,
  })
  referenceId?: string;
}
