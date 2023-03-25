import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { AzureStorageModule, AzureStorageOptions } from 'nestjs-azure-storage';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { globalConfig } from './config';

@Module({
  imports: [
      ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [globalConfig],
    }),
    // AzureStorageModule.forRootAsync({
    //   useFactory: async (config: ConfigType<typeof globalConfig>) => {
    //     const opts = {
    //       containerName: config.azure.container,
    //       connectionString: config.azure.connectionString,
    //     } as AzureStorageOptions;
    //     return opts;
    //   },
    //   inject: [globalConfig.KEY],
    // }),
    
    // AzureStorageModule.forRoot({
    //   containerName: process.env.AZURE_STORAGE_CONTAINER,
    //   connectionString: process.env.AZURE_CONTAINER_CONNECTION_STRING,
    // })
    AzureStorageModule.register({
      containerName: process.env.AZURE_STORAGE_CONTAINER,
      connectionString: process.env.AZURE_CONTAINER_CONNECTION_STRING,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
