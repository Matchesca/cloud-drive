import Button from "@/components/Button";
import { authClient } from "@/lib/auth-client";
import { Search } from "lucide-react";
import { Avatar } from "radix-ui";

const DashboardHeader = () => {
  return (
    <div className="flex w-full flex-row items-center border-b-[1px] border-black/5 p-4 pl-6">
      <div className="flex h-10 w-96 items-center rounded-[12px] bg-gray-200">
        <Search className="ml-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search files..."
          className="flex-1 border-none bg-transparent px-3 py-2 text-sm"
        />
      </div>
      <div className="ml-auto flex items-center justify-center rounded-full p-1 transition-colors duration-300 hover:bg-black/10">
        <Avatar.Root
          onClick={() => authClient.signOut()}
          className="inline-flex size-[45px] cursor-pointer select-none items-center justify-center overflow-hidden rounded-full bg-black/10 align-middle"
        >
          <Avatar.Fallback className="leading-1 flex size-full items-center justify-center bg-black text-[15px] font-medium text-white">
            RC
          </Avatar.Fallback>
        </Avatar.Root>
      </div>
    </div>
  );
};

export default DashboardHeader;
