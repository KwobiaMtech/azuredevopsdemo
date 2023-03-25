import { AzureStorageOptions } from "./interfaces/upload.interface";
import { DynamicModule } from "@nestjs/common";
export declare class AzureStorageModule {
    static register(options: AzureStorageOptions): DynamicModule;
    static forRoot(opts?: AzureStorageOptions): DynamicModule;
    static forRootAsync(opts?: {
        useFactory: (...args: any[]) => Promise<AzureStorageOptions> | AzureStorageOptions;
        inject: any[];
    }): DynamicModule;
}
//# sourceMappingURL=azure-storage.module.d.ts.map