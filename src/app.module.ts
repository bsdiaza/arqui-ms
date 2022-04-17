import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoService } from './video/video.service';
import { VideoModule } from './video/video.module';

@Module({
  imports: [VideoModule],
  controllers: [AppController],
  providers: [AppService, VideoService],
})
export class AppModule {}
