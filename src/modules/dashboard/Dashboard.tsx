"use client";

import { ArrowLeft } from "lucide-react";
import DashboardBreadcrumb from "./dashboard-breadcrumb";
import DashboardHeader from "./dashboard-header";
import DashboardTable from "./dashboard-table";
import { useRef, useState } from "react";
import MIcon from "@/components/MIcon";
import Button from "@/components/Button";
import { webdavClient } from "@/lib/webdav-client";
import Spinner from "@/components/Spinner";
import type { RowSelectionState } from "@tanstack/react-table";
import {
  downloadFileAsBlob,
  findResourceById,
  formatBytes,
  getSizeOfFolder,
  triggerDownload,
} from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/actions/QUERIES";

export type CloudFileType =
  | "Folder"
  | "File"
  | "PDF"
  | "Word Document"
  | "Python Script"
  | "PNG"
  | "Presentation"
  | "Excel Document"
  | "Text Document"
  | "JPEG Image"
  | "GIF Image"
  | "MP3 Audio"
  | "MP4 Video";

export type StorageItem = {
  id: number;
  userId: string;
  name: string;
  url: string;
  type: CloudFileType;
  parentId: number;
  date: string;
  size?: number;
  shared: boolean;
  isEditing?: boolean;
};

const defaultFolder: StorageItem = {
  id: 0,
  userId: "0",
  name: "Drive",
  url: "",
  type: "Folder",
  parentId: 0,
  date: "",
  shared: false,
};

const Dashboard = () => {
  const [activeFolder, setActiveFolder] = useState<StorageItem>(defaultFolder);
  const [folderPath, setFolderPath] = useState<StorageItem[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [loading, setLoading] = useState({
    loading: false,
    downloadLoading: true,
  });
  const [editingItem, setEditingItem] = useState<StorageItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Drive data fetching
  const {
    data: filteredRows,
    error: dataError,
    isPending: dataLoading,
  } = useQuery({
    queryKey: ["driveData", { activeFolder }],
    queryFn: QUERIES.fetchDriveData,
    enabled: !!activeFolder,
  });

  const selectedIds = Object.keys(rowSelection);

  const { user, authLoading } = useAuth();
  const { uploadFile } = useFileUpload(user?.id, folderPath);

  const handleDownload = async () => {
    const selectedResource = findResourceById(
      filteredRows ?? [],
      selectedIds[0],
    );
    console.log(selectedResource);
    if (!selectedResource || !user) return;

    try {
      const blob = await downloadFileAsBlob(user, selectedResource);
      console.log(blob);
      // Use the original name (or modify as needed) for the download file name.
      triggerDownload(blob, decodeURIComponent(selectedResource.name));
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleFolderClick = (folderId: number) => {
    setLoading((prev) => ({ ...prev, loading: true }));
    const folder = filteredRows?.find((item) => item.id === folderId);
    if (folder) {
      setActiveFolder(folder);
      setFolderPath((prevPath) => [...prevPath, folder]); // Add to breadcrumb
    }
    setLoading((prev) => ({ ...prev, loading: false }));
  };

  const onNavigate = (folderId: number | null) => {
    setLoading((prev) => ({ ...prev, loading: true }));
    if (folderId === null) {
      // Reset to root
      setActiveFolder(defaultFolder);
      setFolderPath([]);
    } else {
      // Find the folder in the path and trim everything after it
      setFolderPath((prev) => {
        const index = prev.findIndex((folder) => folder.id === folderId);
        return index !== -1 ? prev.slice(0, index + 1) : prev;
      });

      // Update active folder
      const folder = folderPath.find((item) => item.id === folderId);
      setActiveFolder(folder!);
    }
    setLoading((prev) => ({ ...prev, loading: false }));
  };

  // Handler for file input change
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        await uploadFile(file);
      } else {
        console.log("Please input a File");
      }
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <DashboardHeader />
      {loading.loading || authLoading || dataLoading ? (
        <div className="flex min-h-0 flex-1 items-center justify-center p-4 pl-6">
          <Spinner />
        </div>
      ) : dataError ? (
        <div className="min-h0 flex flex-1 items-center justify-center p-4 pl-6 text-xl">
          Error while fetching: {dataError.message}
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col p-4 pl-6">
          <DashboardBreadcrumb
            folderPath={folderPath}
            onNavigate={onNavigate}
          />

          {/* Current Folder Header */}
          <div className="flex flex-row">
            <div className="flex flex-col pt-4">
              <h1 className="flex flex-row items-center gap-x-2 text-2xl">
                {/* To render the back button and correct icon */}
                {activeFolder.id !== 0 && (
                  <>
                    <div
                      className="mr-2 rounded-xl hover:bg-gray-100"
                      onClick={() => {
                        if (folderPath.length > 1) {
                          onNavigate(folderPath[folderPath.length - 2]!.id);
                        } else {
                          onNavigate(null);
                        }
                      }}
                    >
                      <ArrowLeft className="p-1" size={27} />
                    </div>
                    <MIcon type={activeFolder.type} />
                  </>
                )}
                <div className="flex flex-row items-center gap-x-4">
                  <span>{activeFolder.name}</span>
                  <span>
                    {filteredRows ? (
                      <span className="text-[13px] text-neutral-600">
                        {filteredRows.length} items,{" "}
                        {formatBytes(getSizeOfFolder(filteredRows))}
                      </span>
                    ) : (
                      <Spinner />
                    )}
                  </span>
                </div>
              </h1>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
              <Button variant="secondary" onClick={handleDownload}>
                Download
              </Button>
              <Button
                variant="secondary"
                onClick={async () => {
                  try {
                    let path = "";
                    folderPath.forEach((folder: StorageItem) => {
                      path += folder.name;
                      path += "/";
                    });
                    await webdavClient.createDirectory(
                      `${user?.id}/${path}Documents`,
                    );
                    router.refresh();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                New Folder
              </Button>
              <Button
                variant="secondary"
                onClick={async () => {
                  let path = "";
                  folderPath.forEach((folder: StorageItem) => {
                    path += folder.name;
                    path += "/";
                  });
                  const response = await webdavClient.getDirectoryContents(
                    `${user?.id}/${path}`,
                  );
                  console.log(response);
                }}
              >
                PROPFIND
              </Button>
              <Button
                onClick={() => {
                  fileInputRef.current?.click();
                }}
              >
                Upload
              </Button>
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </div>
          </div>
          {/* Table to display the StorageItems */}
          <div className="flex min-h-0 flex-1 overflow-hidden rounded-bl-xl rounded-br-xl">
            <DashboardTable
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              rows={filteredRows}
              handleFolderClick={handleFolderClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
