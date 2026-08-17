export type DataMode =
  | "demo"
  | "production";

export interface DataProvider {
  readonly mode: DataMode;
}
