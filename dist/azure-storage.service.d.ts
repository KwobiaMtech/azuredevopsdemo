/// <reference types="multer" />
import { BlobDeleteIfExistsResponse } from "@azure/storage-blob";
import { AzureStorageOptions } from "./interfaces/upload.interface";
export declare class AzureStorageService {
    private storageOptions;
    private containerClient;
    private clientService;
    constructor(storageOptions: AzureStorageOptions);
    uploadFile(file: Express.Multer.File): Promise<{
        name: string;
        url: string;
    }>;
    deleteFile(fileName: string): Promise<BlobDeleteIfExistsResponse>;
}
//# sourceMappingURL=azure-storage.service.d.ts.map