import { Module } from '@nestjs/common';
import { VideoModule } from './video/video.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageService } from './storage/storage.service';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [ 
    MongooseModule.forRoot('mongodb://root:example@' + process.env.DB_HOST +':27017', { dbName: 'meddit_video_db' }),
    VideoModule,
    StorageModule
  ],
  providers: [StorageService],
})

export class AppModule {}
