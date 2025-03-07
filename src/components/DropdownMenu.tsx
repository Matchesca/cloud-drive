import { StorageItem } from "@/modules/dashboard/Dashboard";
import { Row } from "@tanstack/react-table";
import {
  Download,
  LucideIcon,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import { DropdownMenu } from "radix-ui";
import { Dispatch, SetStateAction } from "react";

type DropdownItemType = {
  label: string;
  Icon: LucideIcon;
  action: (item: StorageItem) => void;
};

const DropdownItems: DropdownItemType[] = [
  {
    label: "Download",
    Icon: Download,
    action: () => {},
  },
  {
    label: "Rename",
    Icon: Pencil,
    action: () => {},
  },
];

interface ActionDropdownMenuProps {
  row: Row<StorageItem>;
  editingItem: StorageItem | null;
  setEditingItem: Dispatch<SetStateAction<StorageItem | null>>;
}

const ActionDropdownMenu: React.FC<ActionDropdownMenuProps> = ({
  row,
  setEditingItem,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <MoreHorizontal />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-56 rounded-[12px] border-[1px] border-black/5 bg-white p-[5px] text-sm shadow-xl shadow-black/40"
          sideOffset={5}
          collisionPadding={{ right: 15 }}
        >
          {DropdownItems.map((item, index) => (
            <DropdownMenu.Item
              key={index}
              onClick={() => {
                if (item.label === "Rename") {
                  // Set this item as the currently editing item.
                  setEditingItem(row.original);
                } else {
                  item.action(row.original);
                }
              }}
              className="flex flex-row items-center gap-x-4 rounded-[8px] p-[4px] outline-none hover:bg-gray-200"
            >
              <item.Icon size={16} />
              {item.label}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Separator className="m-[3px] h-px bg-black/5" />
          <DropdownMenu.Item className="flex flex-row items-center gap-x-4 rounded-[8px] p-[4px] text-red-500 outline-none hover:bg-gray-300">
            <Trash size={17} />
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ActionDropdownMenu;
