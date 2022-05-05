import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, videoSchema } from './schemas/video.schema';
import { VideoService } from './video.service';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [
    StorageModule,
    MongooseModule.forFeature([{ name: Video.name, schema: videoSchema }])
  ],
  controllers: [VideoController],
  providers: [VideoService]
})
export class VideoModule {}
