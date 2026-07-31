export interface IStorageProvider {
  delete(filePath: string): boolean;
  exists(filePath: string): boolean;
}