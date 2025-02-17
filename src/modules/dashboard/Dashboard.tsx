"use client";
import { ArrowLeft, Clock } from "lucide-react";
import DashboardBreadcrumb from "./dashboard-breadcrumb";
import DashboardHeader from "./dashboard-header";
import DashboardTable from "./dashboard-table";
import { mockData, StorageItem } from "@/lib/mockdata";
import { useMemo, useState } from "react";
import MIcon from "@/components/MIcon";

const defaultFolder: StorageItem = {
  id: "0",
  name: "Drive",
  type: "Folder",
  parentId: null,
  date: "",
  shared: false,
};

const Dashboard = () => {
  const [activeFolder, setActiveFolder] = useState<StorageItem>(defaultFolder);
  const [folderPath, setFolderPath] = useState<StorageItem[]>([]);

  const filteredRows: StorageItem[] = useMemo(() => {
    return mockData.filter((item) => item.parentId === activeFolder.id);
  }, [activeFolder]);

  const handleFolderClick = (folderId: string) => {
    const folder = mockData.find((item) => item.id === folderId);
    if (folder) {
      setActiveFolder(folder);
      setFolderPath((prevPath) => [...prevPath, folder]); // Add to breadcrumb
    }
  };

  const onNavigate = (folderId: string | null) => {
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
      const folder = mockData.find((item) => item.id === folderId);
      setActiveFolder(folder!);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <DashboardHeader />
      <div className="flex min-h-0 flex-1 flex-col p-4 pl-6">
        <DashboardBreadcrumb folderPath={folderPath} onNavigate={onNavigate} />
        <div className="flex flex-col pt-4">
          <h1 className="flex flex-row items-center gap-x-2 text-2xl">
            {activeFolder.id !== "0" && (
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
                <ArrowLeft className="p-1" size={40} />
              </div>
            )}
            <MIcon type={activeFolder.type} />
            {activeFolder.name}
          </h1>
          <span className="text-[13px] text-neutral-600">
            21 items, 34.2 GB
          </span>
        </div>
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
