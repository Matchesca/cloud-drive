import { webdavClient } from "@/lib/webdav-client";
import { StorageItem } from "@/modules/dashboard/Dashboard";

export const MUTATIONS = {
  rename: async ({
    item,
    newItem,
  }: {
    item: StorageItem;
    newItem: StorageItem;
  }): Promise<string> => {
    try {
      console.log(item, newItem);
      await webdavClient.moveFile(
        `${item.userId}${decodeURIComponent(item.url)}`,
        `${item.userId}${decodeURIComponent(newItem.url)}`,
      );
      return "Success";
    } catch (error) {
      console.error("Error in mutation rename:", error);
      throw error;
    }
  },
};
