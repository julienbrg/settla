import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from '../app.service';
import { AskResponseDto } from '../dto/ask-response.dto';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class ExtractService {
  private readonly logger = new Logger(ExtractService.name);

  constructor(private readonly appService: AppService) {}

  /**
   * Extracts invoice data from a PDF file
   * @param file PDF file containing invoice data
   * @returns Extracted invoice information in JSON format
   */
  async extractInvoiceData(file: Express.Multer.File): Promise<AskResponseDto> {
    try {
      this.logger.log(`Processing invoice extraction: ${file.originalname}`);

      // 1. Extract text content from PDF
      const textContent = await this.extractTextFromPdf(file);

      if (!textContent || textContent.trim().length === 0) {
        throw new HttpException(
          'Failed to extract text from PDF',
          HttpStatus.BAD_REQUEST,
        );
      }

      this.logger.debug(`Extracted text content (${textContent.length} chars)`);

      // Add specific instructions to force JSON output
      const message = `Extract the following invoice data in JSON format ONLY:\n\n${textContent}`;

      // 2. Process the extracted text using the AppService.ask method
      const result = await this.appService.ask(
        message, // use extracted text as message with instructions
        'anthropic', // use anthropic model
        undefined, // no sessionId
        undefined, // no walletAddress
        'invoices', // context set to 'invoices'
      );

      // Try to clean the response if it's not already in proper JSON format
      if (result.output && !result.output.trim().startsWith('{')) {
        // Try to extract JSON from the response if it's embedded in markdown or has extra text
        const jsonMatch =
          result.output.match(/```json\s*(\{.*?\})\s*```/s) ||
          result.output.match(
            /\{[\s\S]*"invoice_number"[\s\S]*"issuance_date"[\s\S]*"total_amount"[\s\S]*\}/,
          );

        if (jsonMatch && jsonMatch[1]) {
          // Found JSON in markdown code block
          result.output = jsonMatch[1];
        } else if (result.output.includes('{') && result.output.includes('}')) {
          // Try to extract anything that looks like JSON
          const startIdx = result.output.indexOf('{');
          const endIdx = result.output.lastIndexOf('}') + 1;
          if (startIdx >= 0 && endIdx > startIdx) {
            result.output = result.output.substring(startIdx, endIdx);
          }
        }
      }

      this.logger.log(
        `Successfully processed invoice extraction for ${file.originalname}`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `Error extracting invoice data: ${error.message}`,
        error.stack,
      );

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        `Failed to extract invoice data: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Extracts text content from a PDF file using pdf-parse library
   * @param file PDF file to extract text from
   * @returns Extracted text content
   */
  private async extractTextFromPdf(file: Express.Multer.File): Promise<string> {
    try {
      // Use pdf-parse library to extract text from PDF
      const data = await pdfParse(file.buffer);

      // Get the text content
      let textContent = data.text || '';

      // Apply some text normalization
      textContent = textContent
        .replace(/\r\n/g, '\n')
        .replace(/\f/g, '\n')
        .replace(/\u0000/g, '') // Remove null bytes
        .trim();

      if (textContent.length === 0) {
        throw new Error('No text content could be extracted from the PDF');
      }

      this.logger.debug(`Extracted ${textContent.length} characters from PDF`);

      return textContent;
    } catch (error) {
      this.logger.error(`Error extracting text from PDF: ${error.message}`);
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }
}
