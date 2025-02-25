import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `drive_${name}`);

export type StorageItemTypes =
  | "Folder"
  | "PDF"
  | "Word Document"
  | "Python Script"
  | "Presentation"
  | "PNG";

export type StorageItem = {
  id: string;
  name: string;
  url: string;
  type: StorageItemTypes;
  parentId: string; // 0 indicates a root-level item
  date: string;
  shared: boolean;
  size?: string; // Only for files
  extension?: string; // Only for files
};

export const StorageItemMetadata = createTable("storage_item", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  url: text("url").notNull(),
  type: text("type").notNull(),
  parentId: text("parent_id").notNull(),
  date: text("date").notNull(),
  shared: text("shared").notNull(),
});
