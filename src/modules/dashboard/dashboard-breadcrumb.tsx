import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { StorageItem } from "./Dashboard";

interface DashboardBreadcrumbProps {
  folderPath: StorageItem[];
  onNavigate: (folderId: number | null) => void;
}

const DashboardBreadcrumb: React.FC<DashboardBreadcrumbProps> = ({
  folderPath,
  onNavigate,
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="cursor-default hover:text-violet-500"
            onClick={() => onNavigate(null)}
          >
            Drive
          </BreadcrumbLink>
        </BreadcrumbItem>
        {folderPath.map((folder, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className="cursor-default hover:text-violet-500"
                onClick={() => onNavigate(folder.id)}
              >
                {folder.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadcrumb;
