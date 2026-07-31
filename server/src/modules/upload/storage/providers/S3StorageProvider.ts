import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  delete(): boolean {
    throw new Error("AWS S3 provider is not configured.");
  }

  exists(): boolean {
    return false;
  }
}

export default new S3StorageProvider();