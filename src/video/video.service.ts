import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from 'src/video/schemas/video.schema';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private videoModel: Model<VideoDocument>) {}

  async createVideo(videoInfo: CreateVideoDto): Promise<Video>{
    const createdVideo = await this.videoModel.create(videoInfo);
    return createdVideo;
  }

  async getVideoData(videoId: string): Promise<Video> {
    return await this.videoModel.findById(videoId).exec();
  }

  async updateVideo(videoInfo: UpdateVideoDto): Promise<void> {
    await this.videoModel.updateOne({ id: videoInfo._id }, videoInfo).exec();
  }

  async deleteVideo(videoId: string): Promise<void> {
    await this.videoModel.findByIdAndRemove({ _id: videoId }).exec();
  }

  multerDestination() {

  }

}
