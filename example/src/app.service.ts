import { Injectable } from '@nestjs/common';
import { AzureStorageService } from 'nestjs-azure-storage';


@Injectable()
export class AppService {
  constructor(private storage: AzureStorageService){}

  async uploadFile(file: Express.Multer.File): Promise<{name: string, url: string}> {
   return this.storage.uploadFile(file);
  }

  async deleteFile(fileName: string): Promise<any> {
    return this.storage.deleteFile(fileName);
  }
  
}
