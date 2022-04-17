import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  Response,
  StreamableFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('video')
export class VideoController {
  constructor() {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadVideo(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(body)
    console.log(file)
    return "ok subido";
  }

  @Get('file')
  getVideo(
  ) {
    const file = createReadStream(join(process.cwd(), './files/file-1650210341761-entrada-BAD-BUNNY---WORLDS-HOTTEST-TOUR_20-11-22-Bryam-Steevens-Diaz-Abril.pdf'));
    return new StreamableFile(file);
  }
}
