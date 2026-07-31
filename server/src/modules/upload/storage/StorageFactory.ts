import { IStorageProvider } from "./IStorageProvider";
import localStorageProvider from "./LocalStorageProvider";
import cloudinaryStorageProvider from "./providers/CloudinaryStorageProvider";
import s3StorageProvider from "./providers/S3StorageProvider";

class StorageFactory {
  public getProvider(): IStorageProvider {
    switch ((process.env.STORAGE_PROVIDER || "local").toLowerCase()) {
      case "cloudinary":
        return cloudinaryStorageProvider;

      case "s3":
        return s3StorageProvider;

      default:
        return localStorageProvider;
    }
  }
}

export default new StorageFactory();