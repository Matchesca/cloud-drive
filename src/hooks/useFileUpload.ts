import { useState } from "react";
import { webdavClient } from "@/lib/webdav-client";
import { StorageItem } from "@/modules/dashboard/Dashboard";
import { ProgressEvent } from "webdav";
import { useQueryClient } from "@tanstack/react-query";

export const useFileUpload = (
  userId: string | undefined,
  folderPath: StorageItem[],
) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const queryClient = useQueryClient();

  // Helper to build the folder path string
  const buildFolderPath = (folders: StorageItem[]): string =>
    folders.map((folder) => folder.name + "/").join("");

  const uploadFile = async (files: File[]) => {
    setUploading(true);
    try {
      const path = buildFolderPath(folderPath);
      const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
      setTotalFiles(files.length);
      let uploadedBytes = 0;

      // Upload files sequentially
      for (const file of files) {
        const decodedFileName = decodeURIComponent(file.name);
        const uploadPath = `${userId}/${path}${decodedFileName}`;
        const fileContents = await file.arrayBuffer();

        await webdavClient.putFileContents(uploadPath, fileContents, {
          overwrite: true,
          onUploadProgress: (e: ProgressEvent) => {
            if (e.total) {
              // e.loaded is the bytes loaded for the current file.
              // Overall progress: bytes already uploaded plus bytes currently uploading.
              const overallProgress = Math.round(
                ((uploadedBytes + e.loaded) * 100) / totalBytes,
              );
              setProgress(overallProgress);
            }
          },
        });
        // File finished uploading, add its size to uploadedBytes.
        uploadedBytes += file.size;
        setProgress(Math.round((uploadedBytes * 100) / totalBytes));
      }
      console.log("All files uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["driveData"] });
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

  return { uploadFile, uploading, progress, totalFiles };
};
