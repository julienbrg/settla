import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ExtractController } from './extract.controller';
import { ExtractService } from './extract.service';
import { AppService } from '../app.service';
import { MistralService } from '../mistral/mistral.service';
import { AnthropicService } from '../anthropic/anthropic.service';
import { CostTracker } from '../memory/cost-tracking.service';
import { ContextService } from '../context/context.service';
import { SubsService } from '../subs/subs.service';
import { WebReaderService } from '../web/web-reader.service';
import { SiweModule } from '../siwe/siwe.module';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
    SiweModule,
  ],
  controllers: [ExtractController],
  providers: [
    ExtractService,
    AppService,
    MistralService,
    AnthropicService,
    CostTracker,
    ContextService,
    SubsService,
    WebReaderService,
  ],
  exports: [ExtractService],
})
export class ExtractModule {}
