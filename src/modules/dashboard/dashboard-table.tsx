import { StorageItem } from "./Dashboard";
import { formatDate, getDecodedFileName, formatBytes } from "@/lib/utils";

import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import MIcon from "@/components/MIcon";
import { Dispatch, SetStateAction, useState } from "react";

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
        onRowDoubleClick={(row) => handleFolderClick(row.id)}
      />
    </div>
  );
};

export default DashboardTable;
