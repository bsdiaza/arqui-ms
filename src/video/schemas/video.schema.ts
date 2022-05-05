import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
  _id: string; 

  @Prop({ required: true })
  owner: number;

  @Prop({ required: true })
  community: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: String;

  @Prop({ required: false, default: 0 })
  likes: number;

  @Prop({ required: false, default: 0 })
  dislikes: number;

  @Prop({ required: false, default: 0 })
  views: number;

  @Prop({ required: false, default: 0 })
  extension: string;

}

export const videoSchema = SchemaFactory.createForClass(Video);