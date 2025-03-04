import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StorageItem } from "@/server/db/schema";

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
      <Table className="w-full">
        <TableHeader className="sticky top-0 bg-white shadow-lg shadow-black/5">
          <TableRow className="text-black/60">
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Shared</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row: StorageItem, index: number) => {
            return (
              <TableRow
                key={index}
                className="rounded-[12px] text-[16px] hover:bg-gray-100"
                onClick={() => {
                  if (row.type === "Folder") {
                    handleFolderClick(row.id);
                  }
                }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.size ? row.size : "-"}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.shared}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardTable;
