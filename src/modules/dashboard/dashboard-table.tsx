import type { StorageItem } from "./Dashboard";
import {
  formatDate,
  getDecodedFileName,
  formatBytes,
  getNameWithoutExtension,
} from "@/lib/utils";

import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import MIcon from "@/components/MIcon";
import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import ActionDropdownMenu from "@/components/DropdownMenu";
import InlineEditableText from "@/components/InlineEditableText";

export const columns: ColumnDef<StorageItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 200,
    cell({ row, table }) {
      const name: string = row.getValue("name");
      const formattedName = getDecodedFileName(getNameWithoutExtension(name));

      const { editingItem, setEditingItem } = table.options.meta as {
        editingItem: StorageItem | null;
        setEditingItem: Dispatch<SetStateAction<StorageItem | null>>;
      };

      if (editingItem?.id === row.original.id) {
        return (
          <div className="flex flex-row items-center gap-x-2">
            <MIcon type={row.getValue("type")} />
            <InlineEditableText
              setEditingItem={setEditingItem}
              item={row.original}
              onCancel={() => setEditingItem(null)}
            />
          </div>
        );
      }

      return (
        <div
          aria-label={formattedName}
          className="flex flex-row items-center gap-x-2 overflow-hidden"
        >
          <div>
            <MIcon type={row.getValue("type")} />
          </div>
          <span className="overflow-hidden text-ellipsis text-nowrap">
            {formattedName}
          </span>
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
    cell: ({ row, table }) => {
      // Retrieve editing state and its setter from table meta.
      const { editingItem, setEditingItem } = table.options.meta as {
        editingItem: StorageItem | null;
        setEditingItem: Dispatch<SetStateAction<StorageItem | null>>;
      };

      return (
        <div
          className={clsx(
            "group-hover:opacity-100",
            row.getIsSelected() ? "cursor-pointer opacity-100" : "opacity-0",
          )}
        >
          <ActionDropdownMenu
            row={row}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />
        </div>
      );
    },
  },
];

interface DashboardTableProps {
  rows: StorageItem[];
  handleFolderClick: (folderId: number) => void;
  rowSelection: RowSelectionState;
  editingItem: StorageItem | null;
  setEditingItem: Dispatch<SetStateAction<StorageItem | null>>;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
}

const DashboardTable: React.FC<DashboardTableProps> = ({
  rows,
  handleFolderClick,
  rowSelection,
  setRowSelection,
  editingItem,
  setEditingItem,
}) => {
  return (
    <div className="flex w-full overflow-auto pt-4">
      <DataTable
        columns={columns}
        data={rows}
        setRowSelection={setRowSelection}
        rowSelection={rowSelection}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
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
