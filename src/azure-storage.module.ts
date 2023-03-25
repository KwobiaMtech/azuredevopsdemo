import { AzureStorageService } from "./azure-storage.service";
import { AzureStorageOptions, FILE_UPLOAD_OPTIONS } from "./interfaces/upload.interface";
import { DynamicModule, Module, Provider } from "@nestjs/common";

@Module({})
export class AzureStorageModule {
  static register(options: AzureStorageOptions): DynamicModule {
    return {
      module: AzureStorageModule,
      providers: [
        {
          provide: FILE_UPLOAD_OPTIONS,
          useValue: options,
        },
        AzureStorageService,
      ],
      exports: [AzureStorageService],
    };
  }

  static forRoot(opts?: AzureStorageOptions): DynamicModule {
    const providers: Provider<any>[] = [
      { provide: FILE_UPLOAD_OPTIONS, useValue: opts },
      AzureStorageService,
    ];
    return {
      module: AzureStorageModule,
      providers: providers,
      exports: providers,
    };
  }

  static forRootAsync(opts?: {
    useFactory: (
      ...args: any[]
    ) => Promise<AzureStorageOptions> | AzureStorageOptions;
    inject: any[];
  }): DynamicModule {
    const providers: Provider<any>[] = [
      {
        provide: FILE_UPLOAD_OPTIONS,
        useFactory: opts.useFactory,
        inject: opts.inject,
      },
      AzureStorageService,
    ];
    return {
      module: AzureStorageModule,
      providers: providers,
      exports: providers,
    };
  }
}
