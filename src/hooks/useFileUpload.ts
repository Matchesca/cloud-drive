import { useState } from "react";
import { webdavClient } from "@/lib/webdav-client";
import { StorageItem } from "@/modules/dashboard/Dashboard";

export const useFileUpload = (
  userId: string | undefined,
  folderPath: StorageItem[],
) => {
  const [uploading, setUploading] = useState<boolean>(false);

  // Helper to build the folder path string
  const buildFolderPath = (folders: StorageItem[]): string =>
    folders.map((folder) => folder.name + "/").join("");

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const decodedFileName = decodeURIComponent(file.name);
      const path = buildFolderPath(folderPath);
      const uploadPath = `${userId}/${path}${decodedFileName}`;

      // Read file as an ArrayBuffer and upload via WebDAV
      const fileContents = await file.arrayBuffer();
      await webdavClient.putFileContents(uploadPath, fileContents, {
        overwrite: true,
      });
      console.log("File uploaded successfully");
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        console.error("Upload failed: User is exceeding the quota");
      } else {
        console.error("Error uploading file:", error);
      }
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading };
};
