import { globalConfig } from "../src/config";
import { INestApplication } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { Test, TestingModule, TestingModuleBuilder } from "@nestjs/testing";
import { AzureStorageModule } from "../src/azure-storage.module";
import { TestLogger } from "./logger";
import { HttpModule } from "@nestjs/axios";
import { AzureStorageOptions } from "../src/interfaces/upload.interface";

export class TestClientWithForRootAsync {
  defaultHeaders: Record<string, string> = {};
  responseBody: any;

  protected _app: INestApplication;

  get app() {
    return this._app;
  }

  protected _testingModule: TestingModule;

  get testingModule(): TestingModule {
    return this._testingModule;
  }

  async init(configurator?: (builder: TestingModuleBuilder) => void) {
    const builder = Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          envFilePath: [".env"],
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
    });
    if (configurator) {
      configurator(builder);
    }

    builder.setLogger(new TestLogger());
    this._testingModule = await builder.compile();

    this._app = this._testingModule.createNestApplication();

    await this._app.init();
  }

  async close() {
    await this._app.close();
  }
}
