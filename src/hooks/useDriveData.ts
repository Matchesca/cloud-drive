import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { StorageItem } from "@/modules/dashboard/Dashboard";

export const useDriveData = (activeFolder: StorageItem) => {
  const [driveFiles, setDriveFiles] = useState<StorageItem[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const fetchFiles = useCallback(async () => {
    setDataLoading(true);
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
        url: item.path,
        name: item.name,
        size: item.size,
        parentId: item.parentId,
        shared: false,
        type: item.type,
        date: item.createdAt,
      }));
      setDriveFiles(itemArray);
    } catch (error) {
      console.error("Error fetching drive data:", error);
      setDriveFiles([]);
    } finally {
      setDataLoading(false);
    }
  }, [activeFolder]);

  useEffect(() => {
    fetchFiles();
  }, [activeFolder, fetchFiles]);

  return { driveFiles, dataLoading, refetch: fetchFiles };
};
