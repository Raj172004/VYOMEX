import {
  DataMode,
} from "../DataProvider";

export abstract class BaseDataProvider {
  abstract readonly mode: DataMode;
}
