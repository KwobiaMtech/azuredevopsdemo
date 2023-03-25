
import { AzureStorageService } from "../src/azure-storage.service";
import { lastValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { Readable } from "stream";
import { BlobDeleteIfExistsResponse } from "@azure/storage-blob";
import { TestClientForRoot } from "./test-client-forroot";

describe("For Root Module Test (e2e)", () => {
  let testClient: TestClientForRoot;

  beforeAll(async () => {
    testClient = new TestClientForRoot();
    await testClient.init();
  });

  it("/ Should Upload and Delete File", async () => {
    const http = testClient.app.get<HttpService>(HttpService);
    const filePath = process.env.TEST_IMAGE_URL || "";
    const response = await lastValueFrom(
      http.get(filePath, { responseType: "arraybuffer" })
    );
    const file: Express.Multer.File = {
      fieldname: "test-image",
      originalname: "test-image",
      encoding: "",
      mimetype: "",
      size: 0,
      destination: "",
      filename: "",
      path: "",
      buffer: response.data,
      stream: new Readable(),
    };
    const storageService =
      testClient.app.get<AzureStorageService>(AzureStorageService);
    const uploadedFile = await storageService.uploadFile(file);
    expect(uploadedFile.name).toBeDefined();
    expect(uploadedFile.url).toBeDefined();
    const deletedFile: BlobDeleteIfExistsResponse =
      await storageService.deleteFile(uploadedFile.name);
    expect(deletedFile.succeeded).toBeTruthy();
  });
});
