import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dispatch, SetStateAction } from "react";
import { StorageItem } from "@/modules/dashboard/Dashboard";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  rowSelection: RowSelectionState;
  editingItem: StorageItem | null;
  setEditingItem: Dispatch<SetStateAction<StorageItem | null>>;
  onRowDoubleClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setRowSelection,
  rowSelection,
  editingItem,
  setEditingItem,
  onRowDoubleClick,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getRowId(originalRow, index, parent) {
      const ogRow = originalRow as StorageItem;
      return ogRow.id;
    },
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: false,
    state: {
      rowSelection,
    },
    meta: {
      editingItem,
      setEditingItem, // Pass the setState function here.
    },
  });

  return (
    <div className="flex w-full rounded-lg">
      <Table className="w-full table-fixed">
        <TableHeader className="sticky top-0 bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="text-black/60 shadow-lg shadow-black/5"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  onClick={row.getToggleSelectedHandler()}
                  onDoubleClick={() => onRowDoubleClick?.(row.original)}
                  className={
                    row.getIsSelected()
                      ? "group select-none rounded-[12px] bg-black text-white transition-all duration-100 hover:bg-black hover:text-white"
                      : "group select-none rounded-[12px] hover:bg-gray-100"
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-[16px]">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
