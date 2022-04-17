import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
}
