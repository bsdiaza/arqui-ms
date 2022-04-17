import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({ 
      destination: function (req, file, cb) {
        cb(null, './files')
      },
      filename: function (req, file, cb) {
        console.log(req)
        const uniqueSuffix = Date.now() + '-' + file.originalname
        console.log(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      } 
    })
  })],
  controllers: [VideoController],
})
export class VideoModule {}
