<p align="center">
  <img
    src="https://intellipaat.com/blog/wp-content/uploads/2019/06/Graphics-01.jpg"
    width="250"
  />
</p>

<h1 align="center">NestJS Azure Storage</h1>

<p align="center">
  <strong>Wrapper for NestJS Azure Storage</strong>
</p>



> Nestjs-azure-storage is a tiny wrapper on top of azure storage sdks that makes life easier when uploading and deleting files

This module makes it easier to deal with Azure Storage  when using Nest.js!

**docs**: https://github.com/KwobiaMtech/nestjs-azure-storage

---

Let's get started!

```sh

npm i nestjs-azure-storage

yarn add nestjs-azure-storage
```

You'll need to add `nestjs-azure-storage` to your module,
which you can do like this:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { AzureStorageModule, AzureStorageOptions } from 'nestjs-azure-storage';

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: ['.env'],
        isGlobal: true,
        load: [globalConfig],
      }),
      AzureStorageModule.forRootAsync({
        useFactory: async (config: ConfigType<typeof globalConfig>) => {
          const opts = {
            containerName: config.azure.container,
            connectionString: config.azure.connectionString,
          } as AzureStorageOptions;
          return opts;
        },
        inject: [globalConfig.KEY],
    }),
  ],

})
export class AppModule {}
```

Another way to call  nestjs-azure-storage in your module can be seen below:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { AzureStorageModule, AzureStorageOptions } from 'nestjs-azure-storage';

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: ['.env'],
        isGlobal: true,
        load: [globalConfig],
      }),
      AzureStorageModule.forRoot({
        containerName: process.env.containerName,
        connectionString: process.env.connectionString
    })
  ],

})
export class AppModule {}
```

You can structure your controller as shown below to take advantage of the Azure Storage package:

```typescript
import { AppService } from './app.service';
import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { BlobDeleteIfExistsResponse } from '@azure/storage-blob';
import { FileInterceptor } from '@nestjs/platform-express';


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
  ): Promise<BlobDeleteIfExistsResponse> {
    if (!data.name) throw new Error('File name is required');
    return await this.service.deleteFile(data.name);
  }
}

```


To use azure storage service, you will need to inject the service into your custom service class as shown below 

```typescript
import { AzureStorageService } from 'nestjs-azure-storage';

constructor(
  private storage: AzureStorageService
) {}

```


To implement Azure storage service in your custom service class, you can structure your service as show below

```typescript

import { Injectable } from '@nestjs/common';
import { AzureStorageService } from 'nestjs-azure-storage';
import { BlobDeleteIfExistsResponse } from "@azure/storage-blob";

@Injectable()
export class AppService {
  constructor(private storage: AzureStorageService){}

  async uploadFile(file: Express.Multer.File): Promise<{name: string, url: string}> {
   return this.storage.uploadFile(file);
  }

  async deleteFile(fileName: string): Promise<BlobDeleteIfExistsResponse> {
    return this.storage.deleteFile(fileName);
  }
  
}

```


Apart from this README, you can find examples of using the library in the following places:

- [Example usage][]

[example usage]:  https://github.com/KwobiaMtech/nestjs-azure-storage/tree/main/example/src



This project is [MIT Licensed](LICENSE).
