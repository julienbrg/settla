import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MistralService } from './mistral/mistral.service';
import { AnthropicService } from './anthropic/anthropic.service';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottlerGuard } from './throttler.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import { ContextModule } from './context/context.module';
import { AnthropicModule } from './anthropic/anthropic.module';
import { CostTracker } from './memory/cost-tracking.service';
import { SiweModule } from './siwe/siwe.module';
import { SubsService } from './subs/subs.service';
import { WebReaderModule } from './web/web-reader.module';
import { StartModule } from './start/start.module';
import { ExtractModule } from './extract/extract.module'; // Import the new ExtractModule

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 3600000,
        limit: 50,
        name: 'ask',
      },
      {
        ttl: 60000,
        limit: 20,
        name: 'web',
      },
    ]),
    ContextModule,
    AnthropicModule,
    SiweModule,
    WebReaderModule,
    StartModule,
    ExtractModule, // Add the ExtractModule to the imports array
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MistralService,
    AnthropicService,
    CostTracker,
    SubsService,
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
