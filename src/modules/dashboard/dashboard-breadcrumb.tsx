import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { StorageItem } from "@/lib/mockdata";

interface DashboardBreadcrumbProps {
  folderPath: StorageItem[];
  onNavigate: (folderId: string | null) => void;
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
            className="cursor-default"
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
                className="cursor-default"
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
