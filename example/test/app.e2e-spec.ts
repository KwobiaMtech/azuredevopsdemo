import { TestClient } from "./test-client";

describe('User auth test', () => {
  let testClient: TestClient;

  beforeAll(async () => {
    testClient = new TestClient();
    await testClient.init();
  });

  afterAll(async () => {
    await testClient.close();
  });

  it('/ Should Upload And Delete File', async () => {

    const uploadData: any = {
      firstName: 'James',
      lastName: 'Oduro',
    };
    const upload = await testClient.httpRequest('post', '/upload/file/', {
      fields: uploadData,
      files: { file: { path: `${process.cwd()}/test/test-profile.png` } },
    });

    expect(upload.name).toBeDefined();
    expect(upload.url).toBeDefined();
    // delete file
    const deletedFile = await testClient.httpRequest('delete', '/delete/file/', {
      payload: {
        name: upload.name,
      }
    });

    expect(deletedFile.succeeded).toBeTruthy();

  });
});
