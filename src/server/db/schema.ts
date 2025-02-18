import { sqliteTableCreator } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `drive_${name}`);

export type StorageItemType =
  | "Folder"
  | "PDF"
  | "Word Document"
  | "Python Script"
  | "Presentation"
  | "PNG";
