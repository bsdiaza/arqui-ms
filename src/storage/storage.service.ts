import { StorageFile } from "./storage-file";
import { DownloadResponse, Storage } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";
import StorageConfig from "./storage-config";
import internal from "stream";

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: string;

  constructor() {
    this.storage = new Storage({
      projectId: StorageConfig.projectId,
      credentials: {
        client_email: StorageConfig.client_email,
        private_key: StorageConfig.private_key,
      },
    });

    this.bucket = StorageConfig.mediaBucket;
  }

  save(
    path: string,
    contentType: string,
    media: Buffer,
    metadata: { [key: string]: string }[]
  ) {
    const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    const file = this.storage.bucket(this.bucket).file(path);
    const stream = file.createWriteStream();
    stream.on("finish", async () => {
      return await file.setMetadata({
        metadata: object,
      });
    });
    stream.end(media);
  }

  async delete(path: string) {
    await this.storage
      .bucket(this.bucket)
      .file(path)
      .delete({ ignoreNotFound: true });
  }

  async getMetaData(path: string): Promise<StorageFile> {
    const [metadata] = await this.storage
      .bucket(this.bucket)
      .file(path)
      .getMetadata();
    return metadata;
  }

  getFileStream(path: string): internal.Readable {
    const fileResponse: internal.Readable = this.storage
      .bucket(this.bucket)
      .file(path)
      .createReadStream();
    return fileResponse;
  }
}