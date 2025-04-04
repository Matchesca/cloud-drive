import { MUTATIONS } from "@/actions/MUTATIONS";
import { StorageItem } from "@/modules/dashboard/Dashboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    action: () => {},
  },
  {
    label: "Rename",
    Icon: Pencil,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
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
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: MUTATIONS.delete,
    mutationKey: ["deleteFile"],
    onSuccess: () => {
      console.log("Succesfully deleted file");
      queryClient.invalidateQueries({ queryKey: ["driveData"] });
    },
  });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <MoreHorizontal />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-56 rounded-[12px] border-[1px] border-black/5 bg-white p-[5px] text-sm shadow-lg shadow-black/40"
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
              className="flex select-none flex-row items-center gap-x-4 rounded-[8px] p-[4px] outline-none hover:bg-gray-200"
            >
              <item.Icon size={16} />
              {item.label}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Separator className="m-[3px] h-px bg-black/5" />
          <DropdownMenu.Item
            onClick={() => deleteMutation.mutate({ resource: row.original })}
            className="flex select-none flex-row items-center gap-x-4 rounded-[8px] p-[4px] text-red-500 outline-none hover:bg-gray-200"
          >
            <Trash size={17} />
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ActionDropdownMenu;
