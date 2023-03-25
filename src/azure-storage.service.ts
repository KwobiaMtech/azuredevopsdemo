import {
  ContainerClient,
  BlobServiceClient,
  BlobDeleteIfExistsResponse,
} from "@azure/storage-blob";
import { Inject, Injectable } from "@nestjs/common";
import { uuid } from "uuidv4";
import { AzureStorageOptions, FILE_UPLOAD_OPTIONS } from "./interfaces/upload.interface";

@Injectable()
export class AzureStorageService {
  private containerClient: ContainerClient;
  private clientService: BlobServiceClient;
  constructor(
    @Inject(FILE_UPLOAD_OPTIONS)
    private storageOptions: AzureStorageOptions
  ) {
    this.clientService = BlobServiceClient.fromConnectionString(
      this.storageOptions.connectionString
    );
    this.containerClient = this.clientService.getContainerClient(
      this.storageOptions.containerName
    );
  }

  async uploadFile(file: Express.Multer.File) {
    const fileName = `${uuid()}-${file.originalname}`;
    const blobClient = this.containerClient.getBlockBlobClient(fileName);
    await blobClient.uploadData(file.buffer);
    return {
      name: fileName,
      url: blobClient.url,
    };
  }

  async deleteFile(fileName: string): Promise<BlobDeleteIfExistsResponse> {
    const blobClient = this.containerClient.getBlockBlobClient(fileName);
    return await blobClient.deleteIfExists();
  }
}
