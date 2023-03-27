import { AppService } from './app.service';
import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';


import { FileInterceptor } from '@nestjs/platform-express';


// push update to remote github

@Controller()
export class AppController {
  constructor(private service: AppService) {}

  @Post('upload/file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() req: any,
  ): Promise<{name: string, url: string}> {
    if (!file) throw new Error('File not found');
    file = {
      ...file,
      originalname: file.originalname,
    };
    return await this.service.uploadFile(file);
  }

  @Delete('delete/file')
  async deleteFile(
    @Body() data: {name: string},
  ): Promise<any> {
    if (!data.name) throw new Error('File name is required');
    return await this.service.deleteFile(data.name);
  }
}
