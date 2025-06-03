import { ApiProperty } from '@nestjs/swagger';

export class ExtractResponseDto {
  @ApiProperty({
    description: 'Whether this is a valid invoice',
    example: true,
  })
  is_invoice: boolean;

  @ApiProperty({
    description: 'The invoice number',
    example: '8888888',
  })
  invoice_number: string;

  @ApiProperty({
    description: 'The total amount of the invoice',
    example: 51000.0,
  })
  total_amount: number;

  @ApiProperty({
    description: 'The target company name',
    example: 'Nike',
  })
  target_company_name: string;

  @ApiProperty({
    description: 'The issue date of the invoice',
    example: '2024-04-08',
  })
  issue_date: string;

  @ApiProperty({
    description: 'The due date of the invoice',
    example: '2024-05-31',
  })
  due_date: string;

  @ApiProperty({
    description: 'Payment delay in days',
    example: 53,
  })
  payment_delay: number;

  @ApiProperty({
    description: 'Amount already paid',
    example: 0.0,
  })
  already_paid: number;

  @ApiProperty({
    description: 'Contact person name',
    example: 'Michael Jackson',
  })
  contact_name: string;

  @ApiProperty({
    description: 'Contact email address',
    example: 'michael@strat.cc',
  })
  contact_email: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+33688888888',
  })
  contact_phone: string;

  @ApiProperty({
    description: 'Company registration number',
    example: '8888888888',
  })
  contact_company_registration_number: string;

  @ApiProperty({
    description: 'The LLM model used for extraction',
    example: 'claude-3-7-sonnet-20250219',
  })
  llm_model_used: string;

  @ApiProperty({
    description: 'Session ID for tracking',
    example: 'c817623c-7e57-41a8-a17b-57eb08239fd7',
  })
  sessionId: string;
}
