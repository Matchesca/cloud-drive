import { webdavClient } from "@/lib/webdav-client";
import { StorageItem } from "@/modules/dashboard/Dashboard";
import axios from "axios";

export const QUERIES = {
  fetchDriveData: async ({ queryKey }: any) => {
    const [_key, { activeFolder }] = queryKey;
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_SERVER}/drive/get-files-for-parent`,
        data: { parentId: activeFolder.id },
        method: "POST",
        withCredentials: true,
      });

      const items = response.data;
      const itemArray: StorageItem[] = items.map((item: any) => ({
        id: item.id,
        userId: item.userId,
        url: item.path,
        name: item.name,
        size: item.size,
        parentId: item.parentId,
        shared: false,
        type: item.type,
        date: item.createdAt,
      }));

      return itemArray;
    } catch (error) {
      throw error;
    }
  },

  fetchDriveQuota: async () => {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_SERVER}/user/get-quota`,
        method: "GET",
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
