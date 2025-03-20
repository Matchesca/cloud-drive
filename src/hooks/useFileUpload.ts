import { useState } from "react";
import { StorageItem } from "@/modules/dashboard/Dashboard";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function uploadFileWithAxios(
  uploadUrl: string,
  fileContents: ArrayBuffer,
  onProgress: (percentage: number) => void,
) {
  const webdavUrl = process.env.NEXT_PUBLIC_WEBDAV_CLIENT!;
  return axios.put(webdavUrl + "/" + uploadUrl, fileContents, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/octet-stream", // or the appropriate MIME type
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        onProgress(percent);
      }
    },
  });
}

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

        await uploadFileWithAxios(uploadPath, fileContents, (fileProgress) => {
          // Update overall progress based on current file's progress
          const overallProgress = Math.round(
            ((uploadedBytes + (fileProgress / 100) * file.size) * 100) /
              totalBytes,
          );
          setProgress(overallProgress);
        });

        // File finished uploading, add its size to uploadedBytes.
        uploadedBytes += file.size;
        setProgress(Math.round((uploadedBytes * 100) / totalBytes));
      }
      console.log("All files uploaded successfully");
      setTotalFiles(0);
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
