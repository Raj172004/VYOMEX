import fs from "fs";
import path from "path";

import { IStorageProvider } from "./IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  public delete(filePath: string): boolean {
    const fullPath = path.join(process.cwd(), filePath);

    if (!fs.existsSync(fullPath)) {
      return false;
    }

    fs.unlinkSync(fullPath);

    return true;
  }

  public exists(filePath: string): boolean {
    return fs.existsSync(path.join(process.cwd(), filePath));
  }
}

export default new LocalStorageProvider();