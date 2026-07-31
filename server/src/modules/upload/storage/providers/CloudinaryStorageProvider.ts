import { IStorageProvider } from "../IStorageProvider";

class CloudinaryStorageProvider implements IStorageProvider {
  delete(): boolean {
    throw new Error("Cloudinary provider is not configured.");
  }

  exists(): boolean {
    return false;
  }
}

export default new CloudinaryStorageProvider();