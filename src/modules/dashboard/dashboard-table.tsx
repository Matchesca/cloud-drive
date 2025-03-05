import { StorageItem } from "./Dashboard";
import { formatDate, getDecodedFileName, formatBytes } from "@/lib/utils";

import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import MIcon from "@/components/MIcon";
import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<StorageItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 200,
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
    size: 80,
  },
  {
    accessorKey: "size",
    header: "Size",
    size: 50,
    cell({ row }) {
      return <div>{formatBytes(row.getValue("size"))}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    size: 120,
    cell({ row }) {
      return <div>{formatDate(row.getValue("date"))}</div>;
    },
  },
  {
    accessorKey: "shared",
    header: "Shared",
    size: 80,
  },
  {
    header: "",
    accessorKey: "actionColumn",
    size: 30,
    cell: ({ row }) => (
      <div
        className={clsx(
          "group-hover:opacity-100",
          row.getIsSelected() ? "cursor-pointer opacity-100" : "opacity-0",
        )}
      >
        <MoreHorizontal />
      </div>
    ),
  },
];

interface DashboardTableProps {
  rows: StorageItem[];
  handleFolderClick: (folderId: number) => void;
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
}

const DashboardTable: React.FC<DashboardTableProps> = ({
  rows,
  handleFolderClick,
  rowSelection,
  setRowSelection,
}) => {
  return (
    <div className="flex w-full overflow-auto pt-4">
      <DataTable
        columns={columns}
        data={rows}
        setRowSelection={setRowSelection}
        rowSelection={rowSelection}
        onRowDoubleClick={(row) => {
          if (row.type === "Folder") {
            handleFolderClick(row.id);
          }
        }}
      />
    </div>
  );
};

export default DashboardTable;
