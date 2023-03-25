"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AzureStorageModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureStorageModule = void 0;
const azure_storage_service_1 = require("./azure-storage.service");
const upload_interface_1 = require("./interfaces/upload.interface");
const common_1 = require("@nestjs/common");
let AzureStorageModule = AzureStorageModule_1 = class AzureStorageModule {
    static register(options) {
        return {
            module: AzureStorageModule_1,
            providers: [
                {
                    provide: upload_interface_1.FILE_UPLOAD_OPTIONS,
                    useValue: options,
                },
                azure_storage_service_1.AzureStorageService,
            ],
            exports: [azure_storage_service_1.AzureStorageService],
        };
    }
    static forRoot(opts) {
        const providers = [
            { provide: upload_interface_1.FILE_UPLOAD_OPTIONS, useValue: opts },
            azure_storage_service_1.AzureStorageService,
        ];
        return {
            module: AzureStorageModule_1,
            providers: providers,
            exports: providers,
        };
    }
    static forRootAsync(opts) {
        const providers = [
            {
                provide: upload_interface_1.FILE_UPLOAD_OPTIONS,
                useFactory: opts.useFactory,
                inject: opts.inject,
            },
            azure_storage_service_1.AzureStorageService,
        ];
        return {
            module: AzureStorageModule_1,
            providers: providers,
            exports: providers,
        };
    }
};
AzureStorageModule = AzureStorageModule_1 = __decorate([
    (0, common_1.Module)({})
], AzureStorageModule);
exports.AzureStorageModule = AzureStorageModule;
//# sourceMappingURL=azure-storage.module.js.map