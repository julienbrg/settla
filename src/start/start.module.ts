import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { StartController } from './start.controller';
import { StartService } from './start.service';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
  ],
  controllers: [StartController],
  providers: [StartService],
  exports: [StartService],
})
export class StartModule {}
