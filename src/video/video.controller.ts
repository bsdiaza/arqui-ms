import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  UploadedFile,
  UseInterceptors,
  Param
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { StorageService } from 'src/storage/storage.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './schemas/video.schema';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService, private storageService: StorageService) {}

  @Post('')
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        files: 1,
        fileSize: 1024 * 1024 * 1024,
      },
    })
  )
  async uploadVideo(
    @Body() body: CreateVideoDto,
    @UploadedFile() file: Express.Multer.File
  ) : Promise<Video> {
    const fileExtension = file.originalname.split('.').pop();
    const createdVideo = await this.videoService.createVideo({ ...body, extension: fileExtension });
    await this.storageService.save(
      `media/${createdVideo._id}.${fileExtension}`,
      file.mimetype,
      file.buffer,
      [{ mediaId: `${createdVideo._id}` }]
    );
    return createdVideo;
  }

  @Get('stream/:id')
  async getVideoStream(@Param('id') id: string, @Res() res) {
    const { _id, extension } = await this.videoService.getVideoData(id);
    const fileMetaData = await this.storageService.getMetaData(`media/${_id}.${extension}`);
    res.set('Content-Type', fileMetaData.contentType);
    this.storageService.getFileStream(`media/${_id}.${extension}`).pipe(res);
  }

  @Get('data/:id')
  getVideoData(@Param('id') id: string): Promise<Video> {
    return this.videoService.getVideoData(id);
  }

  @Put('data/:id')
  updateVideoData(@Body() body: UpdateVideoDto) {
    return this.videoService.updateVideo(body);
  }

  @Delete(':id')
  async deleteVideo(@Param('id') id: string) {
    await this.videoService.deleteVideo(id);
    await this.storageService.delete(id);
  }
}
