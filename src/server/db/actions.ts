import { StorageItem } from "./schema";
import { StorageItemMetadata } from "./schema";
import { db } from ".";
import { eq } from "drizzle-orm";

// All mutation operations
export const MUTATIONS = {
  createFile: async (file: StorageItem) => {
    const fileId = await db
      .insert(StorageItemMetadata)
      .values({
        name: file.name,
        url: file.url,
        type: file.type,
        parentId: file.parentId,
        date: file.date,
        shared: file.shared.toString(),
      })
      .returning();
    return fileId[0];
  },
};

// All query operations
export const QUERIES = {
  getAllFiles: async () => {
    const dbResponse = await db.select().from(StorageItemMetadata);
    return dbResponse[0];
  },

  getFilesForParent: async (parentId: string) => {
    const dbResponse = await db
      .select()
      .from(StorageItemMetadata)
      .where(eq(StorageItemMetadata.parentId, parentId));
    return dbResponse[0];
  },
};
