import { Injectable, Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StartService {
  private readonly logger = new Logger(StartService.name);
  private readonly invoicesPath: string;

  constructor() {
    this.invoicesPath = join(process.cwd(), 'data', 'invoices');
    this.ensureInvoicesDirExists();
  }

  private async ensureInvoicesDirExists(): Promise<void> {
    try {
      await fs.mkdir(this.invoicesPath, { recursive: true });
      this.logger.log(`Invoices directory created at ${this.invoicesPath}`);
    } catch (error) {
      this.logger.error('Failed to create invoices directory:', error);
    }
  }

  async storeInvoice(
    file: Express.Multer.File,
    referenceId?: string,
  ): Promise<{
    path: string;
    filename: string;
    size: number;
    timestamp: string;
    referenceId?: string;
  }> {
    try {
      await this.ensureInvoicesDirExists();

      // Generate a unique filename
      const uniqueId = uuidv4();
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileExtension = '.pdf';

      // Use reference ID in filename if provided
      const filenamePrefix = referenceId
        ? `${referenceId.replace(/[^a-zA-Z0-9-_]/g, '')}-`
        : '';

      const filename = `${filenamePrefix}${timestamp}-${uniqueId}${fileExtension}`;
      const filepath = join(this.invoicesPath, filename);

      // Store the file
      await fs.writeFile(filepath, file.buffer);

      this.logger.log(`Invoice stored successfully at ${filepath}`);

      return {
        path: filepath,
        filename: file.originalname,
        size: file.size,
        timestamp: new Date().toISOString(),
        referenceId,
      };
    } catch (error) {
      this.logger.error(`Failed to store invoice: ${error.message}`);
      throw error;
    }
  }
}
