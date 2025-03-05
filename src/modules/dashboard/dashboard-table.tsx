import { StorageItem } from "./Dashboard";
import { formatDate, getDecodedFileName, formatBytes } from "@/lib/utils";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import MIcon from "@/components/MIcon";

export const columns: ColumnDef<StorageItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell({ row }) {
      const name: string = row.getValue("name");
      const formattedName = getDecodedFileName(name);

      return (
        <div className="flex flex-row items-center gap-x-2">
          <MIcon type={row.getValue("type")} />
          {formattedName}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell({ row }) {
      return <div>{formatBytes(row.getValue("size"))}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell({ row }) {
      return <div>{formatDate(row.getValue("date"))}</div>;
    },
  },
  {
    accessorKey: "shared",
    header: "Shared",
  },
];

interface DashboardTableProps {
  rows: StorageItem[];
  handleFolderClick: (folderId: number) => void;
}

const DashboardTable: React.FC<DashboardTableProps> = ({
  rows,
  handleFolderClick,
}) => {
  return (
    <div className="flex w-full overflow-auto pt-4">
      <DataTable columns={columns} data={rows} />
    </div>
  );
};

export default DashboardTable;
