import fs from "fs";
import path from "path";

class FileStorageHelper {
  public deleteFile(filePath: string): boolean {
    const fullPath = path.join(process.cwd(), filePath);

    if (!fs.existsSync(fullPath)) {
      return false;
    }

    fs.unlinkSync(fullPath);

    return true;
  }

  public fileExists(filePath: string): boolean {
    return fs.existsSync(path.join(process.cwd(), filePath));
  }
}

export default new FileStorageHelper();