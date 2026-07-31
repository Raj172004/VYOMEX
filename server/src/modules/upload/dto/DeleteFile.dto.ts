import { IDeleteFile } from "../interfaces/IDeleteFile";

export class DeleteFileDto implements IDeleteFile {
  path: string;

  constructor(data: IDeleteFile) {
    this.path = data.path;
  }
}