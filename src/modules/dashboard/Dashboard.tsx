"use client";

import { ArrowLeft } from "lucide-react";
import DashboardBreadcrumb from "./dashboard-breadcrumb";
import DashboardHeader from "./dashboard-header";
import DashboardTable from "./dashboard-table";
import { useEffect, useRef, useState } from "react";
import MIcon from "@/components/MIcon";
import Button from "@/components/Button";
import { webdavClient } from "@/lib/webdav-client";
import Spinner from "@/components/Spinner";
import { RowSelectionState } from "@tanstack/react-table";
import { formatBytes, getSizeOfFolder } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useDriveData } from "@/hooks/useDriveData";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useRouter } from "next/navigation";

export type StorageItem = {
  id: number;
  name: string;
  url: string;
  type:
    | "Folder"
    | "File"
    | "PDF"
    | "Word Document"
    | "Python Script"
    | "PNG"
    | "Presentation";
  parentId: number;
  date: string;
  size?: number;
  shared: boolean;
};

const defaultFolder: StorageItem = {
  id: 0,
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
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { user, authLoading } = useAuth();
  const {
    driveFiles: filteredRows,
    dataLoading,
    refetch,
  } = useDriveData(activeFolder);
  const { uploadFile, uploading } = useFileUpload(user?.id, folderPath);

  const handleFolderClick = (folderId: number) => {
    setLoading(true);
    const folder = filteredRows.find((item) => item.id === folderId);
    if (folder) {
      setActiveFolder(folder);
      setFolderPath((prevPath) => [...prevPath, folder]); // Add to breadcrumb
    }
    setLoading(false);
  };

  const onNavigate = (folderId: number | null) => {
    setLoading(true);
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
    setLoading(false);
  };

  // Handler for file input change
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      if (file) {
        await uploadFile(file);
      }
    }
    refetch();
  };

  return (
    <div className="flex h-screen flex-col">
      <DashboardHeader />
      {loading || authLoading || dataLoading ? (
        <div className="flex min-h-0 flex-1 items-center justify-center p-4 pl-6">
          <Spinner />
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
                      className="mr-2 rounded-[12px] hover:bg-gray-100"
                      onClick={() => {
                        if (folderPath.length > 1) {
                          onNavigate(folderPath[folderPath.length - 2]!.id);
                        } else {
                          onNavigate(null);
                        }
                      }}
                    >
                      <ArrowLeft className="p-1" size={25} />
                    </div>
                    <MIcon type={activeFolder.type} />
                  </>
                )}
                {activeFolder.name}
              </h1>
              <span className="text-[13px] text-neutral-600">
                {filteredRows.length} items,{" "}
                {formatBytes(getSizeOfFolder(filteredRows))}
              </span>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                onClick={async () => {
                  try {
                    var path: string = "";
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
                onClick={async () => {
                  const response = await webdavClient.getDirectoryContents(
                    `${user?.id}/`,
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
          <div className="flex min-h-0 flex-1">
            <DashboardTable
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
