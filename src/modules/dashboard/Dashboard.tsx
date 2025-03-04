"use client";

import { ArrowLeft } from "lucide-react";
import DashboardBreadcrumb from "./dashboard-breadcrumb";
import DashboardHeader from "./dashboard-header";
import DashboardTable from "./dashboard-table";
import { useEffect, useRef, useState } from "react";
import MIcon from "@/components/MIcon";
import Button from "@/components/Button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { webdavClient } from "@/lib/webdav-client";
import { User } from "better-auth/types";

export type StorageItem = {
  id: number;
  name: string;
  url: string;
  type: "Folder" | "File";
  parentId: number;
  date: string;
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

type BackendResponse = {
  path: string;
  createdAt: string;
  id: number;
  name: string;
  parentId: number;
  size: string;
  type: "Folder" | "File";
  updatedAt: string;
  userId: string;
};

const Dashboard = () => {
  const [activeFolder, setActiveFolder] = useState<StorageItem>(defaultFolder);
  const [folderPath, setFolderPath] = useState<StorageItem[]>([]);
  const [filteredRows, setFilteredRows] = useState<StorageItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // retrieve drive data

  useEffect(() => {
    axios({
      url: `${process.env.NEXT_PUBLIC_SERVER}/drive/get-files-for-parent`,
      data: { parentId: activeFolder.id },
      method: "POST",
      withCredentials: true,
    })
      .then((response) => {
        const items: BackendResponse[] = response.data;
        const itemArray: StorageItem[] = items.map((item) => ({
          id: item.id,
          url: item.path,
          name: item.name,
          parentId: item.parentId,
          shared: false,
          type: item.type,
          date: item.createdAt,
        }));
        setFilteredRows(itemArray);
      })
      .catch((error) => {
        console.error(error);
        setFilteredRows([]);
      });
  }, [activeFolder]);

  const handleFolderClick = (folderId: number) => {
    const folder = filteredRows.find((item) => item.id === folderId);
    if (folder) {
      setActiveFolder(folder);
      setFolderPath((prevPath) => [...prevPath, folder]); // Add to breadcrumb
    }
  };

  // Auth safety
  useEffect(() => {
    async function check() {
      const session = await authClient.getSession();
      if (!session.data?.user) {
        router.push("/");
      }
      setUser(session.data!.user);
    }
    check();
  }, []);

  const onNavigate = (folderId: number | null) => {
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
  };

  // Handler for file input change
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Decode the file name in case it's URL encoded
      const decodedFileName = decodeURIComponent(file!.name);

      // Build the path based on the current folder structure
      let path = "";
      folderPath.forEach((folder: StorageItem) => {
        path += folder.name + "/";
      });

      // Final upload path (e.g., "userId/Folder1/Folder2/filename.ext")
      const uploadPath = `${user?.id}/${path}${decodedFileName}`;

      try {
        // Read the file as an ArrayBuffer
        const fileContents = await file!.arrayBuffer();

        // Upload the file via the WebDAV client.
        await webdavClient.putFileContents(uploadPath, fileContents, {
          overwrite: true,
        });
        console.log("File uploaded successfully");

        // Optionally refresh the file list here
      } catch (error: any) {
        if (error.response && error.response.status === 403) {
          console.error("Upload failed: User is exceeding the quota");
          // Display a message to the user here
        } else {
          console.error("Error uploading file", error);
        }
      }
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <DashboardHeader />
      <div className="flex min-h-0 flex-1 flex-col p-4 pl-6">
        <DashboardBreadcrumb folderPath={folderPath} onNavigate={onNavigate} />

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
              21 items, 34.2 GB
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
            <Button onClick={() => fileInputRef.current?.click()}>
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
            rows={filteredRows}
            handleFolderClick={handleFolderClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
